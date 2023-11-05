export const chunkArray = <T>(data: T[], size: number): T[][] => {
  const R = [];
  for (let i = 0; i < data.length; i += size) {
    R.push(data.slice(i, i + size));
  }
  return R;
};

export const shuffle = <T = unknown>(data: T[]): T[] => {
  const shuffled: T[] = [];
  const copy = [...data];

  while (shuffled.length !== data.length) {
    const randomIndx = Math.floor(Math.random() * copy.length);

    shuffled.push(copy.splice(randomIndx, 1)[0]);
  }

  return shuffled;
};
