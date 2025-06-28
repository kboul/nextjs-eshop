import { ProductModalWrapper } from "@/components";
import { stripe } from "@/utils";

type ProductPageProps = { params: { id: string } };

export default async function ProductModal({ params }: ProductPageProps) {
  const { id } = await params;

  const allProductProps = await stripe.products.retrieve(id, {
    expand: ["default_price"]
  });

  console.log(allProductProps);
  const { name, metadata, images, description, default_price } = allProductProps;

  return <ProductModalWrapper product={{ name, metadata, images, description, default_price }} />;
}
