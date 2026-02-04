import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";

const customLayoutFormSchema = z.object({
  streetAddress: z.string().min(5, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(1, "Country is required"),
  billingAddress: z.boolean().default(false),
  billingStreetAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  deliveryInstructions: z.string().optional(),
});

type CustomLayoutFormValues = z.infer<typeof customLayoutFormSchema>;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
];

export const CustomLayoutFormPage: FC = () => {
  const form = useForm({
    resolver: zodResolver(customLayoutFormSchema),
    defaultValues: {
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      billingAddress: false,
      billingStreetAddress: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      deliveryInstructions: "",
    },
  });

  const onSubmit = (data: CustomLayoutFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Custom Layout Form</h1>
        <p className="mt-2 text-muted-foreground">
          Shipping address form demonstrating flexible layout capabilities
        </p>
      </div>

      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border bg-card p-6"
        render={(Fields) => (
          <>
            <div className="space-y-6">
              {/* Shipping Address Section */}
              <div>
                <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>

                <div className="grid gap-4">
                  <Fields.Input
                    name="streetAddress"
                    label="Street Address"
                    placeholder="123 Main St"
                  />

                  <div className="grid grid-cols-3 gap-4 items-start">
                    <Fields.Input
                      name="apartment"
                      label="Apt/Suite (Optional)"
                      placeholder="Apt 4B"
                      containerClassName="col-span-1"
                    />
                    <Fields.Input
                      name="city"
                      label="City"
                      placeholder="New York"
                      containerClassName="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Fields.Input name="state" label="State" placeholder="NY" />
                    <Fields.MaskedInput
                      name="zipCode"
                      label="ZIP Code"
                      mask="_____-____"
                      replacement={{ _: /\d/ }}
                      placeholder="10001"
                      separate
                    />
                    <Fields.Select
                      name="country"
                      label="Country"
                      items={COUNTRIES}
                      placeholder="Select country"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address Section */}
              <div className="border-t pt-6">
                <Fields.Checkbox
                  name="billingAddress"
                  label="Billing address is different from shipping address"
                />
              </div>

              {/* Delivery Instructions */}
              <div className="border-t pt-6">
                <Fields.Textarea
                  name="deliveryInstructions"
                  label="Delivery Instructions (Optional)"
                  placeholder="Leave at front door, ring doorbell twice, etc."
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit">Continue to Payment</Button>
            </div>
          </>
        )}
      />
    </div>
  );
};
