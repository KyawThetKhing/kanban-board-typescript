const randomColors = [
  "#635fc7",
  "#a8a4ff",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#b22a00",
  "#357a38",
  "#00e676",
  "#f50057",
];

export const generateRandomColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};
