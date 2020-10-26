import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getTags } from '../../utils/posts'

export const config = {
  amp: true
}

export const getStaticProps: GetStaticProps = async () => {
  const tags: string[] = getTags()
  return {
    props: {
      tags
    }
  }
}

type Props = {
  tags: string[]
}

const Component: React.FC<Props> = ({tags}) => {
  return (
    <article className='content'>
      <h1>Blog Tags</h1>
      <div className='tags'>
        {tags.map((tag) => (
          <Link href={`/tags/${tag}/`} key={tag}>
            <a className='tag'>{tag}</a>
          </Link>
        ))}
      </div>
    </article>
  )
}

export default Component
