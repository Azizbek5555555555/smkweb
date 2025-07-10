// next-seo.config.ts

const SEO = {
  title: "SMK Web — IT kompaniya Samarkandda",
  description: "SMK Web — zamonaviy veb va mobil ilovalar ishlab chiqish, SEO va dizayn xizmatlari. Samarkand, Uzbekistan bo'ylab xizmatlar.",
  canonical: "https://smkweb.com",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://smkweb.com/",
    site_name: "SMK Web",
    title: "SMK Web — IT компания в Самарканде",
    description: "Разработка веб-сайтов, мобильные приложения, SEO, маркетинг в Самарканде и по всему Узбекистану.",
    images: [
      {
        url: "https://smkweb.com/images/preview.jpg",
        width: 1200,
        height: 630,
        alt: "SMK Web preview",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default SEO;
