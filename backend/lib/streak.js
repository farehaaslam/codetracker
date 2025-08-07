export function calculateStreaks(submissions) {
  let currentStreak = 0;
  let longestStreak = 0;

  const IST_OFFSET_MINUTES = 330; // UTC+5:30

  // Step 1: Normalize each submission date to IST midnight
  const dateStrings = new Set(
    submissions.map((s) => {
      const utcDate = new Date(s.createdAt);
      const istDate = new Date(utcDate.getTime() + IST_OFFSET_MINUTES * 60 * 1000);
      istDate.setHours(0, 0, 0, 0); // Set to IST midnight
      return istDate.toISOString(); // Store as ISO to compare reliably
    })
  );

  // Step 2: Convert back to sorted list of Date objects
  const sortedDates = Array.from(dateStrings)
    .map((d) => new Date(d))
    .sort((a, b) => a - b);

  // Step 3: Calculate longest streak
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

  // Step 4: Calculate current streak ending at IST "today"
  const now = new Date();
  const istNow = new Date(now.getTime() + IST_OFFSET_MINUTES * 60 * 1000);
  istNow.setHours(0, 0, 0, 0);

  const lastSubmission = sortedDates[sortedDates.length - 1];
  const gap = (istNow - lastSubmission) / (1000 * 60 * 60 * 24);

  if (gap <= 1) {
    let tempStreak = 1;
    let ptr = new Date(lastSubmission);
    for (;;) {
      ptr.setDate(ptr.getDate() - 1);
      if (dateStrings.has(ptr.toISOString())) {
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
