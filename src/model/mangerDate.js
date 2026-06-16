const mongoose = require("mongoose")
const Collection = require("../config/Collection")
const managerEntrySchema = require("./mangerEntry")
require("../config/Db")
 

const managerDateRecordSchema = new mongoose.Schema({
    date:{type:Date,unique:true},
    costing_inr:{type:Number,default:0},
    entries:[managerEntrySchema],
},
{timestamps:true})

const ManagerDateRecordModel = mongoose.model(Collection.manger_record,managerDateRecordSchema)



module.exports = ManagerDateRecordModel