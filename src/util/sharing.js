import { getAmpShareUrlForProduct, isMobileOrTablet } from "./helpers";

export const getSocialLinkDataForProduct = (product) => {
  const ampUrl = getAmpShareUrlForProduct(product);
  return getSocialLinkData(ampUrl);
};

export const getSocialLinkData = (url) => {
  const encodedUrl = encodeURIComponent(url);
  if (isMobileOrTablet()) {
    return [
      {
        icon: "mdi-facebook",
        href: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
        color: "blue darken-4",
      },
      {
        icon: "mdi-facebook-messenger",
        href: `fb-messenger://share?link=${encodedUrl}`,
        color: "blue",
      },
    ];
  }
  return [
    {
      icon: "mdi-facebook",
      href: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
      color: "blue darken-4",
    },
    {
      icon: "mdi-facebook-messenger",
      href: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=704666266622046&redirect_uri=${encodeURIComponent(
        window.location.href,
      )}`,
      color: "blue",
    },
  ];
};
