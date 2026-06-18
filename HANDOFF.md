# Korean Folktales — Coloring Storybook · Handoff

> **읽기 시간 ~10분** · 이 문서는 새 세션 시작 시 컨텍스트를 즉시 잡기 위함.
> 코드를 만지기 전에 §1·§2·§7만 먼저 훑고, 막힐 때 §8·§9 참조하세요.

---

## 1. 한 줄 요약

**Korean Folktales — A Bilingual Coloring Storybook.**
미국 시장(K-content 관심층 + 자녀 둔 부모)을 타깃으로 한 **분기형 한국 옛이야기 색칠 책** 웹앱.
사용자가 클릭으로 영역을 채워나가며 스토리 선택지를 골라 자기만의 그림책을 완성하면, PDF/PNG로 내보내고 갤러리에 저장된다.

핵심 차별점:
1. **8개의 한국 전래동화** (8 스토리 × 5 장면 = 40 도안)
2. **이중언어 (한/영)** — 콘텐츠 + UI 전부, localStorage 기억
3. **🔊 한국어 발음** (Web Speech API) — 부모·아이 교육 가치
4. **인스타 친화 4:5 공유 이미지** + Web Share API
5. **갤러리** — 완성작 자동 저장, 재공유

---

## 2. 현재 버전 · v0.6

| 분야 | 상태 |
|---|---|
| 콘텐츠 | 8 스토리 모두 도안 완성 (40장) |
| 인터랙션 | 클릭 wavefront 채우기 · 그라데이션 3종 · undo · 줌(휠+버튼+핀치) · pan(Space/2손가락) · 풀스크린 |
| 사운드 | plop · page turn · chime + 한국어 발음 + 음소거 토글 |
| 출력 | PDF (전체 그림책) + PNG (Instagram 4:5 커버) + Web Share |
| 갤러리 | localStorage 12권 cap, 픽커 상단 carousel, 재공유/삭제 |
| 모바일 | 좌우 풀폭 캔버스 + bottom sheet 팔레트 (peek + 확장) |
| 타이포 | Gowun Batang display tier (60px+) · Geist sans · Geist mono |
| 타깃 환경 | Next.js 16, React 19, Tailwind 4 (Turbopack) |

---

## 3. 디렉터리 구조

```
src/
├── app/
│   ├── layout.tsx           providers + floating cluster (sound/locale)
│   ├── page.tsx             메인 게임 페이지 (1100+ lines, PDF/PNG export 함수 포함)
│   ├── globals.css          Tailwind @theme — display 폰트 변수
│   └── favicon.ico
├── lib/
│   ├── story.ts             ⭐ 8 스토리 데이터 (bilingual + originalTale)
│   ├── i18n.tsx             LocaleProvider + useLocale + Localized type
│   ├── strings.ts           UI 문자열 사전 (~60개)
│   ├── colors.ts            8 테마 + harmony/contrast 알고리즘 + HSL 변환
│   ├── floodfill.ts         wavefront 애니메이션 + 3 fill style
│   ├── sound.ts             Web Audio 절차적 합성 (plop/pageTurn/chime)
│   ├── sound-provider.tsx   SoundProvider + useSound hook
│   └── gallery.ts           localStorage 저장 (저장/조회/삭제/포맷)
├── components/
│   ├── StoryPicker.tsx      픽커 (갤러리 + 8 카드 그리드)
│   ├── ColoringCanvas.tsx   캔버스 + 플로팅 툴바 + 줌/팬/핀치/풀스크린
│   ├── ColorPalette.tsx     데스크탑 사이드바 팔레트
│   ├── MobilePaletteSheet.tsx 모바일 bottom sheet (peek + 확장)
│   ├── OriginalTaleModal.tsx 원작 옛이야기 팝업 (Web Speech 한글 발음)
│   ├── SavedBookViewer.tsx  갤러리 책 보기 모달 (재공유·삭제)
│   ├── LocaleToggle.tsx     한/ENG 토글
│   └── SoundToggle.tsx      🔊/🔇 토글
└── (no test files yet)

public/
└── coloring/
    ├── PROMPTS.md           Gemini용 도안 프롬프트 (8 스토리 × 5장 + 베이스)
    ├── folktale/            해님 달님    (start, forest, well, ending-sky, ending-mountain)
    ├── haenyeo/             해녀와 인어  (start, coral, kelp, ending-guardian, ending-village)
    ├── woodcutter/          선녀와 나무꾼 (start, sage, forest, ending-sky, ending-mountain)
    ├── dokkaebi/            혹부리 영감  (start, sing, hide, ending-blessing, ending-wander)
    ├── kongjwi/             콩쥐와 두꺼비 (start, toad, cow, ending-banquet, ending-village)
    ├── byeoljubu/           별주부전     (start, palace, forest, ending-clever, ending-honor)
    ├── heungbu/             흥부와 놀부  (start, swallow, greed, ending-blessing, ending-lesson)
    └── woodman/             금도끼 은도끼 (start, trial, temptation, ending-share, ending-quiet)

Start.command                Mac 더블클릭으로 dev 서버 + 브라우저 자동 오픈
HANDOFF.md                   ← 이 문서
AGENTS.md / CLAUDE.md        기존 프로젝트 메타
```

