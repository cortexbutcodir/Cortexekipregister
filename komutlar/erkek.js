const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment")
const { parseZone } = require("moment")
const config = require('../config.json')
const Cortex = require('../cortex.json')
exports.run =  async (client, message, args) => {
    //Bu Bot Cortex Tarafından yapılmıştır
  if(![Cortex.yetkili].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
  return message.channel.send(new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
  .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
    let embed = new MessageEmbed()
   const erkekrol = message.guild.roles.cache.find(r => r.id === Cortex.man) 
  const erkekrol2 = message.guild.roles.cache.find(r => r.id === Cortex.man2)
  const kızrol = message.guild.roles.cache.find(r => r.id === Cortex.woman) 
  const kızrol2 = message.guild.roles.cache.find(r => r.id === Cortex.woman2)
  const kayıtsız = message.guild.roles.cache.find(r => r.id === Cortex.unregister)
  const genelchat = message.guild.channels.cache.find(c => c.id === Cortex.genelchat)
  const logg = message.guild.channels.cache.find(c => c.id === Cortex.registerlog)
  const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  let logs = db.get(`kullanici.${member.id}.islog`) || [];
  logs = logs.reverse();
  let isimlerr =
    logs.length > 0
      ? logs
          .map(
            (value, index) =>
              `\`${index + 1}.\` **${value.İsim}** `
                //Bu Bot Cortex Tarafından yapılmıştır
          )
          .join("\n")
        : "<a:vas_loadingyldz:838476126010736641> Kayıdı yok gibi gözüküyor :tada:!";
  if(!member.user.username.includes(Cortex.tag) && user.user.username.includes(Cortex.tag2) && user.user.username.includes(Cortex.tag3) ||  member.user.discriminator == Cortex.etikettag ) return message.channel.send(embed.setDescription(`${member} kişisi'nin tagı olmadığı için kayıt işlemi iptal edildi`).setColor(Cortex.embedkırmızı).setFooter(Cortex.Footer + ` .vip @kişi/İD`).setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 15000  }));
  if(!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen Bir @kişi/İD Giriniz <a:vas_no:838476219968126976>`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(`#ff0000`))
  if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Kendini kayıt edemesin <a:vas_no:838476219968126976>.`)
  .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Botları kayıt edemesin <a:vas_no:838476219968126976>.`)
  .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} Taç Sahibini Kayıt Edemesin <a:vas_no:838476219968126976>.`)
  .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} @kişi sizden üst/aynı yetkide <a:vas_no:838476219968126976>.`)
  .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  var name = args.slice(1).join(" ")
  if(!name) return message.channel.send(embed.setDescription(`Geçerli bir isim belirtmelisin <a:vas_no:838476219968126976> !`).setColor('#ff0000').setTimestamp().setFooter(`Developed Cortex`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})))
  if (args[1]) {
      //Bu Bot Cortex Tarafından yapılmıştır
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
        member.user.username.includes(Cortex.tag) || member.user.username.includes(Cortex.tag2) || member.user.username.includes(Cortex.tag3) || member.user.discriminator == Cortex.etikettag
          ? config.tag
          : config.defaultTag
      } ${name} `;
    } else {
      newName = `${
        member.user.username.includes(Cortex.tag) || member.user.username.includes(Cortex.tag2)|| member.user.username.includes(Cortex.tag3)  || member.user.discriminator == Cortex.etikettag
          ? client.config.tag  
          : client.config.defaultTag
      } ${args.join(" ")}`;
    }
    await member.setNickname(newName).catch(err => {
      return undefined;
    });
  }
  //Bu Bot Cortex Tarafından yapılmıştır
  db.add(`yetkili.${message.author.id}.erkek`, 1)
  db.add(`yetkili.${message.author.id}.toplam`, 1)
  let alldata = db.fetch(`yetkili.${message.author.id}.toplam`)
  await member.roles.add(erkekrol)
  await member.roles.add(erkekrol2)
  await member.roles.remove(kayıtsız)
  await member.roles.remove(kızrol)
  await member.roles.remove(kızrol2)
  message.channel.send(embed.setTitle(`Kayıt işlemi başarılı <a:vas_yes:838476218746667028> !`).setDescription(` <a:vas_parlakyldz:838476126120312854> Kayıt olan kullanıcı: ${member} \n <a:vas_parlakyldz:838476126120312854> Kayıt eden yetkili : ${message.author} \n \` Rolleri Verildi \`: ${erkekrol}, ${erkekrol} \n\n ${member} önceki kayıt işlemleri  \n\n  ${isimlerr}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setFooter(`Yetkilinin toplam teyiti: ${alldata}`).setColor(`#ff000`))
  genelchat.send(`${member} Sunucumuza hoşgeldin :tada:!`)
  logg.send(embed.setDescription(`Kayıt olan kullanıcı: ${member} \n Kayıt eden yetkili ${message.author} \n Cinsiyet: Erkek \n Verilen roller: ${erkekrol}, ${erkekrol2} `).setColor(`BLUE`).setTimestamp().setFooter(`Toplam kayıt`));
  if(member.user.username.includes(Cortex.tag) && member.user.username.includes(Cortex.tag2) && member.user.username.includes(Cortex.tag3)   && member.user.discriminator == Cortex.etikettag) return member.roles.add(Cortex.tagrol)
  db.push(`kullanici.${member.id}.islog`, {
    İsim: name,
    Rol: erkekrol
  });
  };
exports.conf = {enabled: true, guildOnly: true, aliases: ['erkek', 'e', 'boy', 'man', 'adam'], permLevel: 0}
exports.help = {name: 'erkek', description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.", usage: '.erkek @etiket/id İsim Yaş'}

  //Bu Bot Cortex Tarafından yapılmıştır
