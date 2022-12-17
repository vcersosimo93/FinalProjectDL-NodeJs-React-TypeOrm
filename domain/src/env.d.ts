declare global{
namespace NodeJS{
interface ProcessEnv{
BD_HOST : string,
BD_PORT : string,
BD_USERNAME : string,
BD_PASSWORD : string,
BD_NAME : string,
SLACK_TOKEN : string
}}}

export {}
