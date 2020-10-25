export const config = {
  amp: false
}

const Component: React.FC = () => {
  // import Image from `@public/assets/test/DSC06880.jpg`
  const Image = require(`@public/assets/test/DSC06880.jpg?webp`)
  return (
    <div className='bg-white rounded-lg p-6'>
      <h1>hello world</h1>
      <div>
        <img src={Image} alt='test' />
      </div>
    </div>
  )
}

export default Component