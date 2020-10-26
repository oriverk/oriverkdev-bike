import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getTags, getTagPosts } from '../../utils/posts'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = getTags().map((tag) => {
    return `/tags/${encodeURI(tag)}/`
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string
  const postsData = getTagPosts(decodeURI(tag) as string)
  return {
    props: {
      tag,
      postsData
    }
  }
}

type Props = {
  tag: string,
  postsData: {
    id: string,
    title: string,
    create: string,
    update: string,
    tags?: string[],
    image?: string
  }[]
}

const Componet: React.FC<Props> = ({ tag, postsData }) => {
  return (
    <article className='content'>
      <h1>{`${tag} Posts`}</h1>
      <div className='posts'>
        {postsData.map(({ id, title, create, update, tags, image }) => (
          <div className='postCard' key={id}>
                  <h2>{title}</h2>
            <div className='tags'>
              {tags.map((tag) => (
                <Link href={`/tags/${tag}/`} key={tag}>
                  <a className='tag' key={tag}>{tag}</a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default Componet