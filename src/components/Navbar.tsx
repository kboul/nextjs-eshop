"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn, paths } from "@/utils";
import { useCartStore } from "@/store";

const routes = Object.values(paths);

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
    <Link href={paths.checkout.href} className="relative">
      <ShoppingCart size={20} />
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
  const { items } = useCartStore();

  const cartCount = items.reduce((prevValue, currentItem) => prevValue + currentItem.quantity, 0);

  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-8">
      <Link href="/">
        <h1 className="text-xl font-bold">My Ecomerce</h1>
      </Link>

      {/* Burger button only visible on mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden flex gap-5">
            <ShoppingCartIcon cartCount={cartCount} />
            <Menu size={24} className="cursor-pointer" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="m-4 flex flex-col space-y-4">
            <Routes linkClassName="text-lg" />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop nav */}
      <nav className="hidden space-x-6 md:flex">
        <Routes linkClassName="hover:underline" />
        <div className="flex items-center space-x-4">
          <ShoppingCartIcon cartCount={cartCount} />
        </div>
      </nav>
    </header>
  );
}
