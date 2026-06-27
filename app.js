const ringCircumference = 2 * Math.PI * 52;

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
  presetName: document.querySelector("#presetName"),
  favoriteButton: document.querySelector("#favoriteButton"),
  timeRemaining: document.querySelector("#timeRemaining"),
  phaseName: document.querySelector("#phaseName"),
  roundInfo: document.querySelector("#roundInfo"),
  elapsedTime: document.querySelector("#elapsedTime"),
  totalTime: document.querySelector("#totalTime"),
  remainingTime: document.querySelector("#remainingTime"),
  progressCircle: document.querySelector("#progressCircle"),
  startPauseButton: document.querySelector("#startPauseButton"),
  startPauseIcon: document.querySelector("#startPauseIcon use"),
  startPauseLabel: document.querySelector("#startPauseLabel"),
  resetButton: document.querySelector("#resetButton"),
  restartButton: document.querySelector("#restartButton"),
  previousPhaseButton: document.querySelector("#previousPhaseButton"),
  nextPhaseButton: document.querySelector("#nextPhaseButton"),
  soundButton: document.querySelector("#soundButton"),
  wakeButton: document.querySelector("#wakeButton"),
  mediaButton: document.querySelector("#mediaButton"),
  supportLine: document.querySelector("#supportLine"),
  favoritesOnlyButton: document.querySelector("#favoritesOnlyButton"),
  presetSearch: document.querySelector("#presetSearch"),
  categoryTabs: document.querySelector("#categoryTabs"),
  presetList: document.querySelector("#presetList"),
  customForm: document.querySelector("#customForm"),
  customWork: document.querySelector("#customWork"),
  customRest: document.querySelector("#customRest"),
  customRounds: document.querySelector("#customRounds"),
  mediaBridge: document.querySelector("#mediaBridge"),
};

const storage = {
  favorites: "vibe-timer:favorites",
  favoritesVersion: "vibe-timer:favorites-version",
  settings: "vibe-timer:settings",
  lastPreset: "vibe-timer:last-preset",
};

const memoryStorage = new Map();
const defaultFavorites = new Set(presets.filter((preset) => preset.favorite).map((preset) => preset.id));
const savedFavorites = safeJson(readStoredValue(storage.favorites), [...defaultFavorites]);
const savedSettings = safeJson(readStoredValue(storage.settings), {});
const savedPresetId = readStoredValue(storage.lastPreset);
const savedFavoritesVersion = Number(readStoredValue(storage.favoritesVersion) ?? 0);
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
  wakeWanted: savedSettings.wakeWanted ?? true,
  mediaWanted: savedSettings.mediaWanted ?? true,
  audioContext: null,
  wakeLock: null,
  rafId: null,
  supportStatus: "",
};

elements.progressCircle.style.strokeDasharray = `${ringCircumference}`;

function safeJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
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
      wakeWanted: state.wakeWanted,
      mediaWanted: state.mediaWanted,
    }),
  );
}

function buildPhases(preset) {
  const phases = [];
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
  document.documentElement.style.setProperty("--panel", preset.color);
  writeStoredValue(storage.lastPreset, preset.id);
  render();
  renderPresets();
  updateMediaSession();

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
    color: "#0f776e",
    tags: [`${work}s`, `${rest}s rest`, `${rounds} reps`],
  };
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.round(value)));
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

  unlockAudio();
  startMediaBridge();
  requestWakeLock();
  state.running = true;
  state.startedAt = performance.now();
  const { index, phase } = getCurrentPhase();
  state.lastPhaseIndex = index;
  playCue(phase?.kind === "rest" ? "rest" : "work");
  vibrate(phase?.kind === "rest" ? 30 : 50);
  updateMediaSession();
  tick();
}

function pauseTimer(options = {}) {
  if (!state.running) {
    return;
  }
  state.elapsedWhenPaused = getElapsed();
  state.running = false;
  cancelAnimationFrame(state.rafId);
  releaseWakeLock();
  pauseMediaBridge();
  if (!options.silent) {
    vibrate(20);
  }
  updateMediaSession();
  render();
}

function resetTimer() {
  pauseTimer({ silent: true });
  state.elapsedWhenPaused = 0;
  state.complete = false;
  state.lastPhaseIndex = 0;
  updateMediaSession();
  render();
}

