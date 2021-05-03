const Discord = require("discord.js");
const Cortex = require('../cortex.json')

exports.run = async (client, message, args) => {

if((!message.member.hasPermission("ADMINISTRATOR"))) 
return message.react(`\<a:vas_no:838476219968126976>`)


let banqwe = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    banqwe.forEach(r => {
r.roles.add(Cortex.unregister)
})
const khold = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setColor(Cortex.embedyesil)
.setFooter(Cortex.Footer)
.setTimestamp()
.setDescription("Sunucuda rolü olmayan \`"+ banqwe.size +"\` kişiye kayıtsız rolü verildi!")
message.channel.send(khold).then(m => message.react("\<a:vas_yes:838476218746667028>"))
} else if(!args[0]) {
const khold1 = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setColor(Cortex.embedkırmızı)
.setFooter(Cortex.Footer)
.setTimestamp()
.setDescription("Sunucumuzda rolü olmayan \`"+ banqwe.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
message.channel.send(khold1)
};
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rsv", "rvs", "rolesüzver"],
    permLevel: 0
};

exports.help = {
    name: "rolsüzver"
}