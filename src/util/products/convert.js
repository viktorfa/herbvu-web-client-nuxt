import { provenanceTypes } from "~/util/enums";
import {
  formatPricing,
  getProductValue,
  convertPrice,
} from "~/util/products/conversion";
import { getItem } from "~/util/lib";

export const getStandardProduct = (product) => {
  switch (product.provenance) {
    case provenanceTypes.CUSTOM:
      return {
        title: product.heading,
        price: product.pricing.price || product.pricing.text || "",
        subtitle: product.dealer,
        dealer: product.dealer,
        description: product.description,
        href: "#",
        image_url: product.image_url,
        id: product.uri || product._id,
      };
    default:
      return {
        title: product.title || product.heading,
        price: formatPricing(product.pricing),
        subtitle: product.description,
        description: product.description,
        dealer: product.dealer || product.provenance,
        href: product.href,
        image_url: product.imageUrl || product.image_url,
        id: product.uri,
        value: getProductValue(product),
      };
  }
};

export const localizeProduct = (product, state) => {
  const targetCurrency = getItem(state, ["settings", "currency"]) || "NOK";
  try {
    return {
      ...product,
      pricing: convertPrice(product.pricing, targetCurrency),
    };
  } catch (Error) {
    console.warn(`Could not localize product ${product.uri}.`);
    return product;
  }
};
