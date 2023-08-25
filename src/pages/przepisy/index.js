import HeadComponent from '@/components/Head'
import Layout from '@/components/Layout'
import { getAllPosts } from '@/lib/files'
import { faClock, faMortarPestle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
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
      const itemTitle = item.attributes.title.toLowerCase();
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
            item.attributes.ingredients.forEach(item => {
              return allIngredients.push(...item.ingredient)
            })
            return (
              <Link href={"przepisy/" + item.attributes.slug} className="card_width" key={item.attributes.slug}>
                <div className="bg-white/5 rounded-sm overflow-hidden h-full">
                  <div className="relative aspect-video">
                    <Image className="object-cover" src={item.attributes.img.data.attributes.url} alt="" fill />
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="px-3 py-2 font-bold truncate">{item.attributes.title}</h2>
                    <div className="my-2 bg-blue-600 rounded-2xl text-xs mr-3">
                      <p className="px-3 py-1 font-normal text-white whitespace-nowrap flex items-center"><FontAwesomeIcon className="mr-2" icon={faMortarPestle} />{allIngredients.length}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="p-3 pt-0 font-normal text-neutral-400">{item.attributes.date}</p>
                    <p className="text-blue-300 mr-3"><FontAwesomeIcon icon={faClock} className="text-blue-600" /> {item.attributes.time} min</p>
                  </div>
                  <p className="card_desc mx-3 mt-0 mb-4">{item.attributes.description}</p>
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
  const posts = await axios.get('https://strapi-production-f5fc.up.railway.app/api/przepisy?populate[ingredients][populate]=*&populate[img]=*', {
    headers: {
      'Authorization': `bearer ${process.env.API}`
    }
  })

  return {
    props: {
      posts: posts.data.data
    }
  }
}