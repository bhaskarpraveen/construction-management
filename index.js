const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//import routes
const userRoutes = require('./routes/user_routes');


//middlewares
app.use(express.json())



//route middlewares
app.use('/users',userRoutes);

app.listen(`${PORT}`,()=>{
    console.log(`Listening at port: ${PORT}`);
})