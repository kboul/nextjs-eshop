"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn, paths } from "@/utils";

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

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-8">
      <Link href="/">
        <h1 className="text-xl font-bold">My Ecomerce</h1>
      </Link>

      {/* Burger button only visible on mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden">
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
      </nav>
    </header>
  );
}
