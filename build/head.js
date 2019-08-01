const dnsPreconnectDomains = [
  "https://strapi.vikfand.com",
  "https://qycsz5c7j1.execute-api.eu-central-1.amazonaws.com",
  "https://d2gse0j53wlmtk.cloudfront.net",
];

export const getLinkTags = () => {
  return [
    dnsPreconnectDomains.map((host) => ({ rel: "dns-preconnect", href: host })),
  ];
};
