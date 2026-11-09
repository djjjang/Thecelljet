import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 관리 노트(블로그) 글: src/content/blog/<주소이름>.md (2026-11-09 시작, 월 관리 계약)
// 독자: 피부관리실·클리닉 원장님. 장비 효과·질환 표현은 02_고객사/더셀젯/표현_대조표.md 기준으로 검수
// approved: 이수미 대표님 확인을 받았으면 true. false인 글은 내 컴퓨터 미리보기(npm run dev)에서만 보임
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['도입 가이드', '앰플 · 관리', '샵 운영', '고객 응대']),
    keyword: z.string().optional(), // 노린 검색어 (화면에는 안 보임)
    approved: z.boolean().default(false),
  }),
});

export const collections = { blog };
