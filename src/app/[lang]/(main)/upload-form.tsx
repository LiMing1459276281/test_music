/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-04-30 21:32:46
 * @LastEditors: rendc
 * @LastEditTime: 2025-05-01 15:11:25
 */
"use client"
import { useRef, useContext, useState } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { LoadingOverlay } from "@/components/customUI/loading-from"
import { type Locale, getPathname } from "@/i18n-config"
import Dialogs, { type AlertRef } from "@/components/customUI/alerts"
import AuthContext from "@/components/customUI/auth-context"
import Link from "next/link"
import Modal, { type ModalRef } from "@/components/customUI/popup-modal"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Music, Play, Pause, Download, Volume2, VolumeX } from "lucide-react"
import { updateUserCreditByClerkId, addUserCredit, IUserCredit } from '@/actions/credits';
import { findUserCreditsByClerkId } from "@/actions/user";

export default function MusicGenerator({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const alertRef = useRef<AlertRef | null>(null)
  const modalRef = useRef<ModalRef | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { auth, setAuth } = useContext(AuthContext)
  // 添加当前播放音频的索引状态
const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const router = useRouter()
  const [statusInterval, setStatusInterval] = useState<NodeJS.Timeout | null>(null);
  // 添加新的状态来存储任务ID
  const [currentTaskId, setCurrentTaskId] = useState<string>('');
  // Music generation states
  const [prompt, setPrompt] = useState<string>("")
  const [selectedGenre, setSelectedGenre] = useState<string>("pop")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [generatedMusic, setGeneratedMusic] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [sunoData, setSunoData] = useState<any>([])
    // { "id": "3aad6e8c-5028-4b2b-94a3-49a38ce170a4", "audioUrl": "https://kieaifiles.erweima.ai/M2FhZDZlOGMtNTAyOC00YjJiLTk0YTMtNDlhMzhjZTE3MGE0.mp3", "sourceAudioUrl": "https://cdn1.suno.ai/3aad6e8c-5028-4b2b-94a3-49a38ce170a4.mp3", "streamAudioUrl": "https://mfile.erweima.ai/M2FhZDZlOGMtNTAyOC00YjJiLTk0YTMtNDlhMzhjZTE3MGE0", "sourceStreamAudioUrl": "https://cdn1.suno.ai/3aad6e8c-5028-4b2b-94a3-49a38ce170a4.mp3", "imageUrl": "https://kieaifiles.erweima.ai/M2FhZDZlOGMtNTAyOC00YjJiLTk0YTMtNDlhMzhjZTE3MGE0.jpeg", "sourceImageUrl": "https://cdn2.suno.ai/image_3aad6e8c-5028-4b2b-94a3-49a38ce170a4.jpeg", "prompt": "", "modelName": "chirp-v3-5", "title": "测试", "tags": "electronic", "createTime": 1746068157657, "duration": 134.16 }, { "id": "b96f60e4-9204-4e57-afe2-0fc14841ba5d", "audioUrl": "https://kieaifiles.erweima.ai/Yjk2ZjYwZTQtOTIwNC00ZTU3LWFmZTItMGZjMTQ4NDFiYTVk.mp3", "sourceAudioUrl": "https://cdn1.suno.ai/b96f60e4-9204-4e57-afe2-0fc14841ba5d.mp3", "streamAudioUrl": "https://mfile.erweima.ai/Yjk2ZjYwZTQtOTIwNC00ZTU3LWFmZTItMGZjMTQ4NDFiYTVk", "sourceStreamAudioUrl": "https://cdn1.suno.ai/b96f60e4-9204-4e57-afe2-0fc14841ba5d.mp3", "imageUrl": "https://kieaifiles.erweima.ai/Yjk2ZjYwZTQtOTIwNC00ZTU3LWFmZTItMGZjMTQ4NDFiYTVk.jpeg", "sourceImageUrl": "https://cdn2.suno.ai/image_b96f60e4-9204-4e57-afe2-0fc14841ba5d.jpeg", "prompt": "", "modelName": "chirp-v3-5", "title": "测试", "tags": "electronic", "createTime": 1746068157657, "duration": 141.48 }])
    const [generationError, setGenerationError] = useState<string>("");
  // 定义标题状态
  const [title, setTitle] = useState<string>("")
  // Music genres with icons and colors
  const musicGenres = [
    { id: "pop", name: "Pop", color: "from-pink-500 to-purple-500", icon: "🎵" },
    { id: "rock", name: "Rock", color: "from-red-500 to-orange-500", icon: "🎸" },
    { id: "jazz", name: "Jazz", color: "from-blue-500 to-indigo-500", icon: "🎷" },
    { id: "classical", name: "Classical", color: "from-yellow-500 to-amber-500", icon: "🎻" },
    { id: "electronic", name: "Electronic", color: "from-cyan-500 to-blue-500", icon: "🎧" },
    { id: "hiphop", name: "Hip Hop", color: "from-purple-500 to-indigo-500", icon: "🎤" },
    { id: "ambient", name: "Ambient", color: "from-green-500 to-teal-500", icon: "🌊" },
    { id: "folk", name: "Folk", color: "from-amber-500 to-yellow-500", icon: "🪕" },
  ]



  // Handle audio playback
  const togglePlayPause = (index: number, audioUrl: string) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      // 停止当前正在播放的音频
      const currentAudio = document.querySelector(`audio[data-index="${currentPlayingIndex}"]`) as HTMLAudioElement;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }
  
    const audio = document.querySelector(`audio[data-index="${index}"]`) as HTMLAudioElement;
    if (audio) {
      if (currentPlayingIndex === index && isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setCurrentPlayingIndex(null);
      } else {
        audio.play();
        setIsPlaying(true);
        setCurrentPlayingIndex(index);
      }
    }
  };

 // 添加下载处理函数
