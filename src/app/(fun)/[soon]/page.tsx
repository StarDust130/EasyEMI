import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ComingSoonPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Image
          src="/soon.webp"
          alt="Coming Soon"
          className="mx-auto mb-4"
          width={200}
          height={200}
        />
        <h1 className="text-3xl font-bold mb-2">Coming Soon</h1>
        <p className="text-lg">
          We’re working on something awesome. Stay tuned!
        </p>
        <Link href="/">
          <Button> Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;
