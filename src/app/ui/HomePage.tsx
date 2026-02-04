import { FC } from 'react';
import { Link } from 'react-router';

export const HomePage: FC = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold">React Form Patterns</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A collection of form examples demonstrating flexible, type-safe, and maintainable form
        patterns in React.
      </p>

      <div className="mt-12 grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold">
            <Link to="/examples/basic-form" className="hover:underline">
              1. Basic Form
            </Link>
          </h2>
          <p className="mt-2 text-muted-foreground">
            A simple contact form demonstrating basic field types, validation, and error handling.
            Perfect for understanding the fundamentals.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Text inputs with validation</li>
            <li>Phone number formatting</li>
            <li>Textarea and checkbox fields</li>
            <li>Error message display</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold">
            <Link to="/examples/custom-layout" className="hover:underline">
              2. Custom Layout Form
            </Link>
          </h2>
          <p className="mt-2 text-muted-foreground">
            A shipping address form showcasing flexible layout capabilities and custom grid
            arrangements.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Complex multi-column layouts</li>
            <li>Grid-based field arrangements</li>
            <li>Select dropdowns</li>
            <li>Sectioned form organization</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold">
            <Link to="/examples/advanced-form" className="hover:underline">
              3. Advanced Form
            </Link>
          </h2>
          <p className="mt-2 text-muted-foreground">
            A complex registration form with conditional rendering, custom fields, and advanced
            validation logic.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Conditional field rendering</li>
            <li>Cross-field validation</li>
            <li>Custom field components</li>
            <li>Radio groups and dynamic sections</li>
            <li>Real-time form state feedback</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h2 className="text-xl font-semibold">Key Features Demonstrated</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-medium">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with Zod schema validation
            </p>
          </div>
          <div>
            <h3 className="font-medium">Zero Boilerplate</h3>
            <p className="text-sm text-muted-foreground">
              Minimal code required for common patterns
            </p>
          </div>
          <div>
            <h3 className="font-medium">Flexible Layouts</h3>
            <p className="text-sm text-muted-foreground">
              Build any layout with standard CSS utilities
            </p>
          </div>
          <div>
            <h3 className="font-medium">Extensible</h3>
            <p className="text-sm text-muted-foreground">
              Easy to add custom fields and validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
