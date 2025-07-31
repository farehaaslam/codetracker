import React from 'react'
import Monthlyana from '@/components/dashboardcomp/Monthlyana'
import MonthlyPlatforn from '@/components/dashboardcomp/MonthlyPlatforn'
import Calendar03 from '@/components/dashboardcomp/Calendercomp'
const Dashboard = () => {
  return (
    <div className="min-h-screen  p-6 mt-[100px] ">
      <div className="grid gap-4 max-w-6xl mx-auto h-[80vh] grid-cols-12 auto-rows-auto">
        
        {/* Monthly Analysis spans full row */}
        

        {/* Row: Today's Attempted, Total Questions, Monthly Questions */}
        <div className="bg-green-600 rounded-lg p-6 flex items-center justify-center col-span-4">
          <div className="text-center text-white">
            <h3 className="text-lg font-semibold">Today's Attempted</h3>
            <p className="text-2xl font-bold">3/5</p>
          </div>
        </div>

        <div className="bg-purple-600 rounded-lg p-6 flex items-center justify-center col-span-4">
          <div className="text-center text-white">
            <h3 className="text-lg font-semibold">Total Questions</h3>
            <p className="text-sm">Done Till Now</p>
          </div>
        </div>

        <div className="bg-orange-600 rounded-lg p-6 flex items-center justify-center col-span-4">
          <div className="text-center text-white">
            <h3 className="text-lg font-semibold">Monthly Questions</h3>
            <p className="text-sm">Done</p>
          </div>
        </div>
        <div className="flex items-center justify-center col-span-12 ">
          <Monthlyana/>
        </div>

        {/* Platform Wise */}
        <div className=" rounded-lg flex items-center justify-center col-span-6">
          <MonthlyPlatforn />
        </div>

        {/* Streaks */}
        <div className=" rounded-lg flex items-center justify-center col-span-6">
          <Calendar03 />
        </div>

        {/* Topic Wise Count */}
        <div className="bg-indigo-600 rounded-lg p-6 flex items-center justify-center col-span-12">
          <h2 className="text-white text-xl font-semibold">Topic Wise Count</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
