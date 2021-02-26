var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    name: {type: String, require:true, unique:true},
}, {collection: 'projects'});
projectSchema.index({name:1});
exports.projectSchema = projectSchema;
