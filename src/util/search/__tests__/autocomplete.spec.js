import autocompleteDataResponse from "./autocomplete-data.json";

import { getHints } from "../autocomplete";

const autocompleteData = {
  tokens: autocompleteDataResponse.heading_tokens,
  bigrams: autocompleteDataResponse.heading_bigrams,
  fullgrams: autocompleteDataResponse.heading_fullgrams,
};

describe("getHints", () => {
  test("should return an array", () => {
    expect(getHints("", autocompleteData)).toBeInstanceOf(Array);
    expect(getHints("hello", autocompleteData)).toBeInstanceOf(Array);
    expect(getHints("hello man", autocompleteData)).toBeInstanceOf(Array);
  });
});
