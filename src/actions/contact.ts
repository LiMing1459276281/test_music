'use server';
import { sql, db } from '@/lib/db-proxy';
import { ContactFormSchema, FormState } from '@/lib/definitions'
export async function addContactInfo(state: FormState,formData:FormData) {

    const validatedFields = ContactFormSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        message: formData.get('message'),
      })

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }

    const { first_name, last_name, email, message } = validatedFields.data

    const name = first_name + " " + last_name;


    const { rows,rowCount } = await sql`
        insert into qa_contact (name,email,message) 
        values (${name},${email},${message}) RETURNING id;`;

    if(!rows[0]){

        return {
            message: 'An error occurred while submitting your message. Please try again later.',
        }
    }
    return {
        message: 'Your message has been submitted,We value your feedback as it empowers us to enhance our tools.',
        success:true
    }
   
}

export async function getContactInfo() {
    const { rows } = await sql`select * from qa_contact;`;
    return rows;
}