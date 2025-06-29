const db = require('../../models/index')
const { resend } = require('../../services/resend')
const User = db.User

async function emailForRecobery (req, res) {

    try{
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(400).json("Email not found")
        }

        userName = user.firstName
        verificationCode = user.code
        userEmail = user.email

        resend(userEmail, verificationCode, userName)

        res.status(200).json("Verification code sent successfully")

    }catch(error){
        console.log(error)
        res.status(500).json("Problems to send email")
    }

}

module.exports = { emailForRecobery }