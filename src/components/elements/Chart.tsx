"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { BarChart, Wallet, IndianRupee, Landmark } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  prepayment?: number;
}

const chartConfig = {
  emi: {
    label: "EMI",
    color: "hsl(var(--chart-1))",
  },
  totalPayment: {
    label: "Total Payment",
    color: "hsl(var(--chart-2))",
  },
  totalInterest: {
    label: "Total Interest",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function Chart({
  emi,
  totalPayment,
  totalInterest,
  prepayment = 0,
}: ChartProps) {
  const chartData = [
    { name: "EMI", value: emi, fill: chartConfig.emi.color },
    {
      name: "Total Payment",
      value: totalPayment,
      fill: chartConfig.totalPayment.color,
    },
    {
      name: "Total Interest",
      value: totalInterest,
      fill: chartConfig.totalInterest.color,
    },
  ];

  return (
    <div className="flex justify-evenly items-center flex-col h-full">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>EMI Breakdown</CardTitle>
          <CardDescription>
            Visualizing EMI, Total Payment, and Total Interest
          </CardDescription>
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
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartData
                              .reduce((acc, curr) => acc + curr.value, 0)
                              .toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing EMI Breakdown
          </div>
        </CardFooter>
      </Card>

      <div className="md:p-6 rounded-lg  w-[80%] grid grid-cols-2 gap-4">
        <div className="flex items-center mb-4">
          <Landmark size={30} className="text-green-500  mr-3" />
          <div>
            <h3 className="text-sm font-medium">EMI</h3>
            <p className="text-lg font-bold">₹{emi.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Wallet size={30} className="text-blue-500  mr-3" />
          <div>
            <h3 className="text-sm font-medium">Total Payment</h3>
            <p className="text-lg font-bold">₹{totalPayment.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <BarChart size={30} className="text-orange-500  mr-3" />
          <div>
            <h3 className="text-sm font-medium">Total Interest</h3>
            <p className="text-lg font-bold">₹{totalInterest.toFixed(2)}</p>
          </div>
        </div>

        {prepayment !== undefined && (
          <div className="flex items-center mb-4">
            <IndianRupee size={30} className="text-red-500  mr-3" />
            <div>
              <h3 className="text-sm font-medium">Prepayment</h3>
              <p className="text-xl font-bold">₹{prepayment.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
