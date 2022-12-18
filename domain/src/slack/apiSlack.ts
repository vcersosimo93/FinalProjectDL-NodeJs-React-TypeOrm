let tokenBot = process.env.SLACK_TOKEN
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(tokenBot, {logLevel: LogLevel.DEBUG});

export async function publicarMensaje(canal, mensaje) {
  try {
    const result = await client.chat.postMessage({
      token: tokenBot,
      channel: canal,
      text: mensaje
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

export async function pedidosDelDia(){
  let canal = await findConversation(process.env.SLACK_CHANNEL);
  let mensaje = await obtenerUltimoMensajeBot(canal, process.env.SLACK_BOT);
  return JSON.stringify(mensaje)
}

  async function obtenerUltimoMensajeBot(canal, bot){
    try {
      const result = await client.conversations.history({
        channel: canal
      });
      for (const msg of result.messages){
        if (msg.bot_profile !== undefined && msg.bot_profile.name === bot){
          return msg;
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  async function findConversation(nombre) {
    try {
      const result = await client.conversations.list({
        token: tokenBot
      });
      for (const channel of result.channels) {
        if (channel.name === nombre) {
          let canal = channel.id;
          return canal;
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

   async function findConversationHistory(canal) {
    try {
    const result = await client.conversations.history({
      channel: canal
    });
    return result.messages;
  }
  catch (error) {
    console.error(error);
  }}

   async function getReaction(canal, mensaje) {
    try {
      const result = await client.reactions.get({
        token: tokenBot,
        channel: canal,
        timestamp: mensaje
      });
      return JSON.stringify(result.message.reactions);
    }
    catch (error) {
      console.error(error);
    }
  }
  
