// here in this middleware we need to get our user by verifying the token

const jwt = require("jsonwebtoken")
const jwt_secret = "blogMania"


const fetchUser = (req,res,next)=>{

    try {
        
        // get the token from req header
        let token = req.header("auth-token")
        // got the token or not
        if(!token){
            res.send({error : "User cannot be found by middleware"})
        }
    
        // you got the token now verify it 
        let data = jwt.verify(token,jwt_secret)
        req.user = data.user
        next()
    } catch (error) {
        // res.send({error : "User cannot be found by middleware error in catch"})
    }


}

module.exports = fetchUser