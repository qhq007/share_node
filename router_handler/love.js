const db = require("../db");

exports.hasLove = (req,res) => {
    const {storyId,userId} = req.body;
    const sql = "select * from love where storyId = ? and userId = ?";
    db.query(sql,[storyId,userId],(err,results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc("没有相关内容");
        res.cc("已添加至喜欢",0);
    })
}
exports.addLove = (req,res) => {
    const {storyId,userId} = req.body;
    const sql = "insert into love set ? ";
    db.query(sql,{storyId,userId},(err,results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc("添加失败");
        const sqlstr = "update story set loves = loves + 1 where storyId = ?";
        db.query(sqlstr,storyId,(err,results) => {
            if(err) return res.cc(err);
            if(results.affectedRows !== 1) return res.cc("更新失败");
            res.cc("更新成功",0);
        })
    })
}
exports.removeLove = (req,res) => {
    const {storyId,userId} = req.body;
    const sql = "delete from love where storyId = ? and userId = ?";
    db.query(sql,[storyId,userId],(err,results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc("删除失败");
        const sqlstr = "update story set loves = loves - 1 where storyId = ?";
        db.query(sqlstr,storyId,(err,results) => {
            if(err) return res.cc(err);
            if(results.affectedRows !== 1) return res.cc("更新失败");
            res.cc("更新成功",0);
        })
    })
}
exports.getLoveList = (req,res) => {
    const {userId} = req.params;
    const sql = "select * from love where userId = ?";
    db.query(sql,userId,(err,results) => {
        if(err) return res.cc(err);
        if(results.length < 1) return res.cc("没有相关内容");
        const sqlStr = `select * from story where storyId = ?`;
        db.query(sqlStr,results[0].storyId,(err,results) => {
            if(err) return res.cc(err);
            if(results.length < 1) return res.cc("没有相关内容");
            res.send({
                code:0,
                loveList:results
            })
        })
    })
}
