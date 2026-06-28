const ringCircumference = 2 * Math.PI * 52;
const maxCueVolume = 2;
const warmupSeconds = 5;
const fallbackPanelColor = "#d94f66";
const fallbackPresetColor = "#0f776e";

// Per-category palettes. Loading a preset retints the whole app:
//   panel      -> top of the timer gradient (where the big time sits)
//   panelDark  -> bottom of the timer gradient
//   panelDeep  -> the darker control-deck zone
//   accent     -> preset-panel accents (eyebrow, active tab, Load, swatch)
const themes = {
  // Coral — warm, encouraging, clinical-but-kind (the original).
  PT: { panel: "#d94f66", panelDark: "#c2475c", panelDeep: "#9c3548", accent: "#0f776e" },
  // Tangerine — bright, snappy, go-now energy.
  Quick: { panel: "#f15f2c", panelDark: "#e0481b", panelDeep: "#b23a12", accent: "#c2410c" },
  // Electric indigo — flowing, deep, unhurried.
  Mobility: { panel: "#6a5cf0", panelDark: "#5343d6", panelDeep: "#3c2fa6", accent: "#4f46e5" },
  // Deep jade — grounded, stable, athletic.
  Core: { panel: "#0d8f66", panelDark: "#0a7350", panelDeep: "#064e3b", accent: "#047857" },
  // Graphite + gold — heavy iron, premium.
  Strength: { panel: "#2f343d", panelDark: "#1f242b", panelDeep: "#13161b", accent: "#b45309" },
  // Fire red — maximum effort, intense.
  HIIT: { panel: "#f04438", panelDark: "#d92d20", panelDeep: "#911c14", accent: "#b91c1c" },
  // Ocean blue — endurance, breath, cardio.
  Conditioning: { panel: "#2f74e8", panelDark: "#1d4ed8", panelDeep: "#1a3a9c", accent: "#1d4ed8" },
  // Twilight mauve — restful, calm, breathe down.
  Recovery: { panel: "#6d6196", panelDark: "#534878", panelDeep: "#3a3056", accent: "#7a5ea8" },
  // Slate — neutral, your own.
  Custom: { panel: "#3f4654", panelDark: "#2c313b", panelDeep: "#1d2128", accent: "#475569" },
};

function themeFor(category) {
  return themes[category] || themes.Custom;
}

function applyTheme(preset) {
  const theme = themeFor(preset.category);
  const root = document.documentElement.style;
  root.setProperty("--panel", theme.panel);
  root.setProperty("--panel-dark", theme.panelDark);
  root.setProperty("--panel-deep", theme.panelDeep);
  root.setProperty("--accent", theme.accent);
}

