import get from "lodash/get";

export const filterProducts = (products, filters) => {
  return products.filter((x) => {
    let result = true;
    for (const filter of filters) {
      if (typeof filter === "string") {
        result = x[filter];
      } else if (typeof filter === "function") {
        result = filter(x);
      }
      if (!result) {
        return false;
      }
    }
    return result;
  });
};

export const getFilterFunctions = ({ selectedOptions, filterOptions }) => {
  return Object.entries(filterOptions)
    .filter(([key, config]) => {
      return Object.keys(selectedOptions).find((x) => x.startsWith(config.key));
    })
    .reduce((acc, [key, config]) => {
      switch (config.type) {
        case "enum":
          return [
            ...acc,
            getEnumFunction({ config, selectedOptions, filterOptions }),
          ];
        case "number":
          return [...acc, ...getNumberFunctions({ config, selectedOptions })];
        case "boolean":
          return [...acc, getBooleanFunction({ config, selectedOptions })];
        case "include":
          // Don't use this filter if none are selected
          if (
            !Object.entries(selectedOptions).find(
              ([k, v]) => k.startsWith(config.key) && v === true,
            )
          ) {
            return acc;
          }
          return [
            ...acc,
            getIncludeFunction({ config, selectedOptions, filterOptions }),
          ];
        default:
          return acc;
      }
    }, []);
};

export const getEnumFunction = ({ config, selectedOptions, filterOptions }) => {
  const validDealers = filterOptions[config.key].items
    .filter((x) => selectedOptions[`${config.key}.${x.key}`] !== false)
    .map((x) => x.key);
  const result = function(x) {
    return validDealers.includes(get(x, config.path));
  };
  return result;
};
export const getBooleanFunction = ({ config, selectedOptions }) => {
  const result = function(x) {
    return !!get(x, config.path) === !!selectedOptions[`${config.key}`];
  };
  return result;
};
export const getNumberFunctions = ({ config, selectedOptions }) => {
  const maxFunction = function(x) {
    if (selectedOptions[`${config.key}.max`]) {
      return get(x, config.path) <= selectedOptions[`${config.key}.max`];
    }
    return true;
  };
  const minFunction = function(x) {
    if (selectedOptions[`${config.key}.min`]) {
      return get(x, config.path) >= selectedOptions[`${config.key}.min`];
    }
    return true;
  };
  return [maxFunction, minFunction];
};
export const getIncludeFunction = ({
  config,
  selectedOptions,
  filterOptions,
}) => {
  const shouldContain = filterOptions[config.key].items
    .filter((x) => selectedOptions[`${config.key}.${x.key}`] === true)
    .map((x) => x.value);
  const result = function(x) {
    for (const _x of shouldContain) {
      const target = get(x, config.path);
      if (!target) {
        return false;
      } else if (target.includes(_x)) {
        return true;
      }
    }
    return false;
  };
  return result;
};
