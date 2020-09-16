const sgMail = require('@sendgrid/mail')
const MY_EMAIL= process.env.MY_EMAIL
const SENDGRID_API_KEY= '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'
sgMail.setApiKey(SENDGRID_API_KEY)



const sendWelcomeEmail = (email, name) =>{
  sgMail.send({
    to: email,
    from: MY_EMAIL,
    subject: `Welcome ${name}`,
    text: ` Thank you for sign up in our task app ${name} let me know how did you find the app`

  })

}

const sendCancelAccount = (email, name) =>{

  sgMail.send({
    to: email,
    from: MY_EMAIL,
    subject: `Sorry you are leaving us`,
    text: `Hi ${name}, we are sorry you cancelled your email, please let us know your feedback to improve our platform`
  })
}



module.exports = {
  sendWelcomeEmail,
  sendCancelAccount
}