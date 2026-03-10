const adminService = require('../services/adminService');


exports.register = async (req, res) => {
    try {
        console.log(req.body); // debug
        
        const { name, email, password } = req.body;

        const id = await adminService.register(name, email, password);

        res.status(201).json({ message: 'Admin criado', id });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await adminService.login(email, password);

        res.status(200).json({ token });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};