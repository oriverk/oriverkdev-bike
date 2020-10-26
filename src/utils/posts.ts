import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { mdParse } from './md-parser'

const docsDir = path.join(process.cwd(), 'src/docs')

// for src/index.tsx and other funcs
export function getAllPostsData() {
  const fileNames = fs.readdirSync(docsDir)
  const allPostsData = fileNames.map(name => {
    const id = name.replace(/\.md?$/, '')
    const fullPath = path.join(docsDir, name)
    const contents = fs.readFileSync(fullPath, 'utf8')
    const result = matter(contents)

    const title: string = result.data.title || ''
    const tags: string[] = result.data.tags || ''
    const create: string = result.data.create || ''
    const update: string = result.data.update || ''
    const image: string = result.data.image || ''
    const content: string = result.content || ''
    return {
      id, title, tags, create, update, image, content
    }
  })
  return allPostsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

// fot getStaticPaths in src/posts/[id].tsx
export function getAllPostsId() {
  const allPostsData = getAllPostsData()
  return allPostsData.map(data => {
    return {
      params: {
        id: data.id
      }
    }
  })
}

// for getStaticProps in src/posts/[id].tsx
export function getPostData(id: string) {
  const allPostsData = getAllPostsData()
  const postData = allPostsData.find(data => data.id === id)
  const { title, create, update, tags, image } = postData
  const content: string = mdParse(postData.content).toString()
  
  return {
    id, title, create, update, tags, image, content
  }
}

// for getStaticProps in /src/tags/index.tsx
export function getTags(): string[]{
  const allPostsData = getAllPostsData()
  let tags: string[] = []
  allPostsData.forEach(data => {
    tags = tags.concat(data.tags)
  })
  const setTags = [...new Set(tags)]

  return setTags.sort()
}

// for getStaticProps in /src/tags/[tag].tsx
export function getTagPosts(tag: string): {} {
  const allPostsData = getAllPostsData()
  const tagPostsData = allPostsData.filter(data => (
    data.tags.includes(tag)
  ))
  const postsData = tagPostsData.map((data) => {
    const { id, title, create, update, tags, image } = data
    return {
      id, title, create, update, tags, image
    }
  })

  return postsData
}