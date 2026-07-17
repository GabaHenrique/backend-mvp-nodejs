const adminService = require('../services/adminService');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const id = await adminService.register(name, email, password);
        res.status(201).json({ message: 'Admin criado', id });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await adminService.login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const data = await adminService.getDashboard();
    res.json(data);
  } catch (error) {
    next(error);
  }
};