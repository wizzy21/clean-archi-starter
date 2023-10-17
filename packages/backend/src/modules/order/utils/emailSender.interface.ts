export class EmailServiceInterface(){

    sendEmail(emailContent: string, emailSubject: string, emailsTo: string[]): Promise<void>{}

}


