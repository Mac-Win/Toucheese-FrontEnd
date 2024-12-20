"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const NewContact = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  useEffect(() => {
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-7 mb-2"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          placeholder="제목을 입력해주세요."
          className="w-full border border-gray-3 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-btn-color "
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-7 mb-2"
        >
          문의 내용
        </label>
        <textarea
          id="description"
          placeholder="문의 내용을 입력해주세요."
          rows={10}
          className="w-full border border-gray-3 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-btn-color resize-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-7 mb-2">
          이미지 첨부
        </label>
        <div className="flex items-center space-x-2">
          <label className="flex flex-col items-center justify-center w-20 h-20 bg-gray-2 rounded-lg cursor-pointer border border-gray-4">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-xs text-gray-5">{`${selectedFiles.length}/5`}</span>
          </label>

          {/* Preview Thumbnails */}
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center w-20 h-20 bg-gray-1 rounded-lg overflow-hidden border border-gray-3"
            >
              <Image
                src={url}
                alt={`preview-${index}`}
                className="object-cover w-full h-full"
                fill
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        className="w-full bg-primary-5 text-black font-medium py-2 rounded-lg shadow hover:bg-yellow-600 transition mt-auto"
      >
        문의 등록
      </button>
    </div>
  );
};

export default NewContact;
