/* Direction Step Type */
export type DirectionStep = {
  text: string;
  to: string;
};

/* 🔊 Web Speech Function */
const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }
};

/* 📳 Web Vibration Function */
const vibrate = (pattern: number[]) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
};

/* Assistive Navigation Engine */

export function startAssistiveNavigation(
  directions: DirectionStep[],
  getCurrentStepIndex: () => number,
  hasArrived: () => boolean,
): ReturnType<typeof setInterval> {
  let lastStepIndex = -1;
  let currentInstruction = "";
  let lastSpeechTime = 0; // ✅ FIXED (moved outside)

  const timer = setInterval(() => {
    if (hasArrived()) return;

    const stepIndex = getCurrentStepIndex();
    const step = directions[stepIndex];

    if (!step) return;

    /* Update instruction ONLY when step changes */
    if (stepIndex !== lastStepIndex) {
      currentInstruction = step.text;
      lastStepIndex = stepIndex;
    }

    if (!currentInstruction) return;

    /* 📳 Vibrate */
    vibrate([0, 200, 120, 200]);

    /* 🔊 Speak only every 5 seconds */
    if (Date.now() - lastSpeechTime > 5000) {
      speak(currentInstruction);
      lastSpeechTime = Date.now(); // ✅ FIXED
    }
  }, 5000); // ✅ run every 5 seconds (not 50 sec)

  return timer;
}

/* Stop Navigation */

export function stopAssistiveNavigation(
  timer: ReturnType<typeof setInterval> | null,
) {
  if (timer) clearInterval(timer);

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
