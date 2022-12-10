import React from "react";
import Head from "next/head";
import seo from '@/configs/seo';

function SEO(props) {
	const url = props.url || seo.url;
	const title = props.title ? `${props.title}` : seo.title;
	const favicon = seo.favicon;
	const description = props.description || seo.description;
	const author = seo.author;
	const keywords = props.keywords || seo.keywords;
	const image = props.image || seo.image;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      
      {/* title */}
      <title>{title}</title>
      <meta property='og:title'  content={title} />
      <meta name='twitter:title' content={title} />

      {/* url */}
      <link rel='canonical'       href={url}/>
      <meta property='og:url'  content={url}/>
      <meta name='twitter:url' content={url}/>
      
      {/* description */}
      <meta name='description'         content={description}/>
      <meta property='og:description'  content={description}/>
      <meta name='twitter:description' content={description}/>
      
      {/* image */}
      <meta property="og:image"  content={image}/>
      <meta name="twitter:image" content={image}/>

      {/* keywords */}
      {keywords && keywords.length && (
        <meta key="keywords" name="keywords" content={keywords.join(",")} />
      )}

      {/* icon */}
      <link rel="icon" href={favicon.icon} />
      <meta name="author" content={author} />
    </Head>
  );
}

export default SEO;
