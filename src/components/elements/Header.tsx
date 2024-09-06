"use client";
import { Bell, Mail, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import ModeToggle from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { usePathname } from "next/navigation";


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

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b">
      {/* Hamburger Menu */}

      <Sheet>
        <SheetTrigger>
          <div className="md:hidden flex  items-center">
            <Menu className="cursor-pointer" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className=" md:hidden w-full border-r h-screen  flex flex-col justify-between">
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
            <Button variant={"ghost"} className="absolute bottom-5 left-5">
              <span className="flex justify-start items-center gap-2 dark:text-white  text-gray-500 hover:bg-secondary hover:text-gray-800">
                {" "}
                <LogOut size={18} /> LogOut
              </span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo Section */}
      <div className="md:hidden flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={30} height={20} />
        <h1 className="text-lg font-bold">Easy EMI</h1>
      </div>

      {/* Search section - Hidden on small screens */}
      <div className="hidden md:flex items-center gap-2 w-80">
        <div className="relative w-full">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            size={16}
          />
          <Input className="pl-8" placeholder="Search..." />
        </div>
      </div>

      {/* Icons and Avatar section */}
      <div className="flex items-center gap-2">
        <ModeToggle />

        <div className="hidden md:flex items-center gap-2">
          <Mail size={18} className="cursor-pointer" />
          <Bell size={18} className="cursor-pointer" />
          <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-4"></div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
