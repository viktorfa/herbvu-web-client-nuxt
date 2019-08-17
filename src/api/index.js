import fetch from "node-fetch";

import { getJsonFetchOption, getFullFileUrl, optionFetch } from "./util";
import cache from "./cache";
import { shopgunOfferToAmpOffer } from "~/util/products/convert";
import { strapiUrl, apiUrl, shopgunToken } from "~/config/vars";

export const getAutocompleteData = async () => {
  const fileName = "autocomplete-data-latest.json";
  const response = await fetch(getFullFileUrl(fileName));
  return getJsonFetchOption(response);
};

export const getGroceryOffer = async (uri) => {
  const strapiCollectionName = "groceryoffers";
  // Some offers are not in our database, but the pages show up on Google searches.
  // So we find the offer with Shopgun instead, so that visitors don't see an empty page.
  if (shopgunToken && uri.startsWith("shopgun")) {
    const shopgunPath = `/offers/${uri.split(":")[2]}`;
    const shopgunOptions = {
      headers: { "X-Token": shopgunToken, Accept: "application/json" },
      method: "GET",
    };
    const shopgunOptionPromise = optionFetch(
      `https://api.etilbudsavis.dk/v2${shopgunPath}`,
      shopgunOptions,
    );
    const strapiOptionPromise = optionFetch(
      `${strapiUrl}/${strapiCollectionName}?uri=${uri}&_limit=1`,
    );
    return new Promise(async (resolve) => {
      const {
        data: strapiResponse,
        error: strapiError,
      } = await strapiOptionPromise;
      if (strapiResponse && strapiResponse[0]) {
        resolve({ ok: true, data: strapiResponse[0] });
      }
      const {
        data: shopgunResponse,
        error: shopgunError,
      } = await shopgunOptionPromise;
      if (shopgunResponse) {
        resolve({ ok: true, data: shopgunOfferToAmpOffer(shopgunResponse) });
      }
      resolve({ ok: false, error: strapiError || shopgunError });
    });
  }
  // END Using Shopgun fallback.
  const { data, error } = await optionFetch(
    `${strapiUrl}/${strapiCollectionName}?uri=${uri}&_limit=1`,
  );
  if (data && data[0]) {
    return {
      ok: true,
      data: data[0],
    };
  } else {
    return {
      ok: false,
      error,
    };
  }
};

export const getPromotedOffers = async (offerLimit = 30) => {
  const earliestToday = new Date();
  earliestToday.setUTCMilliseconds(0);
  earliestToday.setUTCSeconds(0);
  earliestToday.setUTCMinutes(0);
  earliestToday.setUTCHours(0);
  const latestToday = new Date();
  latestToday.setUTCMilliseconds(999);
  latestToday.setUTCSeconds(59);
  latestToday.setUTCMinutes(59);
  latestToday.setUTCHours(23);

  const strapiCollectionName = "groceryoffers";
  const strapiUrlParameterString = `run_till_gt=${earliestToday.toISOString()}&run_from_lt=${latestToday.toISOString()}&_limit=${offerLimit}&_sort=select_method:DESC&is_promoted=true`;
  const response = await fetch(
    `${strapiUrl}/${strapiCollectionName}?${strapiUrlParameterString}`,
  );
  return getJsonFetchOption(response);
};

export const searchGroceryOffers = async (query) => {
  const cachedResponse = cache.get(query.toLowerCase());
  if (cachedResponse) {
    console.log("using cache");
    return cachedResponse;
  }
  const url = `${apiUrl}/offers/search/${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const fetchOption = await getJsonFetchOption(response);
  cache.set(query.toLowerCase(), fetchOption);
  return fetchOption;
};
