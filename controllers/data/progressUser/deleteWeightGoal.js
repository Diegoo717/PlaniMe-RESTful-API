const { WeightGoal } = require('../../../models');

const deleteWeightGoal = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const goal = await WeightGoal.findOne({
            where: { userId: req.user.userId }
        });

        if (!goal) {
            return res.status(404).json({ 
                error: 'Objetivo de peso no encontrado para este usuario' 
            });
        }

        await goal.destroy();

        return res.json({
            success: true,
            message: 'Objetivo de peso eliminado exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar objetivo de peso:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { deleteWeightGoal };