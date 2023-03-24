import got from 'got';

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string
  login: string
  id: number
  name: string
}

export default class AuthenticateUsersService {
  public async execute(code: string) {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
    const accessTokenUrl = 'https://github.com/login/oauth/access_token';

    const accessTokenResponse = await got.post(accessTokenUrl, {
      responseType: 'json',
      searchParams: {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    })

    return accessTokenResponse.body;
  }
}