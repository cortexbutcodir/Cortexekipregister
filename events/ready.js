module.exports = (client) => {
    client.user.setPresence({ activity: { name: "Developed Cortex" }, status: "idle" });
    console.log("Bot hazır!");
  };
  
  module.exports.config = {
    name: "ready"
  };