import type { Localized } from "./i18n"

export type StoryId =
  | "folktale"
  | "haenyeo"
  | "woodcutter"
  | "dokkaebi"
  | "kongjwi"
  | "byeoljubu"
  | "heungbu"
  | "woodman"

export type SceneId = string

export type Choice = {
  label: Localized
  nextId: SceneId
}

export type Scene = {
  id: SceneId
  title: Localized
  narration: Localized
  image: string
  // Progression — exactly one of three states:
  //   1. `nextId` set     → linear scene, single "Continue →" button
  //   2. `choices` set    → branching scene, two choice cards
  //   3. neither + endingLabel → ending scene, "Complete book" button
  nextId?: SceneId
  choices?: [Choice, Choice]
  endingLabel?: Localized
}

export type GlossaryItem = {
  korean: string
  romanized: string
  pronunciation: string
  meaning: Localized
}

export type OriginalTale = {
  koreanTitle: string
  romanized: string
  englishTitle: string
  origin: Localized
  summary: Localized
  glossary: GlossaryItem[]
  ourVersion: Localized
}

export type Story = {
  id: StoryId
  emoji: string
  title: Localized
  subtitle: Localized
  tagline: Localized
  accent: string
  startSceneId: SceneId
  scenes: Record<SceneId, Scene>
  originalTale: OriginalTale
}

// ──────────────────────────────────────────────────────────────
//  Story 1 — 🐯 해님 달님 · Sun and Moon
// ──────────────────────────────────────────────────────────────

