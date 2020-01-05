import get from "lodash/get";

export const getSortedProducts = (products, sortFunction) => {
  return [...products].sort(sortFunction);
};
export const getSortFunction = ({ selectedOption, sortOptions }) => {
  const config = sortOptions[selectedOption.key];
  const isDescending = selectedOption.desc !== false;

  if (config.calculation) {
    const { op1, operand, op2 } = config.calculation;
    let getV;
    switch (operand) {
      case "/":
        getV = function(obj) {
          return (
            getRealQuantity(get(obj, op1)) / getRealQuantity(get(obj, op2))
          );
        };
        break;
    }
    return function(a, b) {
      let _a = getV(a);
      let _b = getV(b);
      [_a, _b] = [_a, _b].map((x) => {
        if (Number.isFinite(x)) {
          return x;
        }
        if (isDescending) {
          return 0;
        } else {
          return Number.MAX_SAFE_INTEGER;
        }
      });
      if (isDescending) {
        return _a - _b;
      } else {
        return _b - _a;
      }
    };
  } else if (config.path) {
    return function(a, b) {
      let _a = getRealQuantity(get(a, config.path));
      let _b = getRealQuantity(get(b, config.path));
      [_a, _b] = [_a, _b].map((x) => {
        if (Number.isFinite(x)) {
          return x;
        }
        if (isDescending) {
          return 0;
        } else {
          return Number.MAX_SAFE_INTEGER;
        }
      });
      if (isDescending) {
        return _a - _b;
      } else {
        return _b - _a;
      }
    };
  }
};

export const getRealQuantity = (quantity) => {
  if (quantity && quantity.amount) {
    try {
      return quantity.amount.min * quantity.unit.si.factor;
    } catch (e) {
      return quantity.amount.min;
    }
  }
  return quantity;
};
