# Pinterest Playbook — koreanfolktales.ink

핀터레스트는 **컬러링북 / 프린터블 / 키즈 액티비티** 카테고리에서 가장 큰 유입원입니다. 한국 옛이야기 + 영문 키워드 조합은 글로벌 한식·K-콘텐츠 관심층을 정조준할 수 있어요. 이 문서는 처음부터 6개월 안에 안정적 유입을 만드는 단계별 가이드입니다.

> **예상 효과 (보수적)**: 매주 핀 20-30개 꾸준히 → 3개월 후 월 5,000+ 노출, 6개월 후 월 2-5만 노출. 클릭률 1-3%로 잡으면 월 100-1,500 유입.

---

## 1. 계정 셋업 (Day 1, 30분)

### 1.1 Business 계정 생성
- https://business.pinterest.com → **Create a free business account**
- 일반 개인 계정 X (분석 도구 못 씀)
- 카테고리: **Art / Crafts** 또는 **Parenting**
- 위치: **United States** (가장 큰 시장 + 한국 디아스포라 부모층)

### 1.2 프로필
- **이름**: `Korean Folktales` (브랜드 그대로)
- **사용자명**: `koreanfolktales` (가능하면)
- **자기소개 (160자)**:
  ```
  Free coloring storybook of real Korean folktales — eight tales,
  bilingual (한/EN), printable PDFs. For kids, parents & K-content lovers.
  Color yours at koreanfolktales.ink ✨
  ```
- **웹사이트**: `https://koreanfolktales.ink`
- **프로필 이미지**: favicon 동일한 K 마크 (180x180)

### 1.3 도메인 인증 (Claim Website)
가장 중요. 인증해야 핀 분석·리치 핀 활성화됨.

1. Pinterest Settings → **Claimed accounts** → **Claim** (Website)
2. 두 가지 방법 중 **메타 태그** 선택
3. Pinterest가 주는 `<meta name="p:domain_verify" content="...">` 토큰을 보내주시면 layout.tsx에 추가 → push → 재인증
4. 또는 **HTML 파일 업로드** 방식 (파일을 `/public`에 넣으면 됨)

---

## 2. 보드(Boards) 구조 (Day 1)

Pinterest는 보드별로 알고리즘이 카테고라이즈. 처음에 7~10개 보드 만들고 핀 분산.

### 추천 보드 8개

| 보드 이름 | 설명 (English) | 예상 핀 종류 |
|---|---|---|
| **Korean Folktales for Kids** | Real Korean stories adapted for ages 4-10. Bilingual. Free. | 8개 폴크테일 메인 핀 |
| **Free Printable Coloring Pages** | Free coloring pages from Korean folktales. Print at home. | 40장 도안 PNG |
| **Korean Culture for Kids** | Hands-on ways to share Korean culture with children. | 한복·온돌·잔치 등 문화 핀 |
| **K-Storybook Crafts** | Coloring + crafts to extend each Korean folktale. | DIY 후속 활동 핀 |
| **Bilingual Kids Activities** | Activities for raising bilingual children. | 한/영 단어 카드, 발음 |
| **Sun and Moon (해님 달님)** | One board per folktale (8 boards). | 각 폴크테일 전용 |
| **Folktales from Around the World** | Comparison & inspiration. | 다른 나라 폴크테일 (큐레이션) |
| **Coloring Book Inspiration** | Coloring book art that inspires us. | 다른 아티스트 작품 (re-pin) |

> 자기 콘텐츠 70% + 큐레이션(다른 좋은 핀) 30% 비율이 좋음.

---

## 3. 핀 디자인 규격 (Day 2)

### 3.1 사이즈
- **세로 1000×1500px (2:3 비율)** — Pinterest 권장
- **세로 1000×1875px (1:1.875)** — 더 길어 클릭률 ↑ (실험 가능)
- 가로 핀은 금지 (피드에서 작아짐)

### 3.2 디자인 원칙
1. **상단 60%에 핵심 시각** — 화면 스크롤 멈추는 영역
2. **굵은 텍스트 오버레이** — 모바일 200px 너비에서도 읽혀야 함
3. **브랜드 일관성** — 앰버 그라데이션 + Gowun Batang 서체 사용
4. **CTA 텍스트** — "Free printable" / "Color this folktale" / "Bilingual storybook"
5. **저작권 안전** — 모든 도안은 우리 자산

### 3.3 핀 5가지 템플릿

