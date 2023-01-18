import React from 'react'
import Head from 'next/head'

export default function HeadComponent({title, desc, url, img}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="author" content="Kacper Adamus" />
      <meta name="copyright" content="AdamusDev 2023" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      {url && <meta property="og:url" content={url} />}
      {img && <meta property="og:image" content={img} />}
    </Head>
  )
}
