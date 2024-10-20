const express = require("express");
const { DatabaseConnect } = require("./scr/config/database.js");
const cookieParser = require("cookie-parser");
const Auth = require("./scr/utils/Auth.js");
const { authRouter } = require("./scr/routes/auth.js");
const { profileRouter } = require("./scr/routes/profile.js");
const requestRouter = require("./scr/routes/connectionReq.js");
const userRouter = require("./scr/routes/user.js");
const cors=require("cors")
const app = express();

app.use(cors({
  origin: "process.env.YOURWEBAPPURL",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



DatabaseConnect()
  .then(() => {
    console.log("Database is connected!");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at port number ${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.log(` Error  ${process.env.PORT} `);
  });
