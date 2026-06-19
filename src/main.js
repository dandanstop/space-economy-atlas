import {
  audioSummaries,
  chapters,
  getCopy,
  getEditorialLayer,
  getNode,
  languages,
  nodes
} from "./data/content.js?v=20260620-audio";
import {
  createInitialState,
  selectNode,
  setDetailLayer,
  setLanguage,
  setMobilePanelOpen,
  setMode
} from "./state.js";
import { initAnalytics, trackEvent } from "./analytics.js";
import { createSpaceScene } from "./scene.js";

const elements = {
  app: document.querySelector("#app"),
  canvas: document.querySelector("#space-canvas"),
  brand: document.querySelector(".brand"),
  aboutLink: document.querySelector("#about-link"),
  aboutDialog: document.querySelector("#about-dialog"),
  aboutDialogContent: document.querySelector("#about-dialog-content"),
  aboutDialogClose: document.querySelector("#about-dialog-close"),
  fallbackView: document.querySelector("#fallback-view"),
  languageToggle: document.querySelector("#language-toggle"),
  chapterRail: document.querySelector("#chapter-rail"),
  chapterRailButtons: document.querySelector("#chapter-rail-buttons"),
  audioGuide: document.querySelector("#audio-guide"),
  heroCopy: document.querySelector("#hero-copy"),
  nodePanel: document.querySelector("#node-panel"),
  mobileScrollSteps: document.querySelector("#mobile-scroll-steps")
};

let state = createInitialState();
let scene = null;
let mobileStepObserver = null;
const mobileLayoutQuery = window.matchMedia?.("(max-width: 920px)");
const wheelStepCooldownMs = 620;
const wheelStepThreshold = 36;
let lastWheelStepAt = 0;
let audioSelectedNodeId = audioSummaries[0]?.nodeId ?? "launch-site";
let audioStatus = "idle";
const audioElement = new Audio();
audioElement.preload = "metadata";

if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
  state = setMode(state, "explore");
}

initAnalytics();

function getNodeTrackingParams(nodeId, interactionType) {
  const node = getNode(nodeId);
  return {
    interaction_type: interactionType,
    node_id: node?.id ?? nodeId,
    chapter_id: node?.chapterId ?? "",
    node_title: node?.copy?.[state.lang]?.title ?? "",
    language: state.lang
  };
}

