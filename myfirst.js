var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'myEmail',
    pass: 'myPassword'
  }
});

var mailOptions = {
  from: 'fromEmail',
  to: 'toEmail',
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