"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { productCategories } from "@/constants";
import { getDefaultPrice, paths } from "@/utils";

type ProductsListProps = { products: Stripe.Product[] };

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <Accordion type="single" collapsible>
      {productCategories.map(({ englishLabel, greekLabel }) => (
        <AccordionItem value={englishLabel} key={englishLabel}>
          <AccordionTrigger>{greekLabel}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap">
              {products
                .filter((product) => product.metadata.category === englishLabel)
                .map((product) => {
                  return (
                    <div className="flex md:w-1/2 w-full py-2 items-center justify-between" key={product.id}>
                      <div className="flex items-center gap-2">
                        <Image
                          alt={product.name}
                          className="transition-opacity duration-500 ease-in-out"
                          src={product.images[0]}
                          width={60}
                          height={60}
                        />
                        {product.name}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="font-bold">
                          {getDefaultPrice(product.default_price).priceWithCurrency}
                          <span className="text-xs text-gray-500">/κιλό</span>
                        </div>
                        <Button
                          size="sm"
                          className="text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-full w-8 h-8 p-0 mr-4">
                          <Link href={paths.products.href + `/${product.id}`} scroll={false}>
                            <Plus className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
