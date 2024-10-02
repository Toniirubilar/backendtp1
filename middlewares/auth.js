const jwt = require('jsonwebtoken');
const { User } = require('../models');


const auth = (req, res, next) => {


    exports.isAdmin = async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);

            if (!user || user.role !== 'admin') {
                return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    };
};
module.exports = auth;