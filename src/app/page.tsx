import { Button } from "@/components/ui/button";

import { paths, stripe } from "@/utils";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5
  });

  console.log(products);

  return (
    <div>
      <section>
        <div>
          <h2>Καλωσήρθατε στο ηλεκτρονικό κατάστημα μας!</h2>
          <p>Ανακαλύψτε τελευταία προιόντα στις καλύτερες τιμές!</p>
          <Button asChild className="mt-2">
            <Link href={paths.products.href}>Δείτε όλα τα προϊόντα</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
