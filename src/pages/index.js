import Layout from "@/components/Layout"
import { getAllPosts } from '@/lib/files.js'
import Image from "next/image"
import Link from "next/link"
import { faMortarPestle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home({posts}) {
  const random = Math.floor(Math.random() * posts.length)
  const slicedPosts = posts.slice(0, 3)

  return (
    <Layout>
      <Link href={"przepisy/" + posts[random].slug} className="relative z-0">
        <p className="text-5xl font-semibold bg-neutral-800/40 px-3 py-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 rounded-sm">{posts[random].frontmatter.title}</p>
        <Image src={posts[random].frontmatter.img} className="w-full -mt-14 object-cover max-h-72 md:max-h-96" width={1920} height={1080} alt="home picture" />
      </Link>
      <div className="container">
        <h2 className="font-bold mt-6 text-center uppercase">Najnowsze przepisy</h2>
        <div className="grid p-2 gap-6 md:grid-cols-2 md:px-0 md:py-4 md:gap-9 xl:grid-cols-3">
          {slicedPosts.map(item => {
            return (
              <Link href={"przepisy/" + item.slug} key={item.slug}>
                <div className="bg-neutral-800 rounded-md overflow-hidden">
                  <div className="relative aspect-video">
                    <Image className="object-cover" src={item.frontmatter.img} alt="" fill />
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="px-3 pt-2 font-bold">{item.frontmatter.title}</h2>
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
  const posts = getAllPosts()

  return {
    props: {
      posts: posts
    }
  }
}