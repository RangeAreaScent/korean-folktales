import type { Localized } from "./i18n"

/**
 * Centralized UI string dictionary.
 * Story content (titles, narrations, etc.) lives in story.ts; this is for chrome.
 */
export const UI = {
  // ─── App / Picker ───
  brandTagline: {
    ko: "✦ COLORING STORYBOOK ✦",
    en: "✦ COLORING STORYBOOK ✦",
  },
  pickerTitle: {
    ko: "나만의 이야기책을 만들어요",
    en: "Create your own storybook",
  },
  pickerSubtitle1: {
    ko: "진짜 한국 옛이야기 8편 · 색칠하고 분기 선택 · 한/영 이중언어.",
    en: "Eight real Korean folktales · color each scene · pick your own ending · 한/EN.",
  },
  pickerSubtitle2: {
    ko: "다 색칠하면 PDF와 인스타 공유 이미지로 받아갈 수 있어요.",
    en: "When you finish, take it home as a PDF or share it as an Instagram-ready image.",
  },
  trustFree: {
    ko: "무료",
    en: "Free",
  },
  trustNoSignup: {
    ko: "회원가입 없음",
    en: "No sign-up",
  },
  trustBilingual: {
    ko: "한/영 이중언어",
    en: "Bilingual",
  },
  trustPrintable: {
    ko: "PDF 인쇄 가능",
    en: "Printable PDF",
  },
  pickATale: {
    ko: "이야기를 골라보세요",
    en: "Pick a tale to begin",
  },
  pickerMoreSoon: {
    ko: "더 많은 이야기는 곧 추가됩니다",
    en: "More tales coming soon",
  },
  scenesSuffix: {
    ko: "장",
    en: "scenes",
  },
  startStory: {
    ko: "시작하기",
    en: "Begin",
  },
  aboutThisTale: {
    ko: "📖 원작 옛이야기",
    en: "📖 About this folktale",
  },

  // ─── Gallery / Saved books ───
  galleryHeading: {
    ko: "📚 내 그림책",
    en: "📚 Your storybooks",
  },
  gallerySubhead: {
    ko: "지금까지 완성한 이야기",
    en: "What you've made so far",
  },
  bookDelete: {
    ko: "삭제",
    en: "Delete",
  },
  bookDeleteConfirm: {
    ko: "이 그림책을 삭제할까요?",
    en: "Delete this storybook?",
  },

  // ─── Header ───
  backToLibrary: {
    ko: "이야기 목록으로",
    en: "Back to the library",
  },
  restartStory: {
    ko: "이 이야기 처음부터",
    en: "Restart this story",
  },

  // ─── Scene / Choices ───
  chooseNext: {
    ko: "색칠이 끝났다면 다음 이야기를 골라보세요 ↓",
    en: "When you're done coloring, choose what happens next ↓",
  },
  finalScene: {
    ko: "마지막 장",
    en: "Final scene",
  },
  completeBook: {
    ko: "✨ 내 이야기책 완성하기",
    en: "✨ Complete my storybook",
  },
  fillFailHint: {
    ko: "선 위 또는 같은 색이라 채워지지 않았어요.",
    en: "Can't fill — that spot is on a line or already the same color.",
  },

  // ─── Final / Export ───
  finalEyebrow: {
    ko: "✦ Story complete ✦",
    en: "✦ Story complete ✦",
  },
  bookComplete: {
    ko: "그림책이 완성되었어요",
    en: "Your storybook is complete!",
  },
  savePdf: {
    ko: "📚 PDF로 저장",
    en: "📚 Save as PDF",
  },
  creatingPdf: {
    ko: "📚 PDF 만드는 중...",
    en: "📚 Creating PDF...",
  },
  savePng: {
    ko: "📥 PNG로 저장",
    en: "📥 Save as PNG",
  },
  shareImage: {
    ko: "📤 공유하기",
    en: "📤 Share",
  },
  shareThisScene: {
    ko: "📤 이 장면 공유",
    en: "📤 Share this scene",
  },
  shareCover: {
    ko: "📤 표지 공유",
    en: "📤 Share cover",
  },
  sharing: {
    ko: "📤 만드는 중...",
    en: "📤 Preparing...",
  },
  prevPage: {
    ko: "이전",
    en: "Prev",
  },
  nextPage: {
    ko: "다음",
    en: "Next",
  },
  coverLabel: {
    ko: "표지",
    en: "Cover",
  },
  chapterPrefix: {
    ko: "장",
    en: "Chapter",
  },
  colorAgain: {
    ko: "🔄 다시 색칠하기",
    en: "🔄 Color this story again",
  },
  pickAnother: {
    ko: "📖 다른 이야기 고르기",
    en: "📖 Choose another story",
  },
  pdfNote: {
    ko: "PDF에는 표지 + 장면별 narration + 선택 기록이 함께 들어가요.",
    en: "The PDF includes a cover, scene narrations, and the choices you made.",
  },

  // ─── Canvas placeholder ───
  noPng1: {
    ko: "도안 PNG가 아직 없어요",
    en: "No coloring page yet",
  },
  noPng2: {
    ko: "public/coloring/ 폴더에 PNG를 떨어뜨려 주세요.",
    en: "Drop a PNG into public/coloring/.",
  },

  // ─── Floating toolbar ───
  ttUndo: { ko: "되돌리기 (⌘Z)", en: "Undo (⌘Z)" },
  ttZoomOut: { ko: "축소 (Shift -)", en: "Zoom out (Shift -)" },
  tt100: { ko: "100% (Shift 0)", en: "100% (Shift 0)" },
  ttZoomIn: { ko: "확대 (Shift +)", en: "Zoom in (Shift +)" },
  ttFullscreen: { ko: "전체화면 (F)", en: "Fullscreen (F)" },
  dragToPan: {
    ko: "✋ 드래그로 이동",
    en: "✋ Drag to pan",
  },

  // ─── Bottom shortcut strip ───
  scUndo: { ko: "되돌리기", en: "Undo" },
  scZoom: { ko: "확대", en: "Zoom" },
  scZoom100: { ko: "100%", en: "100%" },
  scPan: { ko: "이동", en: "Pan" },
  scFullscreen: { ko: "전체화면", en: "Fullscreen" },

  // ─── Palette ───
  palCurrent: { ko: "지금 색", en: "Current" },
  palDarker: { ko: "어둡게", en: "Darker" },
  palLighter: { ko: "밝게", en: "Lighter" },
  palCustom: { ko: "커스텀 색", en: "Custom color" },
  palFillMode: { ko: "채우기 방식", en: "Fill style" },
  palFillSolid: { ko: "단색", en: "Solid" },
  palFillLinear: { ko: "그라데이션", en: "Gradient" },
  palFillRadial: { ko: "원형", en: "Radial" },
  palMore: { ko: "더 많은 색", en: "More colors" },
  palThemes: { ko: "테마", en: "Themes" },
  palHarmonyLabel: { ko: "🎵 조화", en: "🎵 Harmony" },
  palHarmonyHint: { ko: "이 색과 어울리는", en: "Colors that match" },
  palContrastLabel: { ko: "⚡ 대비", en: "⚡ Contrast" },
  palContrastHint: { ko: "눈에 띄는", en: "Standout colors" },
  palRecent: { ko: "🕘 최근", en: "🕘 Recent" },

  // ─── Theme names + descriptions ───
  themeTraditional1: { ko: "전통색 I", en: "Traditional I" },
  themeTraditional1Desc: {
    ko: "한국 전통색 · 따뜻한 톤 (적·황·흙)",
    en: "Korean traditional · warm tones (red · gold · earth)",
  },
  themeTraditional2: { ko: "전통색 II", en: "Traditional II" },
  themeTraditional2Desc: {
    ko: "한국 전통색 · 차가운 톤 (청·록·자)",
    en: "Korean traditional · cool tones (blue · green · purple)",
  },
  themeTotoro: { ko: "토토로 숲", en: "Totoro forest" },
  themeTotoroDesc: { ko: "숲 · 하늘 · 따스한 햇살", en: "Forest · sky · warm sunlight" },
  themeSpirited: { ko: "센과 치히로", en: "Spirited Away" },
  themeSpiritedDesc: { ko: "주홍 · 옻칠 · 옥", en: "Vermilion · lacquer · jade" },
  themeHowl: { ko: "하울의 성", en: "Howl's Castle" },
  themeHowlDesc: { ko: "파스텔 · 라벤더 · 박하", en: "Pastel · lavender · mint" },
  themeMononoke: { ko: "모노노케 숲", en: "Mononoke forest" },
  themeMononokeDesc: { ko: "깊은 숲 · 이끼 · 흙", en: "Deep forest · moss · earth" },
  themeVivid: { ko: "쨍한", en: "Vivid" },
  themeVividDesc: { ko: "비비드 · 네온", en: "Vibrant · neon" },
  themeMuted: { ko: "차분한", en: "Muted" },
  themeMutedDesc: { ko: "먼지빛 · 수채", en: "Dusty · watercolor" },

  // ─── Original-tale modal ───
  modalEyebrow: { ko: "원작 옛이야기", en: "The original folktale" },
  modalAlsoCalled: { ko: "이렇게도 불러요", en: "Also known as" },
  modalAbout: { ko: "이야기 배경", en: "Background" },
  modalSummary: { ko: "줄거리", en: "The story" },
  modalGlossary: { ko: "한국어 단어", en: "Korean words to know" },
  modalOurVersion: { ko: "우리 버전의 차이", en: "How our version differs" },
  modalClose: { ko: "닫기", en: "Close" },
  pronouncedAs: { ko: "발음", en: "Said as" },

  // ─── PDF ───
  pdfFooter: { ko: "— 내가 색칠한 이야기 —", en: "— My colored tale —" },
  pdfEnd: { ko: "— 끝 —", en: "— The End —" },
} as const

export type UIKey = keyof typeof UI

// Type-level check: every entry must be Localized
type _Check = {
  [K in UIKey]: (typeof UI)[K] extends Localized ? true : never
}
const _check: _Check = {} as _Check
void _check
