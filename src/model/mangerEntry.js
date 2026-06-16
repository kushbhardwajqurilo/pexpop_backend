const mongoose = require("mongoose")
const Collection = require("../config/Collection")
require("../config/Db")


const managerEntrySchema = new mongoose.Schema({
    name:{type:String},
    sale1:{type:Number},
    rate1:{type:Number},
    sale2:{type:Number},
    rate2:{type:Number},
    sale3:{type:Number},
    rate3:{type:Number},
    total_sale_usd:{type:Number},
    total_sale_inr:{type:Number},
    agent_commission:{type:Number},
    costing_inr:{type:Number},
    revenue:{type:Number},
    payment_status:{type:String},
    date:{type:Date},
    agent_commission_inr:{type:Number},
    payment_status:{type:String},
},
{timestamps:true})





module.exports = managerEntrySchema