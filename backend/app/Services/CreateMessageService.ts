import Message from "App/Models/Message";

export default class CreateMessageService{
    public async execute(text: string, user_id: number){
        const message = await Message.create({
            text,
            user_id,
        });
        
        await message.load('user');

        return message;
    } 
}