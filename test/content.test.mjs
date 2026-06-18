import test from "node:test";
import assert from "node:assert/strict";
import {
  chapters,
  editorialLayers,
  getChapter,
  getCopy,
  getEditorialLayer,
  getNode,
  labelForValueChain,
  languages,
  nodes,
  pageCopy,
  sourceNotes,
  valueChain
} from "../src/data/content.js";

test("content exposes Chinese and English languages", () => {
  assert.deepEqual(
    languages.map((language) => language.id),
    ["en", "zh"]
  );
});

test("all MVP nodes have three content layers in both languages", () => {
  assert.equal(nodes.length, 7);
  for (const node of nodes) {
    assert.ok(node.id);
    assert.ok(node.position);
    assert.ok(node.copy.zh.title);
    assert.ok(node.copy.en.title);
    for (const lang of ["zh", "en"]) {
      assert.ok(node.copy[lang].summary.length > 20);
      assert.ok(node.copy[lang].industry.length >= 3);
      assert.ok(node.copy[lang].engineering.length >= 3);
      assert.ok(node.copy[lang].realityCheck.length > 20);

      const editorial = getEditorialLayer(node.id, lang);
      assert.ok(editorial, `${node.id} missing ${lang} editorial layer`);
      assert.ok(editorial.keyNumbers.length >= 2);
      assert.ok(editorial.deepDive.length >= 2);
      assert.ok(editorial.sources.length >= 2);
    }
  }
});

test("content schema preserves unique IDs and relational integrity", () => {
  const nodeIds = nodes.map((node) => node.id);
  const chapterIds = chapters.map((chapter) => chapter.id);

  assert.equal(new Set(nodeIds).size, nodeIds.length);
  assert.equal(new Set(chapterIds).size, chapterIds.length);

  for (const chapter of chapters) {
    assert.equal(getNode(chapter.nodeId)?.id, chapter.nodeId);
  }

  for (const node of nodes) {
    assert.equal(getChapter(node.chapterId)?.id, node.chapterId);
  }
});

test("all configured languages are available in page and node copy", () => {
  for (const { id } of languages) {
    assert.ok(pageCopy[id]);
    assert.ok(pageCopy[id].brand);
    assert.ok(pageCopy[id].about.link);
    assert.equal(pageCopy[id].about.titlePrefix, "Curated by");
    assert.equal(pageCopy[id].about.titleName, "DanDanStop");
    assert.equal(pageCopy[id].about.contactHref, "mailto:hello@dandanstop.me");
    assert.ok(pageCopy[id].about.body.some((paragraph) => paragraph.includes("all-nighter")));
    assert.ok(pageCopy[id].closePanel);
    assert.ok(pageCopy[id].detailTabs.overview);
    assert.ok(pageCopy[id].keyNumbers);
    assert.ok(pageCopy[id].deepDive);
    assert.ok(pageCopy[id].sources);

    for (const node of nodes) {
      assert.ok(node.copy[id]);
      assert.ok(editorialLayers[node.id][id]);
    }
  }
});

test("chapters and value chain represent the approved structure", () => {
  assert.deepEqual(
    chapters.map((chapter) => chapter.id),
    ["launch-site", "rocket", "satellite", "ground-segment", "applications"]
  );
  assert.deepEqual(
    valueChain.map((item) => item.id),
    ["manufacture", "launch", "deploy", "connect", "apply", "revenue"]
  );
});

test("copy helpers return stable objects", () => {
  assert.equal(getCopy("zh").brand, "太空經濟地圖");
  assert.equal(getCopy("en").brand, "Space Economy Atlas");
  assert.equal(getCopy("zh").about.link, "關於");
  assert.equal(getCopy("en").about.link, "About");
  assert.equal(getCopy("zh").hero.title, "太空經濟，是一條從地面延伸到軌道的產業鏈");
  assert.equal(getCopy("en").hero.title, "The space economy is an industry chain from Earth to orbit");
  assert.equal(getNode("rocket").id, "rocket");
  assert.equal(getNode("missing-node"), null);
  assert.equal(getChapter("rocket").id, "rocket");
  assert.equal(getChapter("missing-chapter"), null);
  assert.equal(getEditorialLayer("rocket", "en").keyNumbers[0].value, "100 t");
  assert.equal(getEditorialLayer("missing-node", "en"), null);
  assert.equal(labelForValueChain(valueChain[0], "zh"), "製造");
  assert.equal(labelForValueChain(valueChain[0], "en"), "Manufacture");
});

test("editorial source links are valid when present", () => {
  for (const node of nodes) {
    for (const { id: lang } of languages) {
      const editorial = getEditorialLayer(node.id, lang);
      for (const source of editorial.sources) {
        assert.ok(source.label.length > 4);
        if (source.url) {
          const url = new URL(source.url);
          assert.equal(url.protocol, "https:");
        } else {
          assert.ok(source.detail?.length > 8);
        }
      }
    }
  }
});

test("source notes include required provenance references", () => {
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "user-prospectus"));
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "wef-clear-orbit"));
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "nasa-commercial-space"));
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "x-threejs-reference"));
});
