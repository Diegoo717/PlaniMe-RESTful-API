const { User, Plan } = require('../../models');
const path = require('path');

function normalizeActivityLevel(activity) {
  const activityMap = {
    'sedentario': 'ligero',
    'ligero': 'ligero',
    'moderado': 'moderado',
    'activo': 'activo'
  };
  return activityMap[activity.toLowerCase()] || 'moderado';
}

function normalizeGoal(goal) {
  const goalMap = {
    'bajar de peso': 'perder',
    'perder peso': 'perder',
    'perder': 'perder',
    'mantener peso': 'mantener',
    'mantener': 'mantener',
    'aumentar masa muscular': 'aumentar',
    'aumentar': 'aumentar'
  };
  return goalMap[goal.toLowerCase()] || 'mantener';
}

function selectPlan(gender, weightLevel, activityLevel, goal) {
  const genderFolder = gender === 'm' ? 'Man' : 'Woman';
  
  const plans = {
    m: {
      bajo: {
        ligero: {
          perder: 'fuerzaVital_hombre_bajo_ligero_perder.jpg',
          mantener: 'energiaActiva_hombre_bajo_ligero_mantener.jpg',
          aumentar: 'potenciaAlpha_hombre_bajo_ligero_aumentar.jpg'
        },
        moderado: {
          perder: 'fuerzaVital_hombre_bajo_moderado_perder.jpg',
          mantener: 'energiaActiva_hombre_bajo_moderado_mantener.jpg',
          aumentar: 'potenciaAlpha_hombre_bajo_moderado_aumentar.jpg'
        },
        activo: {
          perder: 'fuerzaVital_hombre_bajo_activo_perder.jpg',
          mantener: 'energiaActiva_hombre_bajo_activo_mantener.jpg',
          aumentar: 'potenciaAlpha_hombre_bajo_activo_aumentar.jpg'
        }
      },
      medio: {
        ligero: {
          perder: 'equilibrioFit_hombre_medio_ligero_perder.jpg',
          mantener: 'resistenciaPro_hombre_medio_ligero_mantener.jpg',
          aumentar: 'powerLean_hombre_medio_ligero_aumentar.jpg'
        },
        moderado: {
          perder: 'equilibrioFit_hombre_medio_moderado_perder.jpg',
          mantener: 'resistenciaPro_hombre_medio_moderado_mantener.jpg',
          aumentar: 'massBulker_hombre_medio_moderado_aumentar.jpg'
        },
        activo: {
          perder: 'equilibrioFit_hombre_medio_activo_perder.jpg',
          mantener: 'resistenciaPro_hombre_medio_activo_mantener.jpg',
          aumentar: 'powerLean_hombre_medio_activo_aumentar.jpg'
        }
      },
      alto: {
        ligero: {
          perder: 'controlMax_hombre_alto_ligero_perder.jpg',
          mantener: 'estabilidadFit_hombre_alto_ligero_mantener.jpg',
          aumentar: 'hipertrofiaElite_hombre_alto_ligero_aumentar.jpg'
        },
        moderado: {
          perder: 'controlMax_hombre_alto_moderado_perder.jpg',
          mantener: 'estabilidadFit_hombre_alto_moderado_mantener.jpg',
          aumentar: 'hipertrofiaElite_hombre_alto_moderado_aumentar.jpg'
        },
        activo: {
          perder: 'controlMax_hombre_alto_activo_perder.jpg',
          mantener: 'estabilidadFit_hombre_alto_activo_mantener.jpg',
          aumentar: 'hipertrofiaElite_hombre_alto_activo_aumentar.jpg'
        }
      }
    },
    f: {
      bajo: {
        ligero: {
          perder: 'esenciaFit_mujer_bajo_ligero_perder.jpg',
          mantener: 'balanceActiva_mujer_bajo_ligero_mantener.jpg',
          aumentar: 'fuerzaSutil_mujer_bajo_ligero_aumentar.jpg'
        },
        moderado: {
          perder: 'esenciaFit_mujer_bajo_moderado_perder.jpg',
          mantener: 'balanceActiva_mujer_bajo_moderado_mantener.jpg',
          aumentar: 'fuerzaSutil_mujer_bajo_moderado_aumentar.jpg'
        },
        activo: {
          perder: 'esenciaFit_mujer_bajo_activo_perder.jpg',
          mantener: 'balanceActiva_mujer_bajo_activo_mantener.jpg',
          aumentar: 'fuerzaSutil_mujer_bajo_activo_aumentar.jpg'
        }
      },
      medio: {
        ligero: {
          perder: 'vitalidadPlus_mujer_medio_ligero_perder.jpg',
          mantener: 'nutriEquilibrio_mujer_medio_ligero_mantener.jpg',
          aumentar: 'muscleTone_mujer_medio_ligero_aumentar.jpg'
        },
        moderado: {
          perder: 'burnFast_mujer_medio_moderado_perder.jpg',
          mantener: 'nutriEquilibrio_mujer_medio_moderado_mantener.jpg',
          aumentar: 'muscleTone_mujer_medio_moderado_aumentar.jpg'
        },
        activo: {
          perder: 'burnFast_mujer_medio_activo_perder.jpg',
          mantener: 'nutriEquilibrio_mujer_medio_activo_mantener.jpg',
          aumentar: 'muscleTone_mujer_medio_activo_aumentar.jpg'
        }
      },
      alto: {
        ligero: {
          perder: 'shapeControl_mujer_alto_ligero_perder.jpg',
          mantener: 'formaFirme_mujer_alto_ligero_mantener.jpg',
          aumentar: 'potencialFit_mujer_alto_ligero_aumentar.jpg'
        },
        moderado: {
          perder: 'shapeControl_mujer_alto_moderado_perder.jpg',
          mantener: 'formaFirme_mujer_alto_moderado_mantener.jpg',
          aumentar: 'potencialFit_mujer_alto_moderado_aumentar.jpg'
        },
        activo: {
          perder: 'shapeControl_mujer_alto_activo_perder.jpg',
          mantener: 'formaFirme_mujer_alto_activo_mantener.jpg',
          aumentar: 'potencialFit_mujer_alto_activo_aumentar.jpg'
        }
      }
    }
  };

  const planName = plans[gender][weightLevel][activityLevel][goal];
  const planImagePath = path.join(genderFolder, planName);

  return {
    planName: planName.replace('.jpg', '').replace(/_/g, ' '),
    planImagePath
  };
}

const createPlan = async (req, res) => {
  try {
    const { age, gender, weight, height, activityLevel, goal } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);

    let weightLevel;
    if (imc < 18.5) {
      weightLevel = 'bajo';
    } else if (imc >= 18.5 && imc <= 24.9) {
      weightLevel = 'medio';
    } else {
      weightLevel = 'alto';
    }

    const normalizedActivity = normalizeActivityLevel(activityLevel);
    const normalizedGoal = normalizeGoal(goal);

    const { planName, planImagePath } = selectPlan(
      gender, 
      weightLevel, 
      normalizedActivity, 
      normalizedGoal
    );

    const newPlan = await Plan.create({
      userId: req.user.userId,
      age,
      gender,
      weight,
      height,
      activityLevel: normalizedActivity,
      goal: normalizedGoal,
      imc,
      planName,
      planImagePath: planImagePath.replace(/\\/g, '/') 
    });

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fullImageUrl = `${baseUrl}/plans/${newPlan.planImagePath}`;

    res.json({
      success: true,
      plan: {
        name: planName,
        imageUrl: fullImageUrl,
        details: newPlan
      }
    });
    
  } catch (error) {
    console.error('Error detallado al crear el plan:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor al crear el plan',
      details: error.message, 
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = { createPlan };