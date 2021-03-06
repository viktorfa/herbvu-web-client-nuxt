import fetch from "node-fetch";

import {
  getJsonFetchOption,
  getFullFileUrl,
  optionFetch,
  localizeProductResponse,
} from "./util";
import cache from "./cache";
import { strapiUrl, productCollection } from "~/config/vars";

export const getAutocompleteData = async () => {
  const fileName = "autocomplete-data-latest.json";
  const response = await fetch(getFullFileUrl(fileName));
  return getJsonFetchOption(response);
};

export const getGroceryOffer = async (uri, state) => {
  const { data, error } = await optionFetch(
    `${strapiUrl}/${productCollection}?uri=${uri}&_limit=1`,
  );
  if (data && data[0]) {
    return localizeProductResponse(
      {
        ok: true,
        data: data[0],
      },
      state,
    );
  } else {
    return {
      ok: false,
      error,
    };
  }
};

export const getPromotedOffers = async (offerLimit = 30, state) => {
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

  const strapiUrlParameterString = `validThrough_gt=${earliestToday.toISOString()}&_limit=${offerLimit}&_sort=select_method:DESC`;
  const response = await fetch(
    `${strapiUrl}/${productCollection}?${strapiUrlParameterString}`,
  );
  const fetchOption = await getJsonFetchOption(response);
  return localizeProductResponse(fetchOption, state);
};

export const searchGroceryOffers = async (query, state) => {
  if (!query) {
    console.warn("Empty query for search");
    return { data: [] };
  }
  const cachedResponse = cache.get(query.toLowerCase());
  if (cachedResponse) {
    console.log("using cache");
    return cachedResponse;
  }
  const url = `${strapiUrl}/${productCollection}?title_contains=${encodeURIComponent(
    query,
  )}`;
  const response = await fetch(url);
  const fetchOption = await getJsonFetchOption(response);
  cache.set(query.toLowerCase(), fetchOption);
  return localizeProductResponse(fetchOption, state);
};

export const getCategoryOffers = async (category, state) => {
  if (!category) {
    return {
      error: new Error(`${category} is not a valid category.`),
    };
  }
  const url = `${strapiUrl}/${productCollection}?categories_contains=${category}`;
  const response = await fetch(url);
  const fetchOption = await getJsonFetchOption(response);
  return localizeProductResponse(fetchOption, state);
};
