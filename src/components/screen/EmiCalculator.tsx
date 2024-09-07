"use client";
import { useEffect, useState } from "react";
import { Chart } from "../elements/Chart";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const EmiCalculator = () => {
  // State variables
  const [loanAmount, setLoanAmount] = useState(10_000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(10);
  const [prepayment, setPrepayment] = useState(0);
  const [useSlider, setUseSlider] = useState(true);
  const [showMonthWise, setShowMonthWise] = useState(false);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  // EMI Calculation Logic
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

  // useEffect for showing loan errors
  useEffect(() => {
    if (loanAmount - prepayment <= 0 || loanTenure <= 0) {
      setError(true);
      toast({
        title: "Error: Invalid Loan Details 😿",
        description:
          "Loan amount and tenure must be greater than prepaid amount and not zero. Please adjust the loan details.",
        variant: "destructive",
      });
    } else {
      setError(false); // Reset error if values are valid
    }
  }, [loanAmount, prepayment, loanTenure, toast]);

  // useEffect for showing month-wise breakdown
  useEffect(() => {
    if (showMonthWise) {
      toast({
        title: "EMI Breakdown",
        description: "Displaying month-wise EMI breakdown.",
      });
    }
  }, [showMonthWise, toast]);

  // useEffect for slider/input mode change
  useEffect(() => {
    useSlider
      ? toast({
          title: "Slider Mode Activated",
          description: "Use the sliders to adjust the loan details.",
        })
      : toast({
          title: "Input Mode Activated",
          description: "You can now manually input the loan details.",
        });
  }, [useSlider, toast]);

  // Total Payment Calculation
  const emi = calculateEMI();
  const totalPayment = emi * loanTenure;
  const totalInterest = totalPayment - (loanAmount - prepayment);

  // Month wise EMI Calculation
  const getMonthWiseBreakdown = () => {
    let balance = loanAmount;
    const rate = interestRate / 12 / 100;
    const breakdown = [];

    for (let i = 1; i <= loanTenure; i++) {
      const interestPaid = balance * rate;
      const principalPaid = emi - interestPaid;
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
    const documentDefinition = {
      content: [
        { text: "Month-wise EMI Breakdown", style: "header" },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*"],
            body: [
              [
                "Month",
                "EMI Paid",
                "Interest Paid",
                "Principal Paid",
                "Remaining Balance",
              ],
              ...monthWiseBreakdown.map((row) => [
                row.month,
                row.emi,
                row.interestPaid,
                row.principalPaid,
                row.remainingBalance,
              ]),
            ],
          },
          layout: "lightHorizontalLines",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number],
        },
        tableExample: {
          margin: [0, 5, 0, 15] as [number, number, number, number],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("EMI_Breakdown.pdf");
  };

  return (
    <>
      <div className="py-6 px-10 w-full flex  flex-col-reverse md:flex-row">
        <div className="flex flex-col w-full md:w-1/2 mt-5">
          <h1 className="font-semibold text-2xl text-center md:text-start  ">
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
                <Label htmlFor="loanAmount" className=" my-5 py-5">
                  Loan amount: {loanAmount}
                </Label>
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
                  Loan tenure: {loanTenure} (in months){" "}
                  {(loanTenure / 12).toFixed(2)} years
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
                <Label htmlFor="loanTenure">
                  Loan tenure (in months) {(loanTenure / 12).toFixed(2)} years
                </Label>
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
              className={`mt-10 mr-2 ${
                error ? "disabled:opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={error}
              onClick={downloadPDF}
            >
              Dowload as PDF
            </Button>

            <Button
              variant={"default"}
              className={`mt-10 mr-2 ${
                error ? "disabled:opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={error}
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
            prepayment={prepayment}
          />
        </div>
        {showMonthWise && (
          <div className="fixed inset-0 bg-black text-white  flex flex-col p-6 z-50">
            <div className="overflow-x-auto flex-1 rounded-lg shadow-lg">
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
            </div>
            <Button
              variant={"outline"}
              className="mt-4 self-end text-black dark:text-white"
              onClick={() => setShowMonthWise(false)}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default EmiCalculator;
