export const formatPrice = (price, suffix = ",-") => {
  if (price && price.toFixed) {
    return `${price.toFixed(2).replace(".", ",")}${suffix}`;
  } else {
    return price;
  }
};