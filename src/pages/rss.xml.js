// RSS — 네이버 서치어드바이저·구글에 「새 글이 생겼다」고 알려 주는 목록 (2026-11-09)
// 관리 노트 글(확인받은 것만). 글이 생기면 자동으로 맨 위에 붙음
import { site } from '../data/site.js';
import { getPosts } from '../data/blog.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const posts = await getPosts();
  const items = posts.map((p) => ({ title: p.data.title, link: new URL(`/blog/${p.id}`, site.url).href, description: p.data.description, date: p.data.date, category: p.data.category }));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>더셀젯 THE CELLJET 관리 노트</title>
<link>${site.url}/blog</link>
<description>피부관리실·클리닉 원장님을 위한 니들프리 관리 노트</description>
<language>ko</language>
<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items.map((i) => `<item>
<title>${esc(i.title)}</title>
<link>${i.link}</link>
<guid isPermaLink="true">${i.link}</guid>
<description>${esc(i.description)}</description>
<category>${esc(i.category)}</category>
<pubDate>${i.date.toUTCString()}</pubDate>
</item>`).join('\n')}
</channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
