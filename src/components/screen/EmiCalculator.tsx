"use client";
import { useState } from "react";
import { Chart } from "../elements/Chart";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider"; 
import { Input } from "../ui/input";

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

  const emi = calculateEMI();
  const totalPayment = emi * loanTenure;
  const totalInterest = totalPayment - (loanAmount - prepayment);

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
              <Label htmlFor="loanAmount">Loan amount</Label>
              <Slider
                defaultValue={[loanAmount]}
                min={1000}
                max={1000000}
                step={1000}
                onValueChange={(value) => setLoanAmount(value[0])}
              />
            </div>
            <div className="w-full mt-8">
              <Label htmlFor="interestRate">Interest rate</Label>
              <Slider
                defaultValue={[interestRate]}
                min={0}
                max={20}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>
            <div className="w-full mt-8">
              <Label htmlFor="loanTenure">Loan tenure (in months)</Label>
              <Slider
                defaultValue={[loanTenure]}
                min={1}
                max={360}
                step={1}
                onValueChange={(value) => setLoanTenure(value[0])}
              />
            </div>
            <div className="w-full mt-8">
              <Label htmlFor="prepayment">Prepayment (Optional)</Label>
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
            onClick={() => {
              setLoanAmount(50000);
              setInterestRate(7);
              setLoanTenure(12);
              setPrepayment(0);
            }}
          >
            Dowload as PDF
          </Button>

          <Drawer>
            <DrawerTrigger>
              <Button
                variant={"default"}
                className="mt-10 mr-2"
                onClick={() => {
                  setLoanAmount(50000);
                  setInterestRate(7);
                  setLoanTenure(12);
                  setPrepayment(0);
                }}
              >
                View Month wise EMI
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:ml-5 mt-5 md:mt-0">
        <Chart
          emi={emi}
          totalPayment={totalPayment}
          totalInterest={totalInterest}
        />
      </div>
    </div>
  );
};

export default EmiCalculator;
