const router = require('express').Router();
const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const user = require('../models/User');
const Todo = require('../models/TodoList');


//Dashboard endpoint
router.get('/Dashboard', (req,res) =>{
    res.send('Dashboard');
})

//user sign up
router.post('/Signup', async(req,res)=>{
	console.log('User Signing up...')
	try{
	let _pass = req.body._pass;
	_pass	= Bcrypt.hashSync(req.body._pass, 12)
	let userObj ={
		"_id": new mongoose.Types.ObjectId(),
		"username": req.body.username,
		"_pass": _pass
		}
	

let newUser = new user(userObj);
await newUser.save((err, user) =>{
	if(err){
		res.status(400).send({msg: 'User Sign-up Failed'})
	}else{
		res.status(200).json(user);
	}
})
	}catch(err){
		return res.status(500).send(err)
	}
})

//Sign-in and compare user password
router.post('/Authenticate',async(req, res)=>{
	console.log('Authenticating user...');
	try{
		let User = await user.findOne({username: req.body.username}).exec();
		if(!User){
			return res.status(400).send({message: "Invalid Username"});
		}
		if(!Bcrypt.compareSync(req.body._pass,User._pass)){
			return res.status(400).send({message: "The password is invalid"})
        }else{
            return res.status(200).send({msg: `${User.username}: Signed-in successful! `})
        }
		
	}catch(err){
		res.status(500).send(err)
	}
	
})


//insert new TodoList documents into mongodb
router.post('/Todo', (req,res)=>{
	console.log('Inserting Todo into database...');
	let todoObj = {
		"_id": new mongoose.Types.ObjectId(),
		"List":req.body.List,
		"author": "5f21892d3df73a1eb6af4019"
	}
	let newTodo = new Todo(todoObj);
    newTodo.save((err, _todo) =>{
	if(err){
		res.status(400).send("Failed to add Document!")
	}else{
		res.status(200).json(_todo);
	}
})
})

//update TodoList
router.put('/TodoUpdate/:id',(req,res)=>{
	console.log("updating TodoList Document...")
	let todoObj = {
			"List":req.body.List,
		} 
	
		Todo.findByIdAndUpdate(req.params.id, todoObj, {new : true}).populate({path: 'author', select: "username"}).exec((err,_todo)=>{
		if(err){
			res.status(400).send(err);
		}else{
			res.status(200).json(_todo)
		}
	})
	})

	//delete from TodoList
router.delete('/TodoDel/:id',(req,res)=>{
	console.log('deleting From TodoList')
	Todo.findByIdAndDelete(req.params.id).exec((err, _todo)=>{
		if(err){
			res.status(400).send(err);
		}else{
			res.status(200).json(_todo);
		}

	})
})


//home route to retrieve all post data 
router.get('/TodoItems',(req,res)=>{
	console.log('Retrieving All Documents in the list')
 Todo.find({}).populate({path: 'author', select: "username"}).exec((err,_todo)=>{
	if(err){
		res.status(400).send({msg:'Failed to Retrieve Documents' })
	}else{
		res.status(200).send(_todo)
	}
	res.end();
})
})



module.exports = router;




