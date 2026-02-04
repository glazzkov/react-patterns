import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";

const advancedFormSchema = z
  .object({
    accountType: z.enum(["personal", "business"], {
      message: "Please select an account type",
    }),
    fullName: z.string().min(2, "Full name is required"),
    companyName: z.string().optional(),
    registrationNumber: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    plan: z.enum(["free", "pro", "enterprise"], {
      message: "Please select a plan",
    }),
    paymentMethod: z
      .enum(["credit-card", "paypal", "bank-transfer"])
      .optional(),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.accountType === "business") {
        return !!data.companyName && data.companyName.length >= 2;
      }
      return true;
    },
    {
      message: "Company name is required for business accounts",
      path: ["companyName"],
    },
  )
  .refine(
    (data) => {
      if (data.plan !== "free") {
        return !!data.paymentMethod;
      }
      return true;
    },
    {
      message: "Payment method is required for paid plans",
      path: ["paymentMethod"],
    },
  )
  .refine(
    (data) => {
      if (data.paymentMethod === "credit-card") {
        return (
          !!data.cardNumber &&
          /^\d{16}$/.test(data.cardNumber.replace(/\s/g, ""))
        );
      }
      return true;
    },
    {
      message: "Valid 16-digit card number is required",
      path: ["cardNumber"],
    },
  )
  .refine(
    (data) => {
      if (data.paymentMethod === "credit-card") {
        return !!data.cardExpiry && /^\d{2}\/\d{2}$/.test(data.cardExpiry);
      }
      return true;
    },
    {
      message: "Valid expiry date is required (MM/YY)",
      path: ["cardExpiry"],
    },
  )
  .refine(
    (data) => {
      if (data.paymentMethod === "credit-card") {
        return !!data.cardCvv && /^\d{3}$/.test(data.cardCvv);
      }
      return true;
    },
    {
      message: "Valid 3-digit CVV is required",
      path: ["cardCvv"],
    },
  );

type AdvancedFormValues = z.infer<typeof advancedFormSchema>;

const ACCOUNT_TYPES = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
];

const PLANS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

const PAYMENT_METHODS = [
  { value: "credit-card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank-transfer", label: "Bank Transfer" },
];

export const AdvancedFormPage: FC = () => {
  const form = useForm({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      registrationNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      agreeToTerms: false,
    },
  });

  const accountType = form.watch("accountType");
  const plan = form.watch("plan");
  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: AdvancedFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Advanced Form Example</h1>
        <p className="mt-2 text-muted-foreground">
          Complex registration form with conditional fields and custom
          validation
        </p>
      </div>

      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border bg-card p-6"
        render={(Fields) => (
          <>
            {/* Account Type Selection */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg font-semibold">
                  Account Information
                </h2>
                <Fields.RadioGroup
                  name="accountType"
                  label="Account Type"
                  items={ACCOUNT_TYPES}
                  extractValue={(item) => item.value}
                  renderValue={(item) => item.label}
                  orientation="horizontal"
                />
              </div>

              {/* Basic Information */}
              <div className="grid gap-4">
                <Fields.Input
                  name="fullName"
                  label="Full Name"
                  placeholder="John Doe"
                />

                {accountType === "business" && (
                  <>
                    <Fields.Input
                      name="companyName"
                      label="Company Name"
                      placeholder="Acme Corporation"
                    />
                    <Fields.Input
                      name="registrationNumber"
                      label="Registration Number (Optional)"
                      placeholder="12345678"
                    />
                  </>
                )}

                <Fields.Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>

              {/* Password Section */}
              <div className="border-t pt-6">
                <h2 className="mb-4 text-lg font-semibold">Security</h2>
                <div className="grid gap-4">
                  <Fields.Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                  />
                  <Fields.Input
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              {/* Plan Selection */}
              <div className="border-t pt-6">
                <h2 className="mb-4 text-lg font-semibold">
                  Subscription Plan
                </h2>
                <Fields.Select
                  name="plan"
                  label="Select Plan"
                  items={PLANS}
                  extractValue={(item) => item.value}
                  renderValue={(item) => item.label}
                  placeholder="Choose a plan"
                />
              </div>

              {/* Payment Method - only for paid plans */}
              {plan && plan !== "free" && (
                <div className="rounded-md bg-muted/50 p-4">
                  <h3 className="mb-3 font-medium">Payment Details</h3>
                  <div className="space-y-4">
                    <Fields.RadioGroup
                      name="paymentMethod"
                      label="Payment Method"
                      items={PAYMENT_METHODS}
                      extractValue={(item) => item.value}
                      renderValue={(item) => item.label}
                    />

                    {paymentMethod === "credit-card" && (
                      <>
                        <Fields.MaskedInput
                          name="cardNumber"
                          label="Card Number"
                          mask="____ ____ ____ ____"
                          replacement={{ _: /\d/ }}
                          placeholder="1234 5678 9012 3456"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Fields.MaskedInput
                            name="cardExpiry"
                            label="Expiry Date"
                            mask="__/__"
                            replacement={{ _: /\d/ }}
                            placeholder="MM/YY"
                          />
                          <Fields.MaskedInput
                            name="cardCvv"
                            label="CVV"
                            mask="___"
                            replacement={{ _: /\d/ }}
                            placeholder="123"
                            inputMode="numeric"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="border-t pt-6">
                <Fields.Checkbox
                  name="agreeToTerms"
                  label="I agree to the terms and conditions and privacy policy"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset Form
              </Button>
              <div className="flex gap-3">
                <Button type="button" variant="secondary">
                  Save Draft
                </Button>
                <Button type="submit">Create Account</Button>
              </div>
            </div>
          </>
        )}
      />

      {/* Form State Debug Info */}
      <div className="mt-6 rounded-lg border bg-muted/50 p-4">
        <h3 className="mb-2 font-medium">Form State (for demo)</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Account Type: {accountType || "Not selected"}</p>
          <p>Plan: {plan || "Not selected"}</p>
          <p>Payment Method: {paymentMethod || "Not selected"}</p>
          <p>Is Valid: {form.formState.isValid ? "Yes" : "No"}</p>
          <p>Is Dirty: {form.formState.isDirty ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};
