const db = require("../db");

// 根据关键词查找故事
exports.getStoryBykeyWord = (req,res) => {
    const keyWord = req.params.keyWord;
    const sql = "select * from story where keyWord = ? order by loves";
    db.query(sql,keyWord,(err,results) => {
        if(err) return res.cc(err);
        res.send({
            code:0,
            storyList:results
        })
    })
}
// 获取故事
exports.getStoryList = (req,res) => {
    const limit = req.params.limit;
    const start = (req.params.pages - 1) * limit;
    const sql = `select * from story order by loves desc limit ${limit} offset ${start}`;
    db.query(sql,(err,results) => {
        if(err) return res.cc(err);
        let storyList = results;
        const sqlstr = "select count(*) as total from story";
        db.query(sqlstr,(err,results) => {
            if(err) return res.cc(err);
            res.send({
                code:0,
                storyList,
                currentPage:Number(req.params.pages),
                totalPage:Math.ceil(results[0].total / limit)
            })
        })
    })
}

// 添加故事
exports.addStory = (req,res) => {
    const sql = "insert into story set ?";
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth();
    const date = current.getDate();
    const str = `${year}-${month}-${date}`;
    const user = {...req.body,loves:0,storyDate:str};
    db.query(sql,user,(err,results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc("添加失败");
        res.send({
            code:0,
            storyList:results
        })
    })
}
