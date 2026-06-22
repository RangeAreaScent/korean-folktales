# Korean Folktales — Coloring Storybook · Handoff

> **읽기 시간 ~12분** · 새 세션 시작 시 컨텍스트를 즉시 잡기 위함.
> 코드 만지기 전에 §1·§2·§3·§9만 먼저 훑고, 막힐 때 §10·§11 참조하세요.

---

## 1. 한 줄 요약

**Korean Folktales — A Bilingual Coloring Storybook.**
미국·글로벌 K-content 관심층 + 자녀 둔 부모 타깃 **분기형 한국 옛이야기 색칠 책** 웹앱.
8개 옛이야기 × 5장면 = 40 도안 · 한/영 이중언어 · 클릭 wavefront 색칠 · PDF/PNG 공유 · 갤러리.

**라이브**: https://koreanfolktales.ink
**GitHub**: https://github.com/RangeAreaScent/korean-folktales
**Vercel 프로젝트**: `korean-folktales` (rangeareascent-s-projects)

핵심 차별점:
1. **8 한국 전래동화** (해님 달님·해녀와 인어·선녀와 나무꾼·혹부리 영감·콩쥐와 두꺼비·별주부전·흥부와 놀부·금도끼 은도끼)
2. **이중언어 (한/영)** — 콘텐츠 + UI 전부, localStorage 기억
3. **🔊 한국어 발음** (Web Speech API)
4. **인스타 친화 4:5 공유 이미지** + 페이지별 공유 + Web Share API
5. **갤러리** — localStorage 12권 cap, 재공유/삭제
6. **플립북 캐러셀** — 완성 후 표지 + 각 장면 좌우 슬라이드
7. **분기 + 정통 결말** (PROMPTS_V2 콘텐츠) — Y구조 4막 (1·2 공통 → 3 분기 → 4 정통)

---

## 2. 현재 버전 · v0.8

| 분야 | 상태 |
|---|---|
| **콘텐츠 (Story 2 V2.5 라이브)** ⭐ | 해녀와 인어가 Y구조 5장면 + 풍부 narration + V2.5 한국 그림책 스타일로 production. PNG·story.ts·렌더링 모두 V2.5 |
| **콘텐츠 (Stories 1, 3-8: V1 라이브 + V2.5 프롬프트 대기)** | PROMPTS_V2.md에 7개 스토리 풍부 narration + Y구조 + V2.5 스타일 체크리스트 완성. PNG 재생성 + story.ts 마이그레이션 대기 |
| **앱 코어** | 클릭 wavefront · 그라데이션 3종 · undo · 줌(휠+버튼+핀치) · pan(Space/2손가락) · 풀스크린 · 누출 감지 |
| **Scene 진행 (NEW)** | Y구조 지원 — `nextId`(linear, 단일 "Continue →" 버튼) · `choices`(branching, 2개 카드) · `endingLabel`(ending, Complete 버튼) 3-state |
| **사운드** | water-droplet plop (5음 펜타토닉 랜덤) · page turn · chime + 한국어 발음 + 음소거 토글 |
| **출력** | PDF (표지+장면별+엔딩) + PNG (Instagram 4:5 표지/장면별) + Web Share |
| **갤러리** | localStorage 12권 cap, 픽커 상단 carousel, 재공유/삭제 |
| **최종 뷰** | 플립북 캐러셀 (표지 + 각 장면 좌우 슬라이드 0.5s ease-out, 키보드 ←/→, 도트 인디케이터, 페이지별 share) |
| **Narration 박스** | 스크롤형 max-h 36vh, 상/하 페이드 마스킹, 멀티-paragraph (\\n\\n split) — V2.5 긴 narration 호환 |
| **모바일** | 좌우 풀폭 캔버스 + bottom sheet 팔레트 (peek + 확장) |
| **타이포** | Gowun Batang display tier (60px+) · Geist sans · Geist mono |
| **인프라** | Next.js 16, React 19, Tailwind 4 (Turbopack), Vercel 자동 배포 |
| **분석/SEO** | Vercel Analytics · GSC verified (URL prefix) · sitemap.xml · robots.txt · OG image · 호랑이 favicon · 8 SEO 페이지 |

---

## 3. 디렉터리 구조

