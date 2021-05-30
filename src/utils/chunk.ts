// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const chunk<T> = (arr: any[], size: number) =>
function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from(
    {
      length: Math.ceil(arr.length / size),
    },
    (_, i) => arr.slice(i * size, i * size + size)
  );
}

export default chunk;
