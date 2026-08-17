export type RealmId =
  | "samsara"
  | "naraka"
  | "preta"
  | "animal"
  | "human"
  | "asura"
  | "deva"
  | "meru"
  | "kama"
  | "rupa"
  | "arupa"
  | "nirvana";

export interface Realm {
  id: RealmId;
  label: string;
  sanskrit: string;
  script?: string;
  subtitle: string;
  paletteClass: string;
  mapLabel?: string;
  mentalState?: string;
  summary: string;
  cosmological: string;
  philosophical: string;
  traditions: string;
  related: string;
  source: string;
}

export const realms: Realm[] = [
  {
    id: "naraka",
    label: "Naraka",
    sanskrit: "Naraka / Niraya",
    script: "नरक",
    subtitle: "The Hell Realms",
    paletteClass: "realm-naraka",
    mapLabel: "HELLS",
    mentalState: "Hatred, aversion, unbearable states",
    summary:
      "Realms traditionally described as places of extreme suffering arising from severely harmful karma. Duration is described as immense, but never eternal.",
    cosmological:
      "Abhidharma sources (notably the Abhidharmakośa) describe eight hot and eight cold hells located beneath Jambudvīpa, with lifespans measured in inconceivable stretches of time.",
    philosophical:
      "Many modern interpreters — and some traditional commentators — also read Naraka as the phenomenology of rage, terror and isolation experienced now. Traditions differ on whether the literal and psychological readings compete or coexist.",
    traditions:
      "Present in Early Buddhist texts, Theravāda, Mahāyāna and Vajrayāna, with differing lists and emphases.",
    related: "Karma, intention (cetanā), remorse, impermanence of all states",
    source: "Devadūta Sutta (MN 130); Abhidharmakośa III",
  },
  {
    id: "preta",
    label: "Preta",
    sanskrit: "Preta / Peta",
    script: "प्रेत",
    subtitle: "The Realm of Hungry Ghosts",
    paletteClass: "realm-preta",
    mapLabel: "HUNGRY GHOSTS",
    mentalState: "Craving, insatiability, possessiveness",
    summary:
      "Beings described with vast hunger and thirst that cannot be satisfied — narrow throats, enormous bellies, water that turns to smoke on approach.",
    cosmological:
      "Traditionally placed beneath or alongside the human world; the Petavatthu of the Pāli canon collects narratives of pretas and the merit dedicated to them.",
    philosophical:
      "Widely read as the structure of addiction and consumption: desire that reproduces itself in the act of being fed. Generosity (dāna) is the classical counter-practice.",
    traditions:
      "Central to Theravāda merit-transfer practice and to East Asian Ullambana / Ghost Festival observances.",
    related: "Taṇhā (craving), dāna (generosity), dedication of merit",
    source: "Petavatthu; Tirokuḍḍa Sutta (Kp 7)",
  },
  {
    id: "animal",
    label: "Tiryagyoni",
    sanskrit: "Tiryagyoni / Tiracchāna",
    script: "तिर्यग्योनि",
    subtitle: "The Animal Realm",
    paletteClass: "realm-animal",
    mapLabel: "ANIMALS",
    mentalState: "Instinct, fear, delusion, unfreedom",
    summary:
      "Existence governed largely by survival, predation and fear, described as offering little opportunity for reflective practice — yet fully sentient and worthy of compassion.",
    cosmological:
      "Counted among the three lower destinations; the term literally suggests 'going horizontally'.",
    philosophical:
      "Read as conditioned, reactive living — moving through the world without stepping back from it. Buddhist ethics extends non-harming (ahiṃsā) to animals across every tradition.",
    traditions:
      "Jātaka literature depicts the Bodhisattva in animal births; Mahāyāna emphasises all beings' capacity for awakening.",
    related: "Ahiṃsā, mettā, the Jātaka tales, sentience",
    source: "Bālapaṇḍita Sutta (MN 129); Jātaka collection",
  },
  {
    id: "human",
    label: "Manuṣya",
    sanskrit: "Manuṣya / Manussa",
    script: "मनुष्य",
    subtitle: "The Realm of Rare Opportunity",
    paletteClass: "realm-human",
    mapLabel: "HUMANS",
    mentalState: "Desire mixed with reflection and choice",
    summary:
      "The human realm mixes pleasure and pain in proportions that make awakening possible — enough suffering to motivate, enough freedom to act.",
    cosmological:
      "Humans inhabit Jambudvīpa, the southern continent of the Meru cosmos in classical descriptions.",
    philosophical:
      "Tibetan traditions elaborate this as the 'precious human birth' with its eight freedoms and ten endowments. Early sources make a similar point with the simile of the blind turtle surfacing through a floating yoke.",
    traditions:
      "Emphasis on 'precious human rebirth' is strongest in Tibetan lam-rim literature; the underlying idea appears across traditions.",
    related: "Precious human birth, the four reminders, mindfulness of death",
    source: "Chiggaḷa Sutta (SN 56.48); Gampopa, Jewel Ornament of Liberation",
  },
  {
    id: "asura",
    label: "Asura",
    sanskrit: "Asura",
    script: "असुर",
    subtitle: "The Realm of Rivalry",
    paletteClass: "realm-asura",
    mapLabel: "ASURAS",
    mentalState: "Envy, competition, ambition, pride",
    summary:
      "Powerful, long-lived beings described as perpetually contesting the devas for the fruits of the wish-fulfilling tree on Meru's slopes.",
    cosmological:
      "Some schemes count six realms including asuras; others count five, folding asuras among devas or pretas. Both enumerations are traditional.",
    philosophical:
      "A portrait of comparison itself: abundance experienced as deprivation because someone else has more.",
    traditions:
      "The six-realm scheme is standard in Tibetan and East Asian art; several Pāli passages use a five-destination list.",
    related: "Māna (conceit), issā (envy), the Sakka narratives",
    source: "Sakkasaṃyutta (SN 11); Abhidharmakośa III",
  },
  {
    id: "deva",
    label: "Deva",
    sanskrit: "Deva",
    script: "देव",
    subtitle: "The Heavenly Realms",
    paletteClass: "realm-deva",
    mapLabel: "DEVAS",
    mentalState: "Bliss, absorption, forgetfulness of urgency",
    summary:
      "Radiant beings of immense lifespan and pleasure. Their danger is not pain but distraction: bliss postpones the question of liberation.",
    cosmological:
      "Six desire-realm heavens are commonly listed: Cāturmahārājika, Trāyastriṃśa, Yāma, Tuṣita, Nirmāṇarati, Paranirmitavaśavartin.",
    philosophical:
      "'Even heaven is impermanent.' Divine states end, and the signs of their ending are described with unusual tenderness in the texts.",
    traditions:
      "The list above is shared broadly; Mahāyāna adds Buddha-fields as a distinct category, not simply higher heavens.",
    related: "Impermanence, merit, the five signs of a deva's decline",
    source: "Abhidharmakośa III; Aṅguttara Nikāya passages on devas",
  },
];

