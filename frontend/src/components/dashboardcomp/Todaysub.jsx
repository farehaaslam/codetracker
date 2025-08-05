import React, { useEffect } from 'react';
import { useDashboardStore } from '../../store/DashboardStore'; // Adjust path if needed

const Todaysub = () => {
  const { todaySubmission, getTodaySubmission, currentTarget, getTarget, isLoading } = useDashboardStore();

  useEffect(() => {
    getTarget(); // Fetch target on mount
    getTodaySubmission(); // Fetch submission count on mount
  }, [getTarget, getTodaySubmission]);
  const isTargetMet = todaySubmission >= currentTarget;
  const progressPercentage = currentTarget > 0 
    ? Math.min((todaySubmission / currentTarget) * 100, 100) 
    : 0; // Avoid division by zero

  if (isLoading) {
    return <div className="h-full w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-7">
      <div className="flex justify-between font-semibold w-full">
        <span className="text-lg">Today's Progress</span>
        <span className="text-lg font-medium">
          {todaySubmission}/{currentTarget}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2"> {/* Light background */}
        <div
          className={`h-2 rounded-full transition-all duration-300 ${isTargetMet ? "bg-green-500" : "bg-blue-500"}`} // Blue for progress, green for met
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {isTargetMet && (
        <p className="text-xs text-green-600 text-center font-medium">
          🎉 Target achieved! Keep your streak alive!
        </p>
      )}
    </div>
  );
};

export default Todaysub;
