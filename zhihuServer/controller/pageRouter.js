module.exports = function(app){
  app.get("/question",(req,res)=>{
    res.render('question');
  })
};
