import Header from "@/components/elements/Header";
import Siderbar from "@/components/elements/Siderbar";
import EMICalculator from "@/components/screen/EmiCalculator";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Siderbar />

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Header at the top */}
        <Header />
        {/* Dashboard in the remaining space */}
        <main className="flex-grow">
          <EMICalculator />
        </main>
      </div>
    </div>
  );
}
