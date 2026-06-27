# Korean Folktales — Coloring Storybook · Handoff

> **읽기 시간 ~12분** · 새 세션 시작 시 컨텍스트를 즉시 잡기 위함.
> 코드 만지기 전에 §1·§2·§3·§9만 먼저 훑고, 막힐 때 §10·§11 참조하세요.

---

## 1. 한 줄 요약

**Korean Folktales — Coloring Storybook for Kids.**
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

## 2. 현재 버전 · v1.0 — UI 재정비 완료

| 분야 | 상태 |
|---|---|
| **콘텐츠 — 8 스토리 모두 V2.5 라이브** ⭐ | 8 스토리 V2.5 Y구조 5장면 + 풍부 narration + minhwa 스타일 PNG production. 모든 40 scene PNG가 **2048×2048** (waifu2x cunet으로 1024→2048 업스케일) |
| **앱 코어** | 클릭 wavefront · 그라데이션 3종 · undo · **줌 1-8x** · **erase mode** · pan(Space/한 손가락) · 풀스크린 · 누출 감지 |
| **캔버스 줌 (v1.0 핀치 개선)** | **두 손가락 핀치**: midpoint anchor + 1% step + rAF coalesce (zigzag 제거). **한 손가락 드래그**: zoom > 1 일 때 pan으로 동작 |
| **Erase 기능 (v1.0 신규)** | `floodfill.eraseRegion()` — line-art boundary, color tolerance 무시 → gradient/radial fill도 깨끗 erase. Desktop + Mobile control bar 모두 토글 버튼 |
| **Scene 진행** | Y구조 3-state — `nextId` linear · `choices` branching (모바일: Continue 후 reveal) · `endingLabel` ending |
| **사운드** | water-droplet plop · page turn · chime + 한국어 발음 + **flat SVG 음소거 토글** (emoji에서 교체) |
| **PDF export** | US Letter · cover Option C (커스텀 아이콘 + tagline + 글로서리 + origin) · narration paragraph 자동 페이지네이션 · isEnding = `!!endingLabel` |
| **PNG export** | Instagram 4:5 표지/장면별 + Web Share |
| **갤러리** | localStorage 12권 cap, 픽커 상단 carousel, 재공유/삭제 |
| **최종 뷰** | 플립북 캐러셀 (표지 + 각 장면 좌우 슬라이드, 키보드 ←/→, 페이지별 share) |
| **Narration** | Desktop: 스크롤형 max-h 36vh inline. Mobile: **NarrationModal** 자동 열림 (per scene) + listen-in-Korean + locale toggle |
| **데스크탑 레이아웃 (v1.0 재정비)** | max-w **1700px** (이전 7xl = 1280) · canvas max-w **960px** (이전 720) · sidebar **360px** (이전 320) · canvas image **rounded border 제거 → shadow only** · max zoom **8x** (이전 4x) |
| **DesktopControlBar (v1.0 신규)** | 캔버스 바로 아래 inline strip — `[↶ Undo][🗑 Erase]    [⊖ 100% ⊕]    [⛶ Fullscreen]` |
| **MobileControlBar (v1.0 재정비)** | `[↶][1/N][🗑]    [📖][🔊][Continue/Choose →]` — undo·페이지 인디케이터 분리, primary action 우측 끝 (엄지 위치), locale toggle은 NarrationModal로 이동 |
| **ColorPalette desktop (v1.0 재구성)** | **More 토글 제거**, always-expanded. 새 순서: themes → grid → fill (작은 직사각형 + 캡션) → recent → harmony → contrast → **current 맨 아래** (color + L slider + custom picker) |
| **MobilePaletteSheet** | always-expanded inline panel · chip row right-edge scroll fade · 8×3 grid · fill chips · recent/harmony/contrast/L+picker 순 |
| **배경 톤** | **Cool minimal white** `#fafbfc → #f3f5f7 → #e7eaee` — 여러 후보 반복(한지→기와→백자→달항아리→청자→안개→슬레이트→warm paper) 끝에 결정. amber-100/200 박스 borders → **gray-400/500 (진한 회색)**. hover에 amber 액센트 유지 |
| **팔레트 테마명 IP-safe** | Ghibli 4종 (Totoro/Spirited/Howl/Mononoke) → **Sunlit Forest / Lantern Night / Cloud Garden / Deep Forest** |
| **키보드 단축키** | `⌘Z` undo · `+/-/0` zoom (Shift 없이) · `F` fullscreen · `Space` pan · `Cmd+/-`는 브라우저가 reserved (override 불가) |
| **타이포** | Gowun Batang display tier · Geist sans · Geist mono |
| **인프라** | Next.js 16, React 19, Tailwind 4 (Turbopack), Vercel 자동 배포 |
| **SEO** | Vercel Analytics · GSC verified · sitemap.xml · robots.txt · multi-size favicon.ico + icon.png 192px · 정적 hero OG (landscape + square) · 8 SEO 페이지 · 타이틀 "Korean Folktales — Coloring Storybook for Kids" |
| **iOS Safari fix** | viewport meta (`maximumScale: 1, userScalable: false`) · `touch-action: manipulation` body · StoryPicker sibling-button 패턴 (nested interactive 회피) · `allowedDevOrigins` in next.config.ts (LAN dev) |

