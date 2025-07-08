import Link from "next/link";

import { Button } from "@/components/ui/button";
import { allPaths } from "@/constants";

export default async function HomePage() {
  return (
    <section>
      <h2>Καλωσήρθατε στο ηλεκτρονικό κατάστημα μας!</h2>
      <p>Ανακαλύψτε τελευταία προιόντα στις καλύτερες τιμές!</p>
      <Button asChild className="mt-2">
        <Link href={allPaths.products.href}>Δείτε όλα τα προϊόντα</Link>
      </Button>
    </section>
  );
}
