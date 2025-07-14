"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { useCartStore } from "@/store";
import { cn } from "@/utils";
import { appName, allPaths, navbarPaths } from "@/constants";

const routes = Object.values(navbarPaths);

const Routes = ({ linkClassName }: { linkClassName: string }) => {
  const pathname = usePathname();

  return routes.map(({ href, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        className={cn(
          "text-base transition-colors",
          linkClassName,
          isActive ? "font-bold text-foreground" : "text-muted-foreground"
        )}
        href={href}
        key={label}>
        {label}
      </Link>
    );
  });
};

function ShoppingCartIcon({ cartCount }: { cartCount: number }) {
  return (
    <Link href={allPaths.cart.href} className="relative">
      <ShoppingCart className="mr-3" size={20} />
      {cartCount > 0 && (
        <span className="absolute md:bottom-2 bottom-3 left-3">
          <Badge
            className="md:h-5 md:min-w-5 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
            variant="destructive">
            {cartCount}
          </Badge>
        </span>
      )}
    </Link>
  );
}

export function Navbar() {
  const { products } = useCartStore();

  const cartCount = products.reduce((prevValue, currentItem) => prevValue + currentItem.quantity, 0);

  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-8">
      <Link href="/">
        <h1 className="text-xl font-bold">{appName}</h1>
      </Link>

      {/* Burger button only visible on mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="md:hidden flex gap-6 items-center">
            <ShoppingCartIcon cartCount={cartCount} />
            <UserAvatarDropdown />
            <Menu size={24} className="cursor-pointer" />
          </div>
        </SheetTrigger>

        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Μενού</SheetTitle>
          </SheetHeader>
          <nav className="m-4 flex flex-col space-y-4">
            <Routes linkClassName="text-lg" />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop nav */}
      <nav className="hidden md:flex">
        <div className="flex items-center space-x-6">
          <Routes linkClassName="hover:underline" />
          <ShoppingCartIcon cartCount={cartCount} />
          <UserAvatarDropdown />
        </div>
      </nav>
    </header>
  );
}
