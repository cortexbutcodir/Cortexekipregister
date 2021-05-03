const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const Cortex = require('../cortex.json')
module.exports.run = async (client, message, users, args) => {

if(!message.member.roles.cache.some(r => [Cortex.yetkili].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
    
//------------------------------------------------KAYITLAR-----------------------------------------------\\  
let member = message.mentions.users.first()
let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);//Useri tanımladık
var sayi = 1 
let data = db.get(`kullanici.${member.id}.islog`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("#a22a2a") 
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))      
    .setDescription(`${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.İsim}\`  (<@&${x.Rol}>)\n`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
//Bu Bot Cortex Tarafından Kodlanmıştır

const embed = new MessageEmbed()
        .setThumbnail(user.user.avatarURL ({ dynamic: true}))     
    .setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`) 
    .setDescription(` Kullanıcının Eski İsimleri:
    ${isimler}`)
    .setColor(Cortex.embedkırmızı)
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'eski-isim'],
  permLevel: 0,
}

exports.help = {
      name: "isimler"
  
}