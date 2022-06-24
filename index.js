const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT || 3000;


//import routes
const userRoutes = require('./routes/user_routes');

const corsOpts={
    origin:["http://localhost:4200"],
    methods:[
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowHeaders:[
        '*'
    ]
}
//middlewares
app.use(express.json())
app.use(cors(corsOpts))



//route middlewares
app.use('/users',userRoutes);

app.listen(`${PORT}`,()=>{
    console.log(`Listening at port: ${PORT}`);
});