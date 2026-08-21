export type Ayah = {
  surahName: string;
  arabicData: string[];
  englishData: string;
  bengaliData: string;
  surahNumber: number;
  ayahNumber: number;
};

export type Props = {
  ayah: Ayah;
  showSaveButton?: boolean;
};

export type ReadRecord = { date: string; ayahIndex: number };

export type BGProps = {
  gradientFade?: boolean;
  lineColor?: string;
  bgColor?: string;
  opacity?: number;
};