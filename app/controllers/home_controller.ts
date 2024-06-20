// import type { HttpContext } from '@adonisjs/core/http'

import Blog from "#models/blog"
import { HttpContext } from "@adonisjs/core/http"

export default class HomeController {

    async index({ view }: HttpContext) {
        const blogs = await Blog.query()
        .select(['id', 'title', 'excerpt', 'createdAt', 'userId'])
        .preload('user', (query) =>  {
            query.select(['id', 'fullName'])
        })
        .orderBy('createdAt', 'desc')

        return view.render('pages/welcome', { blogs })
    }

}