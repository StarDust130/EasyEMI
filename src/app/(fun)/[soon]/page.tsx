import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ComingSoonPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8  rounded-lg shadow-lg">
        <Image
          src="/soon.webp"
          alt="Coming Soon"
          className="mx-auto mb-4 rounded-full border-4 border-yellow-400"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-extrabold mb-2">Coming Soon!</h1>
        <p className="text-xl mb-4">
          If you like it or have any suggestions, please let me know.
        </p>

        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">P.S.: </span>
          <Link href={"https://github.com/StarDust130"}>
            <span className="italic font-bold text-blue-500">
              Hire Chandrashekhar! 😉
            </span>
          </Link>
        </p>
        <Link href="/emi-calculator">
          <Button variant={"outline"}>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;
