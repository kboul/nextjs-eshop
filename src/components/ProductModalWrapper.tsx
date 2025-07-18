"use client";

import { redirect, usePathname } from "next/navigation";
import Stripe from "stripe";

import ProductDetail from "./ProductDetail";
import { ResponsiveDialog } from "./ui/responsive-dialog";
import { allPaths } from "@/constants";

type ProductModalWrapperProps = { product: Stripe.Product };

export function ProductModalWrapper({ product }: ProductModalWrapperProps) {
  const pathname = usePathname();

  // Check if pathname matches /products/[id]
  const match = pathname?.match(/^\/products\/\w+$/);
  const open = Boolean(match);

  return (
    <ResponsiveDialog onXClick={() => redirect(allPaths.products.href)} open={open} title={product.name ?? ""}>
      <ProductDetail product={product} />
    </ResponsiveDialog>
  );
}
