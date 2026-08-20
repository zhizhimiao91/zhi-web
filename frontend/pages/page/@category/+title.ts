import type { PageContext } from 'vike/types'
import type { Data } from './+data'

export default (pageContext: PageContext) =>
  `分类：${(pageContext.data as Data).category} - 知知喵的博客`
