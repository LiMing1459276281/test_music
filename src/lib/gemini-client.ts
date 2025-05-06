import 'server-only'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@shurshan/generative-ai";
import { GoogleAIFileManager, ExtendedFileManager } from "@shurshan/generative-ai/server";


const MODEL_NAME_PRO = "gemini-1.5-pro";
const MODEL_NAME_FLASH = "gemini-1.5-flash";

const IMAGE_AI_REBOT = {
  role: "user",
  parts: [{ text: `解读图像中的创作背景、情感以及作品背后的故事与寓意，将图片中的信息转化为简洁、有见地的文字描述。\n\n# 要求与限制\n\n1. 准确性\n你的解读必须准确，避免误导用户。\n2. 简洁性\n文字描述要求简洁明了，避免冗长和复杂的句子。\n3. 支持多种语言解读\n解读结果支持英语、中文、法语、德语、西拔牙语、日本语、韩语。\n4.图像中提取的关键词在开始位置出现，并用竖线 (|) 与正文分割，多个关键词用逗号 (,) 隔开，例如：|关键词1,关键词2,关键词3|\n\n正文内容` }]
};

const IMAGE_PROMPT_REBOT = {
  role: "user",
  parts: [{ text: `为以下图像编写 Stable Diffusion、MidJourney 和通用的自然语言提示，尽可能少用逗号，且字数不超过 100 字。如果图像简单，则返回的字数可以少于规定的最大字数。 仔细斟酌每个词语，以最大程度地影响图像生成，不要使用华丽或诗意的散文。以下格式返回英文结果：{"sd":"content","mj":"content","ct":"content"}，不包含其他内容`}]
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  }
];

const generationConfig = {
  temperature: 1, // 1
  topP: 0.95, //0.95
  topK: 64, //64
  maxOutputTokens: 8192, //8192
};

const prompt_generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}


export async function getImagePrompt(modelType: ModelType, base64Image: string) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = modelType === 'PRO' ? MODEL_NAME_PRO : MODEL_NAME_FLASH;
    const modelParams = {
      model: modelName,
      safetySettings,
      prompt_generation_config,
      systemInstruction: IMAGE_PROMPT_REBOT
    };
    const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

    const parts = [
      IMAGE_PROMPT_REBOT.parts[0],
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/png",
        },
      }
    ];
    return (await model.generateContent(parts)).response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getImagePromptForFilePath(modelType: ModelType, fileUrl: string, mimeType: string) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = modelType === 'PRO' ? MODEL_NAME_PRO : MODEL_NAME_FLASH;
    const modelParams = {
      model: modelName,
      safetySettings,
      prompt_generation_config,
      systemInstruction: IMAGE_PROMPT_REBOT
    };
    const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

    const imagePart = {
      fileData: {
        fileUri: fileUrl,
        mimeType: mimeType,
      }
    };
    return (await model.generateContent([imagePart])).response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function runChatFromGeminiStreamResult(modelType: ModelType, base64Image: string, prompt: string, lang: string = "en") {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = modelType === 'PRO' ? MODEL_NAME_PRO : MODEL_NAME_FLASH;
    const modelParams = {
      model: modelName,
      safetySettings,
      generationConfig,
      systemInstruction: IMAGE_AI_REBOT
    };
    const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };
    let prompts = [{ text: lang }, imagePart];
    if (prompt) {
      prompts = [{ text: lang }, { text: prompt }, imagePart];
    }
    return await model.generateContentStream(prompts);
  } catch (error) {
    console.error(error);
  }

}


export async function runChatFromGeminiStreamResultFilePath(modelType: ModelType, fileUrl: string, mimeType: string, prompt: string, lang: string = "en") {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = modelType === 'PRO' ? MODEL_NAME_PRO : MODEL_NAME_FLASH;
    const modelParams = {
      model: modelName,
      safetySettings,
      generationConfig,
      systemInstruction: IMAGE_AI_REBOT
    };
    const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

    const imagePart = {
      fileData: {
        fileUri: fileUrl,
        mimeType: mimeType,
      }
    };
    let prompts = [{ text: lang }, imagePart];
    if (prompt) {
      prompts = [{ text: lang }, { text: prompt }, imagePart];
    }
    return await model.generateContentStream(prompts);
  } catch (error) {
    console.error(error);
  }

}

export async function uploadToGemini(path: string, fileName: string, mimeType: string) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
    const fileManager = new GoogleAIFileManager(apiKey);
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType: mimeType,
      displayName: fileName,
      // name: fileName
    });
    const file = uploadResult.file;
    return file;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

export async function uploadFileToGemini(buffer: Buffer, fileName: string, mimeType: string) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
    const fileManager = new ExtendedFileManager(apiKey);
    const uploadResult = await fileManager.uploadFile(buffer, {
      mimeType: mimeType,
      displayName: fileName,
      // name: fileName
    });
    const file = uploadResult.file;
    return file;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}


export type ModelType = "PRO" | "FLASH";



