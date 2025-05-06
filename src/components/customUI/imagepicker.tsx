'use client'
import { ChangeEvent, useState, useRef, ClipboardEvent } from 'react';
import Dialogs, { AlertRef } from "@/components/customUI/alerts";

type ImagePickerProps = {
  onImageSelected?: (selectedImage: File | null) => void;
  member: boolean;
  className?: string;
  defaultImage?: string;
}

export default function ImagePicker({ onImageSelected, member, className, defaultImage }: ImagePickerProps) {

  const alertRef = useRef<AlertRef | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(defaultImage ? defaultImage : null);
  const imagePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  //定义一个大小4M
  const MAX_FILE_SIZE_IN_BYTES_2M = 2 * 1024 * 1024; // 2 MB
  const MAX_FILE_SIZE_IN_BYTES_4M = 4 * 1024 * 1024; // 4 MB
  const FILE_SELECT_ERROR_MESSAGE = 'Failed to load the selected image. Please try again.';
  const SIZE_EXCEEDS_LIMIT_MESSAGE = 'The selected file exceeds the maximum allowed size.';
  // const MAX_FILE_SIZE_IN_BYTES = member ? MAX_FILE_SIZE_IN_BYTES_4M : MAX_FILE_SIZE_IN_BYTES_2M;
  const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_BYTES_4M;

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      setErrorTips(FILE_SELECT_ERROR_MESSAGE);
      return;
    }

    const file = e.target.files[0];
    if(!handleImageProcessing(file)) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.onerror = function () {
      setErrorTips(FILE_SELECT_ERROR_MESSAGE);
    };
    reader.readAsDataURL(file);
  };


  function setErrorTips(error: string = "select an image") {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSelectedImage(null);
    if (typeof onImageSelected === 'function') {
      onImageSelected(null);
    }
    alertRef.current?.openModal({ type: 0, title: "Oops!", message: error })
  }

  function pasteHandeler(e: ClipboardEvent<HTMLDivElement>) {
    const items = e.clipboardData?.items;
    if (!items || !items[0]) return;
    const file: File = items[0].getAsFile() as File;

    if(!handleImageProcessing(file)) return;

    const reader = new FileReader();
    reader.onload = () => {

      setSelectedImage(reader.result as string);
      if (typeof onImageSelected === 'function') {
        onImageSelected(file);
      }

    }
    reader.onerror = function () {
      setErrorTips(FILE_SELECT_ERROR_MESSAGE);
    };
    reader.readAsDataURL(file);
  }

  function handleImageProcessing(file: File) {
    if (typeof onImageSelected === 'function') {
      onImageSelected(null);
    }
    if (!file || !file.type.startsWith('image/')) {
      setErrorTips();
      return false;
    }
    if (file && file.size > MAX_FILE_SIZE_IN_BYTES) {
      setErrorTips(SIZE_EXCEEDS_LIMIT_MESSAGE);
      return false;
    }
    return true;
  }

  function handleMouseEnter() {
    if (imagePickerRef.current) {
      imagePickerRef.current.focus();
    }
  };

  return (
    <>
      <Dialogs ref={alertRef} />
      <div 
        tabIndex={0} 
        ref={imagePickerRef} 
        className="w-full cursor-pointer rounded-lg focus:outline-none resize-none caret-transparent bg-gray-800/50 backdrop-blur-sm"
        contentEditable={true}
        onMouseEnter={handleMouseEnter} 
        onPaste={pasteHandeler}
      >
        <label 
          htmlFor="file" 
          className={`flex w-full items-center justify-center border border-dashed border-gray-600 hover:border-gray-500 rounded-lg cursor-pointer transition-all ${className ?? 'h-64'}`}
        >
          <input 
            id="file" 
            name="file" 
            accept="image/png, image/jpeg" 
            type="file"
            className="sr-only" 
            onChange={(e) => handleImageSelect(e)} 
            ref={inputRef} 
          />
          {selectedImage ? (
            <img 
              id="image" 
              src={selectedImage} 
              alt="Selected Image"
              className={`${className ?? 'h-64'} w-auto rounded-lg cursor-pointer p-2 object-contain`} 
            />
          ) : (
            <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${className ?? 'h-64'}`}>
                <svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path 
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd" 
                    />
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or paste image
                </p>
                <p className="text-xs text-gray-400">
                    PNG, JPG or JPEG (Recommended: 300 x 300px)
                </p>
            </div>
          )}
        </label>
      </div>
    </>
);
};