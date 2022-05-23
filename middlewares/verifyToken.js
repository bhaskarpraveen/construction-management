const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN||"CONSTRUCTIONAPITOKEN";

module.exports ={
    verifyToken:function(request,response,next){
        try {
            const {token} = request.headers;
            jwt.verify(token,TOKEN,function(err,data){
                if(err){
                    return response.status(400).json({"message":'Unauthorizeed request'});
                }
                if(data){
                    request.tokenData = data;
                    next();
                }
            })

        } catch (error) {
            return response.status(500).json({"message":error.message})
        }
    }
}