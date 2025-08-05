export function calculateStreaks(submissions) {
  let currentStreak = 0;
  let longestStreak = 0;

  // ✅ Step 1: Collect all unique submission dates
  const dateStrings = new Set(
    submissions.map((s) => new Date(s.createdAt).toDateString())
  );

  // ✅ Step 2: Convert to sorted list of Date objects
  const sortedDates = Array.from(dateStrings)
    .map((d) => new Date(d))
    .sort((a, b) => a - b);

  // ✅ Step 3: Calculate longest streak
  let streak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];
    const diff = (curr - prev) / (1000 * 60 * 60 * 24); // in days

    if (diff === 1) {
      streak++;
    } else {
      streak = 1;
    }

    if (streak > longestStreak) {
      longestStreak = streak;
    }
  }

  // ✅ Step 4: Calculate current streak ending at the last submission
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastSubmission = sortedDates[sortedDates.length - 1];
  const gap = (today - lastSubmission) / (1000 * 60 * 60 * 24);

  // If user submitted today or yesterday, count back streak
  if (gap <= 1) {
    let tempStreak = 1;
    let ptr = new Date(lastSubmission);

    while (dateStrings.has(ptr.toDateString())) {
      ptr.setDate(ptr.getDate() - 1);
      if (dateStrings.has(ptr.toDateString())) {
        tempStreak++;
      } else {
        break;
      }
    }

    currentStreak = tempStreak;
  } else {
    currentStreak = 0;
  }

  return { currentStreak, longestStreak };
}
