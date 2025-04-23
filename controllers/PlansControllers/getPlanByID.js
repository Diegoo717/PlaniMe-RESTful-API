const { Plan } = require('../../models');
const path = require('path');

const getUserPlans = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ 
                success: false,
                error: 'Usuario no autenticado' 
            });
        }

        const plans = await Plan.findAll({
            where: { userId: req.user.userId },
            order: [['createdAt', 'DESC']] 
        });

        if (!plans || plans.length === 0) {
            return res.status(404).json({ 
                success: false,
                error: 'No se encontraron planes para este usuario' 
            });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const formattedPlans = plans.map(plan => ({
            name: plan.planName,
            imageUrl: `${baseUrl}/plans/${plan.planImagePath.replace(/\\/g, '/')}`, 
            details: {
                id: plan.id,
                userId: plan.userId,
                age: plan.age,
                gender: plan.gender,
                weight: plan.weight,
                height: plan.height,
                activityLevel: plan.activityLevel,
                goal: plan.goal,
                imc: plan.imc,
                planName: plan.planName,
                planImagePath: plan.planImagePath,
                createdAt: plan.createdAt,
                updatedAt: plan.updatedAt
            }
        }));

        res.json({
            success: true,
            plans: formattedPlans
        });

    } catch (error) {
        console.error('Error al obtener planes:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
};

module.exports = { getUserPlans };