const handleDownload = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${filename}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    alertRef.current?.openModal({
      type: 0,
      title: "Download Failed",
      message: "Failed to download audio file. Please try again.",
    });
  }
};

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Format time for display (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Mock function to simulate music generation
  // Function to check music generation status
  async function checkMusicStatus(taskId: string) {
    if (!taskId) {
      console.error('No taskId provided');
      return;
    }

    const startTime = Date.now();
    let attempts = 0;

    const interval = setInterval(async () => {
      if (attempts >= 30) {
        clearInterval(interval);
        setStatusInterval(null);
        console.error('Polling timed out');
        return;
      }

      attempts++;

      try {
        const response = await fetch(`/api/check-status?taskId=${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Response:', result);

          switch (result.status) {
            case 'SUCCESS':
              const totalDuration = (Date.now() - startTime) / 1000;
              console.log('Music generation successful:', result.sunoData);
              console.log('Total duration:', totalDuration, 'seconds');
              clearInterval(interval);
              setStatusInterval(null);
              break;
            case 'PENDING':
              console.log('Music generation pending...');
              break;
            default:
              clearInterval(interval);
              setStatusInterval(null);
              throw new Error(`Error: ${result.status}`);
          }
        } else {
          clearInterval(interval);
          setStatusInterval(null);
          throw new Error(`Failed to check status: ${response.status}`);
        }
      } catch (error) {
        clearInterval(interval);
        setStatusInterval(null);
        console.error('Error checking status:', error);
      }
    }, 1500);
  }

  // Modify generateMusic function to include polling
  async function generateMusic(formData: FormData) {
    setGenerationError('')
    if (!auth) {
      router.push(`${getPathname(lang, "/sign-in")}`);
      return;
    }

    let currentCredits = 0;
    if (auth.userId) {
      try {
            currentCredits = await findUserCreditsByClerkId(auth.userId);
            debugger
            if (currentCredits < 3) {
              setGenerationError(dictionary?.credits_buy_tips1 || "Insufficient credits, please purchase more credits");
              setIsGenerating(false); // 取消生成状态
              return;
            }
            // 先扣除积分
            await updateUserCreditByClerkId(3, auth.userId, currentCredits);
            console.log('Initial credits deducted successfully, current credits:', currentCredits - 3);
          } catch (error) {
            await updateUserCreditByClerkId(-3, auth.userId, currentCredits + 3);
            console.error('Error deducting credits:', error);
            setGenerationError(dictionary?.credits_buy_tips1 || "Failed to deduct credits, please try again");
            setIsGenerating(false); // 取消生成状态
            return;
          }
        }
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generateMusic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.get("prompt"),
          genre: formData.get("genre"),
          title: formData.get("title"),
        }),
      });

      const result = await response.json();

      if (result.code === 402) {
        setGenerationError(result.msg || "积分不足，请充值后重试");
        throw new Error(result.msg);
      }

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      //  taskId，开始轮询
      if (result.data && result.data.taskId) {
        const maxAttempts = 180; // 3分钟
        const interval = 1000; // 每秒查询一次

        for (let i = 0; i < maxAttempts; i++) {
          try {
            const statusResponse = await fetch(`/api/check-status?taskId=${result.data.taskId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            });

            const statusResult = await statusResponse.json();

            if (statusResult.error_code) {
              if (auth.userId) {
                await updateUserCreditByClerkId(-3, auth.userId, currentCredits + 3);
              }
              break;
            }
            console.log('Status:', statusResult);
            if (statusResult.status === 'success') {
              setSunoData(statusResult.sunoData);
              setCurrentTaskId(result.taskId);
              break;
            }

            await new Promise(resolve => setTimeout(resolve, interval));
          } catch (error) {
            console.error('轮询出错:', error);
          }
        }
      } else if (result.error_code) {
        if (auth.userId) {
          await updateUserCreditByClerkId(-3, auth.userId, currentCredits + 3);
        }
      }
    } catch (error) {
      console.error("Error generating music:", error);
      setGenerationError((error as Error).message || "Failed to generate music. Please try again.");
      alertRef.current?.openModal({
        type: 0,
        title: "Generation Failed",
        message: "Failed to generate music. Please try again.",
      });
    } finally {
      setIsGenerating(false);
      setStatusInterval(null);
    }
  }
  function setErrorTips(error: string = "select an image") {
    alertRef.current?.openModal({ type: 0, title: "Oops!", message: error })
  }
  return (
    <>
      <Modal ref={modalRef}>
        <svg
          className=" mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {dictionary?.credits_buy_tips3 || "You need credits to generate music"}
        </h3>
        <Link
          href={`${getPathname(lang, "/stripe")}`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {dictionary?.credits_buy_btn_label1 || "Buy Credits"}
        </Link>
        <button
          type="button"
          onClick={() => modalRef.current?.closeModal()}
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {dictionary?.credits_buy_btn_label2 || "Cancel"}
        </button>
      </Modal>
      <Dialogs ref={alertRef} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto mt-8 px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        >
          {dictionary?.generator?.title || "AI Music Generator"}
        </motion.h1>

        {auth && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            {auth.creditBalance > 0 ? (
              <div className="inline-flex items-center py-2 px-4 rounded-lg bg-blue-900/50 text-blue-200 border border-blue-700/50">
                <p className="text-sm font-semibold">{dictionary?.credits_label || `Credits: ${auth.creditBalance}`}</p>
              </div>
            ) : (
              <div className="inline-flex items-center py-2 px-4 rounded-lg bg-red-900/50 text-red-200 border border-red-700/50">
                <p className="font-medium">
                  {dictionary?.credits_buy_tips1 || "You need credits to generate music. "}
                  <Link
                    href={`${getPathname(lang, "/stripe")}`}
                    className="font-semibold underline text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {dictionary?.credits_buy_tips2 || "Buy now"}
                  </Link>
                </p>
              </div>
            )}
          </motion.div>
        )}

        {!auth && (
          <h3 className="text-md font-bold text-gray-200 mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {dictionary?.subscrible_tips1 || "Sign in to generate music"}
            </span>
          </h3>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Input Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full">

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!prompt.trim()) {
                  alertRef.current?.openModal({
                    type: 0,
                    title: dictionary.generator.errors.prompt.empty,
                    message: dictionary.generator.errors.prompt.empty,
                  });
                  return
                }
                const formData = new FormData(e.currentTarget)
                formData.set("title", title)
                formData.set("prompt", prompt)
                formData.set("genre", selectedGenre)
                generateMusic(formData)
              }}
              ref={formRef}
              className="flex flex-col h-full"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {dictionary.generator.form.title}
                </h2>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={80}
                  className="w-full p-2 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500 rounded-lg"
                  placeholder={dictionary.generator.form.title}
                />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {dictionary.generator.form.describe.title}
                </h2>

                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={3000}
                  className="min-h-[150px] resize-y bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                  placeholder={dictionary.generator.form.describe.description}
                />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {dictionary.generator.form.style.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">{dictionary.generator.form.style.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {musicGenres.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => setSelectedGenre(genre.id)}
                      className={`flex flex-col items-center p-3 rounded-lg border transition-all ${selectedGenre === genre.id
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-gray-700 hover:bg-gray-700/50"
                        }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center bg-gradient-to-br ${genre.color}`}
                      >
                        <span className="text-lg">{genre.icon}</span>
                      </div>
                      <span
                        className={`text-sm font-medium ${selectedGenre === genre.id ? "text-purple-400" : "text-gray-200"}`}
                      >
                        {genre.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Music className="w-5 h-5" />
                  {isGenerating ? dictionary?.generator?.generation?.button?.generating || "Generating..." : dictionary?.generator?.generation?.button?.generate || "Generate Music"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Music Player */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {dictionary.generator.generation.player.title}
            </h2>
            <h3 className="text-sm text-gray-400  ">
              {dictionary.generator.generation.player.description}
            </h3>
            {/* 添加错误信息显示 */}
            {generationError && (
              <div className="my-2 p-4 py-1 bg-red-900/50 border border-red-700/50 rounded-lg">
                <p className="text-red-200 text-sm">{generationError}</p>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {dictionary?.generator?.player?.title}
            </h2>
            <p className="text-sm text-gray-400 mb-2">
              {dictionary?.generator?.player?.description}
            </p>

            <div className="flex-1 flex flex-col items-center justify-center bg-gray-700/30 rounded-lg p-6 border border-gray-600">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Music className="w-12 h-12 text-purple-400 animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-3">
                    {dictionary?.generator?.generation?.generating || "Generating Your Music"}
                  </h3>
                  <p className="text-gray-400 text-center max-w-sm">
                    {dictionary?.generator?.generation?.description || "Please wait while we create your unique music track. This may take a few minutes..."}
                  </p>
                  <div className="mt-6 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              ) : sunoData.length ? (
                <div className="w-full space-y-6"> {/* 修改为竖向布局 */}
                  {sunoData.map((track: any, index: any) => (
                    <div key={index} className="bg-gray-800/40 rounded-2xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-lg">
                      <div className="flex items-start gap-6">
                        {/* 左侧封面和标题 */}
                        <div className="w-32 flex-shrink-0">
                          <div className="relative group aspect-square mb-2">
                            <div className={`w-full h-full rounded-full overflow-hidden ${currentPlayingIndex === index && isPlaying ? 'cover-rotating playing' : 'cover-rotating'}`}>
                              <img
                                src={track.imageUrl}
                                alt={track.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* 右侧内容 */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-100 mb-1">{track.title+`-${index+1}`}</h3>
                          {/* <p className="text-sm text-gray-400 mb-4 line-clamp-2">{track.prompt}</p> */}
                          
                          {/* 音频控制器 */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <audio
                                data-index={index}
                                src={track.audioUrl}
                                ref={index === currentPlayingIndex ? audioRef : null}
                                onTimeUpdate={() => {
                                  if (index === currentPlayingIndex && audioRef.current) {
                                    setCurrentTime(audioRef.current.currentTime);
                                  }
                                }}
                                onLoadedMetadata={() => {
                                  if (index === currentPlayingIndex && audioRef.current) {
                                    setDuration(audioRef.current.duration);
                                  }
                                }}
                                onEnded={() => {
                                  setIsPlaying(false);
                                  setCurrentPlayingIndex(null);
                                }}
                              />
                              
                              {/* 播放按钮 */}
                              <button
                                onClick={() => togglePlayPause(index, track.audioUrl)}
                                className="p-4 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 transition-all duration-300 group"
                              >
                                {currentPlayingIndex === index && isPlaying ? (
                                  <Pause className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                                ) : (
                                  <Play className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                                )}
                              </button>
                              
                              {/* 时间显示 */}
                              <div className="text-sm text-gray-400">
                                <span>{formatTime(currentPlayingIndex === index ? currentTime : 0)}</span>
                                <span className="mx-1">/</span>
                                <span>{formatTime(track.duration || 0)}</span>
                              </div>
                              
                              {/* 下载按钮 */}
                              <button
                                onClick={() => handleDownload(track.audioUrl, track.title)}
                                className="ml-auto flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 text-sm text-gray-300 hover:text-white"
                              >
                                <Download className="w-4 h-4" />
                                <span>下载</span>
                              </button>
                            </div>
                            
                            {/* 进度条 */}
                            <div className="relative w-full">
                              <input
                                type="range"
                                min={0}
                                max={track.duration || 100}
                                value={currentPlayingIndex === index ? currentTime : 0}
                                onChange={(e) => {
                                  if (index === currentPlayingIndex && audioRef.current) {
                                    const newTime = parseFloat(e.target.value);
                                    audioRef.current.currentTime = newTime;
                                    setCurrentTime(newTime);
                                  }
                                }}
                                className="audio-progress absolute inset-0 z-10"
                              />
                              {/* <div 
                                className="absolute left-0 top-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none"
                                style={{ 
                                  width: `${currentPlayingIndex === index ? (currentTime / (track.duration || 1)) * 100 : 0}%` 
                                }}
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <Music className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    {dictionary?.generator?.player?.empty?.title || "No Music Generated Yet"}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    {dictionary?.generator?.player?.empty?.description || "Fill out the form on the left and click \"Generate Music\" to create your custom AI music"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}













