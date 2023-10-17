export default class EmailSenderService implements emailSenderInerface{
        async sendEmail(emailContent: string, emailSubject: string, emailsTo: string[]): Promise<void> {
          emailsTo.map(async (emailTo) => {
            const email = new EmailTemplate(emailContent, emailSubject, emailTo);
      
            await email.sendEmail();
          });
        }
      }


