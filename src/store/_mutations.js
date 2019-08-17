// Just put the state key and setter name here
// Map<setterName -> stateKey>
export const simpleProductSetters = {
  setIsLoadingSimilarProducts: "isLoadingSimilarProducts",
  setSimilarProducts: "similarProducts",
  setDetailProductNotFound: "detailProductNotFound",
  setQueryString: "queryString",
  setSearchQuery: "searchQuery",
  setIsSearching: "isSearching",
  setIsLoading: "isLoading",
  setIsLoadingPromotedProducts: "isLoadingPromotedProducts",
  setIsLoadingDetailProduct: "isLoadingDetailProduct",
  setPromotedProducts: "promotedProducts",
  setErrorMessage: "errorMessage",
  setDetailProduct: "detailProduct",
};

export const simpleUiSetters = {
  setShowDrawer: "showDrawer",
};

export const productMutations = {
  ...Object.keys(simpleProductSetters).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key,
    }),
    {},
  ),
  clearSearchResults: "clearSearchResults",
  loadSearchResults: "loadSearchResults",
};

export const uiMutations = {
  ...Object.keys(simpleUiSetters).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key,
    }),
    {},
  ),
};

export const mutations = {
  ...Object.entries({ ...simpleProductSetters, ...simpleUiSetters }).reduce(
    (acc, [setterName, stateKey]) => {
      return {
        ...acc,
        [setterName]: (state, newValue) => {
          state[stateKey] = newValue;
        },
      };
    },
    {},
  ),
  [productMutations.clearSearchResults](state) {
    state.searchResults = [];
  },
  [productMutations.loadSearchResults](state, searchResults) {
    state.searchResults = [...state.searchResults, ...searchResults];
  },
};
