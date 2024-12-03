"use client";

export function StudioTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = ["가격", "리뷰"];

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-2 outline-none rounded-t-2xl font-semibold transition-all bg-gray-200  ${
            activeTab === tab ? "bg-yellow-200" : "bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
