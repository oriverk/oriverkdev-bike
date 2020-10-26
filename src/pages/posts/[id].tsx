import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostsId, getPostData } from '../../utils/posts'

export const config = {
  amp: true
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = getPostData(params.id as string)
  const { id, title, create, update, tags, image, content } = postData
  return {
    props: {
      id, title, create, update, tags, image, content
    }
  }
}

type Props = {
  id: string,
  title: string,
  create: string,
  update?: string,
  tags?: string[],
  image?: string,
  content: string
}

const Component: React.FC<Props> = ({ id, title, create, update, tags, image, content }) => {
  return (
    <article className='markdown content'>
      <h1>title: {title}</h1>
      <div>id: {id}</div>
      <div>created at {create}</div>
      <div>updated at {update}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} className='markdown' />
    </article>
  )
}

export default Component