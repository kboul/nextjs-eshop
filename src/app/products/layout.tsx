export default function ProductsLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  console.log("ProductsLayout rendering", { children, modal });
  return (
    <>
      {children}
      {modal}
    </>
  );
}
