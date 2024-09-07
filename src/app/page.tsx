import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Cover } from "@/components/ui/cover";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";

const page = () => {
  return (
    <>
      {" "}
      <BackgroundBeamsWithCollision>
        <div>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            EMI Calculator Project <br /> from <Cover>MyROI</Cover>
          </h1>

          <Link
            href={"/emi-calculator"}
            className="z-10 flex min-h-[16rem] items-center justify-center"
          >
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Let's Get Started
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};
export default page;
