var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/',function(req,res,next){
 	var username=req.query.username;
	var userPwd=req.query.password;
	//var username2=req.params('username');
	//var userPwd2=req.params('password');
	console.log(username+"="+userPwd+"||");
	console.log("------");
	res.render('login',{title:'用户登录'});
});
router.post('/',function(req,res,next){
        var username=req.body.username;
        var userPwd=req.body.password;
        //var username2=req.params('username');
        //var userPwd2=req.params('password');
        console.log(username+"="+userPwd+"||");
       	var user={
		username:'admin',
		password:'admin'
	}
	if(req.body.username===user.username&&req.body.password===user.password){
		req.session.user=user;
		res.redirect('/users');	
		
	}else{
		req.session.error='用户名或密码不正确';
		res.redirect('/login');
	}
        
});


module.exports = router;