```
src/
├── app/
│   ├── layout.tsx                  providers + floating cluster + metadata + Analytics
│   ├── page.tsx                    메인 게임 페이지 (~1100 lines, PDF/PNG export 포함)
│   ├── globals.css                 Tailwind @theme + narration-scroll 스타일
│   ├── icon.png                    favicon (32px tiger)
│   ├── apple-icon.png              iOS home icon (180px tiger)
│   ├── opengraph-image.tsx         동적 OG (1200×630)
│   ├── robots.ts                   /robots.txt
│   ├── sitemap.ts                  /sitemap.xml (11 URL)
│   ├── about/page.tsx              About 페이지 (한/영)
│   ├── privacy/page.tsx            Privacy 페이지 (한/영)
│   └── folktales/[slug]/page.tsx   8 SEO 페이지 (모달과 동일 콘텐츠 + Other folktales cross-links)
├── lib/
│   ├── story.ts                    ⭐ 8 스토리 데이터 (bilingual + originalTale + STORY_SLUGS)
│   ├── i18n.tsx                    LocaleProvider + useLocale + Localized type
│   ├── strings.ts                  UI 문자열 사전 (~80개)
│   ├── colors.ts                   8 테마 + harmony/contrast + HSL
│   ├── floodfill.ts                wavefront 애니메이션 + 3 fill style + 누출 감지 (maxFillRatio)
│   ├── sound.ts                    Web Audio 절차적 합성 (water-drop plop / pageTurn / chime)
│   ├── sound-provider.tsx          SoundProvider + useSound hook
│   └── gallery.ts                  localStorage 12 책 저장 + 포맷
├── components/
│   ├── StoryPicker.tsx             픽커 (갤러리 carousel + 8 카드 + trust pills + About/Privacy 푸터)
│   ├── ColoringCanvas.tsx          캔버스 + 플로팅 툴바 + 줌/팬/핀치/풀스크린
│   ├── ColorPalette.tsx            데스크탑 사이드바 팔레트
│   ├── MobilePaletteSheet.tsx      모바일 bottom sheet (peek + 확장)
│   ├── OriginalTaleModal.tsx       원작 모달 (Web Speech 발음 + Start coloring + View as page)
│   ├── SavedBookViewer.tsx         갤러리 책 보기 (재공유·삭제)
│   ├── LocaleToggle.tsx            한/ENG
│   └── SoundToggle.tsx             🔊/🔇

public/
└── coloring/
    ├── PROMPTS.md                  V1 도안 프롬프트 (참고용)
    ├── PROMPTS_V2.md               ⭐ V2 풍부 narration + Y구조 + 보더 스펙 (모든 8 스토리)
    ├── ICON_PROMPTS.md             스토리 카드 아이콘 프롬프트 (Gemini 생성용)
    ├── 01-folktale/                해님 달님    (start, forest, well, ending-sky, ending-mountain)
    ├── 02-haenyeo/                 해녀와 인어
    ├── 03-woodcutter/              선녀와 나무꾼
    ├── 04-dokkaebi/                혹부리 영감
    ├── 05-kongjwi/                 콩쥐와 두꺼비
    ├── 06-byeoljubu/               별주부전
    ├── 07-heungbu/                 흥부와 놀부
    ├── 08-woodman/                 금도끼 은도끼
    ├── icons/                      8 라인아트 카드 아이콘 (storyId.png, 투명 배경)
    └── Backup_v1/                  v0.6 시점 모든 도안 백업 (git tag v0.6-scenes-original 와 동일)

루트 (꼭 알 것):
HANDOFF.md                       이 문서
PINTEREST_PLAYBOOK.md            Pinterest 마케팅 전략 (11 섹션)
README.md                        Next.js 기본
AGENTS.md / CLAUDE.md            프로젝트 메타
Start.command                    Mac 더블클릭 → dev + 브라우저
.screenshots/                    🔻 모든 스크린샷/디버그 PNG는 여기로 (gitignore)
.backups/coloring-v0.6/          v0.6 도안 로컬 백업 (gitignore)
```

---

## 4. 핵심 기술 결정 (Why these?)

### 4.1 i18n — custom Context, not next-intl
- 안정성·간결성 우선. 의존성 0, 2개 언어 + 유한 콘텐츠.
- `Localized = { ko: string; en: string }` 타입 모든 콘텐츠/UI에 적용.
- localStorage `coloring-storybook:locale` + `navigator.language` 자동 감지.

### 4.2 사운드 — Web Audio 절차적 합성
- 오디오 파일 0개, 번들 증가 0, 로딩/CORS 0.
- `plop()`은 물방울 톤 (5음 펜타토닉 C4-A4 랜덤 + 직후 sub-octave)
- pageTurn (~220ms 노이즈), chime (~750ms 삼화음)

### 4.3 한글 발음 — Web Speech API
- `speechSynthesis.speak(utter)` `lang = "ko-KR"`, `rate = 0.85`

