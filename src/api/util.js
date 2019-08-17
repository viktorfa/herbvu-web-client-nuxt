import { staticUrl } from "~/config/vars";

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
