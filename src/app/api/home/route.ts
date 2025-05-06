import { NextRequest } from 'next/server';
import { runChatFromGeminiStreamResult, runChatFromGeminiStreamResultFilePath, uploadFileToGemini, type ModelType } from "@/lib/gemini-client";
import { GenerateContentStreamResult } from "@shurshan/generative-ai";
import { auth } from '@clerk/nextjs/server';
import { updateUserCreditByClerkId, addUserCredit, IUserCredit } from '@/actions/credits';
import { putObject } from '@/lib/aws-client-s3'
import { addImageInfo } from '@/actions/explore'
import { findUserCreditsByClerkId } from '@/actions/user';
export const dynamic = 'force-dynamic'
// export const runtime = 'edge' //nodejs edge 

const MAX_FILE_SIZE_IN_BYTES_2M = 2 * 1024 * 1024; // 2 MB
const MAX_FILE_SIZE_IN_BYTES_4M = 4 * 1024 * 1024; // 4 MB

export async function POST(request: NextRequest) {

  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  console.log('服务器收到的文件信息:', {
      是否存在: !!file,
      类型: file instanceof File ? 'File对象' : typeof file,
      大小: file instanceof File ? file.size : '未知',
      文件名: file instanceof File ? file.name : '未知'
  });
  
  const lang = formData.get('lang') as string;

  const prompt = formData.get('prompt') as string;

  const input_image_type = formData.get('input_image_type') as string;

  const input_image_url = formData.get('input_image_url') as string;

  const ipAddress = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') as string;
  
  const isPublic = formData.get('public') as string;

  const model = formData.get('model') as string;

  const stream = makeGeminiStreamJSON(fetchGeminiItemsJSON(file, prompt, lang, isPublic, input_image_type, input_image_url,ipAddress,model));

  const response = new StreamingResponse(stream, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
  return response;

}

async function* fetchGeminiItemsJSON(file: File, prompt: string, lang: string, isPublic: string, input_image_type: string, input_image_url: string, ipAddress:string, model:string): AsyncGenerator<ImageDescriptionResponse, any, unknown> {

  try {


    const { userId } = auth();
    if (!userId) {
      const no_Auth_Response = {error_code: 999998,error_msg: "please login Ai Generator Song"};
      yield no_Auth_Response;
      return;
    }
    let currentCredits = 0;
    if(userId){
        currentCredits = await findUserCreditsByClerkId();
        if (!currentCredits || currentCredits === 0) {
          const error_Response = {
            error_code: 999990,
            error_msg: `no credits.`,
          };
          yield error_Response;
          return;
        }
    }

    if (!input_image_url) {
      const fileSize = file.size;
      if (!file || !fileSize || fileSize === 0) {
        const error_Response = { error_code: 999999, error_msg: "Select an image" }; //
        yield error_Response;
        return;
      }

      if (userId) {
        if (fileSize > MAX_FILE_SIZE_IN_BYTES_4M) {
          const error_Response = { error_code: 999996, error_msg: "Image size should be less than 4MB" }; //
          yield error_Response;
          return;
        }
      } else {
        if (fileSize > MAX_FILE_SIZE_IN_BYTES_2M) {
          const error_Response = { error_code: 999995, error_msg: "Image size should be less than 4MB" }; //
          yield error_Response;
          return;
        }
      }
    }

    
    let fileName = "";

    if(file){
      const format = file.name.split('.').pop() as string;
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      fileName = `${timestamp}-${randomNum}.${format}`;
    }

    let base64Image: string = "";
    let buffer;
    if (userId && file && !input_image_url) {
        const fileBuffer = await file.arrayBuffer();
        buffer = Buffer.from(fileBuffer);
       

        const mimeType = file.type;
        const uploadResult = await uploadFileToGemini(buffer, fileName, mimeType);
        if (!uploadResult) {
          yield { error_code: 999999, error_msg: "Select an image" };
          return;
        } else {
          input_image_url = await uploadResult.uri;
          input_image_type = await uploadResult.mimeType;
          yield { "input_image_url": input_image_url, "input_image_type": input_image_type };
        }
    }else if(!userId && file && !input_image_url){
      const fileBuffer = await file.arrayBuffer();
      buffer = Buffer.from(fileBuffer);
      base64Image = buffer.toString('base64');
    }
    let modelType: ModelType = "FLASH";
    if(userId && model === 'advanced'){
      modelType = "PRO";
    }
   

    let description = '';
    let keys = '';
    let foundDelimiter = false;
    let chunkText;
    let stream;
    if(input_image_url){
      stream = await runChatFromGeminiStreamResultFilePath(modelType, input_image_url, input_image_type, prompt, lang) as GenerateContentStreamResult;
    }else{
      stream = await runChatFromGeminiStreamResult(modelType,base64Image, prompt, lang) as GenerateContentStreamResult;
    }
    
    for await (const chunk of stream.stream) {
      chunkText = chunk.text();
      const blockReasonMessage = chunk.promptFeedback?.blockReasonMessage;
      if (blockReasonMessage) {
        yield { error_code: 999996, error_msg: `I cannot generate a response. Let's keep our conversation polite and respectful.` };
        return;
      }
      description += chunkText;
      if (!foundDelimiter && findContentEnd(description) !== null) {
        foundDelimiter = true;
        const parts = description.split('|');
        if (parts.length == 3) {
          keys = parts[1];
          description = parts[2];
          chunkText = description;
        }
      }
      if (foundDelimiter) {
        const imageResponse: ImageDescriptionResponse = {};
        imageResponse.description = chunkText;
        yield imageResponse;
      }

    }
    if (userId) {
      await updateUserCreditByClerkId(1, userId, currentCredits);
      const credit: IUserCredit = {
        clerk_id: userId,
        credit_amount: 1,
        credit_type: '',
        credit_transaction_type: '0',
        credit_desc: 'costs 1 credit for image description'
      };
      await addUserCredit(credit);
    }


    if (isPublic && buffer && fileName) {

      if (description.length > 50) {
        const etag = await putObject(buffer, fileName);
        if (etag) {
          const imageInfo = {
            keys: keys,
            imgurl: fileName,
            description: description,
            ip: ipAddress
          }
          await addImageInfo(imageInfo)
        }
        
      }

    }

    if (isPublic && fileName) {
      yield { image_url: process.env.CF_R2_PUBLIC_URL + fileName };
    }

  } catch (error) {
    console.error("home api:",error);
    const error_Response = { error_code: 999997, error_msg: 'This generates a response error, Please try again. or The image you uploaded violates our safety policies, such as containing explicit content. Please try again with a different image.' };
    yield error_Response;
  }

}


const makeGeminiStreamJSON = <T extends Record<string, unknown>>(generator: AsyncGenerator<ImageDescriptionResponse, any, unknown>) => {

  const encoder = new TextEncoder();
  return new ReadableStream<any>({
    async start(controller) {
      controller.enqueue(encoder.encode(""));
      for await (let chunk of generator) {
        const chunkData = encoder.encode(JSON.stringify(chunk));
        controller.enqueue(chunkData);
      }
      controller.close();
    }
  });
}

class StreamingResponse extends Response {

  constructor(res: ReadableStream<any>, init?: ResponseInit) {
    super(res as any, {
      ...init,
      status: 200,
      headers: {
        ...init?.headers,
      },
    });
  }
}


function findContentEnd(buffer: string): number | null {
  const stack = [];
  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];
    if (stack.length == 0 && char === '|') {
      stack.push(char);
    } else if (char === '|' && stack.length > 0 && stack[stack.length - 1] === '|') {
      stack.pop();
    }
    if (stack.length === 0) {
      return i;
    }
  }
  return null;
}

interface ImageDescriptionResponse {
  error_code?: number;
  description?: string;
  error_msg?: string;
  image_url?: string;
  input_image_type?: string;
  input_image_url?: string;
}