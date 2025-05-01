const { ProgressWeight } = require('../../../models');

const deleteWeightRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        if (!req.user?.userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        if (!recordId) {
            return res.status(400).json({ error: 'ID de registro no proporcionado' });
        }

        const record = await ProgressWeight.findOne({
            where: {
                id: recordId,
                userId: req.user.userId
            }
        });

        if (!record) {
            return res.status(404).json({ 
                error: 'Registro no encontrado o no pertenece al usuario' 
            });
        }

        await record.destroy();

        return res.json({
            success: true,
            message: 'Registro de peso eliminado exitosamente',
            deletedRecordId: recordId
        });

    } catch (error) {
        console.error('Error al eliminar registro de peso:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { deleteWeightRecord };