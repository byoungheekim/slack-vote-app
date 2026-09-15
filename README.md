# slack-vote-app

Slack에서 동작하는 간단한 투표(설문) 앱입니다. Slack Bolt for JavaScript (TypeScript)로 작성되었습니다.

## 기능

- `/vote 질문 | 옵션1 | 옵션2 | ...` 슬래시 커맨드로 투표 생성
- 채널 메시지에 버튼으로 투표 참여 (Block Kit)
- 실시간 득표수 집계 및 메시지 자동 업데이트
- 사용자당 하나의 옵션에만 투표 가능 (재투표 시 이전 투표 변경)

## 시작하기

1. Slack 앱 생성 후 다음을 설정합니다:
   - Slash Command: `/vote`
   - Bot Token Scopes: `commands`, `chat:write`
   - Interactivity 활성화 (버튼 액션 처리를 위해)
   - Socket Mode 사용 시 App-Level Token 발급
2. `.env.example`을 `.env`로 복사하고 토큰 값을 채웁니다.
3. 의존성 설치 및 실행:

```bash
npm install
npm run dev
```

## 다음 단계 (제안)

- 데이터 영속화 (SQLite/Postgres)
- 투표 마감 시간 설정
- 투표 결과 익명/공개 옵션
- 관리자용 투표 종료 명령
