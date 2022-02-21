var {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu
} = require('discord.js')
module.exports = {
  name: "setup-music",
  category: "⚙️ Settings",
  aliases: ["setupmusic"],
  cooldown: 10,
  usage: "setup-music #Channel",
  description: "Setup a Music Request Channel",
  memberpermissions: ["ADMINISTRATOR"],
  type: "music",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //first declare all embeds
    var embeds = [
      new MessageEmbed()
      .setColor(es.color)
      .setTitle(`📃 Queue of __${message.guild.name}__`)
      .setDescription(`**Currently there are __0 Songs__ in the Queue**`)
      .setThumbnail(message.guild.iconURL({
        dynamic: true
      })),
      new MessageEmbed()
      .setColor(es.color)
      .setFooter(es.footertext, message.guild.iconURL({
        dynamic: true
      }))
      .setImage(message.guild.banner ? message.guild.bannerURL({
        size: 4096
      }) : "https://cdn.discordapp.com/attachments/832180255103385650/864897921111556106/201173413_866341743955269_1227472870529417108_n.png")
      .setTitle(`Start Listening to Music, by connecting to a Voice Channel and sending either the **SONG LINK** or **SONG NAME** in this Channel!`)
      .setDescription(`> *I support <:Youtube:840260133686870036> Youtube, <:Spotify:846090652231663647> Spotify, <:soundcloud:825095625884434462> Soundcloud and direct MP3 Links!*`)
    ]
    var Emojis = [
      "0️⃣",
      "1️⃣",
      "2️⃣",
      "3️⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "🔟",
      "🟥",
      "🟧",
      "🟨",
      "🟩",
      "🟦",
      "🟪",
      "🟫",
    ]
    //now we add the components!
    var components = [
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
        .setCustomId("MessageSelectMenu")
        .addOptions(["Pop", "Strange-Fruits", "Gaming", "Chill", "Rock", "Jazz", "Blues", "Metal", "Magic-Release", "NCS | No Copyright Music", "Default"].map((t, index) => {
          return {
            label: t.substr(0, 25),
            value: t.substr(0, 25),
            description: `Load a Music-Playlist: "${t}"`.substr(0, 50),
            emoji: Emojis[index]
          }
        }))
      ]),
      new MessageActionRow().addComponents([
        new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji(`⏭`).setLabel(`Skip`).setDisabled(),
        new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji(`🏠`).setLabel(`Stop`).setDisabled(),
        new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸').setLabel(`Pause`).setDisabled(),
        new MessageButton().setStyle('SUCCESS').setCustomId('Autoplay').setEmoji('🔁').setLabel(`Autoplay`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Shuffle').setEmoji('🔀').setLabel(`Shuffle`).setDisabled(),
      ]),
      new MessageActionRow().addComponents([
        new MessageButton().setStyle('SUCCESS').setCustomId('Song').setEmoji(`🔁`).setLabel(`Song`).setDisabled(),
        new MessageButton().setStyle('SUCCESS').setCustomId('Queue').setEmoji(`🔂`).setLabel(`Queue`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Forward').setEmoji('⏩').setLabel(`+10 Sec`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Rewind').setEmoji('⏪').setLabel(`-10 Sec`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Lyrics').setEmoji('📝').setLabel(`Lyrics`).setDisabled(),
      ]),
    ]
    let channel = message.mentions.channels.first();
    if (!channel) return message.reply(":x: **You forgot to ping a Text-Channel!**")
    //send the data in the channel
    channel.send({
      embeds,
      components
    }).then(msg => {
      client.musicsettings.set(message.guild.id, channel.id, "channel");
      client.musicsettings.set(message.guild.id, msg.id, "message");
      //send a success message
      return message.reply(`✅ **Successfully setupped the Music System in:** <#${channel.id}>`)
    });
  },
};

