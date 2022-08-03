const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const fileupload = require('express-fileupload');
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
app.use(fileupload({
    createParentPath:true,
    limits:{
        fileSize:50*1024*1024 //50 MB
    },
    abortOnLimit:true
}))


//route middlewares
app.use('/users',userRoutes);

app.listen(`${PORT}`,()=>{
    console.log(`Listening at port: ${PORT}`);
});