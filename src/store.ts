// 메모리 기반 투표 저장소 (기본 버전).
// 서버 재시작 시 초기화됩니다. 추후 DB로 교체 가능.

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, Set<string>>; // optionIndex(string) -> Set<userId>
  creatorId: string;
  channelId: string;
  createdAt: number;
}

const polls = new Map<string, Poll>();

export function createPoll(poll: Poll): void {
  polls.set(poll.id, poll);
}

export function getPoll(id: string): Poll | undefined {
  return polls.get(id);
}

export function vote(pollId: string, optionIndex: number, userId: string): Poll | undefined {
  const poll = polls.get(pollId);
  if (!poll) return undefined;

  // 한 사용자는 하나의 옵션에만 투표 가능 (기존 투표 제거 후 재투표)
  for (const voters of Object.values(poll.votes)) {
    voters.delete(userId);
  }

  const key = String(optionIndex);
  if (!poll.votes[key]) poll.votes[key] = new Set();
  poll.votes[key].add(userId);

  return poll;
}
