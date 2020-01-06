import { isProductUri } from "../";

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
