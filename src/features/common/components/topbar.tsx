"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type TopBarProps = {
  showShare?: boolean; // 공유 버튼 표시 여부
  message?: string;
};

export function TopBar({ showShare = true, message }: TopBarProps) {
  const [activeShare, setActiveShare] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleModalOpen = () => {
    setActiveShare(true);
  };

  const handleModalClose = () => {
    setActiveShare(false);
  };

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      navigator.clipboard.writeText(window.location.href); // 현재 URL 복사
      alert("링크가 복사되었습니다!");
    } else {
      alert(`${platform}으로 공유합니다.`);
    }
    handleModalClose();
  };

  return (
    <>
      <div
        className={`fixed z-10 w-full left-0 top-0 transition-colors duration-300 `}
      >
        <div
          className={`mx-auto max-w-custom px-4 flex items-center transition-all pt-6 ${
            isScrolled ? "bg-white shadow-md py-6" : "bg-transparent"
          }`}
        >
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()}>
              <Image src="/icons/back.svg" alt="back" width={36} height={36} />
            </button>
            <span className="font-bold text-lg">{message}</span>
          </div>
          {showShare && (
            <div className="ml-auto flex items-center">
              <button onClick={handleModalOpen}>
                <Image
                  src="/icons/share.svg"
                  alt="share"
                  width={36}
                  height={36}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeShare && (
          <motion.div
            initial={{ y: "100%" }} // 아래에서 시작
            animate={{ y: 0 }} // 화면에 나타날 때 위로 슬라이드
            exit={{ y: "100%" }} // 사라질 때 아래로 슬라이드
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-0 right-0 left-0 z-50 w-full"
          >
            <div className="relative mx-auto bg-white p-4 rounded-t-lg shadow-lg max-w-custom w-full">
              {/* 닫기 버튼 */}
              <button
                onClick={handleModalClose}
                className="absolute top-2 right-4 text-gray-500 text-lg"
              >
                ✕
              </button>

              <h2 className="text-lg font-bold mb-4 text-center">공유하기</h2>
              <div className="flex justify-around items-center">
                <button
                  onClick={() => handleShare("Instagram")}
                  className="flex items-center flex-col gap-2 p-2"
                >
                  <Image
                    src="/sns/instagram.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                  <span>인스타그램</span>
                </button>
                <button
                  onClick={() => handleShare("KakaoTalk")}
                  className="flex items-center flex-col gap-2 p-2"
                >
                  <Image
                    src="/sns/kakao.svg"
                    alt="KakaoTalk"
                    width={24}
                    height={24}
                  />
                  <span>카카오톡</span>
                </button>
                <button
                  onClick={() => handleShare("Facebook")}
                  className="flex items-center flex-col gap-2 p-2"
                >
                  <Image
                    src="/sns/facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                  <span>페이스북</span>
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="flex items-center flex-col gap-2 p-2"
                >
                  <Image
                    src="/sns/copylink.svg"
                    alt="Copy Link"
                    width={24}
                    height={24}
                  />
                  <span>링크 복사</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
