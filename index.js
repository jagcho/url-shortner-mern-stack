const express = require("express")
const bodyParser = express.json()
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")
const path = require('path')
const dotenv=require('dotenv')

app.use(bodyParser)

var cors = require('cors')

app.use(cors())

//configure env
dotenv.config();
// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

mongoose.connect(process.env.MONGO_URL
    , { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));

app.use("/", route)



app.listen(process.env.PORT || 5000, function () { console.log("Express is running on port " + (process.env.PORT || 5000)) });
