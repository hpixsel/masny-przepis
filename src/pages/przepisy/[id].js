import HeadComponent from '@/components/Head'
import Layout from '@/components/Layout'
import { getPostBySlug, getAllPosts } from '@/lib/files.js'
import { faMortarPestle, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function index({data}) {
  const ingredients = data.frontmatter.ingredients.map(item => {
    return (
      <div className="mt-6" key={item.part.name}>
        <div className="flex gap-3">
          <h3 className='text-lg font-bold'>{item.part.name}</h3>
          <p><FontAwesomeIcon icon={faMortarPestle} className="text-blue-600 mr-1" /> {item.part.partIngredients.length}</p>
        </div>
        <ul>
          {item.part.partIngredients.map(ingredient => {
            return (
              <li key={ingredient}>{ingredient}</li>
            )
          })}
        </ul>
      </div>
    )
  })

  return (
    <Layout>
      <HeadComponent title={data.frontmatter.title} desc={data.frontmatter.description} url={"www.masnyprzepis.netlify.app/przepisy/" + data.slug} img={data.frontmatter.img} />
      <Image src={data.frontmatter.img} className="w-full -mt-14 object-cover max-h-72 md:max-h-96 blur-sm" width={1920} height={1080} alt="home picture" />
      <div className='container'>
        <h2 className="font-bold">{data.frontmatter.title}</h2>
        <p className="text-neutral-400">{data.frontmatter.date}</p>
        <p className="text-blue-300 mt-3"><FontAwesomeIcon icon={faClock} className="text-blue-600" /> {data.frontmatter.time} min</p>
        {ingredients}
        <hr className='mt-9 border-blue-600' />
        <ReactMarkdown className='mt-9'>
          {data.content}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const allPosts = getAllPosts()
  const allPaths = allPosts.map(item => {
    return {
      params: {
        id: item.slug
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
  const post = getPostBySlug(id)
  return {
    props: {
      data: post
    }
  }
}