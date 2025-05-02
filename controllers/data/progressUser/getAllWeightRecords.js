const { ProgressWeight } = require('../../../models');

const getAllWeightRecords = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const records = await ProgressWeight.findAll({
            where: { userId: req.user.userId },
            order: [['date', 'DESC']], 
            attributes: ['id', 'weight', 'date']
        });

        return res.json({
            success: true,
            data: records,
            count: records.length
        });

    } catch (error) {
        console.error('Error al obtener registros de peso:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { getAllWeightRecords };