### 4.4 PDF/PNG export — jspdf + html2canvas (동적 import)
- 동적 import로 메인 번들 안 키움
- PDF: A4 표지+장면별 ~1.5MB
- PNG: 1080×1350 Instagram 4:5
- **표지 + 장면별 share 둘 다 지원** (page.tsx에 `generateShareImage` + `generateScenePng`)

### 4.5 갤러리 — localStorage FIFO
- `coloring-storybook:books:v1` 12권 cap, quota error 시 자동 evict
- 표지 dataURL + 메타만 저장 (모든 장면 X)

### 4.6 폰트 — Gowun Batang via next/font
- `--font-gowun` → `--font-display`

### 4.7 폴더 구조 — `{NN}-{storyId}/{sceneId}.png`
- v0.7부터 숫자 prefix (01-folktale, …, 08-woodman) — 파일 시스템 순서가 캐논 순서 일치

### 4.8 누출 감지 — floodfill.ts
- `maxFillRatio: 0.55` 기본 — 한 클릭이 캔버스 55% 넘게 칠하면 abort + 친절한 hint
- 끊긴 선으로 색이 페이지 전체로 새는 것 차단

### 4.9 플립북 캐러셀
- `transition-transform duration-500 ease-out` 으로 부드러운 슬라이드
- 키보드 ←/→ + 도트 인디케이터 + pageTurn 사운드
- 표지 + N장 + 페이지별 share 버튼

### 4.10 V2 narration 스크롤
- 옛이야기 톤 narration이 길어서 카드 안에 max-h 36vh + 상/하 페이드 마스킹 + 멀티-paragraph (\\n\\n split)
- `globals.css`에 `.narration-scroll` 클래스

### 4.11 Scene 3-state (Y구조용)
`src/lib/story.ts`의 `Scene` 타입은 3가지 상태 중 하나만 가짐:
- **`nextId: SceneId`** — Linear scene. 단일 "Continue → / 다음 이야기로 →" 버튼. Y구조의 1·3a·3b 위치
- **`choices: [Choice, Choice]`** — Branching scene. 2개 카드. Y구조의 2번 위치
- **둘 다 없음 + `endingLabel`** — Ending scene. "그림책 완성하기" 버튼. Y구조의 4번 위치

`page.tsx` 렌더링에서 `choices ? branching : nextId ? linear : ending` 순서로 분기.
Linear 진행은 기존 `handleChoice(nextId)` 재활용 (chosenLabel은 null).

### 4.12 V2.5 한국 그림책 스타일라이제이션 레이어
V2 기본은 "한국적 요소가 있는 깔끔한 색칠 도안"이지만, V2.5는 한 단계 위 — **한국 전통 그림책 일러스트**.

핵심 차이:
- **구름** → 단순 블롭 ❌ → 민화 구름 무늬 (둘둘 말린 곡선)
- **해/달** → 직선 광선 ❌ → 곡선 광선 + 선택적 부드러운 얼굴
- **파도** → 단순 곡선 ❌ → minhwa 파도 무늬 (말린 curl)
- **산** → 작은 봉우리 ❌ → layered 실루엣 + ridge accent
- **인어·선녀** → 평범 strand 머리 ❌ → spiral curl 끝 + 한국 머리장식
- **제주 초가** → 단순 돔 ❌ → 로프 격자 패턴 명시
- **배경 액센트** → 매화 sprig·단청 띠 등 한국 시그니처

V2.5는 옵트인 레이어 — 각 스토리 PROMPTS_V2.md 상단에 "V2.5 적용 중" 마커가 있으면 베이스 + V2.5 레이어 + 스토리 체크리스트 + Subject 블록을 합쳐 Gemini 입력.

**현재 V2.5 적용 상태:**
- ⭐ Story 2 (haenyeo) — production 라이브
- 🔄 Stories 1, 3-8 — 프롬프트 준비됨, PNG 생성 대기

---

## 5. 스토리 8권 명세

