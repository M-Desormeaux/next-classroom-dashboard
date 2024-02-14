export const getScores = (grades: number[]) => {
  const min = Math.min(...grades) ?? 0;
  const max = Math.max(...grades) ?? 0;
  const difference = max - min;

  const sum = grades.reduce((a, b) => a + b, 0) ?? 0;
  const avg = Number((sum / grades.length || 0).toFixed(1)) ?? 0;

  return { min, max, avg, difference };
};
