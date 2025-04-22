const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const searchUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Incorrect email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET, 
                { expiresIn: '20m' } 
            );

            res.status(200).json({
                message: 'Valid credentials',
                token 
            });
        } else {
            return res.status(400).json({ error: 'Incorrect email or password' });
        }
    } catch (error) {
        console.error("Error to authenticate", error);
        res.status(500).json({
            error: "Server internal error",
            details: error.message
        });
    }
}

module.exports = { searchUser };
