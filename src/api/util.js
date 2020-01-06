import { staticUrl } from "~/config/vars";
import { localizeProduct } from "~/util/products/convert";

export const getFullFileUrl = (fileName) => `${staticUrl}${fileName}`;

export const getJsonFetchOption = async (response) => {
  if (response.ok) {
    try {
      return {
        ok: true,
        data: await response.json(),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  } else {
    return {
      ok: false,
      error: response.error,
    };
  }
};
export const optionFetch = async (...args) => {
  const response = await fetch(...args);
  if (response.ok) {
    try {
      return {
        ok: true,
        data: await response.json(),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  } else {
    return {
      ok: false,
      error: response.error,
    };
  }
};
export const localizeProductResponse = ({ data, error }, state) => {
  if (data && Array.isArray(data)) {
    return { data: data.map((x) => localizeProduct(x, state)) };
  } else if (data) {
    return { data: localizeProduct(data, state) };
  }
  return { data, error };
};
