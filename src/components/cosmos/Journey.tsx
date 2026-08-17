import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RealmScene, RealmTitle, Card } from "./Atmosphere";
import { CosmicMap } from "./CosmicMap";
import { TopNav } from "./TopNav";
import { MeditationOverlay } from "./MeditationOverlay";
import { AmbientSound } from "./AmbientSound";
import { WheelOfLife } from "./WheelOfLife";
import { MountMeru } from "./MountMeru";
import { RealmExplorer } from "./RealmExplorer";
import { Glossary } from "./Glossary";
import { Traditions } from "./Traditions";
import { Sources } from "./Sources";
import { CravingOrb } from "./CravingOrb";
import { HumanTimeline } from "./HumanTimeline";
import { useActiveRealm } from "./useActiveRealm";
import { useJourney } from "./JourneyContext";
import { realms, hotHells, coldHells, buddhas, pureLands, poisons } from "@/lib/cosmology";

const wrap = "mx-auto w-full max-w-[1200px] px-6 py-28 sm:py-36";

function Mandala({ className, rings = 6 }: { className?: string; rings?: number }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      {Array.from({ length: rings }).map((_, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={12 + i * 13}
          fill="none"
          stroke="var(--saffron)"
          strokeOpacity={0.28 - i * 0.02}
          strokeWidth="0.6"
          strokeDasharray={i % 2 ? "2 6" : undefined}
        />
      ))}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 20}
            y1={100 + Math.sin(a) * 20}
            x2={100 + Math.cos(a) * 92}
            y2={100 + Math.sin(a) * 92}
            stroke="var(--saffron)"
            strokeOpacity="0.12"
            strokeWidth="0.5"
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8;
        return (
          <ellipse
            key={i}
            cx={100 + Math.cos(a) * 52}
            cy={100 + Math.sin(a) * 52}
            rx="16"
            ry="7"
            fill="none"
            stroke="var(--saffron)"
            strokeOpacity="0.22"
            transform={`rotate(${(i * 360) / 8} ${100 + Math.cos(a) * 52} ${100 + Math.sin(a) * 52})`}
          />
        );
      })}
    </svg>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useJourney();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <RealmScene
      id="cosmos"
      palette="realm-cosmos"
      particles="stars"
      density={1.6}
      className="relative min-h-screen"
      layers={
        <motion.div style={{ scale, opacity }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Mandala className="w-[130vmin] animate-spin-slow opacity-40" rings={8} />
        </motion.div>
      }
    >
      <motion.div
        ref={ref as never}
        style={{ y, opacity }}
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="eyebrow"
        >
          An interactive cosmology
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-6xl leading-[0.98] sm:text-8xl"
        >
          The Worlds of Buddhism
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.0 }}
          className="mt-5 text-xl text-muted-foreground sm:text-2xl"
        >
          A Journey Through Buddhist Cosmology
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.5 }}
          className="mt-8 max-w-2xl text-base text-muted-foreground"
        >
          Explore the realms of existence, consciousness, suffering, awakening, and liberation described across
          Buddhist traditions.
        </motion.p>
        <motion.a
          href="#samsara"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 2.0 }}
          className="mt-12 rounded-full border border-primary/60 px-7 py-3 text-sm tracking-[0.22em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Begin the Journey ↓
        </motion.a>
      </motion.div>
    </RealmScene>
  );
}

function RealmIntro({ id }: { id: string }) {
  const r = realms.find((x) => x.id === id)!;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card source={r.source}>
        <p className="eyebrow mb-2">Cosmological description</p>
        <p className="text-sm text-muted-foreground">{r.cosmological}</p>
      </Card>
      <Card>
        <p className="eyebrow mb-2">Philosophical & psychological readings</p>
        <p className="text-sm text-muted-foreground">{r.philosophical}</p>
        <p className="mt-3 text-xs text-muted-foreground">Traditions: {r.traditions}</p>
      </Card>
    </div>
  );
}

