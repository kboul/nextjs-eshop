const paths = {
  home: { href: "/", label: "Αρχική" },
  products: { href: "/products", label: "Προϊόντα" },
  cart: { href: "/cart", label: "Καλάθι Αγορών" },
  checkout: { href: "/checkout", label: "Ολοκλήρωση παραγγελίας" }
};

const pathsWitoutCart = Object.fromEntries(Object.entries(paths).filter(([key]) => key !== "cart"));

export { paths, pathsWitoutCart };
