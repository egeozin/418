const title = 'Kod Koda – Programcılar için soru cevap platformu.';
const description =
  'Geliştiricilerin birbirine yardım ettiği platform. Javascript, Typescript, CS50';

const SEO = {
  title,
  description,
  canonical: 'https://kodkoda.com/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://kodkoda.com/',
    title,
    description,
    images: [
      {
        url: '/static/favicons/customImage',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
