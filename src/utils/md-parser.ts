import { md } from './markdown-it'

export function mdParse(text: string) {
  return md.render(text)
}
