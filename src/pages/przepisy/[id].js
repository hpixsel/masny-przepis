import Layout from '@/components/Layout'
import { getPostBySlug, getAllPosts } from '@/lib/files.js'
import { faMortarPestle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function index({data}) {
  const ingredients = data.frontmatter.ingredients.map(item => <li key={item}>{item}</li>)

  return (
    <Layout>
      <Image src={data.frontmatter.img} className="w-full -mt-14 object-cover max-h-72 md:max-h-96" width={1920} height={1080} alt="home picture" />
      <div className='container'>
        <h2 className="font-bold">{data.frontmatter.title}</h2>
        <p className="text-neutral-400">{data.frontmatter.date}</p>
        <p className="pt-6 font-normal text-neutral-400"><span className='text-white mr-1'>Składniki: </span><FontAwesomeIcon className="mr-2" icon={faMortarPestle} />{data.frontmatter.ingredients.length}</p>
        <ul className='ml-1 text-neutral-300'>
          {ingredients}
        </ul>
        <hr className='mt-9' />
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