---

## 4. 핵심 기술 결정 (Why these?)

### 4.1 i18n — **custom Context, not next-intl**
- **선택 이유**: 안정성 최우선. 의존성 0, 라우팅 변경 없음, 2개 언어 + 유한 콘텐츠라 단순함이 답.
- **구조**: `Localized = { ko: string; en: string }` 타입을 모든 콘텐츠/UI 문자열에 적용. `useLocale()`로 `t({ko, en})` 호출.
- **저장**: `localStorage[coloring-storybook:locale]`. 첫 방문은 `navigator.language`로 자동 감지.

### 4.2 사운드 — **Web Audio API 절차적 합성**
- **선택 이유**: 오디오 파일 0개, 번들 사이즈 증가 0, 로딩/CORS 이슈 0. 모든 모던 브라우저 안정 지원.
- **구조**: `sound.plop()` 등 직접 호출. AudioContext는 첫 사용자 클릭에서 자동 unlock.
- **사운드 종류**: plop (~140ms sine sweep), pageTurn (~220ms 노이즈), chime (~750ms 삼화음)

### 4.3 한글 발음 — **Web Speech API**
- `speechSynthesis.speak(utter)` with `lang = "ko-KR"`, `rate = 0.85`.
- 원작 모달의 단어 옆 🔊 버튼.

### 4.4 PDF/PNG export — **jspdf + html2canvas (동적 import)**
- 동적 import로 메인 번들 안 키움.
- PDF: A4, 표지 + 장면별 (narration + 선택 기록) + 엔딩, ~1.5MB
- PNG: 4:5 (1080×1350) Instagram-native 커버, html2canvas로 렌더, ~700KB-1MB

### 4.5 갤러리 — **localStorage with FIFO eviction**
- key: `coloring-storybook:books:v1`
- 12권 cap. 저장 실패 시 가장 오래된 책 evict 후 재시도.
- 각 책: shareImage(dataURL) + 메타. **모든 장면 이미지는 안 저장** (용량 이슈).

### 4.6 폰트 — **Gowun Batang via next/font/google**
- `--font-gowun` → `--font-display` 변수로 노출
- 영문/한글 모두 우아한 명조체. 픽커 타이틀 60px, 카드 26px, 모달 5xl.

### 4.7 폴더 구조 — **`{storyId}/{sceneId}.png`**
- 이전: 평면 `scene-{shortcode}-{name}.png` (편집 시 흩어짐)
- 이후: 계층 (편집·교체 용이, 새 스토리 추가 시 폴더 하나만)

---

## 5. 스토리 8권 명세

