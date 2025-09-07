"use client";
type ServiceKey = 'tax' | 'notary' | 'immigration';

export const CHECKOUT_LINKS: Record<ServiceKey, string> = {
  tax: "https://buy.stripe.com/test_tax_checkout_link",
  notary: "https://buy.stripe.com/test_notary_checkout_link",
  immigration: "https://buy.stripe.com/test_immigration_checkout_link",
};

export default function PayButtons({ service }: { service?: ServiceKey }) {
  const links = CHECKOUT_LINKS;
  if (service) {
    const labelMap: Record<ServiceKey, string> = {
      tax: "Pay Tax Service",
      notary: "Pay Notary",
      immigration: "Pay Immigration",
    };
    const colorMap: Record<ServiceKey, string> = {
      tax: "bg-blue-600",
      notary: "bg-green-600",
      immigration: "bg-purple-600",
    };
    return (
      <a
        href={links[service]}
        target="_blank"
        rel="noopener"
        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white ${colorMap[service]} hover:opacity-90`}
      >
        {labelMap[service]}
      </a>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a href={links.tax} target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90">Pay Tax Service</a>
      <a href={links.notary} target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:opacity-90">Pay Notary</a>
      <a href={links.immigration} target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:opacity-90">Pay Immigration</a>
    </div>
  );
}
