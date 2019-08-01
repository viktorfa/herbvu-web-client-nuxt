import { actions as _actions } from "./_actions";
import { mutations as _mutations } from "./_mutations";

const initialState = {
  promotedProducts: [],
  isSearching: false,
  queryString: "",
  searchQuery: "",
  isLoadingPromotedProducts: false,
  isLoadingSimilarProducts: false,
  isLoadingDetailProduct: false,
  searchResults: [],
  similarProducts: [],
  errorMessage: "",
  showDrawer: false,
  detailProduct: null,
  detailProductNotFound: false,
};

export const state = () => initialState;
export const mutations = _mutations;
export const actions = _actions;
