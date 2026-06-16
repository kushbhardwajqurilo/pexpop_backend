const mongoose = require("mongoose")
const Collection = require("../config/Collection")
require("../config/Db")
const entrySchema = require("./Entry")

const dateRecordSchema = new mongoose.Schema({
    date:{type:Date,unique:true},
    costing_inr:{type:Number,default:0},
    entries:[entrySchema],
},
{timestamps:true})

const DateRecordModel = mongoose.model(Collection.date_record,dateRecordSchema)



module.exports = DateRecordModel