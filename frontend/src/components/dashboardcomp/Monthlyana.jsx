import React, { use } from 'react'
import { useEffect, useState,useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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

const Monthlyana = () => {
    const { monthlycounts, getMonthlyCounts, isLoading } = useDashboardStore();
    
    useEffect(() => {
    const fetchData = async () => {
        await getMonthlyCounts();
    };

    fetchData();
}, [getMonthlyCounts]);

        console.log(monthlycounts); // Note: this might still be stale
const chartConfig = {
  count: {
    label: "Submissions",
    color: "var(--chart-1)",
  }
};
  

const total = useMemo(() => {
  return monthlycounts.reduce((acc, curr) => acc + curr.count, 0);
}, [monthlycounts]);


  return (
    <div className=' text-3xl text-black h-full w-full rounded-b-lg'>
        <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Monthly analysis</CardTitle>
           <CardDescription className="hidden sm:block">
          Monthly submission counts
        </CardDescription>
          
        </div>
       
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={monthlycounts}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
           <Bar dataKey="count" fill="var(--chart-1)" />

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>

        
    </div>
  )
}

export default Monthlyana