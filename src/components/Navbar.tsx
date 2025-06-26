"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const routes = [
  { url: "/", name: "Home" },
  { url: "/products", name: "Products" },
  { url: "/checkout", name: "Checkout" }
];

const Routes = ({ linkClassName = "" }: { linkClassName?: string }) =>
  routes.map(({ url, name }) => (
    <Link className={linkClassName} href={url} key={name}>
      {name}
    </Link>
  ));

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
        <Routes />
      </nav>
    </header>
  );
}
