import Stripe from "stripe";
import Image from "next/image";
import { Plus } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { productCategories } from "@/constants";
import { getDefaultPrice } from "@/utils";
import { Button } from "./ui/button";

export default function ProductsList({ products }: { products: Stripe.Product[] }) {
  return (
    <div>
      <Accordion type="single" collapsible>
        {productCategories.map(({ englishLabel, greekLabel }) => (
          <AccordionItem value={englishLabel} key={englishLabel}>
            <AccordionTrigger>{greekLabel}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap">
                {products
                  .filter((p) => p.metadata.category === englishLabel)
                  .map((p) => {
                    return (
                      <div className="flex md:w-1/2 w-full py-2 items-center justify-between" key={p.id}>
                        <div className="flex items-center gap-2">
                          <Image
                            alt={p.name}
                            className="transition-opacity duration-500 ease-in-out"
                            objectFit="cover"
                            src={p.images[0]}
                            width={60}
                            height={60}
                          />
                          {p.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-green-600 font-bold">
                            {getDefaultPrice(p.default_price)}
                            <span className="text-xs text-gray-500">/κιλό</span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-full w-8 h-8 p-0 mr-4 cursor-pointer">
                            <Plus className="w-4 h-4" />
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
    </div>
  );
}
