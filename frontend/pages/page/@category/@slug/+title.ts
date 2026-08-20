import type { PageContext } from 'vike/types'
import type { Data } from './+data'

export default (pageContext: PageContext) =>
  `${(pageContext.data as Data).article.title} - 知知喵的博客`
