import autocompleteDataResponse from "./autocomplete-data.json";

import { getHints } from "../autocomplete";

const autocompleteData = {
  tokens: autocompleteDataResponse.heading_tokens,
  ngrams: autocompleteDataResponse.heading_bigrams,
};

describe("getHints", () => {
  test("should return an array", () => {
    expect(getHints("", autocompleteData)).toBeInstanceOf(Array);
    expect(getHints("hello", autocompleteData)).toBeInstanceOf(Array);
    expect(getHints("hello man", autocompleteData)).toBeInstanceOf(Array);
  });
});
