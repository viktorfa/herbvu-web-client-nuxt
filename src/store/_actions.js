import uniqBy from "lodash/uniqBy";

import { productMutations } from "./_mutations";
import { getPromotedOffers, getGroceryOffer, searchGroceryOffers } from "~/api";
import { isProductUri } from "~/util/products";
import { getStandardProduct } from "~/util/products/convert";

export const productActions = {
  EXECUTE_SEARCH_QUERY: "EXECUTE_SEARCH_QUERY",
  LOAD_PROMOTED_PRODUCTS: "LOAD_PROMOTED_PRODUCTS",
  UPDATE_PROMOTED_PRODUCTS: "UPDATE_PROMOTED_PRODUCTS",
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
      commit(productMutations.setPromotedProducts, filteredProducts);
    } else {
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.setIsLoadingPromotedProducts, false);
    console.log("LOAD_PROMOTED_PRODUCTS finish");
  },
  async [productActions.UPDATE_PROMOTED_PRODUCTS]({ commit }) {
    console.log("UPDATE_PROMOTED_PRODUCTS");
    commit(productMutations.setIsLoadingPromotedProducts, true);
    const { ok, data, error } = await getPromotedOffers();
    if (ok) {
      const filteredProducts = uniqBy(
        data,
        (offer) => offer.heading + offer.dealer + offer.pricing.price,
      );
      commit(productMutations.setPromotedProducts, filteredProducts);
    } else {
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.setIsLoadingPromotedProducts, false);
    console.log("UPDATE_PROMOTED_PRODUCTS finish");
  },
  async [productActions.EXECUTE_SEARCH_QUERY]({ commit }, { queryString }) {
    commit(productMutations.setIsSearching, true);
    commit(productMutations.clearSearchResults);
    console.log(`EXECUTE_SEARCH_QUERY for ${queryString}`);

    const { data, error } = await searchGroceryOffers(queryString);

    if (data) {
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
        commit(productMutations.setDetailProductNotFound, false);
        commit(productMutations.setDetailProduct, data);
      } else {
        console.warn(`Could not fetch product with uri: ${id}`);
        commit(productMutations.setDetailProductNotFound, true);
        commit(productMutations.setErrorMessage, error);
      }
      commit(productMutations.setIsLoadingDetailProduct, false);
    } else {
      console.error(`Loading detail product needs an ID.`);
    }
  },
  async [productActions.LOAD_SIMILAR_PRODUCTS]({ commit }, { product }) {
    commit(productMutations.setIsLoadingSimilarProducts, true);
    const { data, error } = await searchGroceryOffers(
      getStandardProduct(product).title,
    );
    if (data) {
      commit(productMutations.setSimilarProducts, data);
    } else {
      console.error(error);
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.setIsLoadingSimilarProducts, false);
  },
};
