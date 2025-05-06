import { NextRequest, NextResponse } from 'next/server';
import { getMusicGenerationRecords } from '@/lib/gpt4o-client';

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get('taskId');

  try {
    const recordInfo = await getMusicGenerationRecords(taskId as string);
    console.log('查询触发========',recordInfo,JSON.stringify(recordInfo.data.response));
    if (recordInfo.data?.errorCode) {
      return new Response(JSON.stringify({
        error_code: recordInfo.data.errorCode,
        error_msg: recordInfo.data.errorMessage
      }), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        status: 400
      });
    }
    
    if (recordInfo.data?.status === 'SUCCESS' && recordInfo.data.response?.sunoData) {
      return new Response(JSON.stringify({
        status: 'success',
        sunoData: recordInfo.data.response.sunoData
      }));
    }
    
    return new Response(JSON.stringify({ status: 'pending' }));
    
  } catch (error) {
    return new Response(JSON.stringify({
      status: 'error',
      error: 'Failed to check status'
    }), { status: 500 });
  }
}