import { getNode, languages } from "./data/content.js";

const validModes = new Set(["intro", "explore", "fallback"]);
const validLayers = new Set(["overview", "industry", "engineering"]);

export function createInitialState() {
  return {
    lang: "en",
    mode: "intro",
    activeChapter: "launch-site",
    selectedNode: "launch-site",
    detailLayer: "overview",
    explodedView: null,
    mobilePanelOpen: false,
    performanceTier: "high",
    webglAvailable: true
  };
}

export function setLanguage(state, lang) {
  const supported = languages.some((language) => language.id === lang);
  return { ...state, lang: supported ? lang : state.lang };
}

export function resetState(state) {
  const initialState = { ...createInitialState(), lang: state.lang };
  if (state.webglAvailable === false) {
    return {
      ...initialState,
      mode: "fallback",
      webglAvailable: false
    };
  }
  return initialState;
}

export function setMode(state, mode) {
  if (!validModes.has(mode)) return state;
  if (mode === "fallback") {
    return {
      ...state,
      mode: "fallback",
      mobilePanelOpen: false,
      webglAvailable: false
    };
  }
  if (state.webglAvailable === false) {
    return {
      ...state,
      mode: "fallback",
      mobilePanelOpen: false,
      webglAvailable: false
    };
  }
  return {
    ...state,
    mode,
    mobilePanelOpen: mode === "explore" ? state.mobilePanelOpen : false,
    webglAvailable: true
  };
}

export function selectNode(state, nodeId) {
  const node = getNode(nodeId);
  if (!node) return state;
  return {
    ...state,
    selectedNode: node.id,
    activeChapter: node.chapterId,
    detailLayer: "overview",
    explodedView: state.explodedView === node.id ? state.explodedView : null,
    mobilePanelOpen: false
  };
}

export function setMobilePanelOpen(state, open) {
  return {
    ...state,
    mobilePanelOpen: Boolean(open)
  };
}

export function setDetailLayer(state, detailLayer) {
  return {
    ...state,
    detailLayer: validLayers.has(detailLayer) ? detailLayer : "overview"
  };
}

export function toggleExplodedView(state, nodeId = state.selectedNode) {
  if (!getNode(nodeId)?.explodable) {
    return { ...state, explodedView: null };
  }
  return {
    ...state,
    selectedNode: nodeId,
    explodedView: state.explodedView === nodeId ? null : nodeId
  };
}

export function setPerformanceTier(state, tier) {
  const performanceTier = ["high", "medium", "low"].includes(tier) ? tier : "medium";
  return { ...state, performanceTier };
}
