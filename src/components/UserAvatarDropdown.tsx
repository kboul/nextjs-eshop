"use client";

import { LogIn, LogOut } from "lucide-react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { allPaths } from "@/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserInitials = (user: any) => {
  if (!user) return null;
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
};

export default function UserAvatarDropdown() {
  const { signOut, openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleSignIn = () => openSignIn({ afterSignInUrl: allPaths.products.href });

  // Optional: redirect after sign out
  const handleSignOut = () => signOut({ redirectUrl: allPaths.home.href });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
        <Avatar>
          <AvatarFallback className="cursor-pointer">{getUserInitials(user) ?? "AB"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>O Λογαριασμός Μου</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Settings
        </DropdownMenuItem> */}
        {!isSignedIn && (
          <DropdownMenuItem onClick={handleSignIn}>
            <LogIn className="h-4 w-4" /> Σύνδεση
          </DropdownMenuItem>
        )}
        {isSignedIn && (
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Αποσύνδεση
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
