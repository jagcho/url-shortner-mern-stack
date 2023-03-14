const express = require("express")
const bodyParser = express.json()
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")
const path=require('path')

app.use(bodyParser)

var cors = require('cors')

app.use(cors())

if(process.env.PORT==='production'){
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })

}else{
    app.use("/", route)
}



mongoose.connect("mongodb+srv://Jagcho:71nEXJtXcYfVx8T6@cluster0.5bg4mzz.mongodb.net/Url-Shortner"
    , {useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))





app.listen(process.env.PORT || 5000, function () { console.log("Express is running on port " + (process.env.PORT || 5000)) });