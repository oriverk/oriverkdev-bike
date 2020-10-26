import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../utils/posts'

export const config = {
  amp: true
}

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getAllPostsData()
  return {
    props: {
      postsData
    }
  }
}

type Props = {
  postsData: {
    id: string,
    title: string,
    create: string,
    update?: string,
    tags?: string[],
    image?: string
  }[]
}


const Component: React.FC<Props> = ({postsData}) => {
  // import Image from `@public/assets/test/DSC06880.jpg`
  // const Image = require(`@public/assets/test/DSC06880.jpg?webp`)
  return (
    <div className='bg-white rounded-lg p-6'>
      <h1>hello world</h1>
      <div className='posts'>
        {postsData.map(({ id, title, create, update, tags, image }) => (
          <div className='postCard' key={id}>
            <h2>{title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Component