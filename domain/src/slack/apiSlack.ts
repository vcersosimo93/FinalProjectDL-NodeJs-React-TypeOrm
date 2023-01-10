import { getIdSlackEmpleadoById } from "../controllers/EmpleadoController"

let tokenBot = process.env.SLACK_TOKEN
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(tokenBot, {logLevel: LogLevel.DEBUG});

export async function publicarMensaje(mensaje) {
  let canal = await findConversation(process.env.SLACK_CHANNEL);
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

export async function mensajeDelDia(){
  let canal = await findConversation(process.env.SLACK_CHANNEL);
  let mensaje = await obtenerUltimoMensajeBot(canal, process.env.SLACK_BOT);
  return JSON.stringify(mensaje)
}

export async function getUsuario(user){
  try{
    let usuario = await client.users.profile.get({token: tokenBot, user : user});
    return JSON.stringify(usuario);
  }
  catch(error){
    console.log(error)
    return 500;
  }
}

export async function usuarioExcedePedido (usuario){ 
  try {
      let empleado = await getIdSlackEmpleadoById(usuario)
      const userConversation = await client.conversations.open({
      token: tokenBot,
      users : empleado
      });
      await client.chat.postMessage({
        token: tokenBot,
        channel: userConversation.channel.id,
        text: "El horario seleccionado para almorzar se encuentra completo, para lograr coordinar correctamente la disponibilidad contactarse con Felipe o Sofia."
      });
  }
  catch (error) {
    throw new Error(error);
  }
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
  
