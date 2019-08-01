import uniqBy from "lodash/uniqBy";
import {
  getPromotedOffers,
  getCustomProduct,
  getGroceryOffer,
  searchGroceryOffers,
} from "../api";
import { productMutations } from "./_mutations";
import { isProductUri } from "~/util/helpers";

export const productActions = {
  EXECUTE_SEARCH_QUERY: "EXECUTE_SEARCH_QUERY",
  LOAD_PROMOTED_PRODUCTS: "LOAD_PROMOTED_PRODUCTS",
  LOAD_DETAIL_PRODUCT: "LOAD_DETAIL_PRODUCT",
  LOAD_SIMILAR_PRODUCTS: "LOAD_SIMILAR_PRODUCTS",
};

export const actions = {
  async [productActions.LOAD_PROMOTED_PRODUCTS]({ commit }) {
    console.log("LOAD_PROMOTED_PRODUCTS");
    const { ok, data, error } = await getPromotedOffers();
    if (ok) {
      const filteredProducts = uniqBy(
        data,
        (offer) => offer.heading + offer.dealer + offer.pricing.price,
      );
      commit(productMutations.loadPromotedProducts, filteredProducts);
    } else {
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.setIsLoadingPromotedProducts, false);
    console.log("LOAD_PROMOTED_PRODUCTS finish");
  },
  async [productActions.EXECUTE_SEARCH_QUERY]({ commit }, { queryString }) {
    commit(productMutations.setIsSearching, true);
    commit(productMutations.clearSearchResults);
    console.log(`EXECUTE_SEARCH_QUERY for ${queryString}`);

    const { data, error } = await searchGroceryOffers(queryString);

    if (data) {
      commit(productMutations.setShowPromotedProducts, false);
      commit(productMutations.loadSearchResults, data);
      commit(productMutations.setSearchQuery, queryString);
    } else {
      commit(productMutations.setErrorMessage, error);
      console.error(error);
    }
    commit(productMutations.setIsSearching, false);
  },
  async [productActions.LOAD_DETAIL_PRODUCT]({ commit }, { id }) {
    if (isProductUri(id)) {
      commit(productMutations.setIsLoadingDetailProduct, true);

      const { ok, data, error } = await getGroceryOffer(id);

      if (ok) {
        commit(productMutations.detailProductNotFound, false);
        commit(productMutations.setDetailProduct, data);
      } else {
        console.warn(`Could not fetch product with uri: ${id}`);
        commit(productMutations.detailProductNotFound, true);
        commit(productMutations.setErrorMessage, error);
      }
      commit(productMutations.setIsLoadingDetailProduct, false);
    } else {
      // Not product uri, needs to be fetched from Strapi
      const { ok, data, error } = await getCustomProduct(id);
      if (ok) {
        commit(productMutations.setDetailProduct, data);
      } else {
        commit(productMutations.setErrorMessage, error);
      }
    }
  },
  async [productActions.LOAD_SIMILAR_PRODUCTS]({ commit }, { product }) {
    commit(productMutations.isLoadingSimilarProducts, true);
    const { data, error } = await searchGroceryOffers(product.heading);
    if (data) {
      commit(productMutations.similarProducts, data);
    } else {
      console.error(error);
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.isLoadingSimilarProducts, false);
  },
};
