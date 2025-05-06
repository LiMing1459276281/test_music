import { NextRequest, NextResponse } from 'next/server';
import { getImagePrompt, getImagePromptForFilePath, uploadToGemini, uploadFileToGemini, type ModelType } from "@/lib/gemini-client";
import { EnhancedGenerateContentResponse, GenerateContentStreamResult } from "@shurshan/generative-ai";
import { auth } from '@clerk/nextjs/server';
import { updateUserCreditByClerkId, addUserCredit, IUserCredit} from '@/actions/credits';
import { putObject } from '@/lib/aws-client-s3'
import { addImageInfo } from '@/actions/explore'
import { findUserCreditsByClerkId } from '@/actions/user';

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' //nodejs edge 
export const preferredRegion =["cdg1","arn1", "dub1", "lhr1", "fra1", "iad1", 
  "sfo1", "pdx1", "cle1", "gru1", "hnd1", "icn1", "sin1",
  "bom1", "syd1", "kix1","cpt1"]
  
const MAX_FILE_SIZE_IN_BYTES_2M = 2 * 1024 * 1024; // 2 MB
const MAX_FILE_SIZE_IN_BYTES_4M = 4 * 1024 * 1024; // 4 MB


export async function POST(request: NextRequest) {

  const formData = await request.formData();
  const file = formData.get('file') as File;

  const isPublic = formData.get('public') as string;

  const model = formData.get('model') as string;

  const result = await fetchGeminiItemsJSON(file, isPublic,model);


  return NextResponse.json(result, { status: 200});

}

async function fetchGeminiItemsJSON(file: File, isPublic: string, model:string){

  try {

    const { userId } = auth();
    if (!userId) {
      return {error_code: 999998,error_msg: "please login Ai Generator Song"};
    }
    let currentCredits = 0;
    if(userId){
        currentCredits = await findUserCreditsByClerkId();
        if (!currentCredits || currentCredits === 0) {
          return {
            error_code: 999990,
            error_msg: `no credits.`,
          };
        }
    }

    const fileSize = file.size;
    if (!file || !fileSize || fileSize === 0) {
      return { error_code: 999999, error_msg: "Select an image" }; //
    }

    if (userId) {
      if (fileSize > MAX_FILE_SIZE_IN_BYTES_4M) {
        return { error_code: 999996, error_msg: "Image size should be less than 4MB" }; //
      }
    } else {
      if (fileSize > MAX_FILE_SIZE_IN_BYTES_2M) {
        return { error_code: 999995, error_msg: "Image size should be less than 4MB" }; //
      }
    }

  
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    const base64Image = buffer.toString('base64');

    let modelType: ModelType = "FLASH";
    if(model === 'advanced'){
      modelType = "PRO";
    }
   

    let result = await getImagePrompt(modelType,base64Image);

    if(result){
        const blockReasonMessage = await result.promptFeedback?.blockReasonMessage;
      if (blockReasonMessage) {
        return { error_code: 999996, error_msg: `I cannot generate a response. Let's keep our conversation polite and respectful.` };

      }
      const body = await result.text();
      const payload = JSON.parse(body);
      return {"sd":payload.sd,"mj":payload.mj,"ct":payload.ct};
    }

    await updateUserCreditByClerkId(1, userId, currentCredits);
    const credit: IUserCredit = {
      clerk_id: userId,
      credit_amount: 1,
      credit_type: '',
      credit_transaction_type: '0',
      credit_desc: 'costs 1 credit for image to prompt'
    };
    await addUserCredit(credit);

  } catch (error) {
    console.error(error);
    return { error_code: 999997, error_msg: 'This generates a response error, Please try again. or The image you uploaded violates our safety policies, such as containing explicit content. Please try again with a different image.' };
  }

}


export async function GET(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') as string;
    return new Response(ipAddress, { status: 200 });
  } catch (error) {
    return new Response(`${error?.toString()}-----${process.env.PG_NEON_PUBLIC_API_BASE_URL}`, { status: 200 })
  }

}

interface ImagePrompt {
  error_code?: number;
  error_msg?: string;
  image_url?: string;
  input_image_type?: string;
  input_image_url?: string;
  sd?: string; //Stable Diffusion
  mj?: string; //MidJourney
  ct?: string; //Custom
}