function createButton({ className, text, pressed, disabled, dataset, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  if (pressed !== undefined) button.setAttribute("aria-pressed", String(pressed));
  if (disabled) button.disabled = true;
  for (const [key, value] of Object.entries(dataset ?? {})) {
    button.dataset[key] = value;
  }
  button.addEventListener("click", onClick);
  return button;
}

function renderKeyNumbers(editorial, copy) {
  if (!editorial?.keyNumbers?.length) return null;

  const section = document.createElement("section");
  section.className = "node-panel__metrics";
  section.setAttribute("aria-label", copy.keyNumbers);

  const heading = document.createElement("h3");
  heading.className = "node-panel__eyebrow";
  heading.textContent = copy.keyNumbers;

  const grid = document.createElement("div");
  grid.className = "node-panel__metric-grid";

  for (const metric of editorial.keyNumbers) {
    const item = document.createElement("article");
    item.className = "node-panel__metric";

    const value = document.createElement("strong");
    value.textContent = metric.value;

    const label = document.createElement("span");
    label.textContent = metric.label;

    item.append(value, label);
    grid.append(item);
  }

  section.append(heading, grid);
  return section;
}

function renderDisclosure(title, content, modifier = "") {
  const details = document.createElement("details");
  details.className = ["node-panel__disclosure", modifier].filter(Boolean).join(" ");

  const summary = document.createElement("summary");
  summary.textContent = title;
  summary.addEventListener("click", () => {
    if (!details.open) {
      trackEvent("content_disclosure_opened", {
        disclosure_title: title,
        node_id: state.selectedNode,
        detail_layer: state.detailLayer,
        language: state.lang
      });
    }
  });

  const body = document.createElement("div");
  body.className = "node-panel__disclosure-body";
  body.append(content);

  details.append(summary, body);
  return details;
}

function renderDeepDive(editorial) {
  const wrap = document.createElement("div");
  wrap.className = "node-panel__deep-dive";

  for (const paragraph of editorial?.deepDive ?? []) {
    const text = document.createElement("p");
    text.textContent = paragraph;
    wrap.append(text);
  }

  return wrap;
}

function renderSources(editorial) {
  const list = document.createElement("ul");
  list.className = "node-panel__source-list";

  for (const source of editorial?.sources ?? []) {
    const item = document.createElement("li");

    const label = source.url ? document.createElement("a") : document.createElement("span");
    label.textContent = source.label;
    if (source.url) {
      label.href = source.url;
      label.target = "_blank";
      label.rel = "noreferrer";
    }

    item.append(label);

    if (source.detail) {
      const detail = document.createElement("small");
      detail.textContent = source.detail;
      item.append(detail);
    }

    list.append(item);
  }

  return list;
}

function renderCompanyExamples(editorial, copy) {
  const wrap = document.createElement("div");
  wrap.className = "node-panel__companies";

  const note = document.createElement("p");
  note.className = "node-panel__company-note";
  note.textContent = copy.publicCompaniesNote;

  const list = document.createElement("ul");
  list.className = "node-panel__company-list";

  for (const company of editorial?.companyExamples ?? []) {
    const item = document.createElement("li");
    item.className = "node-panel__company";

    const link = document.createElement("a");
    link.href = company.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = company.ticker ? `${company.name} (${company.ticker})` : company.name;
    link.addEventListener("click", () => {
      trackEvent("company_example_clicked", {
        company_name: company.name,
        ticker: company.ticker ?? "",
        node_id: state.selectedNode,
        language: state.lang
      });
    });

    const role = document.createElement("p");
    role.textContent = company.role;

    item.append(link, role);
    list.append(item);
  }

  wrap.append(note, list);
  return wrap;
}

function getAudioSegment(nodeId = audioSelectedNodeId) {
  return audioSummaries.find((segment) => segment.nodeId === nodeId) ?? audioSummaries[0] ?? null;
}

function getAudioSegmentCopy(segment = getAudioSegment()) {
  return segment?.copy?.[state.lang] ?? segment?.copy?.en ?? segment?.copy?.zh ?? null;
}

function hasAudioFile(segmentCopy = getAudioSegmentCopy()) {
  return Boolean(segmentCopy?.file);
}

function getAudioTrackingParams(action) {
  const segment = getAudioSegment();
  const segmentCopy = getAudioSegmentCopy(segment);
  return {
    audio_action: action,
    audio_source: "elevenlabs_mp3",
    audio_segment_id: segment?.nodeId ?? "",
    audio_segment_title: segmentCopy?.title ?? "",
    audio_file: segmentCopy?.file ?? "",
    language: state.lang
  };
}

function resetAudio({ renderGuide = true } = {}) {
  audioElement.pause();
  audioElement.removeAttribute("src");
  audioElement.load();
  audioStatus = "idle";
  if (renderGuide) renderAudioGuide(getCopy(state.lang));
}

async function startAudio({ eventName = "audio_played", action = "played" } = {}) {
  const segment = getAudioSegment();
  const segmentCopy = getAudioSegmentCopy(segment);
  if (!segmentCopy?.file) return;

  const audioUrl = new URL(segmentCopy.file, document.baseURI).href;
  if (audioElement.src !== audioUrl) {
    audioElement.src = audioUrl;
    audioElement.currentTime = 0;
  }

  try {
    await audioElement.play();
    audioStatus = "playing";
    renderAudioGuide(getCopy(state.lang));
    trackEvent(eventName, getAudioTrackingParams(action));
  } catch {
    audioStatus = "idle";
    renderAudioGuide(getCopy(state.lang));
    trackEvent("audio_error", getAudioTrackingParams("error"));
  }
}

function pauseAudio() {
  if (audioStatus !== "playing") return;
  audioElement.pause();
  audioStatus = "paused";
  renderAudioGuide(getCopy(state.lang));
  trackEvent("audio_paused", getAudioTrackingParams("paused"));
}

function resumeAudio() {
  if (audioStatus !== "paused") return;
  startAudio({ eventName: "audio_resumed", action: "resumed" });
}

function toggleAudio() {
  if (audioStatus === "playing") {
    pauseAudio();
    return;
  }

  if (audioStatus === "paused") {
    resumeAudio();
    return;
  }

  startAudio();
}

function selectAudioSegment(nodeId) {
  const shouldContinue = audioStatus === "playing";
  resetAudio({ renderGuide: false });
  audioSelectedNodeId = nodeId;
  renderAudioGuide(getCopy(state.lang));
  trackEvent("audio_segment_selected", getAudioTrackingParams("segment_selected"));
  if (shouldContinue) startAudio();
}

function maybeSyncAudioSegment(nodeId) {
  if (audioStatus !== "idle") return;
  if (!audioSummaries.some((segment) => segment.nodeId === nodeId)) return;
  audioSelectedNodeId = nodeId;
}

function setState(nextState) {
  const previousMode = state.mode;
  state = nextState;
  render();
  scene?.syncState(state);

  if (previousMode !== state.mode && state.mode === "explore" && isMobileLayout()) {
    window.scrollTo(0, 0);
  }
}

function isMobileLayout() {
  return Boolean(mobileLayoutQuery?.matches);
}

function isInteractiveScrollTarget(target) {
  return Boolean(
    target?.closest?.(
      [
        "#node-panel",
        "#about-dialog",
        "#audio-guide",
        "#language-toggle",
        "#chapter-rail",
        ".about-link",
        ".hero-copy__actions"
      ].join(",")
    )
  );
}

function stepDesktopChapter(direction) {
  const activeIndex = chapters.findIndex((chapter) => chapter.id === state.activeChapter);
  if (activeIndex < 0) return false;

  const nextIndex = Math.min(Math.max(activeIndex + direction, 0), chapters.length - 1);
  if (nextIndex === activeIndex) return false;

  selectNodeInExplore(chapters[nextIndex].nodeId, { interactionType: "desktop_wheel" });
  return true;
}

function handleDesktopWheel(event) {
  if (state.mode !== "explore" || isMobileLayout() || isInteractiveScrollTarget(event.target)) return;
  if (Math.abs(event.deltaY) < wheelStepThreshold) return;

  const now = performance.now();
  if (now - lastWheelStepAt < wheelStepCooldownMs) {
    event.preventDefault();
    return;
  }

  const direction = event.deltaY > 0 ? 1 : -1;
  if (stepDesktopChapter(direction)) {
    lastWheelStepAt = now;
    event.preventDefault();
  }
}

function selectNodeInExplore(nodeId, { openPanel = false, interactionType = "unknown" } = {}) {
  const selected = setMode(selectNode(state, nodeId), "explore");
  maybeSyncAudioSegment(nodeId);
  setState(openPanel ? setMobilePanelOpen(selected, true) : selected);
  trackEvent("node_selected", getNodeTrackingParams(nodeId, interactionType));
}

function openMobileNodePanel(nodeId, interactionType = "mobile_sticky_card") {
  const selected = setMode(selectNode(state, nodeId), "explore");
  maybeSyncAudioSegment(nodeId);
  setState(setMobilePanelOpen(selected, true));
  trackEvent("overview_opened", getNodeTrackingParams(nodeId, interactionType));
}

function renderLanguages() {
  elements.languageToggle.replaceChildren(
    ...languages.map((language) =>
      createButton({
        className: "language-button",
        text: language.label,
        pressed: state.lang === language.id,
        onClick: () => {
          if (state.lang !== language.id) {
            resetAudio({ renderGuide: false });
            trackEvent("language_selected", {
              language: language.id,
              previous_language: state.lang,
              label: language.label
            });
          }
          setState(setLanguage(state, language.id));
        }
      })
    )
  );
}

function renderBrand(copy) {
  elements.brand.textContent = copy.brand;
}

function renderAbout(copy) {
  elements.aboutLink.textContent = copy.about.link;
  elements.aboutDialogClose.textContent = "\u00d7";
  elements.aboutDialogClose.setAttribute("aria-label", copy.about.close);

  const title = document.createElement("h2");
  title.id = "about-title";
  title.className = "about-dialog__title";

  const prefix = document.createElement("span");
  prefix.textContent = copy.about.titlePrefix;

  const name = document.createElement("span");
  name.textContent = copy.about.titleName;

  title.append(prefix, name);

  const body = document.createElement("div");
  body.className = "about-dialog__body";

  for (const paragraph of copy.about.body) {
    const text = document.createElement("p");
    text.textContent = paragraph;
    body.append(text);
  }

  const lastUpdated = document.createElement("p");
  lastUpdated.className = "about-dialog__updated";
  lastUpdated.textContent = copy.about.lastUpdated;

  const contact = document.createElement("a");
  contact.className = "about-dialog__contact";
  contact.href = copy.about.contactHref;
  contact.textContent = copy.about.contactLabel;
  contact.addEventListener("click", () => {
    trackEvent("contact_clicked", {
      contact_method: "email",
      link_url: copy.about.contactHref,
      language: state.lang
    });
  });

  elements.aboutDialogContent.replaceChildren(title, body, lastUpdated, contact);
}

function renderAudioGuide(copy) {
  const segment = getAudioSegment();
  const segmentCopy = getAudioSegmentCopy(segment);
  const canPlayAudio = hasAudioFile(segmentCopy);

  const label = document.createElement("span");
  label.className = "audio-guide__label";
  label.textContent = copy.audio.title;

  const playLabel = audioStatus === "playing" ? copy.audio.pause : audioStatus === "paused" ? copy.audio.resume : copy.audio.play;
  const playButton = createButton({
    className: "audio-guide__button",
    text: playLabel,
    pressed: audioStatus === "playing",
    disabled: !canPlayAudio,
    onClick: toggleAudio
  });
  playButton.setAttribute("aria-label", playLabel);

  const select = document.createElement("select");
  select.className = "audio-guide__select";
  select.setAttribute("aria-label", copy.audio.playlist);
  select.disabled = !audioSummaries.length;
  select.addEventListener("change", () => {
    selectAudioSegment(select.value);
  });

  for (const summary of audioSummaries) {
    const option = document.createElement("option");
    option.value = summary.nodeId;
    option.textContent = summary.copy?.[state.lang]?.title ?? summary.copy?.en?.title ?? summary.nodeId;
    select.append(option);
  }
  select.value = segment?.nodeId ?? "";

  const status = document.createElement("span");
  status.className = "audio-guide__status";
  status.textContent = canPlayAudio ? segmentCopy?.title ?? "" : copy.audio.unavailable;

  const controls = document.createElement("div");
  controls.className = "audio-guide__controls";
  controls.append(playButton, select);

  elements.audioGuide.replaceChildren(label, controls, status);
}

function openAboutDialog() {
  renderAbout(getCopy(state.lang));
  trackEvent("about_opened", {
    language: state.lang
  });

  if (typeof elements.aboutDialog.showModal === "function") {
    elements.aboutDialog.showModal();
  } else {
    elements.aboutDialog.setAttribute("open", "");
  }
}

function closeAboutDialog() {
  if (typeof elements.aboutDialog.close === "function") {
    elements.aboutDialog.close();
  } else {
    elements.aboutDialog.removeAttribute("open");
  }
}

function renderHero(copy) {
  const section = document.createElement("div");
  section.className = "hero-copy__content";

  const kicker = document.createElement("p");
  kicker.className = "hero-copy__kicker";
  kicker.textContent = copy.hero.kicker;

  const title = document.createElement("h1");
  title.textContent = copy.hero.title;

  const subtitle = document.createElement("p");
  subtitle.className = "hero-copy__subtitle";
  subtitle.textContent = copy.hero.subtitle;

  const prompt = document.createElement("p");
  prompt.className = "hero-copy__prompt";
  prompt.textContent = copy.hero.prompt;

  const actions = document.createElement("div");
  actions.className = "hero-copy__actions";
  actions.append(
    createButton({
      className: "hero-action hero-action--primary",
      text: state.mode === "intro" ? copy.skipIntro : copy.replayIntro,
      onClick: () => {
        const nextMode = state.mode === "intro" ? "explore" : "intro";
        trackEvent(state.mode === "intro" ? "intro_skipped" : "intro_replayed", {
          language: state.lang
        });
        setState(setMode(state, nextMode));
      }
    })
  );

  section.append(kicker, title, subtitle, prompt, actions);
  elements.heroCopy.replaceChildren(section);
}

function renderChapters() {
  elements.chapterRailButtons.replaceChildren(
    ...chapters.map((chapter, index) => {
      const node = getNode(chapter.nodeId);
      const nodeCopy = node.copy[state.lang];
      return createButton({
        className: "chapter-button",
        text: nodeCopy.title,
        pressed: state.activeChapter === chapter.id,
        dataset: { index: String(index + 1), total: String(chapters.length) },
        onClick: () => {
          if (isMobileLayout() && state.mode === "explore") {
            openMobileNodePanel(chapter.nodeId, "mobile_sticky_card");
            return;
          }
          selectNodeInExplore(chapter.nodeId, { interactionType: "chapter_navigation" });
        }
      });
    })
  );
}

function observeMobileSteps() {
  mobileStepObserver?.disconnect();
  mobileStepObserver = null;

  if (!("IntersectionObserver" in window) || !elements.mobileScrollSteps.children.length) return;

  mobileStepObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      const nodeId = visible?.target?.dataset?.node;
      if (!nodeId || state.mode !== "explore" || state.selectedNode === nodeId) return;
      maybeSyncAudioSegment(nodeId);
      setState(setMode(selectNode(state, nodeId), "explore"));
      trackEvent("node_selected", getNodeTrackingParams(nodeId, "mobile_scroll"));
    },
    {
      threshold: [0.5, 0.7, 0.9],
      rootMargin: "0px"
    }
  );

  for (const step of elements.mobileScrollSteps.children) {
    mobileStepObserver.observe(step);
  }
}

