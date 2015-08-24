var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection('localhost','test'); //创建一个数据库连接

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
      //一次打开记录
});



// var PersonSchema = new mongoose.Schema({
//       name:String,   //定义一个属性name，类型为String
//       email:String,
//       age:Number
//     });


var StudentSchema = new mongoose.Schema({
      name:String,   //定义一个属性name，类型为String
      email:String,
      age:Number
    });

 //为Schema模型追加speak方法
// PersonSchema.methods.speak = function(){
//   console.log('我的名字叫'+this.name);
// }

StudentSchema.methods.speak = function(){
  console.log('我的名字叫'+this.name);
}


// var PersonModel = db.model('Person',PersonSchema);
//     //如果该Model已经发布，则可以直接通过名字索引到，如下：
//     //var PersonModel = db.model('Person');
//     //如果没有发布，上一段代码将会异常

// var personEntity = new PersonModel({name:'Krouky'});
    //打印这个实体的名字看看
//console.log(personEntity.name); //Krouky  

//personEntity.save();  //执行完成后，数据库就有该数据了


var StudentModel = db.model('Student',StudentSchema,'student_rename');
    //如果该Model已经发布，则可以直接通过名字索引到，如下：
    //var PersonModel = db.model('Person');
    //如果没有发布，上一段代码将会异常

var studentEntity = new StudentModel({
	name:'ricky',
	email:'ricky@test.com',
	age:29

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
	//console.log(studentEntity.name); //Krouky 
	//studentEntity.speak();//我的名字叫Krouky

	// studentEntity.save(function(err, studentEntity){
	// 		if (err) {
	// 			console.log(err)
	// 		} else {
	// 			personEntity.speak();	
	// 		}
	// });

	StudentModel.findOne({ age: 29}, function (err, doc){
  	console.log(doc);
});

  res.render('index', { title: 'Express' });
});

module.exports = router;
