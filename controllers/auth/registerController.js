const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const nameError = nameValidate(firstName);
    if (nameError) {
      return res.status(400).json({ error: nameError });
    }

    const lastNameError = lastNameValidate(lastName);
    if (lastNameError) {
      return res.status(400).json({ error: lastNameError });
    }

    const emailError = emailValidate(email);
    if (emailError) {
      return res.status(400).json({ error: emailError });
    }

    const passwordError = passwordValidate(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code =
      createRandomString(3) + extractCharact(email) + createRandomString(3);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      code: code,
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error to create a user", error);
    res.status(500).json({
      error: "Server internal error",
      details: error.message,
    });
  }
};

function nameValidate(firstName) {
  if (!firstName) {
    return "El nombre es obligatorio";
  } else if (firstName.length < 3) {
    return "El nombre debe tener al menos 3 caracteres";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(firstName)) {
    return "Solo se permiten letras y espacios";
  }
  return null;
}

function lastNameValidate(lastName) {
  if (lastName === "") {
    return "Los apellidos son obligatorios";
  } else if (lastName.length < 3) {
    return "Los apellidos deben tener al menos 3 caracteres";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastName)) {
    return "Solo se permiten letras y espacios";
  }
  return null;
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

module.exports = { createUser };