export const mapNodes = [
  { id: "nirvana" as RealmId, label: "NIRVĀṆA", note: "not a realm" },
  { id: "arupa" as RealmId, label: "FORMLESS REALMS" },
  { id: "rupa" as RealmId, label: "FORM REALMS" },
  { id: "deva" as RealmId, label: "DEVAS" },
  { id: "asura" as RealmId, label: "ASURAS" },
  { id: "human" as RealmId, label: "HUMANS" },
  { id: "animal" as RealmId, label: "ANIMALS" },
  { id: "preta" as RealmId, label: "HUNGRY GHOSTS" },
  { id: "naraka" as RealmId, label: "HELLS" },
];

export const hotHells = [
  { name: "Sañjīva", meaning: "Reviving", note: "Beings are described as restored again and again — suffering that renews itself." },
  { name: "Kālasūtra", meaning: "Black Thread", note: "Named for marking lines: measured, deliberate harm returning as measured pain." },
  { name: "Saṃghāta", meaning: "Crushing", note: "Vast mountains close together — the weight of what was set in motion." },
  { name: "Raurava", meaning: "Wailing", note: "A realm characterised by cries rather than images." },
  { name: "Mahāraurava", meaning: "Great Wailing", note: "The same intensified; scale is the traditional idiom of severity." },
  { name: "Tapana", meaning: "Heating", note: "Heat without relief, a metaphor drawn on constantly in the suttas." },
  { name: "Pratāpana", meaning: "Great Heating", note: "Intensification again — texts emphasise duration over description." },
  { name: "Avīci", meaning: "Without Interval", note: "The deepest hell: no pause, no gap. Yet even Avīci is described as exhaustible." },
];