| # | Slug (folder) | 한국어 | 영어 | 라이브 | 분기 (V2 Y구조) | 정통 결말 |
|---|---|---|---|---|---|---|
| 1 | `01-folktale` (`sun-and-moon`) | 해님 달님 | Sun and Moon | V1 | 손 보여달라 / 자장가 부르라 | 두 동아줄·수수밭·해/달 부끄럼 자리 바꿈 |
| 2 | `02-haenyeo` (`haenyeo-and-the-mermaid`) | 해녀와 인어 | Haenyeo and Mermaid | **⭐ V2.5** | 산호 미로 / 해초 숲 | 진주 반환·수호자·잠수경 안 푸른 별·손녀 대잇기 |
| 3 | `03-woodcutter` (`fairy-and-the-woodcutter`) | 선녀와 나무꾼 | Fairy and Woodcutter | V1 | 산속 오두막 / 마을 어머니 곁 | 두레박·하늘 가족·새벽 빛이 된 그리움 |
| 4 | `04-dokkaebi` (`old-man-and-the-goblins`) | 혹부리 영감 | Old Man and Goblins | V1 | 흥겨운 마을 노래 / 어머니 자장가 | 혹 떼임·보물·욕심쟁이 혹 두 개 |
| 5 | `05-kongjwi` (`kongjwi-and-the-toad`) | 콩쥐와 두꺼비 | Kongjwi and Toad | V1 | 베틀 + 참새 / 검은 소의 선물 | 꽃신 짝·사또·계모 가족 용서 |
| 6 | `06-byeoljubu` (`hare-and-the-dragon-king`) | 별주부전 | Hare and Dragon King | V1 | 자라 따라 용궁 / 까치 귀띔 | 토끼 기지·산삼·우정 |
| 7 | `07-heungbu` (`heungbu-and-nolbu`) | 흥부와 놀부 | Heungbu and Nolbu | V1 | 가족과 보살핌 / 어머니 약방문 | 박씨·도깨비·산신·형제 화해 |
| 8 | `08-woodman` (`gold-axe-and-silver-axe`) | 금도끼 은도끼 | Gold and Silver Axe | V1 | 단호한 정직 / 흔들림 포함 정직 | 세 도끼·욕심쟁이 빈 손 |

**Y구조**: 1·2 공통 → 3 분기 (3a/3b) → 4 정통 결말. 한 회 플레이 = 4 장면. Scene type 3-state(`nextId`/`choices`/`endingLabel`)로 구현.
**V1 라이브** (Story 1, 3-8): 1 → 2a/2b → 3a/3b (분기 엔딩 2개). PROMPTS_V2.md에 V2.5 프롬프트 준비돼 있음, 도안 생성 + story.ts 마이그레이션 대기 (Story 2 패턴 그대로).
**V2.5 라이브** (Story 2): 5장면 모두 V2.5 PNG + Y구조 + 풍부 narration + canonical ending production.

각 스토리 `originalTale`에 `koreanTitle / romanized / englishTitle / origin / summary / glossary[] / ourVersion`.
**Slug 매핑**: `STORY_SLUGS` in `src/lib/story.ts` (URL용 영문 친화 슬러그)

---

## 6. 사용자 흐름 (state machine)

```
[Picker]
   ├─ 카드 클릭 → [Game: scene start]
   ├─ "📖 About" 버튼 클릭 → OriginalTaleModal
   │     ├─ Start coloring → 모달 닫고 게임 시작
   │     └─ 🔗 View as page → /folktales/{slug}
   ├─ 갤러리 썸네일 → SavedBookViewer
   └─ /about, /privacy 푸터 링크

[/folktales/{slug}] (SEO)
   └─ 🎨 Start coloring → /?start={storyId} → 자동 게임 시작 (page.tsx의 useEffect)

[Game: scene N]
   ├─ 캔버스 클릭 → wavefront fill (180ms) + plop
   ├─ 팔레트 색 선택 → state update
   ├─ 선택지 카드 → 0.4s fade + scene 교체 + pageTurn
   ├─ ↶ undo (max 15)
   ├─ 줌 −/100%/+ · Space+드래그 pan · 핀치 모바일
   └─ (마지막 장) ✨ 완성 → handleFinish

[Finish]
   ├─ generateShareImage() — 4:5 표지
   ├─ chime
   ├─ saveBook() — localStorage 자동
   └─ [Final view = Flipbook]
        ├─ 좌우 화살표 / 키보드 / 도트 → 표지 + 각 장면 슬라이드
        ├─ 📤 [표지 또는 이 장면] 공유 → 4:5 PNG + Web Share
        ├─ 📚 PDF 저장
        ├─ 🔄 다시 색칠 / 📖 다른 이야기
        └─ 색칠 완료 갤러리에 자동 추가
```

---

## 7. 인프라

### 7.1 도메인
- `koreanfolktales.ink` — Namecheap 등록, Vercel A record (76.76.21.21)
- `www.koreanfolktales.ink` — CNAME → cname.vercel-dns.com.
- TLS 자동 (Vercel)

### 7.2 GitHub
- `RangeAreaScent/korean-folktales` (public)
- `main` 브랜치가 production
- Vercel for GitHub 연결됨 → push 시 자동 배포

### 7.3 Vercel
- 프로젝트: `korean-folktales`
- 자동 배포 활성화
- Vercel Analytics 활성화 (cookieless, 무료 한도)
- `npx vercel --prod --yes --name korean-folktales` 로 수동 배포도 가능

