// Slack Block Kit 메시지 생성 유틸

export function buildPollBlocks(
  pollId: string,
  question: string,
  options: string[],
  voteCounts: Record<string, number>
) {
  const totalVotes = Object.values(voteCounts).reduce((sum, c) => sum + c, 0);

  const optionBlocks = options.flatMap((option, idx) => {
    const count = voteCounts[String(idx)] ?? 0;
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${option}*  —  ${count}표`,
        },
        accessory: {
          type: 'button',
          text: { type: 'plain_text', text: '투표하기' },
          action_id: `vote_option_${pollId}_${idx}`,
          value: String(idx),
        },
      },
    ];
  });

  return [
    {
      type: 'header',
      text: { type: 'plain_text', text: question },
    },
    { type: 'divider' },
    ...optionBlocks,
    { type: 'divider' },
    {
      type: 'context',
      elements: [{ type: 'mrkdwn', text: `총 ${totalVotes}명 투표` }],
    },
  ];
}
