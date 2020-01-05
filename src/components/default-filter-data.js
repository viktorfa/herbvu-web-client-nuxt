export const defaultFilterOptions = {
  dealers: {
    key: "dealers",
    text: "Butikk",
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
    text: "Pris",
    type: "number",
    path: ["pricing", "price"],
  },
  promoted: {
    key: "promoted",
    text: "Promotert",
    type: "boolean",
    path: ["is_promoted"],
  },
  category: {
    key: "category",
    text: "Kategorier",
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
    text: "Pris",
    path: ["pricing", "price"],
    toggleable: true,
    defaultDesc: false,
  },
  size: {
    key: "size",
    text: "Størrelse",
    path: ["size"],
    toggleable: true,
  },
  value: {
    key: "value",
    text: "Verdi",
    calculation: {
      op1: ["pricing", "price"],
      operand: "/",
      op2: ["size"],
    },
    defaultDesc: false,
  },
  score: { key: "score", text: "Relevans", path: ["score"] },
};
