export const MAIN_APP_COLORS = {
  pink: "#FFD1DC",
  "mint-green": "#98FF98",
  lavender: "#E6E6FA",
  "sky-blue": "#87CEEB",
  peach: "#FFE5B4",
  "lemon-chiffon": "#FFFACD",
  "baby-blue": "#89CFF0",
  "soft-yellow": "#F0E68C",
};

export const TEXT_COLORS_FOR_MAIN_APP_COLORS = {
  pink: "#4B000F", // Deep maroon contrasts with pastel pink
  "mint-green": "#004D38", // Deep green contrasts with mint green
  lavender: "#341C4F", // Dark purple contrasts with lavender
  "sky-blue": "#003A70", // Dark blue contrasts with sky blue
  peach: "#663C00", // Dark brown contrasts with peach
  "lemon-chiffon": "#665C00", // Dark olive green contrasts with lemon chiffon
  "baby-blue": "#002D62", // Navy blue contrasts with baby blue
  "soft-yellow": "#585800", // Dark mustard contrasts with soft yellow
};

type KEYS = keyof typeof MAIN_APP_COLORS &
  keyof typeof TEXT_COLORS_FOR_MAIN_APP_COLORS;

const key: KEYS = "soft-yellow";

export const CURRENT_MAIN_APP_COLOR = MAIN_APP_COLORS[key];
export const CURRENT_MAIN_APP_FOREGROUND_COLOR =
  TEXT_COLORS_FOR_MAIN_APP_COLORS[key];
