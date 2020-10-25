// @ts-ignore
import outputcss from '!raw-loader!../styles/output.css'
// @ts-ignore
import tailwindcss from '!raw-loader!../styles/tailwind.min.css'
const cssFile = process.env.NODE_ENV === 'production' ? outputcss : tailwindcss

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = ctx.renderPage((App) => (props) => <App {...props} />)
    const initialProps: any = await Document.getInitialProps(ctx)
    return {
      ...page,
      style: [
        ...initialProps.styles,
        <style
          key='custom'
          dangerouslySetInnerHTML={{
            __html: cssFile
          }}
        />
      ],
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head></Head>
        <body>
          <Main />
          < NextScript />
        </body>
      </Html>
    )
  }
}