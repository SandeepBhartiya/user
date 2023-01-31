const app=require('express')();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const serverConfig=require('./configs/server.config');
const dbConfig=require('./configs/db.config');
const User=require('./models/user.model');

app.use(bodyParser.json());
mongoose.connect(dbConfig.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log('Error...');
});

db.once("open",()=>{
    console.log('Connected...');
    init();
})


async function init()
{
    try
    {
        await User.collection.drop();
    }
    catch(err)
    {
        console.log("Error")
    }
}

require('./routes/auth.route')(app);
app.listen(serverConfig.PORT,()=>[
    console.log(`server connected At:${serverConfig.PORT}`)
])