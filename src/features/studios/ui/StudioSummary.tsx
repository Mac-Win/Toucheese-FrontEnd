"use client";

import { useState } from "react";
import Image from "next/image";
import { formatContent } from "@/utils/formatContent";

export function StudioSummary({
  profileImage,
  name,
  totalReviews,
  description,
  address,
  operationHour,
  notice,
}: {
  profileImage: string;
  name: string;
  totalReviews: number;
  description: string;
  address: string;
  operationHour: string;
  notice: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false);

  // 설명 내용을 문단 단위로 포맷팅
  const formattedContent = formatContent(description);

  // 표시할 내용 결정
  const visibleContent = isExpanded
    ? formattedContent
    : formattedContent.slice(0, 2); // 처음 두 문단만 표시

  return (
    <div>
      <div className="flex items-center gap-4 my-4">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={profileImage}
            alt={`${name} profile`}
            width={48}
            height={48}
          />
        </div>
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
      <div>
        <p>❤️ 리뷰 {totalReviews}개</p>
        <p>🗺️ 주소 {address}</p>
        <p>🕒 영업시간 {operationHour}</p>
      </div>
      {/* Description Section */}
      <div className="mt-4">
        {visibleContent.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed mb-2">
            {paragraph}.
          </p>
        ))}
        {formattedContent.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 text-sm font-semibold"
          >
            {isExpanded ? "간략히 보기" : "자세히 보기"}
          </button>
        )}
      </div>
      {/* Notice Section */}
      <div className="my-4 bg-gray-200 p-4 rounded-lg flex items-start gap-2">
        <div className="flex-grow text-sm text-gray-700">
          <p
            className={`${
              isNoticeExpanded ? "line-clamp-none" : "line-clamp-2"
            } overflow-hidden transition-all`}
          >
            {notice}
          </p>
        </div>
        <button
          onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}
          className="text-gray-500 text-xs flex-shrink-0"
        >
          {isNoticeExpanded ? "▲" : "▼"}
        </button>
      </div>
    </div>
  );
}
