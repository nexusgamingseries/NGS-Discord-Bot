import { WorkerBase } from "./Bases/WorkerBase";

export class DeleteMessageWorker extends WorkerBase {

    protected async Start(commands: string[]) {
        let amountToDelete = 1;
        if (commands.length > 0) {
            let parsedNumber = parseInt(commands[0])
            if (!isNaN(parsedNumber)) {
                amountToDelete = parsedNumber;
            }
        }

        var message = (await this.messageSender.SendMessage(`would you like me to delete my last ${amountToDelete} message${(amountToDelete > 1 && 's?') || '?'}`, false)).Message;
        message.react('✅');
        const filter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name) && user.id === this.messageSender.originalMessage.author.id;
        };

        try {
            await message.awaitReactions({ filter, max: 1, time: 3e4 });
            this.messageStore.DeleteMessage(amountToDelete);
            message.delete();
            this.messageSender.originalMessage.delete();
        }
        catch
        {

        }
    }
}