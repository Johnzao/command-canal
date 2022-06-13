
const c = require("colors")

module.exports = class {
    constructor(client) {
        this.client = client;
        this.eventName = "ready";
    }
    async run() {
        let server = await this.client.guilds.cache.get(this.client.config.configGeral.guildId)
        const getRandomRichPresence = (size) => [`📪 | Estamos com ${size} membros e ${server.premiumSubscriptionCount} impulsos!`, `⚡ | Divertindo nossos jogadores!`][Math.floor(Math.random() * 2)]
        const updatedRichPresence = () => {
            let msg = getRandomRichPresence(this.client.users.cache.size);
            this.client.user.setActivity(msg, {
                game: {
                    type: 1
                }
            });

        }
        setInterval(updatedRichPresence, 1000 * 10);
        let finishedAt = performance.now();
        let time = (parseFloat(finishedAt - this.client.startedAt).toFixed(2)).replace(".00", "");
        console.log(`\x1b[38;5;75m✔ [${this.client.user.username}] Conexão com o Discord efetuada em ${time}ms\x1b[0m`);
    }
}