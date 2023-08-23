const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");


// 注册
exports.register = (req, res) => {
    let { userId, userName, password } = req.body;
    const sql = "select * from user where userId = ?";
    db.query(sql, userId, (err, results) => {
        if (err) return res.cc(err);
        if (results.length > 0) return res.cc("该用户已存在");
        const sqlStr = "insert into user set ?";
        password = bcrypt.hashSync(password, 5)
        db.query(sqlStr, { userId, userName, password }, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc("注册失败");
            const tokenStr = jwt.sign({userId, userName,password:"",userImg:""},config.secret,{expiresIn:config.expiresIn});
            res.send({
                code:0,
                message:"注册成功",
                token:tokenStr
            })
        })
    })
}

//登录
exports.login = (req,res) => {
    const {userId,password} = req.body;
    const sql = "select * from user where userId = ?";
    db.query(sql,userId,(err,results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc("用户不存在");
        const result = bcrypt.compareSync(password,results[0].password);
        if(!result) return res.cc("密码错误");
        const user = {...results[0],password:"",userImg:""};
        const tokenStr = jwt.sign(user,config.secret,{expiresIn:config.expiresIn});
        res.send({
            code:0,
            message: "登录成功",
            user:{...user,userImg:results[0].userImg},
            token: tokenStr
        })
    })
}

//修改头像
exports.updateUserImg = (req,res) => {
    const {userImg,userId} = req.body;
    const sql = "update user set userImg = ? where userId = ?";
    db.query(sql,[userImg,userId],(err,results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc("更新失败");
        res.cc("更新成功",0);
    })
}
//修改用户名
exports.updateUserName = (req,res) => {
    const {userName,userId} = req.body;
    const sql = "update user set userName = ? where userId = ?";
    db.query(sql,[userName,userId],(err,results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc("更新失败");
        res.cc("更新成功",0);
    })
}