#### (A) Story Card Pin
```
[상단 30%] ✦ KOREAN FOLKTALES ✦
[중간 40%] 스토리 라인아트 아이콘 (큼)
[하단 30%] "Sun and Moon" (큰 serif) / "해님 달님" (작게)
           Free printable coloring pages →
           koreanfolktales.ink/folktales/sun-and-moon
```

#### (B) Scene Showcase Pin
```
[전체] 한 장면의 도안 (정사각 크롭)
[하단 띠] 1장 / 5장 · The Knock in the Night
          koreanfolktales.ink
```

#### (C) Bilingual Vocab Pin
```
[상단] 한글 큰 글자: 호랑이
[중간] romanized: horangi · pronunciation: /HOH-rahng-ee/
[하단] 일러스트 호랑이 + "Korean folktale vocabulary"
       koreanfolktales.ink
```

#### (D) Carousel / Compare Pin (2:3 한 장이지만 5분할)
```
"8 Korean folktales you can color"
1. Sun and Moon
2. Heungbu and Nolbu
... (작은 아이콘 라인업)
koreanfolktales.ink
```

#### (E) Process / How-to Pin
```
"How we made this Korean folktale coloring book"
또는 "5 steps to color your own bilingual storybook"
스크린샷 4-5장 stack
```

---

## 4. 핀 제목 + 설명 템플릿 (SEO 핵심)

Pinterest는 **SEO 엔진**. 제목·설명에 키워드 잘 박는 게 디자인보다 더 중요할 때도 많음.

### 4.1 키워드 풀 (한 핀에 5-8개 적절히 섞기)

**메인 키워드**
- Korean folktales
- Korean folktale coloring
- bilingual coloring book
- Korean culture for kids
- K-content for kids
- Asian folktales coloring
- printable coloring pages
- free coloring book

**스토리별 키워드 (예: Sun and Moon)**
- Sun and Moon Korean story
- 해님 달님 coloring
- Korean siblings folktale
- Tiger folktale Korea

**부모층 키워드**
- bilingual kids activity
- Korean American kids
- teach kids Korean
- Korean heritage homeschool
- preschool Korean culture

### 4.2 핀 제목 템플릿 (100자 이하)
```
Sun and Moon — Color this real Korean folktale (free printable)
The Hare and the Dragon King · Korean coloring book for kids
8 Korean folktales kids can color — free bilingual printable
해님 달님 — Bilingual Korean folktale coloring book
```

### 4.3 핀 설명 템플릿 (500자, 처음 50자가 보임)
```
Free printable Korean folktale coloring book — color your way through
"Sun and Moon" (해님 달님), the classic story of two siblings who
escape a tiger and rise to the sky.

✨ 8 real Korean folktales
🎨 5 scenes per story, branching endings
🗣 Bilingual: Korean & English with pronunciation
📄 Free PDF when you finish
👧 Perfect for ages 4-10

Color it at koreanfolktales.ink

#KoreanFolktales #ColoringBook #BilingualKids #KoreanCulture
#KContent #KoreanForKids #PrintableColoring #HomeSchool
#KoreanAmerican #FreePrintable
```

