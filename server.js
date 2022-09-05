
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const logger = require("morgan");


const userRoutes = require("./routes/user.routes");

const cors = require("cors");
const bankRoutes = require("./routes/bank.routes");
const port = parseInt(process.env.PORT || 3001);




const connect = async () => {
    try {
        const connected = await mongoose.connect(process.env.DB);
        console.log("connected to database")
    }
    catch (err) {
        console.log({ Error: err.message })
    }
}
connect();


app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use("/", userRoutes);
app.use("/", bankRoutes)
app.get("/", (req, res) => {
    res.send("Ok");
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went Wrong";
    res.json({ success: false, status: errorStatus, response: errorMessage, stack: err.stack })

    next();
})




app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));


