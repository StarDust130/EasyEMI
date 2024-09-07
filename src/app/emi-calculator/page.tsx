import Header from "@/components/elements/Header";
import Siderbar from "@/components/elements/Siderbar";
import EMICalculator from "@/components/screen/EmiCalculator";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Siderbar />

      <div className="flex flex-col flex-grow">
        <Header />

        <main className="flex-grow overflow-y-auto">
          <EMICalculator />
        </main>
      </div>
    </div>
  );
}
