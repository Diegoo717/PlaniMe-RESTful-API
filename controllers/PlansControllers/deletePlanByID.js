const { Plan } = require('../../models');
const path = require('path');
const fs = require('fs');

const deleteUserPlan = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ 
                success: false,
                error: 'Usuario no autenticado' 
            });
        }

        const { planId } = req.params;

        const plan = await Plan.findOne({
            where: { 
                id: planId,
                userId: req.user.userId 
            }
        });

        if (!plan) {
            return res.status(404).json({ 
                success: false,
                error: 'Plan no encontrado o no pertenece al usuario' 
            });
        }

        if (plan.planImagePath) {
            const imagePath = path.join(__dirname, '../../plans', plan.planImagePath);
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            } catch (err) {
                console.error('Error al eliminar la imagen:', err);
            }
        }

        await plan.destroy();

        res.json({
            success: true,
            message: 'Plan eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar plan:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
};

module.exports = { deleteUserPlan };