'use server';
import { sql } from '@/lib/db-proxy';
import { getKey, setKeyWithExpiry } from '@/lib/vercel-kv-client';
import { cache } from 'react'
import { auth } from '@clerk/nextjs/server';

const expirySeconds = 60 * 60 * 1; // 1 hour

const prefix = 'credit_';

export async function findUserCreditByClerkId(id: string) {
    const { rowCount } = await sql`SELECT * FROM qa_credits WHERE clerk_id = ${id}`;
    return rowCount;
}

export async function findUserClerkIdByOrderNumber(order_number: string) {
    const { rows } = await sql`SELECT clerk_id FROM qa_credits WHERE order_number = ${order_number}`;
    return rows[0].clerk_id;
}

export async function addUserCredit(data: IUserCredit) {
    try {
        const { rowCount } = await sql`INSERT INTO qa_credits 
        (clerk_id,order_number,credit_amount,credit_type,credit_transaction_type,credit_desc) 
        VALUES (
            ${data.clerk_id},
            ${data.order_number},
            ${data.credit_amount},
            ${data.credit_type},
            ${data.credit_transaction_type},
            ${data.credit_desc}
        )`;
        return rowCount??0;
    } catch (error) {
        console.log(error);
    }
    return 0;
}

    export async function deleteUserCreditByClerkId(clerkId: string) {
        const { rowCount } = await sql`DELETE FROM qa_credits WHERE clerk_id = ${clerkId}`;
        return rowCount;
    }

    export async function updateUserCreditByClerkId(credit: number, clerkId: string, currentCredit?: number) {
        // 检查用户是否存在
        const { rowCount: userExists } = await sql`SELECT clerk_id FROM qa_users WHERE clerk_id = ${clerkId}`;
        
        // 如果用户不存在，先创建用户信息
        if (!userExists) {
            // 创建一个基本的用户记录
            await sql`INSERT INTO qa_users (clerk_id, credits, username) VALUES (${clerkId}, 3, ${clerkId})`;
        }

        if (currentCredit !== undefined) {
            let newCredit = currentCredit - credit;
            if (newCredit <= 0) {
                newCredit = 0;
            }
            await setKeyWithExpiry(prefix + clerkId, String(newCredit), expirySeconds);
        } else if (!currentCredit && credit < 0) {
            const key = prefix + clerkId;
            let value = Number(await getKey(key));
            await setKeyWithExpiry(key, String(value - credit), expirySeconds);
        }

        const { rowCount } = await sql`UPDATE qa_users SET credits = GREATEST(0, credits - ${credit}) WHERE clerk_id=${clerkId}`

        return rowCount;
    }

    const cacheCountMemberCreditsByClerkId = cache(async (clerk_id: string): Promise<number> => {
        try {
            const { rows } = await sql`SELECT count(0) FROM qa_credits where credit_type in('1','2') and clerk_id=${clerk_id}`

            return Number(rows[0].count);
        } catch (error) {
            console.error(error?.toString());
        }
        return 0;
    })

    export async function countMemberCreditsByClerkId(): Promise<number> {
        const { userId } = auth();
        if (userId) {
            return await cacheCountMemberCreditsByClerkId(userId);
        }
        return 0;

    }

    export interface IUserCredit {
        clerk_id: string;
        credit_amount: number;
        credit_type: string;
        credit_transaction_type: string;
        credit_desc: string;
        order_number?: string;
    }