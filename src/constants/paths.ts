const allPaths = {
  home: { href: "/", label: "Αρχική" },
  products: { href: "/products", label: "Προϊόντα" },
  cart: { href: "/cart", label: "Καλάθι Αγορών" },
  checkout: { href: "/checkout", label: "Ολοκλήρωση παραγγελίας" },
  orders: { href: "/orders", label: "Παραγγελίες" }
};

const excludedPaths = ["cart", "checkout"];

const navbarPaths = Object.fromEntries(Object.entries(allPaths).filter(([key]) => !excludedPaths.includes(key)));

export { allPaths, navbarPaths };
