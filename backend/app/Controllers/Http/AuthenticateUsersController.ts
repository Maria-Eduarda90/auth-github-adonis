import AuthenticateUsersService from "App/Services/AuthenticateUserService";

export default class AuthenticateUsersController {
  public async handle({ request }) {

    const { code } = request.requestBody;
    
    const service = new AuthenticateUsersService();
    const result = await service.execute(code);

    return result;
  }
}
