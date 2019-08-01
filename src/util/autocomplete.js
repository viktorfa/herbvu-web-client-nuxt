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

export const getHints = (query, { tokens, bigrams, fullgrams }) => {
  if (!query || query.length === 0) return defaultAutocomplete;
  else if (query.lastIndexOf(" ") !== -1) {
    return [...fullgrams, ...bigrams];
  } else {
    return [...defaultAutocomplete, ...tokens];
  }
};
