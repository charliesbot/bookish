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

export type ForegroundAndBackground = {
  foregroundColor: string;
  backgroundColor: string;
};

export type BookPalette = {
  colorOne: ForegroundAndBackground;
  colorTwo: ForegroundAndBackground;
  colorThree: ForegroundAndBackground;
  colorFour: ForegroundAndBackground;
};
