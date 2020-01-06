import { dealerLogos } from "../../constants/images";
import { SHOPGUN_URL } from "../../constants";

export const getDealerLogoSrc = (dealerName) => {
  return dealerLogos[dealerName];
};

export const getAmpShareUrlForProduct = ({ id }) =>
  `https://allematpriser.no/tilbud/${id}`;

export const getShopgunOfferCatalogUrl = ({ catalog_id, catalog_page }) =>
  `${SHOPGUN_URL}/publications/paged/${catalog_id}/pages/${catalog_page}`;

export const isProductUri = (string) => /\w+:product:\w+/gi.test(string);