function seekTo(seconds) {
  const wasRunning = state.running;
  pauseTimer({ silent: true });
  state.elapsedWhenPaused = Math.min(state.totalSeconds, Math.max(0, seconds));
  state.complete = state.elapsedWhenPaused >= state.totalSeconds;
  state.lastPhaseIndex = getPhaseIndex(state.elapsedWhenPaused);
  render();
  updateMediaSession();
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
    playCue(phase.kind === "rest" ? "rest" : "work");
    vibrate(phase.kind === "rest" ? [20] : [45, 30, 45]);
  }

  if (elapsed >= state.totalSeconds && !state.complete) {
    state.complete = true;
    state.elapsedWhenPaused = state.totalSeconds;
    state.running = false;
    cancelAnimationFrame(state.rafId);
    releaseWakeLock();
    pauseMediaBridge();
    playCue("finish");
    vibrate([90, 45, 90]);
    updateMediaSession();
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

  elements.presetName.textContent = state.activePreset.name;
  elements.phaseName.textContent = state.complete ? "Complete" : phase?.label ?? "Ready";
  elements.roundInfo.textContent = state.complete
    ? `${state.phases.length}/${state.phases.length} intervals`
    : phaseProgressText(phase, index);
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
  elements.mediaButton.classList.toggle("active", state.mediaWanted);

  const supportParts = [];
  supportParts.push(state.soundEnabled ? "Sound on" : "Muted");
  supportParts.push(state.wakeWanted ? wakeStatusText() : "Wake off");
  supportParts.push(state.mediaWanted ? mediaStatusText() : "Lock-screen controls off");
  elements.supportLine.textContent = state.supportStatus || supportParts.join(" · ");
}

function phaseProgressText(phase, index) {
  if (!phase) {
    return "Ready";
  }
  if (phase.roundCount === 1 && state.phases.length === 1) {
    return "single timer";
  }
  if (phase.roundCount === 1) {
    return `${index + 1}/${state.phases.length} interval`;
  }
  return `${phase.round}/${phase.roundCount} rep`;
}

function wakeStatusText() {
  if (!("wakeLock" in navigator)) {
    return "Wake unsupported";
  }
  return state.wakeLock ? "Screen awake" : "Wake ready";
}

function mediaStatusText() {
  if (!("mediaSession" in navigator)) {
    return "Lock-screen controls unsupported";
  }
  if (!state.mediaWanted) {
    return "Lock-screen controls off";
  }
  return state.running ? "Lock-screen controls requested" : "Lock-screen controls ready";
}

function renderCategories() {
  const categories = ["All", ...new Set(presets.map((preset) => preset.category)), "Custom"];
  elements.categoryTabs.innerHTML = "";
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
    const haystack = [preset.name, preset.category, preset.summary, ...preset.tags].join(" ").toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesFavorite && matchesQuery;
  });

  elements.presetList.innerHTML = "";

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
    card.style.setProperty("--preset-color", preset.color);
    card.innerHTML = `
      <span class="preset-swatch" aria-hidden="true"></span>
      <span class="preset-copy">
        <strong>${escapeHtml(preset.name)}</strong>
        <span>${escapeHtml(preset.summary)}</span>
        <span class="preset-meta">${preset.tags.map((tag) => `<b>${escapeHtml(tag)}</b>`).join("")}</span>
      </span>
      <span class="icon-button preset-fave ${state.favorites.has(preset.id) ? "active" : ""}" aria-hidden="true">
        <svg><use href="#icon-star"></use></svg>
      </span>
    `;
    card.addEventListener("click", (event) => {
      const faveTarget = event.target.closest(".preset-fave");
      if (faveTarget) {
        toggleFavorite(preset.id);
        return;
      }
      loadPreset(preset);
    });
    elements.presetList.append(card);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[character];
  });
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

function unlockAudio() {
  if (!state.soundEnabled) {
    return;
  }
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) {
    state.supportStatus = "Audio cues unsupported";
    return;
  }
  if (!state.audioContext) {
    state.audioContext = new AudioEngine();
  }
  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }
}

function playCue(type) {
  if (!state.soundEnabled) {
    return;
  }
  unlockAudio();
  const context = state.audioContext;
  if (!context) {
    return;
  }

  const sequences = {
    work: [
      { frequency: 660, offset: 0, duration: 0.09 },
      { frequency: 880, offset: 0.1, duration: 0.11 },
    ],
    rest: [{ frequency: 392, offset: 0, duration: 0.13 }],
    finish: [
      { frequency: 523.25, offset: 0, duration: 0.1 },
      { frequency: 659.25, offset: 0.11, duration: 0.1 },
      { frequency: 783.99, offset: 0.22, duration: 0.14 },
    ],
  };

  const now = context.currentTime;
  sequences[type].forEach((note) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type === "rest" ? "sine" : "triangle";
    oscillator.frequency.value = note.frequency;
    oscillator.connect(gain);
    gain.connect(context.destination);
    const start = now + note.offset;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(type === "finish" ? 0.12 : 0.09, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + note.duration);
    oscillator.start(start);
    oscillator.stop(start + note.duration + 0.02);
  });
}

function vibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

async function requestWakeLock() {
  if (!state.wakeWanted || !("wakeLock" in navigator) || document.visibilityState !== "visible") {
    render();
    return;
  }

  try {
    state.wakeLock = await navigator.wakeLock.request("screen");
    state.wakeLock.addEventListener("release", () => {
      state.wakeLock = null;
      render();
    });
    state.supportStatus = "";
  } catch (error) {
    state.supportStatus =
      state.mediaWanted && state.running
        ? "Lock-screen controls requested; Safari may ignore them."
        : `Wake lock unavailable: ${error.name}`;
  }
  render();
}

