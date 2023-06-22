import * as postmark from 'postmark'

export const sendPlainTextMail = async (
  toEmail: string,
  fromEmail: string,
  emailSubject: string,
  emailText: string,
  emailTag?: string,
) => {
  var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY)
  await client.sendEmail({
    To: toEmail,
    From: fromEmail,
    Subject: emailSubject,
    TextBody: emailText,
    Tag: emailTag,
  })
}

export const sendTemplateMail = async (
  toEmail: string,
  fromEmail: string,
  emailTemplateId: number,
  dynamicData?: { [key: string]: any },
  emailTag?: string,
) => {
  var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY)
  await client.sendEmailWithTemplate({
    To: toEmail,
    From: fromEmail,
    TemplateId: emailTemplateId,
    TemplateModel: dynamicData,
    Tag: emailTag,
  })
}
