export const simpleSetters = {
  isLoadingSimilarProducts: "isLoadingSimilarProducts",
  similarProducts: "similarProducts",
  detailProductNotFound: "detailProductNotFound",
};

export const productMutations = {
  ...simpleSetters,
  setQueryString: "setQueryString",
  setSearchQuery: "setSearchQuery",
  setIsSearching: "setIsSearching",
  setIsLoading: "setIsLoading",
  setIsLoadingPromotedProducts: "setIsLoadingPromotedProducts",
  setIsLoadingDetailProduct: "setIsLoadingDetailProduct",
  setShowPromotedProducts: "setShowPromotedProducts",
  loadSearchResults: "loadSearchResults",
  clearSearchResults: "clearSearchResults",
  loadPromotedProducts: "loadPromotedProducts",
  setErrorMessage: "setErrorMessage",
  setDetailProduct: "setDetailProduct",
};

export const uiMutations = {
  setShowDrawer: "setShowDrawer",
};

export const mutations = {
  ...Object.values(simpleSetters).reduce((acc, key) => {
    return {
      ...acc,
      [key](state, newValue) {
        state[key] = newValue;
      },
    };
  }, {}),
  [productMutations.setQueryString](state, queryString) {
    state.queryString = queryString;
  },
  [productMutations.setSearchQuery](state, searchQuery) {
    state.searchQuery = searchQuery;
  },
  [productMutations.setIsSearching](state, isSearching) {
    state.isSearching = isSearching;
  },
  [productMutations.setIsLoading](state, isLoading) {
    state.isLoading = isLoading;
  },
  [productMutations.setShowPromotedProducts](state, showPromotedProducts) {
    state.showPromotedProducts = showPromotedProducts;
  },
  [productMutations.clearSearchResults](state) {
    state.searchResults = [];
  },
  [productMutations.loadSearchResults](state, searchResults) {
    state.searchResults = [...state.searchResults, ...searchResults];
  },
  [productMutations.loadPromotedProducts](state, promotedProducts) {
    state.promotedProducts = promotedProducts;
  },
  [productMutations.setIsLoadingPromotedProducts](
    state,
    isLoadingPromotedProducts,
  ) {
    state.isLoadingPromotedProducts = isLoadingPromotedProducts;
  },
  [productMutations.setErrorMessage](state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  [productMutations.setDetailProduct](state, detailProduct) {
    state.detailProduct = detailProduct;
  },
  [productMutations.setIsLoadingDetailProduct](state, isLoadingDetailProduct) {
    state.isLoadingDetailProduct = isLoadingDetailProduct;
  },
  [uiMutations.setShowDrawer](state, showDrawer) {
    state.showDrawer = showDrawer;
  },
};
