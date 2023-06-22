import formData from 'form-data'
import Mailgun from 'mailgun.js'

const mailgun = new Mailgun(formData)

export const sendPlainTextMail = async (
  toEmail: string,
  fromEmail: string,
  emailSubject: string,
  emailText: string,
) => {
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: process.env.MAILGUN_URL
  })

  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    to: toEmail,
    from: fromEmail,
    subject: emailSubject,
    text: emailText,
  })
}

export const sendTemplateMail = async (
  toEmail: string,
  fromEmail: string,
  emailSubject: string,
  emailTemplateName: string,
  emailTemplateData?: { [key: string]: string }
) => {
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: process.env.MAILGUN_URL
  })

  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    to: toEmail,
    from: fromEmail,
    subject: emailSubject,
    template: emailTemplateName,
    'h:X-Mailgun-Variables': JSON.stringify(emailTemplateData),
  })
}