function renderMobileScrollSteps() {
  elements.mobileScrollSteps.replaceChildren(
    ...chapters.map((chapter, index) => {
      const step = document.createElement("section");
      step.className = "mobile-scroll-step";
      step.dataset.node = chapter.nodeId;
      step.dataset.index = String(index + 1);
      return step;
    })
  );
  observeMobileSteps();
}

function renderDetailBody(nodeCopy, editorial, copy) {
  const body = document.createElement("div");
  body.className = "node-panel__body";

  if (state.detailLayer === "overview") {
    const summary = document.createElement("p");
    summary.className = "node-panel__summary";
    summary.textContent = nodeCopy.summary;

    const reality = document.createElement("p");
    reality.className = "node-panel__reality";
    reality.textContent = nodeCopy.realityCheck;

    const keyNumbers = renderKeyNumbers(editorial, copy);
    if (keyNumbers) body.append(summary, keyNumbers, reality);
    else body.append(summary, reality);

    if (editorial?.deepDive?.length) {
      body.append(renderDisclosure(copy.deepDive, renderDeepDive(editorial)));
    }

    if (editorial?.companyExamples?.length) {
      body.append(renderDisclosure(copy.publicCompanies, renderCompanyExamples(editorial, copy)));
    }

    if (editorial?.sources?.length) {
      body.append(renderDisclosure(copy.sources, renderSources(editorial), "node-panel__disclosure--sources"));
    }

    return body;
  }

  const list = document.createElement("ul");
  for (const item of nodeCopy[state.detailLayer]) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  }

  body.append(list);
  return body;
}

