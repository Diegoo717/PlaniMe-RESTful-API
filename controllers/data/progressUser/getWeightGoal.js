const { WeightGoal } = require('../../../models');

const getWeightGoal = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const goal = await WeightGoal.findOne({
            where: { userId: req.user.userId },
        });

        return res.json({
            success: true,
            data: goal.weightGoal
        });

    } catch (error) {
        console.error('Error al obtener registros de peso:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { getWeightGoal };