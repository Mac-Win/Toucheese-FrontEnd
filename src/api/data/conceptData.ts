/* -------------------------------------------------------------------------- */
/*                                   화면 확인용                                   */
/* -------------------------------------------------------------------------- */

export interface Concept {
  id: number;
  title: string;
  imageName: string;
}

export const concepts: Concept[] = [
  { id: 1, title: "생동감 있는 실물 느낌", imageName: "concept1.png" },
  { id: 2, title: "플래쉬/아이돌 느낌", imageName: "concept2.png" },
  { id: 3, title: "흑백/블루 배우 느낌", imageName: "concept3.png" },
  { id: 4, title: "내추럴 화보 느낌", imageName: "concept4.png" },
  { id: 5, title: "선명하고 인형같은 느낌", imageName: "concept5.png" },
  { id: 6, title: "필터/수채화 그림체 느낌", imageName: "concept6.png" },
];
