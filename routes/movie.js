var express = require('express');
var router = express.Router();
var Movie=require('./../models/Movie.js');

/* GET users listing. */
router.get('/add', function(req, res, next) {
	if(req.params.name){
		return res.render(
			'movie',{
			title:req.params.name+'|电影|管理|movie.me',
			label:'编辑电影'+req.params.name,
			movie:req.params.name
			});
	}else{
		return res.render(
			'movie',{
			title:'新增加|电影|管理|movie.me',
			label:'新增加电影',
			movie:false
			});
	
	} 
  
});

router.post('/add',function(req,res,next){
	console.log(req.body.content);
var json = req.body.content;
if(json.name){//update
} else {//insert
Movie.save(json, function(err){
if(err) {
res.send({'success':false,'err':err});
} else {
res.send({'success':true});
}
});
}


});



module.exports = router;
