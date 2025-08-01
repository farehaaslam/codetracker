import React, { useEffect } from 'react'
import { Flame } from 'lucide-react'
import { useDashboardStore } from '../../store/DashboardStore'
const Steakstatus = () => {
    const {todaySubmission,getTodaySubmission}=useDashboardStore();
    useEffect(()=>{
        getTodaySubmission();
    },[getTodaySubmission])
    const streak=todaySubmission.length
     function getStreakMessage(streak) {
        if (streak === 0) return "Start your streak today!"
        if (streak === 1) return "Great start! Keep it going!"
        if (streak < 7) return `${streak} days strong! 💪`
        if (streak < 30) return `Amazing ${streak}-day streak! 🔥`
        if (streak < 100) return `Incredible ${streak}-day streak! 🚀`
        return `Legendary ${streak}-day streak! 👑`
      }
     
  return (
    <div className='h-full w-full flex flex-col items-center justify-center '>
    <div
    className="flex items-center justify-center gap-1 p-3 rounded-lg  bg-card"
  >
    <div className='text-3xl'>🔥</div>
    <div className="text-center flex  flex-col gap-2">
      <p className={`text-5xl font-bold text-red-500`}>{streak}</p>
      <p className="text-xs  ">day streak</p>
    </div>
    {streak > 0 && (
      <div className="text-3xl">{streak >= 100 ? "👑" : streak >= 30 ? "🚀" : streak >= 7 ? "🔥" : "💪"}</div>
    )}
  </div>

  {/* Streak Message */}
  <p className="text-xs text-center">{getStreakMessage(streak)}</p>
  </div>
  )
}

export default Steakstatus