const express = require('express')
const request=require('request')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json({
  extended: true,
  inflate: true,
  limit: '100kb',
  parameterLimit: 1000,
  type: 'application/json',
  verify: undefined
}))

app.get('/test/testapi',(req,res)=>{
  res.send('working fine');
})

app.post('/testapi/testapi', (req, res) =>{
var responseData = req.body;
var url=responseData["url"];
var data=responseData["data"];
    request.post({
    url:url,
    body:data,
    json:true,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
    }, function (err, response, body) {
    if (err) {
        res.send(err) 
        return
    }
    res.send(body)
  })
})

const PORT = process.env.PORT || 3008
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// {
// 	"url":"https://inads20/NICEConnectAPI/Login.svc/Rest/clientLoginWithDomain",
// 	"data": {
// 	"OsLogin":"apitest2",
// 	"Password": "nicecti",
// 	"Domain": "actdev"
// 	} 
// }
