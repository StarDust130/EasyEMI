import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <>
      {" "}
      <BackgroundBeamsWithCollision>
        <div>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            EMI Calculator Project <br /> from  My ROI
          </h1>

          <Link
            href={"/emi-calculator"}
            className="z-10 flex min-h-[16rem] items-center justify-center"
          >
            <Button className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight  dark:to-slate-900/10 lg:text-lg">
                Let's Get Started
              </span>
            </Button>
          </Link>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};
export default page;
