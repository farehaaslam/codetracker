function calculateStreaks(submissions) {
    let currentStreak = 0;
    let longestStreak = 0;
    let streak = 0;
  
    const datesSet = new Set(
      submissions.map((s) => new Date(s.createdAt).toDateString())
    );
  
    const sortedDates = Array.from(datesSet).sort(
      (a, b) => new Date(a) - new Date(b)
    );
  
    let prevDate = null;
  
    for (let dateStr of sortedDates) {
      const currDate = new Date(dateStr);
  
      if (!prevDate) {
        streak = 1;
      } else {
        const diff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
        } else if (diff > 1) {
          streak = 1;
        }
      }
  
      if (streak > longestStreak) longestStreak = streak;
      prevDate = new Date(dateStr);
    }
  
    // Calculate current streak ending today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    let tempStreak = 0;
    let pointer = new Date(today);
  
    while (datesSet.has(pointer.toDateString())) {
      tempStreak++;
      pointer.setDate(pointer.getDate() - 1);
    }
  
    currentStreak = tempStreak;
  
    return { currentStreak, longestStreak };
  }
  export default calculateStreaks;