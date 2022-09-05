const jwt = require('jsonwebtoken')

module.exports = {

    jwtToken: async (req, res, next) => {
        try {
            const token = req.header("token");
            const verify = jwt.verify(token, process.env.JWT_SIGNATURE);
            if (!verify) {
                return res.send({ status: 401, Response: "token not match" });
            }
            next();
        }
        catch (err) {
            res.json({ Error: err.message })
        }
    }
}