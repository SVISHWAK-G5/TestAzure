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
  res.send(JSON.stringify('working fine'));
})

app.post('/testapi/testapi', (req, res) =>{
var responseData = req.body;
var url=responseData["url"];
var data=responseData["data"];
console.log(data)

    request.post({
    url:url,
    body:data,
    json:true,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
    }, function (err, response, body) {
    if (err) {
        res.send('Error : '+ err)
        return
    }
    res.send({
      "Result":    {
         "ResultCode": 1,
         "ResultMessage": "Success",
         "CorrelationId": ""
      },
      "Value": {"LoginToken": "1_7aeac893-4a5a-4908-8f6d-1f99d08a0f54"},
      "Data":"MyData"
   })
  })
})

const PORT = process.env.PORT || 3006
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
