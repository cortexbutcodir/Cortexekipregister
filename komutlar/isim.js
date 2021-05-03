const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const config = require('../config.json')
const Cortex = require('../cortex.json')

exports.run =  async (client, message, args) => {
    let member = message.mentions.members.first()
    let embed = new MessageEmbed()
    if (!message.guild.owner)  return message.channel.send(embed.setDescription(`${message.author}, Sunucu taç sahibini ismini değiştiremesin!`)) 
    if(!member) return message.channel.send(embed.setDescription(`${message.author}, Bir @kişi/İD Girmelisin`))
    if(!message.author.id) return message.channel.send(embed.setDescription(`${message.author},Kendi ismini değiştiremesin `))
    let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (args[1]) {
        var newName;
        args = args.filter(a => a.trim().length).slice(1);
        if (true) {
          let name = args
            .filter(a => isNaN(a))
            .map(
              a =>
                a
                  .charAt(0)
                  .replace("i", "İ")
                  .toUpperCase() + a.slice(1)
            )
            .join(" ");
          if (!name)
            return message.channel
              .send(embed.setDescription(`${message.author} Geçerli bir isim  belirtmelisin <a:vas_no:838476219968126976> !`))
              .then(x => x.delete({ timeout: 5000 }));
          newName = `${
            member.user.tag.includes(config.tag)
              ? config.tag
              : config.defaultTag
          } ${name} `;
        } else {
          newName = `${
            member.user.tag.includes(config.tag)
              ? client.config.tag
              : client.config.defaultTag
          } ${args.join(" ")}`;
        }
        await member.setNickname(newName).catch(err => {
          return undefined;
        });
      }
      let logs = db.get(`kullanici.${member.id}.islog`) || [];
      logs = logs.reverse();
      let ols =
        logs.length > 0
          ? logs
              .map(
                (value, index) =>
                  `\`${index + 1}.\` **${value.İsim}** `
                  
              )
              .join("\n")
            : "<a:vas_loadingyldz:838476126010736641> Kayıdı yok gibi gözüküyor :tada:!";    
      message.channel.send(embed.setDescription(`${member} Üyesinin yeni ismi ${newName} \n ${member} Üyesinin eski isimleri ${ols}`).setColor(`#ff000`).setTimestamp().setFooter(Cortex.Footer))
};

exports.conf = {enabled: true, guildOnly: true, aliases: ['nick', 'name', 'nickname', 'isim', 'i'], permLevel: 0}
exports.help = {name: 'isim', description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.", usage: '.erkek @etiket/id İsim Yaş'}