"use client";
import { useState, useMemo } from "react";
import { Chart } from "../elements/Chart";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

const EmiCalculator = () => {
  // State variables
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(7);
  const [loanTenure, setLoanTenure] = useState(12);
  const [prepayment, setPrepayment] = useState(0);

  // EMI Calculation
  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi;
  };

  const emi = calculateEMI(loanAmount, interestRate, loanTenure);
  const totalPayment = emi * loanTenure;
  const totalInterest = totalPayment - loanAmount;

  // Generate chart data
  const chartData = useMemo(() => {
    // Example data - replace with real data based on calculations
    return [
      { name: "EMI", value: emi, fill: "#8884d8" },
      { name: "Interest", value: totalInterest, fill: "#82ca9d" },
      { name: "Principal", value: loanAmount, fill: "#ffc658" },
    ];
  }, [emi, totalInterest, loanAmount]);

  return (
    <div className="py-6 px-10 w-full">
      <Badge variant="outline">EMI Calculator</Badge>

      <div className="flex justify-around items-center w-full">
        <div className="flex flex-col mt-5">
          <h1 className="font-semibold text-2xl">
            See how much you can save <br /> with EasyEMI
          </h1>

          <div className="w-full mt-5">
            <Label htmlFor="loanAmount">Loan amount</Label>
            <Slider
              defaultValue={[loanAmount]}
              min={1000}
              max={1000000}
              step={1000}
              onValueChange={(value) => setLoanAmount(value[0])}
            />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="interestRate">Interest rate</Label>
            <Slider
              defaultValue={[interestRate]}
              min={0}
              max={20}
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0])}
            />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="loanTenure">Loan tenure (in months)</Label>
            <Slider
              defaultValue={[loanTenure]}
              min={1}
              max={360}
              step={1}
              onValueChange={(value) => setLoanTenure(value[0])}
            />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="prepayment">Prepayment (Optional)</Label>
            <Slider
              defaultValue={[prepayment]}
              min={0}
              max={1000000}
              step={1000}
              onValueChange={(value) => setPrepayment(value[0])}
            />
          </div>

          <div className="flex justify-end items-center w-full">
            <Button
              variant={"outline"}
              className="mt-10 mr-2"
              onClick={() => {
                setLoanAmount(50000);
                setInterestRate(7);
                setLoanTenure(12);
                setPrepayment(0);
              }}
            >
              Reset
            </Button>
            <Button
              className="mt-10"
              onClick={() => {
                // Calculate results and update state
              }}
            >
              Calculate
            </Button>
          </div>
        </div>
        <div className="w-1/2">
          <Chart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
