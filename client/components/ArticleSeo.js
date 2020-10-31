import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';

const ArticleSeo = ({ title, description, publishedAt, url, authorName }) => {
  return (
    <>
      <NextSeo
        title={`${title} – Kodkoda`}
        description={description}
        canonical={url}
        openGraph={{
          type: 'faq',
          article: {
            publishedTime: publishedAt,
          },
          url,
          title,
          description,
        }}
      />
      <ArticleJsonLd
        authorName={authorName}
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={description}
        images={[]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="kodkoda"
        title={title}
        url={url}
      />
    </>
  );
};

export default ArticleSeo;
