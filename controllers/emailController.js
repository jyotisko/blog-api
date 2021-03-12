const nodemailer = require('nodemailer');

exports.sendMail = (req, res) => {
  const SENDER_EMAIL = process.env.EMAIL;
  const SENDER_PASSWORD = process.env.EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  });

  const mailOptions = {
    from: SENDER_EMAIL,
    to: req.body.email,
    subject: 'Blog Account Creation',
    html: 'Hey, your account has been succesfully created!'
  };

  transporter.sendMail(mailOptions, (error, _) => {
    if (error) {
      res.status(400).json({
        status: 'failed',
        ok: false,
        error: error
      });
    } else {
      res.status(200).json({
        status: 'success',
        ok: true,
        message: 'Mail sent!'
      });
    }
  });
};
