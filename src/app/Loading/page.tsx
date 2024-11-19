function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* 로딩 애니메이션 */}
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"></div>

        {/* 로딩 텍스트 */}
        <p className="mt-4 text-xl font-semibold text-gray-700">
          로딩 중입니다... 잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}

export default Loading;
