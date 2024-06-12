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

router.get('login', [LoginController, 'index']).as('login').use(middleware.guest())
router.post('login', [LoginController, 'handle']).as('login.handle').use(middleware.guest())
router.post('logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router.group(() => {
    router.get('dashboard', [DashboardController, 'index']).as('dashboard')
})
    .prefix('admin')
    .as('admin')
    .use(middleware.auth())
