import got from 'got';
import { sign } from 'jsonwebtoken'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthenticateUsersService {
  public async execute(code: string) {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET } = process.env
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
    });

    const { login, id, avatar_url, name } = response.body;

    let user = await Database.from('users').where('github_id', id).first();

    if(!user){
      const createdUser = await Database.table('users').insert({
        github_id: id,
        login,
        avatar_url,
        name,
      });

      user = await Database.from('users').where('id', createdUser[0]).first();
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      JWT_SECRET as string,
      {
        subject: String(user.id),
        expiresIn: '1d',
      }
    )
    return { token, user };
  }
}