'use server';
import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';

export interface Log {
    frontMatter:FrontMatter,
    content:string,
}

export interface FrontMatter{
    date: string,
    version: string
}

export async function getAllLogList(lang:string="en"){
    if(!lang){
        lang = "en";
    }
  
    const root = process.cwd();
    let files = fs.readdirSync(path.join(root, 'public',"logs",lang)); // get the files
    files = files.filter(file => file.split('.')[1] == "mdx"); // filter only the mdx files
    const logs = files.map(file => { // for each file extract the front matter and the slug
        const fileData = fs.readFileSync(path.join(root, 'public',"logs",lang,file),'utf-8');
        const {data, content} = matter(fileData);
       return {
            frontMatter:data as FrontMatter,
            content:content
        } as Log
    });
    return logs.reverse();
}