---

## 3. 디렉터리 구조

```
src/
├── app/
│   ├── layout.tsx                  providers + floating cluster + metadata + Analytics
│   ├── page.tsx                    메인 게임 페이지 (~1100 lines, PDF/PNG export 포함)
│   ├── globals.css                 Tailwind @theme + narration-scroll 스타일
│   ├── favicon.ico                 multi-size ICO (16/32/48) — Google/browser favicon (v0.9)
│   ├── icon.png                    192×192 tiger (Google 권장 favicon 사이즈)
│   ├── apple-icon.png              iOS home icon (1024×1024 tiger)
│   ├── opengraph-image.png         정적 OG landscape (1200×630, half-colored hero, v0.9)
│   ├── opengraph-image.alt.txt     OG alt 텍스트
│   ├── opengraph-image2.png        정적 OG square (1200×1200, Google/Pinterest용)
│   ├── opengraph-image2.alt.txt    동일 alt
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
│   ├── ColoringCanvas.tsx          캔버스 — 줌/팬/핀치(midpoint anchor)/풀스크린/erase mode. `hideToolbar` 항상 true (외부 control bar 사용)
│   ├── ColorPalette.tsx            데스크탑 사이드바 (v1.0: always-expanded, themes→grid→fill→recent→harmony→contrast→current)
│   ├── MobilePaletteSheet.tsx      모바일 inline panel (always-expanded, chip row + 8×3 grid + fill chips + recent/harmony/contrast/L+picker)
│   ├── DesktopControlBar.tsx       ⭐ v1.0 — 데스크탑 캔버스 아래 control strip (undo / erase / zoom / fullscreen)
│   ├── MobileControlBar.tsx        모바일 캔버스 아래 control strip (undo + page indicator + erase + 📖 story + 🔊 + primary action)
│   ├── NarrationModal.tsx          ⭐ 모바일 narration 모달 — 매 scene 자동 열림. LocaleToggle + listen-in-Korean 버튼 footer
│   ├── OriginalTaleModal.tsx       원작 모달 (Web Speech 발음 + Start coloring + View as page)
│   ├── SavedBookViewer.tsx         갤러리 책 보기 (재공유·삭제)
│   ├── LocaleToggle.tsx            한/ENG — desktop floating cluster + NarrationModal footer
│   └── SoundToggle.tsx             flat SVG 흑백 (v1.0: emoji에서 교체)

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

scripts/ (개발 편의 — v1.0)
├── dev-lan.js                  `npm run dev:lan` — 0.0.0.0 바인딩 + LAN IP + QR 코드 출력 (iPhone/iPad 테스트)
└── upscale-2x.js               sharp Lanczos3 batch upscaler (대체로 waifu2x 사용)

루트 (꼭 알 것):
HANDOFF.md                       이 문서
PINTEREST_PLAYBOOK.md            Pinterest 마케팅 전략 (11 섹션)
README.md                        Next.js 기본
AGENTS.md / CLAUDE.md            프로젝트 메타
Start.command                    Mac 더블클릭 → dev + 브라우저
next.config.ts                   ⭐ `allowedDevOrigins` (10.0.0.*, 192.168.*.*, 172.16.*.*) — LAN dev access
.screenshots/                    🔻 모든 스크린샷/디버그 PNG는 여기로 (gitignore)
.backups/coloring-v0.6/          v0.6 도안 로컬 백업 (gitignore)
.backups/coloring-NN-storyId-1024/  각 스토리 1024 원본 백업 (waifu2x 업스케일 전, 롤백용)
.backups/coloring-04-dokkaebi-prev/  Story 4 prompt 강화 전 버전 (혹부리)

외부 도구 (Mac local):
~/Tools/waifu2x/waifu2x-ncnn-vulkan-20250915-macos/  — Apple Silicon 바이너리. line-art 1024→2048 cunet 모델
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

**현재 V2.5 적용 상태 (v1.0):**
- ⭐ 8 스토리 전부 V2.5 production 라이브
- 모든 40 PNG가 2048×2048 (waifu2x cunet 업스케일)
- Story 4 (혹부리) prompt 강화 — 혹 위치/크기/silhouette anchor 명시 (Mickey-ears 비유)

### 4.13 UI 컴포넌트 분리 패턴 (v1.0)
캔버스의 줌/undo/erase 같은 컨트롤이 ColoringCanvas 내부에 있으면 외부 layout 자유도가 떨어짐. v1.0에서:
- ColoringCanvas는 `hideToolbar` 항상 true → 내부 floating toolbar 비활성
- 외부 컴포넌트 두 개로 분리:
  - **DesktopControlBar** (`hidden lg:flex`) — 캔버스 아래 inline strip
  - **MobileControlBar** (`lg:hidden`) — 캔버스 아래 + primary action 내장
- ColoringCanvas는 `onZoomChange`/`onHistoryChange` callback과 imperative handle (`zoomBy`/`resetZoom`/`undo`/`setEraseMode`/`toggleFullscreen`)로 외부 toolbar와 통신
- 단일 source of truth는 캔버스 내부 state, 외부 bar는 reactive mirror

### 4.14 Erase 기능 (v1.0)
`floodfill.ts`의 `eraseRegion()`:
- 클릭한 픽셀에서 시작
- **line-art (검은 픽셀) 경계까지** flood
- 색 tolerance 무시 → gradient/radial fill 영역도 깨끗하게 white로 복구
- prior snapshot return → undo 스택에 push
ColoringCanvas는 `eraseModeRef` ref + click handler 분기. Mode toggle은 imperative `setEraseMode()`.

### 4.15 핀치 zoom anchor + smoothness (v1.0)
이전: midpoint 계산 없이 단순 setZoom → 항상 좌상단 anchor + 5% step → zigzag.
지금:
- 매 touchmove마다 midpoint local 좌표 기준 scrollLeft/Top 보정 (`(scroll + local) * ratio - local`)
- 1% step (was 5%)
- React state 업데이트는 rAF coalesce — DOM scroll 즉시 반영, setZoom은 다음 프레임 1회
- 한 손가락 드래그 (zoom > 1)에서 자동 pan 모드 진입 (`touchPanRef`)

### 4.16 배경 톤 결정 — Cool minimal white
초기: amber-50/rose-50 그라데이션 (cake-ivory). v1.0에서 사용자 피드백으로 여러 번 iterate:
1. 한지 (#faf6ea→#f3ecd5) — amber와 너무 비슷
2. 진한 hanji (#f3ecd5→#d8c89a) — 노란 hue 과함
3. 기와 (#c8d3df→#566677) — 너무 어두움
4. 백자 / 달항아리 / 청자 / 안개 — cream 계열 거부됨
5. 연한 슬레이트 (#eef1f5→#c3cdd8) — 살짝 차가움
6. Warm museum paper (#fbfaf6→#ebeae0) — cream 흔적 남음
7. **Cool minimal white (#fafbfc → #f3f5f7 → #e7eaee)** — 최종. 색칠 art가 warmth 담당, 배경은 neutral 무대

박스 borders도 동시에 amber-100/200 → gray-400/500 으로 (차가운 배경에 따뜻 amber 액센트는 hover 시에만 등장).

---

## 5. 스토리 8권 명세

| # | Slug (folder) | 한국어 | 영어 | 라이브 | 분기 (Y구조) | 정통 결말 |
|---|---|---|---|---|---|---|
| 1 | `01-folktale` (`sun-and-moon`) | 해님 달님 | Sun and Moon | **⭐ V2.5** | 손 보여달라 / 자장가 부르라 | 두 동아줄·수수밭·해/달 부끄럼 자리 바꿈 (Scene 4: day/night 좌우 분리) |
| 2 | `02-haenyeo` (`haenyeo-and-the-mermaid`) | 해녀와 인어 | Haenyeo and Mermaid | **⭐ V2.5** | 산호 미로 / 해초 숲 | 진주 반환·수호자·잠수경 안 푸른 별·손녀 대잇기 |
| 3 | `03-woodcutter` (`fairy-and-the-woodcutter`) | 선녀와 나무꾼 | Fairy and Woodcutter | **⭐ V2.5** | 산속 오두막 / 마을 어머니 곁 | 두레박·하늘 가족·새벽 빛이 된 그리움 |
| 4 | `04-dokkaebi` (`old-man-and-the-goblins`) | 혹부리 영감 | Old Man and Goblins | **⭐ V2.5** | 흥겨운 마을 노래 / 어머니 자장가 | 혹 떼임·보물·욕심쟁이 혹 두 개 |
| 5 | `05-kongjwi` (`kongjwi-and-the-toad`) | 콩쥐와 두꺼비 | Kongjwi and Toad | **⭐ V2.5** | 베틀 + 참새 / 검은 소의 선물 | 꽃신 짝·사또·계모 가족 용서 |
| 6 | `06-byeoljubu` (`hare-and-the-dragon-king`) | 별주부전 | Hare and Dragon King | **⭐ V2.5** | 자라 따라 용궁 / 까치 귀띔 | 토끼 기지·산삼·우정 |
| 7 | `07-heungbu` (`heungbu-and-nolbu`) | 흥부와 놀부 | Heungbu and Nolbu | **⭐ V2.5** | 가족과 보살핌 / 어머니 약방문 | 박씨 도착 → 박+보물 = Scene 4 focal anchor (v0.9 재구성) |
| 8 | `08-woodman` (`gold-axe-and-silver-axe`) | 금도끼 은도끼 | Gold and Silver Axe | **⭐ V2.5** | 단호한 정직 / 흔들림 포함 정직 | Scene 4 3-beat 시간 arc (재회/판결/응징) (v0.9 재구성) |

**Y구조**: 1·2 공통 → 3 분기 (3a/3b) → 4 정통 결말. 한 회 플레이 = 4 장면. Scene type 3-state(`nextId`/`choices`/`endingLabel`)로 구현.
**v0.9 라이브 상태**: 8 스토리 전부 V2.5 production. Story 1·7·8 Scene 4는 v0.9에서 narrative emphasis 추가 재구성 (Story 1 day/night, Story 7 박씨 강조, Story 8 3-beat).

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

### 10.12 V2.5 통일 완료 (v0.9)
8 스토리 모두 V2.5 라이브 — 혼재 상태 종료. Backup_v1/ 폴더는 v0.6 시점 원본 보존 (롤백/참고용). 신규 콘텐츠 추가 시 V2.5 패턴(§8.2) 그대로 따르면 됨.

### 10.13 Scene 3-state 진행 규칙
Scene 타입의 세 상태는 **상호 배타적**:
- `nextId` 있음 → linear ("Continue →" 단일 버튼)
- `choices` 있음 → branching (2개 카드)
- 둘 다 없음 + `endingLabel` → ending ("Complete book" 버튼)

`page.tsx` 렌더링은 `choices ? branching : nextId ? linear : ending` 순. 한 scene에 `nextId`와 `choices`를 같이 두면 `choices`가 이김 (의도된 동작 — branching 우선).

V1 스토리 (Story 1, 3-8)는 모든 scene이 `choices` 또는 `endingLabel` 만 사용 (linear 미사용). V2.5 스토리 (Story 2)는 5장면 중 3장면이 linear, 1장면이 branching, 1장면이 ending.

### 10.14 PDF export — isEnding 판정 (v0.9 회귀 fix)
`page.tsx` 1149/1293 라인. V1 시대엔 `!scene.choices` 로 ending 판정했지만 V2.5는 linear scene도 choices 없음 → Scene 1·3a까지 "ENDING" 라벨 표시되는 회귀. **`isEnding = !!scene.endingLabel`** 로 변경 — Scene 4만 ending. V2.5 도입 시 같은 패턴 다른 곳에 있을 수 있으니 새 export 로직 추가 시 확인 필요.

### 10.15 PDF narration 페이지 자동 분할 (v0.9)
`paginateNarration()` in page.tsx — paragraph (`\n\n`) 단위 분할. 한도: KO 520자 / EN 980자 (이미지 있는 첫 페이지), KO 2200 / EN 4200 (이미지 없는 continuation). 너무 짧게 잘리면 한도 올리고, 잘림 재발하면 한도 내리거나 image height (`height: 480px`) 줄이기.

### 10.16 PDF Letter format (v0.9)
A4 → Letter (8.5×11", 215.9×279.4mm). `PAGE_W=850 PAGE_H=1100` (Letter 비율 0.773), `PAGE_PAD_X=100 PAGE_PAD_Y=80`, jsPDF `format: "letter"`. iPad/Letter 프린트 호환.

### 10.17 GSC favicon 캐시
URL prefix property가 인증된 시점의 favicon이 GSC 대시보드에 남음. 실제 사용자에겐 호랑이 표시. 며칠~몇 주 후 자동 갱신. v0.9에서 favicon.ico (multi-size) + icon.png 192px 추가 — Google 재크롤 후 검색결과 thumbnail/favicon 갱신됨 (며칠~1주).

### 10.18 OG image 정적 PNG vs 동적 (v0.9)
`src/app/opengraph-image.tsx` (동적 ImageResponse) → `src/app/opengraph-image.png` (정적 PNG) 로 전환. 정적이 우선됨. `.alt.txt` 파일도 같이 둘 것. 만약 둘 다 있으면 정적 PNG 우선이지만 빌드 경고 가능 — 한 가지만 둘 것.

### 10.19 LAN dev access — allowedDevOrigins (v1.0) ★
Next.js 16의 **새 보안 정책**이 LAN IP에서의 `/_next/webpack-hmr` + RSC payload stream 차단. 증상: iPhone/iPad에서 페이지는 로드되지만 클릭 → React state update 안 됨 (silent hydration 실패). 콘솔에 경고 1줄만 뜨고 클라이언트엔 에러 안 보임. `next.config.ts`의 `allowedDevOrigins` 에 LAN 범위 등록 필수. 이게 v1.0에서 가장 디버깅 어려웠던 이슈 — 클릭 핸들러나 viewport meta 같은 게 아니라 dev server 자체였음.

### 10.20 iOS Safari nested interactive (v1.0)
StoryPicker 카드를 `<button>` 안에 About `<span role="button">` nested 했더니 iOS가 outer button의 click handler를 비활성화. Chrome 모바일 에뮬레이션에선 정상. HTML 명세상 button 안 interactive descendant 금지인데 iOS만 strict. 해결: **sibling 패턴** — 카드 wrapper는 `<div>`, 안에 (a) 콘텐츠 클릭 `<button>` + (b) About `<button>` 두 sibling.

### 10.21 핀치 zoom anchor + smoothness (v1.0)
초기 구현은 단순 `setZoom()` 만 호출 → React 매 touchmove 재렌더 + scrollLeft/Top 보정 없음 → 항상 좌상단 anchor + 매끄럽지 못함. 해결책: scrollLeft/Top 보정 `(scroll + localMid) * ratio - localMid` + step 1% + rAF coalesce. 한 손가락 pan은 별도 `touchPanRef` 로 zoom > 1 일 때만 진입.

### 10.22 키보드 단축키 — Cmd 안 됨 (v1.0)
브라우저가 OS 레벨에서 `Cmd/Ctrl + +/-/0` 을 native page-zoom으로 가로채서 웹앱에서 `preventDefault`로도 못 막음. 우리 단축키는 **bare `+/-/0`** (no modifier, no Shift). 입력 포커스는 `isTypingTarget()`으로 제외.

### 10.23 Canvas image container border 제거 (v1.0)
이전: `rounded-2xl border` — V2.5 line-art에 이미 corner-bracket decorative border가 그려져 있어서 외부 둥근 border와 시각 충돌. 해결: border + rounded 모두 제거, `shadow-lg`로만 정의. canvas 컨테이너만 사각, 다른 박스들은 rounded 유지.

### 10.24 Erase mode 사용 패턴 (v1.0)
컨트롤 strip의 🗑 버튼 토글로 진입. 활성 시 다음 클릭은 fill 대신 `eraseRegion()` 호출 — 클릭한 region 전체를 white로 복구. Line-art boundary로 stop, color tolerance 무시. 한 번 erase 후 모드는 유지 (사용자가 다시 토글로 끔). 작동 안 보이면: 1) 클릭이 line 위 (검은 픽셀)인지 2) 이미 white인 region인지 확인.

### 10.25 배경 톤 hex 직접 관리 (v1.0)
amber-50/rose-50 같은 Tailwind 토큰 안 쓰고 hex로 직접 (`from-[#fafbfc] via-[#f3f5f7]/50 to-[#e7eaee]`). 사용자 피드백으로 톤 iterate 많이 했고, hex가 정확한 컨트롤을 줌. 변경 시 9개 파일 일괄 sed 패턴: `for f in <files>; do sed -i '' -e 's|OLD|NEW|g' "$f"; done` (zsh 단일 변수 split 주의 — explicit list 사용).

---

## 11. 미완 / 다음 후보

### ✅ v1.0에서 완료된 UI 트랙
- ✅ 모바일 팔레트 always-expanded (peek/expand 제거)
- ✅ Mobile control strip 재배치 (undo + page + erase + 📖 + 🔊 + primary action)
- ✅ NarrationModal 자동 열림 + locale toggle 내장
- ✅ Desktop control bar (캔버스 아래 inline)
- ✅ Erase 기능 (gradient 영역 깨끗 erase)
- ✅ 핀치 zoom anchor + 1% step + rAF coalesce, 한 손가락 pan
- ✅ Max zoom 4 → 8
- ✅ 캔버스 image border 제거, shadow only
- ✅ Desktop width 1700px, canvas 960px, sidebar 360px
- ✅ Cool minimal white 배경 + dark gray box borders
- ✅ Theme명 IP-safe (Ghibli 4개 → atmospheric)
- ✅ Keyboard `+/-/0` (Shift 제거)
- ✅ Flat SVG SoundToggle
- ✅ ColorPalette 데스크탑 재구성 (always expanded, 새 순서, 작은 fill chips)
- ✅ iOS Safari fixes (viewport + allowedDevOrigins + sibling button)

### 🔥 다음 트랙 — 후속 UX 개선 후보
1. **Touch tap target 44pt** (`@media (pointer: coarse)`): swatch 30 → 44 (현재 모바일도 30, Apple HIG 미달)
2. **Smart palette per scene**: `Scene` 타입에 `suggestedColors?: Hsl[]` 추가 → 각 도안에 어울리는 6-8색 큐레이션
3. **iPad portrait 전용 layout** 검토 — 현재 모바일 layout 그대로 (lg: 1024px 기준). 768-1023px (iPad portrait) 사용감 확인 후 결정
4. **즐겨찾는 색** (별 토글, recent보다 영구적)
5. **장면 진행 미니맵** (헤더 ●→●→○)
6. **a11y 감사** (`design:accessibility-review`)
7. **Apple Pencil double-tap** → fill mode 순환
8. **Haptic feedback** (`navigator.vibrate(10)`)

### 🟢 콘텐츠 / 시각
- **랜딩 페이지 hero 강화** (선택) — picker 상단 마케팅 카피 다듬기 (현재 trust pills + arrow 적용)
- **OG image iterate** — 현재 half-colored hero artwork 정적 PNG. 사용자 피드백 받아 색감/구도 fine-tune 가능

### 🟢 마케팅 / 성장
- **Pinterest 첫 푸시** — `PINTEREST_PLAYBOOK.md` §10. 8 스토리 V2.5 production이라 30핀 한 번에 가능
- **자동 핀 생성기** — `src/app/pin/[slug].tsx` ImageResponse로 1000×1500 핀 동적 생성 (playbook §6)
- **GA / Plausible 추가 분석** (현재 Vercel Analytics만)
- **GSC URL 검사 → Request Indexing** 8 스토리 페이지 + 새 favicon/OG로 재크롤 요청

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
| **8 스토리 일괄 V2.5 production** | v0.9 | Story 2 testbed가 통과 후 35 도안 한 batch로 받아 한 commit에 마이그레이션. 혼재 상태 종료, 라이브 일관성 확보 |
| **PDF: A4 → US Letter** | v0.9 | US 가정용 프린터 친화 + 8.5×11" 표준. 사용자가 명시적으로 요청 |
| **PDF: narration paragraph 페이지네이션** | v0.9 | V2.5 narration이 길어져 한 페이지 한도 초과 → 묵묵히 잘림. paragraph 단위 자동 분할 + "다음 장에 계속…" 마커가 손실 없이 처리 |
| **PDF cover Option C (글로서리+origin)** | v0.9 | 빈 cover 70% 공간 활용. 단순 emoji가 아니라 story.id의 커스텀 아이콘. 글로서리 미리보기 2개 + origin 패러그래프로 책 가치 즉시 전달 |
| **isEnding = `!!scene.endingLabel`** (V2.5 회귀 fix) | v0.9 | V1 `!scene.choices` 로직이 V2.5 linear scene을 ending으로 잘못 분류. endingLabel 기준이 의도 일치 |
| **정적 OG image (1200×630 + 1200×1200)** | v0.9 | 동적 ImageResponse의 emoji 8개는 brand 정체성 약함. 사용자가 Gemini로 만든 half-line-art/half-colored 일러스트가 즉시 "coloring book" 인식 신호 |
| **multi-size favicon.ico + icon.png 192px** | v0.9 | Google 검색결과 generic K fallback 원인 = /favicon.ico 404 + 1024×1024 icon은 Google skip. 16/32/48 ICO + 192 PNG = 표준 SEO 권장 |
| **Site title softened ("Coloring Storybook for Kids")** | v0.9 | "A Bilingual..." 어색 + bilingual 과 강조. bilingual은 description에 유지, 타이틀은 활동+오디언스 시그널 |
| **DesktopControlBar 분리 (캔버스 내부 toolbar → 외부)** | v1.0 | 캔버스 내부 floating toolbar는 desktop에 비효율. 외부 inline strip이 layout 자유도 ↑, undo/zoom/erase/fullscreen 한 줄에 명확. ColoringCanvas는 imperative handle + callback으로 통신 |
| **MobileControlBar 재배치 — primary action 우측 끝** | v1.0 | Continue/Choose path 별도 row가 column 차지. 같은 strip 우측 끝으로 합치면서 엄지 자연 위치 활용. utility icons (📖, 🔊) 가운데, primary CTA rightmost |
| **Erase 기능 — line-art boundary** | v1.0 | 기존 fill은 color-tolerance 기반이라 gradient 영역 지우기 불가. boundary 검출 모드(`eraseRegion`)는 line만 멈추므로 gradient/radial fill도 깨끗 white로. 기존 fill과 모드 토글로 공존 |
| **핀치 zoom anchor + smoothness** | v1.0 | 좌상단 고정 anchor + 5% step 으로 zigzag. midpoint 기반 scroll 보정 + 1% step + rAF coalesce로 부드러운 줌 + 정확한 anchor. 한 손가락 pan은 zoom > 1 자동 진입 |
| **Cool minimal white 배경 (수많은 후보 끝)** | v1.0 | 한지→기와→백자→달항아리→청자→안개→슬레이트→warm paper 거쳐 결정. 색칠 art가 warmth 담당, 배경은 neutral 무대. 박스 borders도 amber → dark gray 동시 변경 |
| **Always-expanded palette** | v1.0 | More 토글 = 추가 클릭 = 친구지지 않음. Desktop 사이드바는 항상 모든 섹션 표시 (themes → grid → fill → recent → harmony → contrast → current). Mobile도 always-expanded inline panel |
| **ColorPalette 순서 — current 맨 아래** | v1.0 | current는 직접 조작 (slider/picker)이 메인. 빈도가 가장 적은 섹션이라 맨 아래. recent/harmony/contrast는 swatch 단순 클릭 픽이라 위쪽 |
| **Fill style — 작은 직사각형 + 캡션** | v1.0 | 큰 원형 preview는 사이드바 공간 낭비. 직사각형 mini preview + 작은 캡션이 정보 밀도 ↑ |
| **Theme명 IP-safe** | v1.0 | Ghibli 4종 (Totoro/Spirited/Howl/Mononoke) → atmospheric (Sunlit Forest/Lantern Night/Cloud Garden/Deep Forest). SEO+상업 안전, 색감 그대로 |
| **Keyboard `+/-/0` (Shift 제거)** | v1.0 | Shift+/-/0 비표준. bare 키가 직관적. Cmd+/-는 브라우저 reserved (override 불가) — bare 키로 충돌 회피 |
| **NarrationModal — auto-open per scene (mobile)** | v1.0 | V2.5 long narration 모바일에선 inline 표시 어려움. 매 scene 진입 시 자동 모달 → 사용자가 닫으면 색칠. 📖 버튼으로 재오픈. Locale toggle은 footer에 내장 |
| **Canvas image border 제거 (shadow only)** | v1.0 | V2.5 line-art에 이미 corner-bracket decorative border 그려져 있어 외부 rounded border와 충돌. shadow-lg로만 정의 → 사각 컨테이너가 art와 일관 |
| **Desktop width 1700px + canvas 960px** | v1.0 | 7xl=1280 + canvas 720은 wide monitor에서 자투리 공간. 1700+960으로 캔버스가 viewport 주도 |
| **waifu2x cunet 1024→2048 일괄** | v1.0 | Gemini가 2048 요청해도 1024 반환하는 경우 많음. waifu2x cunet은 line-art 전용 모델이라 edge 손실 거의 없음. 40 scene 일괄 처리 + .backups로 원본 보존 |
| **Story 4 (혹부리) prompt — 혹 = silhouette anchor** | v1.0 | "lump on jaw" 한 줄로는 Gemini 무시. character spec에 위치/크기/모양/fill region 명시 + "Mickey ears처럼 silhouette 정체성" 비유. scene별 Subject block에 3/4 angle 강제. Scene 4는 두 영감 시각 구분 (선한=clean jaw + shimmer / 욕심쟁이=merchant 한복 + 양쪽 혹) |
| **`allowedDevOrigins` next.config.ts** | v1.0 | Next.js 16 새 정책 — LAN IP에서 HMR/RSC 차단. 모바일 테스트 시 클릭은 되는데 state update 안 되는 silent failure. LAN 범위 (10.0.0.* / 192.168.*.* / 172.16.*.*) 허용 필수 |

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

### 마지막 작업 (v1.0, commits 9cfc30f + 이전 925c625 등)

**UI 대규모 재정비 트랙 — 한 세션에 모바일 + 데스크탑 모두 손봄**:

1. **모바일 UX 일괄 재배치**
   - MobileControlBar 재배치 — undo + page indicator 분리, primary action (Continue/Choose) 우측 끝, locale toggle은 NarrationModal로 이동
   - NarrationModal 신규 — 매 scene 자동 열림 (모바일), listen-in-Korean 발음 + LocaleToggle footer
   - MobilePaletteSheet always-expanded — chip row + 8×3 grid + fill chips + recent/harmony/contrast/L+picker
   - SoundToggle flat SVG (emoji → monochrome)
   - 핀치 zoom anchor + 1% step + rAF coalesce (zigzag 제거) + 한 손가락 pan (zoom > 1)
   - Max zoom 4 → 8

2. **데스크탑 UI 재정비**
   - DesktopControlBar 신규 (캔버스 아래 inline: undo / erase / zoom / fullscreen)
   - ColoringCanvas의 `hideToolbar` 항상 true → 외부 control bar 일관
   - Canvas image 컨테이너 rounded border 제거, shadow-lg only
   - max-w 7xl → 1700px, canvas 720 → 960px, sidebar 320 → 360px
   - ColorPalette 재구성 — always-expanded, themes → grid → fill (작은 직사각형 + 캡션) → recent → harmony → contrast → current 맨 아래
   - 일관 spacing (`<Row>` 헬퍼)

3. **배경 톤 — Cool minimal white**
   - 사용자 피드백으로 한지 → 기와 → 백자 → 달항아리 → 청자 → 안개 → 슬레이트 → warm paper → cool minimal 까지 iterate
   - 최종: `#fafbfc → #f3f5f7 → #e7eaee`
   - 동시에 amber-100/200 박스 borders → gray-400/500 (진한 회색)
   - hover에 amber 액센트는 유지

4. **Erase 기능 신규**
   - `floodfill.eraseRegion()` — line-art boundary, color tolerance 무시
   - Gradient / radial fill 영역도 깨끗 white로 복구
   - Desktop + Mobile control bar 모두 토글 버튼

5. **Theme명 IP-safe**
   - Ghibli 4종 → Sunlit Forest / Lantern Night / Cloud Garden / Deep Forest

6. **Keyboard `+/-/0`** — Shift 없이 (Cmd는 브라우저 reserved)

7. **iOS Safari fixes**
   - viewport meta (no native zoom, no double-tap zoom)
   - StoryPicker nested interactive 제거 → sibling button 패턴
   - **★ `allowedDevOrigins`** — LAN dev에서 click 안 되는 silent failure 핵심 원인. Next.js 16 새 정책

8. **Story 4 (혹부리) prompt 강화**
   - 캐릭터 spec에 혹 위치/크기/모양/silhouette anchor 명시 (Mickey ears 비유)
   - Scenes 2/3a/3b/4 Subject block — 3/4 head angle 강제
   - Scene 4 — 선한 영감 (clean jaw + shimmer) vs 욕심쟁이 (merchant 한복 + 양쪽 혹) 시각 구분
   - Scenes 2/3a/3b/4 PNG 재생성 + waifu2x 업스케일

9. **40 PNG 전체 waifu2x 1024 → 2048** — cunet 모델, .backups/coloring-NN-storyId-1024/ 백업

10. **개발 편의**
    - `scripts/dev-lan.js` — `npm run dev:lan` (0.0.0.0 + QR 코드)
    - `scripts/upscale-2x.js` — sharp 기반 배치 업스케일러

### 현재 진행 트랙
없음 (v1.0 UI 트랙 완료). 다음 자연스러운 후보:
1. **Pinterest 첫 푸시** — 8 V2.5 production이라 한 번에 30 핀 가능 (PINTEREST_PLAYBOOK.md §10)
2. **Touch tap target 44pt** (`@media (pointer: coarse)`)
3. **Smart palette per scene** — `Scene.suggestedColors?: Hsl[]` (각 도안에 어울리는 6-8색 큐레이션)
4. **즐겨찾는 색** 별 토글
5. **a11y 감사**
6. **GA / Plausible 추가** + GSC Request Indexing

### 사용자 톤 / 워크스타일
- 빠른 결정, 깔끔한 시각, 디테일 신경, 안정성 우선
- 응답 패턴: "응 가자" / "잘된다" / "이거 해줘" — 명확한 짧은 신호
- 한국어로 토론 + 영어 검색
- **Root cause 지적 선호** — surface 증상만 보지 말고 (모바일 클릭 안 됨 → viewport meta? button overlay? 결국 next.config.ts의 `allowedDevOrigins` 였음 — 이 디버깅 패턴이 v1.0의 가장 큰 학습)
- 시각 디자인 iteration 즐김 — 배경 톤만 9번 바꿈

---

*마지막 갱신: v1.0 · UI 대규모 재정비 (mobile/desktop control bar, palette restructure, erase mode, cool-white background, pinch zoom smoothness, IP-safe theme names, iOS Safari fixes, Story 4 lump prompt). 다음 트랙: 미정 (Pinterest 또는 후속 polish).*
