const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./config.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const fs = require('fs');//
const db = require('quick.db');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const Cortex = require('./cortex.json')
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});





client.on('guildMemberAdd', async (member) => {

    let cortexkanal = client.channels.cache.get(Cortex.kayıtsohbet)
  let cortexuser = client.users.cache.get(member.id);
  let cortexkullanıcı = client.users.cache.get(member.id)
  const cortexhesapkurulus = new Date().getTime()- cortexkullanıcı.createdAt.getTime();
  let cortej;
  moment.locale("tr");
  if (cortexhesapkurulus < 1296000000) cortej = '<a:vas_no:838476219968126976>'//güvenli değil
  if (cortexhesapkurulus > 1296000000) cortej = '<a:vas_yes:838476218746667028>' //güvenli 
  
  cortexkanal.send(`
         :tada: ${Cortex.sunucuismi} Hoşgeldin ${member}  (\`${member.id}\`) <#${Cortex.kurallar}> Kısmında uymanız gereken kurallar yazıyor! 

       Sunucumuz taglı alımda olduğu için (***${Cortex.tag}*** & ***${Cortex.tag3}*** & ***${Cortex.etikettag}***) birni almalısınız.  
    
       Hesabın Kuruluş Tarihi (${moment(member.user.createdAt).format("``DD MMMM YYYY hh:mm:ss``")})  **${cortej}**. 
       
       **${Cortex.teyitses}** kanalramızıdan birine geçerseniz \<@&${Cortex.yetkili}> yetkililerimiz sizinle ilgilenecektir, Seninle Birlikte **${member.guild.memberCount}** Kişiyiz!  
    `)
  })

  //Bu bot cortex tarafından kodlanmıştır

client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
    const tag = Cortex.tag
    const sunucu = Cortex.sunucuid
    const kanal = Cortex.taglog
    const Cort = Cortex.tagrol // taglı cort id
    const Corte = [Cortex.man, Cortex.man2, Cortex.woman, Cortex.woman2] // Corte rolünü gir ornek erkek rolü veya kadın rolü gidicek tag salınınca.
    const Cortes = Cortex.unregister // Cortes Rolü parçası
    const tags = message.guild.members.cache.filter(s => !s.bot).filter(member =>member.user.username.includes(tag) || member.user.username.includes(tag3) ||member.user.discriminator == Cortex.etikettag).size;
    
  
    try {
  
    if (newUser.username.toLowerCase().includes(tags) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(Cort)) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${newUser} ${tags} Tagımızı Aldığı için <@&${Cort}> Rolünü kazandı! `));
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(Cort);
    }
    if (!newUser.username.toLowerCase().includes(tags) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(Cort)) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${newUser} ${tags} Tagımızı Çıkardığı için <@&${Cort}> Rolünü kaybetti!`));
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(Cort);
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(Corte);
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(Cortes);
    }
  } catch (e) {
  console.log(`Bir hata oluştu! ${e}`)
   }
  }
  });
  
  //bu bot cortex tarafından kodlanmıştır


 client
 .login(ayarlar.token)
 client.on('ready', async () => {
    client.channels.cache.get(Cortex.botses).join();

 })