"use client";

import { use, useState, useEffect } from "react";
import { useStudioDetail } from "@/features/studios/hooks/useStudioDetail";
import { useStudioReviews } from "@/features/review/hooks/useReview";
import { TopBar } from "@/features/studios/ui/TopBar";
import { StudioImages } from "@/features/studios/ui/StudioImages";
import { StudioSummary } from "@/features/studios/ui/StudioSummary";
import { StudioTabs } from "@/features/studios/ui/StudioTabs";
import { StudioProducts } from "@/features/studios/ui/StudioProducts";
import { StudioReviews } from "@/features/studios/ui/StudioReviews";
import useStudioStore from "@/features/studios/store/StudioStore";
import { useGNBStore } from "@/features/common/store/useGnbStore";

function StudioDetailPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = use(params);
  const studioIdNumber = parseInt(studioId, 10);
  const setStudioId = useStudioStore((state) => state.setStudioId);
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  const { data: studioData, loading } = useStudioDetail(studioIdNumber);
  const { data: reviews } = useStudioReviews(studioIdNumber);
  const [activeTab, setActiveTab] = useState("가격");

  useEffect(() => {
    setStudioId(studioIdNumber);
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [studioIdNumber, setStudioId, setShowGNB]);

  if (loading) return <div>로딩 중...</div>;
  if (!studioData) return <div>스튜디오 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <TopBar />
      <StudioImages facilityImageUrls={studioData.facilityImageUrls} />
      <StudioSummary
        profileImage={studioData.profileImage}
        name={studioData.name}
        totalReviews={studioData.products.reduce(
          (sum, p) => sum + p.reviewCount,
          0
        )}
        description={studioData.description}
        notice={studioData.notice}
        address={studioData.address}
        operationHour={studioData.operationHour}
      />
      <StudioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "가격" && (
        <StudioProducts products={studioData.products} />
      )}
      {activeTab === "리뷰" && <StudioReviews reviews={reviews} />}
    </div>
  );
}

export default StudioDetailPage;
