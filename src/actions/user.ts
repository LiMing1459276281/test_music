'use server';
import { addUserCredit, IUserCredit } from "@/actions/credits";
import { auth } from '@clerk/nextjs/server';
import { sql } from '@/lib/db-proxy';
import { getKey, setKeyWithExpiry } from '@/lib/vercel-kv-client';
import { countMemberCreditsByClerkId } from "@/actions/credits";

const prefix = 'credit_';
const expirySeconds = 60 * 60 * 1; // 1 hour

export async function findUserByClerkId(id: string) {

    const { rowCount, fields } = await sql`SELECT clerk_id FROM qa_users WHERE clerk_id = ${id}`;
    return rowCount;
}

export async function findUserCreditsByClerkId(clerkId?:string): Promise<number> {
    let credits = 0;
    let newUserId
    const { userId } = auth();
    if (!userId && !clerkId) {
        return credits;
    }
    if(userId){
        newUserId = userId;
    }
    if(clerkId){
        newUserId = clerkId;
    }
    const key = prefix + newUserId;
    credits = Number(await getKey(key));
    // if (credits && credits > 0) {
    //     return credits;
    // }
    const { rowCount, fields, rows } = await sql`SELECT credits FROM qa_users WHERE clerk_id = ${newUserId}`;
    if (rowCount && rowCount > 0) {
        credits = rows[0].credits;
        await setKeyWithExpiry(key, String(credits), expirySeconds);
    } else {
        credits = 0;
    }
    return credits;
}

export async function addUser(data: any) {

    const { rowCount } = await sql`INSERT INTO qa_users 
        (credits,username,email_address,first_name,last_name,gender,clerk_id,clerk_created_at) 
        VALUES (
            3,
            ${data.username},
            ${data.email_addresses[0]?.email_address},
            ${data.first_name},
            ${data.last_name},
            ${data.gender},
            ${data.id},
            to_timestamp(${data.created_at})
        )`;
    const credit: IUserCredit = {
        clerk_id: data.id,
        order_number: '0',
        credit_amount: 3,
        credit_type: '0',
        credit_transaction_type: '1',
        credit_desc: 'earn loyalty points'
    }
    await addUserCredit(credit);
    return rowCount;
}

export async function deleteUserByClerkId(data: any) {
    const { rows } = await sql`DELETE FROM qa_users WHERE clerk_id = ${data.id}`;
    return rows;
}

export async function updateUserByClerkId(data: any) {

    const { rows } = await sql`UPDATE qa_users SET username=${data.username},
    email_address=${data.email_addresses[0]?.email_address},
    first_name=${data.first_name},
    last_name=${data.last_name},
    gender=${data.gender},
    clerk_created_at=to_timestamp(${data.created_at}) WHERE clerk_id=${data.id}`

    return rows;
}


export async function getCurrentUser() {
    const authObject = { userId: "", userEmail: "", creditBalance: 0, isAdmin: false, hasMember: false };
    try {
        const { userId } = auth();
        if (userId) {
            authObject.userId = userId; 
            if (userId === process.env.ROOT_USER_ID) {
                authObject.isAdmin = true;
            }
            const credits = await findUserCreditsByClerkId();
            authObject.creditBalance = credits;
            const memberCredits = await countMemberCreditsByClerkId();
            authObject.hasMember = memberCredits > 0 ? true : false;
        }
    } catch (error) {
        console.log(error);
    }
    return authObject;
}

interface Auth {
    userId: string;
    userEmail: string;
    creditBalance: number;
    isAdmin: boolean;
    hasMember:boolean;
}