const presets = [
  {
    id: "pt-10-5-10",
    name: "10 reps 10 / 5",
    category: "PT",
    summary: "Ten 10-second holds with short 5-second rests.",
    rounds: 10,
    intervals: [
      { label: "Hold", seconds: 10, kind: "work" },
      { label: "Rest", seconds: 5, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#d94f66",
    tags: ["10s hold", "5s rest", "10 reps"],
    favorite: true,
  },
  {
    id: "timer-30",
    name: "30s timer",
    category: "Quick",
    summary: "Single 30-second timer with one finish cue.",
    rounds: 1,
    intervals: [{ label: "Timer", seconds: 30, kind: "work" }],
    color: "#0f776e",
    tags: ["30s", "single"],
    favorite: true,
  },
  {
    id: "pt-5-5-10",
    name: "10 reps 5 / 5",
    category: "PT",
    summary: "Ten 5-second holds with equal 5-second rests.",
    rounds: 10,
    intervals: [
      { label: "Hold", seconds: 5, kind: "work" },
      { label: "Rest", seconds: 5, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#d94f66",
    tags: ["5s hold", "5s rest", "10 reps"],
    favorite: true,
  },
  {
    id: "pt-10-10-10",
    name: "Isometric 10 / 10",
    category: "PT",
    summary: "Common rehab cadence for controlled isometrics.",
    rounds: 10,
    intervals: [
      { label: "Hold", seconds: 10, kind: "work" },
      { label: "Rest", seconds: 10, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#0f776e",
    tags: ["10s", "10 reps", "isometric"],
    favorite: true,
  },
  {
    id: "stretch-30-3",
    name: "Stretch 30 x 3",
    category: "Mobility",
    summary: "Classic static stretch prescription.",
    rounds: 3,
    intervals: [
      { label: "Stretch", seconds: 30, kind: "work" },
      { label: "Switch", seconds: 15, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#3d77d9",
    tags: ["30s", "3 reps", "stretch"],
    favorite: true,
  },
  {
    id: "stretch-45-side",
    name: "45s each side x 2",
    category: "Mobility",
    summary: "Longer hip, calf, or shoulder mobility holds.",
    rounds: 4,
    intervals: [
      { label: "Hold side", seconds: 45, kind: "work" },
      { label: "Switch", seconds: 10, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#5b7f4e",
    tags: ["45s", "sides", "mobility"],
  },
  {
    id: "couch-stretch",
    name: "Couch stretch",
    category: "Mobility",
    summary: "Hip flexor work with enough time to settle in.",
    rounds: 4,
    intervals: [
      { label: "Breathe", seconds: 60, kind: "work" },
      { label: "Switch", seconds: 20, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#2f8f83",
    tags: ["60s", "hip", "sides"],
  },
  {
    id: "plank-45-15-4",
    name: "Plank 45 / 15 x 4",
    category: "Core",
    summary: "Simple core endurance block.",
    rounds: 4,
    intervals: [
      { label: "Plank", seconds: 45, kind: "work" },
      { label: "Rest", seconds: 15, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#293b74",
    tags: ["45s", "4 reps", "core"],
    favorite: true,
  },
  {
    id: "dead-bug",
    name: "Dead bug 40 / 20",
    category: "Core",
    summary: "Controlled core work without rushing reps.",
    rounds: 3,
    intervals: [
      { label: "Controlled reps", seconds: 40, kind: "work" },
      { label: "Reset", seconds: 20, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#7251a3",
    tags: ["40s", "3 rounds", "control"],
  },
  {
    id: "wall-sit",
    name: "Wall sit ladder",
    category: "Strength",
    summary: "Three lower-body isometric holds.",
    rounds: 3,
    intervals: [
      { label: "Wall sit", seconds: 45, kind: "work" },
      { label: "Stand", seconds: 45, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#bf6f1f",
    tags: ["45s", "legs", "isometric"],
  },
  {
    id: "strength-40-20-5",
    name: "Strength 40 / 20 x 5",
    category: "Strength",
    summary: "Good for push-ups, rows, lunges, or band work.",
    rounds: 5,
    intervals: [
      { label: "Work", seconds: 40, kind: "work" },
      { label: "Rest", seconds: 20, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#c05634",
    tags: ["40s", "5 rounds", "strength"],
  },
  {
    id: "emom-10",
    name: "EMOM x 10",
    category: "Strength",
    summary: "Start a set every minute for ten minutes.",
    rounds: 10,
    intervals: [{ label: "Minute", seconds: 60, kind: "work" }],
    color: "#1b6fb8",
    tags: ["60s", "10 min", "EMOM"],
  },
  {
    id: "tabata",
    name: "Tabata 20 / 10",
    category: "HIIT",
    summary: "The classic four-minute interval block.",
    rounds: 8,
    intervals: [
      { label: "High intensity", seconds: 20, kind: "work" },
      { label: "Rest", seconds: 10, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#d94f66",
    tags: ["20s", "8 rounds", "HIIT"],
    favorite: true,
  },
  {
    id: "hiit-30-30-10",
    name: "HIIT 30 / 30 x 10",
    category: "HIIT",
    summary: "Balanced work and recovery intervals.",
    rounds: 10,
    intervals: [
      { label: "Push", seconds: 30, kind: "work" },
      { label: "Recover", seconds: 30, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#d93d50",
    tags: ["30s", "10 rounds", "conditioning"],
  },
  {
    id: "sprint-15-45",
    name: "Sprint 15 / 45 x 8",
    category: "HIIT",
    summary: "Short sprint efforts with fuller recovery.",
    rounds: 8,
    intervals: [
      { label: "Sprint", seconds: 15, kind: "work" },
      { label: "Walk", seconds: 45, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#d34428",
    tags: ["15s", "8 rounds", "sprint"],
  },
  {
    id: "boxing-3-min",
    name: "Rounds 3:00 / 1:00",
    category: "Conditioning",
    summary: "Boxing, bag work, jump rope, or circuits.",
    rounds: 5,
    intervals: [
      { label: "Round", seconds: 180, kind: "work" },
      { label: "Break", seconds: 60, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#24272e",
    tags: ["3 min", "5 rounds", "boxing"],
  },
  {
    id: "run-walk",
    name: "Run / walk 2:00 / 1:00",
    category: "Conditioning",
    summary: "Gentle aerobic intervals or return-to-run work.",
    rounds: 10,
    intervals: [
      { label: "Run", seconds: 120, kind: "work" },
      { label: "Walk", seconds: 60, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#2872aa",
    tags: ["2 min", "10 rounds", "run"],
  },
  {
    id: "pomodoro-short",
    name: "Focus 25 / 5",
    category: "Recovery",
    summary: "Useful for post-exercise mobility or breath pacing.",
    rounds: 1,
    intervals: [
      { label: "Focus", seconds: 1500, kind: "work" },
      { label: "Break", seconds: 300, kind: "rest" },
    ],
    dropFinalRest: false,
    color: "#6f5aa8",
    tags: ["25 min", "focus", "break"],
  },
  {
    id: "box-breathing",
    name: "Box breathing 4-4-4-4",
    category: "Recovery",
    summary: "Five calm breathing cycles.",
    rounds: 5,
    intervals: [
      { label: "Inhale", seconds: 4, kind: "work" },
      { label: "Hold", seconds: 4, kind: "rest" },
      { label: "Exhale", seconds: 4, kind: "work" },
      { label: "Hold", seconds: 4, kind: "rest" },
    ],
    dropFinalRest: false,
    color: "#0f776e",
    tags: ["breath", "4s", "5 cycles"],
  },
  {
    id: "calm-down",
    name: "Cool down 60 x 5",
    category: "Recovery",
    summary: "Five one-minute holds after training.",
    rounds: 5,
    intervals: [
      { label: "Hold", seconds: 60, kind: "work" },
      { label: "Transition", seconds: 15, kind: "rest" },
    ],
    dropFinalRest: true,
    color: "#5d806f",
    tags: ["60s", "cooldown", "stretch"],
  },
];

const elements = {
  presetName: requiredElement("#presetName"),
  phaseProgressBadge: requiredElement("#phaseProgressBadge"),
  phaseProgressText: requiredElement("#phaseProgressText"),
  phaseProgressLabel: requiredElement("#phaseProgressLabel"),
  favoriteButton: requiredElement("#favoriteButton"),
  timeRemaining: requiredElement("#timeRemaining"),
  phaseName: requiredElement("#phaseName"),
  roundInfo: requiredElement("#roundInfo"),
  elapsedTime: requiredElement("#elapsedTime"),
  totalTime: requiredElement("#totalTime"),
  remainingTime: requiredElement("#remainingTime"),
  progressCircle: requiredElement("#progressCircle"),
  startPauseButton: requiredElement("#startPauseButton"),
  startPauseIcon: requiredElement("#startPauseIcon use"),
  startPauseLabel: requiredElement("#startPauseLabel"),
  restartButton: requiredElement("#restartButton"),
  previousPhaseButton: requiredElement("#previousPhaseButton"),
  nextPhaseButton: requiredElement("#nextPhaseButton"),
  soundButton: requiredElement("#soundButton"),
  wakeButton: requiredElement("#wakeButton"),
  volumeSlider: requiredElement("#volumeSlider"),
  volumeValue: requiredElement("#volumeValue"),
  supportLine: requiredElement("#supportLine"),
  favoritesOnlyButton: requiredElement("#favoritesOnlyButton"),
  presetSearch: requiredElement("#presetSearch"),
  categoryTabs: requiredElement("#categoryTabs"),
  presetList: requiredElement("#presetList"),
  customForm: requiredElement("#customForm"),
  customWork: requiredElement("#customWork"),
  customRest: requiredElement("#customRest"),
  customRounds: requiredElement("#customRounds"),
};

const storage = {
  favorites: "vibe-timer:favorites",
  favoritesVersion: "vibe-timer:favorites-version",
  settings: "vibe-timer:settings",
  lastPreset: "vibe-timer:last-preset",
};

const memoryStorage = new Map();
const defaultFavorites = new Set(presets.filter((preset) => preset.favorite).map((preset) => preset.id));
const savedFavorites = parseStoredFavorites(readStoredValue(storage.favorites), [...defaultFavorites]);
const savedSettings = parseStoredSettings(readStoredValue(storage.settings));
const savedPresetId = readStoredValue(storage.lastPreset);
const savedFavoritesVersion = parseStoredVersion(readStoredValue(storage.favoritesVersion));
const initialFavorites = new Set(savedFavorites);
if (savedFavoritesVersion < 2) {
  ["pt-10-5-10", "timer-30", "pt-5-5-10"].forEach((id) => initialFavorites.add(id));
}

const state = {
  activePreset: presets.find((preset) => preset.id === savedPresetId) ?? presets[0],
  phases: [],
  totalSeconds: 0,
  running: false,
  complete: false,
  elapsedWhenPaused: 0,
  startedAt: 0,
  lastPhaseIndex: 0,
  selectedCategory: "All",
  showFavoritesOnly: false,
  query: "",
  favorites: initialFavorites,
  soundEnabled: savedSettings.soundEnabled ?? true,
  cueVolume: savedSettings.cueVolume ?? 1,
  wakeWanted: savedSettings.wakeWanted ?? true,
  audioContext: null,
  audioPrimedAt: 0,
  audioNeedsRearm: false,
  pageWasHidden: document.visibilityState === "hidden",
  wakeLock: null,
  wakeLockRequestId: 0,
  rafId: null,
  supportStatus: "",
};

elements.progressCircle.style.strokeDasharray = `${ringCircumference}`;

function requiredElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }
  return element;
}

function parseStoredJson(value, fallback) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function parseStoredFavorites(value, fallback) {
  const parsed = parseStoredJson(value, fallback);
  if (!Array.isArray(parsed)) {
    return fallback;
  }
  return parsed.filter((id) => typeof id === "string" && id.length > 0 && id.length <= 120);
}

function parseStoredSettings(value) {
  const parsed = parseStoredJson(value, {});
  if (!isPlainObject(parsed)) {
    return {};
  }

  const settings = {};
  if (typeof parsed.soundEnabled === "boolean") {
    settings.soundEnabled = parsed.soundEnabled;
  }
  if (typeof parsed.wakeWanted === "boolean") {
    settings.wakeWanted = parsed.wakeWanted;
  }
  if (parsed.cueVolume !== undefined) {
    const volume = Number(parsed.cueVolume);
    if (Number.isFinite(volume)) {
      settings.cueVolume = clampCueVolume(volume);
    }
  }
  return settings;
}

function parseStoredVersion(value) {
  const version = Number(value ?? 0);
  if (!Number.isFinite(version) || version < 0) {
    return 0;
  }
  return Math.floor(version);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readStoredValue(key) {
  try {
    const value = window.localStorage?.getItem(key);
    if (value !== null && value !== undefined) {
      return value;
    }
  } catch {
    // Safari can reject storage in some local/private contexts. In-memory state keeps controls usable.
  }

  return memoryStorage.get(key) ?? null;
}

function writeStoredValue(key, value) {
  memoryStorage.set(key, value);
  try {
    window.localStorage?.setItem(key, value);
  } catch {
    // Persistence is best effort; the timer still works without it.
  }
}

function saveFavorites() {
  writeStoredValue(storage.favorites, JSON.stringify([...state.favorites]));
}

function saveSettings() {
  writeStoredValue(
    storage.settings,
    JSON.stringify({
      soundEnabled: state.soundEnabled,
      cueVolume: state.cueVolume,
      wakeWanted: state.wakeWanted,
    }),
  );
}

function clampCueVolume(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(maxCueVolume, Math.max(0, value));
}

function buildPhases(preset) {
  const phases = [
    {
      label: "Get ready",
      seconds: warmupSeconds,
      kind: "warmup",
      round: 0,
      roundCount: preset.rounds,
      startsAt: 0,
      endsAt: 0,
    },
  ];
  for (let round = 1; round <= preset.rounds; round += 1) {
    preset.intervals.forEach((interval, intervalIndex) => {
      const isLastInterval = intervalIndex === preset.intervals.length - 1;
      const isFinalRound = round === preset.rounds;
      if (preset.dropFinalRest && isFinalRound && isLastInterval && interval.kind === "rest") {
        return;
      }

      phases.push({
        ...interval,
        round,
        roundCount: preset.rounds,
        startsAt: 0,
        endsAt: 0,
      });
    });
  }

  let cursor = 0;
  phases.forEach((phase) => {
    phase.startsAt = cursor;
    cursor += phase.seconds;
    phase.endsAt = cursor;
  });

  return { phases, totalSeconds: cursor };
}

function loadPreset(preset, options = {}) {
  const wasRunning = state.running;
  pauseTimer({ silent: true });
  state.activePreset = preset;
  const schedule = buildPhases(preset);
  state.phases = schedule.phases;
  state.totalSeconds = schedule.totalSeconds;
  state.elapsedWhenPaused = 0;
  state.lastPhaseIndex = 0;
  state.complete = false;
  applyTheme(preset);
  writeStoredValue(storage.lastPreset, preset.id);
  render();
  renderPresets();

  if (options.keepRunning || wasRunning) {
    startTimer();
  }
}

function makeCustomPreset() {
  const work = clampNumber(Number(elements.customWork.value), 1, 600);
  const rest = clampNumber(Number(elements.customRest.value), 0, 600);
  const rounds = clampNumber(Number(elements.customRounds.value), 1, 99);
  elements.customWork.value = work;
  elements.customRest.value = rest;
  elements.customRounds.value = rounds;

  const intervals = [{ label: "Work", seconds: work, kind: "work" }];
  if (rest > 0) {
    intervals.push({ label: "Rest", seconds: rest, kind: "rest" });
  }

  return {
    id: `custom-${work}-${rest}-${rounds}`,
    name: `Custom ${work} / ${rest} x ${rounds}`,
    category: "Custom",
    summary: "Quick custom work/rest repeat.",
    rounds,
    intervals,
    dropFinalRest: true,
    color: fallbackPresetColor,
    tags: [`${work}s`, `${rest}s rest`, `${rounds} reps`],
  };
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.round(value)));
}

function safeColor(value, fallback = fallbackPresetColor) {
  if (typeof value !== "string") {
    return fallback;
  }
  const color = value.trim();
  return /^#[\da-f]{3}([\da-f]{3})?$/i.test(color) ? color : fallback;
}

function appendIconUse(container, symbolId) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", symbolId);
  svg.append(use);
  container.append(svg);
}

function getElapsed() {
  if (!state.running) {
    return state.elapsedWhenPaused;
  }
  const delta = (performance.now() - state.startedAt) / 1000;
  return Math.min(state.totalSeconds, state.elapsedWhenPaused + delta);
}

function getPhaseIndex(elapsed) {
  if (elapsed >= state.totalSeconds) {
    return Math.max(0, state.phases.length - 1);
  }
  return state.phases.findIndex((phase) => elapsed >= phase.startsAt && elapsed < phase.endsAt);
}

function getCurrentPhase(elapsed = getElapsed()) {
  const index = Math.max(0, getPhaseIndex(elapsed));
  return { phase: state.phases[index], index };
}

function startTimer() {
  if (state.running) {
    return;
  }
  if (state.complete || state.elapsedWhenPaused >= state.totalSeconds) {
    state.elapsedWhenPaused = 0;
    state.complete = false;
    state.lastPhaseIndex = 0;
  }

  state.running = true;
  state.startedAt = performance.now();
  void requestWakeLock();
  const { index, phase } = getCurrentPhase();
  state.lastPhaseIndex = index;
  if (phase?.kind !== "warmup") {
    void playCue(phase?.kind === "rest" ? "rest" : "work");
    vibrate(phase?.kind === "rest" ? 30 : 50);
  }
  tick();
}

function pauseTimer(options = {}) {
  if (!state.running) {
    return;
  }
  state.elapsedWhenPaused = getElapsed();
  state.running = false;
  cancelAnimationFrame(state.rafId);
  void releaseWakeLock();
  if (!options.silent) {
    vibrate(20);
  }
  render();
}

function resetTimer() {
  pauseTimer({ silent: true });
  state.elapsedWhenPaused = 0;
  state.complete = false;
  state.lastPhaseIndex = 0;
  render();
}

function seekTo(seconds) {
  const wasRunning = state.running;
  pauseTimer({ silent: true });
  state.elapsedWhenPaused = Math.min(state.totalSeconds, Math.max(0, seconds));
  state.complete = state.elapsedWhenPaused >= state.totalSeconds;
  state.lastPhaseIndex = getPhaseIndex(state.elapsedWhenPaused);
  render();
  if (wasRunning && !state.complete) {
    startTimer();
  }
}

function nextPhase() {
  const elapsed = getElapsed();
  const { phase } = getCurrentPhase(elapsed);
  if (!phase) {
    return;
  }
  seekTo(Math.min(state.totalSeconds, phase.endsAt + 0.001));
}

function previousPhase() {
  const elapsed = getElapsed();
  const { phase, index } = getCurrentPhase(elapsed);
  if (!phase) {
    return;
  }
  if (elapsed - phase.startsAt > 3 || index === 0) {
    seekTo(phase.startsAt);
    return;
  }
  seekTo(state.phases[index - 1]?.startsAt ?? 0);
}

function tick() {
  const elapsed = getElapsed();
  const { phase, index } = getCurrentPhase(elapsed);

  if (index !== state.lastPhaseIndex && phase) {
    state.lastPhaseIndex = index;
    if (phase.kind !== "warmup") {
      void playCue(phase.kind === "rest" ? "rest" : "work");
      vibrate(phase.kind === "rest" ? [20] : [45, 30, 45]);
    }
  }

  if (elapsed >= state.totalSeconds && !state.complete) {
    state.complete = true;
    state.elapsedWhenPaused = state.totalSeconds;
    state.running = false;
    cancelAnimationFrame(state.rafId);
    void releaseWakeLock();
    void playCue("finish");
    vibrate([90, 45, 90]);
  }

  render();

  if (state.running) {
    state.rafId = requestAnimationFrame(tick);
  }
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainder = safeSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function render() {
  const elapsed = getElapsed();
  const remaining = Math.max(0, state.totalSeconds - elapsed);
  const { phase, index } = getCurrentPhase(elapsed);
  const phaseRemaining = phase ? Math.max(0, phase.endsAt - elapsed) : 0;
  const totalProgress = state.totalSeconds > 0 ? elapsed / state.totalSeconds : 0;
  const badge = phaseProgressBadgeText(phase);

  elements.presetName.textContent = state.activePreset.name;
  elements.phaseName.textContent = state.complete ? "Complete" : phase?.label ?? "Ready";
  elements.roundInfo.textContent = state.complete
    ? `${countActivePhases()}/${countActivePhases()} intervals`
    : phaseProgressText(phase, index);
  elements.phaseProgressText.textContent = state.complete ? badge.completeText : badge.text;
  elements.phaseProgressLabel.textContent = state.complete ? badge.completeLabel : badge.label;
  elements.phaseProgressBadge.setAttribute(
    "aria-label",
    state.complete ? badge.completeAccessibleText : badge.accessibleText,
  );
  elements.timeRemaining.textContent = state.complete ? "00:00" : formatTime(phaseRemaining);
  elements.timeRemaining.classList.toggle("long", elements.timeRemaining.textContent.length > 5);
  elements.elapsedTime.textContent = formatTime(elapsed);
  elements.totalTime.textContent = formatTime(state.totalSeconds);
  elements.remainingTime.textContent = formatTime(remaining);
  elements.progressCircle.style.strokeDashoffset = `${ringCircumference * (1 - totalProgress)}`;

  elements.startPauseLabel.textContent = state.running ? "PAUSE" : state.complete ? "DONE" : "START";
  elements.startPauseIcon.setAttribute("href", state.running ? "#icon-pause" : "#icon-play");
  elements.startPauseButton.setAttribute("aria-label", state.running ? "Pause timer" : "Start timer");

  elements.favoriteButton.classList.toggle("active", state.favorites.has(state.activePreset.id));
  elements.favoriteButton.setAttribute(
    "aria-label",
    state.favorites.has(state.activePreset.id) ? "Remove favorite" : "Add favorite",
  );

  elements.soundButton.classList.toggle("active", state.soundEnabled);
  elements.wakeButton.classList.toggle("active", state.wakeWanted);
  elements.volumeSlider.value = Math.round(state.cueVolume * 100);
  elements.volumeValue.textContent = `${Math.round(state.cueVolume * 100)}%`;

  const supportParts = [];
  supportParts.push(state.soundEnabled ? `Sound ${Math.round(state.cueVolume * 100)}%` : "Muted");
  supportParts.push(state.wakeWanted ? wakeStatusText() : "Wake off");
  elements.supportLine.textContent = state.supportStatus || supportParts.join(" · ");
}

function phaseProgressText(phase, index) {
  if (!phase) {
    return "Ready";
  }
  if (phase.kind === "warmup") {
    return "start countdown";
  }
  if (phase.roundCount === 1 && countActivePhases() === 1) {
    return "single timer";
  }
  if (phase.roundCount === 1) {
    return `${activePhaseIndex(index) + 1}/${countActivePhases()} interval`;
  }
  return `${phase.round}/${phase.roundCount} rep`;
}

function countActivePhases() {
  return state.phases.filter((phase) => phase.kind !== "warmup").length;
}

function activePhaseIndex(index) {
  return state.phases.slice(0, index + 1).filter((phase) => phase.kind !== "warmup").length - 1;
}

function phaseProgressBadgeText(phase) {
  const activeRounds = state.activePreset.rounds;
  if (!phase) {
    return {
      text: "0/" + activeRounds,
      label: "rep",
      accessibleText: `Ready. 0 out of ${activeRounds} reps.`,
      completeText: activeRounds + "/" + activeRounds,
      completeLabel: "done",
      completeAccessibleText: `Complete. ${activeRounds} out of ${activeRounds} reps.`,
    };
  }

  const total = phase.roundCount || activeRounds;
  if (phase.kind === "warmup") {
    return {
      text: "0/" + total,
      label: "ready",
      accessibleText: `Get ready. 0 out of ${total} reps.`,
      completeText: total + "/" + total,
      completeLabel: "done",
      completeAccessibleText: `Complete. ${total} out of ${total} reps.`,
    };
  }

  const current = Math.max(1, phase.round || 1);
  return {
    text: current + "/" + total,
    label: total === 1 ? "timer" : "rep",
    accessibleText: `${current} out of ${total} ${total === 1 ? "timer" : "reps"}.`,
    completeText: total + "/" + total,
    completeLabel: "done",
    completeAccessibleText: `Complete. ${total} out of ${total} ${total === 1 ? "timer" : "reps"}.`,
  };
}

function wakeStatusText() {
  if (!("wakeLock" in navigator)) {
    return "Wake unsupported";
  }
  return state.wakeLock ? "Screen awake" : "Wake ready";
}

function renderCategories() {
  const categories = ["All", ...new Set(presets.map((preset) => preset.category)), "Custom"];
  elements.categoryTabs.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-tab";
    button.textContent = category;
    button.classList.toggle("active", state.selectedCategory === category);
    button.addEventListener("click", () => {
      state.selectedCategory = category;
      state.showFavoritesOnly = false;
      elements.favoritesOnlyButton.classList.remove("active");
      renderCategories();
      renderPresets();
    });
    elements.categoryTabs.append(button);
  });
}

function renderPresets() {
  const query = state.query.trim().toLowerCase();
  const availablePresets = state.selectedCategory === "Custom" ? [] : presets;
  const filtered = availablePresets.filter((preset) => {
    const matchesCategory = state.selectedCategory === "All" || preset.category === state.selectedCategory;
    const matchesFavorite = !state.showFavoritesOnly || state.favorites.has(preset.id);
    const haystack = [preset.name, preset.category, preset.summary, ...presetTags(preset)].join(" ").toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesFavorite && matchesQuery;
  });

  elements.presetList.replaceChildren();

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "preset-empty";
    empty.textContent =
      state.selectedCategory === "Custom"
        ? "Use the quick custom builder below."
        : "No presets match this view.";
    elements.presetList.append(empty);
    return;
  }

  filtered.forEach((preset) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "preset-card";
    card.classList.toggle("active", preset.id === state.activePreset.id);
    card.style.setProperty("--preset-color", themeFor(preset.category).panel);

    const swatch = document.createElement("span");
    swatch.className = "preset-swatch";
    swatch.setAttribute("aria-hidden", "true");

    const copy = document.createElement("span");
    copy.className = "preset-copy";

    const title = document.createElement("strong");
    title.textContent = preset.name;

    const summary = document.createElement("span");
    summary.textContent = preset.summary;

    const meta = document.createElement("span");
    meta.className = "preset-meta";
    presetTags(preset).forEach((tagText) => {
      const tag = document.createElement("b");
      tag.textContent = tagText;
      meta.append(tag);
    });

    const favoriteIcon = document.createElement("span");
    favoriteIcon.className = "icon-button preset-fave";
    favoriteIcon.classList.toggle("active", state.favorites.has(preset.id));
    favoriteIcon.setAttribute("aria-hidden", "true");
    appendIconUse(favoriteIcon, "#icon-star");

    copy.append(title, summary, meta);
    card.append(swatch, copy, favoriteIcon);
    card.addEventListener("click", (event) => {
      const faveTarget = event.target instanceof Element ? event.target.closest(".preset-fave") : null;
      if (faveTarget) {
        toggleFavorite(preset.id);
        return;
      }
      loadPreset(preset);
    });
    elements.presetList.append(card);
  });
}

function presetTags(preset) {
  return Array.isArray(preset.tags) ? preset.tags.filter((tag) => typeof tag === "string") : [];
}

function toggleFavorite(id = state.activePreset.id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }
  saveFavorites();
  render();
  renderPresets();
}

function audioEngine() {
  return window.AudioContext || window.webkitAudioContext;
}

function createAudioContext() {
  const AudioEngine = audioEngine();
  if (!AudioEngine) {
    state.supportStatus = "Audio cues unsupported";
    render();
    return null;
  }

  const context = new AudioEngine();
  context.addEventListener?.("statechange", () => {
    if (state.audioContext === context && context.state === "interrupted") {
      state.audioNeedsRearm = true;
      state.supportStatus = "Audio interrupted. Tap any control to re-arm sound.";
      render();
    }
  });
  state.audioContext = context;
  return context;
}

function disposeAudioContext() {
  const context = state.audioContext;
  state.audioContext = null;
  if (context && context.state !== "closed") {
    const closePromise = context.close?.();
    closePromise?.catch?.(() => {});
  }
}

function clearAudioStatus() {
  if (state.supportStatus.startsWith("Audio ") || state.supportStatus.startsWith("Tap ")) {
    state.supportStatus = "";
    render();
  }
}

function markAudioReady() {
  state.audioPrimedAt = Date.now();
  state.audioNeedsRearm = false;
  clearAudioStatus();
}

function markAudioNeedsRearm(message = "") {
  state.audioNeedsRearm = true;
  if (message) {
    state.supportStatus = message;
    render();
  }
}

async function unlockAudio({ recreate = true } = {}) {
  if (!state.soundEnabled || state.cueVolume <= 0) {
    return null;
  }

  let context = state.audioContext;
  if (!context || context.state === "closed" || context.state === "interrupted") {
    disposeAudioContext();
    context = createAudioContext();
  }

  if (!context) {
    return null;
  }

  for (let attempt = 0; attempt < (recreate ? 2 : 1); attempt += 1) {
    if (context.state === "running") {
      markAudioReady();
      return context;
    }

    try {
      await context.resume?.();
    } catch {
      // Safari can reject resume after backgrounding until the next user gesture.
    }

    if (context.state === "running") {
      markAudioReady();
      return context;
    }

    if (!recreate || attempt === 1) {
      break;
    }

    disposeAudioContext();
    context = createAudioContext();
    if (!context) {
      return null;
    }
  }

  if (state.running) {
    markAudioNeedsRearm("Tap any control to re-arm sound.");
  }
  return null;
}

async function primeAudioFromGesture() {
  await unlockAudio();
}

async function playCue(type, options = {}) {
  if (!state.soundEnabled || state.cueVolume <= 0) {
    return;
  }
  const context = options.context ?? (await unlockAudio());
  if (!context) {
    return;
  }

  if (context.state !== "running") {
    markAudioNeedsRearm("Tap any control to re-arm sound.");
    return;
  }

  const sequences = {
    work: [
      { frequency: 880, offset: 0, duration: 0.12, gain: 0.58, type: "square" },
      { frequency: 1320, offset: 0.13, duration: 0.14, gain: 0.62, type: "square" },
    ],
    rest: [{ frequency: 520, offset: 0, duration: 0.18, gain: 0.48, type: "triangle" }],
    finish: [
      { frequency: 784, offset: 0, duration: 0.12, gain: 0.66, type: "square" },
      { frequency: 988, offset: 0.13, duration: 0.12, gain: 0.7, type: "square" },
      { frequency: 1318, offset: 0.27, duration: 0.2, gain: 0.74, type: "square" },
    ],
  };

  const now = context.currentTime;
  try {
    sequences[type].forEach((note) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = note.type;
      oscillator.frequency.value = note.frequency;
      oscillator.connect(gain);
      gain.connect(context.destination);
      const start = now + note.offset;
      const peakGain = Math.max(0.0001, Math.min(1.4, note.gain * state.cueVolume));
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peakGain, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + note.duration);
      oscillator.start(start);
      oscillator.stop(start + note.duration + 0.02);
    });
  } catch {
    disposeAudioContext();
    markAudioNeedsRearm("Audio reset. Tap any control to re-arm sound.");
  }
}

function handlePageHidden() {
  state.pageWasHidden = true;
  if (state.audioContext) {
    markAudioNeedsRearm();
    disposeAudioContext();
  }
}

function handlePageRestored() {
  if (document.visibilityState === "hidden") {
    return;
  }

  const wasHidden = state.pageWasHidden;
  state.pageWasHidden = false;

  if (wasHidden && state.running) {
    markAudioNeedsRearm("Tap any control to re-arm sound.");
    void unlockAudio({ recreate: false });
  }

  if (state.running && state.wakeWanted) {
    void requestWakeLock();
  }
}

function vibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

async function requestWakeLock() {
  const requestId = state.wakeLockRequestId + 1;
  state.wakeLockRequestId = requestId;

  if (state.wakeLock) {
    render();
    return;
  }

  if (!state.running || !state.wakeWanted || !("wakeLock" in navigator) || document.visibilityState !== "visible") {
    render();
    return;
  }

  try {
    const wakeLock = await navigator.wakeLock.request("screen");
    if (
      requestId !== state.wakeLockRequestId ||
      !state.running ||
      !state.wakeWanted ||
      document.visibilityState !== "visible"
    ) {
      await wakeLock.release().catch(() => {});
      return;
    }

    state.wakeLock = wakeLock;
    wakeLock.addEventListener("release", () => {
      if (state.wakeLock === wakeLock) {
        state.wakeLock = null;
        render();
      }
    });
    if (!state.audioNeedsRearm) {
      state.supportStatus = "";
    }
  } catch (error) {
    if (requestId === state.wakeLockRequestId && !state.audioNeedsRearm) {
      state.supportStatus = `Wake lock unavailable: ${error.name}`;
    }
  }
  render();
}

async function releaseWakeLock() {
  state.wakeLockRequestId += 1;
  const wakeLock = state.wakeLock;
  state.wakeLock = null;
  if (!wakeLock) {
    render();
    return;
  }
  try {
    await wakeLock.release();
  } catch {
    // Wake locks can already be released by the browser between state checks.
  }
  render();
}

function installServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") {
    return;
  }
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

elements.startPauseButton.addEventListener("click", () => {
  if (state.running) {
    pauseTimer();
  } else {
    startTimer();
  }
});

elements.restartButton.addEventListener("click", resetTimer);
elements.previousPhaseButton.addEventListener("click", previousPhase);
elements.nextPhaseButton.addEventListener("click", nextPhase);
elements.favoriteButton.addEventListener("click", () => toggleFavorite());

elements.soundButton.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  saveSettings();
  render();
});

elements.volumeSlider.addEventListener("input", () => {
  state.cueVolume = clampCueVolume(Number(elements.volumeSlider.value) / 100);
  if (state.cueVolume > 0) {
    state.soundEnabled = true;
  }
  saveSettings();
  render();
});

elements.volumeSlider.addEventListener("change", () => {
  if (!state.running) {
    void playCue("work");
  }
});

elements.wakeButton.addEventListener("click", () => {
  state.wakeWanted = !state.wakeWanted;
  if (state.wakeWanted && state.running) {
    void requestWakeLock();
  } else {
    void releaseWakeLock();
  }
  saveSettings();
  render();
});

elements.favoritesOnlyButton.addEventListener("click", () => {
  state.showFavoritesOnly = !state.showFavoritesOnly;
  elements.favoritesOnlyButton.classList.toggle("active", state.showFavoritesOnly);
  renderPresets();
});

elements.presetSearch.addEventListener("input", () => {
  state.query = elements.presetSearch.value;
  renderPresets();
});

elements.customForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const preset = makeCustomPreset();
  state.selectedCategory = "Custom";
  state.showFavoritesOnly = false;
  elements.favoritesOnlyButton.classList.remove("active");
  renderCategories();
  loadPreset(preset);
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    handlePageHidden();
    return;
  }

  handlePageRestored();
});

window.addEventListener("pagehide", handlePageHidden);
window.addEventListener("pageshow", handlePageRestored);
window.addEventListener("focus", handlePageRestored);

if ("PointerEvent" in window) {
  document.addEventListener("pointerdown", primeAudioFromGesture, { capture: true, passive: true });
} else {
  document.addEventListener("touchend", primeAudioFromGesture, { capture: true, passive: true });
}

if (savedFavoritesVersion < 2) {
  saveFavorites();
  writeStoredValue(storage.favoritesVersion, "2");
}

renderCategories();
loadPreset(state.activePreset);
installServiceWorker();
