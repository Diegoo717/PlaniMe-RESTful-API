const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailError = emailValidate(email);
    if (emailError) {
      return res.status(400).json({ error: emailError });
    }

    const passwordError = passwordValidate(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }
    const newHashedPassword = await bcrypt.hash(password, 10);
    const code =
      createRandomString(3) + extractCharact(email) + createRandomString(3);

    const userUpdated = await User.update(
      { password: newHashedPassword, code: code },
      {
        where: {
          email: email,
        },
      }
    );

    res.status(201).json({
      message: "Password succesfully updated"
    });
  } catch (error) {
    console.error("Error to change password", error);
    res.status(500).json({
      error: "Internal system error",
      details: error.message,
    });
  }
};

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function extractCharact(email) {
  const characters = email.substring(0, 3);
  return characters;
}

function emailValidate(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    return "El correo electrónico es obligatorio";
  } else if (!emailRegex.test(email)) {
    return "Ingresa un correo electrónico válido";
  }

  return null;
}

function passwordValidate(password) {
  if (password === "") {
    return "La contraseña es obligatoria";
  } else if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(password)) {
    return "La contraseña debe contener al menos una mayúscula";
  } else if (!/[0-9]/.test(password)) {
    return "La contraseña debe contener al menos un número";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "La contraseña debe contener al menos un carácter especial";
  }

  return null;
}

module.exports = { changePassword };
