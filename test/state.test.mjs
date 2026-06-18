import test from "node:test";
import assert from "node:assert/strict";
import {
  createInitialState,
  resetState,
  selectNode,
  setDetailLayer,
  setLanguage,
  setMobilePanelOpen,
  setMode,
  setPerformanceTier,
  toggleExplodedView
} from "../src/state.js";

test("createInitialState returns the default atlas state", () => {
  assert.deepEqual(createInitialState(), {
    lang: "en",
    mode: "intro",
    activeChapter: "launch-site",
    selectedNode: "launch-site",
    detailLayer: "overview",
    explodedView: null,
    mobilePanelOpen: false,
    performanceTier: "high",
    webglAvailable: true
  });
});

test("setLanguage switches supported languages and keeps unsupported languages unchanged", () => {
  const state = createInitialState();

  assert.equal(setLanguage(state, "en").lang, "en");
  assert.equal(setLanguage(state, "fr").lang, "en");
});

test("selectNode selects a valid node, activates its chapter, and resets details", () => {
  const state = selectNode(setMobilePanelOpen(createInitialState(), true), "satellite");

  assert.equal(state.selectedNode, "satellite");
  assert.equal(state.activeChapter, "satellite");
  assert.equal(state.detailLayer, "overview");
  assert.equal(state.mobilePanelOpen, false);
});

test("setDetailLayer accepts known layers and resets invalid layers to overview", () => {
  const state = createInitialState();

  assert.equal(setDetailLayer(state, "industry").detailLayer, "industry");
  assert.equal(setDetailLayer(state, "engineering").detailLayer, "engineering");
  assert.equal(setDetailLayer(state, "invalid").detailLayer, "overview");
});

test("toggleExplodedView opens explodable content nodes and clears other nodes", () => {
  const opened = toggleExplodedView(createInitialState(), "rocket");
  assert.equal(opened.selectedNode, "rocket");
  assert.equal(opened.explodedView, "rocket");
  assert.equal(toggleExplodedView(opened, "rocket").explodedView, null);

  assert.equal(toggleExplodedView(createInitialState(), "ground-station").explodedView, null);
});

test("setMode switches to explore and fallback disables WebGL", () => {
  assert.equal(setMode(createInitialState(), "explore").mode, "explore");

  const fallback = setMode(setMobilePanelOpen(createInitialState(), true), "fallback");
  assert.equal(fallback.mode, "fallback");
  assert.equal(fallback.webglAvailable, false);
  assert.equal(fallback.mobilePanelOpen, false);
});

test("setMode keeps fallback when WebGL is unavailable", () => {
  const fallback = setMode(createInitialState(), "fallback");
  const explore = setMode(fallback, "explore");

  assert.equal(explore.mode, "fallback");
  assert.equal(explore.webglAvailable, false);
});

test("resetState preserves language and fallback WebGL invariants", () => {
  const fallback = setMode(setLanguage(createInitialState(), "en"), "fallback");
  const reset = resetState(fallback);

  assert.equal(reset.lang, "en");
  assert.equal(reset.mode, "fallback");
  assert.equal(reset.webglAvailable, false);
});

test("setMobilePanelOpen controls mobile overview panel visibility", () => {
  const opened = setMobilePanelOpen(createInitialState(), true);
  assert.equal(opened.mobilePanelOpen, true);
  assert.equal(setMobilePanelOpen(opened, false).mobilePanelOpen, false);
});

test("setPerformanceTier accepts known tiers and defaults invalid tiers to medium", () => {
  const state = createInitialState();

  assert.equal(setPerformanceTier(state, "high").performanceTier, "high");
  assert.equal(setPerformanceTier(state, "medium").performanceTier, "medium");
  assert.equal(setPerformanceTier(state, "low").performanceTier, "low");
  assert.equal(setPerformanceTier(state, "turbo").performanceTier, "medium");
});