const folktale: Story = {
  id: "folktale",
  emoji: "🐯",
  title: { ko: "해님 달님", en: "Sun and Moon" },
  subtitle: { ko: "하늘로 오른 오누이", en: "The siblings who climbed to the sky" },
  tagline: {
    ko: "깊은 산속 한밤중, 호랑이를 피해 달빛 아래를 헤매는 오누이의 옛이야기.",
    en: "Deep in the mountains at midnight, two siblings flee a tiger under the moonlight.",
  },
  accent: "from-orange-100 to-amber-100",
  startSceneId: "scene-1-knock",
  scenes: {
    "scene-1-knock": {
      id: "scene-1-knock",
      title: { ko: "1장. 늦은 밤의 문 두드림", en: "Chapter 1 — Late-Night Knock" },
      narration: {
        ko: "깊은 산속 작은 초가집. 어머니는 새벽부터 떡 광주리를 머리에 이고 장에 가셨다. \"곧 돌아올게, 문 잘 닫고 있으렴.\" 하지만 해가 지고 달이 떠도 어머니는 돌아오시지 않았다. 호롱불이 깜빡이는 방, 오빠는 잠 못 드는 동생을 꼭 안고 문 쪽을 지켜보았다. 그때 — 똑똑똑. \"얘들아, 엄마야. 떡을 가져왔단다.\" 그런데 그 목소리가 어딘가 굵고 낯설었다.",
        en: "A small thatched-roof house deep in the mountains. Mother had set out at dawn with a basket of rice cakes balanced on her head. \"I'll be back soon — keep the door closed.\" But the sun set, the moon rose, and still she had not returned. In the flickering lamplight the older brother held his sleepless little sister close, watching the door. Then — knock, knock, knock. \"Children, it's Mother. I've brought rice cakes.\" But the voice was strangely low, strangely strange.",
      },
      image: "/coloring/01-folktale/scene-1-knock.png",
      nextId: "scene-2-decision",
    },
    "scene-2-decision": {
      id: "scene-2-decision",
      title: { ko: "2장. 두 가지 시험", en: "Chapter 2 — Two Tests" },
      narration: {
        ko: "오빠는 동생의 손을 꼭 잡고 가만히 문 앞으로 다가갔다. 어머니라면 이런 목소리일 리 없다. 어떻게 정체를 확인하지? \"어머니, 손을 한 번 보여주세요.\" 손이 정말 거칠다면 호랑이가 분명하다. \"어머니, 자장가를 한 번 불러주세요.\" 목소리에 으르렁 소리가 섞인다면 호랑이가 분명하다. 두 시험 중 하나를 택해야 한다.",
        en: "The brother took his sister's hand and crept closer to the door. Mother's voice never sounded like this. How could they be sure? \"Mother, would you show us your hand?\" If the hand was rough, it had to be the tiger. \"Mother, would you sing us a lullaby?\" If the voice growled deep inside, it had to be the tiger. They had to choose one test.",
      },
      image: "/coloring/01-folktale/scene-2-decision.png",
      choices: [
        { label: { ko: "🖐 손을 보여달라고 한다", en: "🖐 Ask to see the hand" }, nextId: "scene-3a-pine" },
        { label: { ko: "🎵 자장가를 불러달라고 한다", en: "🎵 Ask for a lullaby" }, nextId: "scene-3b-well" },
      ],
    },
    "scene-3a-pine": {
      id: "scene-3a-pine",
      title: { ko: "3장. 달빛 아래 소나무", en: "Chapter 3 — Under the Moonlit Pine" },
      narration: {
        ko: "\"어머니의 손은 이렇게 거칠지 않아요!\" 오빠가 소리쳤다. 호랑이가 으르렁 발톱을 드러내자 오누이는 뒷문을 열고 산속으로 달렸다. 달빛이 환한 곳에 거대한 소나무 한 그루가 가지를 펼치고 서 있었다. 오빠는 동생을 먼저 올려 보내고 뒤따라 올라갔다. 호랑이가 곧 따라와 나무 아래에서 물었다. \"거기 어떻게 올라갔니?\" 오빠가 짐짓 거짓으로 답했다. \"참기름을 발랐지요.\" 호랑이가 부엌으로 달려간 사이, 오누이는 더 높은 가지로 옮겨가며 하늘을 올려다보았다.",
        en: "\"Mother's hand is never this rough!\" the brother shouted. The tiger growled and bared its claws — the siblings flung open the back door and ran into the mountains. In a moonlit clearing stood a giant old pine tree with wide, spreading branches. The brother lifted his sister up first, then climbed after. Soon the tiger arrived, sniffing at the trunk: \"How did you climb up there?\" The brother answered cleverly: \"We rubbed sesame oil on the bark.\" While the tiger ran off to find some, the siblings climbed higher and looked up at the sky.",
      },
      image: "/coloring/01-folktale/scene-3a-pine.png",
      nextId: "scene-4-rope",
    },
    "scene-3b-well": {
      id: "scene-3b-well",
      title: { ko: "3장. 우물에 비친 보름달", en: "Chapter 3 — The Full Moon in the Well" },
      narration: {
        ko: "\"어머니라면 자장가를 부르실 거예요.\" 오빠가 말하자 문 너머에서 으르렁 깊은 울음이 새어 나왔다. 오누이는 옆문으로 빠져나와 뒤뜰의 우물 쪽으로 달렸다. 우물 속 검은 물 위에 보름달이 동그랗게 비쳐 있었다. 오빠는 동생을 큰 장독 뒤에 숨기고, 자기는 우물가에 살짝 그림자를 드리워 호랑이를 유인했다. 호랑이는 우물 속에 비친 그림자를 진짜 아이로 알고 고개를 들이밀었다. 그 사이 오빠는 동생의 손을 잡고 하늘을 올려다보며 두 손을 모았다.",
        en: "\"If you were Mother, you would sing us a lullaby,\" the brother said. From beyond the door came only a low growl. The siblings slipped out the side door and ran to the well in the back yard. In the dark water, the full moon shone round and clear. The brother hid his sister behind a tall fermenting jar and let his own shadow fall over the well's edge to draw the tiger close. The tiger thought the reflection was the children and peered down inside. While it was distracted, the brother took his sister's hand, looked up at the sky, and pressed his palms together to pray.",
      },
      image: "/coloring/01-folktale/scene-3b-well.png",
      nextId: "scene-4-rope",
    },
    "scene-4-rope": {
      id: "scene-4-rope",
      title: { ko: "마지막 장. 하늘로 오른 동아줄", en: "Final — The Rope That Climbed to the Sky" },
      narration: {
        ko: "\"하늘이시여, 저희를 살리시려거든 튼튼한 동아줄을, 저희를 거두시려거든 썩은 동아줄을 내려주세요.\" 오빠가 빌자 하늘에서 굵고 튼튼한 금빛 동아줄이 스르르 내려왔다. 오누이는 그 줄을 잡고 별 사이로 올라갔다. 호랑이도 따라 빌었지만, 호랑이에게는 썩은 동아줄이 내려왔고, 줄은 곧 끊어져 호랑이가 수수밭 위로 떨어졌다. 그날 이후 수수는 호랑이의 피로 붉게 물들었다. 처음엔 동생이 해님이었지만 사람들이 자꾸 자기 얼굴을 쳐다보는 게 부끄러워, 오빠와 자리를 바꿔달라 부탁했다. 그래서 오빠는 해님이 되어 낮을 환히 밝히고, 동생은 달님이 되어 조용히 밤을 비추게 되었다.",
        en: "\"Heaven above — if you mean us to live, send down a strong rope. If you mean us to fall, send a rotten one.\" A thick golden rope unwound from the sky and lowered to the siblings. They held on and rose up through the stars. The tiger prayed too, but the rope it received was frayed and rotten. It snapped, and the tiger tumbled down onto a field of sorghum. From that day, sorghum has been stained red with the tiger's blood. At first the little sister became the Sun — but she felt shy whenever people looked up at her face, and she asked her brother to trade places. So the brother became the bright Sun who lights the day, and the sister became the quiet Moon who lights the night.",
      },
      image: "/coloring/01-folktale/scene-4-rope.png",
      endingLabel: { ko: "☀️🌙 해님 달님 — 정통 결말", en: "☀️🌙 Sun and Moon — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "해님 달님",
    romanized: "Haenim Dalnim",
    englishTitle: "The Sun and Moon: Brother and Sister",
    origin: {
      ko: "한국에서 가장 오래된 입에서 입으로 전해진 옛이야기 중 하나예요. 19세기에 글로 적혔지만 그 전부터 할머니들이 손주에게 들려주던 이야기랍니다.",
      en: "One of the oldest oral folktales in Korea, written down in the 1800s but told by grandmothers to grandchildren long before that.",
    },
    summary: {
      ko: "옛날 어느 깊은 산속에 어머니와 오누이가 살았어요. 어머니가 떡을 팔고 돌아오는 길에 무서운 호랑이를 만났대요. 호랑이는 어머니인 척 집을 찾아왔지만, 오누이는 영리하게 도망쳐 큰 나무 위로 올라갔어요. 하늘에 기도하니 금빛 줄이 내려와 오누이를 하늘로 올려주었답니다. 그 뒤로 오빠는 해님, 동생은 달님이 되었어요.",
      en: "Long ago, a mother and her two children lived deep in the mountains. On her way back from selling rice cakes, the mother met a fierce tiger. The tiger came to the house pretending to be Mother, but the clever siblings escaped and climbed a tall tree. When they prayed to heaven, a golden rope came down and lifted them into the sky. From then on, the brother became the Sun and the sister became the Moon.",
    },
    glossary: [
      {
        korean: "호랑이",
        romanized: "horangi",
        pronunciation: "HOH-rahng-ee",
        meaning: { ko: "한국 옛이야기에 가장 자주 등장하는 무서운 산짐승, 호랑이.", en: "Tiger — the fierce mountain animal that appears most often in Korean folktales." },
      },
      {
        korean: "떡",
        romanized: "tteok",
        pronunciation: "DUHK",
        meaning: { ko: "쌀로 만든 쫀득한 한국 전통 떡. 잔치나 장날에 자주 먹어요.", en: "A chewy Korean rice cake, often eaten on special days and market days." },
      },
      {
        korean: "동아줄",
        romanized: "dong-a-jul",
        pronunciation: "DONG-ah-jool",
        meaning: { ko: "굵고 튼튼한 줄. 옛이야기에서 하늘에서 내려오는 금줄로 자주 그려져요.", en: "A thick, strong rope. In folktales, it often comes down from the sky as a golden rope." },
      },
      {
        korean: "초가집",
        romanized: "chogajip",
        pronunciation: "CHOH-gah-jeep",
        meaning: { ko: "지푸라기로 지붕을 얹은 옛날 한국 시골집.", en: "A traditional Korean countryside house with a roof of dried straw." },
      },
      {
        korean: "산신령",
        romanized: "sansilryeong",
        pronunciation: "SAHN-shin-LYUNG",
        meaning: { ko: "산을 지키는 신령님. 흰 수염에 한복을 입은 할아버지로 자주 그려져요.", en: "The spirit who watches over a mountain — often shown as a white-bearded grandfather in traditional clothes." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 2장에서 \"손을 보여달라\" / \"자장가를 불러달라\" 두 가지 시험 중 하나를 직접 선택해요. 어느 길로 가도 결말은 같은 정통 엔딩 — 동아줄을 잡고 오빠는 해님이, 동생은 달님이 되는 — 으로 모입니다.",
      en: "We follow the original story closely, but on Chapter 2 you choose one of two tests — \"show me your hand\" or \"sing a lullaby.\" Whichever branch you take, the story converges on the same canonical ending: the siblings climb the golden rope and become the Sun and Moon.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 2 — 🌊 해녀와 인어 · The Haenyeo and the Mermaid
// ──────────────────────────────────────────────────────────────

const haenyeo: Story = {
  id: "haenyeo",
  emoji: "🌊",
  title: { ko: "해녀와 인어", en: "The Haenyeo and the Mermaid" },
  subtitle: { ko: "잃어버린 진주", en: "The Lost Pearl" },
  tagline: {
    ko: "깊은 제주 바다에서 인어를 만난 해녀의 모험. 두 갈래 길 끝에 진주가 기다린다.",
    en: "A diver of Jeju meets a mermaid in the deep sea. A pearl waits at the end of two winding paths.",
  },
  accent: "from-cyan-100 to-sky-100",
  startSceneId: "scene-1-shore",
  scenes: {
    "scene-1-shore": {
      id: "scene-1-shore",
      title: { ko: "1장. 새벽 바다 앞에서", en: "Chapter 1 — At the Dawn-Lit Shore" },
      narration: {
        ko: "옛날, 제주 바다 어느 마을에 한 해녀가 살고 있었더라. 그녀의 어머니도 해녀였고, 그 어머니의 어머니도 해녀였단다. 한 집안의 여인들은 대대로 같은 바다에 들어가 같은 물질을 했고, 같은 갯바위에서 같은 노을을 보며 자랐다.\n\n그날 새벽, 해녀는 아직 별이 보이는 시간에 일어났다. 어머니가 남겨준 낡은 잠수경을 손바닥에 올려 한참을 들여다보았다. \"오늘은 더 깊은 곳까지 가봐야겠어요.\" 어머니에게 인사하듯 중얼거리고는, 검은 잠수복을 단단히 여미었다.\n\n갯바위에 나가 앉았다. 주황색 테왁을 옆에 두고, 빗창을 허리에 매었다. 바다는 아직 어두운 푸른빛인데, 동쪽 하늘 끝이 천천히 붉어지기 시작했다. 갈매기 한 마리가 멀리서 원을 그리며 날아갔다.\n\n\"바다 어머니, 오늘도 잘 부탁드립니다.\"\n\n해녀는 두 손을 모아 한 번 절을 하고, 깊게 숨을 들이쉬었다. 그러고는 푸른 바다 속으로 미끄러져 들어갔다.",
        en: "Long ago, in a fishing village on the southern Jeju coast, there lived a haenyeo — a woman who could swim into the deep on a single breath. Her mother had been a haenyeo, and her mother's mother before her. For generations the women of that family had slipped into the same sea, dove the same deeps, sat upon the same shore-rocks watching the same long evenings.\n\nOne dawn, before the stars had faded, she rose. She held her mother's old swimming goggles in her palm and gazed at them a while. \"Today I will go a little deeper.\" She fastened the goggles and drew on her dark diving suit.\n\nBeside her on the shore-rock she set down her orange tewak buoy, and at her hip she tied her bitchang hook. The sea was still dark, but the eastern edge of the sky was slowly turning red. Far off, a single gull traced a slow circle.\n\n\"Mother of the Sea, please keep me safe today.\"\n\nShe bowed once with her two palms together, drew one long, deep breath, and slipped into the blue.",
      },
      image: "/coloring/02-haenyeo/scene-1-shore.png",
      nextId: "scene-2-deep",
    },
    "scene-2-deep": {
      id: "scene-2-deep",
      title: { ko: "2장. 두 갈래 빛", en: "Chapter 2 — The Two Lights" },
      narration: {
        ko: "물속은 처음에는 환했다. 햇살이 부서져 내려와 모래밭을 알록달록하게 비추었다. 하지만 해녀가 더 깊이 헤엄칠수록 빛은 점점 흐려졌다. 5미터, 10미터, 15미터… 익숙한 깊이를 지나, 어머니도 다 가보지 못한 곳으로 향했다.\n\n가슴이 답답해질 무렵, 어둠 속에서 무엇인가가 깜빡였다. 푸른빛이었다. 가까이 갈수록 더 또렷해지는, 살아 있는 듯한 빛.\n\n\"무엇이지?\"\n\n그 빛을 따라 한참을 더 내려가니, 바닷속 깊은 곳에 길이 두 갈래로 나뉘어 있었다. 왼쪽으로는 색색의 산호가 미로처럼 얽혀 있고, 오른쪽으로는 키 큰 해초들이 부드럽게 흔들리고 있었다.\n\n어머니의 목소리가 귓가에 들리는 듯했다. \"얘야, 바다는 두 얼굴을 가졌단다. 한쪽은 노래로 말하고, 한쪽은 침묵으로 말한단다.\"\n\n해녀는 숨이 다 떨어지기 전에 결정해야 했다.",
        en: "The shallow water was bright. Sunlight broke into ribbons across the sandy floor. But the deeper she went, the dimmer the world became. Five meters, ten, fifteen — past the depth her mother had taught her, into water she had never tasted before.\n\nHer chest was tightening when something blinked in the dark. A blue light, faint, then clearer — alive, almost breathing.\n\n\"What is that?\"\n\nShe followed it down, and at last the path divided. To her left, branches of colored coral wove like a maze. To her right, tall kelp swayed in a long slow current.\n\nHer mother's voice rose from memory: \"Child, the sea has two faces. One speaks in song, the other in silence.\"\n\nShe had to choose before her breath was gone.",
      },
      image: "/coloring/02-haenyeo/scene-2-deep.png",
      choices: [
        { label: { ko: "🪸 산호 미로로 들어간다", en: "🪸 Enter the coral maze" }, nextId: "scene-3a-coral" },
        { label: { ko: "🌿 해초 숲으로 들어간다", en: "🌿 Enter the kelp forest" }, nextId: "scene-3b-kelp" },
      ],
    },
    "scene-3a-coral": {
      id: "scene-3a-coral",
      title: { ko: "3장. 산호 사이의 인어", en: "Chapter 3 — The Mermaid Among the Corals" },
      narration: {
        ko: "알록달록한 산호 사이로 헤엄쳐 들어가자, 길이 자꾸만 갈라지고 다시 모였다. 그러다 어디선가 부드럽고 슬픈 노래가 흘러왔다. 사람의 목소리도 아니고 새의 목소리도 아닌, 바다가 직접 부르는 듯한 노래였다.\n\n노래를 따라 가장 깊은 곳에 다다랐을 때, 어두운 그림자 사이로 긴 머리의 인어가 천천히 모습을 드러냈다. 비늘이 달빛처럼 은은하게 빛났다.\n\n인어는 두 손을 모은 채 그 안에 작은 진주 하나를 들고 있었다.\n\n\"이것은 우리 어머니의 눈물이에요.\" 인어가 말했다. \"오랜 세월 바다 깊은 곳을 지켜온 우리 어머니가 흘린 단 하나의 눈물. 사람들에게 주면 가장 비싼 보물이 되고, 바다에 두면 마을의 안전을 지킨답니다.\"\n\n인어는 가만히 진주를 내밀었다.\n\n\"가지실 건가요, 돌려주실 건가요?\"",
        en: "She slipped between the corals. The paths split and rejoined, split and rejoined. From somewhere a soft, sorrowful song drifted through the water — not the voice of a person, nor of a bird, but the sea singing to itself.\n\nAt the deepest place she came to a halt. From the shadows, a mermaid with long flowing hair appeared. Her scales shone like moonlight on water.\n\nIn her two cupped hands she held a single small pearl.\n\n\"This is my mother's tear,\" the mermaid said. \"Our mother has guarded the depths for many ages, and this is the one tear she has shed. To people, it would be the most precious of treasures. Kept in the sea, it keeps a village safe.\"\n\nThe mermaid quietly held out the pearl.\n\n\"Will you keep it, or will you give it back?\"",
      },
      image: "/coloring/02-haenyeo/scene-3a-coral.png",
      nextId: "scene-4-guardian",
    },
    "scene-3b-kelp": {
      id: "scene-3b-kelp",
      title: { ko: "3장. 해초 숲의 잠든 자라", en: "Chapter 3 — The Sleeping Turtle in the Kelp" },
      narration: {
        ko: "해초 숲 사이로 천천히 헤엄쳐 들어가자 모든 것이 고요했다. 부드러운 물결에 해초 줄기들이 한쪽으로 길게 쏠려 있었다. 그 안쪽 깊은 곳에, 거대한 자라 한 마리가 등껍질을 둥글게 말고 깊이 잠들어 있었다.\n\n자라는 너무 오래 이곳에 있었던 듯, 등껍질 위로 작은 산호가 자라고 미역이 한두 줄기 붙어 있었다. 그 등 한가운데에 작은 진주가 맑게 빛났다. 자라의 숨결에 맞춰 빛이 살짝 깜빡거리는 것 같았다.\n\n해녀가 손을 뻗으려 할 때, 옆에서 인기척이 느껴졌다. 긴 머리의 인어가 조용히 다가왔다. 인어는 입술에 손가락을 가져다 댔다.\n\n\"조용히 해 주세요. 이것은 바다가 자라에게 맡긴 거예요. 자라는 천 년 전부터 이 진주를 지키고 있어요.\"\n\n해녀는 그 말과 자라의 평온한 잠을 번갈아 보았다.",
        en: "She swam slowly between the kelp and everything went still. The kelp leaned all in one slow direction with the current. In a hollow within the forest she found a great sea turtle, asleep on the floor with its dome shell curled around it.\n\nThe turtle must have been there a very long time — small corals were growing on the shell and a thread of seaweed clung to one of its plates. At the very center of the shell, a small pearl shone clear. It seemed to flicker faintly, breathing with the turtle.\n\nShe reached out — and felt someone beside her. The mermaid had drifted close. She raised one finger to her lips.\n\n\"Quiet. The sea gave this to the turtle. He has been guarding it for a thousand years.\"\n\nThe haenyeo looked from the mermaid to the turtle's peaceful sleep, and back again.",
      },
      image: "/coloring/02-haenyeo/scene-3b-kelp.png",
      nextId: "scene-4-guardian",
    },
    "scene-4-guardian": {
      id: "scene-4-guardian",
      title: { ko: "마지막 장. 바다의 수호자", en: "Final — Guardian of the Sea" },
      narration: {
        ko: "해녀는 잠시 진주를 손바닥 위에 올려놓고 그 무게를 가만히 느꼈다. 진주는 작았지만, 손바닥에 닿는 그 차가움은 바다 전체의 무게처럼 묵직했다.\n\n\"이것은 바다의 것이지요.\"\n\n해녀는 그 말과 함께 진주를 다시 인어에게 돌려주었다. 인어는 미소를 지으며 진주를 받아 자기 가슴 가까이 가져다 댔다.\n\n그러자 — 바다 깊은 곳에서 푸른빛이 천천히 위로 퍼져 올라왔다. 처음에는 한 가닥이었다가, 곧 바닷속 모든 산호와 해초와 자라의 등껍질까지 환하게 비추었다. 해녀의 숨이 다 떨어졌다 싶은 순간, 그 빛이 그녀의 몸을 가볍게 들어 올려 수면 위로 올려주었다.\n\n해녀가 갯바위 위로 올라왔을 때, 동쪽 해는 이미 높이 떠 있었다. 마치 그녀가 잠시 깊은 꿈을 꾸고 온 것 같았다. 그러나 손에 끼고 있던 어머니의 낡은 잠수경 안쪽에, 그날 본 푸른빛이 작은 별처럼 한 점 박혀 있었다.\n\n그날부터 해녀는 바다와 마을을 잇는 수호자가 되었다.\n\n보름달이 뜨는 밤마다 그녀는 갯바위에 나가 앉았다. 푸른 바다는 보름달 아래에서 은빛으로 빛났고, 이윽고 인어가 수면 위로 천천히 떠올랐다. 두 사람은 아무 말 없이 함께 앉아, 마을 어부들의 안전과 바다의 풍요를 빌었다.\n\n그 후로 그 마을에는 큰 폭풍이 없었더라. 그물에는 늘 물고기가 가득 들어왔고, 깊은 바다에 들어간 해녀들은 모두 안전하게 돌아왔다.\n\n세월이 흘러 해녀가 늙어 더 이상 잠수하지 못하게 되었을 때, 그녀의 손녀가 같은 갯바위에 앉아 같은 바다를 보았다. 손녀는 할머니의 낡은 잠수경을 손바닥에 올려 한참을 들여다보았다.\n\n잠수경 안에 박힌 작은 푸른 별 한 점.\n\n\"오늘은 더 깊은 곳까지 가봐야겠어요.\"\n\n손녀가 중얼거리며 검은 잠수복을 단단히 여미는 그날 새벽, 갯바위 너머 바다 깊은 곳에서 인어가 조용히 미소 짓고 있었더라.",
        en: "The haenyeo laid the pearl on her open palm and felt its weight. It was a small thing, but cold against her skin in the way the whole sea is cold — heavy as all the deep water that had ever been.\n\n\"This belongs to the sea.\"\n\nWith those words she gave the pearl back. The mermaid smiled, took it, and drew it close to her heart.\n\nAnd then — from far below, a soft blue light began to spread upward. First a single thread, then every coral, every kelp frond, every sleeping turtle's shell, all aglow. Just as her breath was about to fail, the light lifted her gently to the surface.\n\nWhen she climbed back onto the shore-rock, the sun was already high. It felt as though she had returned from a long quiet dream. But inside the lenses of her mother's old goggles, a small blue point of light — like a single star — had set there forever.\n\nFrom that day on, the haenyeo became a guardian between the village and the sea.\n\nOn every full-moon night she went out to the shore-rock. The sea shone silver under the moon, and the mermaid would rise slowly to the surface. The two of them would sit together without speaking, praying for the fishermen's safety and the ocean's kindness.\n\nAfter that, no great storm came to the village. The nets returned heavy with fish. The haenyeo who went into deep water all came back alive.\n\nYears passed, and when the haenyeo grew too old to dive, her granddaughter came to sit on the same shore-rock and watch the same sea. The girl held the grandmother's old goggles in her palm and gazed at them a while.\n\nA small blue star, fixed inside the lens.\n\n\"Today I will go a little deeper.\"\n\nThe granddaughter fastened the goggles and drew on her dark diving suit. And far below, in the dawn-blue depths, the mermaid was quietly smiling.",
      },
      image: "/coloring/02-haenyeo/scene-4-guardian.png",
      endingLabel: { ko: "🌊 바다의 수호자 — 정통 결말", en: "🌊 Guardian of the Sea — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "해녀와 인어 (제주 전설)",
    romanized: "Haenyeo wa Ineo",
    englishTitle: "The Haenyeo and the Mermaid (Jeju Lore)",
    origin: {
      ko: "제주도의 해녀 문화와 바다 전설을 합쳐 새로 지은 이야기예요. 제주 해녀는 진짜로 있고, 유네스코 무형 문화유산이에요.",
      en: "An original tale woven from Jeju Island's diving women tradition and Korean sea spirit lore. The haenyeo of Jeju are real — recognized by UNESCO as a Living Heritage.",
    },
    summary: {
      ko: "제주의 바다에는 옛날부터 자신의 숨만으로 깊은 바다를 누비는 여자 잠수부, 해녀가 있어요. 마을에 전해지는 옛이야기 속엔 깊은 바다에 인어가 살아 큰 진주를 지킨다는 얘기도 있죠. 우리 이야기는 해녀가 그 인어를 만난다면 어떻게 될까 상상해본 거예요.",
      en: "Jeju Island has long been home to haenyeo — women divers who slip through the deep on just one breath. Local tales say mermaids in the deep guard great pearls. Our story imagines what happens when a haenyeo finally meets one.",
    },
    glossary: [
      {
        korean: "해녀",
        romanized: "haenyeo",
        pronunciation: "HEH-nyaw",
        meaning: { ko: "산소통 없이 바다 깊이 잠수해 해산물을 캐는 제주의 여성 잠수부.", en: "A woman free-diver of Jeju who gathers seafood deep underwater without an oxygen tank." },
      },
      {
        korean: "테왁",
        romanized: "taewak",
        pronunciation: "TEH-wak",
        meaning: { ko: "해녀가 바다 위에서 쉬거나 잡은 것을 담아두는 둥근 주황색 부표.", en: "A round orange float a haenyeo rests on between dives and uses to hold her catch." },
      },
      {
        korean: "인어",
        romanized: "ineo",
        pronunciation: "EE-naw",
        meaning: { ko: "사람의 모습과 물고기 꼬리를 가진 바다의 신비한 존재.", en: "A mythical sea being with a human upper body and a fish's tail — a mermaid." },
      },
      {
        korean: "진주",
        romanized: "jinju",
        pronunciation: "JIN-joo",
        meaning: { ko: "조개 속에서 자라는 동그란 보석.", en: "A round gem that grows inside a shellfish — a pearl." },
      },
      {
        korean: "제주",
        romanized: "Jeju",
        pronunciation: "CHEH-joo",
        meaning: { ko: "한국 남쪽에 있는 화산섬. 해녀와 검은 돌, 푸른 바다로 유명해요.", en: "A volcanic island south of Korea, famous for its haenyeo, black volcanic stones, and blue sea." },
      },
    ],
    ourVersion: {
      ko: "원작이 정해진 이야기는 아니라 제주 해녀 문화와 한국 바다 정령 전설을 엮어 새로 지었어요. 두 갈래 길(산호 미로 / 해초 숲) 어느 쪽으로 들어가도 결국 진주는 바다의 것이라는 깨달음으로 모이고, 그 보답으로 해녀가 바다와 마을을 잇는 수호자가 됩니다. 어머니의 잠수경 안에 박힌 푸른 별이 손녀에게로 이어지지요.",
      en: "There's no single original — we wove together Jeju's haenyeo culture and Korean sea-spirit lore. Whichever path you take (coral maze or kelp forest), the canonical ending converges on the same realization: the pearl belongs to the sea. In return, the haenyeo becomes a guardian between sea and village, and the blue star sealed inside her mother's old goggles passes down to her granddaughter.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 3 — 🦌 선녀와 나무꾼 · The Fairy and the Woodcutter
// ──────────────────────────────────────────────────────────────

const woodcutter: Story = {
  id: "woodcutter",
  emoji: "🦌",
  title: { ko: "선녀와 나무꾼", en: "The Fairy and the Woodcutter" },
  subtitle: { ko: "산속의 작은 약속", en: "A small promise in the mountain" },
  tagline: {
    ko: "사슴 한 마리에서 시작된 약속이 어디로 이끌까. 산속 연못의 선녀와 함께 가는 길.",
    en: "A promise born of a single deer. Where will the path beside a heavenly fairy lead?",
  },
  accent: "from-emerald-100 to-teal-100",
  startSceneId: "scene-1-deer",
  scenes: {
    "scene-1-deer": {
      id: "scene-1-deer",
      title: { ko: "1장. 사슴을 구한 날", en: "Chapter 1 — The Day He Saved the Deer" },
      narration: {
        ko: "옛날, 깊은 산 아래 작은 초가집에서 늙은 어머니와 단둘이 사는 나무꾼이 있었더라. 가난했지만 마음씨가 따뜻한 청년이었다. 새벽이면 지게를 지고 산에 올라 나무를 하고, 해질녘이면 어머니가 기다리는 집으로 돌아왔다.\n\n그날도 산에서 나무를 하고 있는데, 어디선가 거친 발소리가 들렸다. 흰 사슴 한 마리가 헐떡이며 그의 발 앞에 무릎을 꿇었다.\n\n\"구해 주세요. 사냥꾼이 쫓아오고 있어요.\"\n\n사슴은 사람처럼 말했다. 나무꾼은 놀랐지만, 그 까만 눈에 비친 두려움을 보고 망설이지 않았다. 자기가 베어 둔 나뭇더미 뒤에 사슴을 숨겨 주고, 그 위에 다시 나뭇잎을 덮어 주었다.\n\n곧 험상궂은 사냥꾼이 활을 들고 나타났다.\n\n\"여기 흰 사슴 한 마리 못 보았소?\"\n\n나무꾼은 손가락으로 반대편 산봉우리를 가리켰다.\n\n\"방금 저쪽으로 뛰어 올라갔습니다요.\"\n\n사냥꾼이 멀어진 뒤, 나뭇잎을 들춰 보니 사슴이 두 눈에 눈물이 그렁그렁한 채 바라보고 있었다.",
        en: "Long ago, in a small thatched-roof house at the foot of a high mountain, there lived a young woodcutter with his elderly mother. They were poor, but he was kind-hearted. Each dawn he shouldered his A-frame carrier and climbed the mountain for firewood; each dusk he returned to the house where his mother waited.\n\nOne such day, as he was at his work, heavy footsteps came crashing through the brush. A white deer staggered up to him and dropped to its knees.\n\n\"Please, hide me. A hunter is coming.\"\n\nThe deer spoke like a person. The woodcutter was startled, but seeing the fear in those dark eyes, he did not hesitate. He hid the deer behind the firewood he had cut and covered it with fallen leaves.\n\nA grim-faced hunter soon appeared, bow in hand.\n\n\"Have you seen a white deer come this way?\"\n\nThe woodcutter pointed to the far ridge. \"Just now, it bounded up that mountain over there, sir.\"\n\nWhen the hunter had gone, he brushed the leaves aside. The deer was looking up at him, its two eyes brimming with tears.",
      },
      image: "/coloring/03-woodcutter/scene-1-deer.png",
      nextId: "scene-2-pond",
    },
    "scene-2-pond": {
      id: "scene-2-pond",
      title: { ko: "2장. 별빛 연못의 비밀", en: "Chapter 2 — The Secret of the Starlit Pond" },
      narration: {
        ko: "\"은혜는 잊지 않겠습니다.\" 사슴이 말했다. \"원하시는 게 있다면 들어드리지요.\"\n\n나무꾼은 한참을 망설이다 솔직하게 말했다. \"저는 가난해 장가를 들지 못합니다. 어머니께 며느리 한 번 보여 드리고 싶습니다만…\"\n\n사슴은 잠시 눈을 감았다가 천천히 입을 열었다.\n\n\"산 가장 깊은 곳에 별빛이 비치는 연못이 있습니다. 보름달이 뜨는 밤이면 하늘의 선녀들이 그 연못에 내려와 목욕을 합지요. 한 사람의 날개옷을 몰래 숨기면 그 선녀는 하늘로 돌아가지 못합니다. 그러면 아내로 맞이할 수 있을 거예요. 단, 한 가지 약속을 꼭 지키셔야 합니다.\"\n\n사슴이 검고 깊은 눈으로 나무꾼을 똑바로 바라보았다.\n\n\"자녀 셋을 낳기 전에는 절대로 날개옷을 돌려주지 마세요. 약속이 깨지면 선녀는 하늘로 돌아갈 거예요.\"\n\n나무꾼은 깊이 고개를 끄덕였다.\n\n그날 밤, 보름달이 하늘 가운데 올라왔을 때 나무꾼은 별빛 연못에 도착했다. 정말로 여러 선녀가 옷을 벗어 둔 채 물에 몸을 담그고 있었다. 옷마다 깃털 같은 빛이 깃들어 있었다. 그는 한 벌의 옷을 몰래 집어 들어 품에 안았다.\n\n한참 뒤, 선녀들이 하늘로 다시 올라갈 시간이 되었다. 그러나 한 사람만 자신의 옷을 찾지 못하고 연못가에 서서 울고 있었다. 어디로 그녀를 데려갈까?",
        en: "\"I will not forget your kindness,\" the deer said. \"If you have a wish, tell me.\"\n\nThe woodcutter hesitated, then spoke plainly. \"I am poor and cannot marry. I only wish to bring my mother a daughter-in-law once, before her years are done.\"\n\nThe deer closed its eyes for a moment, then opened them slowly.\n\n\"Deep in the heart of the mountain there is a pond where starlight pools. On the night of the full moon, fairies of heaven come down to bathe there. If you hide the feathered robe of one of them, she cannot fly back. You may take her as your wife. But you must keep one promise.\"\n\nThe deer fixed him with its dark, deep eyes.\n\n\"Until she has borne three children, you must never return her robe. If the promise is broken, she will fly back to heaven.\"\n\nThe woodcutter nodded deeply.\n\nThat night, when the full moon hung in the sky's middle, he reached the starlit pond. Truly there were fairies bathing, their feathered robes folded by the water's edge, each shimmering with a soft inner light. He gathered up one robe and held it close to his chest.\n\nWhen the hour came for the fairies to fly back, one of them could not find her robe. She stood at the water's edge, weeping. Where should the woodcutter take her now?",
      },
      image: "/coloring/03-woodcutter/scene-2-pond.png",
      choices: [
        { label: { ko: "🏠 산속 작은 오두막으로 데려간다", en: "🏠 Take her to a small hut in the deep mountain" }, nextId: "scene-3a-hut" },
        { label: { ko: "🏘 마을 어머니 곁으로 데려간다", en: "🏘 Take her down to my mother's house in the village" }, nextId: "scene-3b-village" },
      ],
    },
    "scene-3a-hut": {
      id: "scene-3a-hut",
      title: { ko: "3장. 산속 오두막의 두 자녀", en: "Chapter 3 — Two Children in the Mountain Hut" },
      narration: {
        ko: "나무꾼은 선녀를 산속 깊은 작은 오두막으로 데려갔다. 처음에는 슬퍼하기만 하던 선녀도, 시간이 지나면서 그의 따뜻한 마음에 마음을 열었다.\n\n봄이면 함께 산나물을 캐고, 여름이면 폭포에서 물을 길었다. 가을이면 다람쥐가 모아둔 도토리를 함께 줍고, 겨울이면 솔잎으로 차를 끓여 마셨다. 두 사람 사이에는 곧 사내아이와 누이동생, 두 명의 자녀가 태어났다.\n\n사슴의 약속 — 자녀 셋을 낳기 전에는 날개옷을 돌려주지 말라 — 는 나무꾼의 마음 한구석에 늘 무겁게 남아 있었다. 그는 날개옷을 자기 지게 깊숙이 숨겨 놓았다.\n\n그러나 선녀는 가끔 한밤중에 잠에서 깨어 작은 창 너머 별을 올려다보았다. 두 아이가 잠든 사이, 그녀는 가만히 흐느꼈다.\n\n\"저 별들 사이에 어머니가 계신데… 한 번만 만나 뵙고 싶어요.\"\n\n어느 날 밤, 그녀의 슬픈 모습을 더는 보고 있을 수 없었던 나무꾼은 결심했다. 자녀가 둘뿐이지만, 한 번만 — 한 번만 옷을 입어 보게 해 주리라. 그는 지게 속 깊은 곳에서 날개옷을 꺼내 그녀에게 건넸다.",
        en: "The woodcutter took her to a small hut deep in the mountain. At first she only grieved, but as the seasons passed she opened her heart to his quiet kindness.\n\nIn spring they gathered mountain herbs together. In summer they drew water from the waterfall. In autumn they picked up acorns the squirrels had gathered. In winter they brewed pine-needle tea. Soon they had two children — a little boy and his younger sister.\n\nThe deer's promise — that the robe must not be returned until three children were born — weighed always on the woodcutter's mind. He had hidden the robe deep in his A-frame carrier.\n\nBut sometimes in the deep of night the fairy woke and looked up through the small window at the stars. While the two children slept, she wept quietly.\n\n\"My mother is among those stars… I only wish to see her once.\"\n\nOne night, no longer able to bear her sorrow, the woodcutter made up his mind. Two children, not three — but he would let her wear the robe just once, only once. He drew the feathered robe from the bottom of his carrier and held it out to her.",
      },
      image: "/coloring/03-woodcutter/scene-3a-hut.png",
      nextId: "scene-4-dawn",
    },
    "scene-3b-village": {
      id: "scene-3b-village",
      title: { ko: "3장. 마을 어머니 곁의 두 자녀", en: "Chapter 3 — Two Children at Grandmother's House" },
      narration: {
        ko: "나무꾼은 선녀를 산에서 내려와 마을의 어머니 집으로 데려갔다. 어머니는 며느리를 보며 눈물을 흘렸고, 마을 사람들은 그토록 아름다운 여인이 시집을 왔다는 소문에 들떠 했다.\n\n어머니의 따뜻한 보살핌 속에, 두 사람은 곧 사내아이와 누이동생 두 자녀를 낳았다. 마을 어귀의 우물가에서 빨래를 하고, 장에서 떡을 나눠 먹고, 명절이면 한복을 차려입고 어머니께 절을 올렸다. 그렇게 선녀는 점점 인간 세상의 여인으로 살아갔다.\n\n그러나 가을바람이 차가워질 때면, 선녀는 마당에 나가 하늘을 한참 올려다보았다. 두 아이가 그녀의 치맛자락을 붙들고 같이 올려다보았다.\n\n\"엄마, 저 위에 뭐가 있어요?\"\n\n\"별이 있단다. 우리 별이…\"\n\n선녀는 더 말을 잇지 못하고 두 아이를 꼭 안았다. 어느 날 밤, 그녀가 자녀 둘만 안고 잠든 모습을 본 나무꾼은 가슴이 미어졌다. 약속을 떠올렸지만 — 사슴이 셋을 낳기 전엔 안 된다 했지만 — 그래도 한 번만, 그녀가 어머니를 볼 수 있게.\n\n그는 다락방 깊은 곳에 숨겨 놓았던 날개옷을 꺼냈다.",
        en: "The woodcutter brought her down from the mountain to his mother's house in the village. His mother wept for joy at meeting her daughter-in-law, and the villagers were quietly amazed that so beautiful a woman had come to wed.\n\nUnder his mother's warm care, soon a little boy and his younger sister were born. The fairy washed clothes at the village well, shared rice cakes at the market, dressed in hanbok at festivals and bowed to the elder mother. So she lived, little by little, as a woman of the human world.\n\nBut when the autumn wind turned cold, she would step out into the courtyard and gaze long up at the sky. The two children would catch at her skirt and look up with her.\n\n\"Mama, what's up there?\"\n\n\"Stars, my darling. Our star is…\"\n\nShe could not finish, and held the children close. One night the woodcutter watched her sleep with their two children in her arms, and his heart ached. He remembered the promise — three before the robe — but only once, only once so she could see her mother.\n\nHe climbed to the loft and drew out the feathered robe he had hidden there.",
      },
      image: "/coloring/03-woodcutter/scene-3b-village.png",
      nextId: "scene-4-dawn",
    },
    "scene-4-dawn": {
      id: "scene-4-dawn",
      title: { ko: "마지막 장. 새벽 빛이 된 그리움", en: "Final — The Dawn Light of Longing" },
      narration: {
        ko: "선녀는 날개옷을 받아 들자 가만히 한참을 들여다보았다. 그러더니 그 옷을 입었다. 어깨에서 깃털 빛이 흘러나오고, 발이 천천히 바닥에서 떠올랐다.\n\n\"한 번만 다녀올게요.\" 선녀가 슬픈 미소로 말했다.\n\n그러나 옷을 입은 그녀는 본능처럼 두 아이를 양팔에 안았다. 한 아이는 오른팔 안에, 한 아이는 왼팔 안에. 그러고는 그대로 천천히, 천천히 별빛이 쏟아지는 밤하늘로 올라가기 시작했다.\n\n\"안 돼요! 잠깐만요!\"\n\n나무꾼이 달려 나가 손을 뻗었지만, 이미 그녀와 두 자녀는 하늘 너머로 사라지고 있었다. 사슴이 한 말이 비로소 뼈저렸다. 셋을 낳기 전에는 옷을 돌려주지 말 것을. 자녀가 셋이었다면, 한 아이는 안고 가지 못해 그녀가 다시 내려왔을 것을.\n\n그가 무너져 앉아 울고 있을 때, 등 뒤에서 부드러운 발소리가 들렸다.\n\n\"울지 마세요. 가실 길이 하나 남아 있어요.\"\n\n흰 사슴이었다. 사슴은 나무꾼을 별빛 연못으로 다시 데려갔다.\n\n\"보름달이 뜨는 밤이면 하늘에서 두레박이 물을 길러 내려옵니다. 그 두레박에 몰래 올라타세요. 다만 — 절대로 두 발이 다시 땅에 닿게 해서는 안 됩니다.\"\n\n그날 밤, 하늘에서 정말로 큰 두레박 하나가 별빛 연못에 내려왔다. 나무꾼은 그 안에 몸을 숨겼다. 두레박이 다시 하늘로 올라가는 동안 그는 두 손을 모아 가족을 그리는 마음만을 빌었다.\n\n마침내 두레박은 하늘에 닿았다. 그곳에서 선녀와 두 자녀가 그를 기다리고 있었다. 그는 별들 사이에서 가족과 함께 살게 되었다.\n\n그러나 — 한 가지가 마음에 걸렸다. 산 아래 작은 초가집에서 아들이 돌아오기만을 기다리고 계신 어머니. 그는 매일 새벽이면 하늘 끝에 서서 땅을 내려다보았다. 그 그리움이 새벽 첫 빛이 되어 산골 어머니의 창문에 가만히 내려앉았더라.\n\n그래서 오늘날도 새벽 첫 빛이 산 너머에서 부드럽게 비쳐 오면, 그것은 하늘에 있는 아들이 어머니를 그리는 마음이라고 — 옛 어른들이 이렇게 손주에게 전했단다.",
        en: "When the fairy received the feathered robe, she gazed at it a long while. Then she put it on. Light spilled from its shoulders, and her feet rose slowly from the floor.\n\n\"I will only go once,\" she said with a sad smile.\n\nBut the robe spoke to her instincts. She gathered her two children into her arms — one in the right, one in the left. And slowly, slowly, she rose into the star-strewn night sky.\n\n\"Wait — don't go!\"\n\nThe woodcutter ran out, reached up, but already she and the two children were vanishing beyond the sky. Only now did the deer's words bite deep. Don't return the robe until three. If there had been three children, one would have remained — she would have had to come back.\n\nAs he sat broken on the ground, soft footsteps came behind him.\n\n\"Don't weep. One road yet remains.\"\n\nIt was the white deer. The deer led him back to the starlit pond.\n\n\"On full-moon nights, a great bucket descends from heaven to draw water from this pond. Hide inside that bucket. Only — do not let your two feet touch the earth again.\"\n\nThat night, sure enough, a great bucket came down from the sky into the starlit pond. The woodcutter hid himself inside. As the bucket lifted toward heaven, he prayed only for his family.\n\nAt last the bucket reached the sky. There the fairy and his two children were waiting. He came to live with them among the stars.\n\nBut one thing weighed on his heart. His old mother, in the small thatched-roof house at the foot of the mountain, was still waiting for her son to come home. Every dawn the woodcutter went to the edge of heaven and looked down at the earth. His longing became the first soft light of morning, settling gently on his mother's window in the mountain village.\n\nSo even today, when the first morning light slips softly over the ridge, the old ones say — that is the son in heaven, missing his mother. So the grandmothers tell their grandchildren still.",
      },
      image: "/coloring/03-woodcutter/scene-4-dawn.png",
      endingLabel: { ko: "☁️ 새벽 빛이 된 그리움 — 정통 결말", en: "☁️ The Dawn Light of Longing — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "선녀와 나무꾼",
    romanized: "Seonnyeo wa Namuggun",
    englishTitle: "The Heavenly Maiden and the Woodcutter",
    origin: {
      ko: "한국 전역에서 다양한 모습으로 전해지는 옛이야기예요. 산이 많은 한국답게 산속 연못과 하늘의 선녀가 자주 등장해요.",
      en: "A folktale told across Korea in many variations. Like Korea itself — full of mountains — it features mountain ponds and maidens from the sky.",
    },
    summary: {
      ko: "마음 따뜻한 나무꾼이 사냥꾼에게 쫓기는 사슴을 숨겨줘요. 고마운 사슴은 보답으로 산속 연못의 비밀을 알려주죠. 그곳에서 하늘에서 내려온 선녀를 만나고, 둘은 함께 살게 되지만 결국 선녀는 다시 하늘로 돌아가요. 슬프고도 아름다운 이야기랍니다.",
      en: "A kind woodcutter hides a deer from a hunter. In thanks, the deer reveals the secret of a mountain pond. There he meets a maiden who has come down from the sky. They live together for a time, but in the end she returns to the heavens. A bittersweet tale of kindness, longing, and letting go.",
    },
    glossary: [
      {
        korean: "선녀",
        romanized: "seonnyeo",
        pronunciation: "SUHN-nyaw",
        meaning: { ko: "하늘에서 내려온 아름다운 여인. 한국 옛이야기 속 천녀.", en: "A beautiful woman who comes down from the sky — a Korean heavenly maiden." },
      },
      {
        korean: "나무꾼",
        romanized: "namuggun",
        pronunciation: "NAH-moo-kkun",
        meaning: { ko: "산에서 나무를 해서 파는 사람.", en: "A person who gathers and sells wood from the mountain — a woodcutter." },
      },
      {
        korean: "사슴",
        romanized: "saseum",
        pronunciation: "SAH-seum",
        meaning: { ko: "한국 산속에 사는 뿔 달린 동물.", en: "The antlered animal of Korean mountains — a deer." },
      },
      {
        korean: "한복",
        romanized: "hanbok",
        pronunciation: "HAHN-bohk",
        meaning: { ko: "한국 전통 의상. 색이 곱고 소매가 넓어요.", en: "Korean traditional clothing — bright colors and flowing sleeves." },
      },
      {
        korean: "폭포",
        romanized: "pokpo",
        pronunciation: "POHK-poh",
        meaning: { ko: "절벽에서 떨어지는 물줄기. 한국 산에 많아요.", en: "Water falling from a cliff — there are many in Korean mountains." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 선녀를 어디로 데려갈지 — 산속 오두막 / 마을 어머니 집 — 을 직접 선택해요. 어느 길로 가도 결국 자녀 둘만 안고 선녀가 하늘로 올라가고, 두레박을 타고 따라간 나무꾼의 그리움이 새벽빛이 되어 어머니의 창에 내려앉는 같은 정통 결말로 모입니다.",
      en: "We follow the original story closely, but you choose where the woodcutter takes the fairy — a quiet mountain hut or his mother's village home. Either path converges on the same canonical ending: she rises to heaven holding their two children, he follows by hidden bucket, and his longing for his earthly mother becomes the first dawn light on her window.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 4 — 👺 혹부리 영감 · The Old Man with the Lump
// ──────────────────────────────────────────────────────────────

const dokkaebi: Story = {
  id: "dokkaebi",
  emoji: "👺",
  title: { ko: "혹부리 영감", en: "The Old Man and the Goblins" },
  subtitle: { ko: "달밤의 노래 한 곡", en: "A song under the moon" },
  tagline: {
    ko: "산길에서 길을 잃은 영감이 도깨비들의 잔치를 마주친 밤. 노래 한 곡이 운명을 가른다.",
    en: "Lost on a mountain path, an old man stumbles on a goblins' feast. A single song will change his fate.",
  },
  accent: "from-violet-100 to-pink-100",
  startSceneId: "scene-1-hut",
  scenes: {
    "scene-1-hut": {
      id: "scene-1-hut",
      title: { ko: "1장. 노래하는 영감과 외딴 빈집", en: "Chapter 1 — The Singing Old Man and the Lonely Hut" },
      narration: {
        ko: "옛날, 어느 마을에 마음씨가 곱고 노래를 잘 부르는 영감 한 분이 살고 계셨더라. 그런데 이 영감에게는 턱 한쪽에 커다란 혹이 매달려 있었다. 마을 아이들이 가끔 그 혹을 신기하게 바라보았지만, 영감은 한 번도 부끄러워하지 않았다. 오히려 혹을 슬쩍 두드리며 \"이건 내 노래 주머니란다\" 하고 웃었다.\n\n영감은 매일 산에 올라 나무를 했다. 등에 진 지게에 나뭇단을 묶고 산을 내려오면서, 그는 늘 흥얼흥얼 노래를 불렀다. 새들이 따라 지저귀고, 다람쥐들이 멈춰 서서 귀를 기울이는 것 같았다.\n\n그날도 영감은 산 깊은 곳까지 나무를 하러 갔다. 한참을 작업하고 보니 어느덧 해가 산 너머로 기울고 있었다. 길은 어두워지고 안개가 깔리기 시작했다.\n\n\"이거 큰일이군. 오늘은 마을까지 못 내려가겠어.\"\n\n마침 길 옆에 오래되어 보이는 빈 초가집 한 채가 있었다. 영감은 그 안에 들어가 짚단 위에 누웠다. 곧 깊은 잠에 빠졌다.",
        en: "Long ago in a certain village there lived a kind-hearted old man with a wonderful singing voice. He had, though, a large lump hanging from one side of his jaw. The village children sometimes stared at it in wonder, but the old man was never ashamed. He would tap the lump lightly and say with a smile, \"This is my song-pouch.\"\n\nEvery day he climbed the mountain to gather firewood. As he made his way down with bundles tied to his A-frame carrier, he would hum and sing. The birds seemed to answer him, and the squirrels paused on the branches to listen.\n\nThat day he went deeper than usual. By the time he had finished his work, the sun had slipped behind the ridge. The path darkened, and a soft mist began to rise.\n\n\"Trouble. I can't reach the village before nightfall.\"\n\nBeside the path stood an old, abandoned thatched-roof hut. The old man slipped inside, lay down on a pile of straw, and was soon fast asleep.",
      },
      image: "/coloring/04-dokkaebi/scene-1-hut.png",
      nextId: "scene-2-feast",
    },
    "scene-2-feast": {
      id: "scene-2-feast",
      title: { ko: "2장. 한밤중 도깨비들의 잔치", en: "Chapter 2 — The Goblins' Midnight Feast" },
      narration: {
        ko: "한밤중, 빈집 문을 누군가 와락 열어젖혔다. 영감은 깜짝 놀라 눈을 떴지만, 곧 짚단 더미 뒤에 몸을 숨겼다. 살짝 머리만 들어 마루를 바라보니 ─ 거기에는 둥글둥글하고 머리에 외뿔이 난 도깨비들이 줄줄이 들어오고 있었다.\n\n한 마리, 두 마리, 셋, 다섯, 일곱… 빈집 마루 한가운데 큰 솥과 술병이 놓이고, 도깨비들이 둥글게 둘러앉아 잔치를 벌이기 시작했다. \"오늘은 보름달이 좋구나!\" \"노래를 부르자, 노래를!\"\n\n그런데 어쩐 일인지 도깨비들의 노랫소리는 영 신통치 않았다. 음정도 맞지 않고, 박자도 엉성했다. 도깨비들이 머리를 긁적이며 서로를 쳐다보았다. \"왜 우리 노래는 이러지?\"\n\n짚단 뒤의 영감은 입이 근질거렸다. 평생 노래를 사랑해 온 그였다. 도저히 가만히 있을 수가 없었다.\n\n\"에라, 무서운 도깨비라도 좋다. 한 곡 불러보자.\"\n\n그는 두 가지 노래 중 어떤 노래를 부를지 잠시 망설였다. 신나서 모두가 일어나 춤추게 할 마을 노래를 부를까, 아니면 어머니께 어릴 때 배운 부드러운 자장가를 들려줄까.",
        en: "In the middle of the night, the hut's door swung open with a bang. The old man started, then quickly hid himself behind the pile of straw. Peeking out, he saw — a line of round-bodied dokkaebi goblins, each with a single horn on its head, marching into the room.\n\nOne, two, three, five, seven… In the middle of the floor they set down a great cauldron and a tall wine jar, and seated themselves in a circle to begin a feast. \"What a fine full moon!\" they cried. \"Let us sing!\"\n\nBut for some reason their singing was — not very good. Pitches drifted, the rhythm was crooked. The dokkaebi scratched their horns and looked at each other in confusion. \"Why does our song sound like this?\"\n\nBehind the straw, the old man's mouth twitched. He had loved song all his life. He could not stay silent.\n\n\"Even if they are frightful goblins, I must sing one song.\"\n\nHe hesitated between two — the lively village song that would have them all dancing, or the soft lullaby his own mother had sung him long ago.",
      },
      image: "/coloring/04-dokkaebi/scene-2-feast.png",
      choices: [
        { label: { ko: "🎵 흥겨운 마을 노래를 부른다", en: "🎵 Sing the lively village song" }, nextId: "scene-3a-dance" },
        { label: { ko: "🌙 어머니의 자장가를 부른다", en: "🌙 Sing his mother's lullaby" }, nextId: "scene-3b-lullaby" },
      ],
    },
    "scene-3a-dance": {
      id: "scene-3a-dance",
      title: { ko: "3장. 도깨비들과 함께 춤추는 밤", en: "Chapter 3 — A Night of Dancing with the Goblins" },
      narration: {
        ko: "영감이 짚단 뒤에서 천천히 일어서며 박수를 한 번 치고 노래를 시작했다.\n\n\"달 떠라 떠라 보름달 떠라, 우리 마을 잔치 벌어졌다!\"\n\n영감의 목소리가 빈집을 가득 채웠다. 도깨비들이 깜짝 놀라 자리에서 벌떡 일어났다. 처음에는 어리둥절했지만, 곧 영감의 노래에 맞춰 한 마리, 두 마리 어깨를 으쓱이기 시작했다.\n\n\"이 노래는 무슨 노래냐!\" \"어쩜 이리 신나는고!\"\n\n도깨비들이 둥글게 둘러서서 빙글빙글 돌며 춤을 추기 시작했다. 외뿔이 흔들리고, 둥근 배가 출렁였다. 영감도 짚단 더미에서 나와 도깨비들 사이에 끼어 함께 춤을 추었다. 빈집의 마루가 쿵쿵 울리고 천장의 거미줄이 흔들렸다.\n\n한참을 신나게 놀고 나서, 가장 큰 도깨비 두목이 헐떡이며 영감 앞에 멈춰 섰다.\n\n\"영감님, 어떻게 그런 좋은 노래가 나오십니까? 우리도 그런 노래를 부르고 싶습니다!\"",
        en: "The old man rose slowly from behind the straw, clapped once, and began to sing.\n\n\"Moon rise, full moon rise — the village feast is ready tonight!\"\n\nHis voice filled the hut. The dokkaebi sprang up in surprise. They stared at first, then one by one their shoulders began to bounce in time with the song.\n\n\"What song is that!\" \"What a fine, fine sound!\"\n\nThey formed a ring and spun round and round, dancing. Their horns bobbed, their round bellies bounced. The old man stepped out from behind the straw and danced among them. The floor of the hut thumped, the cobwebs at the ceiling trembled.\n\nWhen they had danced a long while, the biggest dokkaebi — their chief — stopped before the old man, panting.\n\n\"Sir, how do such fine songs come from you? We want to sing songs like that too!\"",
      },
      image: "/coloring/04-dokkaebi/scene-3a-dance.png",
      nextId: "scene-4-lump",
    },
    "scene-3b-lullaby": {
      id: "scene-3b-lullaby",
      title: { ko: "3장. 자장가에 잠드는 도깨비들", en: "Chapter 3 — Goblins Drowsing to a Lullaby" },
      narration: {
        ko: "영감이 짚단 뒤에서 가만히 일어서며, 옛날 어머니께 배운 자장가를 부드럽게 부르기 시작했다.\n\n\"자장자장 우리 아기 잘도 잔다, 산 너머 별빛도 잠이 들고…\"\n\n영감의 목소리가 잔잔하게 빈집에 퍼졌다. 시끄럽던 도깨비들이 동작을 멈추고 가만히 귀를 기울였다. 처음에는 어리둥절했지만, 곧 한 마리, 두 마리 눈꺼풀이 무거워지기 시작했다.\n\n\"어쩜 이리 마음이 따뜻해지는고…\" \"잠이 솔솔 오는구나…\"\n\n도깨비들이 둥글게 둘러앉은 채로 서로의 어깨에 머리를 기댔다. 외뿔이 살짝 흔들리고, 큰 눈이 천천히 감겼다. 영감도 가만히 노래를 이어가며, 도깨비들 한복판에 자리를 잡고 앉았다. 달빛이 빈 창으로 부드럽게 흘러 들어왔다.\n\n한참 후, 가장 큰 도깨비 두목이 졸린 눈을 비비며 영감에게 물었다.\n\n\"영감님, 어떻게 그런 따뜻한 노래가 나오십니까? 우리도 그런 노래를 부르고 싶습니다!\"",
        en: "The old man rose softly from behind the straw and began the lullaby his mother had taught him long ago.\n\n\"Sleep, sleep, my little one sleeps, the starlight beyond the mountain is sleeping too…\"\n\nHis gentle voice spread through the hut like a slow tide. The noisy dokkaebi stopped their motion and listened. They blinked, confused, and then one by one their eyelids grew heavy.\n\n\"How warm it makes the heart…\" \"Sleep comes so soft…\"\n\nThey sat in their circle and leaned their heads gently against each other's shoulders. Their horns swayed a little, their large eyes slowly closed. The old man continued his quiet singing and took his seat in the middle of them. The moonlight slid in through the empty window.\n\nAfter a long while, the biggest dokkaebi rubbed his sleepy eyes and asked,\n\n\"Sir, how do such warm songs come from you? We want to sing songs like that too!\"",
      },
      image: "/coloring/04-dokkaebi/scene-3b-lullaby.png",
      nextId: "scene-4-lump",
    },
    "scene-4-lump": {
      id: "scene-4-lump",
      title: { ko: "마지막 장. 혹과 보물, 그리고 욕심쟁이의 길", en: "Final — The Lump, the Treasure, and the Greedy Man's Road" },
      narration: {
        ko: "영감은 두목 도깨비를 한참 바라보다가, 자기 턱에 매달린 큰 혹을 손으로 살짝 두드렸다.\n\n\"사실은… 이 혹에서 나옵니다. 이 안에 평생 모은 노래가 다 들어 있지요.\"\n\n도깨비들이 너 나 할 것 없이 영감에게 다가왔다. \"그 혹을 우리에게 파시오! 보물을 한가득 드리겠소!\"\n\n두목 도깨비가 손가락을 가볍게 들어 영감의 혹을 어루만지자, 혹이 거짓말처럼 스르륵 떨어졌다. 영감의 턱이 깨끗해졌다. 그 자리에 도깨비들은 큰 보따리를 한가득 내려놓았다. 안에는 금덩어리와 은붙이, 비단과 곡식이 가득 들어 있었다.\n\n\"고맙소이다, 영감님! 잘 가시오!\"\n\n어느새 첫 닭이 울고, 도깨비들은 사르르 빈집에서 사라졌다. 영감은 보물 보따리를 지고 어두운 산길을 더듬어 새벽 무렵 마을로 돌아왔다.\n\n마을 사람들은 영감의 깨끗한 턱과 한가득 든 보물에 깜짝 놀랐다. 영감은 자기가 본 모든 것을 솔직히 들려주었다. 마을은 잔치를 열고 영감을 칭송했다.\n\n그런데 이 이야기를 옆 마을에 사는 욕심 많은 영감 한 분이 듣게 되었더라. 그 영감의 턱에도 큰 혹이 매달려 있었다. 다만 그는 노래도 못 하고 마음도 곱지 않았다.\n\n\"허허, 그 늙은이가 했다면 나도 못 할 게 있나? 보물도 받고 혹도 떼어 오리라.\"\n\n다음 보름달 밤, 욕심쟁이 영감은 일부러 그 빈집에 찾아가 짚단 뒤에 숨었다. 도깨비들이 와서 잔치를 시작했다. 영감은 큰소리로 노래를 시작했다 ─ 그러나 음정도 박자도 엉망진창이었다. 도깨비들이 인상을 찌푸렸다.\n\n\"이 노래는 또 무엇이냐?\" \"지난번 그 영감이 아니로구나!\"\n\n두목 도깨비가 욕심쟁이 영감을 노려보았다. \"우리는 한 번 속았다. 이번엔 안 속는다.\"\n\n도깨비들은 지난번에 가져간 혹을 다시 꺼냈다. 그것을 욕심쟁이 영감의 다른 쪽 턱에 떡 하니 붙여 버렸다. 욕심쟁이 영감은 혹 두 개를 양쪽 턱에 매달고 울며 산을 내려갔다.\n\n그래서 옛 어른들은 손주에게 이렇게 일러 주었더라 ─ \"재주는 진심에서 나오는 것이지, 욕심에서 나오는 것이 아니란다.\"",
        en: "The old man looked at the chief a long while, then gently tapped the lump on his jaw.\n\n\"To tell the truth… it all comes from this lump. All my songs have been gathered here for a lifetime.\"\n\nThe dokkaebi gathered close around him. \"Sell us that lump! We will give you treasure beyond counting!\"\n\nThe chief raised a single finger and brushed the old man's lump — and the lump came away as easily as a soap bubble. The old man's jaw was clean. In its place the dokkaebi heaped great bundles before him — gold ingots, silver work, silk and grain.\n\n\"Thank you, kind sir! Farewell!\"\n\nThe first rooster crowed, and the dokkaebi vanished from the hut. The old man shouldered the bundles and made his way down the dark path, reaching the village at dawn.\n\nThe villagers marveled at his clean jaw and the wealth he carried. He told them all that he had seen, honestly. The village held a feast in his honor.\n\nNow — this story reached a greedy old man living in the next village over. He also had a great lump on his jaw, but he could not sing and his heart was not kind.\n\n\"Ha! If that fool managed it, why not I? I shall have treasure and a clean jaw both.\"\n\nOn the next full-moon night the greedy man went deliberately to the same hut and hid behind the straw. The dokkaebi came, set up their feast. The man began to sing in a loud voice — but his pitch was off and his rhythm tumbled. The dokkaebi frowned.\n\n\"What is this noise?\" \"This is not the same old man!\"\n\nThe chief glared. \"We were tricked once. We will not be tricked again.\"\n\nThe dokkaebi brought out the lump they had taken last time and stuck it firmly to the greedy man's other jaw. He stumbled home with TWO lumps, weeping all the way down the mountain.\n\nSo the old ones tell their grandchildren: \"Skill comes from sincerity, not greed.\"",
      },
      image: "/coloring/04-dokkaebi/scene-4-lump.png",
      endingLabel: { ko: "🥁 노래와 정직의 보답 — 정통 결말", en: "🥁 The Reward of Song and Honesty — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "혹부리 영감",
    romanized: "Hokbulli Yeonggam",
    englishTitle: "The Old Man with the Lump",
    origin: {
      ko: "도깨비가 등장하는 한국 옛이야기 중 가장 사랑받는 이야기예요. 도깨비가 진짜 무서운 귀신이 아니라, 친근하고 장난기 많은 존재로 그려져요.",
      en: "One of Korea's most-loved goblin tales. Dokkaebi here aren't scary monsters — they're mischievous, friendly spirits who love a good song.",
    },
    summary: {
      ko: "착한 영감의 얼굴에는 큰 혹이 하나 있었어요. 어느 날 산에서 길을 잃은 영감이 도깨비들의 잔치를 보게 됐어요. 노래를 잘 부르는 영감에게 도깨비들은 '혹이 노래 주머니'라고 믿고 보물과 바꿔 혹을 가져갔어요. 그 소식을 들은 욕심 많은 다른 영감이 따라했지만, 도깨비들은 화가 나 그에게 혹을 하나 더 붙여주었답니다.",
      en: "An old man with a big lump on his cheek gets lost in the mountains and stumbles on a goblin feast. When he sings beautifully, the dokkaebi believe his lump is the source — and take it in exchange for treasure. A greedy neighbor tries the same trick, but the goblins are wise to him and stick an extra lump on his face instead.",
    },
    glossary: [
      {
        korean: "도깨비",
        romanized: "dokkaebi",
        pronunciation: "doh-KEH-bee",
        meaning: { ko: "한국 옛이야기 속 도깨비. 뿔이 있고 방망이를 든 친근한 요괴.", en: "A Korean goblin — horned, club-wielding, mischievous, and surprisingly friendly." },
      },
      {
        korean: "혹",
        romanized: "hok",
        pronunciation: "HOK",
        meaning: { ko: "얼굴이나 목에 솟아나는 둥근 혹.", en: "A round lump on the face or neck — a cyst." },
      },
      {
        korean: "방망이",
        romanized: "bangmangi",
        pronunciation: "BAHNG-mahng-ee",
        meaning: { ko: "도깨비가 든 마법 방망이. 두드리면 원하는 게 나와요.", en: "A magical club a dokkaebi carries — strike it and your wish appears." },
      },
      {
        korean: "영감",
        romanized: "yeonggam",
        pronunciation: "YOHNG-gahm",
        meaning: { ko: "할아버지를 부르는 친근한 옛말.", en: "An old, affectionate word for an elderly man — like \"grandpa.\"" },
      },
      {
        korean: "잔치",
        romanized: "janchi",
        pronunciation: "JAHN-chee",
        meaning: { ko: "여럿이 모여 음식과 음악을 즐기는 큰 모임.", en: "A festive gathering with food and music — a feast." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 2장에서 영감이 도깨비들 앞에서 어떤 노래를 부를지 — 흥겨운 마을 노래 / 어머니의 자장가 — 직접 선택해요. 어느 노래를 부르든 도깨비들은 \"이 노래가 어디서 나오는가\"를 묻고, 영감이 \"내 혹에서 나옵니다\" 농담을 해 혹을 떼고 보물을 얻는 정통 결말로 모입니다. 욕심쟁이 영감이 따라 했다가 혹 하나를 더 붙이는 원작의 교훈도 함께 담겼어요.",
      en: "We follow the original story closely, but on Chapter 2 you choose which song the old man sings to the goblins — a lively village song or his mother's lullaby. Whichever path you take, the dokkaebi ask where the song comes from, the old man jokes that it comes from his lump, and the canonical ending follows: lump removed, treasure given. The greedy neighbor who tries to copy him — and ends up with TWO lumps — is included as the original's lesson.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 5 — 👟 콩쥐와 두꺼비 · Kongjwi and the Toad
// ──────────────────────────────────────────────────────────────

const kongjwi: Story = {
  id: "kongjwi",
  emoji: "👟",
  title: { ko: "콩쥐와 두꺼비", en: "Kongjwi and the Toad" },
  subtitle: { ko: "깨진 항아리의 비밀", en: "The secret of the cracked jar" },
  tagline: {
    ko: "잔치 가는 길에 만난 두꺼비와 검은 소, 그리고 참새들. 마음의 선택이 결말을 만든다.",
    en: "A toad, a black ox, and a flock of sparrows on the road to the feast. A gentle heart shapes the ending.",
  },
  accent: "from-rose-100 to-yellow-100",
  startSceneId: "scene-1-jar",
  scenes: {
    "scene-1-jar": {
      id: "scene-1-jar",
      title: { ko: "1장. 깨진 항아리와 작은 두꺼비", en: "Chapter 1 — The Cracked Jar and the Little Toad" },
      narration: {
        ko: "옛날, 어느 마을에 콩쥐라는 착한 처녀가 살고 있었더라. 어머니가 일찍 돌아가시고 아버지가 새로 장가를 든 뒤로, 콩쥐는 늘 외로웠다. 새어머니는 자기 친딸 팥쥐만 귀하게 여기고, 콩쥐에게는 새벽부터 밤늦게까지 일만 시켰다.\n\n어느 날, 마을에서 큰 잔치가 열린다는 소식이 전해졌다. 사또께서 마을을 둘러보러 오신다는 것이었다. 새어머니는 팥쥐의 손을 잡고 곱게 단장을 시켰지만, 콩쥐 앞에는 무거운 항아리 하나를 내려놓았다.\n\n\"이 항아리에 물을 가득 채워라. 다 채워 놓지 않으면 잔치에 못 갈 줄 알아라.\"\n\n콩쥐가 두레박으로 물을 길어 항아리에 부었다. 그런데 어찌 된 일인지 항아리는 좀처럼 차오르지 않았다. 자세히 보니 항아리 바닥에 큰 금이 가서 물이 줄줄 새고 있었다.\n\n콩쥐는 그 자리에 주저앉아 가만히 울었다.\n\n그때 마당 한구석에서 부스럭 소리가 났다. 천천히 두꺼비 한 마리가 콩쥐 앞으로 기어 나왔다. 작은 검은 눈동자가 콩쥐를 가만히 올려다보았다.\n\n\"콩쥐 누나, 울지 마세요. 제가 깨진 곳을 막아 드릴게요.\"\n\n두꺼비는 항아리 안으로 들어가더니, 자기 몸으로 깨진 자리를 막아 주었다. 콩쥐가 다시 물을 길어 붓자, 이번에는 항아리가 천천히 차오르기 시작했다.",
        en: "Long ago in a certain village there lived a kind-hearted young woman named Kongjwi. Her mother had died when she was small, and her father had remarried. Ever since, Kongjwi had been lonely. Her stepmother cherished only her own daughter Patjwi and gave Kongjwi nothing but work from dawn until late at night.\n\nOne day word came that the village would hold a great feast — the magistrate himself was coming. The stepmother dressed Patjwi up in fine hanbok with her own hands. In front of Kongjwi she set down a heavy clay jar.\n\n\"Fill this jar to the very brim. If it isn't full, you will not be going to the feast.\"\n\nKongjwi drew water from the well with a dipper and poured it into the jar. But somehow the jar would not fill. Looking closely, she saw a wide crack along its base — the water was slipping away as fast as she could pour.\n\nShe sank to the ground and wept quietly.\n\nJust then there was a rustle in the corner of the yard. Slowly, a small toad crept out and stopped before her. Its little black eyes looked up at her steadily.\n\n\"Sister Kongjwi, please don't cry. I'll fill the broken place for you.\"\n\nThe toad climbed inside the jar and pressed its body against the crack. When Kongjwi poured the next bucket of water, the jar began at last, slowly, to fill.",
      },
      image: "/coloring/05-kongjwi/scene-1-jar.png",
      nextId: "scene-2-tasks",
    },
    "scene-2-tasks": {
      id: "scene-2-tasks",
      title: { ko: "2장. 잔치는 다가오고, 두 가지 일거리", en: "Chapter 2 — The Feast Approaches, and Two Tasks" },
      narration: {
        ko: "콩쥐가 항아리에 물을 다 채우고 환한 얼굴로 새어머니께 보여드렸다. 그러나 새어머니의 표정은 더 차가워졌다.\n\n\"잔치는 멀었다. 너에게는 아직 할 일이 둘이나 더 있다. 이 일을 다 끝내 놓아야 잔치에 갈 생각이라도 해 보거라.\"\n\n새어머니가 마당에 두 가지를 내려놓았다.\n\n하나는 커다란 베틀과 짜야 할 비단실 한 광주리. 잔치 전까지 비단 한 필을 짜내야 한다는 것이었다. 어린 콩쥐가 혼자서는 도저히 끝낼 수 없는 일이었다.\n\n다른 하나는 잡곡 한 가마니. 그 안에 좋은 곡식과 모래·검불이 마구 섞여 있었다. 그것을 깨끗이 골라 두라는 것이었다. 손가락 끝이 다 까지도록 골라도 며칠은 걸릴 분량이었다.\n\n새어머니는 팥쥐를 데리고 잔치 구경을 가 버렸다. 콩쥐는 마당에 혼자 남았다. 어느 일거리부터 시작해야 할까?",
        en: "When the jar was full, Kongjwi went brightly to her stepmother. But the woman's face only grew colder.\n\n\"The feast is hours away. There are still two tasks for you. Finish both before you so much as think about going.\"\n\nShe set down two things in the yard.\n\nThe first was a great wooden loom and a basket heaped with silk thread. A whole bolt of silk must be woven before the feast — work no young woman could finish alone in an afternoon.\n\nThe second was a sack of grain. Inside, good rice was mixed in with sand, with pebbles, with chaff. She must pick it all clean. Even with fingers raw from sorting, it would take days.\n\nThe stepmother took Patjwi and left for the feast. Kongjwi stood alone in the yard. Which task should she begin?",
      },
      image: "/coloring/05-kongjwi/scene-2-tasks.png",
      choices: [
        { label: { ko: "🧵 먼저 베틀 앞에 앉아 비단을 짜기 시작한다", en: "🧵 Sit at the loom first and begin weaving the silk" }, nextId: "scene-3a-sparrows" },
        { label: { ko: "🌾 먼저 잡곡 광주리부터 골라낸다", en: "🌾 Begin sorting the grain first" }, nextId: "scene-3b-ox" },
      ],
    },
    "scene-3a-sparrows": {
      id: "scene-3a-sparrows",
      title: { ko: "3장. 참새 떼와 베틀 앞에서", en: "Chapter 3 — At the Loom with a Flock of Sparrows" },
      narration: {
        ko: "콩쥐는 베틀 앞에 앉아 가만히 손을 모았다. 비단 한 필이라니 ─ 혼자서는 도저히 끝낼 수 없는 일이지만, 그래도 한 올 한 올 정성껏 짜기 시작했다.\n\n그때 어디선가 푸드덕푸드덕 날갯짓 소리가 들렸다. 마당 위 감나무 가지에 앉아 있던 참새들이 한 마리, 두 마리, 다섯 마리, 열 마리, 한 떼가 베틀 곁으로 내려왔다.\n\n가장 큰 참새가 콩쥐의 손등에 가볍게 앉아 짹짹거렸다.\n\n\"콩쥐 누나, 우리가 도와 드릴게요. 누나는 가만히 계세요.\"\n\n참새들이 베틀 위로 휘 날아오르더니, 작은 부리로 실을 잡고 살짝살짝 잡아당기기 시작했다. 한 마리는 위에서, 두 마리는 아래에서, 다른 참새들은 옆에서 ─ 모두가 한 호흡으로 움직였다.\n\n콩쥐가 한참을 바라보고 있는 사이, 베틀 위에서는 어느새 고운 비단 한 필이 차곡차곡 짜여 가고 있었다. 햇살에 닿은 비단은 분홍빛과 연두빛이 번갈아 비치는 듯했다.\n\n비단 짜기가 다 끝났을 무렵, 가장 큰 참새가 콩쥐 앞에 다시 내려와 짹짹거렸다.\n\n\"이걸 입고 잔치에 가세요. 사또께서 콩쥐 누나를 기다리고 계실 거예요.\"",
        en: "Kongjwi sat down at the loom and folded her hands a moment. A whole bolt of silk — no one could finish it alone. Still, she began, thread by careful thread.\n\nThen came a soft whirring of wings. From the persimmon tree above the yard, sparrows came down one, two, five, ten — a whole flock — and settled around the loom.\n\nThe largest sparrow lit gently on the back of her hand and chirped.\n\n\"Sister Kongjwi, we will help. Please just rest.\"\n\nThe sparrows flew up onto the loom. With their tiny beaks they took hold of the threads and tugged in perfect rhythm. One worked from above, two from below, others at the sides — all moving as a single breath.\n\nWhile Kongjwi only watched, the loom began to fill, line after line, with a beautiful pale silk. Where the afternoon sun touched it, the cloth shimmered between rose-pink and soft green.\n\nWhen the bolt was finished, the largest sparrow returned to her and chirped again.\n\n\"Wear this and go to the feast. The magistrate is waiting for you.\"",
      },
      image: "/coloring/05-kongjwi/scene-3a-sparrows.png",
      nextId: "scene-4-banquet",
    },
    "scene-3b-ox": {
      id: "scene-3b-ox",
      title: { ko: "3장. 검은 소의 선물", en: "Chapter 3 — The Black Ox's Gift" },
      narration: {
        ko: "콩쥐는 잡곡 광주리를 끌어다 놓고, 한 알 한 알 곡식을 골라내기 시작했다. 햇살에 까져 가는 손가락 끝이 따끔따끔했지만, 콩쥐는 묵묵히 일했다.\n\n그때 마을 어귀에서 묵직한 발소리가 들려왔다. 검은 털이 윤기 나는 큰 소 한 마리가 사립문을 지나 마당으로 들어왔다. 등에는 무엇인가 가지런히 묶인 보따리가 얹혀 있었다.\n\n검은 소는 콩쥐 앞에 천천히 무릎을 꿇었다. 큰 검은 눈동자가 콩쥐를 가만히 바라보았다.\n\n\"콩쥐 누나, 누나는 그 일을 다 끝내지 않아도 됩니다. 하늘이 다 보고 계셨어요. 이것을 입고 잔치에 가세요.\"\n\n검은 소가 등에 진 보따리를 마당에 부려 놓았다. 보따리 안에서는 — 곱게 자수가 놓인 분홍빛 한복 한 벌과, 푸른 비단 댕기 한 줄과, 작은 꽃신 한 켤레가 천천히 나왔다. 꽃신에는 금실로 작은 꽃이 수놓여 있었다.\n\n콩쥐가 한복을 입고, 댕기를 머리에 묶고, 꽃신을 신자 그녀의 모습이 봄날의 진달래꽃처럼 환해졌다.\n\n검은 소가 다시 무릎을 꿇고 등을 내밀었다.\n\n\"타세요. 잔치에 데려다 드릴게요.\"",
        en: "Kongjwi pulled the grain sack closer and began picking out the rice grain by grain. The sun beat down, her fingertips grew raw, but she worked on quietly.\n\nThen a slow, heavy hoofbeat came from the village gate. A great black ox with a glossy coat passed through the open gate into the yard. On its back rested a carefully tied bundle.\n\nThe black ox knelt before Kongjwi. Its large dark eyes looked at her steadily.\n\n\"Sister Kongjwi, you do not have to finish this task. Heaven has been watching. Wear this and go to the feast.\"\n\nThe ox set down its bundle in the yard. From inside came — a beautifully embroidered pale-pink hanbok, a blue silk ribbon for the hair, and a small pair of flowered shoes (꽃신). On the shoes, tiny flowers were stitched in gold thread.\n\nWhen Kongjwi put on the hanbok, tied the ribbon, and slipped on the flowered shoes, she shone like spring azaleas in bloom.\n\nThe black ox knelt again and offered its back.\n\n\"Climb up. I will take you to the feast.\"",
      },
      image: "/coloring/05-kongjwi/scene-3b-ox.png",
      nextId: "scene-4-banquet",
    },
    "scene-4-banquet": {
      id: "scene-4-banquet",
      title: { ko: "마지막 장. 잔치, 꽃신, 그리고 사또의 가마", en: "Final — The Feast, the Flowered Shoe, and the Magistrate's Sedan" },
      narration: {
        ko: "콩쥐는 잔치 마당에 들어섰다. 비단을 두르고 댕기를 묶고 꽃신을 신은 그녀를 마을 사람들이 모두 한 번씩 돌아보았다. 새어머니와 팥쥐는 멀리서 콩쥐를 보고도 알아보지 못했다.\n\n잔치 한가운데에는 사또께서 앉아 계셨다. 마을 어른들이 한 사람씩 인사를 올리고, 사또는 고개를 끄덕이며 흐뭇하게 잔치를 바라보고 계셨다. 콩쥐도 멀찍이 서서 잔치를 구경했다.\n\n그런데 ─ 누군가 콩쥐에게 다가오는 발소리가 들렸다. 새어머니가 콩쥐를 알아본 것이다! 새어머니는 무서운 얼굴로 다가왔다.\n\n콩쥐는 놀라 잔치 마당을 빠져나가려 했다. 그러다 그만 한쪽 꽃신이 작은 도랑에 빠지고 말았다. 신발을 주울 새도 없이, 콩쥐는 맨발 한 짝으로 산길을 달려 집으로 돌아왔다.\n\n잔치가 끝난 뒤, 사또의 행렬이 마을을 떠나려고 할 때, 누군가가 도랑에서 무엇인가를 건져 올렸다. 작은 분홍빛 꽃신 한 짝이었다. 금실로 수놓인 작은 꽃이 햇살에 반짝였다.\n\n사또가 그 신을 받아 들고 한참을 들여다보더니, 천천히 말했다.\n\n\"이 꽃신의 주인을 찾아내라. 이런 정성스러운 신을 신은 사람이라면, 마음이 곱고 손길이 부지런한 처녀임에 틀림없다. 내가 그 사람을 한 번 만나 보고 싶구나.\"\n\n사또의 사람들이 마을 집집을 다니며 꽃신을 신어 보게 했다. 새어머니는 팥쥐에게 억지로 신을 신겨 보았지만 발이 너무 커서 들어가지도 않았다. 한참 만에 사또의 사람들이 콩쥐의 집 마당까지 왔다.\n\n콩쥐가 천천히 발을 내밀어 신을 신어 보자, 꽃신이 그녀의 발에 꼭 맞았다. 나머지 한 짝 꽃신을 콩쥐가 옷자락 안에서 꺼내 보였다. 두 짝이 비로소 한 켤레가 되었다.\n\n사또는 콩쥐를 가마에 태워 그녀의 손을 잡았다. \"어떤 어려움 속에서도 마음의 정직을 잃지 않은 그대를 내가 잘 모시리라.\"\n\n그날 이후로 콩쥐는 사또의 곁에서 따뜻한 보살핌 속에 살게 되었다. 새어머니와 팥쥐는 부끄러움에 마을을 떠났다. 그러나 콩쥐는 사또께 부탁하여 그들도 굶지 않도록 마을 한쪽에 작은 집을 마련해 주었더라.\n\n\"용서는 가장 큰 선물이란다.\" 옛 어른들은 손주에게 이렇게 일러 주었더라.",
        en: "Kongjwi stepped into the feast yard. With her silk gown, her ribboned braid, her flowered shoes, every villager turned to look at her once. Even her own stepmother and Patjwi did not recognize her from afar.\n\nAt the heart of the feast sat the magistrate. One by one the village elders bowed before him; he nodded gently and watched the celebration with a quiet smile. Kongjwi stood at a respectful distance and watched too.\n\nThen — she heard footsteps behind her. The stepmother had recognized her! The woman's face was thunder as she came closer.\n\nStartled, Kongjwi turned to slip away. As she ran, one of her flowered shoes fell into a small roadside ditch. There was no time to fetch it. With one bare foot she fled all the way home along the mountain path.\n\nAfter the feast, as the magistrate's procession was leaving, someone fished a small thing out of the ditch — a single rose-pink flowered shoe, embroidered with gold-thread petals that shone in the sun.\n\nThe magistrate held the shoe a long while. Then he spoke slowly.\n\n\"Find the owner of this shoe. Whoever stitched and wore something so careful must have a kind heart and a busy, honest hand. I would like to meet that person.\"\n\nHis men carried the shoe from house to house through the village. The stepmother forced Patjwi to try it — but Patjwi's foot was far too large; the shoe would not even slip on. At last the magistrate's men reached Kongjwi's yard.\n\nWhen Kongjwi slowly held out her foot, the shoe fit her exactly. From a fold in her skirt she drew out the other shoe, the missing twin. At last the pair was a pair again.\n\nThe magistrate took her hand and helped her into his sedan. \"You who kept the honesty of your heart through every hard hour — I shall care for you well.\"\n\nFrom that day on, Kongjwi lived under his warm protection. The stepmother and Patjwi left the village in shame. But Kongjwi asked the magistrate to give them a small house at the edge of the village, so they would not go hungry.\n\n\"Forgiveness is the largest gift of all,\" the old ones tell their grandchildren still.",
      },
      image: "/coloring/05-kongjwi/scene-4-banquet.png",
      endingLabel: { ko: "🌸 꽃신의 짝 — 정통 결말", en: "🌸 The Twin of the Flowered Shoe — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "콩쥐 팥쥐",
    romanized: "Kongjwi Patjwi",
    englishTitle: "Kongjwi and Patjwi (Korean Cinderella)",
    origin: {
      ko: "한국의 신데렐라라고 불리는 유명한 옛이야기예요. 17세기쯤 글로 적혔지만 그 전부터 전해지던 이야기랍니다. '콩쥐'는 콩 자루를 이는 부지런한 아이라는 뜻이에요.",
      en: "Often called the Korean Cinderella. Written down around the 1600s, but the oral tale is older. The name \"Kongjwi\" hints at a hardworking child who carries sacks of beans (kong).",
    },
    summary: {
      ko: "착한 콩쥐는 새어머니와 의붓동생 팥쥐에게 괴롭힘을 당하지만, 두꺼비와 참새들과 검은 소가 도와줘요. 깨진 항아리에 물을 채우는 일도, 잔치 갈 때도, 모두 마음 따뜻한 도움을 받아 사또를 만나 결국 행복해진답니다. 친절한 마음과 짐승 친구들 이야기예요.",
      en: "Kindhearted Kongjwi is bullied by her stepmother and stepsister Patjwi, but a toad, sparrows, and a black ox come to her aid — filling a cracked jar, helping at chores, and getting her to the festival. She meets the magistrate and finds happiness. A tale of kindness rewarded with loyal animal friends.",
    },
    glossary: [
      {
        korean: "콩쥐",
        romanized: "Kongjwi",
        pronunciation: "KOHNG-jwee",
        meaning: { ko: "주인공 이름. '콩 자루를 이는 부지런한 아이'라는 뜻이 담겨있어요.", en: "The heroine's name — hinting at \"a hardworking child who carries sacks of beans (kong).\"" },
      },
      {
        korean: "두꺼비",
        romanized: "dukkeobi",
        pronunciation: "DOO-kuh-bee",
        meaning: { ko: "한국 들판에 사는 큰 두꺼비. 옛이야기에서 도와주는 친구로 자주 나와요.", en: "The large Korean toad — often a helpful friend in folktales." },
      },
      {
        korean: "참새",
        romanized: "chamse",
        pronunciation: "CHAHM-seh",
        meaning: { ko: "한국 들판에 흔한 작은 새. 떼로 모여 다녀요.", en: "A small Korean sparrow — they flock in groups." },
      },
      {
        korean: "꽃신",
        romanized: "kkotshin",
        pronunciation: "KKOT-shin",
        meaning: { ko: "꽃 모양 장식이 있는 한복 신발.", en: "A traditional Korean shoe decorated with flower patterns." },
      },
      {
        korean: "사또",
        romanized: "sato",
        pronunciation: "SAH-toh",
        meaning: { ko: "옛날 한국의 시골 고을을 다스리던 관리. 신데렐라의 왕자님 같은 역할.", en: "A local magistrate in old Korea — plays the prince-like role in Korean Cinderella." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 2장에서 콩쥐가 두 가지 일거리(베틀의 비단 짜기 / 잡곡 광주리 골라내기) 중 어느 것부터 시작할지 직접 선택해요. 어느 길을 택해도 짐승 친구(참새 떼 또는 검은 소)가 도와주어 잔치에 갈 수 있게 되고, 꽃신을 떨어뜨려 사또가 그녀를 찾는 같은 정통 결말로 모입니다. 끝에서는 새어머니와 팥쥐도 용서받아 마을 한쪽에 살게 되지요.",
      en: "We follow the original story closely, but on Chapter 2 you choose which of the two impossible tasks Kongjwi tries first — weaving silk at the loom, or sorting the mixed grain. Either way, animal helpers (sparrows or the black ox) step in so she can reach the feast, and the story converges on the same canonical ending: the dropped flowered shoe, the magistrate's search, the pair reunited. In the end the stepmother and Patjwi are forgiven and given a small home at the edge of the village.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 6 — 🐢 별주부전 · The Hare's Liver (NEW)
// ──────────────────────────────────────────────────────────────

const byeoljubu: Story = {
  id: "byeoljubu",
  emoji: "🐢",
  title: { ko: "별주부전", en: "The Hare and the Dragon King" },
  subtitle: { ko: "토끼의 간을 찾아서", en: "In search of the hare's liver" },
  tagline: {
    ko: "병든 용왕을 위해 토끼를 데리러 온 자라. 기지와 의리 사이에서 토끼는 어떤 길을 갈까.",
    en: "A turtle climbs ashore to fetch a hare for the dying Dragon King. Will the hare outwit him, or befriend him?",
  },
  accent: "from-teal-100 to-blue-100",
  startSceneId: "scene-1-palace",
  scenes: {
    "scene-1-palace": {
      id: "scene-1-palace",
      title: { ko: "1장. 용궁의 큰 시름", en: "Chapter 1 — A Great Worry at the Dragon Palace" },
      narration: {
        ko: "옛날 바다 깊은 곳에 화려한 용궁이 있었더라. 용궁의 주인 용왕은 오대양의 바다 짐승을 다스리고, 비를 내리며, 풍어와 풍랑을 다 정하시는 분이었다. 그런데 어느 해부터 용왕께서 깊은 병에 드시고 말았다. 산호로 만든 침상에 누워 며칠을 식음을 전폐하셨다.\n\n용궁 안의 모든 의원이 다 모여 용왕의 맥을 짚어 보았지만, 어떤 약도 듣지 않았다. 마지막으로 가장 늙은 잉어 의원이 용왕의 눈을 살피더니 깊게 한숨을 쉬었다.\n\n\"한 가지 약밖에 없습니다. 산속 토끼의 간… 그 따뜻한 토끼의 간을 잡수셔야 용왕님의 병이 나으실 것입니다.\"\n\n용궁이 술렁였다. 토끼는 바다가 아니라 산에 사는 짐승이었다. 누가 감히 산에 올라가 토끼를 잡아 올 수 있단 말인가.\n\n그때 한 작은 자라 한 마리가 천천히 앞으로 나왔다. 이름은 별주부였다. 등껍질이 단단하고, 다리가 짧지만, 마음만은 깊은 바다보다 더 굳었다.\n\n\"용왕마마, 제가 가겠습니다. 제가 산에 올라가 토끼를 모셔 오겠습니다.\"\n\n용궁의 모든 짐승이 별주부를 한 번씩 돌아보았다. 자라는 헤엄도 잘 치지만, 산길을 오르기에는 너무 느리고 약하지 않은가? 그러나 별주부의 검은 눈은 흔들리지 않았다.",
        en: "Long ago, deep beneath the sea, there stood a splendid Dragon Palace. Its master, the Dragon King, ruled the beasts of the five oceans, sent the rains, and ordered the bounty and storm of the sea. But one year the king fell into a deep illness. He lay on his coral bed and would take neither food nor water for many days.\n\nEvery healer of the palace gathered to feel his pulse, but no medicine worked. At last the oldest carp physician looked into the king's eyes and let out a long sigh.\n\n\"There is one medicine only. The liver of a hare from the mountains — the warm liver of a hare — will heal the king.\"\n\nThe palace stirred uneasily. The hare lives on the mountain, not in the sea. Who could climb up and bring one back?\n\nThen a small turtle stepped slowly forward. His name was Byeoljubu. His shell was hard, his legs were short, but his heart was firmer than the deep sea.\n\n\"My king, I will go. I will climb the mountain and bring a hare back to you.\"\n\nEvery creature in the palace turned to look at him. He swam well enough, yes — but he was small and slow for mountain climbing. Still, the turtle's dark eyes did not waver.",
      },
      image: "/coloring/06-byeoljubu/scene-1-palace.png",
      nextId: "scene-2-meeting",
    },
    "scene-2-meeting": {
      id: "scene-2-meeting",
      title: { ko: "2장. 산속 토끼와 자라의 만남", en: "Chapter 2 — Turtle Meets Hare on the Mountain" },
      narration: {
        ko: "별주부는 며칠 동안 바다를 헤엄쳐 오르고, 또 며칠을 산기슭을 기어 올랐다. 등껍질이 흙으로 묻고, 다리가 마디마디 아파 왔지만, 그는 한 번도 멈추지 않았다.\n\n마침내 별주부가 산속의 어느 양지바른 곳에 다다랐다. 거기에 한 토끼가 풀잎을 뜯고 있었다. 긴 두 귀가 양쪽으로 쫑긋 서 있고, 까만 코끝이 부지런히 씰룩이고 있었다. 별주부는 큰 숨을 한 번 들이쉬고 토끼 앞으로 나아갔다.\n\n\"토끼 형님, 안녕하십니까. 멀고 먼 바닷속에서 형님을 뵈러 왔습니다.\"\n\n토끼가 풀잎을 입에 문 채 별주부를 한참 바라보았다.\n\n\"바닷속에서? 자네가 나를 왜 찾는단 말인가?\"\n\n\"용궁에서 잔치가 열리는데, 산속의 가장 슬기로운 분으로 형님을 모시고 싶다 하셨습니다. 바닷속의 모든 진귀한 보물과 맛있는 음식이 다 차려져 있고, 무엇보다 — 거기 가시면 영원히 늙지 않으신다고 합니다.\"\n\n토끼는 솔깃했다. 산속의 거친 살림에 늘 굶주리던 그는 용궁의 잔치라는 말에 마음이 흔들렸다. 그러나 한편으로는 의심도 들었다. 자기는 바다 짐승이 아닌데 어찌 바다에 들어가 살 수 있단 말인가?\n\n토끼는 잠시 망설였다. 자라의 말을 그대로 믿고 함께 용궁으로 갈까, 아니면 한번 더 살펴보고 결정할까?",
        en: "For days the turtle swam upstream and for days he crawled the foothills. His shell was caked with earth, every joint in his short legs ached, but he never stopped.\n\nAt last he reached a sunlit clearing on the mountainside. There, a hare was nibbling on a leaf. His two long ears stood up sharply, his small black nose twitched busily. The turtle took one deep breath and walked forward.\n\n\"Brother Hare, good day to you. I have come from the depths of the sea to call upon you.\"\n\nThe hare held the leaf in his teeth and stared at him a moment.\n\n\"From the sea? Why would you seek me out?\"\n\n\"The Dragon Palace is holding a great feast. They wish to invite the wisest one of the mountain. Every rare treasure of the sea and every delicacy is laid out, and most of all — those who visit, it is said, never grow old.\"\n\nThe hare's ears perked. Hungry as he often was in the rough mountain life, the words \"feast\" and \"never grow old\" tugged at him. But somewhere underneath, a doubt rose. He was not a sea creature — how could he live underwater?\n\nThe hare hesitated. Should he believe the turtle and go straight to the palace, or look around once more before deciding?",
      },
      image: "/coloring/06-byeoljubu/scene-2-meeting.png",
      choices: [
        { label: { ko: "🌊 자라의 말을 믿고 용궁으로 따라간다", en: "🌊 Trust the turtle and follow him to the palace" }, nextId: "scene-3a-undersea" },
        { label: { ko: "🐸 산속을 한번 둘러본 후에 결정한다", en: "🐸 Look around the mountain first before deciding" }, nextId: "scene-3b-whisper" },
      ],
    },
    "scene-3a-undersea": {
      id: "scene-3a-undersea",
      title: { ko: "3장. 용궁에서 알게 된 비밀", en: "Chapter 3 — The Secret He Learned in the Palace" },
      narration: {
        ko: "\"잘 생각하셨습니다, 토끼 형님. 등에 올라타십시오.\"\n\n토끼는 별주부의 등껍질에 올라탔다. 자라는 두 발을 강하게 내딛으며 산을 내려와 바닷가에 닿았고, 곧장 바닷속으로 미끄러져 들어갔다. 토끼는 처음에는 숨이 막힐 줄 알았지만, 신기하게도 바닷속에서도 숨을 쉴 수 있었다. 자라가 가는 길에 누군가 보이지 않는 보호의 손길을 펴 둔 것 같았다.\n\n한참 만에 용궁이 보였다. 산호와 진주로 지은 화려한 궁. 토끼는 입이 떡 벌어졌다. 그러나 — 용궁 안으로 들어가자마자 분위기가 이상했다. 잔치 음식은 보이지 않고, 의원들이 분주히 오가고 있었다. 침상에 누운 용왕의 모습은 병들어 있었다.\n\n토끼가 어리둥절해 있는데, 한구석에서 잉어 의원 두 사람이 속닥거리는 소리가 들렸다.\n\n\"토끼의 간만 따 내면 용왕마마께서 곧 회복되실 것이오.\" \"그 자라가 정말 큰 공을 세우는구먼.\"\n\n토끼는 그제야 모든 것을 알아챘다. 잔치고 보물이고 다 거짓말이었다. 자기는 약으로 잡혀 왔던 것이다. 토끼의 까만 눈동자가 가늘게 떨렸다. 그러나 토끼는 산에서 평생을 살아오며 위기 앞에서도 머리를 굴리는 데 익숙한 짐승이었다. 잠시 후, 토끼의 얼굴에 작은 미소가 떠올랐다.\n\n토끼는 천천히 용왕 앞으로 나아가 큰절을 올렸다.\n\n\"용왕마마, 그동안 마음 고생이 크셨겠습니다. 제 간이 마마의 약이 된다 하니 큰 영광이지요. 그런데 한 가지 — 제 간은 워낙 귀한 것이라, 평소에는 깨끗한 옹달샘 옆 큰 바위 아래에 모셔 두었답니다. 오늘 따라 가지러 가지 않아서, 지금 저는 빈손이올시다.\"",
        en: "\"You have chosen wisely, Brother Hare. Climb onto my back.\"\n\nThe hare climbed onto the turtle's shell. The turtle pushed off down the mountain with strong, steady steps, reached the shore, and slipped straight into the sea. The hare thought at first he would choke, but somehow he could breathe under the water — as though an unseen protective hand had been laid over him as long as he traveled with the turtle.\n\nAt last the palace came into view — a splendid hall built of coral and pearl. The hare's mouth fell open in wonder. But — as soon as they were inside, something felt wrong. No feast was laid; physicians hurried about; the king lay ill on a coral bed.\n\nWhile the hare stood confused, he overheard two carp doctors whispering in a corner.\n\n\"Only the hare's liver will save His Majesty.\" \"What a great deed the turtle has done.\"\n\nAll at once the hare understood. There was no feast, no treasure — he had been brought as medicine. His dark eyes trembled. But the hare had spent his whole life turning quick somersaults of thought before danger. After a moment, a small smile touched his face.\n\nSlowly, he bowed deeply before the throne.\n\n\"Great King, what a hard sorrow you have borne. That my liver might be your medicine is the greatest honor. There is, however, one small matter. My liver is so precious that I usually leave it under a large rock by a clean spring on the mountain. I did not bring it with me today — I am empty-handed here, alas.\"",
      },
      image: "/coloring/06-byeoljubu/scene-3a-undersea.png",
      nextId: "scene-4-return",
    },
    "scene-3b-whisper": {
      id: "scene-3b-whisper",
      title: { ko: "3장. 까치의 귀띔", en: "Chapter 3 — A Whisper from a Magpie" },
      narration: {
        ko: "\"잠시만 기다리시오, 자라 어른. 잔치라니 좋은 일이긴 한데, 한번 풀밭이나 둘러보고 가겠소이다.\"\n\n토끼는 자라의 곁을 떠나 잠시 풀밭 한구석으로 가서 풀잎을 뜯는 척 했다. 그때 머리 위 소나무 가지에서 까치 한 마리가 깍깍 소리를 내며 내려왔다. 산속의 길조 까치는 가만히 토끼의 어깨 가까이 내려앉았다.\n\n\"토끼 형님, 가만히 들으시오.\" 까치가 작은 부리로 속삭이듯 알려 주었다. \"저 자라가 산에 올라온 데는 다른 까닭이 있소이다. 용왕이 병이 들어 형님의 간이 약이라 한답니다. 자라는 충직한 신하라, 형님을 잔치라 속여 모시고 가려는 것이지요.\"\n\n토끼의 까만 눈동자가 가늘어졌다. 까치는 가지 위로 다시 폴짝 날아올라 깍깍 한 번 짧게 울고 사라졌다.\n\n토끼는 한참을 생각했다. 그대로 도망쳐 버릴까? 그러나 자라는 형님 형님 하며 자기를 진심으로 모시러 온 사람이었다. 자기가 그냥 도망가면 자라는 빈 등껍질로 용궁에 돌아가 큰 벌을 받을 것이다.\n\n토끼는 자라에게 다시 돌아갔다. 그러나 이번엔 마음속에 한 가지 꾀가 분명히 자리 잡혀 있었다.\n\n\"자라 어른, 잘 생각해 보니 잔치에 빈손으로 갈 수는 없겠소이다. 제 가장 귀한 보물 — 제 간 — 을 평소에는 깨끗한 옹달샘 옆 큰 바위 아래에 모셔 두었지요. 그것을 먼저 가지러 가야 잔치에 갈 수 있겠습니다. 자라 어른께서도 그게 좋겠다 싶지 않으십니까?\"",
        en: "\"One moment please, good Turtle. A feast is fine news indeed — but let me look once around the meadow before we go.\"\n\nThe hare drifted off and pretended to nibble grass at the edge of the clearing. Just then a magpie cawed sharply overhead and fluttered down from a pine branch — in Korean tales, the magpie is a bringer of news. It settled near the hare's shoulder.\n\n\"Brother Hare, listen carefully,\" the magpie whispered with its small beak. \"That turtle has come up the mountain for a different reason. The Dragon King is ill, and your liver is the medicine. The turtle is a loyal servant. He plans to take you in disguise of a feast.\"\n\nThe hare's dark eyes narrowed. The magpie hopped back up to the branch, cawed once more, and was gone.\n\nThe hare thought for a long while. Should he simply run? But the turtle had called him \"Brother\" and had truly come to fetch him with care in his heart. If the hare just ran, the turtle would return with an empty shell and be punished severely.\n\nSo the hare went back to the turtle. But now a clear plan was in his mind.\n\n\"Good Turtle, on reflection, I cannot go to a feast empty-handed. My most precious treasure — my liver — I usually keep under a large rock by a clean spring. I must fetch it first before we go. Don't you think that's wise, dear Turtle?\"",
      },
      image: "/coloring/06-byeoljubu/scene-3b-whisper.png",
      nextId: "scene-4-return",
    },
    "scene-4-return": {
      id: "scene-4-return",
      title: { ko: "마지막 장. 토끼의 기지와 자라의 충성", en: "Final — The Hare's Wit and the Turtle's Loyalty" },
      narration: {
        ko: "자라가 곰곰이 생각해 보더니 고개를 끄덕였다. 토끼의 간이 그렇게 귀한 것이라면 마땅히 가지러 가야지. 자라는 다시 토끼를 등에 태우고 바닷속을 헤엄쳐 산으로 돌아왔다. 둘이 산기슭에 닿자, 토끼가 자라의 등에서 폴짝 뛰어내렸다.\n\n그러더니 토끼는 산으로 한참을 깡총깡총 뛰어 올라가, 큰 바위 위에 올라서서 자라를 내려다보았다. 자라가 어리둥절해 토끼를 올려다보았다.\n\n\"토끼 형님, 그 간은 어디 있습니까?\"\n\n토끼가 두 귀를 흔들며 큰소리로 웃었다.\n\n\"허허, 자라 어른! 이 세상에 자기 간을 꺼내 두고 다니는 짐승이 어디 있겠소이까. 간은 내 몸 안에 늘 있는 것이지요. 다만 — 마마의 병이 깊으시다 하니 마음은 안쓰럽소이다.\"\n\n자라는 그제야 모든 것을 깨달았다. 가슴이 무너졌다. 빈 등껍질로 용궁에 돌아가면 자기는 큰 벌을 받을 것이고, 용왕은 회복되지 못할 것이다. 자라의 작은 검은 눈에서 눈물이 한 방울 떨어졌다.\n\n토끼는 자라의 눈물을 한참 바라보았다. 자라가 자기를 진심으로 모시려 한 마음, 그리고 용왕에 대한 그 깊은 충성이 토끼의 마음을 움직였다. 토끼가 바위에서 내려와 자라 곁에 앉았다.\n\n\"자라 어른, 용왕마마의 병은 토끼 간으로만 낫는 것이 아닐 것이오. 산속 가장 깊은 곳에 백 년 된 산삼이 있다 들었소. 그것을 캐어 가져가시면, 토끼 간보다 더 좋은 약이 될 것이외다. 제가 그 자리를 알려 드리지요.\"\n\n토끼는 자라에게 산삼이 자라는 깊은 골짜기의 위치를 자세히 일러 주었다. 자라가 짧은 다리를 끄덕끄덕 인사하더니, 천천히 그 골짜기를 향해 떠났다. 등껍질 위에 가을 햇살이 환하게 비쳤다.\n\n자라는 그날부터 산속을 부지런히 다니며 산삼을 찾았다. 마침내 백 년 산삼을 캐어 용궁으로 돌아왔고, 용왕은 그 약으로 병이 나았더라. 자라의 충성은 두고두고 용궁의 자랑이 되었고, 토끼의 기지는 산속에서 두고두고 전해 내려왔다.\n\n\"지혜는 살리는 길을 찾는 것이고, 충성은 끝까지 길을 가는 것이란다.\" 옛 어른들이 이렇게 손주에게 일러 주었더라.",
        en: "The turtle thought it over, then nodded. If the hare's liver was so precious, of course it should be fetched. He took the hare onto his back, swam down through the sea, and climbed back up the mountain. As soon as they reached the foothills, the hare leaped lightly off the turtle's shell.\n\nThen he hopped — hop, hop, hop — all the way up onto a tall rock, and looked down at the turtle. The turtle blinked up at him in confusion.\n\n\"Brother Hare, where is the liver?\"\n\nThe hare waved both ears and laughed.\n\n\"Ha! Good Turtle! Where in this world is the creature who takes out his own liver and leaves it lying about? My liver is inside me, always. But — that the king is so deeply ill, my heart truly aches for him.\"\n\nOnly now did the turtle understand. His chest sank. If he returned with an empty shell, he himself would be severely punished, and the king would not recover. A single tear fell from his small dark eyes.\n\nThe hare looked down at the turtle's tears a long while. The turtle's true intention, his depth of loyalty to his king — these moved the hare's heart. He came down from the rock and sat beside the turtle.\n\n\"Good Turtle, I do not believe the hare's liver is the only cure. Deep in the mountain there grows a hundred-year-old wild ginseng (산삼). Bring that to the king — it is a finer medicine than a hare's liver could ever be. I will tell you exactly where it grows.\"\n\nThe hare gave the turtle careful directions to a hidden deep valley where the ginseng grew. The turtle bowed his short legs in thanks and set off slowly toward the valley, autumn sunlight warming his shell.\n\nFrom that day, the turtle searched the mountains tirelessly until at last he dug up a hundred-year ginseng and returned it to the palace. The Dragon King recovered. The turtle's loyalty became a proud tale of the sea, and the hare's quick wit a proud tale of the mountain.\n\n\"Wisdom finds the road that lets both live; loyalty is to walk that road to its end.\" So the old ones tell their grandchildren still.",
      },
      image: "/coloring/06-byeoljubu/scene-4-return.png",
      endingLabel: { ko: "🌿 산삼과 우정 — 정통 결말", en: "🌿 Wild Ginseng and Friendship — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "별주부전 (토끼전)",
    romanized: "Byeoljubujeon",
    englishTitle: "Tale of the Turtle and the Hare",
    origin: {
      ko: "조선시대에 글로 적힌 한국의 옛이야기예요. '판소리'라는 노래 형식으로도 불렸어요. 토끼의 영리함과 자라의 충성심이 대비되는 재미있는 이야기랍니다.",
      en: "A Korean folktale recorded in the Joseon dynasty. It was also performed as pansori — Korea's solo storytelling song tradition. A clever contrast between the hare's wit and the turtle's loyalty.",
    },
    summary: {
      ko: "바닷속 용왕님이 큰 병에 걸렸어요. 신하인 자라가 산에 사는 토끼의 간이 약이라며 토끼를 데려오기로 했죠. 자라는 토끼에게 용궁의 아름다움을 자랑하며 데려갔지만, 용궁에서 사실을 알게 된 토끼는 '간을 산에 두고 왔다'고 기지를 발휘해 산으로 돌아왔어요. 자라는 빈손으로 돌아갔답니다.",
      en: "The Dragon King of the sea falls gravely ill. His loyal turtle servant decides only a hare's liver will cure him. The turtle lures a hare with promises of the palace's wonders. But once there, the hare quickly realizes the truth — and slyly insists his liver is \"safely on the mountain.\" He convinces them to let him fetch it, and escapes home, leaving the turtle empty-handed.",
    },
    glossary: [
      {
        korean: "토끼",
        romanized: "tokki",
        pronunciation: "TOH-kkee",
        meaning: { ko: "산속에 사는 작고 빠른 동물.", en: "A swift, small mountain animal — a hare or rabbit." },
      },
      {
        korean: "자라",
        romanized: "jara",
        pronunciation: "JAH-rah",
        meaning: { ko: "거북이와 비슷한 등껍질이 부드러운 동물.", en: "A soft-shell turtle — cousin to the regular turtle but with a leathery shell." },
      },
      {
        korean: "용왕",
        romanized: "yongwang",
        pronunciation: "YONG-wahng",
        meaning: { ko: "바닷속을 다스리는 용의 임금님.", en: "The Dragon King who rules the depths of the sea." },
      },
      {
        korean: "용궁",
        romanized: "yonggung",
        pronunciation: "YONG-goong",
        meaning: { ko: "용왕이 사는 바닷속 화려한 궁궐.", en: "The Dragon King's magnificent underwater palace." },
      },
      {
        korean: "간",
        romanized: "gan",
        pronunciation: "GAHN",
        meaning: { ko: "몸 안에 있는 중요한 장기. 옛 한국에서는 약으로도 생각했어요.", en: "The liver — an important organ that old Korean medicine sometimes used in cures." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 2장에서 토끼가 자라를 처음 만났을 때 그대로 따라갈지(용궁에 가서 비밀을 알게 됨) 아니면 산속을 둘러보기로 할지(까치가 진실을 귀띔해 줌) 직접 선택해요. 어느 길을 택해도 \"간을 바위 밑에 두고 왔다\"는 토끼의 기지로 위기를 벗어나는 같은 정통 결말로 모이고, 끝에서는 토끼가 자라의 충성에 감동해 백 년 산삼이 자라는 곳을 알려 주어 용왕을 살리지요.",
      en: "We follow the original story closely, but on Chapter 2 you choose whether the hare follows the turtle straight into the palace (and learns the secret there) or pauses on the mountain first (where a magpie whispers the truth). Either way the story converges on the same canonical wit-rescue — \"I left my liver under a rock\" — and in the end the hare, moved by the turtle's loyalty, tells him where a hundred-year wild ginseng grows so the Dragon King can be saved after all.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 7 — 🪺 흥부와 놀부 · Heungbu and Nolbu (NEW)
// ──────────────────────────────────────────────────────────────

const heungbu: Story = {
  id: "heungbu",
  emoji: "🪺",
  title: { ko: "흥부와 놀부", en: "Heungbu and Nolbu" },
  subtitle: { ko: "제비 다리와 박씨", en: "The swallow's leg and the magic gourd" },
  tagline: {
    ko: "마음 착한 흥부와 욕심 많은 놀부, 두 형제의 운명을 가른 작은 제비.",
    en: "Kindhearted Heungbu, greedy Nolbu, and the small swallow who changed both their fates.",
  },
  accent: "from-yellow-100 to-orange-100",
  startSceneId: "scene-1-brothers",
  scenes: {
    "scene-1-brothers": {
      id: "scene-1-brothers",
      title: { ko: "1장. 두 형제, 두 마당", en: "Chapter 1 — Two Brothers, Two Yards" },
      narration: {
        ko: "옛날, 한 마을에 두 형제가 살고 있었더라. 형의 이름은 놀부, 아우의 이름은 흥부였다. 같은 어머니에게서 태어나 같은 마당에서 자랐건만, 두 사람의 마음은 마치 다른 하늘 아래 자란 사람들 같았다.\n\n형 놀부는 욕심이 많고 마음씨가 모질었다. 어머니가 돌아가시자 놀부는 부모가 물려준 살림과 논밭과 식량을 모조리 자기 집으로 가져갔다. 아우 흥부에게는 빈 손으로 마을을 떠나라 하였다.\n\n흥부는 한 마디 원망도 하지 않았다. 어린 자식들의 손을 잡고, 다 무너져 가는 작은 초가집을 빌려 마을 한 귀퉁이에 자리를 잡았다. 그 집은 지붕이 새고, 벽이 갈라지고, 마당에는 잡초만 가득했지만, 흥부는 매일 새벽에 일어나 일감을 찾아 다녔다.\n\n가난해도 흥부의 마당에는 늘 새들이 모여들었다. 작은 떡 부스러기 한 알이라도 떨어지면, 흥부는 그것을 아이들에게 먼저 주고, 남는 것을 새들에게 던져 주었다. 새들은 흥부의 마당을 자기 집처럼 드나들었다.\n\n그러는 동안 형 놀부의 큰 기와집은 곡식 창고가 가득 차 있었지만, 놀부의 마당에는 새 한 마리 내려앉지 않았다.",
        en: "Long ago in a certain village there lived two brothers. The elder was named Nolbu, the younger Heungbu. Born of the same mother, raised in the same yard, the two had hearts that seemed to have grown beneath different skies.\n\nNolbu was greedy and his heart was hard. When their mother died, he took every bit of the inheritance — house, fields, grain — to his own home. He told his younger brother to leave the village empty-handed.\n\nHeungbu did not utter one word of complaint. With his little children's hands in his own, he found a half-collapsing thatched hut to borrow at the corner of the village and settled there. The roof leaked, the walls were cracked, weeds filled the yard. But Heungbu rose at dawn every day to look for work.\n\nPoor as he was, birds kept gathering in his yard. If even a single rice-cake crumb fell, Heungbu gave it first to the children and threw the rest to the birds. The birds came to his yard as if it were their own home.\n\nAll the while, Nolbu's great tile-roof house had storehouses bursting with grain — but not a single bird ever lit upon his yard.",
      },
      image: "/coloring/07-heungbu/scene-1-brothers.png",
      nextId: "scene-2-swallow",
    },
    "scene-2-swallow": {
      id: "scene-2-swallow",
      title: { ko: "2장. 다친 제비를 만난 날", en: "Chapter 2 — The Day He Found the Injured Swallow" },
      narration: {
        ko: "어느 봄날, 흥부네 처마 밑 둥지에 살던 제비 한 마리가 마당으로 툭 떨어졌다. 흥부가 깜짝 놀라 다가가 보니, 제비의 한쪽 다리가 부러져 피가 흐르고 있었다. 둥지에서 떨어지면서 지붕에 부딪힌 듯했다.\n\n흥부는 두 손으로 제비를 살포시 안아 들었다. 작은 가슴이 콩닥콩닥 빠르게 뛰고 있었다.\n\n\"걱정 말아라, 작은 제비야. 내가 보살펴 주마.\"\n\n흥부는 제비를 안고 집 안으로 들어갔다. 어떻게 치료할지 잠시 고민이 되었다. 아내와 아이들과 함께 따뜻하게 보살피며 마음을 모을까. 아니면 어머니께서 옛날에 가르쳐 주신 약방문대로 정성껏 약을 지어 발라 줄까.\n\n어느 쪽을 택해도 진심은 같았다. 그러나 흥부는 잠시 멈추어 깊이 생각해 보았다.",
        en: "One spring day, a swallow from the nest under Heungbu's eaves fell suddenly into the yard. Heungbu rushed over to find the small bird with one of its legs broken and bleeding — it must have struck the roof on the way down.\n\nHeungbu cupped the swallow gently in his two hands. Its tiny chest was beating fast.\n\n\"Don't be afraid, little swallow. I will care for you.\"\n\nHe carried the swallow inside. For a moment, he hesitated as to how. Should he and his wife and children gather their warm hearts around it together — or should he carefully prepare the medicinal remedy his mother had taught him long ago?\n\nEither way was sincere. Heungbu paused and thought deeply for a moment.",
      },
      image: "/coloring/07-heungbu/scene-2-swallow.png",
      choices: [
        { label: { ko: "👪 아내와 아이들과 함께 따뜻하게 보살핀다", en: "👪 Care for it together with wife and children" }, nextId: "scene-3a-family" },
        { label: { ko: "🌿 어머니의 약방문대로 정성껏 약을 짓는다", en: "🌿 Prepare the medicinal remedy his mother taught him" }, nextId: "scene-3b-medicine" },
      ],
    },
    "scene-3a-family": {
      id: "scene-3a-family",
      title: { ko: "3장. 봄날 마당에 돌아온 제비", en: "Chapter 3 — The Swallow Returns to the Spring Yard" },
      narration: {
        ko: "흥부와 식구는 작은 제비를 부엌 문턱에 누이고 한 마음으로 보살폈다. 아내는 무명 천을 잘게 찢어 끈을 만들고, 큰아이는 마당에서 곧은 나뭇가지를 다듬어 왔다. 막내는 손가락으로 제비의 등을 살짝살짝 쓸어 주며 작은 소리로 속삭였다. \"작은 제비야, 우리 식구가 같이 있단다.\" 아이들이 처마 밑의 둥지 잔가지를 모아 새 둥지를 짜고, 솔잎을 부드럽게 깔아 그 안에 제비를 살포시 눕혔다. 그날부터 흥부네 식구는 새 보리차를 끓일 때마다 한 모금씩 제비에게 적셔 주었다.\n\n여름이 지나고 가을이 익어 갈 무렵, 제비의 다리는 어느새 깨끗하게 다 나아 있었다. 어느 가을날 아침, 제비가 흥부 가족 앞에서 작은 날갯짓을 두 번 해 보였다. 식구는 마당에 다 같이 나가 손을 흔들었다. 제비는 따뜻한 남쪽 하늘을 향해 멀리 날아갔다.\n\n차가운 겨울이 길게 흐르고, 다음 해 봄이 왔다. 따뜻한 바람이 흥부네 마당에 다시 불어오던 어느 봄날 아침 ─ 멀리서 익숙한 날갯짓 소리가 들려왔다.\n\n\"어! 그 제비가 돌아왔어요!\"\n\n막내가 먼저 마당으로 뛰어나갔다. 가족 모두가 마당으로 나가 보니, 정말로 그 제비였다. 그러나 이번에는 부리에 무엇인가 작은 것을 물고 있었다. 제비는 흥부의 어깨에 살포시 내려앉아, 부리에 물고 있던 작은 씨앗 하나를 흥부의 손바닥 위에 가만히 떨어뜨렸다.\n\n박씨였다.\n\n가족 모두가 둘러서서 그 작은 씨앗을 한참 들여다보았다. 따뜻한 봄볕 아래, 박씨가 흥부의 손바닥 안에서 작은 보석처럼 빛났다.",
        en: "Heungbu and his family gathered as one heart around the small swallow. His wife tore a clean cotton cloth into thin strips. The eldest child smoothed a straight twig from the yard. The youngest stroked the swallow's back with a fingertip and whispered, \"Little swallow, our family is all here.\" The other children wove the broken nest pieces into a new round basket lined with soft pine needles, and the swallow was laid gently inside. From that day on, whenever the family brewed barley tea, they let a drop fall onto the swallow's beak.\n\nSummer passed, autumn ripened, and the swallow's leg healed clean. One autumn morning the swallow stretched its wings twice in front of the family. They all hurried out into the yard and waved together. The swallow rose into the warm southern sky and was gone.\n\nA long cold winter passed. Then spring came, and one morning a familiar whirr of wings sounded across the yard.\n\n\"Look! The swallow has come back!\"\n\nThe youngest ran out first. The whole family followed — and there it truly was, the same swallow. But this time it carried something small in its beak. It lit gently on Heungbu's shoulder and dropped a single small seed into his open palm.\n\nA gourd seed.\n\nThe whole family gathered close around it. In the warm spring light, the little seed shone like a tiny jewel in Heungbu's hand.",
      },
      image: "/coloring/07-heungbu/scene-3a-family.png",
      nextId: "scene-4-justice",
    },
    "scene-3b-medicine": {
      id: "scene-3b-medicine",
      title: { ko: "3장. 새벽 산기슭에서 받은 박씨", en: "Chapter 3 — A Seed Received on the Dawn Foothills" },
      narration: {
        ko: "흥부는 제비를 가만히 부엌 한쪽에 눕히고, 어머니가 살아 계실 때 가르쳐 주신 약방문을 떠올렸다. \"다리를 다친 새에게는 산쑥과 까치 발자국 모양의 잎이 좋단다. 둘을 함께 빻아 부드럽게 으깨면, 작은 뼈도 잘 붙는단다.\" 어머니의 목소리가 머릿속에 또렷이 들리는 듯했다.\n\n흥부는 어둑한 새벽 산기슭에 올라 이슬에 젖은 풀숲을 헤치며 산쑥과 까치발잎을 한 줌씩 모았다. 동이 트기 전에 돌아와 절구에 풀잎을 빻아, 깨끗한 천에 펴고 제비의 부러진 다리를 살포시 감쌌다. 풀잎의 시원한 약 기운이 작은 다리를 부드럽게 감싸 안았다. 흥부는 절구질하는 동안에도 어머니께 가만히 말을 걸었다. \"어머니, 손님을 정성껏 모시는 것은 어머니가 늘 가르쳐 주신 일이지요.\" 제비는 흥부를 한참 바라보다가, 무엇을 약속하는 듯이 가만히 머리를 한 번 끄덕였다.\n\n여름이 가고 가을이 익어 갈 무렵, 제비의 다리는 어느새 깨끗하게 다 나아 있었다. 어느 새벽 흥부가 마당에 나와 보니, 제비는 처마 끝에서 그를 한참 바라보다가 작은 날갯짓을 두 번 하고는 따뜻한 남쪽 하늘을 향해 멀리 날아갔다. 흥부는 두 손을 모으고 그 모습을 한참 동안 지켜보았다.\n\n긴 겨울이 지나고, 다음 해 봄이 왔다. 어느 봄 새벽 ─ 흥부가 약초 한 줌이라도 더 캐 두려고 산기슭에 다시 올라간 길이었다. 이슬 머금은 풀숲에 무릎 꿇고 산쑥을 한 줌 모으던 그때, 멀리서 익숙한 날갯짓 소리가 들려왔다.\n\n흥부는 천천히 고개를 들었다. 동이 트는 산기슭 위로, 그 제비가 곧장 흥부를 향해 날아오고 있었다.\n\n흥부는 약초 바구니를 옆에 내려놓고 두 손을 가만히 펼쳤다. 제비는 그의 손바닥 위에 살포시 내려앉아, 부리에 물고 있던 작은 씨앗 하나를 가만히 놓아주었다.\n\n박씨였다.\n\n흥부는 작은 씨앗을 한참 들여다보다가, 가만히 가슴께로 가져갔다. 어머니의 따뜻한 가르침이 한 알의 씨앗으로 돌아온 것 같았다. 새벽 햇살이 산기슭에 가만히 번지고, 흥부의 어깨 너머로 멀리 마을의 첫 빛이 보였다.",
        en: "Heungbu laid the swallow gently in one corner of the kitchen and called to mind the remedy his mother had taught him. \"For a bird with a hurt leg, mountain mugwort and the leaf shaped like a magpie's foot are good. Crush them soft, and even tiny bones knit well.\" Her voice was clear in his mind.\n\nBefore dawn he climbed the foothills, pushed through the dew-wet grass, and gathered a handful each of mugwort and magpie-foot leaves. Before the sky lightened he was back, grinding the leaves in a stone mortar and binding the swallow's broken leg with the cool medicine. As he worked he spoke softly to his mother. \"Mother — to care for a guest with all one's heart, that was what you always taught me.\" The swallow watched him a long while with its small black eyes, then nodded once as if making a promise.\n\nSummer passed and autumn ripened. The swallow's leg healed clean. One dawn Heungbu found the swallow at the eaves looking at him a long moment ─ then with two beats of its wings it rose into the warm southern sky and was gone. Heungbu pressed his hands together and watched until the small shape disappeared.\n\nA long winter passed, and spring came. One spring dawn ─ Heungbu was up in the foothills again, hoping to gather a fresh handful of mountain herbs. Kneeling in the dew-wet grass with a small basket beside him, he heard a familiar whirr of wings.\n\nHe raised his head slowly. There, against the lightening foothill sky, the same swallow was flying straight toward him.\n\nHeungbu set the basket aside and opened both palms quietly. The swallow lit upon his open hands and gently set down a single small seed.\n\nA gourd seed.\n\nHeungbu looked at the tiny seed a long while, then drew it close to his chest. It felt as if his mother's warm teaching had come back to him as a single seed. The dawn light spread softly across the foothills, and far below, the first light was just touching the roofs of the village.",
      },
      image: "/coloring/07-heungbu/scene-3b-medicine.png",
      nextId: "scene-4-justice",
    },
    "scene-4-justice": {
      id: "scene-4-justice",
      title: { ko: "마지막 장. 박씨가 가져온 두 마당의 결말", en: "Final — Two Yards, Two Gourds, Two Endings" },
      narration: {
        ko: "흥부는 제비가 주고 간 박씨를 마당 한쪽 양지바른 곳에 정성껏 심었다. 며칠 만에 줄기가 길게 뻗어 나가더니, 한 달 만에 큰 박 세 통이 마당의 지붕 위에 둥글둥글 매달렸다. 박이 충분히 익자, 흥부네 식구는 가장 큰 박 한 통을 따 와 마당에 놓고 톱으로 켜기 시작했다.\n\n\"슬근슬근 톱질이야, 우리 식구 박 켜는 소리…\"\n\n박이 쩌억 하고 두 쪽으로 갈라지자 ─ 그 안에서 금덩어리와 은붙이가 쏟아져 나왔다! 두 번째 박을 켜자 비단과 곡식이 가득 쏟아졌다. 세 번째 박을 켜자 작은 한옥 한 채를 통째로 세울 만한 목재와 기와가 산처럼 쏟아져 나왔다.\n\n흥부네는 큰 잔치를 열어 마을 사람들을 모두 모셨다. 가난했던 시절에 도와주신 분들께 음식과 옷을 나누어 드리고, 새들에게는 가장 좋은 곡식을 따로 마당에 뿌려 주었다.\n\n그런데 ─ 이 이야기를 들은 형 놀부의 얼굴이 흙빛이 되었더라.\n\n\"내 동생이 박씨로 부자가 되었다? 그 별것 아닌 박씨가? 그렇다면 나도!\"\n\n놀부는 부랴부랴 자기 마당으로 달려갔다. 그러나 자기 마당에는 제비 한 마리도 둥지를 틀지 않았다는 것을 그제야 깨달았다. 놀부는 못된 꾀를 냈다 ─ 한 둥지의 어린 제비 한 마리를 일부러 떨어뜨려 다치게 하고는, 천으로 그럴듯이 싸 매고 \"내가 너를 살려 주었다\" 하고 둥지에 도로 넣었다. 진심이 없는 보살핌이었다.\n\n가을이 가고 다음 봄이 왔다. 정말로 그 제비도 박씨 하나를 물어 와 놀부의 손바닥 위에 떨어뜨렸다. 놀부는 흥부보다 다섯 배는 큰 마당 가득 그 박씨를 심었다.\n\n그러나 놀부의 박이 익어 톱으로 켰을 때 ─ 첫 번째 박에서는 무서운 도깨비 떼가 우르르 쏟아져 나왔다. 두 번째 박에서는 똥과 재가 한가득 쏟아져 마당이 다 더러워졌다. 세 번째 박에서는 신선이 나타나 놀부를 꾸짖고는, 놀부의 곡식 창고를 모두 비게 만들어 버렸다.\n\n놀부는 가난해진 채 마당에 주저앉아 한참을 울었다. 그때 흥부가 형의 마당으로 들어왔다. 흥부는 한 마디 원망도 하지 않고 형의 손을 잡았다.\n\n\"형님, 같이 가십시다. 제 집에 형님 자리가 있습니다.\"\n\n놀부는 처음으로 동생 앞에서 부끄러움에 머리를 숙였다. 그날부터 두 형제는 한마당에서 함께 살게 되었더라.\n\n\"박씨를 가져다 주는 것은 제비가 아니라, 그 사람의 마음이란다.\" 옛 어른들이 손주에게 그렇게 일러 주었더라.",
        en: "Heungbu planted the gourd seed in a sunny corner of his yard. Within days the vine stretched long; within a month, three great round gourds hung swelling on the rooftop. When the gourds were ripe, the family rolled out the biggest one into the yard and began to saw it open.\n\n\"Saw, saw, slow and sure, the sound of our family's gourd…\"\n\nWhen the gourd split in two with a clean crack — out poured ingots of gold and pieces of silver! When the second gourd was sawn, silks and grain came tumbling out. When the third was sawn, enough timber and roof tiles for a small hanok came pouring out like a mountain.\n\nHeungbu held a great feast and called all the village to it. He shared food and clothes with those who had helped him in his lean years, and laid the finest grain in the yard for the birds.\n\nBut then — when Nolbu heard of all this, his face turned the color of clay.\n\n\"My brother grew rich from a swallow's seed? From that trifle? Then I can do the same!\"\n\nNolbu rushed back to his own yard — and only then realized that not a single swallow had ever nested there. So he played a cruel trick: he caused a young swallow to fall from a nest and hurt itself, then wrapped its leg in cloth for show and put it back, declaring loudly, \"I have saved you.\" There was no kindness in the caring — only the wish for treasure.\n\nAutumn passed and spring came. Sure enough, that swallow too brought back a single seed and dropped it into Nolbu's palm. Nolbu planted the seed across an entire yard five times the size of Heungbu's.\n\nBut when his gourds ripened and he sawed them open — the first gourd released a horde of fearsome dokkaebi who poured out everywhere. The second gourd poured forth dung and ash that fouled the whole yard. The third gourd brought forth a stern mountain sage who scolded Nolbu and emptied all his storehouses in a single breath.\n\nNolbu sat in his ruined yard, now poor, and wept for a long while. Then Heungbu came in through the gate. Without one word of complaint, he took his brother's hand.\n\n\"Elder brother, come with us. There is a place for you in my home.\"\n\nFor the first time Nolbu lowered his head before his younger brother in shame. From that day on, the two brothers lived together in the same yard.\n\n\"It is not the swallow that brings the seed — it is the heart of the person,\" the old ones tell their grandchildren still.",
      },
      image: "/coloring/07-heungbu/scene-4-justice.png",
      endingLabel: { ko: "🪺 박씨와 형제의 손 — 정통 결말", en: "🪺 The Seed and the Brothers' Hands — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "흥부와 놀부",
    romanized: "Heungbu wa Nolbu",
    englishTitle: "Heungbu and Nolbu",
    origin: {
      ko: "조선시대에 글과 판소리(노래) 모두로 사랑받은 옛이야기예요. 마음씨 좋은 흥부와 욕심 많은 놀부의 대비를 통해 착하게 살자는 가르침을 줘요.",
      en: "A folktale beloved in the Joseon dynasty as both a written story and a pansori song. The contrast between gentle Heungbu and greedy Nolbu teaches kindness as its own reward.",
    },
    summary: {
      ko: "두 형제 흥부와 놀부 중 마음 착한 흥부는 가난하게 살았고, 욕심 많은 놀부는 부자였어요. 어느 날 흥부가 다친 제비 다리를 고쳐 살려보냈는데, 이듬해 제비가 박씨를 가져다줬어요. 박이 자라 안에서 보물이 나왔죠. 놀부는 따라하려고 일부러 제비 다리를 부러뜨렸지만, 그 박에선 도깨비가 나와 혼이 났답니다.",
      en: "Of two brothers, kindhearted Heungbu was poor and greedy Nolbu was rich. One day Heungbu saved a swallow with a broken leg. The next spring the swallow returned with a magic gourd seed — and inside the grown gourd were silks and treasure. When Nolbu tried the same trick by deliberately breaking a swallow's leg, dokkaebi tumbled out of his gourd and taught him a lesson.",
    },
    glossary: [
      {
        korean: "흥부",
        romanized: "Heungbu",
        pronunciation: "HUNG-boo",
        meaning: { ko: "동생의 이름. 한국어로 '흥겨운, 즐거운' 느낌이 담겨있어요.", en: "The younger brother's name — has a feeling of \"cheerful and warm\" in Korean." },
      },
      {
        korean: "놀부",
        romanized: "Nolbu",
        pronunciation: "NOHL-boo",
        meaning: { ko: "형의 이름. '놀고 즐기기만 좋아하는' 느낌이 담겨있어요.", en: "The elder brother's name — hints at \"someone who only wants to play and indulge.\"" },
      },
      {
        korean: "제비",
        romanized: "jebi",
        pronunciation: "JEH-bee",
        meaning: { ko: "봄에 한국으로 날아오는 작은 새. 행운을 가져온다고 해요.", en: "A small bird that flies to Korea each spring — believed to bring good fortune." },
      },
      {
        korean: "박",
        romanized: "bak",
        pronunciation: "BAHK",
        meaning: { ko: "초가집 지붕에서 키우는 둥근 박. 옛이야기에서 보물이 나오는 박으로 유명해요.", en: "A round gourd grown on traditional thatched roofs — famous in folktales for hiding treasure inside." },
      },
      {
        korean: "박씨",
        romanized: "bakssi",
        pronunciation: "BAHK-ssee",
        meaning: { ko: "박을 심을 수 있는 씨앗.", en: "A gourd seed — plant it and a gourd vine grows." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 2장에서 흥부가 다친 제비를 어떻게 보살필지 — 식구가 다 같이 따뜻하게 / 어머니의 약방문대로 정성껏 — 직접 선택해요. 어느 길을 택해도 진심이 같아 같은 정통 결말로 모입니다 — 다음 봄 제비가 박씨를 물어다 주고, 박에서 보물이 쏟아지고, 따라 한 놀부의 박에선 도깨비가 나오지요. 마지막에는 흥부가 형 놀부를 용서하고 한 마당에서 함께 살게 됩니다.",
      en: "We follow the original story closely, but on Chapter 2 you choose how Heungbu cares for the injured swallow — gathering his wife and children around it together, or carefully preparing his mother's herbal remedy. Either path is sincere, and both converge on the same canonical ending: the swallow returns with a gourd seed, treasures pour from Heungbu's gourd, and greedy Nolbu's copycat gourd unleashes dokkaebi instead. In the end Heungbu forgives his brother and the two come to live together in one yard.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Story 8 — 🪓 금도끼 은도끼 · Gold Axe, Silver Axe (NEW)
// ──────────────────────────────────────────────────────────────

const woodman: Story = {
  id: "woodman",
  emoji: "🪓",
  title: { ko: "금도끼 은도끼", en: "The Gold Axe and the Silver Axe" },
  subtitle: { ko: "산신령의 시험", en: "The mountain spirit's test" },
  tagline: {
    ko: "연못에 빠뜨린 도끼 한 자루, 산신령이 들고 나타나는 세 가지 도끼.",
    en: "A single axe slips into a pond. The mountain spirit rises holding three.",
  },
  accent: "from-amber-100 to-emerald-100",
  startSceneId: "scene-1-mother",
  scenes: {
    "scene-1-mother": {
      id: "scene-1-mother",
      title: { ko: "1장. 나무꾼과 늙으신 어머니", en: "Chapter 1 — The Woodcutter and His Aged Mother" },
      narration: {
        ko: "옛날, 어느 깊은 산골에 가난한 나무꾼 한 사람이 늙으신 어머니와 단둘이 살고 있었더라. 어머니는 허리가 굽으셨고 눈도 침침해지셨지만, 늘 아들을 위해 작은 밥상을 차려 주셨다. 아들은 매일 산에 올라 나무를 해 와 시장에 내다 팔았다. 그것이 두 사람의 모든 살림이었다.\n\n나무꾼이 가진 것은 단 하나뿐이었다. 어머니가 결혼하실 때 외조부께서 만들어 주셨다는 오래된 쇠도끼 한 자루. 자루는 손때가 묻어 반들반들해졌고, 도끼날은 수십 년을 써도 닳지 않고 단단했다. 어머니는 그 도끼를 두고 늘 말씀하셨다.\n\n\"이 도끼는 우리 집안의 손이 닿은 것이란다. 잘 보살펴라.\"\n\n어느 가을날 아침, 나무꾼은 어머니께 인사를 드리고 산에 올랐다. 산 깊은 곳까지 들어가 키 큰 소나무 한 그루 앞에 섰다. 어머니께 따뜻한 약을 한 첩 사다 드릴 수 있을 만큼 나무를 해야 할 일이었다.\n\n그는 두 손에 침을 한 번 뱉고, 익숙한 자세로 도끼를 어깨 위로 들어 올렸다. 그러나 ─ 마침 그 순간, 도끼가 자루에서 슥 빠져 산비탈을 굴러 내려가더니, 산 아래 맑은 연못 속으로 풍덩 빠져 버렸다.",
        en: "Long ago, deep in a mountain valley, there lived a poor woodcutter alone with his aged mother. Her back was bent now and her eyes were dim, but every day she set a small meal on the table for her son. Each day he climbed the mountain, cut wood, and sold it at the market. That was their whole living.\n\nThe woodcutter owned only one truly precious thing — an old iron axe his grandfather had made for his mother as a wedding gift. The handle had grown smooth from use over the years, the blade still sharp through decades of work. His mother always said,\n\n\"This axe carries the hands of our family. Care for it well.\"\n\nOne autumn morning, the woodcutter bowed his goodbye to his mother and climbed the mountain. He went deep into the woods and stopped before a tall pine tree. He had to cut enough today to buy his mother a small packet of warming medicine.\n\nHe spit lightly on his palms in the familiar way and raised the axe over his shoulder. But — at that very moment, the axe head slipped from the handle, rolled down the slope, and plunged with a great splash into the clear pond below.",
      },
      image: "/coloring/08-woodman/scene-1-mother.png",
      nextId: "scene-2-pond",
    },
    "scene-2-pond": {
      id: "scene-2-pond",
      title: { ko: "2장. 연못가에 나타난 산신령", en: "Chapter 2 — The Mountain Spirit at the Pond" },
      narration: {
        ko: "나무꾼은 연못가로 한달음에 내려갔다. 도끼가 빠진 자리에 작은 물결만 동그랗게 퍼지고 있었다. 그는 무릎을 꿇고 연못 안을 들여다보았지만, 물이 깊어 도끼는 보이지 않았다.\n\n\"어머니께서 잘 보살피라 하셨건만…\" 나무꾼은 두 손에 얼굴을 묻고 그 자리에 한참을 앉아 있었다. 살림 밑천이라곤 그 도끼 한 자루뿐이었다. 그것이 없으면 오늘 저녁에 어머니께 따뜻한 죽 한 그릇 끓여 드릴 길도 없었다.\n\n그때 연못 한가운데서 물이 동그랗게 일렁이기 시작했다. 나무꾼이 놀라 고개를 들자, 연못의 가운데에서 흰 수염을 길게 늘어뜨린 노인 한 분이 천천히 떠오르셨다. 흰 한복을 입고, 머리에는 작은 관을 쓰고, 손에는 옥지팡이를 짚고 계셨다. 산신령이었다.\n\n산신령께서 부드럽게 웃으시며 손에 무엇인가를 들어 보이셨다.\n\n\"이 도끼가 네 것이냐?\"\n\n산신령의 손에 들린 것은 ─ 햇살에 눈이 부실 만큼 환하게 빛나는 큰 금도끼였다.\n\n나무꾼은 가슴이 두근거렸다. 어떻게 답해야 할까? 단호하게 단숨에 정직하게 말해 버릴까, 아니면 마음속에 잠시 일어난 그 작은 흔들림까지 솔직히 다 말씀드릴까.",
        en: "The woodcutter rushed down to the pond. Where the axe had fallen, only small ripples were spreading. He knelt at the edge and peered into the water, but the pond was deep and the axe was gone.\n\n\"Mother told me to care for it well…\" He buried his face in his hands and sat a long while. That axe had been his whole livelihood. Without it, there was no way to make even a bowl of warm porridge for his mother that night.\n\nThen the center of the pond began to swell in slow circles. As he looked up startled, from the middle of the water there rose an old man with a long white beard. He wore white hanbok, a small crown upon his head, a jade staff in his hand. It was the Mountain Spirit.\n\nThe Mountain Spirit smiled gently and held something out.\n\n\"Is this axe yours?\"\n\nIn his hand he held — a great golden axe, so bright in the sunlight that the woodcutter had to shield his eyes.\n\nThe woodcutter's heart began to race. How should he answer? Should he speak the simple truth at once and finish — or should he confess even the small flicker of temptation that had risen in his heart for just a moment?",
      },
      image: "/coloring/08-woodman/scene-2-pond.png",
      choices: [
        { label: { ko: "🪓 단숨에 '쇠도끼가 제 것입니다' 답한다", en: "🪓 Answer at once: \"The iron axe is mine\"" }, nextId: "scene-3a-firm" },
        { label: { ko: "🌬 잠시 흔들렸던 마음까지 솔직히 말씀드린다", en: "🌬 Honestly confess even the brief flicker of temptation" }, nextId: "scene-3b-honest" },
      ],
    },
    "scene-3a-firm": {
      id: "scene-3a-firm",
      title: { ko: "3장. 단숨에 답한 정직", en: "Chapter 3 — The Quick Honest Answer" },
      narration: {
        ko: "나무꾼은 깊게 한 번 숨을 들이쉬고, 두 손을 무릎 위에 가지런히 모았다. 그러고는 산신령의 눈을 똑바로 마주 보며 입을 열었다.\n\n\"산신령님, 그 도끼는 제 것이 아닙니다. 제 것은 낡은 쇠도끼 한 자루뿐이옵니다.\"\n\n나무꾼의 목소리에는 망설임이 한 알도 섞여 있지 않았다. 산신령께서 흰 수염을 가만히 쓰다듬으시더니, 들고 계셨던 금도끼를 다시 연못 속으로 살며시 가라앉히셨다. 잠시 후, 다시 손을 들어 보이셨을 때 그 손에는 ─ 달빛처럼 환한 큰 은도끼가 들려 있었다.\n\n\"그렇다면 이 도끼가 네 것이냐?\"\n\n나무꾼은 다시 한 번 깊게 숨을 들이쉬었다. 그러고는 변함없이 또렷한 목소리로 답했다.\n\n\"산신령님, 그 도끼도 제 것이 아닙니다. 제 것은 낡은 쇠도끼 한 자루뿐이옵니다.\"\n\n산신령께서 두 번째로 흰 수염을 가만히 쓰다듬으셨다. 그러고는 은도끼도 다시 연못 속에 살며시 가라앉히셨다. 한 번 더 손을 들어 올리셨을 때, 그 손에 들린 것은 ─ 자루에 손때가 묻어 반들반들한, 나무꾼의 그 낡은 쇠도끼였다.\n\n나무꾼의 눈이 환해졌다. 그가 무릎으로 한 걸음 다가가며 두 손을 모았다.\n\n\"예, 산신령님! 그것이 제 도끼입니다. 어머니께서 늘 잘 보살피라 하시던 그 도끼이옵니다.\"",
        en: "The woodcutter drew one deep breath and rested his hands neatly on his knees. Then, meeting the Mountain Spirit's eyes straight, he spoke.\n\n\"Mountain Spirit, that axe is not mine. My axe is only an old iron one.\"\n\nNot the smallest grain of hesitation was in his voice. The Mountain Spirit stroked his white beard slowly and let the golden axe sink back into the water. When he raised his hand again, in it was — a great silver axe, bright as moonlight.\n\n\"Then is this axe yours?\"\n\nThe woodcutter drew another deep breath. Then, as clear as before, he answered:\n\n\"Mountain Spirit, that axe is not mine either. My axe is only an old iron one.\"\n\nThe Mountain Spirit stroked his beard a second time and let the silver axe sink back as well. When he raised his hand a third time — he held the worn old iron axe, its handle smooth-polished from many years.\n\nThe woodcutter's eyes shone. He shuffled forward on his knees and clasped his hands together.\n\n\"Yes, Mountain Spirit! That is my axe. The very one my mother told me always to care for.\"",
      },
      image: "/coloring/08-woodman/scene-3a-firm.png",
      nextId: "scene-4-justice",
    },
    "scene-3b-honest": {
      id: "scene-3b-honest",
      title: { ko: "3장. 흔들리는 마음까지 솔직히", en: "Chapter 3 — Honest Even About the Flicker" },
      narration: {
        ko: "나무꾼은 두 손을 무릎 위에 가지런히 모은 채 한참을 가만히 있었다. 정말이지 답하기 어려웠다.\n\n산신령의 손에 들린 금도끼는 너무도 환했다. 저것을 받기만 하면 어머니께 따뜻한 약을 드릴 수 있고, 새로운 집도 지을 수 있고, 마을 사람들에게 빚진 곡식도 다 갚을 수 있을 것이었다. 그 생각이 마음 한구석을 짧게 스쳤다. 그러나 그 흔들림 자체가 자기 마음을 부끄럽게 만들었다.\n\n한참 만에 나무꾼이 입을 열었다.\n\n\"산신령님, 솔직히 말씀드리겠습니다. 그 도끼는 제 것이 아닙니다. 다만 한 가지 ─ 제 마음이 잠시 흔들렸다는 것을 함께 말씀드리겠습니다. 저렇게 환한 도끼를 보니, 잠깐 '내 것이라 답해도 되지 않을까' 하는 생각이 마음 한구석을 스쳤습니다. 부끄러운 마음이옵니다. 그러나 제 진짜 도끼는 낡은 쇠도끼 한 자루뿐이옵니다.\"\n\n산신령께서 흰 수염을 가만히 쓰다듬으시며 부드럽게 웃으셨다.\n\n\"흔들리는 것이 부끄러운 것이 아니란다. 흔들리고도 다시 바로 서는 것이 가장 귀한 정직이지.\" 산신령께서는 금도끼를 연못에 살며시 가라앉히시고, 다음에는 은도끼를 보여주셨다.\n\n두 번째도 나무꾼은 같은 마음으로 답했다. 은도끼도 자기 것이 아니라 답하면서, 마음 한구석이 또 한 번 작게 흔들렸다는 것을 함께 말씀드렸다. 산신령께서는 두 번째로 부드럽게 웃으셨다.\n\n세 번째로 산신령께서 들어 보이신 것은 ─ 손때 묻은 그 낡은 쇠도끼였다. 나무꾼이 무릎으로 한 걸음 다가가며 환하게 답했다.\n\n\"예, 산신령님! 그것이 제 도끼입니다.\"",
        en: "The woodcutter sat very still, hands neat on his knees. The answer was harder than he had imagined.\n\nThe golden axe in the spirit's hand shone too bright. With it, he could buy his mother warm medicine, build a new house, repay everyone he owed grain to in the village. That thought brushed across one corner of his heart for a single moment. And it was that brush itself that shamed him.\n\nAfter a long while, he spoke.\n\n\"Mountain Spirit, I will tell you honestly. That axe is not mine. But there is one thing more — I must also tell you that my heart was shaken just a little. Seeing such a bright axe, for one moment the thought crossed my mind: would it be so wrong to say it was mine? That thought shames me. But my true axe is only an old iron one.\"\n\nThe Mountain Spirit stroked his beard and smiled gently.\n\n\"It is no shame to be shaken. To be shaken and yet to stand straight again — that is the most precious honesty of all.\" He let the golden axe sink, and then raised the silver axe.\n\nThe second time the woodcutter answered the same way ─ that the silver was not his, and that his heart had been shaken just a little once more. The Mountain Spirit smiled again, more warmly.\n\nThe third time, what the spirit raised was — the worn old iron axe with its smooth handle. The woodcutter shuffled forward on his knees and answered, beaming.\n\n\"Yes, Mountain Spirit! That is my axe.\"",
      },
      image: "/coloring/08-woodman/scene-3b-honest.png",
      nextId: "scene-4-justice",
    },
    "scene-4-justice": {
      id: "scene-4-justice",
      title: { ko: "마지막 장. 세 도끼와 욕심쟁이의 길", en: "Final — The Three Axes and the Greedy Man's Road" },
      narration: {
        ko: "산신령께서 환하게 웃으시며 말씀하셨다.\n\n\"네 마음이 곱구나. 정직한 사람은 자기 것 외에는 탐하지 않는 법이지. 그러니 이 세 도끼를 모두 너에게 주노라. 금도끼와 은도끼는 시장에 내다 팔아 어머니께 따뜻한 약과 좋은 옷을 해 드리고, 쇠도끼는 변함없이 네 손에 쥐고 부지런히 일하라.\"\n\n산신령께서 세 도끼를 모두 나무꾼의 손에 가만히 얹어 주셨다. 나무꾼은 큰절을 세 번 올리고, 어찌할 줄 모를 만큼 감격하여 산을 내려왔다. 어머니는 아들이 가지고 온 세 도끼를 보시고 두 손을 마주 잡으셨다.\n\n\"아들아, 이것은 네 정직한 마음이 받은 것이지, 운이 받은 것이 아니란다.\"\n\n어머니의 말씀이 옳았다. 그날부터 나무꾼네 집안에는 따뜻한 약 냄새와 함께 늘 웃음소리가 끊이지 않았다.\n\n그런데 ─ 마을 한구석에 살던 욕심 많은 나무꾼이 이 이야기를 듣게 되었더라. 그는 노래도 못 하고 마음도 모질었지만, 머리 굴리는 데에는 빠른 자였다.\n\n\"허, 그 늙은이가 그렇게 한 거라면 나도 못 할 게 있나? 이번엔 내가 부자가 되어 보겠다.\"\n\n그는 멀쩡한 자기 쇠도끼를 들고 산에 올라가, 일부러 그 연못 앞에 다다라 도끼를 풍덩 던져 버렸다. 그러고는 무릎을 꿇고 큰소리로 울기 시작했다.\n\n\"아이고, 산신령님! 제 도끼가 빠졌습니다! 살려 주십시오!\"\n\n연못 한가운데서 다시 물결이 일고, 산신령께서 천천히 떠오르셨다. 산신령께서 손에 들어 보이신 것은 ─ 어김없이 환하게 빛나는 큰 금도끼였다.\n\n\"이 도끼가 네 것이냐?\"\n\n욕심쟁이 나무꾼은 환하게 웃으며 두 손을 내밀었다.\n\n\"예! 예, 산신령님! 그것이 제 도끼이옵니다! 어서 제게 주십시오!\"\n\n산신령의 흰 수염이 천천히 흔들렸다. 산신령께서는 깊게 한숨을 쉬시고, 들고 계셨던 금도끼를 다시 연못 속에 살며시 가라앉히셨다.\n\n\"거짓을 말하는 자에게는 한 자루의 도끼도 줄 수 없다. 너는 네 쇠도끼마저 잃었으니, 빈손으로 산을 내려가거라.\"\n\n산신령께서는 그렇게 말씀하시고 연못 속으로 다시 사라지셨다. 욕심쟁이 나무꾼은 자기 쇠도끼마저 잃은 채, 빈 자루만 든 어깨로 산을 터덜터덜 내려와야 했다.\n\n\"도끼는 욕심을 알아본단다. 정직한 사람의 손에만 머문단다.\" 옛 어른들은 손주에게 이렇게 일러 주었더라.",
        en: "The Mountain Spirit smiled brightly and said,\n\n\"Your heart is gentle. The honest man does not covet what is not his own. Therefore I give you all three axes. Sell the gold and silver at the market, buy your mother warm medicine and good clothes, and keep the iron axe steady in your hand for the work you love.\"\n\nThe spirit set all three axes gently into the woodcutter's hands. He bowed three deep bows and went down the mountain with a heart too full for words. When his mother saw the three axes, she joined her two hands together at her chest.\n\n\"My son, this is what your honest heart received — not what luck gave you.\"\n\nShe was right. From that day on, the smell of warm medicine and the sound of laughter never left the small hut.\n\nNow — a greedy woodcutter who lived in one corner of the village heard the story. He could not sing and his heart was hard, but his head was clever in scheming.\n\n\"Ha. If that old fool managed it, why not I? This time I shall be rich.\"\n\nHe took his own perfectly good iron axe up the mountain, marched right up to the pond, and threw it deliberately into the water with a great splash. Then he knelt and began to cry loudly.\n\n\"Oh, Mountain Spirit! My axe has fallen in! Help me!\"\n\nThe center of the pond stirred, and the Mountain Spirit rose slowly once more. In his hand he held — unmistakably — the great bright golden axe.\n\n\"Is this axe yours?\"\n\nThe greedy man beamed and stretched out both hands.\n\n\"Yes! Yes, Mountain Spirit! That is my axe! Please, give it to me!\"\n\nThe Mountain Spirit's white beard swayed slowly. He sighed deeply and let the golden axe sink back into the pond.\n\n\"To one who lies, I cannot give a single axe. You have lost even your own iron axe — go down the mountain empty-handed.\"\n\nSo saying, he sank back into the water. The greedy man had to trudge home with only the empty axe handle, having lost his own real axe besides.\n\n\"An axe knows greed when it sees it. It will only rest in honest hands,\" the old ones tell their grandchildren still.",
      },
      image: "/coloring/08-woodman/scene-4-justice.png",
      endingLabel: { ko: "🪓 세 도끼의 보답과 빈 손의 길 — 정통 결말", en: "🪓 Three Axes Given and a Road Walked Empty-Handed — the canonical ending" },
    },
  },
  originalTale: {
    koreanTitle: "금도끼 은도끼",
    romanized: "Geumdokki Eundokki",
    englishTitle: "The Honest Woodcutter (Gold Axe, Silver Axe)",
    origin: {
      ko: "한국에서 어린이들에게 가장 많이 들려주는 옛이야기 중 하나예요. 정직함의 가치를 가르치는 짧고 분명한 이야기예요.",
      en: "One of the most-told Korean folktales for children. A short, clear story about the value of honesty.",
    },
    summary: {
      ko: "어느 가난한 나무꾼이 도끼를 연못에 빠뜨렸어요. 산신령이 나타나 황금 도끼, 은도끼, 쇠도끼를 차례로 보여주며 '네 도끼냐'고 묻죠. 나무꾼은 정직하게 '쇠도끼만이 제 것입니다'라고 답해요. 감동한 산신령은 세 도끼 모두를 줬어요. 욕심 많은 이웃이 따라 했지만, 거짓말 때문에 도끼 하나도 받지 못했답니다.",
      en: "A poor woodcutter drops his iron axe into a pond. A mountain spirit rises holding three axes — gold, silver, and iron — asking which is his. The woodcutter answers honestly: \"Only the iron one.\" Moved by his honesty, the spirit gives him all three. When a greedy neighbor tries the same trick by lying, the spirit gives him nothing at all.",
    },
    glossary: [
      {
        korean: "도끼",
        romanized: "dokki",
        pronunciation: "DOH-kkee",
        meaning: { ko: "나무를 베는 도구. 손잡이가 길고 머리가 무거워요.", en: "An axe — a tool for chopping wood, with a long handle and heavy head." },
      },
      {
        korean: "금",
        romanized: "geum",
        pronunciation: "GUM",
        meaning: { ko: "노랗고 반짝이는 귀한 금속, 금.", en: "Gold — the shining yellow metal of treasure." },
      },
      {
        korean: "은",
        romanized: "eun",
        pronunciation: "UHN",
        meaning: { ko: "은은하게 반짝이는 귀한 금속, 은.", en: "Silver — a precious metal with a softer shine than gold." },
      },
      {
        korean: "산신령",
        romanized: "sansilryeong",
        pronunciation: "SAHN-shin-LYUNG",
        meaning: { ko: "산을 지키는 신령님. 옛이야기에서 흰 수염 할아버지로 자주 그려져요.", en: "The Mountain Spirit — often shown as a wise white-bearded grandfather in folktales." },
      },
      {
        korean: "연못",
        romanized: "yeonmot",
        pronunciation: "YUHN-moht",
        meaning: { ko: "산속이나 마을에 있는 작은 못. 잔잔한 물이 고여 있어요.", en: "A pond — a small still body of water in the mountain or a village." },
      },
    ],
    ourVersion: {
      ko: "원작의 큰 줄기를 그대로 따르되, 2장에서 산신령 앞에서 어떻게 답할지 — 단숨에 또렷이 / 잠시 흔들렸던 마음까지 솔직히 — 직접 선택해요. 어느 길을 택해도 진심은 정직이라 같은 정통 결말로 모입니다 — 산신령이 세 도끼를 모두 주시고, 따라 한 욕심쟁이 나무꾼은 자기 쇠도끼마저 잃고 빈손으로 산을 내려가지요.",
      en: "We follow the original story closely, but on Chapter 2 you choose how the woodcutter answers the Mountain Spirit — straight and at once, or honestly confessing even the brief flicker of temptation in his heart. Either path is sincere, and both converge on the same canonical ending: the spirit gives him all three axes, and a greedy neighbor who copies the trick loses even his own iron axe and walks home empty-handed.",
    },
  },
}

// ──────────────────────────────────────────────────────────────
//  Public API
// ──────────────────────────────────────────────────────────────

export const STORIES: Record<StoryId, Story> = {
  folktale,
  haenyeo,
  woodcutter,
  dokkaebi,
  kongjwi,
  byeoljubu,
  heungbu,
  woodman,
}

export const STORY_LIST: Story[] = [
  folktale,
  haenyeo,
  woodcutter,
  dokkaebi,
  kongjwi,
  byeoljubu,
  heungbu,
  woodman,
]

export function getStory(id: StoryId): Story {
  return STORIES[id]
}

export function getScene(storyId: StoryId, sceneId: SceneId): Scene {
  const story = STORIES[storyId]
  return story.scenes[sceneId] ?? story.scenes[story.startSceneId]
}

export function isEnding(storyId: StoryId, sceneId: SceneId): boolean {
  return !getScene(storyId, sceneId).choices
}

// Backward-compat for any old callers
export const STORY_TITLE = "Korean Folktales — Coloring Storybook"

// ──────────────────────────────────────────────────────────────
//  Slug mapping for SEO-friendly URLs (used by /folktale/[slug])
// ──────────────────────────────────────────────────────────────

export const STORY_SLUGS: Record<StoryId, string> = {
  folktale: "sun-and-moon",
  haenyeo: "haenyeo-and-the-mermaid",
  woodcutter: "fairy-and-the-woodcutter",
  dokkaebi: "old-man-and-the-goblins",
  kongjwi: "kongjwi-and-the-toad",
  byeoljubu: "hare-and-the-dragon-king",
  heungbu: "heungbu-and-nolbu",
  woodman: "gold-axe-and-silver-axe",
}

export const SLUG_TO_STORY: Record<string, StoryId> = Object.fromEntries(
  Object.entries(STORY_SLUGS).map(([id, slug]) => [slug, id as StoryId]),
)

export function getStoryBySlug(slug: string): Story | null {
  const id = SLUG_TO_STORY[slug]
  return id ? STORIES[id] : null
}
