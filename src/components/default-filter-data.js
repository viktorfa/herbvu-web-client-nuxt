export const defaultFilterOptions = {
  dealers: {
    key: "dealers",
    text: "Store",
    type: "enum",
    path: ["provenance"],
    items: [
      { key: "www.holdbart.no", text: "holdbart" },
      { key: "gottebiten.se", text: "gottebiten" },
      { key: "swecandy.se", text: "swecandy" },
      { key: "yoolando.com", text: "yoolando" },
    ],
  },
  price: {
    key: "price",
    text: "Price",
    type: "number",
    path: ["pricing", "price"],
  },
  category: {
    key: "category",
    text: "Categories",
    type: "include",
    path: ["categories"],
    items: [
      { key: "snacks", text: "Snacks", value: "Snacks" },
      { key: "godteri", text: "Godteri", value: "Godteri" },
    ],
  },
};

export const defaultSortOptions = {
  price: {
    key: "price",
    text: "Price",
    path: ["pricing", "price"],
    toggleable: true,
    defaultDesc: false,
  },
  size: {
    key: "size",
    text: "Size",
    path: ["size"],
    toggleable: true,
  },
  value: {
    key: "value",
    text: "Value",
    calculation: {
      op1: ["pricing", "price"],
      operand: "/",
      op2: ["size"],
    },
    defaultDesc: false,
  },
  score: { key: "score", text: "Relevance", path: ["score"] },
};