export function Journey() {
  useActiveRealm();

  return (
    <>
      <TopNav />
      <CosmicMap />
      <MeditationOverlay />
      <AmbientSound />

      <main id="top">
        <h1 className="sr-only">The Worlds of Buddhism — a journey through Buddhist cosmology</h1>
        <Hero />

        {/* SAṂSĀRA */}
        <RealmScene id="samsara" palette="realm-cosmos" particles="motes" density={1.1}>
          <div className={wrap}>
            <RealmTitle
              eyebrow="The wheel of becoming"
              title="Saṃsāra"
              script="संसार"
              subtitle="The Cycle of Conditioned Existence"
            />
            <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
              <div className="relative mx-auto w-full max-w-md">
                <Mandala className="w-full animate-spin-slow" rings={7} />
                <div className="pointer-events-none absolute inset-0 animate-glow rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--saffron)_18%,transparent),transparent_60%)]" />
              </div>
              <div className="space-y-5 text-base text-muted-foreground">
                <p>
                  Buddhist traditions describe existence as a cycle: beings arise, act, age, die and arise again,
                  moved by craving and by not seeing clearly. This is Saṃsāra — literally, wandering on.
                </p>
                <p>
                  Karma here means intentional action, not destiny. Actions condition tendencies; tendencies condition
                  worlds. Dependent origination (pratītyasamutpāda) describes this conditioning without appealing to a
                  creator or an unchanging self.
                </p>
                <p>
                  Because everything within the cycle is impermanent, no state inside it is final — not the deepest
                  hell, not the highest heaven. Liberation is described as stepping out of the mechanism altogether.
                </p>
                <p className="text-sm">
                  The six realms below can be read as destinations of rebirth, as states of mind, or as both. This site
                  presents these readings side by side rather than ranking them.
                </p>
                <a
                  href="#naraka"
                  className="inline-block rounded-full border border-primary/60 px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Descend into the realms ↓
                </a>
              </div>
            </div>
          </div>
        </RealmScene>

        {/* NARAKA */}
        <RealmScene id="naraka" palette="realm-naraka" particles="embers" density={1.4}>
          <div className={wrap}>
            <RealmTitle eyebrow="Realm I" title="Naraka" script="नरक" subtitle="The Hell Realms" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Realms traditionally associated with extreme suffering arising from severely harmful karma. Suffering is
              represented here through environment, scale and isolation rather than through depictions of violence.
            </p>
            <div className="mt-12">
              <RealmIntro id="naraka" />
            </div>

            <h3 className="mt-20 text-3xl">The Eight Hot Hells</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {hotHells.map((h) => (
                <Card key={h.name} className="hover:border-primary/40">
                  <p className="sanskrit text-xl">{h.name}</p>
                  <p className="eyebrow mt-1">{h.meaning}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{h.note}</p>
                </Card>
              ))}
            </div>

            <div className="realm-cold mt-24 rounded-3xl border border-border p-8 sm:p-12">
              <h3 className="text-3xl">The Eight Cold Hells</h3>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Vast frozen plains, blue-white light, and silence. The names describe sounds a body makes in cold, and
                the shapes cold makes of a body — traditional imagery that stays deliberately abstract.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {coldHells.map((c) => (
                  <li key={c.name} className="glass rounded-lg p-4">
                    <p className="sanskrit text-lg">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="mt-16 max-w-3xl" source="MN 130; Abhidharmakośa III; Trungpa, Transcending Madness">
              <h3 className="text-2xl">What does Naraka mean philosophically?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Classical Abhidharma treats Naraka as a genuine location within the cosmos. Many commentators also
                read it ethically — as the natural ripening of cruelty — and psychologically, as the experience of
                rage or despair from the inside. Modern teachers frequently emphasise the psychological reading;
                traditional scholastic sources generally do not treat that reading as replacing the cosmological one.
                Both remain live within Buddhist thought.
              </p>
            </Card>
          </div>
        </RealmScene>

        {/* PRETA */}
        <RealmScene id="preta" palette="realm-preta" particles="dust" density={1.2}>
          <div className={wrap}>
            <RealmTitle eyebrow="Realm II" title="Preta" script="प्रेत" subtitle="The Realm of Hungry Ghosts" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              A twilight desert of distant lights and unreachable water. Pretas are described with vast appetite and
              no capacity for satisfaction: craving, addiction, possessiveness, dissatisfaction that grows by being fed.
            </p>
            <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
              <CravingOrb />
              <div className="space-y-4">
                <RealmIntro id="preta" />
              </div>
            </div>
          </div>
        </RealmScene>

        {/* ANIMAL */}
        <RealmScene id="animal" palette="realm-animal" particles="motes" density={1}>
          <div className={wrap}>
            <RealmTitle eyebrow="Realm III" title="Tiryagyoni" script="तिर्यग्योनि" subtitle="The Animal Realm" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Forests, oceans, air and undergrowth. A world of instinct, vulnerability and predation — described as
              offering little space for reflection, yet fully sentient, and therefore fully within the scope of
              compassion.
            </p>
            <svg viewBox="0 0 800 140" aria-hidden className="mt-12 w-full opacity-60">
              <path d="M0 120 Q100 70 200 118 T400 116 T600 120 T800 112 V140 H0 Z" fill="color-mix(in oklab, var(--realm-a) 25%, transparent)" />
              <g fill="var(--foreground)" opacity="0.45">
                <ellipse cx="120" cy="112" rx="18" ry="7" />
                <rect x="112" y="112" width="3" height="9" />
                <rect x="130" y="112" width="3" height="9" />
                <circle cx="140" cy="104" r="5" />
                <path d="M300 100 l14 -7 l-4 8 l10 2 l-20 5 z" />
                <path d="M520 118 q12 -14 26 0 q-13 6 -26 0 z" />
                <circle cx="660" cy="106" r="4" />
                <path d="M655 110 q6 8 14 2" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
              </g>
            </svg>
            <div className="mt-10">
              <RealmIntro id="animal" />
            </div>
          </div>
        </RealmScene>

        {/* HUMAN */}
        <RealmScene id="human" palette="realm-human" particles="motes" density={1.1}>
          <div className={wrap}>
            <RealmTitle eyebrow="Realm IV" title="The Human Realm" script="मनुष्य" subtitle="The Realm of Rare Opportunity" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Sunrise over cities, villages, monasteries and roads. Pleasure and suffering are mixed here in
              proportions that make practice possible: enough difficulty to motivate, enough freedom to choose.
            </p>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <RealmIntro id="human" />
            </div>
            <div className="mt-10">
              <HumanTimeline />
            </div>
          </div>
        </RealmScene>

        {/* ASURA */}
        <RealmScene id="asura" palette="realm-asura" particles="dust" density={1.1}>
          <div className={wrap}>
            <RealmTitle eyebrow="Realm V" title="Asura" script="असुर" subtitle="The Realm of Rivalry" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Storm-light on enormous mountains. Asuras are described as powerful and long-lived, and as spending that
              power contesting what the devas have.
            </p>
            <div className="mt-12 flex h-56 items-end justify-center gap-8" aria-hidden>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["45%", "92%", "58%"] }}
                  transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", delay: i * 4.5, ease: "easeInOut" }}
                  className="w-24 rounded-t-md bg-gradient-to-t from-transparent to-[color-mix(in_oklab,var(--realm-a)_55%,transparent)]"
                />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Two celestial structures, each continually rising above the other.
            </p>
            <div className="mt-12">
              <RealmIntro id="asura" />
            </div>
          </div>
        </RealmScene>

        {/* DEVA */}
        <RealmScene id="deva" palette="realm-deva" particles="motes" density={1.3}>
          <div className={wrap}>
            <RealmTitle eyebrow="Realm VI" title="Deva" script="देव" subtitle="The Heavenly Realms" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Above the clouds: floating architecture, lotus forms, golden air. Buddhist heavens are not eternal
              destinations. Extraordinary pleasure is still a conditioned state, and conditioned states end.
            </p>
            <p className="display mt-10 text-4xl text-primary sm:text-5xl">Even heaven is impermanent.</p>
            <div className="mt-12">
              <RealmIntro id="deva" />
            </div>
            <Card className="mt-8 max-w-3xl" source="Abhidharmakośa III; Theravāda Abhidhamma manuals">
              <p className="eyebrow mb-2">The six desire-realm heavens</p>
              <p className="text-sm text-muted-foreground">
                Cāturmahārājika · Trāyastriṃśa · Yāma · Tuṣita · Nirmāṇarati · Paranirmitavaśavartin. This enumeration
                follows the Abhidharma framework shared broadly by Theravāda and North Indian schools; higher
                Brahmā worlds are counted separately and vary between traditions.
              </p>
            </Card>
          </div>
        </RealmScene>

        {/* MOUNT MERU */}
        <RealmScene id="meru" palette="realm-cosmos" particles="stars" density={1.2}>
          <div className={wrap}>
            <RealmTitle eyebrow="Zooming outward" title="Mount Meru" script="सुमेरु" subtitle="The classical structure of the world" />
            <div className="mt-12">
              <MountMeru />
            </div>
          </div>
        </RealmScene>

        {/* KĀMADHĀTU */}
        <RealmScene id="kama" palette="realm-human" particles="motes" density={0.9}>
          <div className={wrap}>
            <RealmTitle eyebrow="The three domains — I" title="Kāmadhātu" script="कामधातु" subtitle="The Realm of Desire" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Everything travelled so far belongs to one domain. From the deepest hell to the highest desire heaven,
              existence here is organised by the senses and by wanting.
            </p>
            <ol className="mt-12 space-y-2">
              {[
                "Paranirmitavaśavartin — devas who enjoy others' creations",
                "Nirmāṇarati — devas who delight in their own creations",
                "Tuṣita — the contented heaven",
                "Yāma — the heaven free of conflict",
                "Trāyastriṃśa — the thirty-three, at Meru's summit",
                "Cāturmahārājika — the four great kings",
                "Asuras",
                "Humans — the four continents",
                "Animals",
                "Pretas",
                "Naraka — hot and cold hells",
              ].map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className="glass flex items-center gap-4 rounded-lg px-5 py-3 text-sm"
                  style={{ marginLeft: `${Math.abs(5 - i) * 4}px` }}
                >
                  <span className="size-1.5 rounded-full bg-primary/70" />
                  {l}
                </motion.li>
              ))}
            </ol>
          </div>
        </RealmScene>

        {/* RŪPADHĀTU */}
        <RealmScene id="rupa" palette="realm-form" particles="motes" density={0.8}>
          <div className={wrap}>
            <RealmTitle eyebrow="The three domains — II" title="Rūpadhātu" script="रूपधातु" subtitle="The Realm of Form" />
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">
              Mountains dissolve into geometry; architecture dissolves into light. The Brahmā worlds are described in
              correlation with the meditative absorptions — the four jhānas or dhyānas — so that the map of the cosmos
              and the map of consciousness begin to coincide.
            </p>
            <div className="mt-16 space-y-6" aria-hidden>
              {[1, 2, 3, 4].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  whileInView={{ opacity: 1 - n * 0.12, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: n * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[var(--realm-a)] to-transparent"
                  style={{ maxWidth: `${90 - n * 12}%` }}
                />
              ))}
            </div>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["First dhyāna", "Brahmā worlds: Brahmakāyika, Brahmapurohita, Mahābrahmā"],
                ["Second dhyāna", "Ābhāsvara and companion worlds of radiance"],
                ["Third dhyāna", "Śubhakṛtsna and worlds of pervasive beauty"],
                ["Fourth dhyāna", "Bṛhatphala and the five Pure Abodes (Śuddhāvāsa)"],
              ].map(([a, b]) => (
                <Card key={a}>
                  <p className="text-lg">{a}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{b}</p>
                </Card>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
              Enumerations of the form realms differ: Theravāda Abhidhamma counts sixteen, Sarvāstivāda schemes
              seventeen or eighteen.
            </p>
          </div>
        </RealmScene>

        {/* ARŪPADHĀTU */}
        <RealmScene id="arupa" palette="realm-formless" particles="stars" density={0.6}>
          <div className={`${wrap} text-center`}>
            <RealmTitle eyebrow="The three domains — III" title="Arūpadhātu" script="अरूपधातु" subtitle="The Formless Realm" />
            <div className="mt-20 space-y-24">
              {[
                ["Infinite Space", "Ākāśānantyāyatana", "There is no object, only extension."],
                ["Infinite Consciousness", "Vijñānānantyāyatana", "Awareness itself becomes the field."],
                ["Nothingness", "Ākiñcanyāyatana", "Not a void, but the absence of anything to take up."],
                ["Neither Perception Nor Non-Perception", "Naivasaṃjñānāsaṃjñāyatana", "So subtle that even the word for it hesitates."],
              ].map(([a, b, c], i) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, filter: "blur(14px)" }}
                  whileInView={{ opacity: 1 - i * 0.14, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-25%" }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-4xl sm:text-6xl">{a}</h3>
                  <p className="sanskrit mt-2 text-lg">{b}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </RealmScene>

        {/* AND YET */}
        <RealmScene id="andyet" palette="realm-formless" particles="stars" density={0.4}>
          <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="display text-5xl sm:text-7xl"
            >
              And Yet…
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 1.6 }}
              className="mt-12 max-w-2xl text-2xl text-muted-foreground"
            >
              None of these worlds is liberation.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 2.6 }}
              className="mt-8 max-w-2xl text-sm text-muted-foreground"
            >
              Buddhist traditions distinguish even the most refined cosmological and meditative states from final
              freedom. However long a state lasts, if it arose from conditions it will end with them. The whole
              structure — hells, continents, heavens, absorptions — remains inside the cycle.
            </motion.p>
          </div>
        </RealmScene>

        {/* NIRVĀṆA */}
        <section id="nirvana" className="realm-nirvana relative min-h-screen overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,color-mix(in_oklab,var(--realm-a)_7%,transparent),transparent_70%)]" />
          <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3 }}
              className="text-6xl sm:text-8xl"
            >
              Nirvāṇa
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: 1.2 }}
              className="sanskrit mt-4 text-2xl"
            >
              निर्वाण · Beyond the Cycle
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: 2.2 }}
              className="mt-14 space-y-6 text-base text-muted-foreground"
            >
              <p>
                Nirvāṇa is not placed at the top of the cosmological hierarchy, because it is not a location within
                it. The word points to extinguishing: the going out of the fires of craving, aversion and ignorance.
              </p>
              <p>
                Traditions describe it mostly by what it is not — unborn, unmade, unconditioned — and consistently
                resist treating it as a heaven that one might be reborn into. What ends is the mechanism of rebirth
                itself.
              </p>
              <p className="text-sm">
                Cessation · liberation · freedom from craving · freedom from ignorance · the ending of the cycle ·
                awakening
              </p>
              <p className="text-xs">Source: Udāna 8.3; Nāgārjuna, Mūlamadhyamakakārikā 25; Theravāda and Mahāyāna interpretations differ substantially.</p>
            </motion.div>
          </div>
        </section>

        {/* TEACHINGS: Buddhas & Pure Lands */}
        <RealmScene id="teachings" palette="realm-deva" particles="motes" density={1}>
          <div className={wrap}>
            <RealmTitle eyebrow="Figures" title="The Buddhas" subtitle="Their cosmological roles differ substantially between traditions." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {buddhas.map((b) => (
                <Card key={b.name}>
                  <h3 className="text-2xl">{b.name}</h3>
                  <p className="sanskrit text-base">{b.alt}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{b.text}</p>
                  <p className="mt-3 text-[0.68rem] tracking-widest uppercase text-muted-foreground/80">{b.tradition}</p>
                </Card>
              ))}
            </div>

            <h3 className="mt-24 text-4xl">Buddha Fields & Pure Lands</h3>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              A buddhakṣetra is a world-system associated with a particular Buddha. In Mahāyāna thought these are not
              simply heavens: their significance lies in conditions that make awakening unobstructed. Collapsing them
              into a generic "Buddhist heaven" loses the distinction that the sources insist upon.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {pureLands.map((p) => (
                <Card key={p.name}>
                  <h4 className="text-2xl">{p.name}</h4>
                  <p className="sanskrit text-lg">{p.sanskrit}</p>
                  <p className="eyebrow mt-1">{p.buddha}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
                  <p className="mt-3 text-[0.68rem] tracking-widest uppercase text-muted-foreground/80">{p.tradition}</p>
                </Card>
              ))}
            </div>
          </div>
        </RealmScene>

        {/* WHEEL OF LIFE + POISONS + NIDĀNAS */}
        <RealmScene id="wheel" palette="realm-cosmos" particles="motes" density={0.9}>
          <div className={wrap}>
            <RealmTitle eyebrow="Explorer" title="The Wheel of Life" script="भवचक्र" subtitle="Bhavacakra — six realms, three poisons, twelve links" />
            <div className="mt-14">
              <WheelOfLife />
            </div>

            <h3 className="mt-24 text-4xl">The Three Poisons</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {poisons.map((p, i) => (
                <Card key={p.id}>
                  <motion.div
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: i * 2, ease: "easeInOut" }}
                    className="mb-4 size-12 rounded-full bg-[conic-gradient(from_0deg,color-mix(in_oklab,var(--vermilion)_60%,transparent),transparent)]"
                  />
                  <h4 className="text-xl">{p.label}</h4>
                  <p className="sanskrit text-base">{p.sanskrit}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
                </Card>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
              In traditional depictions these three occupy the hub of the wheel and turn everything outside it. They
              are what keeps the cycle in motion; their cessation is what liberation means.
            </p>
          </div>
        </RealmScene>

        {/* EXPLORER */}
        <RealmScene id="explorer" palette="realm-cosmos" particles="stars" density={1.2}>
          <div className={wrap}>
            <RealmTitle eyebrow="Full cosmology" title="Explore the Buddhist Cosmos" subtitle="Select any node to open its description." />
            <div className="mt-14">
              <RealmExplorer />
            </div>
          </div>
        </RealmScene>

        {/* TRADITIONS */}
        <RealmScene id="traditions" palette="realm-form" particles="motes" density={0.7}>
          <div className={wrap}>
            <RealmTitle eyebrow="Comparison" title="Different Buddhist Cosmologies" subtitle="Overlaps, divergences, and where the terminology stops matching." />
            <div className="mt-12">
              <Traditions />
            </div>
          </div>
        </RealmScene>

        {/* GLOSSARY */}
        <RealmScene id="glossary" palette="realm-cosmos" particles="dust" density={0.6}>
          <div className={wrap}>
            <RealmTitle eyebrow="Reference" title="Glossary" subtitle="Terms in Sanskrit, Pāli and English." />
            <div className="mt-12">
              <Glossary />
            </div>
          </div>
        </RealmScene>

        {/* SOURCES */}
        <RealmScene id="sources" palette="realm-formless" particles="stars" density={0.5}>
          <div className={wrap}>
            <RealmTitle eyebrow="Scholarship" title="Sources" subtitle="Where these descriptions come from — and whose they are." />
            <div className="mt-12">
              <Sources />
            </div>
            <p className="mt-8 max-w-2xl text-xs text-muted-foreground">
              Where claims vary between traditions, this site labels the tradition rather than presenting the claim as
              universally Buddhist. Corrections and additional references are welcome.
            </p>
          </div>
        </RealmScene>

        {/* ENDING */}
        <section className="realm-nirvana relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
          <motion.div
            initial={{ opacity: 0.5, scale: 0.9 }}
            whileInView={{ opacity: 0, scale: 1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 14, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <Mandala className="w-[120vmin] animate-spin-slow" rings={9} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative text-4xl sm:text-6xl"
          >
            You Have Travelled Through the Worlds.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.5 }}
            className="relative mt-10 max-w-xl text-lg text-muted-foreground"
          >
            But Buddhism ultimately asks a different question:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 2.6 }}
            className="display relative mt-4 max-w-2xl text-3xl sm:text-4xl"
          >
            What is the nature of the one experiencing them?
          </motion.p>
          <EndingActions />
        </section>
      </main>
    </>
  );
}

function EndingActions() {
  const { toggleMeditation } = useJourney();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, delay: 3.6 }}
      className="relative mt-14 flex flex-wrap justify-center gap-3"
    >
      {[
        ["Explore Again", () => go("top")],
        ["Study the Teachings", () => go("teachings")],
        ["Open Cosmic Map", () => go("explorer")],
        ["Enter Meditation Mode", toggleMeditation],
      ].map(([label, fn]) => (
        <button
          key={label as string}
          onClick={fn as () => void}
          className="rounded-full border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {label as string}
        </button>
      ))}
    </motion.div>
  );
}
