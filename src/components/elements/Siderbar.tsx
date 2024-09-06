"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  BarChart,
  CreditCard,
  DollarSign,
  FileText,
  PieChart,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    label: "EMI Calculator",
    icon: <Home size={16} />,
    path: "/emi-calculator",
  },
  { label: "Investments", icon: <BarChart size={16} />, path: "/investments" },
  {
    label: "Credit Cards",
    icon: <CreditCard size={16} />,
    path: "/credit-cards",
  },
  { label: "Loans", icon: <DollarSign size={16} />, path: "/loans" },
  { label: "Reports", icon: <FileText size={16} />, path: "/reports" },
  { label: "Analytics", icon: <PieChart size={16} />, path: "/analytics" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden h-screen w-40 border-r border-gray-500  md:flex flex-col justify-between">
      {/* Logo Section */}
      <div>
        <div className="flex justify-center items-center gap-1 mt-5">
          <Image src="/logo.png" alt="logo" width={30} height={20} />
          <h1 className="text-lg font-bold">Easy EMI</h1>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-8 space-y-3 px-3">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-2 text-xs dark:text-white text-gray-500 hover:bg-secondary hover:text-gray-800 font-semibold rounded-lg py-2 px-3 transition-colors duration-200 ${
                pathname === item.path ? "bg-secondary text-gray-800" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Exit Button */}
      <Button variant="ghost" className="absolute bottom-5 left-5">
        <span className="flex justify-start items-center gap-2 dark:text-white text-gray-500 hover:bg-secondary hover:text-gray-800">
          <LogOut size={18} /> LogOut
        </span>
      </Button>
    </div>
  );
};

export default Sidebar;
