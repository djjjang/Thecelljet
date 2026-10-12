// 사이트 공통 정보. 비어 있는 값('')은 화면에 표시되지 않는다.
// ⚠️ 고객사에게서 받은 사실만 넣을 것 (추측·예시 값 금지)
export const site = {
  name: '더셀젯',
  nameEn: 'THE CELLJET',
  url: 'https://thecelljet.com',
  phone: '010-7781-6533',
  email: '', // TODO: 대표님 문의 메일 주소
  address: '경기도 성남시 중원구 둔촌대로80번길 3-10, 212호',
  company: '', // TODO: 사업자 상호 (예: (주)채움엔터프라이즈 — 대표님 확인 후 입력)
  ceo: '', // TODO: 대표자명 (대표님 확인 후 입력)
  bizNumber: '', // TODO: 사업자등록번호
  manufacturer: '아이레이저랩(I LASER LAB)',
  // 기존 워드프레스 사이트에서 쓰던 소유확인 코드 그대로 유지 (서치콘솔·서치어드바이저 기록 이어받기)
  naverVerification: 'ab99e58a809e48e8fccf8915daccfb7ce70cae73',
  googleVerification: 'CqDGLSCOlYhhkPwLYp1nUvhaD13Mc6iW-3p-4xY7J54',
  // 구글 앱스 스크립트 웹 앱 주소 (docs/문의폼-연결방법.md 참고). 비어 있으면 폼이 "전화 주세요" 안내를 띄운다.
  formEndpoint: '',
};

export const nav = [
  { label: '제품 소개', href: '/#about' },
  { label: '핵심 기술', href: '/#technology' },
  { label: '관리 모드', href: '/#modes' },
  { label: '구성품·앰플', href: '/#lineup' },
  { label: '인증·특허', href: '/#certs' },
  { label: '자주 묻는 질문', href: '/#faq' },
];
