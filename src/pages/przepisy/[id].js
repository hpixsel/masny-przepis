import HeadComponent from '@/components/Head'
import Layout from '@/components/Layout'
import { getPostBySlug, getAllPosts } from '@/lib/files.js'
import { faMortarPestle, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function index({data}) {
  const ingredients = data[0].attributes.ingredients.map(item => {
    return (
      <div className="mt-6" key={item.name}>
        <div className="flex gap-3">
          <h3 className='text-lg font-bold'>{item.name}</h3>
          <p><FontAwesomeIcon icon={faMortarPestle} className="text-blue-600 mr-1" /> {item.ingredient.length}</p>
        </div>
        <ul>
          {item.ingredient.map(ingredient => {
            return (
              <li key={ingredient.ingredient}>{ingredient.ingredient}</li>
            )
          })}
        </ul>
      </div>
    )
  })

  return (
    <Layout>
      <HeadComponent title={data[0].attributes.title} desc={data[0].attributes.description} url={"www.masnyprzepis.netlify.app/przepisy/" + data[0].attributes.slug} img={data[0].attributes.img.data.attributes.url} />
      <Image src={data[0].attributes.img.data.attributes.url} className="w-full -mt-14 object-cover max-h-72 md:max-h-96 blur-sm" width={1920} height={1080} alt="home picture" />
      <div className='container'>
        <h2 className="font-bold">{data[0].attributes.title}</h2>
        <p className="text-neutral-400">{data[0].attributes.date}</p>
        <p className="text-blue-300 mt-3"><FontAwesomeIcon icon={faClock} className="text-blue-600" /> {data[0].attributes.time} min</p>
        {ingredients}
        <hr className='mt-9 border-blue-600' />
        <ReactMarkdown className='mt-9'>
          {data[0].attributes.body}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = await axios.get('https://strapi-production-f5fc.up.railway.app/api/przepisy?populate[ingredients][populate]=*&populate[img]=*', {
    headers: {
      'Authorization': `bearer ${process.env.API}`
    }
  })

  const allPaths = posts.data.data.map(item => {
    return {
      params: {
        id: item.attributes.slug
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const id = context?.params.id

  const posts = await axios.get('https://strapi-production-f5fc.up.railway.app/api/przepisy?populate[ingredients][populate]=*&populate[img]=*', {
    headers: {
      'Authorization': `bearer ${process.env.API}`
    }
  })

  const post = posts.data.data.filter(item => item.attributes.slug == id)

  return {
    props: {
      data: post
    }
  }
}