### 7.4 Google Search Console
- URL prefix property: `https://koreanfolktales.ink` (verified via HTML meta tag in `layout.tsx`)
- Sitemap submitted: `sitemap.xml` (11 URL)
- `verification.google` 토큰: `FN2UIhpj0nlnXmj4IgbOJQE6J1e6VvHxt0WhHlo83Cg` (layout.tsx metadata)

### 7.5 백업
- Git tag `v0.6-scenes-original` (origin에 푸시됨) — v0.6 시점 모든 도안
- 로컬 `.backups/coloring-v0.6/` — 34MB, gitignore
- 각 스토리 폴더 안의 v1 PNG들은 `Backup_v1/` 으로 옮겨질 예정 (V2 도안 모이면)

---

## 8. 자주 만나는 작업 패턴

### 8.1 새 UI 문자열 추가
1. `src/lib/strings.ts` — `UI` 객체에 `{ko, en}` 추가
2. 컴포넌트에서 `const { t } = useLocale(); t(UI.myKey)`

### 8.2 새 도안 (V2.5) 생성 → 통합 (Story 2 검증된 패턴)
**Gemini 프롬프트 생성:**
1. `public/coloring/PROMPTS_V2.md` 해당 스토리 섹션의 V2.5 마커 확인
2. **베이스 스펙** + **V2.5 레이어** + **스토리 체크리스트** + **Scene Subject 블록** 순서로 합쳐 Gemini 입력
3. 받은 PNG에 13항목 QA (PROMPTS_V2.md 체크리스트) 적용 — 보더 연속성·디테일 최소선·한국 도구 대체 방지·V2.5 minhwa 요소 모두 점검
4. `public/coloring/{NN}-{storyId}/scene-{1-shore|2-deep|3a-...|3b-...|4-...}.png` 위치 저장
5. 5장 다 모이면 story.ts 마이그레이션

**story.ts 마이그레이션 (Story 2 패턴 그대로):**
1. 해당 스토리 객체의 `startSceneId` → `scene-1-...` 으로 변경
2. `scenes` 객체를 V2.5 5장면으로 재구성:
   ```ts
   "scene-1-...": { ..., nextId: "scene-2-..." },        // linear
   "scene-2-...": { ..., choices: [..3a, ..3b] },        // branching
   "scene-3a-...": { ..., nextId: "scene-4-..." },       // linear
   "scene-3b-...": { ..., nextId: "scene-4-..." },       // linear
   "scene-4-...": { ..., endingLabel: {...} },           // canonical ending
   ```
3. 각 narration은 PROMPTS_V2.md의 풍부 버전 그대로 (멀티-paragraph `\\n\\n` 포함)
4. `originalTale.ourVersion` 도 V2.5 정통 결말 반영해 갱신 (분기 엔딩 언급 제거)
5. `npx tsc --noEmit` + `npx next build` 통과 확인
6. `npm run dev` → 두 분기 (3a, 3b) 다 플레이 → Complete book → 플립북 검증

### 8.3 새 스토리 추가
1. `src/lib/story.ts` — `StoryId` 타입에 ID 추가 + 데이터 객체 + `STORIES` + `STORY_LIST` + `STORY_SLUGS`
2. `public/coloring/{NN}-{storyId}/` 폴더 5장 PNG
3. `public/coloring/icons/{storyId}.png` 라인아트 아이콘 (투명 배경 1024×1024)
4. `PROMPTS_V2.md`에 새 스토리 섹션 추가 (Y구조 + 풍부 narration)

### 8.4 새 사운드 추가
`src/lib/sound.ts`의 `SoundEngine` 클래스에 메서드 추가, Web Audio nodes로 합성

### 8.5 스크린샷 / 디버그 PNG 저장 위치 ⚠️
**모든 임시 스크린샷은 `.screenshots/` 폴더로** (gitignore됨). 루트에 직접 저장 금지.
- Playwright MCP `browser_take_screenshot` 사용 시 `filename: ".screenshots/foo.png"` 처럼 명시
- Bash로 PNG 임시 생성 시 `.screenshots/...` 경로 사용
- `.gitignore`에 `/*.png` 룰 있어서 루트 PNG는 자동 제외되지만, 깔끔하게 폴더 분리 권장

---

## 9. 실행 방법

### 9.1 개발
```bash
cd /Users/ryan/Projects/Coloring_book-Website
npm run dev
# → http://localhost:3000
# 또는 Start.command 더블클릭
```

### 9.2 빌드 검증
```bash
npx tsc --noEmit     # 타입 게이트
npx next build       # 프로덕션 빌드
```

### 9.3 배포
**자동:** `git push origin main` → Vercel이 자동 production 배포 (~1분)
**수동:** `npx vercel --prod --yes --name korean-folktales`