export const coldHells = [
  { name: "Arbuda", meaning: "Blistering" },
  { name: "Nirarbuda", meaning: "Bursting Blisters" },
  { name: "Aṭaṭa", meaning: "Chattering" },
  { name: "Hahava", meaning: "Lamentation" },
  { name: "Huhuva", meaning: "Shuddering" },
  { name: "Utpala", meaning: "Blue Lotus" },
  { name: "Padma", meaning: "Lotus" },
  { name: "Mahāpadma", meaning: "Great Lotus" },
];

export const nidanas = [
  { n: 1, pali: "Avijjā", sanskrit: "Avidyā", en: "Ignorance", plain: "Not seeing how things actually work.", deep: "Ignorance of the four truths and of dependent arising; not mere lack of data but a habitual misreading." },
  { n: 2, pali: "Saṅkhārā", sanskrit: "Saṃskāra", en: "Formations", plain: "Habitual intentional activity.", deep: "Volitional formations of body, speech and mind that condition consciousness; karmically potent." },
  { n: 3, pali: "Viññāṇa", sanskrit: "Vijñāna", en: "Consciousness", plain: "Awareness arising in a situation.", deep: "Discriminative consciousness, conditioned by formations and conditioning name-and-form reciprocally." },
  { n: 4, pali: "Nāmarūpa", sanskrit: "Nāmarūpa", en: "Name & Form", plain: "Mind and body as one process.", deep: "The psycho-physical organism; the Mahānidāna Sutta describes its mutual dependence with consciousness." },
  { n: 5, pali: "Saḷāyatana", sanskrit: "Ṣaḍāyatana", en: "Six Sense Bases", plain: "Eyes, ears, nose, tongue, body, mind.", deep: "The six internal spheres through which experience becomes possible." },
  { n: 6, pali: "Phassa", sanskrit: "Sparśa", en: "Contact", plain: "Meeting of sense, object and awareness.", deep: "Not physical touch but the coincidence of the three that makes an experience an experience." },
  { n: 7, pali: "Vedanā", sanskrit: "Vedanā", en: "Feeling", plain: "Pleasant, unpleasant, neutral tone.", deep: "The affective valence of contact — the classical hinge where practice can interrupt the sequence." },
  { n: 8, pali: "Taṇhā", sanskrit: "Tṛṣṇā", en: "Craving", plain: "Wanting more, wanting away.", deep: "Craving for sensuality, for existence, for non-existence." },
  { n: 9, pali: "Upādāna", sanskrit: "Upādāna", en: "Clinging", plain: "Craving that has taken hold.", deep: "Clinging to sensuality, views, rites, and doctrines of self." },
  { n: 10, pali: "Bhava", sanskrit: "Bhava", en: "Becoming", plain: "A way of being takes shape.", deep: "Read cosmologically as movement toward rebirth, psychologically as identity-construction." },
  { n: 11, pali: "Jāti", sanskrit: "Jāti", en: "Birth", plain: "It comes into the world.", deep: "Rebirth across lifetimes in classical readings; the arising of a self-position in momentary readings." },
  { n: 12, pali: "Jarāmaraṇa", sanskrit: "Jarāmaraṇa", en: "Ageing & Death", plain: "And then it ends.", deep: "With it: sorrow, lamentation, pain, grief and despair — the whole mass of suffering." },
];

