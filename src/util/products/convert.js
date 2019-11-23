import { provenanceTypes } from "~/util/enums";
import { getShopgunOfferCatalogUrl, getProductValue } from "~/util/products";

export const shopgunOfferToAmpOffer = (shopgunOffer) => {
  return {
    ...shopgunOffer,
    title: shopgunOffer.heading,
    image_url: shopgunOffer.images.zoom,
    href: getShopgunOfferCatalogUrl(shopgunOffer),
    dealer: shopgunOffer.branding.name,
    id: `shopgun:product:${shopgunOffer.id}`,
  };
};

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
        price: product.pricing.price,
        subtitle: product.description,
        description: product.description,
        dealer: product.dealer,
        href: product.href,
        image_url: product.imageUrl || product.image_url,
        id: product.uri,
        value: getProductValue(product),
      };
  }
};
