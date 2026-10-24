/**
 * 더셀젯 시연·도입 상담 신청 → 구글 시트 저장 + 메일 알림 + 카카오 알림톡(선택)
 * 사용법은 같은 폴더의 「문의폼-연결방법.md」를 보세요.
 */
const NOTIFY_EMAILS = 'cuenter333@gmail.com'; // 알림 받을 메일 주소. 여러 개면 쉼표로 구분 (예: 'a@naver.com,b@gmail.com')
const SHEET_NAME = '상담신청';
const COLUMNS = ['submitted_at', 'shop', 'name', 'phone', 'region', 'type', 'interest', 'message', 'agree_privacy', 'agree_marketing', 'page', 'lang'];
const HEADERS = ['신청일시', '샵·클리닉', '성함', '연락처', '지역', '업종', '문의 내용', '남기신 말씀', '개인정보 동의', '소식 수신 동의', '신청 페이지', '언어'];

/**
 * 카카오 알림톡 (솔라피 SOLAPI 사용). 아래 값이 모두 채워져야 작동한다.
 * 키는 코드에 직접 쓰지 말고 [프로젝트 설정 → 스크립트 속성]에 넣는다:
 *   SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_PF_ID, SOLAPI_TEMPLATE_ID, SOLAPI_FROM(발신번호), KAKAO_TO(받을 휴대폰, 쉼표로 여러 개)
 * 알림톡이 실패하면 솔라피가 같은 내용을 문자(LMS)로 대신 보낸다.
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter || {};
    if (!p.shop || !p.name || !p.phone) return out('missing');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const row = COLUMNS.map((k) => {
      const v = String(p[k] || '').slice(0, 2000);
      return /^[=+\-@]/.test(v) ? "'" + v : v; // 수식 삽입 방지
    });
    sheet.appendRow(row);

    // 알림 실패가 시트 저장을 막지 않도록 각각 따로 처리
    try { sendMail(p, row); } catch (err) { console.error('메일 실패', err); }
    try { sendKakao(p); } catch (err) { console.error('카톡 실패', err); }
    return out('ok');
  } finally {
    lock.releaseLock();
  }
}

function sendMail(p, row) {
  if (!NOTIFY_EMAILS) return;
  MailApp.sendEmail(
    NOTIFY_EMAILS,
    `[더셀젯] 상담 신청 - ${p.shop} / ${p.name} (${p.type || '업종 미입력'})`,
    HEADERS.map((h, i) => `${h}: ${row[i]}`).join('\n')
  );
}

function sendKakao(p) {
  const prop = PropertiesService.getScriptProperties().getProperties();
  const need = ['SOLAPI_API_KEY', 'SOLAPI_API_SECRET', 'SOLAPI_PF_ID', 'SOLAPI_TEMPLATE_ID', 'SOLAPI_FROM', 'KAKAO_TO'];
  if (need.some((k) => !prop[k])) return; // 설정 전이면 건너뜀

  // ⚠️ 변수 이름은 카카오에서 승인받은 템플릿과 글자 하나까지 같아야 한다 (문의폼-연결방법.md 참고)
  const variables = {
    '#{샵}': p.shop,
    '#{성함}': p.name,
    '#{연락처}': p.phone,
    '#{업종}': p.type || '-',
    '#{문의}': p.interest || '-',
  };
  const text = `[더셀젯] 상담 신청\n샵: ${p.shop}\n성함: ${p.name}\n연락처: ${p.phone}\n업종: ${p.type || '-'}\n문의: ${p.interest || '-'}`;
  const messages = prop.KAKAO_TO.split(',').map((to) => ({
    to: to.replace(/[^0-9]/g, ''),
    from: prop.SOLAPI_FROM.replace(/[^0-9]/g, ''),
    text,
    kakaoOptions: { pfId: prop.SOLAPI_PF_ID, templateId: prop.SOLAPI_TEMPLATE_ID, variables, disableSms: false },
  }));

  const date = new Date().toISOString();
  const salt = Utilities.getUuid().replace(/-/g, '');
  const sig = Utilities.computeHmacSha256Signature(date + salt, prop.SOLAPI_API_SECRET)
    .map((b) => ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
  const res = UrlFetchApp.fetch('https://api.solapi.com/messages/v4/send-many/detail', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `HMAC-SHA256 apiKey=${prop.SOLAPI_API_KEY}, date=${date}, salt=${salt}, signature=${sig}` },
    payload: JSON.stringify({ messages }),
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() >= 300) console.error('솔라피 응답', res.getResponseCode(), res.getContentText());
}

function out(status) {
  return ContentService.createTextOutput(JSON.stringify({ status })).setMimeType(ContentService.MimeType.JSON);
}

/** 설정 확인용: 편집기에서 이 함수를 선택해 [실행]하면 시험 메일·카톡이 간다 */
function testNotify() {
  const p = { shop: '테스트 에스테틱', name: '홍길동', phone: '010-0000-0000', type: '피부관리실 · 에스테틱', interest: '장비 시연 신청' };
  sendMail(p, [new Date().toLocaleString('ko-KR'), p.shop, p.name, p.phone, '', p.type, p.interest, '시험 발송', 'Y', 'N', '/']);
  sendKakao(p);
}
