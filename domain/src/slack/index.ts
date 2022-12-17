let tokenBot = process.env.SLACK_TOKEN

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(tokenBot, {
  logLevel: LogLevel.DEBUG
});

let conversationHistory;

export async function findConversation(name) {
    try {
      const result = await client.conversations.list({
        token: tokenBot
      });
  
      for (const channel of result.channels) {
        if (channel.name === name) {
           let channelId = channel.id;
          console.log("Found conversation ID: " + channelId);
          publishMessage(channelId, "Hola mundo")
          //findConversationHistory(channelId);
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
    console.log(conversationHistory.length + " messages found in " + chId);
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
  
