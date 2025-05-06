import 'server-only';

const API_BASE_URL = 'https://kieai.erweima.ai/api/v1';

/**
 * 生成音乐
 * @param prompt 提示词
 * @param style 音乐风格
 * @param title 音乐标题
 * @param options 其他选项
 * @returns 生成结果
 */
export async function generateMusic(
  prompt: string, 
  style: string, 
  title: string, 
  options?: {
    customMode?: boolean,
    instrumental?: boolean,
    model?: string,
    callBackUrl?: string,
    negativeTags?: string
  }
) {
  const apiKey = process.env.GPT4O_API_KEY as string;
  const defaultCallbackUrl = process.env.GPT4O_CALLBACK_URL;
  
  try {
    // 构建请求体
    const requestBody: any = {
      prompt,
      style,
      title,
      customMode: options?.customMode ?? true,
      instrumental: options?.instrumental ?? true,
      model: options?.model ?? 'V3_5',
      negativeTags: options?.negativeTags
    };
    
    // 如果存在回调URL，则添加到请求体
    if (options?.callBackUrl || defaultCallbackUrl) {
      requestBody.callBackUrl = options?.callBackUrl || defaultCallbackUrl;
    }
    
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating music:', error);
    throw error;
  }
}

/**
 * 延长已生成的音乐
 * @param audioId 音频ID
 * @param prompt 提示词
 * @param options 其他选项
 * @returns 生成结果
 */
export async function extendMusic(
  audioId: string,
  prompt: string,
  options?: {
    style?: string,
    title?: string,
    continueAt?: number,
    model?: string,
    callBackUrl?: string,
    negativeTags?: string,
    defaultParamFlag?: boolean
  }
) {
  const apiKey = process.env.GPT4O_API_KEY as string;
  const defaultCallbackUrl = process.env.GPT4O_CALLBACK_URL;
  
  try {
    // 构建请求体
    const requestBody: any = {
      audioId,
      prompt,
      defaultParamFlag: options?.defaultParamFlag ?? true,
      style: options?.style,
      title: options?.title,
      continueAt: options?.continueAt ?? 0,
      model: options?.model ?? 'V3_5',
      negativeTags: options?.negativeTags
    };
    
    // 如果存在回调URL，则添加到请求体
    if (options?.callBackUrl || defaultCallbackUrl) {
      requestBody.callBackUrl = options?.callBackUrl || defaultCallbackUrl;
    }
    
    const response = await fetch(`${API_BASE_URL}/generate/extend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error extending music:', error);
    throw error;
  }
}

/**
 * 上传封面并生成音乐
 * @param uploadUrl 上传URL
 * @param prompt 提示词
 * @param style 音乐风格
 * @param title 音乐标题
 * @param options 其他选项
 * @returns 生成结果
 */
export async function generateMusicWithCover(
  uploadUrl: string,
  prompt: string,
  style: string,
  title: string,
  options?: {
    customMode?: boolean,
    instrumental?: boolean,
    model?: string,
    callBackUrl?: string,
    negativeTags?: string
  }
) {
  const apiKey = process.env.GPT4O_API_KEY as string;
  const defaultCallbackUrl = process.env.GPT4O_CALLBACK_URL;
  
  try {
    // 构建请求体
    const requestBody: any = {
      uploadUrl,
      prompt,
      style,
      title,
      customMode: options?.customMode ?? true,
      instrumental: options?.instrumental ?? true,
      model: options?.model ?? 'V3_5',
      negativeTags: options?.negativeTags
    };
    
    // 如果存在回调URL，则添加到请求体
    if (options?.callBackUrl || defaultCallbackUrl) {
      requestBody.callBackUrl = options?.callBackUrl || defaultCallbackUrl;
    }
    
    const response = await fetch(`${API_BASE_URL}/generate/upload-cover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating music with cover:', error);
    throw error;
  }
}

/**
 * 上传音频并延长
 * @param uploadUrl 上传URL
 * @param prompt 提示词
 * @param options 其他选项
 * @returns 生成结果
 */
export async function extendMusicWithUpload(
  uploadUrl: string,
  prompt: string,
  options?: {
    style?: string,
    title?: string,
    continueAt?: number,
    model?: string,
    callBackUrl?: string,
    negativeTags?: string,
    defaultParamFlag?: boolean
  }
) {
  const apiKey = process.env.GPT4O_API_KEY as string;
  const defaultCallbackUrl = process.env.GPT4O_CALLBACK_URL;
  
  try {
    // 构建请求体
    const requestBody: any = {
      uploadUrl,
      prompt,
      defaultParamFlag: options?.defaultParamFlag ?? true,
      style: options?.style,
      title: options?.title,
      continueAt: options?.continueAt ?? 0,
      model: options?.model ?? 'V3_5',
      negativeTags: options?.negativeTags
    };
    
    // 如果存在回调URL，则添加到请求体
    if (options?.callBackUrl || defaultCallbackUrl) {
      requestBody.callBackUrl = options?.callBackUrl || defaultCallbackUrl;
    }
    
    const response = await fetch(`${API_BASE_URL}/generate/upload-extend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error extending music with upload:', error);
    throw error;
  }
}

/**
 * 获取音乐生成记录信息
 * @returns 记录信息
 */
export async function getMusicGenerationRecords(taskId: string) {
  const apiKey = process.env.GPT4O_API_KEY as string;
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate/record-info?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting music generation records:', error);
    throw error;
  }
}

/**
 * 获取带时间戳的歌词
 * @param taskId 任务ID
 * @param audioId 音频ID
 * @returns 歌词信息
 */
export async function getTimestampedLyrics(taskId: string, audioId: string) {
  const apiKey = process.env.GPT4O_API_KEY as string;
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate/get-timestamped-lyrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        taskId,
        audioId
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting timestamped lyrics:', error);
    throw error;
  }
}