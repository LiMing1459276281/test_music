import 'server-only'
import { kv } from '@vercel/kv';

export async function setKeyWithExpiry(key: string, value: string, expirySeconds: number) {
    const expiryTimestamp = expirySeconds * 1000;

    //ex seconds px milliseconds 
    await kv.set(key, value, { px: expiryTimestamp});
}


export async function getKey(key: string) {
    return await kv.get<string>(key);
}

export async function deleteKey(key: string) {
    await kv.del(key);
}

export async function expectKey(key: string, value: string) {
    await kv.set(key, value, { ex: 1000 * 60 * 60 * 24 * 7 });
}
