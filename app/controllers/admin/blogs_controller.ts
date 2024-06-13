import type { HttpContext } from '@adonisjs/core/http'

export default class BlogsController {

  async index({ view }: HttpContext) {
    return view.render('pages/admin/blogs/index')
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/blogs/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

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