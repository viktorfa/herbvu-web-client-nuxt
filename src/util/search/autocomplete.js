import { getAutocompleteData } from "~/api";

let autocompleteData = {
  tokens: [],
  ngrams: [],
};

export const initalize = async () => {
  const { ok, data, error } = await getAutocompleteData();
  if (ok) {
    const ngrams = Array.from(
      new Set([...data.heading_bigrams, ...data.heading_fullgrams]),
    );
    autocompleteData = {
      tokens: data.heading_tokens,
      ngrams,
    };
  } else {
    console.warn("Could not load autocomplete data");
    console.warn(error);
  }
};

const defaultAutocomplete = ["stevia", "manuka", "brown sugar", "coconut"];

export const getHints = (query, { tokens, ngrams } = autocompleteData) => {
  if (!query || query.length === 0) return defaultAutocomplete;
  const re = new RegExp(query, "ig");
  let candidates = [];
  if (query.lastIndexOf(" ") !== -1) {
    candidates.push(...ngrams);
  } else {
    candidates.push(...tokens);
  }
  return candidates.filter((x) => re.test(x));
};
