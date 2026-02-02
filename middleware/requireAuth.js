const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers  // in headers properties has authorization property

    if(!authorization) {
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1]  // we use this split method becuase token in the authorization come like "bearer sjudhfsdhfskjdhfkjuhs". so to remove bearer part and only to get the token part we do this.

    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')  // attaching useid to req object. user in  req.user is custom name it can be any name.
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }


}

module.exports = requireAuth