### 9.4 의존성
- `next@16.2.9`, `react@19.2.4`
- `tailwindcss@4`
- `jspdf`, `html2canvas` (export용)
- `@vercel/analytics`
- (next/font 통해) Geist, Geist Mono, Gowun Batang

---

## 10. Gotchas — 코드 만지기 전에 알아두면 좋은 것

### 10.1 F키 풀스크린이 안 먹힐 때
range/color/checkbox는 OK. 텍스트성 input/textarea/contenteditable만 차단. `isTypingTarget()` in `ColoringCanvas.tsx`.

### 10.2 그라데이션 영역 refill
다른 색으로 다시 칠할 때 시작 픽셀이 흰색이 아니면(`>230` 임계) tolerance 자동으로 60 → 220 (`floodfill.ts`).

### 10.3 모바일 핀치 줌 후 fill 오발
2손가락 끝난 직후 click 따라옴. `recentPinchEndRef` 350ms 억제.

### 10.4 wavefront 애니메이션 cancel
진행 중 undo → `handle.cancel()` + pre-fill snapshot 복원. 새 클릭은 애니메이션 중 무시.

### 10.5 갤러리 dataURL 용량
12권 × ~1MB = 12MB. localStorage 한계(5-10MB) 근접. quota error 시 자동 FIFO evict, 그래도 실패 시 skip.

### 10.6 누출 감지
한 클릭이 캔버스 55% 초과 칠 → abort + "선이 살짝 끊어진 곳 같아요" 안내. 비율은 `floodfill.ts`의 `maxFillRatio`. 새 도안에서 너무 민감하면 0.65로 올리면 됨.

### 10.7 PDF 한글 폰트
html2canvas는 페이지 로드된 폰트 캡처. Gowun Batang이 next/font로 로드돼 있으면 깨끗. 미리 로드 못 한 상태에서 export하면 fallback (Apple SD Gothic Neo / Pretendard / Georgia).

### 10.8 Story title의 chapter prefix
PDF + 플립북에서 scene 제목의 "1장. " 또는 "Chapter 1 — " regex로 떼고 출력. 새 스토리 추가 시 같은 패턴 따라야 prefix 처리됨.

### 10.9 모달 + 모바일 floating cluster z-index
모달 z-50, 모바일 toggle cluster top-3 right-3 z-50, 모바일 bottom sheet z-30/40.

### 10.10 카드 클릭 = Begin (Begin pill 시각 제거됨)
콘텐츠는 `pointer-events-none`, 아이콘+타이틀 영역 클릭 시 z-10 absolute 버튼이 받아 onPick 발사. 카드 내 About 버튼만 stopPropagation으로 모달 열림.

### 10.11 ?start=storyId 딥링크
`/?start=folktale` → page.tsx의 useEffect가 자동 pickStory 후 URL에서 파라미터 제거. `/folktales/[slug]`의 CTA가 이걸로 게임 시작.

### 10.12 V1 vs V2.5 콘텐츠 혼재 상태
**현재 라이브 상태:**
- **Story 2 (haenyeo)** = V2.5 완전 적용 (PNG + Y구조 + V2.5 narration + canonical ending)
- **Stories 1, 3-8** = 여전히 V1 (V1 PNG + V1 narration + 분기 엔딩 2개)

V2.5 narration이 PROMPTS_V2.md에 모두 작성돼 있으니 도안만 받으면 Story 2 패턴(§8.2)으로 바로 마이그레이션 가능. **혼재 상태가 사용자에게는 문제 없음** — 각 스토리는 독립적이라 V1 흐름·V2.5 흐름이 카드 클릭으로 분기.

### 10.13 Scene 3-state 진행 규칙
Scene 타입의 세 상태는 **상호 배타적**:
- `nextId` 있음 → linear ("Continue →" 단일 버튼)
- `choices` 있음 → branching (2개 카드)
- 둘 다 없음 + `endingLabel` → ending ("Complete book" 버튼)

`page.tsx` 렌더링은 `choices ? branching : nextId ? linear : ending` 순. 한 scene에 `nextId`와 `choices`를 같이 두면 `choices`가 이김 (의도된 동작 — branching 우선).

V1 스토리 (Story 1, 3-8)는 모든 scene이 `choices` 또는 `endingLabel` 만 사용 (linear 미사용). V2.5 스토리 (Story 2)는 5장면 중 3장면이 linear, 1장면이 branching, 1장면이 ending.

### 10.13 GSC favicon 캐시
URL prefix property가 인증된 시점의 favicon이 GSC 대시보드에 남음. 실제 사용자에겐 호랑이 표시. 며칠~몇 주 후 자동 갱신됨.