export const poisons = [
  { id: "greed", label: "Greed / Craving", sanskrit: "Rāga / Lobha", animal: "Traditionally depicted as a cock", text: "The pull toward what promises completion. It does not end by being fed." },
  { id: "hatred", label: "Hatred / Aversion", sanskrit: "Dveṣa / Dosa", animal: "Traditionally depicted as a snake", text: "The push against what is. It narrows the world to a threat." },
  { id: "delusion", label: "Delusion / Ignorance", sanskrit: "Moha / Avidyā", animal: "Traditionally depicted as a pig", text: "Not seeing clearly. In most depictions the other two emerge from its mouth." },
];

export const buddhas = [
  { name: "Gautama Buddha", alt: "Śākyamuni", text: "The historical teacher of this era. Recognised across all Buddhist traditions, though Mahāyāna sources also read him through the doctrine of the three bodies (trikāya).", tradition: "All traditions" },
  { name: "Amitābha", alt: "Amida / 阿弥陀", text: "Buddha of Infinite Light, associated with the Pure Land Sukhāvatī. Central to East Asian Pure Land schools; not a feature of Theravāda cosmology.", tradition: "Mahāyāna, East Asian, Vajrayāna" },
  { name: "Akṣobhya", alt: "The Immovable", text: "Associated with the eastern Buddha-field Abhirati and with the transformation of anger into mirror-like wisdom in tantric systems.", tradition: "Mahāyāna, Vajrayāna" },
  { name: "Vairocana", alt: "The Illuminator", text: "Central figure of the Avataṃsaka and of Shingon and Tibetan tantric maṇḍalas; in some systems the cosmic centre itself.", tradition: "Mahāyāna, Vajrayāna, East Asian esoteric" },
  { name: "Ratnasambhava", alt: "Jewel-Born", text: "Southern Buddha of the five-family maṇḍala, linked with equanimity and the transformation of pride.", tradition: "Vajrayāna" },
  { name: "Amoghasiddhi", alt: "Unfailing Accomplishment", text: "Northern Buddha of the five-family maṇḍala, associated with all-accomplishing wisdom and the transformation of envy.", tradition: "Vajrayāna" },
  { name: "Maitreya", alt: "Metteyya / 弥勒", text: "The Buddha of a future era, presently described as residing in Tuṣita heaven. Accepted broadly, including in Theravāda.", tradition: "All traditions, with differing emphases" },
];

export const pureLands = [
  { name: "Sukhāvatī", sanskrit: "सुखावती", buddha: "Amitābha", text: "The Land of Bliss in the west. Described in the longer and shorter Sukhāvatīvyūha sūtras as a field where conditions for awakening are unobstructed — not as a permanent paradise.", tradition: "Mahāyāna / Pure Land" },
  { name: "Abhirati", sanskrit: "अभिरति", buddha: "Akṣobhya", text: "The Land of Delight in the east, described in the Akṣobhyavyūha. An older Buddha-field concept than Sukhāvatī in some scholarly accounts.", tradition: "Mahāyāna" },
  { name: "Tuṣita", sanskrit: "तुषित", buddha: "Maitreya (as bodhisattva)", text: "Strictly a desire-realm heaven rather than a Buddha-field, yet often approached devotionally. Distinguishing the two categories matters: Tuṣita remains inside Saṃsāra.", tradition: "All traditions; devotional focus varies" },
];

