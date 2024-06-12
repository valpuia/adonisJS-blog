/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const DashboardController = () => import('#controllers/admin/dashboard_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.on('/').render('pages/welcome')

router.get('login', [LoginController, 'index']).as('login')
router.post('login', [LoginController, 'handle']).as('login.handle')
router.post('logout', [LogoutController, 'handle']).as('logout')

router.group(() => {
    router.get('dashboard', [DashboardController, 'index']).as('dashboard')
})
    .prefix('admin')
    .as('admin')
    .use(middleware.auth())
