"use client";

import Link from "next/link";

const routes = [
  { url: "/", name: "Home" },
  { url: "/products", name: "Products" },
  { url: "/checkout", name: "Checkout" }
];

export function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">My Ecomerce</Link>
      </div>
      <div>
        {routes.map(({ url, name }) => (
          <Link href={url} key={name}>
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
