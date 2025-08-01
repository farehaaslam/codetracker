import React, { useEffect } from 'react'
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { useDashboardStore } from "../../store/DashboardStore.js"

const platformColors = {
  LeetCode: "var(--chart-1)",
  Codeforces: "var(--chart-2)",
  GFG: "var(--chart-3)",
  // Add more platforms if needed
};

const chartConfig = {
  count: {
    label: "Submissions",
    color: "var(--chart-1)",
  }
};

const MonthlyPlatform = () => {
  const { platformCounts, getPlatformCounts } = useDashboardStore();

  useEffect(() => {
    getPlatformCounts();
  }, [getPlatformCounts]);

  return (
    <div className=' w-full rounded-b-lg'>
      <Card>
        <CardHeader>
          <CardTitle>Platform-wise Submissions</CardTitle>
          <CardDescription>This Month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={platformCounts}
              layout="vertical"
              margin={{ left: 40 }}
               height={25} // auto height
            >
              <YAxis
                dataKey="_id" // platform name
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis
                dataKey="count"
                type="number"
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" radius={3} barSize={18}>
                {platformCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={platformColors[entry._id] || "var(--chart-1)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default MonthlyPlatform
