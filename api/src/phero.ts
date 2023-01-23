import { createService } from '@phero/server'

import * as articleFunctions from "./article/article"

export const articleService = createService({
  getArticle: articleFunctions.getArticle,
  listArticles: articleFunctions.getArticles
});