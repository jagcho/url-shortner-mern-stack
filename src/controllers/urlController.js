const urlModel = require("../models/urlModel")
const shortId = require("shortid")
//const valid_url = require("valid-url")
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  16506,
  "redis-16506.c264.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("C8OzTFe2UVSgxh4EII9vumW2IAIaF59D", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});




const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);




const flushw = (req, res) => {
  redisClient.flushall("ASYNC", (err, data) => {
    if (err)
      console.log(err)
    else if (data)
      console.log("Memory flushed: ", data)
  })
  res.status(200).send({ message: "redis memory cleared" })
}


const createUrl = async function (req, res) {
  try {
    const longUrl = req.body.longUrl.trim();
    const baseUrl = "http://localhost:3000/"


    const urlCode = shortId.generate().toLowerCase();

    let cahcedProfileData = await GET_ASYNC(`${longUrl}`)
    if (cahcedProfileData) {
      return res.status(200).send({ status: true, data: JSON.parse(cahcedProfileData),message:"success" })
    } else {
      let urlData = await urlModel.findOne({ longUrl: longUrl }).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 });
    
      if (urlData) {
        await SET_ASYNC(`${longUrl}`, JSON.stringify(urlData))
        return res.status(200).send({ status: true, data: urlData ,message:"shortUrl Created successful"})

      }

      const shortUrl = baseUrl + urlCode;
      const input = { longUrl: longUrl, shortUrl: shortUrl, urlCode: urlCode };

      urlData = await urlModel.create(input);

      const displayData = { longUrl: urlData.longUrl, shortUrl: urlData.shortUrl, urlCode: urlData.urlCode }

      await SET_ASYNC(`${longUrl}`, JSON.stringify(displayData), 'EX', 60*60 )

      return res.status(201).send({ status: true, data: displayData ,message:"shortUrl Created successful"});




    }
  }
  catch (err) {
    return res.status(500).send({ status: false, error: err.message ,message:"failed"})
  }
}



const getUrl = async function (req, res) {
  try {
    let urlCode = req.params.urlCode
    
    if (!shortId.isValid(urlCode)) return res.status(400).send({ status: false, message: "invalid format of the urlCode, i.e. it must be of length>5 & comprised of only[a-zA-Z0-9_-]" })
    let cahcedProfileData = await GET_ASYNC(`${urlCode}`)
    if (cahcedProfileData) {
      //console.log('From cache')
      return res.status(302).redirect(cahcedProfileData)
    }
    else {
      let urlData = await urlModel.findOne({ urlCode: urlCode });
      // console.log(urlData)

      if (!urlData) {
        return res.status(404).send({ status: false, message: "urlCode not found!" });
      }

      await SET_ASYNC(`${urlCode}`, urlData.longUrl)

      console.log("Redirecting to the url!!")

      return res.status(200).send({data:urlData.longUrl});

    }
  }
  catch (err) {
    return res.status(500).send({ status: false, error: err.message })
  }


}



module.exports = { createUrl, getUrl, flushw }