---

## 11. 미완 / 다음 후보

### 🟢 콘텐츠 / 시각 (V2.5 확산이 다음 큰 트랙)
- **V2.5 도안 생성 — Story 1, 3-8** (7 스토리 × 5장면 = 35장 Gemini) — 각 스토리의 PROMPTS_V2.md 섹션이 V2.5 마커 + 체크리스트 포함됐으니 베이스 + V2.5 레이어 + 체크리스트 + Subject 블록 입력. Story 2 검증된 패턴
- **V2.5 마이그레이션 — Story 1, 3-8** — 도안 모이는 대로 story.ts 마이그레이션 (Story 2 패턴: §8.2 참조). 7 스토리 모두 끝나면 Backup_v1 폴더의 V1 PNG 삭제 가능
- **랜딩 페이지 hero 강화** — picker 상단 마케팅 카피 (현재 이미 trust pills + 가이드 arrow까지는 적용됨)
- **OG 이미지 개선** — 현재는 자동 생성된 텍스트 베이스. 호랑이 라인아트 추가하면 임팩트 ↑
- **Story 2 라이브 한/영 토글 + 갤러리 + PDF 검증** — V2.5 마이그레이션 직후 라이브에서 실제 사용자 경험 한 번 더 확인

### 🟢 마케팅 / 성장
- **Pinterest 운영** — `PINTEREST_PLAYBOOK.md` §10 체크리스트부터 시작 (Business 계정 + 8 보드 + 첫 8 메인 핀)
- **자동 핀 생성기** — `src/app/pin/[slug].tsx` ImageResponse로 1000×1500 핀 동적 생성 (playbook §6)
- **GA / Plausible 추가 분석** (현재 Vercel Analytics만)
- **GSC URL 검사 → Request Indexing** 8 스토리 페이지 다 (수동 노가다, 인덱싱 가속)

### 🟢 폴리시
- **즐겨찾는 색** (별 토글, 빠른 픽)
- **장면 진행 미니맵** (헤더 ●→●→○)
- **a11y 감사** (`design:accessibility-review`)
- **테스트 코드** (현재 0개) — playwright e2e 1-2개

### 🟢 수익화 준비 (AdSense)
- **자체 도메인** ✅
- **About / Privacy** ✅
- **Sitemap** ✅
- **트래픽 ~1-3개월 누적** ⏳ (현재 14명/56뷰, 봇 ~60-70%)
- **AdSense 신청 시점** — 월 1000+ 실 방문자 도달 후

### 🟢 음악 (보류)
사용자가 음원 royalty-free 찾으면 SoundProvider에 `music.play()` 추가. `<audio loop>` + 음소거 토글 연동.

---

## 12. 결정 기록 (Why decisions were made)

| 결정 | 시점 | 근거 |
|---|---|---|
| 한국 전래동화로 톤 통일 (wizard 제거) | v0.3 | 미국 시장 K-content 포지셔닝 |
| 이중언어 — 옵션 C | v0.4 | 미국 부모 "내 아이가 한국어 노출" |
| custom i18n vs next-intl | v0.4 | 안정성·간결성 우선 |
| Gowun Batang | v0.5 | 영문·한글 모두 우아, next/font 자동 최적화 |
| 4:5 PNG (vs 세로 stacked) | v0.5 | Instagram-native 공유 |
| 한국 전통색 24×2 | v0.5 | 한국 정체성 + 따뜻한 톤·차가운 톤 분리 |
| 모바일 bottom sheet | v0.6 | 데스크탑처럼 한 화면에서 색 ↔ 캔버스 |
| 폴더 구조 `{storyId}/{sceneId}` | v0.6 | 새 스토리 디렉터리 하나 |
| 갤러리는 localStorage | v0.6 | 가벼움 우선 |
| **분기 여정 + 정통 결말 (Y구조)** | v0.7 | 옛이야기는 본질이 정통 결말. 분기는 여정에만 |
| **V1 → PROMPTS_V2 별도 파일** | v0.7 | V1 살려두면서 V2 점진 적용 |
| **폴더 NN- prefix** | v0.7 | 파일 시스템 정렬이 캐논 순서 일치 |
| **호랑이 favicon (minhwa 스타일)** | v0.7 | K 글자보다 한국 옛이야기 정체성 직접 표현 |
| **자체 도메인 .ink** | v0.7 | "잉크" 컨셉 + .com보다 저렴 + AdSense·SEO 신뢰도 ↑ |
| **카드 Begin pill 제거** | v0.7 | 카드 클릭 = Begin 직관 + UI 단순화 |
| **모달 + SEO 페이지 콘텐츠 통일** | v0.7 | 사용자가 어디서 봐도 같은 이야기·같은 구조 |
| **V2.5 한국 그림책 스타일라이제이션 레이어** | v0.8 | 미니멀 워크북 톤은 사이트 브랜드(한국 옛이야기)와 어긋남. minhwa 구름·산·물결·hair 디테일로 5초 안에 "한국 그림책" 인식 |
| **Scene 3-state (nextId / choices / endingLabel)** | v0.8 | Y구조 linear 진행을 표현하려면 단일 next 필요. 기존 2-choice 패턴 유지하면서 추가 |
| **Story 2 V2.5 testbed → 7 스토리 마커 확산** | v0.8 | 한 스토리 검증 후 패턴 복제. PROMPTS_V2.md 일관성 + Story 1, 3-8 도안 생성만 남음 |
| **V2.5 lightweight 적용 (per-story 마커 + 체크리스트)** | v0.8 | 35 scene 블록 다시 쓰는 대신 스토리당 1 마커 + 10-15 bullets로 효율적 가이드. Gemini가 base + layer + checklist 통합 적용 |

