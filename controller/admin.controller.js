const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {

    Register: async (req, res, next) => {
        try {
            let { FirstName, LastName, Email, Password, Phone_no, Address } = req.body;
            if (!FirstName || !LastName || !Email || !Password || !Phone_no || !Address) {
                return res.json({ Error: "all fields are required" })
            }
            const emailFind = await User.findOne({ Email })
            if (emailFind) {
                return res.json({ response: "Email Id already exists" })
            }
            const PhoneNoFind = await User.findOne({ Phone_no })
            if (PhoneNoFind) {
                return res.json({ response: "Phone no already exists" })
            }
            let Admin = true;

            const salt = await bcrypt.genSalt(6);
            Password = await bcrypt.hash(Password, salt);

            const data = { FirstName, LastName, Email, Password, Phone_no, Address, Admin }
            const detail = await User.create(data)
            res.json({ status: 200, response: "User added", detail })
        } catch (err) {
            next(err)

        }
    },

    Login: async (req, res, next) => {
        try {

            const { Email, Password } = req.body;
            if (!Email) {
                return res.send("Email is required")
            }
            if (!Password) {
                return res.send("Password is required")
            }

            console.log(req.body)
            const user = await User.findOne({ Email });
            if (!user) {
                return res.send({ status: 404, Response: "User Not found" });
            }
            const match = await bcrypt.compare(Password, user.Password);
            if (!match) {
                return res.send({ status: 401, Message: "Password not match" })
            }

            const token = jwt.sign({ Email: Email }, process.env.JWT_SIGNATURE, { expiresIn: '24h' },)// const
            res.send({ status: 200, response: "signup successfully ", token: token })


        } catch (err) {

            next(err)
        }

    }

}