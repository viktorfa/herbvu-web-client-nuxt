import { getProductValue, isProductUri, formatPrice } from "../";

describe("getProductValue", () => {
  test("should return a string", () => {
    expect(typeof getProductValue({})).toEqual("string");
  });
  test("should find existing quantity value", () => {
    const product = {
      pricing: {},
      quantity: {},
      value: {
        size: {
          amount: { min: 10.0, max: 10.0 },
          unit: {
            symbol: "kg",
            si: {
              symbol: "kg",
              factor: 1,
            },
          },
        },
      },
    };
    const expected = "10,00 kr/kg";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
  test("should find existing pieces value", () => {
    const product = {
      pricing: {},
      quantity: {},
      value: {
        pieces: {
          amount: { min: 5.0, max: 5.0 },
          unit: {
            symbol: "boks",
          },
        },
      },
    };
    const expected = "5,00 kr/boks";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
  test("should calculate quantity value", () => {
    const product = {
      quantity: {
        size: {
          amount: {
            max: 100,
            min: 100,
          },
          unit: {
            symbol: "g",
            si: {
              symbol: "kg",
              factor: 0.001,
            },
          },
        },
      },
      pricing: {
        price: 20.0,
      },
    };
    const expected = "200,00 kr/kg";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
  test("should calculate piece value", () => {
    const product = {
      quantity: {
        pieces: {
          amount: {
            max: 4,
            min: 4,
          },
          unit: { symbol: "stk" },
        },
      },
      pricing: {
        price: 100.0,
      },
    };
    const expected = "25,00 kr/stk";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
});

describe("isProductUri", () => {
  test("should return true if product uri format", () => {
    expect(isProductUri("shopgun:product:c4bfajYw")).toBeTruthy();
    expect(isProductUri("kolonial:product:240")).toBeTruthy();
    expect(isProductUri("meny:product:7035620032196")).toBeTruthy();
    expect(isProductUri("europris:product:168606")).toBeTruthy();
  });
  test("should return false if mongodb id format", () => {
    expect(isProductUri("5c4b1284aa871b0010bee398")).toBeFalsy();
  });
});

test("formatPrice", () => {
  expect(formatPrice(20)).toEqual("20,00,-");
  expect(formatPrice(20.1)).toEqual("20,10,-");
  expect(formatPrice(20.123)).toEqual("20,12,-");
  expect(formatPrice(20.123, "")).toEqual("20,12");
  expect(formatPrice("per")).toEqual("per");
  expect(formatPrice(null)).toEqual(null);
});
