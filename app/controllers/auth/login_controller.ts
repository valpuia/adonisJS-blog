import User from '#models/user';
import { loginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {

  async index({ view, auth, response }: HttpContext) {
    if (await auth.check()) {
      return response.redirect().toRoute('admin.dashboard')
    }

    return view.render('pages/auth/login');
  }

  async handle({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    response.redirect().toRoute('admin.dashboard')
  }

}