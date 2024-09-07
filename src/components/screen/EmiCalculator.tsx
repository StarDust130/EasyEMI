"use client";
import { useState } from "react";
import { Chart } from "../elements/Chart";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import jsPDF from "jspdf";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const EmiCalculator = () => {
  // State variables
  const [loanAmount, setLoanAmount] = useState(10_000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(10);
  const [prepayment, setPrepayment] = useState(0);
  const [useSlider, setUseSlider] = useState(true);
  const [showMonthWise, setShowMonthWise] = useState(false);


  // EMI Calculation
  const calculateEMI = () => {
    const principal = loanAmount - prepayment;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure;
    if (principal <= 0 || tenure <= 0) return 0;
    const emi =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);
    return emi;
  };

  // Total Payment Calculation
  const emi = calculateEMI();
  const totalPayment = emi * loanTenure;
  const totalInterest = totalPayment - (loanAmount - prepayment);

  // Month wise EMI Calculation
  const getMonthWiseBreakdown = () => {
    let balance = loanAmount;
    const rate = interestRate / 12 / 100;
    let breakdown = [];

    for (let i = 1; i <= loanTenure; i++) {
      let interestPaid = balance * rate;
      let principalPaid = emi - interestPaid;
      balance -= principalPaid;

      breakdown.push({
        month: i,
        emi: emi.toFixed(2),
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        remainingBalance: balance.toFixed(2),
      });
    }
    return breakdown;
  };

  const monthWiseBreakdown = getMonthWiseBreakdown();

  // Download as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Month-wise EMI Breakdown", 10, 10);
    monthWiseBreakdown.forEach((row, index) => {
      doc.text(
        `Month ${row.month}: EMI ${row.emi}, Interest ${row.interestPaid}, Principal ${row.principalPaid}, Remaining Balance ${row.remainingBalance}`,
        10,
        20 + index * 10
      );
    });
    doc.save("EMI_Breakdown.pdf");
  };

  return (
    <div className="py-6 px-10 w-full flex  flex-col-reverse md:flex-row">
      <div className="flex flex-col w-full md:w-1/2 mt-5">
        <h1 className="font-semibold text-xl text-center md:text-start  ">
          See how much you can save <br /> with EasyEMI
        </h1>

        <Badge
          variant="outline"
          className="w-[100px] mt-5 md:mt-2 text-center mx-auto md:mx-0"
        >
          EMI Calculator
        </Badge>

        <div className="mt-5 flex items-center ">
          <Button
            variant={useSlider ? "default" : "outline"}
            className="mr-2"
            onClick={() => setUseSlider(true)}
            size={"sm"}
          >
            Slider
          </Button>
          <Button
            variant={!useSlider ? "default" : "outline"}
            onClick={() => setUseSlider(false)}
            size={"sm"}
          >
            Input
          </Button>
        </div>

        {useSlider ? (
          <>
            <div className="w-full mt-5">
              <Label htmlFor="loanAmount">Loan amount: {loanAmount}</Label>
              <Slider
                defaultValue={[loanAmount]}
                min={1000}
                max={1000000}
                step={1000}
                onValueChange={(value) => setLoanAmount(value[0])}
              />
            </div>
            <div className="w-full mt-8">
              <Label htmlFor="interestRate">
                Interest rate: {interestRate}%
              </Label>
              <Slider
                defaultValue={[interestRate]}
                min={0}
                max={20}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>
            <div className="w-full mt-8">
              <Label htmlFor="loanTenure">
                Loan tenure: {loanTenure} (in months)
              </Label>
              <Slider
                defaultValue={[loanTenure]}
                min={1}
                max={360}
                step={1}
                onValueChange={(value) => setLoanTenure(value[0])}
              />
            </div>
            <div className="w-full mt-8">
              <Label htmlFor="prepayment">
                Prepayment: {prepayment} (Optional)
              </Label>
              <Slider
                defaultValue={[prepayment]}
                min={0}
                max={1000000}
                step={1000}
                onValueChange={(value) => setPrepayment(value[0])}
                title="Prepayment"
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full mt-5">
              <Label htmlFor="loanAmount">Loan amount</Label>
              <Input
                id="loanAmount"
                type="number"
                min="1000"
                max="1000000"
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="interestRate">Interest rate</Label>
              <Input
                id="interestRate"
                type="number"
                min="0"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="loanTenure">Loan tenure (in months)</Label>
              <Input
                id="loanTenure"
                type="number"
                min="1"
                max="360"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
              />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="prepayment">Prepayment (Optional)</Label>
              <Input
                id="prepayment"
                type="number"
                min="0"
                max="1000000"
                step="1000"
                value={prepayment}
                onChange={(e) => setPrepayment(Number(e.target.value))}
              />
            </div>
          </>
        )}

        <div className="flex justify-end items-center w-full">
          <Button
            variant={"outline"}
            className="mt-10 mr-2"
            onClick={downloadPDF}
          >
            Dowload as PDF
          </Button>

          <Button
            variant={"default"}
            className="mt-10 mr-2"
            onClick={() => setShowMonthWise(true)}
          >
            View Month wise EMI
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:ml-5 mt-5 md:mt-0">
        <Chart
          emi={emi}
          totalPayment={totalPayment}
          totalInterest={totalInterest}
        />
      </div>
      {showMonthWise && (
        <div className="w-full md:w-1/2 md:ml-5 mt-5 md:mt-0">
          <Table>
            <TableCaption>Month-wise EMI Breakdown</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>EMI Paid</TableHead>
                <TableHead>Interest Paid</TableHead>
                <TableHead>Principal Paid</TableHead>
                <TableHead>Remaining Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthWiseBreakdown.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.emi}</TableCell>
                  <TableCell>{row.interestPaid}</TableCell>
                  <TableCell>{row.principalPaid}</TableCell>
                  <TableCell>{row.remainingBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant={"outline"}
            className="mt-5"
            onClick={() => setShowMonthWise(false)}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
