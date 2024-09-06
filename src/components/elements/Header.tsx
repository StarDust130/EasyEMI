import { Bell, Mail, Search } from "lucide-react";
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

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-3 border-b">
      {/* Search section */}
      <div className="flex items-center gap-2 w-80">
        <div className="relative w-full">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 "
            size={16}
          />
          <Input className="pl-8" placeholder="Search..." />
        </div>
      </div>

      {/* Icons and Avatar section */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        <Mail size={18} className="cursor-pointer " />

        <Bell size={18} className="cursor-pointer" />

        <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-4"></div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
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
