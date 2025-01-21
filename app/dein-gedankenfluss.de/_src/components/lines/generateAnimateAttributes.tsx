export interface GenerateAnimateAttributesConfig {
  duration?: number;
  resolution?: number;
  easingStrength?: number;
  startSpeed?: number;
}

/**
 * Generate a human-like animation for a stroke with varying speeds.
 */
export function generateAnimateAttributes(
  strokeLength: number,
  {
    duration = 3,
    resolution = 2,
    easingStrength = 0.5,
    startSpeed = getVariation(),
  }: GenerateAnimateAttributesConfig = {},
) {
  if (easingStrength > 1) {
    console.warn("easingStrength should be between 0 and 1, defaulting to 1");
    easingStrength = 1;
  }

  const steps = Math.max(Math.ceil((strokeLength / 200) * resolution), 2);
  const values: number[] = [strokeLength];
  const keyTimes: number[] = [0];

  let prevSpeed = startSpeed;
  let currentProgress = strokeLength;
  for (let i = 0; i <= steps; i++) {
    const speed =
      easingStrength * prevSpeed + (1 - easingStrength) * getVariation();
    prevSpeed = speed;

    const stepSize = currentProgress / Math.max(steps - i, 1);
    const step = stepSize * speed;

    currentProgress -= step;
    currentProgress = Math.max(currentProgress, 0);

    keyTimes.push(Math.round((1 / steps) * (i + 1) * 1000) / 1000);
    values.push(Math.round(currentProgress * 1000) / 1000);
  }

  values[values.length - 1] = 0;
  keyTimes[keyTimes.length - 1] = 1;

  return {
    values: values.join(";"),
    keyTimes: keyTimes.join(";"),
    dur: `${duration}s`,
  };
}

function getVariation() {
  return 0.05 + Math.random() * 1.95;
}
