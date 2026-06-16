const bcript = require('bcryptjs')

exports.getPasswordHash = (password)=>{
    const salt = bcript.genSaltSync(10)
    return bcript.hashSync(password,salt) 
}

exports.isValidPassword = (localpass,dbpass)=>{
    return bcript.compareSync(localpass,dbpass)
}