export const traditionsData = [
  { id: "early", label: "Early Buddhism", text: "The Nikāya/Āgama strata describe realms of rebirth, Mount Sineru, deva assemblies and Brahmā worlds, usually in narrative or pedagogical rather than systematic form. Cosmology appears alongside the teaching, not as a separate science.", differs: "Lists vary: five destinations in some suttas, six where asuras are counted separately." },
  { id: "theravada", label: "Theravāda", text: "Systematised in the Abhidhamma and later manuals such as the Visuddhimagga and the Traibhūmikathā, with 31 planes of existence mapped to states of consciousness and meditative attainment.", differs: "No Buddha-fields; Nibbāna is emphatically not a plane. Rebirth in a heaven is meritorious but not the goal." },
  { id: "mahayana", label: "Mahāyāna", text: "Retains the earlier scheme and adds innumerable world-systems and Buddha-fields, plus the bodhisattva's vow to remain engaged with Saṃsāra.", differs: "Pure Lands are a distinct category from heavens; some sūtras describe the whole cosmos as the display of a Buddha's awakening." },
  { id: "vajrayana", label: "Vajrayāna", text: "Uses the Meru cosmos as ritual architecture: maṇḍala offerings, stūpa design and body-maṇḍala practice map cosmology onto the practitioner.", differs: "Realms are also read as energetic and psychological configurations available in this life." },
  { id: "tibetan", label: "Tibetan Traditions", text: "Lam-rim literature foregrounds the six realms as motivation: contemplating them generates renunciation and compassion. The Kālacakra tradition offers an alternative cosmological model to the Abhidharmakośa.", differs: "Kālacakra and Abhidharmakośa cosmologies disagree in detail, and Tibetan scholars have debated this for centuries." },
  { id: "eastasian", label: "East Asian Traditions", text: "Huayan describes an interpenetrating universe of mutually reflecting worlds; Tiantai maps the ten realms as mutually inherent, each containing all others. Chan/Zen often reads the realms as present states of mind.", differs: "The '3000 realms in a single thought-moment' formulation makes cosmology explicitly a matter of mind." },
];

export const glossary = [
  { term: "Saṃsāra", script: "संसार", lang: "Sanskrit", tradition: "All", def: "The cycle of conditioned existence: repeated arising, ageing and passing away, driven by craving and ignorance." },
  { term: "Nirvāṇa", script: "निर्वाण", lang: "Sanskrit (Pāli: Nibbāna)", tradition: "All", def: "The extinguishing of the fires of greed, hatred and delusion; the cessation of suffering. Not a place." },
  { term: "Karma", script: "कर्म", lang: "Sanskrit (Pāli: Kamma)", tradition: "All", def: "Intentional action and its results. In Buddhist usage the emphasis falls on intention (cetanā), not fate." },
  { term: "Dharma", script: "धर्म", lang: "Sanskrit (Pāli: Dhamma)", tradition: "All", def: "The teaching; also 'phenomenon' or 'the way things are', depending on context." },
  { term: "Naraka", script: "नरक", lang: "Sanskrit", tradition: "All", def: "Hell realms; states of intense suffering, long-lasting but not eternal." },
  { term: "Preta", script: "प्रेत", lang: "Sanskrit (Pāli: Peta)", tradition: "All", def: "Hungry ghost; a being characterised by insatiable craving." },
  { term: "Asura", script: "असुर", lang: "Sanskrit", tradition: "Six-realm schemes", def: "Titan or anti-god, associated with rivalry and envy." },
  { term: "Deva", script: "देव", lang: "Sanskrit", tradition: "All", def: "A radiant celestial being; long-lived and pleasurable, but still within Saṃsāra." },
  { term: "Brahmā", script: "ब्रह्मा", lang: "Sanskrit", tradition: "All", def: "Inhabitant of the form and formless realms, associated with meditative attainment rather than sensual pleasure." },
  { term: "Meru", script: "सुमेरु", lang: "Sanskrit", tradition: "Abhidharma cosmology", def: "The world-mountain at the centre of the classical cosmos, surrounded by oceans and continents." },
  { term: "Kāmadhātu", script: "कामधातु", lang: "Sanskrit", tradition: "All", def: "The desire realm: hells through the six lower heavens, characterised by sensory craving." },
  { term: "Rūpadhātu", script: "रूपधातु", lang: "Sanskrit", tradition: "All", def: "The form realm: the Brahmā worlds, correlated with the four jhānas/dhyānas." },
  { term: "Arūpadhātu", script: "अरूपधातु", lang: "Sanskrit", tradition: "All", def: "The formless realm: four attainments beyond materiality." },
  { term: "Jhāna", script: "झान", lang: "Pāli", tradition: "Theravāda", def: "Meditative absorption; four (or in some schemes five) stages of unified attention." },
  { term: "Dhyāna", script: "ध्यान", lang: "Sanskrit", tradition: "Mahāyāna, Vajrayāna", def: "The Sanskrit equivalent of jhāna; source of the words Chan and Zen." },
  { term: "Bodhisattva", script: "बोधिसत्त्व", lang: "Sanskrit", tradition: "All, emphasised in Mahāyāna", def: "A being oriented toward full awakening, in Mahāyāna for the sake of all beings." },
  { term: "Buddha-field", script: "बुद्धक्षेत्र", lang: "Sanskrit (buddhakṣetra)", tradition: "Mahāyāna", def: "A world-system associated with a particular Buddha, where conditions favour awakening." },
  { term: "Sukhāvatī", script: "सुखावती", lang: "Sanskrit", tradition: "Mahāyāna / Pure Land", def: "The Land of Bliss, the Buddha-field of Amitābha." },
  { term: "Bhavacakra", script: "भवचक्र", lang: "Sanskrit", tradition: "Tibetan, East Asian art", def: "The Wheel of Becoming: a diagram of Saṃsāra held by Yama, impermanence." },
  { term: "Pratītyasamutpāda", script: "प्रतीत्यसमुत्पाद", lang: "Sanskrit", tradition: "All", def: "Dependent origination: nothing arises independently; the twelve links describe the arising of suffering." },
  { term: "Tuṣita", script: "तुषित", lang: "Sanskrit", tradition: "All", def: "The Contented Heaven; described as the current abode of the bodhisattva Maitreya." },
  { term: "Trikāya", script: "त्रिकाय", lang: "Sanskrit", tradition: "Mahāyāna", def: "The three-body doctrine describing the modes in which a Buddha is said to appear." },
];