function renderNodePanel(copy) {
  const node = getNode(state.selectedNode) ?? getNode("launch-site");
  const nodeCopy = node.copy[state.lang];
  const editorial = getEditorialLayer(node.id, state.lang);

  const title = document.createElement("h2");
  title.textContent = nodeCopy.title;

  const tabs = document.createElement("div");
  tabs.className = "node-panel__tabs";
  for (const layer of ["overview", "industry", "engineering"]) {
    tabs.append(
      createButton({
        className: "detail-tab",
        text: copy.detailTabs[layer] ?? layer,
        pressed: state.detailLayer === layer,
        onClick: () => {
          trackEvent("detail_tab_selected", {
            detail_layer: layer,
            node_id: state.selectedNode,
            language: state.lang
          });
          setState(setDetailLayer(state, layer));
        }
      })
    );
  }

  const header = document.createElement("div");
  header.className = "node-panel__header";

  const closeButton = createButton({
    className: "node-panel__close",
    text: "\u00d7",
    onClick: () => {
      trackEvent("overview_closed", {
        node_id: state.selectedNode,
        language: state.lang
      });
      setState(setMobilePanelOpen(state, false));
    }
  });
  closeButton.setAttribute("aria-label", copy.closePanel);

  header.append(title, closeButton);

  elements.nodePanel.replaceChildren(header, tabs, renderDetailBody(nodeCopy, editorial, copy));
}

