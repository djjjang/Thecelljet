// 예약 발행 점검 (2026-11-09, 서래 사이트와 같은 방식) — GitHub Actions가 매일 아침 실행. 내 컴퓨터에서도 `node scripts/scheduled-publish.mjs check` 로 확인 가능
//   check   : 승인됐고(approved: true) 발행일이 오늘이거나 지났는데 실제 사이트에 아직 없는 글을 찾아 출력
//   notify  : 위 글들이 사이트에 뜰 때까지 기다린 뒤 IndexNow(네이버·빙)에 「새 글 생김」 알림
//   ping <주소...> : 주어진 주소를 바로 IndexNow에 알림 (손으로 공개했을 때)
import { readFileSync, readdirSync } from 'node:fs';

const SITE = 'https://thecelljet.com';
const KEY = '66e3f75e486db5fe215a7bb2dfe05bb0'; // public/<KEY>.txt 와 같아야 함
const DIR = new URL('../src/content/blog/', import.meta.url);
const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());

function duePosts() {
  return readdirSync(DIR).filter((f) => f.endsWith('.md')).flatMap((f) => {
    const fm = (readFileSync(new URL(f, DIR), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
    const date = (fm.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m) || [])[1];
    const approved = /^approved:\s*true\s*$/m.test(fm);
    return approved && date && date <= today ? [{ slug: f.slice(0, -3), date, url: `${SITE}/blog/${f.slice(0, -3)}` }] : [];
  });
}

async function live(url) {
  try { return (await fetch(url, { redirect: 'follow', cache: 'no-store' })).status === 200; } catch { return false; }
}

async function missing() {
  const out = [];
  for (const p of duePosts()) if (!(await live(p.url))) out.push(p);
  return out;
}

async function ping(urls) {
  const body = JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls });
  for (const api of ['https://searchadvisor.naver.com/indexnow', 'https://api.indexnow.org/indexnow']) {
    try {
      const r = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
      console.log(`IndexNow ${api} → ${r.status}`);
    } catch (e) { console.log(`IndexNow ${api} 실패: ${e.message}`); }
  }
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'check') {
  const m = await missing();
  console.log(`오늘(한국) ${today} · 발행할 글 ${m.length}편${m.map((p) => `\n- ${p.date} ${p.slug}`).join('')}`);
  if (process.env.GITHUB_OUTPUT) {
    const { appendFileSync } = await import('node:fs');
    appendFileSync(process.env.GITHUB_OUTPUT, `count=${m.length}\nslugs=${m.map((p) => p.slug).join(' ')}\n`);
  }
} else if (cmd === 'notify') {
  const want = args.length ? duePosts().filter((p) => args.includes(p.slug)) : duePosts();
  for (let i = 0; i < 40; i++) { // 최대 20분 기다림 (배포는 보통 1분 안팎)
    const left = [];
    for (const p of want) if (!(await live(p.url))) left.push(p);
    if (!left.length) break;
    if (i === 39) { console.log('아직 안 뜬 글:', left.map((p) => p.slug).join(', ')); process.exit(1); }
    await new Promise((r) => setTimeout(r, 30000));
  }
  console.log('사이트 공개 확인:', want.map((p) => p.slug).join(', '));
  await ping([...want.map((p) => p.url), `${SITE}/blog`]);
} else if (cmd === 'ping') {
  await ping(args);
} else {
  console.log('사용: node scripts/scheduled-publish.mjs check | notify [글주소...] | ping <URL...>');
}
