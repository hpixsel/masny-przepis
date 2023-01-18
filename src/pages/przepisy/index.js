import Layout from '@/components/Layout'
import { getAllPosts } from '@/lib/files'
import { faMortarPestle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default function index({posts}) {
  return (
    <Layout>
      <div className="container">
        <div className="grid p-2 gap-6 md:grid-cols-2 md:px-0 md:py-6 md:gap-9 xl:grid-cols-3">
          {posts.map(item => {
            return (
              <Link href={"przepisy/" + item.slug} key={item.slug}>
                <div className="bg-white/5 rounded-sm overflow-hidden">
                  <div className="relative aspect-video">
                    <Image className="object-cover" src={item.frontmatter.img} alt="" fill />
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="px-3 py-2 font-bold">{item.frontmatter.title}</h2>
                    <div className="bg-blue-600 rounded-2xl text-xs mr-3">
                      <p className="px-3 py-1 font-normal text-white"><FontAwesomeIcon className="mr-2" icon={faMortarPestle} />{item.frontmatter.ingredients.length}</p>
                    </div>
                  </div>
                  <p className="p-3 pt-0 font-normal text-neutral-400">{item.frontmatter.date}</p>
                  <p className="card_desc mx-3 mt-0 mb-4">{item.frontmatter.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts()

  return {
    props: {
      posts: allPosts
    }
  }
}