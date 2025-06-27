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
                          <div className="text-[rgb(79,108,40)] font-bold">{getDefaultPrice(p.default_price)}/κιλό</div>
                          <Button className="mr-2">
                            <Plus />
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
