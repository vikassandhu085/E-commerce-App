
const mailjet = require("node-mailjet")

const transporter = mailjet.apiConnect(
  
  "54fda6c0f5e642674a942ffede90b71c",
  "1c2657f5ab2610c4ba927e636604bc91"
)

module.exports = function(email,recipientName, title,body,html,callback)
{
  const request = transporter.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: "sandhuvikas085@gmail.com",
          Name: "Alibaba",
        },
        To: [
          {
            Email: email,
            Name: recipientName,
          }
        ],
        Subject: title,
        TextPart: body,
        HTMLPart: html
      }
    ]
})
request
  .then(result => {
    console.log(result, 'email-sent')
    callback();
  })
  .catch(err => {
    callback(err.statusCode)
  })
}