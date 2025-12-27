export function courseColor(courseId: number | string) {
  const str = courseId.toString();
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Multiply by the Golden Angle (137.508 degrees)
  // This ensures that even close IDs result in very different hues
  const hue = Math.abs((hash * 137.508) % 360);

  // Keep your preferred subtle aesthetic
  // Suggestion: Bump saturation slightly to 55-60% for better distinction
  const saturation = 60; 
  const lightness = 82;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}