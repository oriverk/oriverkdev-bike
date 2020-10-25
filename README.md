## oriverkdev bike site
react, nextjs, amp, typescript, tailwindcss, markdown

plz visit https://bike.oriverk.dev . If u find some bugs, plz feel free to report and make issue [here](https://github.com/oriverk/oriverkdev-bike/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)


### what i did
1. setup react, next, typescript

```
yarn add react react-dom next typescript @types/react @types/react-dom @types/node
touch tsconfig.json
```

2. setup css
tailwindcss is too much big to use that under amp. So use postcss, purgecss, cssnano. Usually we add css into _app.jsx with styled-jsx. But when wanna add .css as global, it must be added as literal in _document.jsx and use raw-loader.

```
yarn add tailwindcss
yarn add --dev @fullhuman/postcss-purgecss postcss-import postcss-cli postcss-preset-env raw-loader cssnano
touch postcss.config.js
```

- reference
  - [How to use tailwindcss with AMP in a Next.js project](https://dev.to/geekplux/how-to-use-tailwindcss-with-amp-in-a-next-js-project-1f97)
  - [next.js の amp モードで tailwind.css を purgecss と合わせて使う](https://mizchi.dev/next-amp-tailwind-postcss)

In the first reference, postcss.config.js uses require() for plugins but this makes [Error: A PostCSS Plugin was passed as a function using require(), but it must be provided as a string.]. So I replace theme with string [like this issue comment](https://github.com/vercel/next.js/issues/10117#issuecomment-574892000).

3. setup tailwindcss for dark theme
  
```
yarn tailwindcss init
```
```js
# tailwindcss.config.js
module.exports = {
  // ...,
  theme: {
    extend: { 
      screens: { 'dark': { 'raw': '(prefers-color-scheme: dark)' }, }
    },
  },
  // ...
}
```

4. setup image optimization library and plugins
use 