---

## 13. 빠른 검증 체크리스트 (작업 끝 후 푸시 전)

- [ ] `npx tsc --noEmit` 통과
- [ ] `npm run dev`로 띄워 픽커 → 스토리 → 완성 풀 흐름 동작
- [ ] 한/영 토글 모든 텍스트 바뀜
- [ ] 📖 About 모달의 🔊 발음 재생
- [ ] 완성 시 갤러리 자동 추가 + Web Share 또는 다운로드
- [ ] 모바일 (414px 폭) bottom sheet peek + 확장
- [ ] 플립북 ←/→ 화살표 + 키보드 동작
- [ ] Console 0 에러
- [ ] 스크린샷·디버그 PNG가 루트에 안 남았는지 (`ls *.png 2>/dev/null` 결과 없어야 함)

---

## 14. 핵심 인사이트 (디자인 비평·세션 회고에서 얻은)

1. **Typography hierarchy가 모든 화면의 기반** — Display tier 없으면 amateur 느낌
2. **Card spam을 피하라** — 모든 게 카드면 아무것도 카드가 아니다
3. **모바일 팔레트는 bottom sheet이거나 깨진 UX** — 색 ↔ 캔버스 흐름 끊지 말 것
4. **Web Share API는 마케팅 입소문의 발판** — 4:5 + 네이티브 공유 시트 = 마찰 최소
5. **🔊 한국어 발음**은 시그니처 모먼트 — 부모에게 "이 앱 진짜 교육적이다" 신호
6. **분기 엔딩 vs 정통 결말** — 옛이야기는 결말이 본질. 분기는 여정 차이로만 (v0.7 학습)
7. **이미지 한 컷 = 한 모먼트** — narration 다 표현하려 욕심내면 어린이가 못 따라옴 (v0.7 검수)
8. **모티프 중복 피하기** — 도깨비는 혹부리 영감 전용, 다른 스토리엔 까치·산신령·산토끼 등 (v0.7)

---

## 15. 연락 (지난 세션과의 교신)

- 마지막 작업:
  1. V2.5 한국 그림책 스타일라이제이션 레이어 PROMPTS_V2.md 베이스에 추가
  2. **Story 2 (haenyeo) V2.5 production 마이그레이션 완료** ─ Y구조 + 5장면 + canonical ending 라이브
  3. Scene 타입에 `nextId` 추가, page.tsx에 Continue 버튼 렌더링
  4. Stories 1, 3-8에 V2.5 opt-in 마커 + 스토리 고유 체크리스트 (10-15 bullets each)
- 다음 자연스러운 후보 (병렬 가능):
  1. **Story 1 V2.5 도안 생성** (Gemini, 5장) → 받으면 story.ts 마이그레이션 (§8.2 패턴)
  2. **Stories 3-8 V2.5 도안 순차 생성** — 한 스토리씩 또는 batch
  3. **Pinterest 첫 핀** — 6 스토리 V2.5 완성 후 한 번에 핀 30개 정도 첫 푸시
  4. Story 2 라이브 실측 — 한/영 토글·갤러리·PDF·플립북 한 번 더 확인
- 사용자 톤: 빠른 결정, 깔끔한 시각, 디테일 신경, 안정성 우선
- 사용자 응답 패턴: "응 가자", "잘된다", "이거 해줘" — 명확한 짧은 신호. 한국어로 토론 + 영어 검색.

---

*마지막 갱신: v0.8 · V2.5 한국 그림책 스타일라이제이션 레이어 도입 + Story 2 production 마이그레이션 + Scene 3-state(nextId/choices/endingLabel) 완비 시점.*
