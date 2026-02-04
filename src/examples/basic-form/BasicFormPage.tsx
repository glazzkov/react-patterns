import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";

const basicFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/g,
      "Phone number should have the format +7 (XXX) XXX-XX-XX",
    ),
  message: z.string().min(10, "Message must be at least 10 characters"),
  newsletter: z.boolean().default(false),
});

type BasicFormValues = z.infer<typeof basicFormSchema>;

export const BasicFormPage: FC = () => {
  const form = useForm({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      newsletter: false,
    },
  });

  const onSubmit = (data: BasicFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Basic Form Example</h1>
        <p className="mt-2 text-muted-foreground">
          Simple contact form demonstrating basic validation and error handling
        </p>
      </div>

      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border bg-card p-6"
        render={(Fields) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Fields.Input
                name="firstName"
                label="First Name"
                placeholder="John"
              />
              <Fields.Input
                name="lastName"
                label="Last Name"
                placeholder="Doe"
              />
            </div>

            <Fields.Input
              name="email"
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
            />

            <Fields.PhoneInput
              name="phone"
              label="Phone Number"
              placeholder="+7 (999) 999-9999"
            />

            <Fields.Textarea
              name="message"
              label="Message"
              placeholder="Tell us about your inquiry..."
              rows={4}
            />

            <Fields.Checkbox
              name="newsletter"
              label="Subscribe to newsletter"
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </>
        )}
      />
    </div>
  );
};
