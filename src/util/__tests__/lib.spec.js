import { getItem } from "../lib";

test("should get nested item", () => {
  expect(getItem({ hei: { per: 1 } }, ["hei", "per"])).toEqual(1);
  expect(getItem({ hei: { per: 1 } }, ["hei", "per", "gur"])).toEqual(null);
});
