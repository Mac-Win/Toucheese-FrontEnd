"use client";

import { useSearchParams } from "next/navigation";
import StudioList from "@/features/studio/StudioList";
import Header from "@/features/header/header";

const StudiosPage = () => {
  const searchParams = useSearchParams();
  const conceptIdParam = searchParams.get("conceptId");
  const conceptId = conceptIdParam ? parseInt(conceptIdParam, 10) : null;

  if (conceptId === null || isNaN(conceptId)) {
    return (
      <>
        <Header />
        <div className="text-center mt-10 text-red-500">
          conceptId가 유효하지 않습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <StudioList conceptId={conceptId} />
    </>
  );
};

export default StudiosPage;
