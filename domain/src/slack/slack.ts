let tokenBot = process.env.SLACK_TOKEN
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(tokenBot, {logLevel: LogLevel.DEBUG});
let conversationHistory;

export async function findConversation(name) {
    try {
      const result = await client.conversations.list({
        token: tokenBot
      });
  
      for (const channel of result.channels) {
        if (channel.name === name) {
           let channelId = channel.id;
          //console.log("Found conversation ID: " + channelId);
          //publishMessage(channelId, "Amor de contrabando")
          findConversationHistory(channelId);
          break;
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  async function findConversationHistory(chId) {
    try {
    const result = await client.conversations.history({
      channel: chId
    });
    conversationHistory = result.messages;
    findLastMessage(chId, "1671315132.950919")
    
  }
  catch (error) {
    console.error(error);
  }}

  async function publishMessage(channel, msj) {
    try {
      const result = await client.chat.postMessage({
        token: tokenBot,
        channel: channel,
        text: msj
      });
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function findLastMessage(chId, ts) {
    try {
      const result = await client.conversations.history({
        token: tokenBot,
        channel: chId,
        latest: ts,
        inclusive: true,
        limit: 1
      });
      let message = result;
      console.log(message);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getReaction(chId, file) {
    try {
      const result = await client.conversations.history({
        token: tokenBot,
        channel: chId,
        file: file,
        full : true
      });
      let message = result;
      console.log(message);
    }
    catch (error) {
      console.error(error);
    }
  }
  
