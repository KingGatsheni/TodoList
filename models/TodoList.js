const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
_id: mongoose.Types.ObjectId,
List:String,
author:{
	type:Schema.Types.ObjectId,
	ref: 'User'
}},
{
	timestamps: true
});
module.exports = mongoose.model('TodoDb', TodoSchema);