import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateMessageService from 'App/Services/CreateMessageService'

export default class CreateMessagesController {
  public async handle({ request }: HttpContextContract) {
    const { message, user_id } = request.body();

    const service = new CreateMessageService();

    const result = await service.execute(message, user_id);

    return result;
  }
}
