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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 한밤중의 문 두드림", en: "Chapter 1 — A Knock in the Night" },
      narration: {
        ko: "깊은 산속 작은 초가집. 어머니는 떡을 팔러 장에 가시고, 오누이가 집을 지키고 있었다. 늦은 밤 누군가 문을 두드린다. '얘들아, 엄마야. 떡을 가져왔단다.' 그런데 그 목소리가 어딘가 이상하다.",
        en: "A small thatched-roof house in the deep mountains. Mother had gone to the market to sell rice cakes. Two siblings stayed home alone. Late at night, someone knocks. \"Children, it's Mother. I've brought rice cakes.\" But something about the voice sounds strange.",
      },
      image: "/coloring/folktale/start.png",
      choices: [
        { label: { ko: "🪟 창문 틈으로 손을 확인한다", en: "🪟 Check the hand through the window" }, nextId: "forest" },
        { label: { ko: "🚪 그래도 문을 열어준다", en: "🚪 Open the door anyway" }, nextId: "well" },
      ],
    },
    forest: {
      id: "forest",
      title: { ko: "2장. 달빛 어린 숲", en: "Chapter 2 — The Moonlit Forest" },
      narration: {
        ko: "어머니의 손이 아니라 호랑이의 발이었다. 오누이는 뒷문으로 빠져나와 깊은 숲으로 도망친다. 달빛 아래 거대한 소나무 한 그루가 가지를 펼치고 서 있다.",
        en: "It wasn't Mother's hand — it was a tiger's paw. The siblings slipped out the back door and fled deep into the forest. Under the moonlight, a giant pine tree spread its branches wide.",
      },
      image: "/coloring/folktale/forest.png",
      choices: [
        { label: { ko: "🌳 나무 위로 올라간다", en: "🌳 Climb up the tree" }, nextId: "ending-sky" },
        { label: { ko: "🙏 하늘에 도움을 청한다", en: "🙏 Pray to the heavens" }, nextId: "ending-mountain" },
      ],
    },
    well: {
      id: "well",
      title: { ko: "2장. 우물가 그림자", en: "Chapter 2 — Shadows by the Well" },
      narration: {
        ko: "문을 열자 커다란 호랑이가 들이닥쳤다. 오누이는 부엌을 빠져나와 뒤뜰의 깊은 우물 곁으로 달려간다. 보름달이 우물 속에 동그랗게 비친다.",
        en: "As the door opened, a great tiger burst in. The siblings dashed out through the kitchen to the deep well in the back yard. The full moon shone round in the water.",
      },
      image: "/coloring/folktale/well.png",
      choices: [
        { label: { ko: "🌑 우물에 비친 그림자를 호랑이에게 보여준다", en: "🌑 Show the tiger the reflection in the well" }, nextId: "ending-mountain" },
        { label: { ko: "✨ 우물에 비친 달을 보며 하늘에 기도한다", en: "✨ Pray to the heavens by the moon's reflection" }, nextId: "ending-sky" },
      ],
    },
    "ending-sky": {
      id: "ending-sky",
      title: { ko: "마지막 장. 해님과 달님", en: "Final — Sun and Moon" },
      narration: {
        ko: "하늘에서 금빛 동아줄이 내려왔다. 오누이는 동아줄을 잡고 별 사이로 올라갔다. 그날부터 오빠는 해님이 되어 낮을 밝히고, 누이는 달님이 되어 밤을 비추게 되었다.",
        en: "A golden rope descended from the sky. The siblings grasped it and climbed up among the stars. From that day on, the brother became the Sun who lights the day, and the sister became the Moon who lights the night.",
      },
      image: "/coloring/folktale/ending-sky.png",
      endingLabel: { ko: "☀️ 해님 달님의 엔딩", en: "☀️ The Sun-and-Moon ending" },
    },
    "ending-mountain": {
      id: "ending-mountain",
      title: { ko: "마지막 장. 산신령의 가호", en: "Final — Blessing of the Mountain Spirit" },
      narration: {
        ko: "달빛 아래 흰 수염의 산신령이 나타나 호랑이를 산 너머로 멀리 쫓아냈다. 산신령은 오누이에게 작은 호리병 두 개를 건넸다. 호리병 안에는 산의 시간이 천천히 흐르고 있었다.",
        en: "Under the moonlight a white-bearded mountain spirit appeared and chased the tiger far over the ridge. He gave the children two small gourds. Inside the gourds, the mountain's slow time was flowing quietly.",
      },
      image: "/coloring/folktale/ending-mountain.png",
      endingLabel: { ko: "🏔️ 산신령의 엔딩", en: "🏔️ The Mountain Spirit ending" },
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
      ko: "원작에서는 호랑이가 결국 썩은 동아줄을 받아 떨어져요. 우리 버전은 두 가지 결말 중 하나를 직접 선택할 수 있어요 — 하늘로 오르거나, 산신령이 호랑이를 쫓아내거나.",
      en: "In the original tale the tiger gets a rotten rope and falls. In our version, you can choose between two endings — rising to the sky, or the Mountain Spirit chasing the tiger away.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 깊은 바다", en: "Chapter 1 — The Deep Sea" },
      narration: {
        ko: "제주 바다에서 물질을 하던 해녀가 어두운 바닷속에서 희미하게 빛나는 무언가를 발견한다. 그 빛을 따라 내려가니 길이 두 갈래로 갈라진다. 어느 쪽으로 갈까?",
        en: "A haenyeo diving in the Jeju sea spots something glowing faintly in the dark water. Following the light, she finds two paths splitting before her. Which way should she go?",
      },
      image: "/coloring/haenyeo/start.png",
      choices: [
        { label: { ko: "🪸 산호 미로로 들어간다", en: "🪸 Enter the coral maze" }, nextId: "coral" },
        { label: { ko: "🌿 해초 숲으로 들어간다", en: "🌿 Enter the kelp forest" }, nextId: "kelp" },
      ],
    },
    coral: {
      id: "coral",
      title: { ko: "2장. 산호 미로", en: "Chapter 2 — The Coral Maze" },
      narration: {
        ko: "색색의 산호 사이로 길이 다시 갈라진다. 깊은 곳에서 누군가의 노래가 들려온다. 그림자 사이로 인어가 모습을 드러내며 작은 진주를 내민다.",
        en: "The path branches again among colorful corals. A song drifts from somewhere deep. A mermaid emerges from the shadows, holding out a small pearl.",
      },
      image: "/coloring/haenyeo/coral.png",
      choices: [
        { label: { ko: "🪙 진주를 받아 든다", en: "🪙 Take the pearl" }, nextId: "ending-village" },
        { label: { ko: "🐚 진주를 인어에게 돌려준다", en: "🐚 Return the pearl to the mermaid" }, nextId: "ending-guardian" },
      ],
    },
    kelp: {
      id: "kelp",
      title: { ko: "2장. 해초 숲", en: "Chapter 2 — The Kelp Forest" },
      narration: {
        ko: "흔들리는 해초 숲 사이, 거대한 바다거북이 잠들어 있다. 등껍질 위로 작은 진주 하나가 놓여 빛난다. 어디선가 인어가 조용히 다가온다.",
        en: "Between the swaying kelp, a great sea turtle sleeps. A small pearl glows on its shell. A mermaid drifts quietly into view.",
      },
      image: "/coloring/haenyeo/kelp.png",
      choices: [
        { label: { ko: "🐢 거북을 깨우지 않고 진주를 챙긴다", en: "🐢 Quietly take the pearl without waking the turtle" }, nextId: "ending-village" },
        { label: { ko: "🌊 인어와 함께 진주를 거북이에게 돌려준다", en: "🌊 Return the pearl with the mermaid's help" }, nextId: "ending-guardian" },
      ],
    },
    "ending-guardian": {
      id: "ending-guardian",
      title: { ko: "마지막 장. 바다의 수호자", en: "Final — Guardian of the Sea" },
      narration: {
        ko: "해녀가 진주를 제자리에 돌려놓자 바다 깊은 곳에서 푸른 빛이 천천히 퍼졌다. 그날부터 해녀는 마을과 바다를 잇는 수호자가 되어, 보름달이 뜨는 밤마다 인어와 만나게 되었다.",
        en: "When the haenyeo returned the pearl, a soft blue light spread through the depths. From that day she became a guardian between village and sea, meeting the mermaid every full moon.",
      },
      image: "/coloring/haenyeo/ending-guardian.png",
      endingLabel: { ko: "🌊 바다의 수호자 엔딩", en: "🌊 The Sea Guardian ending" },
    },
    "ending-village": {
      id: "ending-village",
      title: { ko: "마지막 장. 마을로 돌아온 영웅", en: "Final — Hero of the Village" },
      narration: {
        ko: "진주를 들고 바다 위로 솟아오른 해녀는 마을 사람들의 환영을 받았다. 진주는 마을의 보물이 되었다. 그러나 밤이 되면 멀리서 바다가 그녀의 이름을 부르는 듯한 소리가 들렸다.",
        en: "She surfaced with the pearl and was welcomed by the villagers as a hero. The pearl became the village's treasure. But at night, the sea seemed to call her name from far away.",
      },
      image: "/coloring/haenyeo/ending-village.png",
      endingLabel: { ko: "🏝️ 마을의 영웅 엔딩", en: "🏝️ The Village Hero ending" },
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
      ko: "원작이 정해진 이야기는 아니라 우리만의 두 결말을 만들었어요. 진주를 돌려주면 바다의 수호자가 되고, 가져오면 마을의 영웅이 돼요.",
      en: "There's no single original — we built two endings of our own. Return the pearl to become guardian of the sea, or bring it home to become hero of the village.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 폭포 옆 사슴", en: "Chapter 1 — A Deer by the Waterfall" },
      narration: {
        ko: "나무꾼이 폭포 옆에서 물을 마시던 중, 사냥꾼에게 쫓기는 사슴을 만났다. 나무꾼은 사슴을 큰 바위 뒤에 숨겨주었다. 곧 사냥꾼이 달려와 묻는다. '사슴을 봤소?'",
        en: "A young woodcutter pauses to drink at a waterfall and meets a deer fleeing a hunter. He hides the deer behind a great boulder. Moments later the hunter arrives, breathless: \"Have you seen a deer?\"",
      },
      image: "/coloring/woodcutter/start.png",
      choices: [
        { label: { ko: "🤫 북쪽으로 갔다고 거짓말한다", en: "🤫 Lie and say it ran north" }, nextId: "sage" },
        { label: { ko: "🙏 사슴이 스스로 나서길 빈다", en: "🙏 Hope the deer steps out on its own" }, nextId: "forest" },
      ],
    },
    sage: {
      id: "sage",
      title: { ko: "2장. 별빛 연못", en: "Chapter 2 — The Starlit Pond" },
      narration: {
        ko: "사슴은 고마움의 표시로 산속 비밀 연못을 알려주었다. 별이 비치는 그 연못가에 곱게 펼쳐진 한복 한 벌이 놓여있다. 물 안엔 선녀가 있다. 어떻게 할까?",
        en: "Grateful, the deer tells him of a secret pond high in the mountain. Beneath the stars, a folded hanbok lies on the bank. A fairy bathes in the water. What should he do?",
      },
      image: "/coloring/woodcutter/sage.png",
      choices: [
        { label: { ko: "💖 옷을 그대로 두고 인사를 건넨다", en: "💖 Leave the clothes alone and greet her" }, nextId: "ending-sky" },
        { label: { ko: "🌿 옷을 잠시 숨기고 약속을 청한다", en: "🌿 Hide the clothes and ask for a promise" }, nextId: "ending-mountain" },
      ],
    },
    forest: {
      id: "forest",
      title: { ko: "2장. 깊은 숲의 흰 사슴", en: "Chapter 2 — The White Deer in the Deep Wood" },
      narration: {
        ko: "사슴은 사냥꾼에게 잡혀가는 듯 보였으나, 곧 깊은 숲에서 흰 사슴 한 마리가 나타나 나무꾼을 안개 너머로 인도한다. 그곳에 한복을 곱게 차려입은 선녀가 손을 내민다. '함께 가겠는가?'",
        en: "The deer seemed lost to the hunter, but soon a pure white deer appears in the deep forest and leads the woodcutter through the mist. There, a fairy in flowing robes offers her hand. \"Will you come with me?\"",
      },
      image: "/coloring/woodcutter/forest.png",
      choices: [
        { label: { ko: "🤝 선녀의 손을 잡고 길을 나선다", en: "🤝 Take her hand and follow" }, nextId: "ending-sky" },
        { label: { ko: "🍃 산에 남아 사슴을 보살피겠다 답한다", en: "🍃 Stay in the mountain and care for the deer" }, nextId: "ending-mountain" },
      ],
    },
    "ending-sky": {
      id: "ending-sky",
      title: { ko: "마지막 장. 하늘로 오른 약속", en: "Final — The Promise that Rose to the Sky" },
      narration: {
        ko: "사슴이 이끈 길 끝에 하늘로 오르는 무지개 다리가 놓여 있었다. 선녀와 나무꾼은 손을 잡고 별 사이로 걸어 들어갔다. 그날 이후, 맑은 밤마다 나란히 빛나는 두 별을 볼 수 있다.",
        en: "At the end of the deer's path, a rainbow bridge rose into the sky. Hand in hand, the woodcutter and the fairy walked among the stars. From that day on, on clear nights, two stars shine side by side.",
      },
      image: "/coloring/woodcutter/ending-sky.png",
      endingLabel: { ko: "☁️ 하늘로 오른 엔딩", en: "☁️ The Sky-bound ending" },
    },
    "ending-mountain": {
      id: "ending-mountain",
      title: { ko: "마지막 장. 산의 정령이 되어", en: "Final — Becoming the Mountain Spirit" },
      narration: {
        ko: "나무꾼은 산을 떠나지 않았다. 사슴과 함께 작은 집을 짓고 짐승들을 보살폈다. 시간이 흐르며 그의 모습은 산의 안개에 녹아들었고, 사람들은 그를 산신령이라 부르기 시작했다.",
        en: "The woodcutter never left the mountain. With the deer, he built a small hut and cared for the animals. Over the years his figure blurred into the mountain mist, and people began to call him the Mountain Spirit.",
      },
      image: "/coloring/woodcutter/ending-mountain.png",
      endingLabel: { ko: "🌲 산의 정령 엔딩", en: "🌲 The Mountain Spirit ending" },
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
      ko: "원작은 선녀가 결국 하늘로 돌아가는 슬픈 결말이에요. 우리 버전은 함께 하늘로 오르거나, 나무꾼이 산에 남아 산신령이 되는 두 결말을 골라요.",
      en: "The original ends sadly when the fairy returns to the sky alone. Our version lets you choose — rise together to the heavens, or stay and become the Mountain Spirit.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 산중의 빈 집", en: "Chapter 1 — The Lonely Hut" },
      narration: {
        ko: "혹부리 영감이 산에서 나무를 하다 길을 잃었다. 어둠 속 등불이 새어 나오는 작은 집을 발견한다. 살그머니 들여다보니 도깨비들이 방망이를 두드리며 떠들썩하게 놀고 있다.",
        en: "An old man with a lump on his cheek gets lost while gathering wood. In the dark, he finds a small hut glowing with lantern light. Peeking inside, he sees dokkaebi pounding their clubs and having a noisy feast.",
      },
      image: "/coloring/dokkaebi/start.png",
      choices: [
        { label: { ko: "🎵 함께 노래를 부른다", en: "🎵 Step in and sing along" }, nextId: "sing" },
        { label: { ko: "👀 살짝 숨어서 지켜본다", en: "👀 Stay hidden and watch" }, nextId: "hide" },
      ],
    },
    sing: {
      id: "sing",
      title: { ko: "2장. 도깨비들과 함께", en: "Chapter 2 — Singing with the Goblins" },
      narration: {
        ko: "영감이 흥겨운 가락을 뽑자 도깨비들이 박수치며 좋아한다. 한 도깨비가 묻는다. '그렇게 좋은 노래가 어디서 나오시오?'",
        en: "He breaks into a cheerful tune. The dokkaebi clap and roar with delight. One of them asks, \"Where does such a fine song come from, old man?\"",
      },
      image: "/coloring/dokkaebi/sing.png",
      choices: [
        { label: { ko: "🌟 '내 혹에서 나오는 노래라오' 농담한다", en: "🌟 Joke: \"It comes right out of this lump!\"" }, nextId: "ending-blessing" },
        { label: { ko: "🌫️ '도깨비님들과 함께라야 흥이 납니다' 답한다", en: "🌫️ Answer: \"Only with you good fellows can I sing this well.\"" }, nextId: "ending-wander" },
      ],
    },
    hide: {
      id: "hide",
      title: { ko: "2장. 숨어서 본 잔치", en: "Chapter 2 — The Feast from the Shadows" },
      narration: {
        ko: "영감이 숨어서 지켜보니 도깨비들이 보물을 산처럼 쌓아두고 놀고 있다. 그러나 한 도깨비가 영감을 발견하고 손가락을 흔든다. '훔치러 왔소, 놀러 왔소?'",
        en: "Hidden, he watches the dokkaebi play among heaps of treasure. One of them spots him and wags a finger. \"Did you come to steal, or to play?\"",
      },
      image: "/coloring/dokkaebi/hide.png",
      choices: [
        { label: { ko: "🎤 '신나는 이야기 하나 해드리오리다' 답한다", en: "🎤 \"I came to tell you a wonderful tale.\"" }, nextId: "ending-blessing" },
        { label: { ko: "🤝 '함께 놀러왔다오' 답한다", en: "🤝 \"I came to play with you.\"" }, nextId: "ending-wander" },
      ],
    },
    "ending-blessing": {
      id: "ending-blessing",
      title: { ko: "마지막 장. 혹을 떼고 돌아온 길", en: "Final — Home Without the Lump" },
      narration: {
        ko: "도깨비들이 크게 웃으며 영감의 혹을 만져 떼어주고, 그 자리에 빛나는 비단 주머니를 채워주었다. 새벽 산길을 가벼운 발걸음으로 내려온 영감은 마을의 이야기꾼이 되었다. 아이들이 줄을 서서 그의 이야기를 들었다.",
        en: "Laughing, the dokkaebi plucked the lump from his cheek and filled his pocket with a shining silk purse. He walked home down the dawn path light-footed. He became the village storyteller, and children lined up to hear his tales.",
      },
      image: "/coloring/dokkaebi/ending-blessing.png",
      endingLabel: { ko: "🎁 이야기꾼의 엔딩", en: "🎁 The Storyteller ending" },
    },
    "ending-wander": {
      id: "ending-wander",
      title: { ko: "마지막 장. 도깨비 친구의 길", en: "Final — The Path with Goblin Friends" },
      narration: {
        ko: "그날 밤부터 영감은 도깨비들과 친구가 되었다. 달이 뜨는 밤이면 산자락에서 함께 부르는 노랫소리가 들렸다. 마을 사람들은 가끔 산길에서 영감과 도깨비들이 어깨동무하고 걸어가는 모습을 보았다고 했다.",
        en: "From that night on, the old man counted the dokkaebi as friends. On nights when the moon was full, their singing drifted down from the ridge. Travelers said they sometimes spotted him on the mountain road, arms around his goblin companions.",
      },
      image: "/coloring/dokkaebi/ending-wander.png",
      endingLabel: { ko: "🌫️ 도깨비 친구의 엔딩", en: "🌫️ The Goblin Friends ending" },
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
      ko: "원작에서 욕심쟁이 영감의 결말이 따로 있지만, 우리는 첫 번째 영감의 두 가지 선택만 보여줘요. 정직하게 농담을 하거나, 도깨비와 친구가 되는 길.",
      en: "The original has a greedy second old man for contrast. We focus on the first old man's choices — joke honestly with the dokkaebi, or befriend them for life.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 깨진 항아리", en: "Chapter 1 — The Cracked Jar" },
      narration: {
        ko: "콩쥐가 잔치 갈 준비를 하고 있는데, 새어머니가 잔치 가기 전에 큰 항아리에 물을 가득 채워놓으라 시킨다. 그런데 항아리는 바닥이 깨져있다. 콩쥐는 어떻게 할까?",
        en: "Kongjwi is getting ready for the festival when her stepmother orders her to fill a giant clay jar with water first. But the jar has a crack at its base. What should she do?",
      },
      image: "/coloring/kongjwi/start.png",
      choices: [
        { label: { ko: "🐸 두꺼비에게 도와달라 부탁한다", en: "🐸 Ask the toad for help" }, nextId: "toad" },
        { label: { ko: "🌿 풀잎을 모아 손으로 막아본다", en: "🌿 Try to plug it with grass and hands" }, nextId: "cow" },
      ],
    },
    toad: {
      id: "toad",
      title: { ko: "2장. 베틀 앞의 참새들", en: "Chapter 2 — Sparrows at the Loom" },
      narration: {
        ko: "큰 두꺼비가 항아리 바닥을 막아주었다. 잔치 가기 전, 새어머니는 한 가지 일을 더 시켰다. 베틀 앞에서 막막해진 콩쥐 곁으로 참새 떼가 모여든다. '도와드릴게요. 그런데 무엇을 주실 수 있나요?'",
        en: "A great toad sealed the jar's crack. But before the festival, her stepmother gave her another task. Stuck at the loom, Kongjwi sees a flock of sparrows gather. \"We'll help you. But what will you give us?\"",
      },
      image: "/coloring/kongjwi/toad.png",
      choices: [
        { label: { ko: "🌾 '들에서 거둔 곡식을 나눠드리겠다' 답한다", en: "🌾 \"I'll share my grain with you.\"" }, nextId: "ending-banquet" },
        { label: { ko: "🕊 '대신 노래 한 곡 불러드리겠다' 답한다", en: "🕊 \"I'll sing you a song instead.\"" }, nextId: "ending-village" },
      ],
    },
    cow: {
      id: "cow",
      title: { ko: "2장. 검은 소의 선물", en: "Chapter 2 — The Black Ox's Gift" },
      narration: {
        ko: "풀잎으로 가까스로 항아리를 채웠다. 잔치에 가려는데 입을 옷이 없다. 검은 소가 천천히 다가와 말한다. '비단옷을 가져다 줄까, 평범한 베옷을 입고 갈까. 어느 것이 좋은가?'",
        en: "She barely filled the jar with bundles of grass. With no festival clothes, a black ox approaches and speaks slowly: \"Shall I bring you a silk hanbok, or will plain hemp do? Which would you prefer?\"",
      },
      image: "/coloring/kongjwi/cow.png",
      choices: [
        { label: { ko: "👘 '비단옷을 입겠다' 답한다", en: "👘 \"I'll take the silk hanbok.\"" }, nextId: "ending-banquet" },
        { label: { ko: "🌾 '베옷도 충분합니다' 답한다", en: "🌾 \"Plain hemp will do.\"" }, nextId: "ending-village" },
      ],
    },
    "ending-banquet": {
      id: "ending-banquet",
      title: { ko: "마지막 장. 잔치에서의 만남", en: "Final — A Meeting at the Feast" },
      narration: {
        ko: "콩쥐가 잔치에 도착했을 때, 마침 사또가 마당 한가운데서 잃어버린 꽃신을 발견했다. 신을 신어보자 꼭 맞았다. 사또는 콩쥐의 손을 잡고 꽃 사이로 함께 걸었다. 사람들이 박수를 쳤다.",
        en: "When Kongjwi arrived at the feast, the magistrate had just picked up a lost flower shoe. She slipped it on, and it fit. The magistrate took her hand and walked with her through the petals. The crowd burst into applause.",
      },
      image: "/coloring/kongjwi/ending-banquet.png",
      endingLabel: { ko: "👑 잔치의 엔딩", en: "👑 The Festival ending" },
    },
    "ending-village": {
      id: "ending-village",
      title: { ko: "마지막 장. 마을로 돌아온 콩쥐", en: "Final — Kongjwi Home in the Village" },
      narration: {
        ko: "잔치에서 별다른 일은 일어나지 않았다. 그러나 돌아오는 길, 도와줬던 두꺼비와 참새와 검은 소가 마을 어귀에 마중 나와 있었다. 콩쥐의 작은 집이 보름달 아래 따스하게 빛났다. 짐승들과 함께 평화로운 밤이 시작되었다.",
        en: "Nothing remarkable happened at the feast. But on the way home, the toad, the sparrows, and the black ox were waiting at the village gate. Her little cottage glowed warm under the full moon. A peaceful night began among her animal friends.",
      },
      image: "/coloring/kongjwi/ending-village.png",
      endingLabel: { ko: "🌾 따뜻한 이웃 엔딩", en: "🌾 The Warm Village ending" },
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
      ko: "원작은 팥쥐의 못된 결말과 사또와의 결혼이 핵심이에요. 우리 버전은 결혼 결말과 더불어, 마을에서 짐승 친구들과 살아가는 따뜻한 결말도 골라요.",
      en: "The original ends with Patjwi's punishment and Kongjwi's marriage. Our version keeps the festival ending, but also offers a quieter one — a warm life in the village with her animal friends.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 산속에 온 자라", en: "Chapter 1 — A Turtle on the Mountain" },
      narration: {
        ko: "산속 토끼가 풀을 뜯고 있는데 바다에서 자라 한 마리가 헐레벌떡 올라왔다. 자라는 용왕님이 사는 용궁의 화려함을 자랑하며 토끼를 초대한다. 어쩐지 자라의 눈빛이 흔들린다.",
        en: "A hare nibbles grass on the mountainside when a turtle scrambles up from the sea. The turtle boasts of the Dragon King's gleaming palace and invites the hare to visit. But something flickers in the turtle's eyes.",
      },
      image: "/coloring/byeoljubu/start.png",
      choices: [
        { label: { ko: "🐢 자라를 따라 바다로 간다", en: "🐢 Follow the turtle into the sea" }, nextId: "palace" },
        { label: { ko: "🌲 산에 남아 더 알아본다", en: "🌲 Stay on the mountain and learn more" }, nextId: "forest" },
      ],
    },
    palace: {
      id: "palace",
      title: { ko: "2장. 용궁의 진실", en: "Chapter 2 — The Truth at the Palace" },
      narration: {
        ko: "휘황찬란한 용궁에 도착하자 용왕이 침대에 누워 있다. 신하들이 말한다. '토끼의 간이 있어야 용왕님이 살 수 있소.' 토끼는 깜짝 놀랐다. 어떻게 대답할까?",
        en: "Inside the dazzling Dragon Palace the Dragon King lies in bed. \"We need a hare's liver to save His Majesty,\" the ministers say. The hare freezes. What will he answer?",
      },
      image: "/coloring/byeoljubu/palace.png",
      choices: [
        { label: { ko: "🧠 '간은 산에 두고 왔습니다' 기지를 부린다", en: "🧠 \"My liver is back on the mountain — let me fetch it.\"" }, nextId: "ending-clever" },
        { label: { ko: "🙏 '함께 길을 찾아봅시다' 약을 권한다", en: "🙏 \"Let us look for another medicine together.\"" }, nextId: "ending-honor" },
      ],
    },
    forest: {
      id: "forest",
      title: { ko: "2장. 산속 도깨비의 귀띔", en: "Chapter 2 — A Whisper from the Dokkaebi" },
      narration: {
        ko: "산속에 남은 토끼에게 도깨비가 다가와 귀띔한다. '용왕이 네 간을 원한단다.' 자라가 다시 토끼를 부르러 산을 오른다. 토끼는 두 가지 길 사이에서 망설인다.",
        en: "A dokkaebi sidles up to the hare and whispers, \"The Dragon King wants your liver.\" The turtle is climbing the mountain again to fetch him. The hare hesitates between two paths.",
      },
      image: "/coloring/byeoljubu/forest.png",
      choices: [
        { label: { ko: "🎭 자라에게 수수께끼를 내어 돌려보낸다", en: "🎭 Send the turtle home with a riddle" }, nextId: "ending-clever" },
        { label: { ko: "🤝 자라에게 사과하고 용궁에 친구로 간다", en: "🤝 Apologize to the turtle and visit the palace as a friend" }, nextId: "ending-honor" },
      ],
    },
    "ending-clever": {
      id: "ending-clever",
      title: { ko: "마지막 장. 기지의 토끼", en: "Final — The Clever Hare" },
      narration: {
        ko: "용궁에서 빠져나온 토끼는 산속 큰 바위에 올라 크게 웃었다. '간이라니, 그건 내 머릿속에 잘 있단다!' 그 뒤로 토끼는 산짐승들 사이에서 가장 영리한 자로 이름이 났다. 자라는 빈손으로 바다로 돌아갔다.",
        en: "Back on his mountain, the hare leapt onto a great boulder and laughed. \"My liver? Right where it always was — in my head!\" From then on he was known throughout the forest as the cleverest of all creatures. The turtle returned empty-handed to the sea.",
      },
      image: "/coloring/byeoljubu/ending-clever.png",
      endingLabel: { ko: "🧠 기지의 엔딩", en: "🧠 The Clever ending" },
    },
    "ending-honor": {
      id: "ending-honor",
      title: { ko: "마지막 장. 산과 바다를 잇는 친구", en: "Final — Friend of Sea and Mountain" },
      narration: {
        ko: "토끼는 용왕에게 산속 약초를 가르쳐주었고, 용왕은 깊이 감사했다. 그날부터 토끼와 자라는 산과 바다를 오가는 절친한 사이가 되었고, 어느 동물이 아프면 둘이 함께 약을 찾으러 다닌다고 한다.",
        en: "The hare taught the Dragon King about mountain herbs, and the king was deeply grateful. From that day, the hare and the turtle became fast friends crossing land and sea — and whenever an animal fell sick, the two would set out together to find medicine.",
      },
      image: "/coloring/byeoljubu/ending-honor.png",
      endingLabel: { ko: "🤝 의리의 엔딩", en: "🤝 The Loyal Friendship ending" },
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
      ko: "원작에서는 토끼가 기지로 빠져나오는 결말 하나예요. 우리 버전은 토끼가 영리하게 빠져나오는 결말과, 자라를 용서하고 친구가 되는 따뜻한 결말 둘 다 골라볼 수 있어요.",
      en: "The original has one ending — the hare's clever escape. Our version adds a second one: he could also forgive the turtle, befriend him, and bridge mountain and sea.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 두 형제", en: "Chapter 1 — Two Brothers" },
      narration: {
        ko: "옛날 어느 마을, 욕심 많은 형 놀부와 마음 착한 동생 흥부가 살았다. 놀부는 부자였지만 인색했고, 흥부는 가난해도 따뜻했다. 어느 봄날, 처마 밑에 제비 한 마리가 둥지를 짓는다. 누구의 시점으로 이야기를 따라갈까?",
        en: "Long ago in a small village lived two brothers — greedy elder Nolbu and kindhearted younger Heungbu. Nolbu was rich but stingy; Heungbu was poor but warm of heart. One spring, a swallow builds a nest under a roof. Whose story shall we follow?",
      },
      image: "/coloring/heungbu/start.png",
      choices: [
        { label: { ko: "🪺 흥부의 처마 밑으로", en: "🪺 Follow Heungbu's roof" }, nextId: "swallow" },
        { label: { ko: "💰 놀부의 큰 집으로", en: "💰 Follow Nolbu's grand house" }, nextId: "greed" },
      ],
    },
    swallow: {
      id: "swallow",
      title: { ko: "2장. 다친 제비", en: "Chapter 2 — The Injured Swallow" },
      narration: {
        ko: "흥부의 처마 밑 제비 새끼 한 마리가 떨어져 다리를 다쳤다. 흥부가 살펴보니 작은 다리가 부러져 있다. 어떻게 할까?",
        en: "A baby swallow falls from Heungbu's eaves and breaks its tiny leg. Heungbu cradles it carefully. What should he do?",
      },
      image: "/coloring/heungbu/swallow.png",
      choices: [
        { label: { ko: "🩹 정성껏 다리를 고치고 풀어준다", en: "🩹 Bandage the leg and set it free" }, nextId: "ending-blessing" },
        { label: { ko: "🌾 그냥 부드러운 둥지에 다시 올려준다", en: "🌾 Place it gently back in the nest" }, nextId: "ending-lesson" },
      ],
    },
    greed: {
      id: "greed",
      title: { ko: "2장. 놀부의 욕심", en: "Chapter 2 — Nolbu's Greed" },
      narration: {
        ko: "흥부가 박씨로 부자가 됐다는 소문을 들은 놀부. 자기 집 처마에도 제비를 잡아다 일부러 다리를 부러뜨렸다. 거짓으로 치료하던 손이 순간 멈춘다. 놀부는 무엇을 할까?",
        en: "Hearing Heungbu grew rich from a magic gourd seed, Nolbu catches a swallow under his eaves and deliberately breaks its leg, planning to \"heal\" it and earn the same reward. As he wraps the leg, his hand pauses. What will he do?",
      },
      image: "/coloring/heungbu/greed.png",
      choices: [
        { label: { ko: "💎 그대로 보물을 기대하며 마저 치료한다", en: "💎 Keep going, hoping for the same treasure" }, nextId: "ending-lesson" },
        { label: { ko: "🌱 잘못을 깨닫고 진심으로 보살핀다", en: "🌱 Realize his mistake and tend the bird with genuine care" }, nextId: "ending-blessing" },
      ],
    },
    "ending-blessing": {
      id: "ending-blessing",
      title: { ko: "마지막 장. 박씨에서 핀 보물", en: "Final — Treasure from the Gourd" },
      narration: {
        ko: "이듬해 봄, 제비가 박씨 하나를 물어다 주었다. 정성껏 심으니 큰 박이 자랐고, 박을 톱으로 자르자 안에서 비단과 금화가 쏟아져 나왔다. 흥부의 마당에선 동네 사람들과 잔치가 벌어졌다.",
        en: "The next spring, the swallow returned with a single gourd seed. He planted it carefully, and from the great gourd that grew, silks and gold coins tumbled out. Heungbu's yard filled with neighbors at a great feast.",
      },
      image: "/coloring/heungbu/ending-blessing.png",
      endingLabel: { ko: "🎁 박씨의 엔딩", en: "🎁 The Magic Gourd ending" },
    },
    "ending-lesson": {
      id: "ending-lesson",
      title: { ko: "마지막 장. 박에서 나온 가르침", en: "Final — A Lesson from the Gourd" },
      narration: {
        ko: "다음 봄, 제비가 박씨를 가져다 주었다. 박이 자라 톱으로 자르자, 안에서 도깨비들이 우르르 쏟아져 나와 욕심을 부드럽게 흔들어 보였다. 보물은 없었지만, 놀부의 마음 한구석이 천천히 따뜻해지기 시작했다.",
        en: "The next spring, the swallow brought a gourd seed. As the great gourd was sawn open, dokkaebi tumbled out and gently shook loose his greedy heart. There was no treasure inside, but slowly a corner of Nolbu's heart began to warm.",
      },
      image: "/coloring/heungbu/ending-lesson.png",
      endingLabel: { ko: "🌱 가르침의 엔딩", en: "🌱 The Lesson ending" },
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
      ko: "원작은 흥부에게 보물, 놀부에게 도깨비의 벌이라는 분명한 결말이에요. 우리 버전은 흥부와 놀부 둘 다 시점이 되어보고, 놀부도 마음을 바꿀 기회를 만들었어요.",
      en: "The original gives Heungbu treasure and punishes Nolbu with dokkaebi. Our version lets you walk in either brother's shoes — even Nolbu can choose to change his heart.",
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
  startSceneId: "start",
  scenes: {
    start: {
      id: "start",
      title: { ko: "1장. 연못에 빠진 도끼", en: "Chapter 1 — The Axe in the Pond" },
      narration: {
        ko: "성실한 나무꾼이 산속 깊은 연못가에서 나무를 베고 있었다. 그만 손에서 도끼가 미끄러져 연못 속으로 풍덩 가라앉았다. 가난한 그에게 단 하나뿐인 도끼였다. 수면 위로 작은 동심원만 천천히 퍼져나간다.",
        en: "An honest woodcutter is chopping by a deep mountain pond. The axe slips from his hand and plunges into the water — his only axe, and he is a poor man. Small ripples spread quietly across the surface.",
      },
      image: "/coloring/woodman/start.png",
      choices: [
        {
          label: { ko: "🙏 잃어버린 도끼를 받아들인다", en: "🙏 Accept that it's lost" },
          nextId: "trial",
        },
        {
          label: { ko: "💭 어떻게든 다시 가져올 방법을 고민한다", en: "💭 Try to find a way to recover it" },
          nextId: "temptation",
        },
      ],
    },
    trial: {
      id: "trial",
      title: { ko: "2장. 산신령의 시험", en: "Chapter 2 — The Mountain Spirit's Test" },
      narration: {
        ko: "체념하고 자리에 앉으려는 순간, 연못 중앙에서 빛이 솟아 흰 수염의 산신령이 떠올랐다. 손엔 금도끼·은도끼·그리고 그가 잃어버린 쇠도끼 세 자루. '이 중 어느 것이 그대의 것인가?'",
        en: "As he sat down to rest, light surged from the center of the pond and a white-bearded Mountain Spirit rose up. In his hands — a gold axe, a silver axe, and the iron axe the woodcutter had lost. \"Which one is yours?\"",
      },
      image: "/coloring/woodman/trial.png",
      choices: [
        {
          label: { ko: "🪓 '오직 쇠도끼만이 제 것입니다' 답한다", en: "🪓 \"Only the iron one is mine.\"" },
          nextId: "ending-share",
        },
        {
          label: { ko: "💎 '금도끼도 제 것인 듯합니다' 답한다", en: "💎 \"Perhaps the gold one too is mine.\"" },
          nextId: "ending-quiet",
        },
      ],
    },
    temptation: {
      id: "temptation",
      title: { ko: "2장. 황금의 유혹", en: "Chapter 2 — The Lure of Gold" },
      narration: {
        ko: "한참을 한숨 쉬며 앉아 있는데, 연못이 잔잔히 빛났다. 산신령이 떠올라 세 자루의 도끼를 차례로 내보인다. 황금 도끼가 햇살에 반짝인다. '이 중 어느 것이 그대의 도끼인가?'",
        en: "As he sighed and waited, the pond began to glow softly. The Mountain Spirit rose and held out three axes in turn. The gold one shimmered in the sunlight. \"Which is yours?\"",
      },
      image: "/coloring/woodman/temptation.png",
      choices: [
        {
          label: { ko: "🌱 마음을 가다듬고 '쇠도끼만이 제 것' 답한다", en: "🌱 Steady his heart: \"Only the iron one is mine.\"" },
          nextId: "ending-share",
        },
        {
          label: { ko: "💎 '그 금도끼가 제 것입니다' 욕심을 부린다", en: "💎 Give in: \"The gold one is mine.\"" },
          nextId: "ending-quiet",
        },
      ],
    },
    "ending-share": {
      id: "ending-share",
      title: { ko: "마지막 장. 산이 가르친 선물", en: "Final — The Mountain's Lesson" },
      narration: {
        ko: "나무꾼은 마을로 내려와 정직의 가치를 사람들에게 나눠 가르쳤다. 마을의 아이들은 그의 이야기를 들으며 자랐고, 산신령의 도끼는 연못 옆 작은 사당에 모셔져 모두의 보물이 되었다.",
        en: "The woodcutter went home and shared the lesson of honesty with everyone. The village children grew up on his story, and the gifted axes were enshrined in a small wooden hall beside the pond — a treasure belonging to all.",
      },
      image: "/coloring/woodman/ending-share.png",
      endingLabel: { ko: "🌟 나눔의 엔딩", en: "🌟 The Sharing ending" },
    },
    "ending-quiet": {
      id: "ending-quiet",
      title: { ko: "마지막 장. 다시 든 쇠도끼", en: "Final — The Iron Axe Once More" },
      narration: {
        ko: "산신령은 황금과 은의 도끼를 다시 거두어 갔다. 나무꾼의 손에는 처음의 쇠도끼만 남았다. 그러나 그 도끼를 들고 산을 오르는 나무꾼의 발걸음에는, 전과 다른 깊은 무언가가 묻어 있었다.",
        en: "The mountain spirit took back the gold and the silver. Only the simple iron axe remained in the woodcutter's hand. Yet as he climbed the mountain with it, his step carried something deeper than before — a quiet understanding.",
      },
      image: "/coloring/woodman/ending-quiet.png",
      endingLabel: { ko: "🌿 깨달음의 엔딩", en: "🌿 The Quiet Lesson ending" },
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
      ko: "원작은 정직한 나무꾼과 욕심쟁이 이웃의 대비예요. 우리 버전은 정직하게 답하는 길과 잠시 흔들리는 길 모두를 따라가 보고, 두 가지 결말을 골라볼 수 있어요.",
      en: "The original contrasts the honest woodcutter with a greedy neighbor. Our version lets you walk both paths — answering honestly, or hesitating for a moment — and choose between two endings.",
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
