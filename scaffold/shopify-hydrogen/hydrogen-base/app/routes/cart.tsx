import { json, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "@shopify/remix-oxygen";
import { useLoaderData, Link } from "@remix-run/react";
import { CartForm, type CartQueryDataReturn, Money } from "@shopify/hydrogen";
import { CartMain } from "~/components/Cart";

export const meta: MetaFunction = () => [{ title: "Sepet" }];

export async function action({ request, context }: ActionFunctionArgs) {
  const { cart } = context;
  const formData = await request.formData();
  const { action: cartAction, inputs } = CartForm.getFormInput(formData);

  if (!cartAction) throw new Error("cartAction bulunamadi");

  let status = 200;
  let result: CartQueryDataReturn;

  switch (cartAction) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate:
      result = await cart.updateDiscountCodes(inputs.discountCodes);
      break;
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity({ ...inputs.buyerIdentity });
      break;
    default:
      throw new Error(`${cartAction} cart action tanimli degil`);
  }

  const cartId = result?.cart?.id;
  const headers = cart.setCartId(cartId!);
  const { cart: cartResult, errors } = result;

  const redirectTo = formData.get("redirectTo") ?? null;
  if (typeof redirectTo === "string") {
    status = 303;
    headers.set("Location", redirectTo);
  }

  return json(
    { cart: cartResult, errors, analytics: { cartId } },
    { status, headers },
  );
}

export async function loader({ context }: LoaderFunctionArgs) {
  const { cart } = context;
  const cartData = await cart.get();
  return json({ cart: cartData });
}

export default function CartPage() {
  const { cart } = useLoaderData<typeof loader>();

  if (!cart || cart.lines?.nodes?.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] opacity-60">Sepet</p>
        <h1 className="mt-4 text-5xl font-display">Sepetiniz bos</h1>
        <p className="mt-4 opacity-70">
          Koleksiyonumuza goz atarak sizin icin uygun parcayi bulabilirsiniz.
        </p>
        <Link
          to="/collections/all"
          className="mt-8 inline-block border border-current px-8 py-3 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
        >
          Koleksiyona Git
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-display mb-12">Sepet</h1>
      <CartMain cart={cart} layout="page" />
    </section>
  );
}
