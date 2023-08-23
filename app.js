const express = require("express");
const cors = require("cors");
const {expressjwt} = require("express-jwt");
const config = require("./config");
//引入路由
const storyRouter = require("./router/story");
const userRouter = require("./router/user");
const loveRouter = require("./router/love");



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((_,res,next) => {
    res.cc = (err,status = 1) => {
        res.send({
            code:status,
            message:err instanceof Error? err.message :err
        })
    }
    next();
})
app.use(expressjwt({secret:config.secret,algorithms:["HS256"]}).unless({path:[/login/,/register/,/getStoryList/,/getStoryBykeyWord/]}))
app.use("/StoryController",storyRouter);
app.use("/UserController",userRouter);
app.use("/LoveController",loveRouter);


app.use((err,req,res,next) => {
    if(err.name = "UnauthorizedError") return res.cc("身份认证失败");
    res.cc(err);
})


app.listen(8080,() => {
    console.log("http://127.0.0.1:8080 running");
})