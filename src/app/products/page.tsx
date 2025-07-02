import ProductsList from "@/components/ProductsList";
import { stripe } from "@/utils";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"]
  });

  return (
    <>
      <h1 className="mb-2">Ολα τα προϊόντα</h1>
      <ProductsList products={products.data} />
    </>
  );
}
