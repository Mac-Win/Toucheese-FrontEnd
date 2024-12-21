import { FilterConfig } from "@/features/studios/types/filters.type";

export const filterConfigs: FilterConfig[] = [
  {
    label: "지역별",
    key: "locations",
    options: [
      { label: "전체", value: "" },
      { label: "강남", value: "강남" },
      { label: "서초", value: "서초" },
      { label: "송파", value: "송파" },
      { label: "강서", value: "강서" },
      { label: "마포", value: "마포" },
      { label: "영등포", value: "영등포" },
      { label: "강북", value: "강북" },
      { label: "용산", value: "용산" },
      { label: "성동", value: "성동" },
    ],
  },
  {
    label: "평점순",
    key: "rating",
    options: [
      { label: "전체", value: "" },
      { label: "3.0 이상", value: "3" },
      { label: "4.0 이상", value: "4" },
      { label: "4.5 이상", value: "4.5" },
    ],
  },
  {
    label: "가격순",
    key: "price",
    options: [
      { label: "전체", value: "" },
      { label: "10만원 미만", value: "99999" },
      { label: "20만원 미만", value: "199999" },
      { label: "20만원 이상", value: "200000" },
    ],
  },
];
