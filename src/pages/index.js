import ReactMarkdown from "react-markdown"
import Layout from "@/components/Layout"
import { getPostBySlug, getAllPosts } from '@/lib/files.js'
import Image from "next/image"
import Link from "next/link"

export default function Home({posts}) {
  console.log(posts)
  const random = Math.floor(Math.random() * posts.length)
  return (
    <Layout>
      <Link href={posts[random].slug} className="relative z-0">
        <p className="text-5xl font-semibold drop-shadow-2xl bg-neutral-800/40 px-3 py-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">{posts[random].frontmatter.title}</p>
        <Image src={posts[random].frontmatter.img} className="w-full -mt-14 object-cover max-h-72 md:max-h-96" width={1920} height={1080} alt="home picture" />
      </Link>
      <div className="container">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit consequatur cupiditate reprehenderit vero atque vitae obcaecati quas excepturi, unde inventore perferendis consectetur molestias officiis id illum ab laboriosam nemo ipsum! Dicta quidem in nihil dignissimos? Perferendis, nesciunt fugit? Ipsam impedit tempore soluta, quisquam omnis laudantium eius excepturi sapiente nulla dolores corrupti quae iusto itaque fugiat voluptatem cum numquam quia eaque iste mollitia? Eligendi nobis quasi eum, omnis impedit accusamus nisi incidunt laudantium, officia sit quidem! Voluptas, ducimus tempora modi quam eos minima culpa at, impedit accusantium, odio nemo. Magni explicabo quos sequi aliquam quasi optio, quas mollitia aut? Architecto perferendis distinctio voluptate odit magni est necessitatibus, deserunt quo voluptatibus culpa obcaecati tempora repellendus adipisci quidem facilis repellat numquam explicabo maiores vitae unde beatae inventore quasi velit quisquam? Ipsum error ab magnam molestias libero hic vero? Sit eligendi nesciunt, excepturi cumque, magnam blanditiis qui accusamus illum earum debitis non quaerat est vel molestiae dolorem dicta officia necessitatibus possimus architecto voluptas atque! Voluptate ab vitae vero consectetur temporibus dolor praesentium saepe ex molestiae quod fugiat nesciunt quisquam in ratione aliquam fuga, odit aut culpa aliquid, dolore, rem recusandae repellat. Amet dicta velit expedita quam recusandae. Sint quis, voluptates odit dolores officiis consequatur, saepe voluptatem repellat, nihil laboriosam provident optio ab ipsum perferendis eaque porro earum. Amet, quidem dolorem. Ratione, at! Harum repudiandae vitae tempore veritatis, expedita id vero magnam modi. Vero nihil eveniet impedit veniam magnam error repellat ea eaque enim at eius ab qui voluptates facere illo, incidunt maiores? Labore nisi soluta sapiente unde facere! Illum possimus omnis ipsam facere laudantium aperiam dignissimos nam sint ullam vero error tempore veniam molestiae odio laborum non harum numquam eum eius suscipit dicta, ex nihil voluptatum? Distinctio animi molestiae reiciendis atque excepturi accusantium assumenda quibusdam aliquam ad, necessitatibus vitae consectetur ipsa, impedit dolorum, debitis voluptas? Dolores inventore deserunt quo cumque odio fuga obcaecati ipsa, praesentium iusto ea, a quisquam porro et necessitatibus voluptatibus placeat expedita qui. Minus recusandae cum soluta blanditiis, aliquam nobis nulla esse ratione officia. Corrupti blanditiis, iure repudiandae autem pariatur sapiente cum, est nihil veritatis, ratione voluptatum nobis ab facere accusantium nisi sed temporibus molestias voluptas voluptates magni illum consequuntur. Veritatis quos vitae, quasi numquam dolor modi iure debitis accusantium incidunt doloribus consequuntur, vero, aliquid ipsum similique est voluptatem tenetur laborum corrupti eveniet? Tempora similique voluptatem aspernatur saepe vitae in, voluptas explicabo totam nemo ut impedit, iure illum tenetur. Pariatur, quas doloribus saepe fugiat consectetur accusamus amet quasi, nobis odit repellendus non culpa architecto eius inventore totam ab? Assumenda delectus natus nostrum voluptatem, dignissimos aperiam ullam, architecto ea repudiandae voluptates corrupti rerum, officia laboriosam quam expedita. Reprehenderit, magni quas aliquam exercitationem, perferendis repellat et laborum assumenda minus excepturi labore possimus similique ea maxime, eaque reiciendis placeat impedit voluptates! Velit modi illo repellendus tempore ullam iusto, omnis magnam libero nobis commodi! Eius illo quasi quis nulla, quae inventore eum et nostrum voluptatibus enim asperiores id nam possimus vel tempore sit harum dolorum temporibus natus maiores officiis ut porro sed cum! Corporis, facere.
      </div>
      
      {/* {posts.map(item => {
        return (
          <div key={item.slug}>
            <h2 className="text-xl">{item.frontmatter.title}</h2>
            <p>{item.slug}</p>
            <p>{item.frontmatter.date}</p>
            <ul>
              {item.frontmatter.ingredients.map(ingredient => (<li key={ingredient}>{ingredient}</li>))}
            </ul>
            <ReactMarkdown>
              {item.content}
            </ReactMarkdown>
          </div>
        )
      })} */}
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