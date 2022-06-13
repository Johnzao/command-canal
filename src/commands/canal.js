const { MessageEmbed } = require("discord.js");
const axios = require("axios")

module.exports = class Canal {
    constructor(client) {
        this.client = client;
        this.name = "canal";
        this.aliases = ["channel", "ch"];

        this.ownerOnly = false;
    }

    async run({ message, args, prefix }) {
        try {
            const Youtube = new (require("simple-youtube-api"))(this.client.config.youtubeAPI)
            let url = args[0]
            if (!url) return message.reply(`É preciso informar o URL do canal!`)

            let canal = await Youtube.getChannel(url).catch(() => { })
            if (!canal) return message.reply("O URL informado está incorreto! Envie-o corretamente.")
            let YoutubeChannel = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${canal.raw.id}&key=${this.client.config.youtubeAPI}`)
            let subs = YoutubeChannel.data.items[0].statistics.subscriberCount.replace("0", "O canal não possuí inscritos!");
            let views = YoutubeChannel.data.items[0].statistics.viewCount.replace("0", "Nenhuma view.");
            let videosPostados = YoutubeChannel.data.items[0].statistics.videoCount.replace("0", "O canal não possuí nenhum vídeo postado.")
            let channelName = canal.raw.snippet.title;
            let thumbnailChannel = canal.thumbnails.medium.url;
            let country = canal.raw.snippet.country.replace("BR", "🇧🇷 Brasileiro").replace("EN", "🇺🇸 Americano");
            let channelDescription = canal.raw.snippet.description;

            let embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`Segue abaixo as informações do canal \`${channelName}\`:`)
                .addField(`👥 Nome do canal:`, `${channelName}`, true)
                .addField(`🚶‍♂️ Quantidade de inscritos:`, `${subs}`, true)
                .addField(`📝 Quantidade de views de todos os vídeos:`, `${views}`, true)
                .addField(`📦 Quantidade de vídeos postados:`, `${videosPostados}`, true)
                .addField(`🏳️ Nacionalidade:`, `${country}`, true)
                .addField(`📇 Descrição do canal:`, `${channelDescription}`, true)
                .setThumbnail(`${thumbnailChannel}`)
                .setFooter({ text: `Utilize o comando com moderação!`, iconURL: `https://cdn.discordapp.com/emojis/974032157708271706.webp?size=96&quality=lossless` })
                .setTimestamp();
            message.reply({ embeds: [embed] })
        } catch (error) {
            console.log(error);
            console.log(`\x1b[91m[Commands] Ocorreu um erro ao executar o comando ${this.name}.js\x1b[0m`)
        }
    }
}