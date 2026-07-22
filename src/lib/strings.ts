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
    ko: "색칠하며 만나는 한국 옛이야기",
    en: "Color your way through a Korean folktale",
  },
  pickerSubtitle1: {
    ko: "한국 옛이야기 여덟 편을 색칠하며 다시 만나요 — 이야기마다 결말을 직접 고르고, 한국어와 영어로 읽을 수 있어요.",
    en: "Eight Korean folktales, retold for coloring — choose how each one ends, in Korean or English.",
  },
  pickerSubtitle2: {
    ko: "책을 다 완성하면 PDF로 간직하거나, 마음에 드는 페이지를 공유해보세요.",
    en: "Finish the book, then keep it as a PDF or share a page you're proud of.",
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
    ko: "한국어 & English",
    en: "한국어 & English",
  },
  trustPrintable: {
    ko: "인쇄 가능",
    en: "Printable",
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
  originsEyebrow: {
    ko: "✦ 원작 이야기 ✦",
    en: "✦ Where these tales come from ✦",
  },
  originsTitle: {
    ko: "한국 옛이야기, 그 뿌리를 찾아서",
    en: "The folk tradition behind this coloring book",
  },
  originsIntro: {
    ko: "여기 여덟 편은 모두 여러 세대에 걸쳐 입에서 입으로 전해진 실제 한국 옛이야기예요. 색칠판으로 다시 꾸미기 전, 각 이야기가 어디서 왔는지 먼저 만나보세요.",
    en: "Each of these eight tales is a real Korean folktale, passed down by word of mouth for generations before it was ever written. Before you pick up a color, meet the story behind the story.",
  },
  originsReadMore: {
    ko: "전체 이야기와 단어 읽기 →",
    en: "Read the full story & glossary →",
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
  continueScene: {
    ko: "계속",
    en: "Continue",
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
  fillLeakHint: {
    ko: "선이 살짝 끊어진 곳 같아요. 다른 위치를 눌러보세요.",
    en: "Looks like the line has a gap there — try a nearby spot.",
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
  ttZoomOut: { ko: "축소 (-)", en: "Zoom out (-)" },
  tt100: {
    ko: "100% (0) · 트랙패드 핀치 또는 Ctrl+휠로도 확대/축소돼요",
    en: "100% (0) · Trackpad pinch or Ctrl+scroll also zooms",
  },
  ttZoomIn: { ko: "확대 (+)", en: "Zoom in (+)" },
  ttFullscreen: { ko: "전체화면 (F)", en: "Fullscreen (F)" },
  ttStory: { ko: "이야기 보기", en: "Read story" },
  narrationModalTitle: { ko: "이 장면의 이야기", en: "Scene story" },
  narrationListen: { ko: "🔊 한국어로 듣기", en: "🔊 Listen in Korean" },
  narrationClose: { ko: "닫기", en: "Close" },
  restartConfirm: {
    ko: "지금까지 칠한 게 사라져요. 정말 다시 시작할까요?",
    en: "You'll lose what you've colored. Restart the story?",
  },
  makeAChoice: { ko: "갈래 고르기", en: "Choose path" },
  eraseRegion: { ko: "지우기", en: "Erase" },
  palHarmonyChip: { ko: "어울림", en: "Harmony" },
  palContrastChip: { ko: "대비", en: "Contrast" },
  // Short chip names — bounded width for horizontal scroll row
  themeTraditional1Short: { ko: "전통 I", en: "Trad I" },
  themeTraditional2Short: { ko: "전통 II", en: "Trad II" },
  themeTotoroShort: { ko: "햇살숲", en: "Sunlit" },
  themeSpiritedShort: { ko: "등불밤", en: "Lantern" },
  themeHowlShort: { ko: "구름정원", en: "Cloud" },
  themeMononokeShort: { ko: "깊은숲", en: "Forest" },
  themeVividShort: { ko: "쨍한", en: "Vivid" },
  themeMutedShort: { ko: "차분", en: "Muted" },
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
  scPinch: { ko: "트랙패드 확대", en: "Trackpad zoom" },

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
  palExpandHint: { ko: "더 보기", en: "More colors" },
  palCollapseHint: { ko: "접기", en: "Show less" },

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
  themeTotoro: { ko: "햇살숲", en: "Sunlit Forest" },
  themeTotoroDesc: { ko: "숲 · 하늘 · 따스한 햇살", en: "Forest · sky · warm sunlight" },
  themeSpirited: { ko: "등불밤", en: "Lantern Night" },
  themeSpiritedDesc: { ko: "주홍 · 옻칠 · 옥", en: "Vermilion · lacquer · jade" },
  themeHowl: { ko: "구름정원", en: "Cloud Garden" },
  themeHowlDesc: { ko: "파스텔 · 라벤더 · 박하", en: "Pastel · lavender · mint" },
  themeMononoke: { ko: "깊은 숲", en: "Deep Forest" },
  themeMononokeDesc: { ko: "깊은 숲 · 이끼 · 흙", en: "Deep forest · moss · earth" },
  themeVivid: { ko: "쨍한", en: "Vivid" },
  themeVividDesc: { ko: "비비드 · 네온", en: "Vibrant · neon" },
  themeMuted: { ko: "차분한", en: "Muted" },
  themeMutedDesc: { ko: "먼지빛 · 수채", en: "Dusty · watercolor" },

  // ─── Original-tale modal ───
  modalEyebrow: { ko: "원작 옛이야기", en: "The original folktale" },
  modalOriginalTale: { ko: "원작 이야기", en: "The original tale" },
  modalKoreanWords: {
    ko: "한국어 단어들",
    en: "Korean words you'll meet",
  },
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
