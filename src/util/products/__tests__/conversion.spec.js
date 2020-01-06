import {
  convertPrice,
  formatCurrencyPrice,
  formatPrice,
  getProductValue,
} from "../conversion";

describe("Currencies", () => {
  it("should be able to convert currency", () => {
    expect(convertPrice({ price: 5, currency: "USD" }, "NOK")).toEqual({
      price: 40,
      currency: "NOK",
    });
    expect(convertPrice({ price: 5, currency: "USD" }, "USD")).toEqual({
      price: 5,
      currency: "USD",
    });
    expect(convertPrice({ price: 40, currency: "NOK" }, "NOK")).toEqual({
      price: 40,
      currency: "NOK",
    });
  });
  it("should format and convert price", () => {
    expect(formatCurrencyPrice({ price: 5, currency: "USD" }, {})).toEqual(
      "40,00kr",
    );
  });
  it("should format price", () => {
    expect(formatPrice(5, ",-")).toEqual("5,00,-");
    expect(formatPrice(5.001, ",-")).toEqual("5,00,-");
    expect(formatPrice(5.01, ",-")).toEqual("5,01,-");
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
  test("should calculate quantity value if value is null", () => {
    const product = {
      provenance: "iherb",
      title: "Lakanto, Monkfruit Sweetener, Classic, 3.17 oz (90 g)",
      description:
        '0 Net Carbs   Ketogenic   Non GMO Project Verified   Zero Calories   Zero Glycemic   2x Sweeter Than Sugar   Zero Additives   Vegan   Gluten Free   Zero Aftertaste   One Packet = 1 1/2 Teaspoons SugarsOver a Thousand Years AgoIn the  remote mountain highlands of Asia, a group of Buddhist monks called the Luohan  achieved enlightenment and ascension through meditation, prayer and pure living.  On the slopes of a primeval forest, the monks discovered and cultivated a rare  fruit prized for its sweetness. This sacred fruit was named Monk Fruit, or  Luohan Guo, after its devoted caretakers and was used in elixirs to raise chi,  or life energy. Monk Fruit was used for centuries in eastern traditional herbalism to increase chi and well-being, earning it the nickname "The Immortals\' Fruit". We still  grow and harvest Monk Fruit for Lakanto in the same pristine area and according  to traditional and environmental methods. Born from a proprietary mixture of high-purity Monk Fruit extract and Non GMO Erythritol, Lakanto is a delicious zero calorie, zero glycemic sweetener with the sumptuous rich taste of sugar.',
      validFrom: "2019-12-02T08:31:47.378Z",
      validThrough: "2019-12-09T08:31:47.378Z",
      quantity: {
        size: {
          unit: {
            symbol: "g",
            type: "quantity",
            si: { symbol: "kg", factor: 0.001 },
          },
          amount: { min: 90, max: 90 },
        },
        pieces: { unit: null, amount: { min: null, max: null } },
      },
      location: "",
      provenance_id: "LAK-00002",
      dealer: null,
      href:
        "https://www.iherb.com/pr/Lakanto-Monkfruit-Sweetener-Classic-3-17-oz-90-g/73341",
      brand: "Lakanto",
      image_url: "https://s3.images-iherb.com/lak/lak00002/b/3.jpg",
      uri: "iherb:product:LAK-00002",
      type: "none",
      is_active: true,
      _id: "5dd0fd1ee81a2f9f107cab61",
      additionalProperty: null,
      availability: "http://schema.org/InStock",
      canonical_url:
        "https://www.iherb.com/pr/Lakanto-Monkfruit-Sweetener-Classic-3-17-oz-90-g/73341",
      categories: [
        "Brands A-Z",
        "Lakanto",
        "Categories",
        "Grocery",
        "Honey & Sweeteners",
        "Monk Fruit (Lo Han)",
      ],
      ean: null,
      gtin: null,
      gtin12: "843076000020",
      gtin13: null,
      gtin8: null,
      heading: "Lakanto, Monkfruit Sweetener, Classic, 3.17 oz (90 g)",
      image: "https://s3.images-iherb.com/lak/lak00002/b/3.jpg",
      itemCondition: "http://schema.org/NewCondition",
      items: { max: 1, min: 1 },
      mpn: null,
      price: 3.99,
      priceCurrency: "USD",
      pricing: { price: 3.99, currency: "USD", prePrice: null },
      run_from: "2019-11-17T07:46:19.447Z",
      run_till: "2019-11-24T07:46:19.447Z",
      sku: "LAK-00002",
      upc: null,
      url:
        "https://www.iherb.com/pr/Lakanto-Monkfruit-Sweetener-Classic-3-17-oz-90-g/73341",
      url_fingerprint: "a76a5611887f6af62693eb9030cd7b77bba5d0b7",
      value: {
        size: { unit: null, amount: { min: null, max: null } },
        pieces: { unit: null, amount: { min: null, max: null } },
      },
      gtins: { gtin12: "843076000020" },
      imageUrl: null,
      pieces: { unit: null, amount: { min: null, max: null } },
      provenanceId: "LAK-00002",
      servingSize: "Serving Size: 1 packet (3 g)",
      size: {
        unit: {
          symbol: "g",
          type: "quantity",
          si: { symbol: "kg", factor: 0.001 },
        },
        amount: { min: 90, max: 90 },
      },
      unitPrice: "$0.13/Count",
      id: "5dd0fd1ee81a2f9f107cab61",
    };
    const expected = "44,33 kr/kg";
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
