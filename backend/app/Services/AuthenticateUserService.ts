import got from 'got';

interface IAccessToken {
  access_token: string
}

interface IUser {
  avatar_url: string
  login: string
  id: number
  name: string
}

export default class AuthenticateUsersService {
  public async execute(code: string) {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
    const accessTokenUrl = 'https://github.com/login/oauth/access_token';
    const userApiUrl = 'https://api.github.com/user';

    const { body: accessTokenResponse } = await got.post<IAccessToken>(accessTokenUrl, {
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

    const response = await got.get<IUser>(userApiUrl, {
      responseType: 'json',
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    })

    return response.body;
  }
}