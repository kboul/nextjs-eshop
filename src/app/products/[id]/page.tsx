import { stripe } from "@/utils";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"]
  });

  console.log(product);
  return <div>page</div>;
}
