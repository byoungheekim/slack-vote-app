import { App } from '@slack/bolt';
import { randomUUID } from 'crypto';
import { createPoll } from '../store';
import { buildPollBlocks } from '../utils/blocks';

// 사용법: /vote 질문 | 옵션1 | 옵션2 | 옵션3
export function registerVoteCommand(app: App): void {
  app.command('/vote', async ({ command, ack, respond }) => {
    await ack();

    const parts = command.text.split('|').map((p) => p.trim()).filter(Boolean);
    if (parts.length < 3) {
      await respond({
        text: '사용법: `/vote 질문 | 옵션1 | 옵션2 [| 옵션3 ...]` (최소 2개 옵션 필요)',
      });
      return;
    }

    const [question, ...options] = parts;
    const pollId = randomUUID();

    createPoll({
      id: pollId,
      question,
      options,
      votes: {},
      creatorId: command.user_id,
      channelId: command.channel_id,
      createdAt: Date.now(),
    });

    await respond({
      response_type: 'in_channel',
      blocks: buildPollBlocks(pollId, question, options, {}),
      text: `투표: ${question}`,
    });
  });
}
