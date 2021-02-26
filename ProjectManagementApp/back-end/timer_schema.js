var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timerSchema = new Schema({
    datetime: {type:Date, require:true},
    task_id: {type:String, require:true},
    task_name: {type:String,require:true, unique:true},
}, {collection: 'timers'});
exports.timerSchema = timerSchema;
