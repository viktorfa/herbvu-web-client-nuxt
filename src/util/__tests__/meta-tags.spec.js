import {
  getAllMetaTags,
  getAllMetaInfoForProduct,
  getProductDescription,
  getAllMetaInfo,
} from "../meta-tags";
import exampleProduct from "./standard-product.json";

test("getAllMetaTags", () => {
  const argument = {
    title: "Hei",
    description: "Hvordan går det?",
    image_url: "Jo, bra. Takk for det, og du?",
    site_url: "Helt jævlig.",
  };
  const actual = getAllMetaTags(argument);
  expect(actual).toBeTruthy();
  expect(actual).toBeInstanceOf(Array);
});

test("getAllMetaInfoForProduct", () => {
  const actual = getAllMetaInfoForProduct(exampleProduct);
  expect(actual).toBeTruthy();
  expect(actual).toBeInstanceOf(Object);
  expect(actual.title).toBeTruthy();
  expect(typeof actual.title).toBe("string");
  expect(actual.meta).toBeTruthy();
  expect(actual.meta).toBeInstanceOf(Array);
});

test("getProductDescription", () => {
  const product = exampleProduct;
  const actual = getProductDescription(product);
  expect(actual).toBeTruthy();
  expect(typeof actual).toBe("string");
});

describe("getAllMetaInfo", () => {
  it("should fall back to defaults if no arguments provided", () => {
    const actual = getAllMetaInfo();
    expect(actual).toBeTruthy();
    expect(actual).toBeInstanceOf(Object);
    expect(typeof actual.title).toBe("string");
    expect(actual.meta).toBeInstanceOf(Array);
    const ogDescriptionTag = actual.meta.find(
      ({ property }) => property === "og:description",
    );
    expect(typeof ogDescriptionTag.content).toBe("string");
    expect(ogDescriptionTag.content.length).toBeGreaterThan(10);
  });
  it("should fall back to defaults if only some arguments are provided", () => {
    const image_url = "https://example.com/logo.png";
    const actual = getAllMetaInfo({
      image_url,
    });
    expect(actual).toBeTruthy();
    expect(actual).toBeInstanceOf(Object);
    expect(typeof actual.title).toBe("string");
    expect(actual.meta).toBeInstanceOf(Array);
    const ogDescriptionTag = actual.meta.find(
      ({ property }) => property === "og:description",
    );
    expect(typeof ogDescriptionTag.content).toBe("string");
    expect(ogDescriptionTag.content.length).toBeGreaterThan(10);
    const ogImageTag = actual.meta.find(
      ({ property }) => property === "og:image",
    );
    expect(typeof ogImageTag.content).toBe("string");
    expect(ogImageTag.content.length).toBeGreaterThan(10);
    expect(ogImageTag.content).toEqual(image_url);
  });
});
