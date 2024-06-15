import Blog from '#models/blog'
import { blogValidator } from '#validators/blog'
import string from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogsController {

  async index({ view }: HttpContext) {
    const blogs = await Blog.query()
      .select(['id', 'title', 'excerpt', 'createdAt', 'userId'])
      .preload('user', (query) =>  {
        query.select(['id', 'fullName'])
      })
      .orderBy('createdAt', 'desc')

    return view.render('pages/admin/blogs/index', { blogs })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/blogs/create')
  }

  async store({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(blogValidator)

    // @todo: provide unique slug
    const blogData = {...data, slug: string.slug(data.title, {lower: true}), userId: auth.user!.id}

    await Blog.create(blogData)

    return response.redirect().toRoute('admin.blogs.index')
  }

  async edit({ params, view }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)    

    return view.render('pages/admin/blogs/edit', { blog })
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(blogValidator)

    const blog = await Blog.findOrFail(params.id)
    await blog.merge(data).save()

    return response.redirect().toRoute('admin.blogs.index')
  }

  async destroy({ params, response }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)

    await blog.delete()

    return response.redirect().back()
  }

}