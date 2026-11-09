import { getCollection } from 'astro:content';

// 오늘 날짜(한국 시간) 'YYYY-MM-DD' — 사이트를 만드는(빌드) 순간 기준
export function todayKST() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());
}

// 보여 줄 글, 최신 글이 먼저.
// 내 컴퓨터 미리보기(npm run dev)에선 확인 전·발행일 전 글도 보여 주고(대표님 확인용),
// 공개 사이트에선 확인받은 글(approved) 중 발행일(date)이 오늘이거나 지난 글만 — 예약 발행
// 발행일 아침에 GitHub Actions(.github/workflows/scheduled-publish.yml)가 사이트를 다시 만들어 글이 나타남
export async function getPosts() {
  const today = todayKST();
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || (data.approved && isoDate(data.date) <= today));
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function isoDate(date) {
  return date.toISOString().slice(0, 10);
}
