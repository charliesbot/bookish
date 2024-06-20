import { useEffect, useState } from "react";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import {
  BookColorsType,
  BookPalette,
  ForegroundBackground,
  HSLColor,
  MaybeNull,
  RGBColor,
} from "../types/types";

export function convertHexaToRGB(hexa: string, alpha: number = 1): RGBColor {
  let hex = hexa.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  let a = alpha;

  return {
    r,
    g,
    b,
    a,
    toString: () => `rgba(${r}, ${g}, ${b}, ${a})`,
  };
}

const convertRGBtoHSL = (rgb: RGBColor): HSLColor => {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2,
  };
};

function convertHexaToHSL(hexa: string) {
  const rgb = convertHexaToRGB(hexa);
  return convertRGBtoHSL(rgb);
}

const getPaletteFromHSL = (hsl: HSLColor): ForegroundBackground => {
  const { h, s, l } = hsl;

  return {
    foregroundColor: `hsl(${h}, ${s}%, 5%)`,
    backgroundColor: `hsl(${h}, ${s}%, 90%)`,
    originalColor: `hsl(${h}, ${s}%, 60%)`,
  };
};

const getColorsByPlatform = (
  imageColorsResult: ImageColorsResult
): BookColorsType => {
  switch (imageColorsResult.platform) {
    case "android":
    case "web":
      return {
        colorOne: imageColorsResult.lightVibrant,
        colorTwo: imageColorsResult.dominant,
        colorThree: imageColorsResult.vibrant,
        colorFour: imageColorsResult.darkVibrant,
      };
    case "ios":
      return {
        colorOne: imageColorsResult.background,
        colorTwo: imageColorsResult.detail,
        colorThree: imageColorsResult.primary,
        colorFour: imageColorsResult.secondary,
      };
    default:
      throw new Error("Unexpected platform");
  }
};

export const useImageColors = (url?: string) => {
  const [colors, setColors] = useState<MaybeNull<BookPalette>>(null);
  useEffect(() => {
    if (!url) {
      return;
    }

    getColors(url, {
      fallback: "#228B22",
      cache: true,
      key: url,
    })
      .then(getColorsByPlatform)
      .then((colors) => ({
        colorOne: convertHexaToHSL(colors.colorOne),
        colorTwo: convertHexaToHSL(colors.colorTwo),
        colorThree: convertHexaToHSL(colors.colorThree),
        colorFour: convertHexaToHSL(colors.colorFour),
      }))
      .then((hslColors) => ({
        colorOne: getPaletteFromHSL(hslColors.colorOne),
        colorTwo: getPaletteFromHSL(hslColors.colorTwo),
        colorThree: getPaletteFromHSL(hslColors.colorThree),
        colorFour: getPaletteFromHSL(hslColors.colorFour),
      }))
      .then(setColors);
  }, [url]);

  return colors;
};
