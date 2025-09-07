export default function PayButtons() {
  // Replace with your Stripe Checkout links
  const links = {
    tax: "https://buy.stripe.com/test_tax_checkout_link",
    notary: "https://buy.stripe.com/test_notary_checkout_link",
    immigration: "https://buy.stripe.com/test_immigration_checkout_link",
  };
  return (
    <div className="flex flex-wrap gap-3">
      <a href={links.tax} target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Pay Tax Service</a>
      <a href={links.notary} target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-green-600 text-white">Pay Notary</a>
      <a href={links.immigration} target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-purple-600 text-white">Pay Immigration</a>
    </div>
  );
}
