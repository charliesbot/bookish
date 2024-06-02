export interface BookType {
  id: string;
  authors: string;
  title: string;
  image: string;
}

export type MaybeNull<T> = T | null | undefined;

export type BookColorsType = {
  colorOne: string;
  colorTwo: string;
  colorThree: string;
  colorFour: string;
};

export type RGBColor = {
  r: number;
  g: number;
  b: number;
};

export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type ForegroundBackground = {
  foregroundColor: string;
  backgroundColor: string;
  originalColor: string;
};

export type BookPalette = {
  colorOne: ForegroundBackground;
  colorTwo: ForegroundBackground;
  colorThree: ForegroundBackground;
  colorFour: ForegroundBackground;
};

export type BookPaletteKey = keyof BookPalette;
