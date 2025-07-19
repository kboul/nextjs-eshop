"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Note: next/navigation for App Router
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formSchema } from "./form";
import { useCartStore } from "@/store";
import { allPaths } from "@/constants";

export function SaveOrder() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const { products, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const res = await fetch("/api/saveOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, products })
      });

      const data = await res.json();
      if (!res.ok) return toast.error("Υπήρξε κάποιο πρόβλημα στη καταχωρήση της παραγγελίας.");

      if (data.quoteId) {
        toast.success(`Παραγγελία δημιουργήθηκε και καταχωρήθηκε με id: ${data.quoteId}`);
        clearCart();
        router.push(allPaths.products.href);
      }
    } catch (error) {
      console.error("Form submission error", error);
      if (error) toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <h1 className="text-xl mb-6">{allPaths.checkout.label}</h1>
        <Link
          href={allPaths.cart.href}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Πίσω στο {allPaths.cart.label}
        </Link>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Όνομα</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Επώνυμο</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="tin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ΑΦΜ</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Τηλέφωνο</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Όνομα Καταστήματος</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Οδός</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button disabled={loading || !products.length || !isSignedIn} type="submit">
          {loading ? "Αποθήκευση Παραγγελίας..." : "Αποστολή Παραγγελίας"}
        </Button>

        {!isSignedIn && (
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertDescription>Παρακαλώ συνδεθείτε πριν ολοκληρώσετε την παραγγελία</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
