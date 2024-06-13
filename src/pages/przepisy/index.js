import HeadComponent from '@/components/Head'
import Layout from '@/components/Layout'
import { getAllPosts } from '@/lib/files'
import { faClock, faMortarPestle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Przepisy({posts}) {
  const [search, setSearch] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(posts)
  
  const handleChange = event => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    setFilteredPosts(posts.filter(item => {
      const itemTitle = item.frontmatter.title.toLowerCase();
        if (itemTitle.includes(search.toLowerCase())) {
          return item;
        }
    }))
  }, [search, posts])

  return (
    <Layout>
      <HeadComponent title="Wszystkie przepisy" desc="Wszystkie zapisane przepisy na stronie" />
      <div className="container">
        <div className="mx-2 relative md:w-1/2 md:mx-auto md:my-9">
          <FontAwesomeIcon className='absolute mt-4 right-2 text-neutral-400' icon={faSearch} />
          <input className='bg-neutral-800 w-full mt-2 mb-3 rounded-sm p-1' id='Search' onChange={e => handleChange(e)} type="text" />
        </div>
        <div className="grid p-2 gap-6 md:grid-cols-2 md:px-0 md:py-6 md:gap-9 xl:grid-cols-3">
          {filteredPosts.map(item => {
            const allIngredients = []
            item.frontmatter.ingredients.map(item => {
              return allIngredients.push(...item.part.partIngredients)
            })
            return (
              <Link href={"przepisy/" + item.slug} className="card_width" key={item.slug}>
                <div className="bg-white/5 rounded-sm overflow-hidden h-full">
                  <div className="relative aspect-video">
                    <Image className="object-cover" src={item.frontmatter.img} alt="" fill />
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="px-3 py-2 font-bold truncate">{item.frontmatter.title}</h2>
                    <div className="my-2 bg-blue-600 rounded-2xl text-xs mr-3">
                      <p className="px-3 py-1 font-normal text-white whitespace-nowrap flex items-center"><FontAwesomeIcon className="mr-2" icon={faMortarPestle} />{allIngredients.length}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="p-3 pt-0 font-normal text-neutral-400">{item.frontmatter.date}</p>
                    {item.frontmatter.time > 0 && <p className="text-blue-300 mr-3"><FontAwesomeIcon icon={faClock} className="text-blue-600" /> {item.frontmatter.time} min</p>}
                  </div>
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