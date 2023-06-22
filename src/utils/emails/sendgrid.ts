import sgMail, { MailDataRequired } from '@sendgrid/mail'

export const sendPlainTextMail = async (
  toEmail: string,
  fromEmail: string,
  emailSubject: string,
  emailText: string,
  emailCategory?: string,
) => {
  const message: MailDataRequired = {
    to: toEmail,
    from: fromEmail,
    subject: emailSubject,
    text: emailText,
    category: emailCategory,
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  await sgMail.send(message)
}

export const sendTemplateMail = async (
  toEmail: string,
  fromEmail: string,
  emailSubject: string,
  emailTemplateId: string,
  emailCategory?: string,
  dynamicData?: { [key: string]: any }
) => {
  const message: MailDataRequired = {
    to: toEmail,
    from: fromEmail,
    subject: emailSubject,
    templateId: emailTemplateId,
    category: emailCategory,
    dynamicTemplateData: dynamicData,
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  await sgMail.send(message)
}
