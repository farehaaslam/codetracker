import React, { useEffect } from 'react'
import { useDashboardStore } from '../../store/DashboardStore'
const Todaysub = () => {
    const {todaySubmission,getTodaySubmission,currentTarget}=useDashboardStore();
    
    useEffect(()=>{
        getTodaySubmission();
    },[getTodaySubmission])
    const todaycount=todaySubmission.length
    const isTargetMet = todaycount >= currentTarget;
    const per=(todaycount / currentTarget) * 100;
    const progressPercentage = per>100?100:per
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-7'>
        
              <div className="flex justify-between  font-semibold w-full  ">
                <span className="text-lg">Today's Progress</span>
                <span className="text-lg font-medium">
                  {todaycount}/{currentTarget}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isTargetMet ? "bg-green-500" : "bg-primary"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {isTargetMet && (
                <p className="text-xs text-green-600 text-center font-medium">
                  🎉 Target achieved! Keep your streak alive!
                </p>
              )}
            </div>
    
  )
}

export default Todaysub