| ID | 한국어 | 영어 | 5 Scene IDs | 분기 구조 |
|---|---|---|---|---|
| `folktale` | 해님 달님 | Sun and Moon | start → forest/well → ending-sky/ending-mountain | 호랑이 피해 도망 |
| `haenyeo` | 해녀와 인어 | The Haenyeo and the Mermaid | start → coral/kelp → ending-guardian/ending-village | 진주 둘러싼 모험 |
| `woodcutter` | 선녀와 나무꾼 | The Fairy and the Woodcutter | start → sage/forest → ending-sky/ending-mountain | 사슴·선녀 만남 |
| `dokkaebi` | 혹부리 영감 | The Old Man and the Goblins | start → sing/hide → ending-blessing/ending-wander | 도깨비 잔치 |
| `kongjwi` | 콩쥐와 두꺼비 | Kongjwi and the Toad | start → toad/cow → ending-banquet/ending-village | 깨진 항아리 |
| `byeoljubu` | 별주부전 | The Hare and the Dragon King | start → palace/forest → ending-clever/ending-honor | 토끼·자라·용궁 |
| `heungbu` | 흥부와 놀부 | Heungbu and Nolbu | start → swallow/greed → ending-blessing/ending-lesson | 제비·박씨 |
| `woodman` | 금도끼 은도끼 | The Gold Axe and the Silver Axe | start → trial/temptation → ending-share/ending-quiet | 산신령 시험 |

모든 스토리에 `originalTale` 메타데이터 포함:
- `koreanTitle`, `romanized`, `englishTitle`
- `origin` (Localized) — 언제·어디서 전해진
- `summary` (Localized) — 아이용 줄거리
- `glossary[]` — 한글·romanized·발음·의미 (Localized)
- `ourVersion` (Localized) — 원작과 우리 분기의 차이

---

## 6. 사용자 흐름 (state machine)

```
[Picker]
   ├─ "Story X" 카드 클릭 → [Game: scene start]
   ├─ "📖 About" 클릭     → OriginalTaleModal (한글 발음 🔊 포함)
   ├─ 갤러리 썸네일 클릭   → SavedBookViewer (재공유·삭제)
   └─ 한/ENG 토글 (fixed bottom-right or mobile top-right)

[Game: scene N]
   ├─ 캔버스 클릭         → wavefront flood fill (180ms 애니메이션) + plop sound
   ├─ 팔레트에서 색 선택  → state update
   ├─ 선택지 카드 클릭    → 0.4s fade + scene 교체 + pageTurn sound
   ├─ ↶ 되돌리기          → undo stack pop (최대 15)
   ├─ 줌 −/100%/+         → CSS scale 변환 (캔버스 픽셀은 1024 고정)
   ├─ Space + 드래그       → pan
   ├─ 2손가락 핀치/드래그   → 모바일 핀치 줌 + pan
   ├─ F 또는 ⛶            → 풀스크린
   └─ (마지막 장에서) ✨ 완성 → handleFinish

[Finish flow]
   ├─ generateShareImage() — html2canvas로 4:5 PNG 만듦
   ├─ chime sound
   ├─ saveBook() — localStorage 자동 저장
   └─ [Final view]
        ├─ 📤 Share        → Web Share API 또는 다운로드
        ├─ 📚 Save as PDF  → exportStorybookPdf()
        ├─ 🔄 Recolor      → handleRestartStory()
        └─ 📖 Pick another → handleBackToPicker()
```

---

## 7. 자주 만나는 작업 패턴

### 7.1 새 UI 문자열 추가
1. `src/lib/strings.ts` — `UI` 객체에 `{ko, en}` 추가
2. 컴포넌트에서 `const { t } = useLocale(); t(UI.myKey)`

### 7.2 새 테마 추가
1. `src/lib/colors.ts` — `ThemeId` 타입에 ID 추가 + `PALETTE_THEMES` 배열에 hexColors 24개 추가
2. `src/lib/strings.ts` — `themeXxx`, `themeXxxDesc` 추가
3. `src/components/ColorPalette.tsx` — `THEME_NAMES`, `THEME_DESCS` 매핑에 추가

### 7.3 새 스토리 추가
1. `src/lib/story.ts` —
   - `StoryId` 타입에 ID 추가
   - `const newStory: Story = { ... }` (id/emoji/title/subtitle/tagline/accent + 5 scenes + originalTale)
   - `STORIES` 객체 + `STORY_LIST` 배열에 추가
2. `public/coloring/{newStoryId}/` 폴더 만들어 5장 PNG 넣기 (scene-id.png 그대로)
3. `public/coloring/PROMPTS.md` — Gemini용 도안 프롬프트 5개 추가
4. Picker에서 자동으로 표시됨

