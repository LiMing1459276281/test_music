'use server';
import { deleteObject } from "@/lib/aws-client-s3";
import { auth } from "@clerk/nextjs/server";
import { sql, db } from '@/lib/db-proxy';
const PUBLIC_URL = process.env.CF_R2_PUBLIC_URL;

export async function addImageInfo(data: IImage) {
    try {
        const { rowCount } = await sql`INSERT INTO qa_images 
        (keys,imgurl,description,ip) 
        VALUES (
            ${data.keys},
            ${data.imgurl},
            ${data.description},
            ${data.ip}
        )`;
        return rowCount;
    }catch(error){
        console.error("add image info error",error);
    }
    return 0;
}

export async function queryImageInfoList(keys?: string, page: number = 1, limit: number = 9): Promise<IImage[]> {
    const query = keys ? `
        SELECT keys, imgurl, description 
        FROM qa_images 
        WHERE public = '1' and keys like $1 
        LIMIT $2 
        OFFSET $3 
    `:` SELECT keys, imgurl, description 
        FROM qa_images 
        WHERE public = '1' 
        order by created_at desc 
        LIMIT $1 
        OFFSET $2`;
    const values = keys? [`%${keys}%`,limit, limit * page - limit]: [limit, limit * page - limit];
    const { rows }: any  = await db.query(query as any);

    const images: IImage[] = rows.map((item: { keys: string; imgurl: string,description: string }) => {
        return {
            keys: item.keys,
            filename: item.imgurl,
            imgurl: PUBLIC_URL+item.imgurl,
            description: item.description
        }
    });
    return images;
}

export async function queryLastImageInfoList(): Promise<IImage[]> {

    const { rows } = await sql`select keys, imgurl, description from qa_images where created_at >= now() - INTERVAL '60 day' order by created_at desc LIMIT 6`;
    const images: IImage[] = rows.map((item: any) => {
        return {
            keys: item.keys,
            filename:item.imgurl,
            imgurl: PUBLIC_URL+item.imgurl,
            description: item.description
        }
    });
    return images;
}


export async function batchAddImageInfo(data: IImage[]) {

    data?.map(async (item: IImage) => {
        await addImageInfo(item);
    })

}

export interface IImage {
    keys?: string;
    filename?: string;
    imgurl: string;
    description: string;
    ip?: string;
}