function renderFallback(copy) {
  const title = document.createElement("h2");
  title.textContent = copy.fallbackTitle;

  const intro = document.createElement("p");
  intro.textContent = copy.fallbackIntro;

  const list = document.createElement("div");
  list.className = "fallback-view__nodes";
  for (const node of nodes) {
    list.append(
      createButton({
        className: "fallback-node",
        text: node.copy[state.lang].title,
        pressed: state.selectedNode === node.id,
        dataset: { node: node.id },
        onClick: () => setState(selectNode(state, node.id))
      })
    );
  }

  elements.fallbackView.hidden = state.mode !== "fallback";
  elements.fallbackView.replaceChildren(title, intro, list);
}

function render() {
  const copy = getCopy(state.lang);
  const language = languages.find((item) => item.id === state.lang) ?? languages[0];

  elements.app.dataset.mode = state.mode;
  elements.app.dataset.tier = state.performanceTier;
  elements.app.dataset.mobilePanel = state.mobilePanelOpen ? "open" : "closed";
  document.documentElement.lang = language.htmlLang;
  document.documentElement.dataset.atlasMode = state.mode;

  renderBrand(copy);
  renderAbout(copy);
  renderLanguages();
  renderAudioGuide(copy);
  renderHero(copy);
  renderChapters();
  renderNodePanel(copy);
  renderMobileScrollSteps();
  renderFallback(copy);
}

