import { NextRequest, NextResponse } from 'next/server';
import { findUserCreditsByClerkId } from '@/actions/user';
export async function POST(request: NextRequest) {

    const credits = await findUserCreditsByClerkId();

    return NextResponse.json(credits,{ status: 200 });
}