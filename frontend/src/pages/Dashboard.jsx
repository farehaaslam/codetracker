import React from 'react'
import Monthlyana from '@/components/dashboardcomp/Monthlyana'
import MonthlyPlatforn from '@/components/dashboardcomp/MonthlyPlatforn'
import Calendar03 from '@/components/dashboardcomp/Calendercomp'
import Level from '@/components/dashboardcomp/Level'
import Target from '@/components/dashboardcomp/Target'
import Todaysub from '@/components/dashboardcomp/Todaysub'
import Steakstatus from '@/components/dashboardcomp/Steakstatus'
import Yearly from '@/components/dashboardcomp/Yearly'
const Dashboard = () => {
  return (
    <div className="min-h-screen  p-6 mt-[25px] mb-6 ">
      <div className="grid gap-4 max-w-6xl mx-auto h-[80vh] grid-cols-12 auto-rows-auto mb-6">
        
        {/* Monthly Analysis spans full row */}
        

        {/* Row: Today's Attempted, Total Questions, Monthly Questions */}
        <div className=" rounded-lg p-6 flex items-center justify-center col-span-4 bg-card">
          <Target/>
        </div>

        <div className=" rounded-lg p-6 flex items-center justify-center col-span-4 bg-card">
          <Todaysub/>
        </div>

        <div className=" rounded-lg p-6 flex items-center justify-center col-span-4 bg-card">
          <Steakstatus/>
        </div>
        <div className="flex items-center justify-center col-span-12 ">
          <Monthlyana/>
        </div>

        {/* Platform Wise */}
        <div className=" rounded-lg flex items-center justify-center col-span-6 ">
          <MonthlyPlatforn />
        </div>

        {/* Streaks */}
        <div className=" rounded-lg flex items-center justify-center col-span-6 ">
          <Level />
        </div>

        {/* Topic Wise Count */}
        <div className="rounded-lg flex items-center justify-center col-span-12 ">
          <Yearly/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
