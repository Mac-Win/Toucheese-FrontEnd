"use client";

import useStudioStore from "@/features/studios/store/StudioStore";

export function StudioTabs() {
  const { activeTab, setActiveTab } = useStudioStore();
  const tabs = ["가격", "리뷰"];

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-2 outline-none rounded-t-2xl font-semibold transition-all ${
            activeTab === tab ? "bg-yellow-200" : "bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
