const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let generateOtp = function(phone_number,message){
    try {
        let res = client.messages
        .create({body: message, from: '+18573747845', to: phone_number})
        .then(message => {return {'status':true,'message':'successfully sent'}})
        .catch(e=>{return {'status':false,'message':e.message};});
        return res;
    } catch (error) {
        return {'status':false,'message':error.message};
    }
};

module.exports={generateOtp};