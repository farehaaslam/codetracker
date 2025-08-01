import { useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useDashboardStore } from "../../store/DashboardStore"
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
} from "../ui/chart"

const Yearly = () => {
  const { yearlySubmission, getYearly } = useDashboardStore()

  useEffect(() => {
    getYearly()
  }, [getYearly])

  const chartConfig = {
    count: {
      label: "Submissions",
      color: "var(--chart-1)",
    },
  }

  const chartData = yearlySubmission.map((item) => ({
    ...item,
    count: item.count || 0,
  }))

  return (
    <div className="w-full ">
        <Card className="" >
      <CardHeader>
        <CardTitle>Yearly Submissions</CardTitle>
        <CardDescription>
          Submissions per month (Jan to Dec)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full" >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              bottom: 6,
              top: 6,
            }}
          >
            <CartesianGrid vertical={false} stroke="#3f3f46" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis allowDecimals={false} stroke="#888" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>

    </div>
    
  )
}

export default Yearly
