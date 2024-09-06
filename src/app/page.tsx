import Dashboard from "@/components/elements/Dashboard";
import Header from "@/components/elements/Header";
import Siderbar from "@/components/elements/Siderbar";

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
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
