import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { verify } from 'jsonwebtoken';

interface Ipayload {
  sub: string;
}

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authToken = request.headers().authorization;

    if(!authToken){
      return response.status(401).json({
        errorCode: 'token.invalid'
      });
    };

    const [, token] = authToken.split(" ");

    try{
      const { sub } = verify(token, process.env.JWT_SECRET as string) as Ipayload;

      request.body().user_id = sub;

      await next();
    } catch (err){

      return response.status(401).json({
        errorCode: 'token.expired'
      });
    }
  }
}
