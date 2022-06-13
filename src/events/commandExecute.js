module.exports = class {
    constructor(client) {
        this.client = client;
        this.eventName = "messageCreate";
    }

    async run(message) {
        try {
            if (!message.guild || message.author.bot === true) return;

            let defaultPrefix = this.client.config.defaultPrefix;
            if (message.mentions.has(this.client.user) || message.content.startsWith(defaultPrefix)) {
                let args;
                let commandName;
                let command;

                if (message.mentions.has(this.client.user)) {
                    args = message.content.slice(`<@!968684274570117173>`.length).trim().split(/ +/g);
                    commandName = args.shift().toLowerCase();
                } else if (message.content.startsWith(defaultPrefix)) {
                    args = message.content.slice(defaultPrefix.length).trim().split(/ +/g);
                    commandName = args.shift().toLowerCase();
                }

                if (commandName.length == 0 && message.mentions.has(this.client.user)) return message.reply(`Olá! Meu prefixo aqui é **${defaultPrefix}**.`).catch(() => { });
                else if (commandName.length == 0) return

                command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName))
                if (command) try { command.run({ message, args }); } catch (error) { console.log(error); console.log(`\x1b[91m[Commands] Ocorreu um erro ao executar o comando ${commandName}.\x1b[0m`) }
            }
        } catch (error) {
            if (error) console.error(error);
        }
    }
};