import { Chart } from "../elements/Chart";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

const EmiCalculator = () => {
  return (
    <div className="py-6 px-10 w-full">
      <Badge variant="outline">EMI Calculator</Badge>

      <div className="flex justify-around items-center w-full">
        <div className="flex flex-col mt-5">
          <h1 className="font-semibold text-2xl">
            See how much you can save <br /> with EasyEMI
          </h1>

          <div className="w-full mt-5">
            <Label htmlFor="email">Loan amount</Label>

            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="email">Interest rate</Label>

            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="email">Loan tenure (in months/years)</Label>

            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="email">Prepayment(Optional)</Label>

            <Slider defaultValue={[33]} max={100} step={1} />
          </div>

          <div className="flex justify-end items-center w-full">
            <Button variant={"outline"} className="mt-10 mr-2">
              Rest{" "}
            </Button>
            <Button className="mt-10">Calaulate </Button>
          </div>
        </div>
        <div className="w-1/2">
          <Chart />
        </div>
      </div>
    </div>
  );
};
export default EmiCalculator;
