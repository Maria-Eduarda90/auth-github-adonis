/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/github/redirect', async ({ ally }) => {
  return ally.use('github').redirect()
})

Route.get('/github/callback', async ({ ally, request }) => {
  const github = ally.use('github')
  
  if (github.accessDenied()) {
    return 'Access was denied'
  }

  if (github.hasError()) {
    return github.getError()
  }

  const code = request.qs().code;
  console.log('code: ', code);
  return { hello: `${code}` }

  // const user = await github.user()
})
