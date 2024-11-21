export interface Concept {
  id: number;
  title: string;
  imageName: string;
}

export const concepts: Concept[] = [
  { id: 1, title: "생동감있는", imageName: "concept1.png" },
  { id: 2, title: "플래쉬/유광", imageName: "concept2.png" },
  { id: 3, title: "선명한", imageName: "concept3.png" },
  { id: 4, title: "수채화 그림체", imageName: "concept4.png" },
];
