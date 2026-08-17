import { useEffect, useRef } from "react";
import { useJourney } from "./JourneyContext";

const toneFor: Record<string, number> = {
  intro: 110,
  naraka: 55,
  preta: 82,
  animal: 146,
  human: 130,
  asura: 98,
  deva: 220,
  meru: 165,
  kama: 123,
  rupa: 174,
  arupa: 261,
  nirvana: 0,
};

/** Extremely restrained ambient drone. Never autoplays; user must enable sound. */
export function AmbientSound() {
  const { sound, active, meditating } = useJourney();
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!sound) {
      gainRef.current?.gain.linearRampToValueAtTime(0, (ctxRef.current?.currentTime ?? 0) + 1.2);
      return;
    }
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 600;
      osc.type = "sine";
      gain.gain.value = 0;
      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start();
      ctxRef.current = ctx;
      oscRef.current = osc;
      gainRef.current = gain;
    }
    void ctxRef.current.resume();
    const freq = toneFor[active] ?? 110;
    const t = ctxRef.current.currentTime;
    oscRef.current?.frequency.linearRampToValueAtTime(freq || 110, t + 2);
    gainRef.current?.gain.linearRampToValueAtTime(freq === 0 ? 0 : meditating ? 0.03 : 0.045, t + 2);
  }, [sound, active, meditating]);

  useEffect(() => () => void ctxRef.current?.close(), []);
  return null;
}
