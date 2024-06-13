import Blog from '#models/blog'
import { createBlogValidator } from '#validators/blog'
import string from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogsController {

  async index({ view }: HttpContext) {
    return view.render('pages/admin/blogs/index')
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/blogs/create')
  }

  async store({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(createBlogValidator)

    // @todo: provide unique slug
    const blogData = {...data, slug: string.slug(data.title, {lower: true}), userId: auth.user!.id}

    await Blog.create(blogData)

    return response.redirect().toRoute('admin.blogs.index')
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }

}