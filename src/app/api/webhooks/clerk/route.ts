import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { updateUserByClerkId, deleteUserByClerkId, addUser } from "@/actions/user";
import {setKeyWithExpiry,getKey} from "@/lib/vercel-kv-client";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

const expirySeconds =  60 * 60 * 1; // 1 hour

export async function POST(request: NextRequest) {


  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await request.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  const webhook_id = await getKey(String(id));
  if(webhook_id){
    return new Response('Error occured -- webhook already', {
      status: 200
    })
  }
  await setKeyWithExpiry(String(id), '1',expirySeconds);
  try {
    switch (evt.type) {
      case 'user.created':
        await addUser(payload.data);
        break;
      case 'user.updated':
        await updateUserByClerkId(payload.data);
        break;
      case 'user.deleted':
        await deleteUserByClerkId(payload.data);
        break;
    }
    return new Response('', { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error);
     return new Response('', { status: 500 })
  }

}
