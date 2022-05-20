const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN||"CONSTRUCTIONAPITOKEN"
const USERS = {
    'admin':1,
    'receptionist':2,
    'worker':3,
    'client':4
}

router.post('/register',async (request,response)=>{
    try {
        let {first_name,last_name,email,phone_number,password} = request.body;
        if(first_name&&last_name&&email&&phone_number&&password){
            let existing_records = await pool.query("SELECT COUNT(*) FROM users WHERE phone_number = $1 OR email = $2",[phone_number,email]);
            if(existing_records.rows[0].count==0){
                let hashed_password = bcrypt.hashSync(password,12);
                await pool.query("INSERT INTO users(first_name,last_name,email,phone_number,password,role_id) VALUES($1,$2,$3,$4,$5,$6);",[first_name,last_name,email,phone_number,hashed_password,USERS['client']]);
                return response.status(200).json({"message":"User successfully registered"});
            }else{
                return response.status(400).json({"message":"User with same email or phone number already exists"});
            }
            
        }else{
            return response.status(400).json({"message":"Please enter all details"});
        }
        
    } catch (error) {
        return response.status(501).json({"message":error.message})
    }
});
router.post('/login',async (request,response)=>{
    try {
        let {phone_number,password} = request.body;
        if (phone_number,password){
            let record = await pool.query("SELECT phone_number,password,verified,approved FROM users WHERE phone_number = $1",[phone_number]);
            if(record.rows.length>0){
                let check = bcrypt.compareSync(password,record.rows[0].password);
                if(check){
                    if(record.rows[0].verified){
                        if(record.rows[0].approved){
                            let token =  await jwt.sign({phone_number:phone_number},TOKEN,{expiresIn:'3h'});
                            return response.status(200).json({"message":"Logged in successfully","token":token});
                        }else{
                            return response.status(401).json({"message":"account not approved by the admin"});
                        }
                    }else{
                        return response.status(401).json({"message":"Phone number not verified yet"});
                    }
                    
                }else{
                    return response.status(401).json({"message":"Invalid Credentials"});
                }
            }else{
                return response.status(401).json({"message":"No record found"});
            }
        }else{
            return response.status(400).json({"message":"Please enter all details"})
        }
    } catch (error) {
        return response.status(501).json({"message":error.message});
    }
})
router.get('/',async (req,res)=>{
    try {
       let users = await pool.query('SELECT * FROM users');
       res.send(users);
      
    } catch (error) {

        return res.json({"error":error})
    }
    // pool.query('SELECT * FROM users', (error, results) => {
    //     if (error) {
    //       throw error
    //     }
    //     res.status(200).json(results.rows)
    //   })
    // return res.send("Hello world!!")
});

module.exports = router;