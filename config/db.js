const mongoose = require('mongoose');

const url = 'mongodb+srv://gatsheni:codehub123@codehub-o7ubp.mongodb.net/Todo?retryWrites=true&w=majority';

mongoose.connect(url,{useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true },(err) =>{
    if(!err){
        console.log('DB instance connected to Server Successful!');
    }else{
        console.log('DB instance connection to Server Failed!');
    }
})