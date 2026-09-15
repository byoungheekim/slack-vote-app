import { App, LogLevel } from '@slack/bolt';
import dotenv from 'dotenv';
import { registerVoteCommand } from './commands/vote';
import { registerVoteActions } from './actions/voteActions';

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: !!process.env.SLACK_APP_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.INFO,
});

registerVoteCommand(app);
registerVoteActions(app);

(async () => {
  const port = Number(process.env.PORT) || 3000;
  await app.start(port);
  console.log(`⚡️ Slack 투표 앱이 포트 ${port}에서 실행 중입니다.`);
})();
