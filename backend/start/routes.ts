import Route from '@ioc:Adonis/Core/Route'

Route.get('/github/redirect', async ({ ally }) => {
  return ally.use('github').redirect()
})

Route.get('/github/callback', async ({ request }) => {
  const code = request.qs().code;
  return code;
})

Route.post('/authenticate', 'AuthenticateUsersController.handle')