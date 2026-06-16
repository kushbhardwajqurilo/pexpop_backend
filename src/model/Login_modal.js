const mongoose = require("mongoose")
require("../config/Db")

const { getPasswordHash } = require("../utils/Utils")
const Collection = require("../config/Collection")




const userloginSchema = new mongoose.Schema({
    email:{type:String,required:[true,"name is required feild"],unique:true},
    password:{type:String,required:[true,"password is required feild"]},
   
},
{timestamps:true}
)

userloginSchema.pre("save",function(){
    this.password = getPasswordHash(this.password)
})


const UserLoginModel = mongoose.model(Collection.user_login,userloginSchema)



module.exports = UserLoginModel

