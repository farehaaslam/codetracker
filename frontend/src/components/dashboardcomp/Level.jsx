import React from 'react'
import { useEffect, useState,useMemo } from "react";
import { Pie, PieChart,Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import { useDashboardStore } from "../../store/DashboardStore.js" 
const difficultyColors = {
  Easy: "indigo",
  Medium: "yellow",
  Hard: "blue",
  Unknown: "var(--chart-1)" // for _id: ""
};

const chartConfig = {
  count: {
    label: "Submissions",
    color: "var(--chart-1)",
  },
};

const Level = () => {
    const { getlevelCounts, levelCounts, isLoading } = useDashboardStore();
     useEffect(() => {
        const fetchData = async () => {
            await getlevelCounts();
        };
    
        fetchData();
    }, [getlevelCounts]);
    console.log(levelCounts)
  return (
    <div className='h-full w-full flex items-center justify-center'>
         <Card className="flex flex-col h-full w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Level wise </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={levelCounts} dataKey="count" nameKey="_id" >
                {levelCounts.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={difficultyColors[entry._id] || "brown"}
                    />
                ))}
                </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default Level