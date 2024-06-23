const {Joi}=require('joi');
const { password } = require('./custom.validation');

const register={
    body:Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().custom(password)
    })
}


const login={
    body:{
        email:Joi.string().required().email(),
        password:Joi.string().required().custom(password),
    }
}

module.exports={register,login}