async function releaseWakeLock() {
  if (!state.wakeLock) {
    return;
  }
  try {
    await state.wakeLock.release();
  } catch {
    state.wakeLock = null;
  }
}

function createMediaBridgeSource() {
  const sampleRate = 8000;
  const seconds = 8;
  const samples = sampleRate * seconds;
  const headerSize = 44;
  const bytesPerSample = 2;
  const buffer = new ArrayBuffer(headerSize + samples * bytesPerSample);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples * bytesPerSample, true);

  for (let index = 0; index < samples; index += 1) {
    view.setInt16(headerSize + index * bytesPerSample, 0, true);
  }

  const blob = new Blob([buffer], { type: "audio/wav" });
  elements.mediaBridge.src = URL.createObjectURL(blob);
  elements.mediaBridge.volume = 0.001;
}

function writeString(view, offset, value) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

async function startMediaBridge() {
  if (!state.mediaWanted || !("mediaSession" in navigator)) {
    updateMediaSession();
    return;
  }

  if (!elements.mediaBridge.src) {
    createMediaBridgeSource();
  }

  try {
    await elements.mediaBridge.play();
    state.supportStatus = "Lock-screen controls requested; Safari may ignore them.";
  } catch (error) {
    state.supportStatus = `Lock-screen controls blocked: ${error.name}`;
  }

  updateMediaSession();
}

function pauseMediaBridge() {
  elements.mediaBridge.pause();
  updateMediaSession();
}

function updateMediaSession() {
  if (!("mediaSession" in navigator)) {
    return;
  }

  const elapsed = getElapsed();
  const { phase } = getCurrentPhase(elapsed);
  if ("MediaMetadata" in window) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: state.activePreset.name,
      artist: phase ? `${phase.label} · ${phase.round}/${phase.roundCount}` : "Vibe Timer",
      album: "Vibe Timer",
      artwork: [
        {
          src: `${location.origin}${location.pathname.replace(/\/[^/]*$/, "/")}assets/icon.svg`,
          sizes: "any",
          type: "image/svg+xml",
        },
      ],
    });
  }
  try {
    navigator.mediaSession.playbackState = state.running ? "playing" : "paused";
  } catch {
    // Some Safari builds expose Media Session partially.
  }

  setMediaAction("play", startTimer);
  setMediaAction("pause", () => pauseTimer());
  setMediaAction("stop", resetTimer);
  setMediaAction("nexttrack", nextPhase);
  setMediaAction("previoustrack", previousPhase);
  setMediaAction("seekforward", () => seekTo(getElapsed() + 10));
  setMediaAction("seekbackward", () => seekTo(getElapsed() - 10));

  if ("setPositionState" in navigator.mediaSession && state.totalSeconds > 0) {
    try {
      navigator.mediaSession.setPositionState({
        duration: state.totalSeconds,
        playbackRate: 1,
        position: Math.min(state.totalSeconds, elapsed),
      });
    } catch {
      // Some browsers reject position state while metadata is settling.
    }
  }
}

function setMediaAction(action, handler) {
  try {
    navigator.mediaSession.setActionHandler(action, handler);
  } catch {
    // Unsupported actions are expected on some mobile browsers.
  }
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

elements.resetButton.addEventListener("click", resetTimer);
elements.restartButton.addEventListener("click", resetTimer);
elements.previousPhaseButton.addEventListener("click", previousPhase);
elements.nextPhaseButton.addEventListener("click", nextPhase);
elements.favoriteButton.addEventListener("click", () => toggleFavorite());

elements.soundButton.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  saveSettings();
  render();
});

elements.wakeButton.addEventListener("click", () => {
  state.wakeWanted = !state.wakeWanted;
  if (state.wakeWanted && state.running) {
    requestWakeLock();
  } else {
    releaseWakeLock();
  }
  saveSettings();
  render();
});

elements.mediaButton.addEventListener("click", () => {
  state.mediaWanted = !state.mediaWanted;
  if (state.mediaWanted && state.running) {
    startMediaBridge();
    state.supportStatus = "Lock-screen controls requested; Safari may ignore them.";
  } else if (state.mediaWanted) {
    state.supportStatus = "Start the timer, then lock phone to try controls.";
  } else {
    pauseMediaBridge();
    state.supportStatus = "Lock-screen controls off.";
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
  if (document.visibilityState === "visible" && state.running && state.wakeWanted) {
    requestWakeLock();
  }
});

if (savedFavoritesVersion < 2) {
  saveFavorites();
  writeStoredValue(storage.favoritesVersion, "2");
}

renderCategories();
loadPreset(state.activePreset);
installServiceWorker();