### 7.4 새 사운드 추가
`src/lib/sound.ts`의 `SoundEngine` 클래스에 메서드 추가, Web Audio nodes로 합성.

---

## 8. Gotchas — 코드 만지기 전에 알아두면 좋은 것

### 8.1 F키 풀스크린이 안 먹힐 때
`<input type="range">` (L 슬라이더) 등 비텍스트 input에 포커스 있으면 차단되던 버그가 있어서 fix함.
`isTypingTarget()`은 **텍스트성 input/textarea/contenteditable만** true. range, color, checkbox는 false.

### 8.2 그라데이션 영역 refill
다른 색으로 다시 칠할 때 그라데이션 픽셀들이 일부만 바뀌던 문제. 시작 픽셀이 흰색이 아니면(`>230` 임계) tolerance 자동으로 60 → 220으로 올림 (`floodfill.ts`).

### 8.3 모바일 핀치 줌 후 fill 오발
2손가락 제스처 끝나고 잠깐 click 이벤트가 따라옴. `recentPinchEndRef`로 350ms 동안 click 억제.

### 8.4 wavefront 애니메이션 cancel
진행 중에 undo 누르면 `handle.cancel()` 호출 + pre-fill snapshot 복원. 새 클릭은 애니메이션 중에 무시 (race 방지).

### 8.5 갤러리 dataURL 용량
12권 × ~1MB = 12MB. localStorage 한계(5-10MB) 근접. quota error 시 자동 FIFO evict, 그래도 실패하면 그냥 skip (best-effort).

### 8.6 모달 + 모바일 floating cluster z-index
모달 z-50, 모바일 toggle cluster top-3 right-3 z-50, 모바일 bottom sheet z-30/40, 모달 띄우면 cluster가 모달 위에 보이는 게 정상. (모달 닫기 위해 cluster 가리지 않음.)

### 8.7 PDF 생성 중 한글 폰트
html2canvas는 페이지에 로드된 폰트를 캡처. Gowun Batang이 next/font로 로드되어 있으면 PDF/PNG export에 깨끗하게 들어감. 만약 미리 로드 못 한 상태에서 export 시도하면 fallback (Apple SD Gothic Neo / Pretendard / Georgia)으로 표시됨.

### 8.8 Story title의 chapter prefix
PDF export에서 scene 제목의 "1장. " 또는 "Chapter 1 — " prefix를 regex로 떼고 출력. 새 스토리 추가할 때 제목 패턴 따라가야 prefix 처리됨.

### 8.9 wizard 스토리는 의도적으로 삭제됨
초기 v0.1에는 "마법사의 성"이 있었으나 한국 전래동화 톤 통일하면서 제거. git log에 남아있음. 마음 바뀌면 복원 쉬움.

---

## 9. 실행 방법

### 9.1 개발
```bash
cd /Users/ryan/Projects/Coloring_book-Website
npm run dev          # 또는 Start.command 더블클릭
# → http://localhost:3000
```

### 9.2 빌드 검증
```bash
npx tsc --noEmit     # 타입체크 (CI/CD 첫 게이트)
npx next build       # 프로덕션 빌드
```

### 9.3 의존성
- `next@16.2.9`, `react@19.2.4`
- `tailwindcss@4`
- `jspdf`, `html2canvas` (export용)
- (next/font 통해) Geist, Geist Mono, Gowun Batang

---

## 10. 미완 / 다음 후보

design-critique과 사용자 합의로 정해진 우선순위:

### 🟢 콘텐츠 / 시각
- **스토리 카드 라인아트 아이콘** (Gemini 8개) — 카드의 이모지를 도안 라인아트 스타일 작은 일러스트로 교체. 카드가 미니 책 표지처럼 보이도록.

### 🟢 마케팅 / 시장 진입
- **랜딩 페이지 카피** — 픽커를 마케팅용 hero로 보강: "Real Korean folktales for kids", "8 stories · bilingual · printable"
- **OG 이미지** — SNS 공유 시 미리보기 카드 (`/og-image.png`, layout.tsx metadata에 추가)
- **도메인** — `korean-folktales.app` 같은 이름 후보. 공유 이미지에 이미 attribution으로 박혀있음.
- **About / Privacy 페이지** — 부모용 신뢰 페이지

