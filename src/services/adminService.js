const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const SALT_ROUNDS = 10;

exports.register = async (name, email, password) => {

    const existingAdmin = await adminModel.findByEmail(email);

    if (existingAdmin) {
        throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const adminId = await adminModel.create(
        name,
        email,
        hashedPassword
    );

    return adminId;
};

exports.login = async (email, password) => {
    const admin = await adminModel.findByEmail(email);

    if (!admin) {
        throw new Error('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );

    return token;
};



exports.getDashboard = async () => {

  const metrics = await adminModel.getDashboardMetrics();

  return metrics;

};