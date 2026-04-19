import { json, type LoaderFunctionArgs, type MetaFunction } from "@shopify/remix-oxygen";
import { useLoaderData, Outlet, Link, Form } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Hesabim" }];

export async function loader({ context }: LoaderFunctionArgs) {
  const { customerAccount } = context;
  const isLoggedIn = await customerAccount.isLoggedIn();

  if (!isLoggedIn) {
    return customerAccount.login();
  }

  const { data } = await customerAccount.query(CUSTOMER_QUERY);
  return json({ customer: data.customer });
}

export default function AccountLayout() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 border-b border-[var(--color-border)] pb-8">
        <p className="text-xs uppercase tracking-[0.3em] opacity-60">Hesabim</p>
        <h1 className="mt-3 text-4xl font-display">
          Merhaba{customer?.firstName ? `, ${customer.firstName}` : ""}
        </h1>
      </header>

      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <nav className="space-y-2 text-sm">
          <Link to="/account" className="block uppercase tracking-wider hover:opacity-60">
            Genel Bakis
          </Link>
          <Link to="/account/orders" className="block uppercase tracking-wider hover:opacity-60">
            Siparisler
          </Link>
          <Link to="/account/profile" className="block uppercase tracking-wider hover:opacity-60">
            Profil
          </Link>
          <Link to="/account/addresses" className="block uppercase tracking-wider hover:opacity-60">
            Adresler
          </Link>
          <Form method="post" action="/account/logout">
            <button
              type="submit"
              className="mt-4 text-sm uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
            >
              Cikis
            </button>
          </Form>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

const CUSTOMER_QUERY = `#graphql
  query Customer {
    customer {
      id
      firstName
      lastName
      emailAddress { emailAddress }
      phoneNumber { phoneNumber }
    }
  }
` as const;