### 4.4 해시태그
- 처음 만들 땐 핀당 8-12개 (Pinterest 권장)
- 영문 + 한글 섞으면 좋음 (#한국전래동화, #색칠공부)
- 너무 일반적인 태그 (#kids, #fun) 피하고 니치하게

---

## 5. 콘텐츠 캘린더 (Week 1-4)

### Week 1 — 기반 (총 8핀)
- 보드 8개 만들기
- 각 폴크테일마다 메인 핀 1개씩 = 8핀
- "Korean Folktales for Kids" 보드에 모두 핀

### Week 2 — 장면 확장 (총 16핀)
- 각 폴크테일에서 가장 시각적으로 강한 장면 2개씩 = 16핀
- 해당 폴크테일 전용 보드 + "Free Printable Coloring Pages" 보드 동시 핀

### Week 3 — 어휘/문화 (총 12핀)
- 4개 폴크테일의 글로서리 단어 3개씩 = 12 vocab pins
- "Bilingual Kids Activities" + "Korean Culture for Kids" 보드

### Week 4 — Compare/Listicle (총 6핀)
- "8 Korean folktales..." 리스트 핀 1개
- "Korean vs Western folktales — similarities" 비교 핀
- 4개 폴크테일 더 — 다른 각도 (감정 톤 / 메시지)

### Week 5+ — 유지
- 매주 20-30개 핀 (재핀 + 새 핀 + 큐레이션)
- 같은 페이지 가리키는 핀을 여러 디자인 변형으로 만들기 (A/B 테스트 효과)
- 가장 성과 좋은 핀은 30일 후 재배포 (Tailwind App 등 활용)

---

## 6. 핀 만드는 도구

### 무료
- **Canva** (https://canva.com) — Pinterest 템플릿 풍부, 가장 빠름
- **Figma** — 디자인 자유도 ↑, 템플릿 만들면 일괄 생산
- **Pinterest Native Editor** — 단순 핀 빠르게

### 유료
- **Tailwind App** (~$15/mo) — Pinterest 스케줄러 + 최적 시간 자동 배포
- **Later** (~$25/mo) — 멀티 플랫폼 통합

### 자동화 옵션 (선택)
사이트의 OG 이미지 라우트(`/opengraph-image`)처럼 핀도 동적 생성 가능.
`src/app/pin/[slug].tsx`에 ImageResponse로 1000×1500 핀을 자동 생성하면
8개 폴크테일 × 5장면 = 40개 일관된 핀 즉시 확보.
→ Pinterest에 업로드만 하면 됨. (구현 원하면 다음 세션에 추가)

---

## 7. 분석 & 반복

### 7.1 측정 (월 1회 체크)
Pinterest Analytics에서:
- **Top pins by impressions** — 어떤 디자인·키워드가 먹히나
- **Top pins by clicks** — 실제 사이트로 유입되는 핀
- **Audience overview** — 어디 사람들이 보나 (지역, 관심사, 기기)

Vercel Analytics에서:
- `referrer = pinterest.com` 필터로 유입량 확인
- 어느 페이지에 도착하나 (`/folktales/sun-and-moon` 등)

### 7.2 반복 사이클
- **상위 10% 핀** → 비슷한 디자인 변형 더 만들기
- **하위 50% 핀** → 키워드 다시 짜거나 디자인 폐기
- **유입 0인 페이지** → 핀 디자인 또는 키워드 문제. 새 핀으로 재도전

---

## 8. 글로벌 함정 / 주의사항

| 함정 | 회피 |
|---|---|
| 같은 핀 30분 안에 여러 보드에 도배 | 한 보드당 1번씩 + 핀 간 최소 1시간 |
| 모든 핀이 자기 사이트로만 | 다른 좋은 핀 30% 큐레이션 섞기 |
| 핀 디자인 너무 자주 바꿈 | 브랜드 일관성 유지 (같은 색·폰트) |
| AI 이미지만 사용 | Pinterest는 2024년부터 AI 검수 강화. 실제 도안 사용 |
| 한국어만 사용 | 영문 키워드 우선, 한국어 보조 |
| 처음부터 30개씩 푸시 | 일 5-10개로 시작, 점진 증가 (스팸 신호 회피) |

---

## 9. 30/60/90일 마일스톤

### 30일 후
- 총 50-80핀 업로드 완료
- Pinterest Analytics에서 첫 노출 데이터 잡힘
- 사이트 유입 월 50-200

### 60일 후
- 총 150-200핀
- 상위 핀 5개 식별 → 변형 제작
- 사이트 유입 월 300-1,000
- GSC에서 polyc-folktales 검색어 노출 시작

### 90일 후
- 총 300+핀
- 자동화 (Tailwind App 등) 도입 결정
- 사이트 유입 월 1,000-3,000
- AdSense 신청 가능한 트래픽 수준 도달

---

## 10. 즉시 시작 체크리스트

- [ ] Pinterest Business 계정 생성
- [ ] 프로필 (이름·자기소개·웹사이트·이미지) 채우기
- [ ] 도메인 인증 (Claim website)
- [ ] 8개 보드 생성 + 설명 작성
- [ ] Canva 무료 계정 만들고 핀 템플릿 5종 만들기
- [ ] 첫 8개 메인 핀 디자인 및 업로드
- [ ] 매주 같은 요일에 20-30분 핀 만드는 루틴 정하기

---

## 11. 참고 자료

- Pinterest Creator Hub: https://www.pinterest.com/business/business-hub
- Pinterest Trends: https://trends.pinterest.com (어떤 키워드가 뜨는지 실시간)
- Predis.ai Pinterest pin ideas (AI 카피라이팅 도구)
- 비슷한 콘텐츠 분석: Pinterest 검색창에 "korean folktale" "coloring printable" 쳐서 상위 핀 보드 분석

---

*최종 업데이트: 2026-06-18 · 라이브 사이트: https://koreanfolktales.ink*
