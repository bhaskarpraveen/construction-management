let {verifyToken} = require('../middlewares/verifyToken');

let verifyRole = (role)=>{
    return async function(request,response,next){
        try {
            if(!request.tokenData) {
                await verifyToken();
            }
            if(role==request.tokenData.role){
                next();
            }else{
                return response.status(401).json({"message":"unauthorized request","status":false});
            }
        } catch (error) {
            
        }
       
    }
}

module.exports={
    verifyRole
}