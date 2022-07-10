const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN||"CONSTRUCTIONAPITOKEN";

module.exports ={
    verifyToken:function(request,response,next){
        try {
            const {token} = request.headers;
            jwt.verify(token,TOKEN,function(err,data){
                if(err){
                    return response.status(401).json({"message":'Unauthorized request'});
                }
                if(data){
                    request.tokenData = data;
                    next();
                }
            })

        } catch (error) {
            return response.status(501).json({"message":error.message})
        }
    }
}