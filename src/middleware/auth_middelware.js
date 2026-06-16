const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constent/Constent");
exports.authmidleware = async(req,res,next)=>{
try{
const token = req.headers["authorization"].split(" ")[1]
const decoded = jwt.verify(token,JWT_SECRET_KEY)
if(decoded){
    req.user=decoded;
    next()
}
else{
    res.json({
        success:false,
        message:"Unothorization token"
    })
}
     }catch(err){
        res.json({
            success:false,
            message:"Unothorization token"
        })
     }
}



 