export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
}

// random in array
export function randomInArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
