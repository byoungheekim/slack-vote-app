import { App } from '@slack/bolt';
import { getPoll, vote } from '../store';
import { buildPollBlocks } from '../utils/blocks';

export function registerVoteActions(app: App): void {
  app.action(/^vote_option_.+/, async ({ action, ack, body, client }) => {
    await ack();

    if (action.type !== 'button') return;
    const [, , pollId, optionIndexStr] = action.action_id.split('_');
    const optionIndex = Number(optionIndexStr);
    const userId = (body as any).user?.id as string;

    const poll = vote(pollId, optionIndex, userId);
    if (!poll) return;

    const voteCounts: Record<string, number> = {};
    Object.entries(poll.votes).forEach(([idx, voters]) => {
      voteCounts[idx] = voters.size;
    });

    const messageBody = body as any;
    await client.chat.update({
      channel: messageBody.channel.id,
      ts: messageBody.message.ts,
      blocks: buildPollBlocks(pollId, poll.question, poll.options, voteCounts),
      text: `투표: ${poll.question}`,
    });
  });
}
