import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

Route.get('/github/redirect', async ({ ally }: HttpContextContract) => {
  return ally.use('github').redirect();
})

Route.get('/github/callback', async ({ request }: HttpContextContract) => {
  const code = request.qs().code;
  return code;
})

Route.post('/authenticate', 'AuthenticateUsersController.handle');
Route.post('/messages', 'CreateMessagesController.handle').middleware('auth');