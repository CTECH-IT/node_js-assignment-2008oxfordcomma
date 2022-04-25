var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '2008oxfordcomma@gmail.com',
    pass: 'KAxyRMJ*K^Us'
  }
});

var mailOptions = {
  from: '7502401@isd535.org',
  to: 'viralvlogger2401@gmail.com, 2008oxfordcomma@gmail.com',
  subject: 'Node JS Email',
  html: '<p>Hey Mr.Bartucz<br>This is my email made with node.js.</p>',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});