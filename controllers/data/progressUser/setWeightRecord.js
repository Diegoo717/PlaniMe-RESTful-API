const { ProgressWeight } = require('../../../models');

const setWeightRecord = async (req, res) => {
    try {
        const { weight, date } = req.body;

        if (!req.user?.userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        if (!weight || isNaN(weight)) {
            return res.status(400).json({ error: 'El peso es requerido y debe ser un número válido' });
        }

        const recordDate = date ? new Date(date) : new Date();
        if (isNaN(recordDate.getTime())) {
            return res.status(400).json({ error: 'Fecha no válida' });
        }

        const newRecord = await ProgressWeight.create({
            userId: req.user.userId,
            weight: parseFloat(weight),
            date: recordDate
        });

        return res.status(201).json({
            success: true,
            message: 'Registro de peso creado exitosamente',
            data: {
                id: newRecord.id,
                weight: newRecord.weight,
                date: newRecord.date,
                userId: newRecord.userId
            }
        });

    } catch (error) {
        console.error('Error al crear registro de peso:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { setWeightRecord };