function onNodeSelect(nodeId) {
  selectNodeInExplore(nodeId, { interactionType: "model_raycast" });
}

function onIntroComplete() {
  if (state.mode === "intro") {
    trackEvent("intro_completed", {
      language: state.lang
    });
    setState(setMode(state, "explore"));
  }
}

function onWebGLUnavailable() {
  setState(setMode(state, "fallback"));
}

render();
elements.app.addEventListener("wheel", handleDesktopWheel, { passive: false });
audioElement.addEventListener("ended", () => {
  audioStatus = "idle";
  renderAudioGuide(getCopy(state.lang));
  trackEvent("audio_completed", getAudioTrackingParams("completed"));
});
audioElement.addEventListener("error", () => {
  audioStatus = "idle";
  renderAudioGuide(getCopy(state.lang));
  trackEvent("audio_error", getAudioTrackingParams("error"));
});
elements.aboutLink.addEventListener("click", openAboutDialog);
elements.aboutDialogClose.addEventListener("click", closeAboutDialog);
elements.aboutDialogClose.addEventListener("click", () => {
  trackEvent("about_closed", {
    close_method: "button",
    language: state.lang
  });
});
elements.aboutDialog.addEventListener("click", (event) => {
  if (event.target === elements.aboutDialog) {
    closeAboutDialog();
    trackEvent("about_closed", {
      close_method: "backdrop",
      language: state.lang
    });
  }
});

scene = createSpaceScene({
  canvas: elements.canvas,
  onNodeSelect,
  onIntroComplete,
  onWebGLUnavailable
});
scene.syncState(state);
scene.start();
