// 언어 사전 모음. 새 언어를 추가하려면 파일을 만들고 여기에 등록
import ko from './ko.js';
import en from './en.js';
import zh from './zh.js';

export const dicts = { ko, en, zh };
export const langs = ['ko', 'en', 'zh'];
export const getT = (lang = 'ko') => dicts[lang] || ko;
// 한국어는 주소 앞에 붙는 것 없음, 영어 /en, 중국어 /zh
export const prefix = (lang) => (lang === 'ko' ? '' : `/${lang}`);
// "{key}" 자리에 값 넣기
export const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (k in v ? v[k] : `{${k}}`));
