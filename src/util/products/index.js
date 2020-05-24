import { dealerLogos } from "../../constants/images";

export const getDealerLogoSrc = (dealerName) => {
  return dealerLogos[dealerName];
};

export const getAmpShareUrlForProduct = ({ id }) =>
  `https://herbvu.com/products/${id}`;

export const isProductUri = (string) => /\w+:product:\w+/gi.test(string);
