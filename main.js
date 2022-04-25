var nodemailer = require('nodemailer');
var myEmail = 'placeHolderEmail';
var myPassword = 'placeHolderPassword';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: myEmail,
    pass: myPassword,
  }
});

var mailOptions = {
  from: myEmail,
  to: 'jobartucz@isd535.org',
  subject: 'Node JS Email',
  html: '<p>Hey Mr.Bartucz,<br /><br />This is my email sent to you with Node.js.<br /><br />Sincerely,<br>Dre Harm</p>',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});