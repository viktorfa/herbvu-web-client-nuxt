import { getCollection } from "./mongo";

export const getOffers = async (limit = 2 ** 4) => {
  const now = new Date();
  const collection = await getCollection("groceryoffer");
  return collection
    .find({ run_till: { $gt: now } })
    .limit(limit)
    .toArray();
};
