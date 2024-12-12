"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { formatContent } from "@/utils/formatContent";

export function StudioSummary({
  profileImage,
  name,
  totalReviews,
  description,
  address,
  operatingHours,
  notice,
}: {
  profileImage: string;
  name: string;
  totalReviews: number;
  description: string;
  address: string;
  operatingHours: { dayOfWeek: string; openTime: string; closeTime: string }[];
  notice: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 오늘 요일 계산 (한국 기준)
  const todayIndex = new Date().getDay(); // 일요일(0) ~ 토요일(6)
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // 요일 매핑 (한국어 요일 순서와 일치)
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 오늘의 영업시간 계산
  const today = daysOfWeek[todayIndex];
  const todayOperatingHours = operatingHours.find(
    (item) => item.dayOfWeek === today
  );

  const isOpen =
    todayOperatingHours?.openTime !== "휴무" &&
    todayOperatingHours &&
    (() => {
      const [openHours, openMinutes] = todayOperatingHours.openTime
        .split(":")
        .map(Number);
      const [closeHours, closeMinutes] = todayOperatingHours.closeTime
        .split(":")
        .map(Number);

      const openTime = openHours * 60 + openMinutes;
      const closeTime = closeHours * 60 + closeMinutes;
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;

      return (
        currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime
      );
    })();

  // 영업시간 정렬 (오늘 요일이 첫 번째로 오게 정렬)
  const sortedOperatingHours = useMemo(() => {
    const todayIndexInData = operatingHours.findIndex(
      (item) => item.dayOfWeek === today
    );
    if (todayIndexInData === -1) return operatingHours; // 데이터에 오늘 요일이 없을 경우 원래 순서 유지

    // 오늘 요일 기준으로 배열 정렬
    return [
      ...operatingHours.slice(todayIndexInData),
      ...operatingHours.slice(0, todayIndexInData),
    ];
  }, [operatingHours, today]);

  // 설명 내용을 문단 단위로 포맷팅
  const formattedContent = formatContent(description);

  // 표시할 내용 결정
  const visibleContent = isExpanded
    ? formattedContent
    : formattedContent.slice(0, 2); // 처음 두 문단만 표시

  return (
    <div>
      {/* 프로필 섹션 */}
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
      </div>
      {/* 영업 상태 섹션 */}
      <div className="mt-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-betweenp-3  cursor-pointer"
        >
          <span
            className={`font-bold ${isOpen ? "text-green-500" : "text-red-500"}`}
          >
            {isOpen ? "🕒 영업 중" : "🕒 휴무"}
          </span>
          <span className="text-gray-500 text-sm ml-2">
            {isDropdownOpen ? "▲" : "▼"}
          </span>
        </button>
        {isDropdownOpen && (
          <ul className="bg-white shadow-md rounded-md p-2">
            {sortedOperatingHours.map(
              ({ dayOfWeek, openTime, closeTime }, idx) => (
                <li key={idx} className="flex gap-4 py-1 px-">
                  <span
                    className={`font-semibold ${idx === 0 ? "text-blue-500" : ""}`}
                  >
                    {dayOfWeek}
                  </span>
                  {openTime === "휴무" ? (
                    <span>휴무</span>
                  ) : (
                    <span>
                      {openTime} - {closeTime}
                    </span>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </div>
      {/* 설명 섹션 */}
      <div className="mt-2">
        {visibleContent.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed mb-1">
            {paragraph}.
          </p>
        ))}
        {formattedContent.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cheese-bg text-sm font-semibold"
          >
            {isExpanded ? "간략히 보기" : "자세히 보기"}
          </button>
        )}
      </div>
      {/* 공지사항 섹션 */}
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
