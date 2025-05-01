const { WeightGoal } = require('../../../models');

const setWeightGoal = async (req, res) => {
    try {
        const { weightGoal } = req.body;
        
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        if (!weightGoal || isNaN(weightGoal)) {
            return res.status(400).json({ error: 'El peso objetivo es requerido y debe ser un número válido' });
        }

        const [goal, created] = await WeightGoal.upsert({
            userId: req.user.userId,
            weightGoal: parseFloat(weightGoal)
        }, {
            returning: true
        });

        return res.status(created ? 201 : 200).json({
            success: true,
            message: created ? 'Objetivo de peso establecido correctamente' : 'Objetivo de peso actualizado correctamente',
            data: goal
        });

    } catch (error) {
        console.error('Error al establecer el objetivo de peso:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { setWeightGoal };