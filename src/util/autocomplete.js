import { getAutocompleteData } from "@/api";

let autocompleteData = {
  tokens: [],
  bigrams: [],
  fullgrams: [],
};

const initalize = async () => {
  const { ok, data, error } = await getAutocompleteData();
  if (ok) {
    autocompleteData = {
      tokens: data.heading_tokens,
      bigrams: data.heading_bigrams,
      fullgrams: data.heading_fullgrams,
    };
  } else {
    console.warn("Could not load autocomplete data");
    console.warn(error);
  }
};

const defaultAutocomplete = [
  "pepsi max",
  "grandiosa",
  "avokado",
  "cola",
  "sjokolade",
  "norvegia",
  "smågodt",
  "laks",
];

export const getHints = (
  query,
  { tokens, bigrams, fullgrams } = autocompleteData,
) => {
  if (!query || query.length === 0) return defaultAutocomplete;
  else if (query.lastIndexOf(" ") !== -1) {
    return [...fullgrams, ...bigrams];
  } else {
    return [...defaultAutocomplete, ...tokens];
  }
};

initalize();
