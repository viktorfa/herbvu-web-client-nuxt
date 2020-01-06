export const currencies = {
  SEK: { ticker: "SEK", symbol: "kr", exchange: 1 / 9 },
  NOK: { ticker: "NOK", symbol: "kr", exchange: 1 / 8 },
  USD: { ticker: "USD", symbol: "$", exchange: 1 },
};

/**
 * Formats a price with a suffix.
 * @param {number} price
 * @param {string} suffix
 */
export const formatPrice = (price, suffix = ",-") => {
  if (price && price.toFixed) {
    return `${price.toFixed(2).replace(".", ",")}${suffix}`;
  } else {
    return price;
  }
};

/**
 * Formats a pricing object to a string.
 * @param {PricingObject} price
 */
export const formatPricing = (pricing) => {
  return formatPrice(
    pricing.price || pricing.priceText,
    (currencies[pricing.currency] && currencies[pricing.currency].symbol) || "",
  );
};

/**
 * Converts a price to the currency and format specified in the settings found in state.
 * @param {PricingObject} pricing
 * @param {object} state
 */
export const formatCurrencyPrice = (pricing, state) => {
  try {
    const targetCurrency = "NOK";
    const converted = convertPrice(pricing, targetCurrency);
    return formatPrice(converted.price, currencies[targetCurrency].symbol);
  } catch (Error) {
    console.warn("Could not convert currency");
    console.warn(pricing);
    return formatPrice(pricing.price);
  }
};

/**
 * Converts the currency of a price.
 * @param {PricingObject} pricing
 * @param {string} target Target currency ticker symbol
 */
export const convertPrice = (pricing, target) => {
  const usdValue = currencies[pricing.currency].exchange * pricing.price;
  const result = usdValue / currencies[target].exchange;
  return { currency: target, price: result };
};

export const getValueString = ({ amount, unit, currency }) => {
  if (!amount.max) {
    return "";
  }
  if (unit) {
    return `${formatPricing({ price: amount.max, currency }, {})} /${
      unit.symbol
    }`;
  }
  return `${formatPricing({ price: amount.max, currency }, {})} /stk`;
};

export const calculateValue = ({ amount, unit, pricing }) => {
  if (unit && unit.si) {
    return {
      currency: pricing.currency,
      amount: {
        max: pricing.price / (amount.max * unit.si.factor),
        min: pricing.price / (amount.min * unit.si.factor),
      },
      unit: unit.si,
    };
  }
  return {
    currency: pricing.currency,
    amount: {
      max: pricing.price / amount.max,
      min: pricing.price / amount.min,
    },
    unit,
  };
};

export const getProductValue = ({ quantity, value, pricing }) => {
  if (value) {
    if (value.size && value.size.amount && value.size.amount.min) {
      return getValueString(value.size);
    } else if (value.pieces && value.pieces.amount && value.pieces.amount.min) {
      return getValueString(value.pieces);
    }
  }
  if (pricing) {
    if (quantity) {
      if (quantity.size && quantity.size.amount && quantity.size.amount.min) {
        return getValueString(calculateValue({ ...quantity.size, pricing }));
      } else if (
        quantity.pieces &&
        quantity.pieces.amount &&
        quantity.pieces.amount.min
      ) {
        return getValueString(calculateValue({ ...quantity.pieces, pricing }));
      }
    }
  }
  return "";
};
