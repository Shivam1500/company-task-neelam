const User = require('../model/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {

    AddUser: async (req, res, next) => {
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
            const salt = await bcrypt.genSalt(6);
            Password = await bcrypt.hash(Password, salt);

            const data = { FirstName, LastName, Email, Password, Phone_no, Address }
            console.log(data)
            const addUser = await User.create(data)
            const UserID = addUser._id;
            const newdata = { UserID, FirstName, LastName, Email, Password, Phone_no, Address }

            const UpdateUser = await User.findByIdAndUpdate({ _id: UserID }, newdata, { new: true });
            await UpdateUser.save();
            res.json({ status: 200, message: "User added" })
        }
        catch (err) {
            next(err)
        }
    },
    ViewUser: async (req, res, next) => {
        try {
            const user = await User.find().select("-Password").select({ "Admin": true });
            console.log(user)
            res.json({ status: "200", response: user });
        } catch (err) {
            next(err)
        }
    },
    ViewSingleUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id }).select("-Admin")
            if (!user) {
                return res.json({ status: 200, Response: "user with this Id don't exists" })
            }
            res.json({ status: 200, Response: user })

        } catch (err) {
            next(err)
        }
    },
    UpdateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(req.body);

            const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true, })

            res.json({ status: 200, Response: "user updated", updateUser });
        } catch (err) {
            next(err)
        }
    },
    DeleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete({ _id: id })
            res.json({ Status: 200, Response: "User deleted" })
            if (!user) {
                return res.json({ status: 400, Response: "employee don't exists" })
            }

        } catch (err) {
            next(err)
        }
    },

}