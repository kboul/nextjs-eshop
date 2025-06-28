import Link from "next/link";

import { Button } from "@/components/ui/button";
import { paths } from "@/utils";

export default async function Home() {
  return (
    <section>
      <h2>Καλωσήρθατε στο ηλεκτρονικό κατάστημα μας!</h2>
      <p>Ανακαλύψτε τελευταία προιόντα στις καλύτερες τιμές!</p>
      <Button asChild className="mt-2">
        <Link href={paths.products.href}>Δείτε όλα τα προϊόντα</Link>
      </Button>
    </section>
  );
}
