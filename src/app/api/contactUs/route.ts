 import ContactUsTemplate  from "@/email/templates/contactUs"
 import mailSender from "@/lib/utils/mailSender"
 import connectToDatabase  from "@/lib/mognodb"
import  ContactUsSchema from "@/models/ContactUs"
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  
    if (req.method === 'POST') {
        const { name, email, message, mobileNo, accountType } = req.body;
    
        if (!name || !email || !message || mobileNo || accountType) {
          return res.status(400).json({ error: 'Missing fields' });
        }
 
        const supportEmail  : string = process.env.SupportTeam || "Support@DesignerIdea.com"
         
    try{
        await  connectToDatabase ()


        const newRequest = new ContactUsSchema({ name, email, message, accountType , mobileNo });
        await newRequest.save();

     // condition if alll data  sent to support bmail then
         const mailSentToSupport = await mailSender(
            supportEmail,
             "Contact  us Request",
             ContactUsTemplate(email, name, message, mobileNo, accountType)

         )



     if(mailSentToSupport){

        const emailRes = await mailSender(
            email,
            "Your req send successfully",
            ContactUsTemplate(email, name, message, mobileNo, accountType)
        )
        console.log("Email Res ", emailRes)
        return res.json({
          success: true,
          message: "Email send successfully",
        })}
        else{
            return res.json({
                success: false,
                message: "Email didnt recived to  support  team",
              })
        }
      } catch (error :any) {
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
          success: false,
          message: "Something went wrong...",
        })
      }
    

 }





}