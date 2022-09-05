const Bank = require('../model/bank.model')
const bcrypt = require('bcrypt')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')

module.exports = {

    AddBank: async (req, res, next) => {
        try {
            const { id } = req.params;
            const findUser = await User.findOne({ _id: id })
            if (!findUser) {
                return res.json("User not found")
            }
            const UserID = await findUser.UserID
            let { Bank_Name, Branch, IFSC_Code, Account_No } = req.body;
            if (!Bank_Name || !Branch || !IFSC_Code || !Account_No) {
                return res.json({ Error: "all fields are required" })
            }
            const salt = await bcrypt.genSalt(6);
            Bank_Name = await bcrypt.hash(Bank_Name, salt);
            Branch = await bcrypt.hash(Branch, salt);
            IFSC_Code = await bcrypt.hash(IFSC_Code, salt);
            Account_No = await bcrypt.hash(Account_No, salt);

            const data = { UserID, Bank_Name, Branch, IFSC_Code, Account_No, }
            const bankDetail = await Bank.create(data)
            await bankDetail.save();
            res.json({ status: 200, respone: `Bank added`, bankDetail })
        } catch (err) {
            next(err)
        }
    },
    viewBank: async (req, res, next) => {
        try {
            const { id } = req.params;
            const findBank = await Bank.findOne({ _id: id }).select("-__v")
            if (!findBank) {
                return res.json("User not found")
            }
            const { _id } = await findBank.UserID;
            const userDetail = await User.findOne(_id).select("-Password").select("-__v")
            res.json({ status: 200, findBank, userDetail })
        } catch (err) {
            next(err);
        }
    },
    UpdateBankAccount: async (req, res, next) => {
        try {
            const { id } = req.params;
            let { Bank_Name, Branch, IFSC_Code, Account_No } = req.body;
            const salt = await bcrypt.genSalt(6);
            Bank_Name = await bcrypt.hash(Bank_Name, salt);
            Branch = await bcrypt.hash(Branch, salt);
            IFSC_Code = await bcrypt.hash(IFSC_Code, salt);
            Account_No = await bcrypt.hash(Account_No, salt);
            const data = { Bank_Name, Branch, IFSC_Code, Account_No, }
            const updateUser = await Bank.findByIdAndUpdate({ _id: id }, data, { new: true, })
            res.json({ status: 200, Response: "user updated" });
        } catch (err) {
            next(err)
        }
    },
    DeleteBankAccount: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log()
            const bankAccount = await Bank.findByIdAndDelete({ _id: id })
            if (!bankAccount) {
                return res.json({ status: 400, Response: "Bank Account Doesn't exists" })
            }
            res.json({ Status: 200, Response: "User deleted" })
        } catch (err) {
            next(err)
        }
    },
}