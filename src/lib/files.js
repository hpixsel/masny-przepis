import matter from 'gray-matter'
import fs from "fs"
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'src', 'content')

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { frontmatter: { ...data }, slug: realSlug, content }
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = slugs.map((slug) => getPostBySlug(slug))

  posts.sort((a, b) => (a.frontmatter.date > b.frontmatter.date) ? -1 : 1).reverse()

  return posts
}