### 🟢 폴리시
- **즐겨찾는 색** (별 표시로 빠른 픽)
- **장면 진행 미니맵** (헤더에 ●→●→○)
- **다국어 확장 후보**: 일본어/중국어 (콘텐츠 확장 의지 따라)
- **사운드 다양성**: 색 선택 시 미세한 톡 (현재 너무 시끄러우면 생략)

### 🟢 기술
- **테스트 코드 0개** — playwright e2e 한두 개 정도 추가 권장 (CI 안 함, 수동 검증으로만 유지 중)
- **a11y 감사** — `design:accessibility-review` skill로 한 번 패스 (대비, focus ring, ARIA)

---

## 11. 결정 기록 (Why decisions were made)

| 결정 | 시점 | 근거 |
|---|---|---|
| 한국 전래동화로 톤 통일 (wizard 제거) | v0.3 | 미국 시장 K-content 포지셔닝 |
| 이중언어 — 옵션 C | v0.4 | 미국 부모: "내 아이가 한국어 노출" 셀링포인트 |
| custom i18n vs next-intl | v0.4 | 안정성·간결성 우선, 2개 언어면 충분 |
| Gowun Batang | v0.5 | 영문·한글 모두 우아, next/font 자동 최적화 |
| 4:5 PNG (vs 세로 stacked) | v0.5 | Instagram-native, 공유 우선 |
| 한국 전통색 24×2 | v0.5 | 한국 정체성 + 따뜻한 톤 + 차가운 톤 분리 |
| Fill mode 큰 미리보기 버튼 | v0.5 | 아이의 호기심·발견 UX (design-critique 권장) |
| 모바일 bottom sheet | v0.6 | 데스크탑처럼 한 화면에서 색 ↔ 캔버스 즉시 |
| 폴더 구조 `{storyId}/{sceneId}` | v0.6 | 새 스토리 추가 시 디렉터리 하나로 끝 |
| 갤러리는 localStorage | v0.6 | 가벼움 우선, IndexedDB는 오버킬 |

---

## 12. 빠른 검증 체크리스트 (작업 끝 후 PR/푸시 전)

- [ ] `npx tsc --noEmit` 통과
- [ ] `npm run dev`로 띄워 픽커 → 스토리 → 완성 풀 흐름 동작
- [ ] 한/영 토글 전환 모든 텍스트 바뀌는지
- [ ] 📖 About 모달의 🔊 버튼 음성 재생
- [ ] 그림책 완성 시 갤러리 자동 추가 + Web Share or 다운로드
- [ ] 모바일 (414px 폭) bottom sheet peek + 확장 동작
- [ ] Console에 에러 0개

---

## 13. 핵심 인사이트 (디자인 비평에서 얻은)

1. **Typography hierarchy가 모든 화면의 기반**. Display tier 없이 다른 디테일 잡아도 "amateur" 느낌이 남는다.
2. **Card spam을 피하라**. 모든 게 카드면 아무것도 카드가 아니다.
3. **모바일 팔레트는 bottom sheet이거나 깨진 UX다**. 색 → 캔버스 흐름을 끊으면 안 됨.
4. **Web Share API는 마케팅 입소문의 발판**. 4:5 + 네이티브 공유 시트 = 마찰 최소.
5. **🔊 한국어 발음**은 시그니처 모먼트. 부모 입장에서 "이 앱 진짜 교육적이다" 신호.

---

## 14. 연락 (지난 세션과의 교신)

- 마지막 작업: 폴더 재구조 + 신규 3 스토리 도안 15장 정리
- 다음 자연스러운 후보: 스토리 카드 라인아트 아이콘 (Gemini 8개) 또는 랜딩 페이지 카피
- 사용자 톤: 빠른 결정, 깔끔한 시각, 디테일 신경 씀, 안정성 우선
- 사용자 응답 패턴: "응 가자", "잘된다", "이거 해줘" — 명확한 짧은 신호

---

*마지막 갱신: v0.6 · 한국 옛이야기 컬렉션 풀세트 완성 시점.*
