import 'server-only'
import {
  S3Client,
  CreateBucketCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL  // 添加这个导入
} from "@aws-sdk/client-s3";
import fs from 'fs';
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const ACCOUNT_ID = process.env.CF_R2_ACCOUNT_ID as string;

const ACCESS_KEY_ID = process.env.CF_R2_ACCESS_KEY_ID as string;

const SECRET_ACCESS_KEY = process.env.CF_R2_SECRET_ACCESS_KEY as string;

const CF_R2_BUCKET_NAME = process.env.CF_R2_BUCKET_NAME as string;

const BUCKET_NAME = process.env.CF_R2_BUCKET_NAME as string;

const config = {
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
}

const client = new S3Client(config);

export async function putObject(data: Buffer, Key: string) {
  try {
    const input = { // PutObjectRequest
      Body: data, // see \@smithy/types -> StreamingBlobPayloadInputTypes
      Bucket: BUCKET_NAME, // required
      Key: Key, // required
      ContentType: 'image/jpeg'
    };

    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    return response.ETag;
  } catch (error) {
    console.log(error);
  }
}

export async function putObjectUsingFilePath(fileUrl: string, Key: string) {
  try {
    const input = { // PutObjectRequest
      Body: Buffer.from(fs.readFileSync(fileUrl)).toString("base64"), // see \@smithy/types -> StreamingBlobPayloadInputTypes
      Bucket: BUCKET_NAME, // required
      Key: Key, // required
      ContentType: 'image/jpeg'
    };

    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    //console.log(response);
    return response.ETag;
  } catch (error) {
    console.log(error);
  }

}
export async function deleteObject(key: string) {
  try {
    const input = { // DeleteObjectRequest
      Bucket: BUCKET_NAME, // required
      Key: key // required
    };
    const command = new DeleteObjectCommand(input);
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getPresignedUrl(fileName: string, contentType: string) {
  try {
    const key = `uploads/${Date.now()}-${fileName}`;
    
    const { url, fields } = await createPresignedPost(client, {
      Bucket: BUCKET_NAME,
      Key: key,
      Conditions: [
        ["content-length-range", 0, 10485760], // 限制文件大小为10MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Expires: 600, // 10分钟有效期
    });

    return {
      url,
      fields,
      key,
      publicUrl: `${process.env.CF_R2_PUBLIC_URL}/${key}`
    };
  } catch (error) {
    console.error('生成预签名URL失败:', error);
    throw error;
  }
}

export async function uploadFile(file: File) {
  try {
    if (!file) {
      throw new Error('文件不能为空');
    }

    const startTime = Date.now();
    console.log('开始上传文件:', {
      文件名: file.name,
      类型: file.type,
      大小: file.size
    });

    // 获取预签名URL
    const { url, fields, key } = await getPresignedUrl(file.name, file.type);
    
    // 构建FormData
    const formData = new FormData();
    Object.entries(fields).forEach(([fieldName, value]) => {
      formData.append(fieldName, value as string);
    });
    formData.append('file', file);

    // 直接上传到R2
    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      throw new Error(`上传失败: ${uploadResponse.statusText}`);
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log('上传成功:', {
      Key: key,
      耗时: `${duration.toFixed(2)}秒`
    });

    return {
      url: `${process.env.CF_R2_PUBLIC_URL}/${key}`,
      etag: uploadResponse.headers.get('etag')
    };
  } catch (error) {
    console.error('上传文件失败:', {
      错误信息: (error as Error).message,
      错误堆栈: (error as Error).stack,
      文件信息: {
        名称: file.name,
        类型: file.type,
        大小: file.size
      }
    });
    throw new Error(`文件上传失败: ${(error as Error).message}`);
  }
}


export interface CreateObjectParams {
  buffer: Buffer;
  fileName: string;
  contentType: string;
}

export async function createObject({ buffer, fileName, contentType }: CreateObjectParams) {
  try {
    // 添加详细的日志
    console.log('接收到的参数:', {
      原始文件名: fileName,
      原始ContentType: contentType,
      Buffer长度: buffer.length
    });

    // 规范化 contentType
    const normalizedContentType = contentType || 'image/jpeg';
    const fileExtension = normalizedContentType.split('/')[1] || 'jpg';
    
    // 确保文件名有正确的扩展名
    const normalizedFileName = fileName.includes('.') ? fileName : `${fileName}.${fileExtension}`;

    console.log('处理后的文件信息:', {
      规范化文件名: normalizedFileName,
      规范化ContentType: normalizedContentType,
      文件扩展名: fileExtension
    });

    const input = {
      Body: buffer,
      Bucket: BUCKET_NAME,
      Key: normalizedFileName,
      ContentType: normalizedContentType,
      ACL: ObjectCannedACL.public_read
    };

    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    
    // 添加响应日志
    console.log('R2上传响应:', {
      ETag: response.ETag,
      完整URL: `${process.env.CF_R2_PUBLIC_URL}/${normalizedFileName}`
    });

    return {
      url: `${process.env.CF_R2_PUBLIC_URL}/${normalizedFileName}`,
      etag: response.ETag
    };
  } catch (error) {
    console.error('创建文件失败:', error);
    throw error;
  }
}
