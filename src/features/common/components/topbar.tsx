"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type TopBarProps = {
  showShare?: boolean; // 공유 버튼 표시 여부
};

export function TopBar({ showShare = true }: TopBarProps) {
  const [activeShare, setActiveShare] = useState(false);
  const router = useRouter();

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
      {/* TopBar */}
      <div className="fixed z-10 w-full py-2 -left-1">
        <div className="mx-auto max-w-custom px-6 flex items-center  ">
          <div>
            <button onClick={() => router.back()}>
              <Image src="/icons/back.svg" alt="back" width={36} height={36} />
            </button>
          </div>
          {showShare && (
            <div className="ml-auto">
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
            className="fixed bottom-0 right-0; left-0 z-50 w-full"
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
