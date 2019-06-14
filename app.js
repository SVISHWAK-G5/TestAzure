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


app.post('/test-api/testapi', (req, res) =>{
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
    res.send(response.body)
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
