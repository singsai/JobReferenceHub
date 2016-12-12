//module to send email via mailgun documentation at https://www.npmjs.com/package/mailgun-js

var domain = 'hr50.site';
var api_key = require('./keys.js').mailgun;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'Testing-mailgun@red0.red',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});

