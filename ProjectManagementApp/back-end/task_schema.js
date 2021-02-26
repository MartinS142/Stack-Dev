var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    name: {type: String, require:true, unique:true},
    totalTime: {type: String, require:true },
    project_id: {type: String, require:true},
    datetime: {type: String, require:true},
}, {collection: 'tasks'});
taskSchema.index({name:1});
exports.taskSchema = taskSchema;
