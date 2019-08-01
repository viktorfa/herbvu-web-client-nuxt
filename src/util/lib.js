import isNil from "lodash/isNil";
import isNumber from "lodash/isNumber";
import { provenanceTypes } from "./enums";

export const formatPrice = (price, suffix = ",-") => {
  if (isNumber(price)) {
    return `${price.toFixed(2).replace(".", ",")}${suffix}`;
  } else {
    return price;
  }
};
export const parseQueryStringFromUrl = () => {
  if (window.location.pathname.includes("sok/")) {
    return decodeURIComponent(
      window.location.pathname.substring(
        window.location.pathname.lastIndexOf("sok/") + 4,
      ),
    );
  }
  return null;
};
const intitialTitleText = "GET DEFAULT TITLE";
export const setQueryStringInPage = (query) => {
  if (query && query.length > 0) {
    setSearchPath(query);
    setPageTitle(`Priser på "${query}"`);
  } else {
    window.history.pushState({}, null, "/");
    setPageTitle(intitialTitleText);
  }
};

export const setPageTitle = (title) => {
  document.querySelector("title").text = title;
};

export const setSearchPath = (query) => {
  window.history.pushState({}, null, `/sok/${query}`);
};

export const getProductValue = ({
  quantity_value,
  piece_value,
  quantity,
  pricing,
}) => {
  if (isNil(quantity)) return "";
  if (quantity_value)
    return formatPrice(
      quantity_value.value,
      ` kr/${quantity_value.unit.symbol}`,
    );
  if (piece_value)
    return formatPrice(piece_value.value, ` kr/${piece_value.unit.symbol}`);
  else if (quantity.size.max)
    return formatPrice(
      pricing.price / (quantity.size.max * quantity.unit.si.factor),
      ` kr/${quantity.unit.si.symbol}`,
    );
  else if (quantity.pieces.max)
    return formatPrice(pricing.price / quantity.pieces.max, " kr/stk");
  return "";
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
        title: product.heading,
        price: product.pricing.price,
        subtitle: product.description,
        description: product.description,
        dealer: product.dealer,
        href: product.href,
        image_url: product.image_url,
        id: product.uri,
        value: getProductValue(product),
      };
  }
};
