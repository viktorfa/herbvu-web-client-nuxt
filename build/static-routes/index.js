import { getCollection } from "./mongo";

export const getOffers = async (limit = 2 ** 16) => {
  const now = new Date();
  const collection = await getCollection("groceryoffer");
  return collection
    .find({ validThrough: { $gt: now } })
    .limit(limit)
    .toArray();
};