export const sources = [
  {
    group: "Primary Buddhist Texts",
    items: [
      "Majjhima Nikāya 130, Devadūta Sutta — the divine messengers and Naraka",
      "Majjhima Nikāya 129, Bālapaṇḍita Sutta — the fool and the wise one across realms",
      "Dīgha Nikāya 15, Mahānidāna Sutta — dependent origination in detail",
      "Saṃyutta Nikāya 12 (Nidānasaṃyutta) — the twelve links",
    ],
  },
  {
    group: "Theravāda Sources",
    items: [
      "Buddhaghosa, Visuddhimagga — jhāna and the planes of existence",
      "Anuruddha, Abhidhammattha-saṅgaha — the 31 planes",
      "Petavatthu and its commentary — narratives of the preta realm",
    ],
  },
  {
    group: "Mahāyāna Sources",
    items: [
      "Longer and Shorter Sukhāvatīvyūha Sūtras — Sukhāvatī",
      "Akṣobhyavyūha Sūtra — Abhirati",
      "Avataṃsaka Sūtra — interpenetrating world-systems",
      "Vasubandhu, Abhidharmakośabhāṣya, chapter III — the classical cosmos",
    ],
  },
  {
    group: "Tibetan / Vajrayāna Sources",
    items: [
      "Gampopa, Jewel Ornament of Liberation — precious human birth, the six realms",
      "Patrul Rinpoche, Words of My Perfect Teacher — the realms as contemplation",
      "Kālacakra Tantra literature — an alternative cosmological model",
    ],
  },
  {
    group: "Academic Scholarship",
    items: [
      "Rupert Gethin, The Foundations of Buddhism (1998)",
      "Randy Kloetzli, Buddhist Cosmology (1983)",
      "W. Randolph Kloetzli & Akira Sadakata, Buddhist Cosmology: Philosophy and Origins (1997)",
      "Rupert Gethin, 'Cosmology and Meditation: From the Aggañña Sutta to the Mahāyāna', History of Religions 36 (1997)",
    ],
  },
  {
    group: "Modern Interpretations",
    items: [
      "Chögyam Trungpa, Transcending Madness — the six realms as psychological states",
      "Thich Nhat Hanh, The Heart of the Buddha's Teaching — accessible readings of dependent origination",
      "Bhikkhu Bodhi (trans.), In the Buddha's Words — anthology with cosmological context",
    ],
  },
];
