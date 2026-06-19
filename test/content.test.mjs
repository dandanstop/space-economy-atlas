import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import {
  audioSummaries,
  chapters,
  editorialLayers,
  getChapter,
  getCopy,
  getEditorialLayer,
  getNode,
  labelForValueChain,
  latestSignals,
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

test("English remains the primary fallback language", () => {
  assert.equal(languages[0].id, "en");
  assert.equal(getCopy("missing-language").brand, pageCopy.en.brand);
  assert.equal(labelForValueChain(valueChain[0], "missing-language"), valueChain[0].en);
  assert.equal(getEditorialLayer("launch-site", "missing-language"), editorialLayers["launch-site"].en);
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
    assert.ok(pageCopy[id].futureSignals);
    assert.ok(pageCopy[id].companyExplorer.title);
    assert.ok(pageCopy[id].companyExplorer.intro);
    assert.ok(pageCopy[id].companyExplorer.private);
    assert.ok(pageCopy[id].companyExplorer.public);
    assert.ok(pageCopy[id].expertPerspective);
    assert.ok(pageCopy[id].governmentPrograms);
    assert.ok(pageCopy[id].researchNotes);
    assert.ok(pageCopy[id].sources);
    assert.ok(pageCopy[id].latestSignals.title);
    assert.ok(pageCopy[id].latestSignals.intro);
    assert.ok(pageCopy[id].latestSignals.subscribe);
    assert.ok(pageCopy[id].latestSignals.subscribeHref.startsWith("mailto:"));

    for (const node of nodes) {
      assert.ok(node.copy[id]);
      assert.ok(editorialLayers[node.id][id]);
    }
  }
});

test("latest signals provide a low-profile curated update layer", () => {
  assert.ok(latestSignals.length >= 5);
  assert.ok(latestSignals.length <= 8);

  for (const signal of latestSignals) {
    assert.ok(signal.id.length > 8);
    assert.match(signal.curatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(["program", "research", "company"].includes(signal.status));
    assert.ok(signal.sourceName.length >= 3);
    assert.equal(new URL(signal.sourceUrl).protocol, "https:");
    assert.ok(signal.topics.length >= 1);
    assert.ok(signal.relatedNodeIds.length >= 1);

    for (const nodeId of signal.relatedNodeIds) {
      assert.ok(getNode(nodeId), `${signal.id} references missing node ${nodeId}`);
    }

    for (const { id: lang } of languages) {
      const copy = signal.copy[lang];
      assert.ok(copy.title.length >= (lang === "zh" ? 16 : 40));
      assert.ok(copy.summary.length >= (lang === "zh" ? 28 : 80));
      assert.ok(copy.takeaway.length >= (lang === "zh" ? 24 : 70));
    }
  }

  for (const chapter of chapters) {
    assert.ok(
      latestSignals.some((signal) => signal.relatedNodeIds.includes(chapter.nodeId)),
      `${chapter.nodeId} should have at least one related latest signal`
    );
  }
});

test("detail tabs use educational reader-facing labels", () => {
  assert.equal(pageCopy.en.detailTabs.overview, "Overview");
  assert.equal(pageCopy.en.detailTabs.industry, "Why It Matters");
  assert.equal(pageCopy.en.detailTabs.engineering, "How It Works");
  assert.equal(pageCopy.zh.detailTabs.overview, "摘要");
  assert.equal(pageCopy.zh.detailTabs.industry, "為何重要");
  assert.equal(pageCopy.zh.detailTabs.engineering, "如何運作");
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
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "spacex-company-disclosures"));
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "wef-clear-orbit"));
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "nasa-commercial-space"));
  assert.ok(sourceNotes.some((sourceNote) => sourceNote.id === "x-threejs-reference"));
});

test("primary chapters include company examples for educational deep dives", () => {
  for (const chapter of chapters) {
    for (const { id: lang } of languages) {
      const editorial = getEditorialLayer(chapter.nodeId, lang);
      assert.ok(editorial.companyExamples.length >= 4, `${chapter.nodeId} missing ${lang} company examples`);
      assert.ok(
        editorial.companyExamples.some((company) => company.status === "private"),
        `${chapter.nodeId} missing ${lang} private company examples`
      );
      assert.ok(
        editorial.companyExamples.some((company) => company.status === "public"),
        `${chapter.nodeId} missing ${lang} public company examples`
      );
      for (const company of editorial.companyExamples) {
        assert.ok(company.name.length > 2);
        assert.ok(["private", "public"].includes(company.status));
        if (company.status === "public") {
          assert.ok(company.ticker.length >= 2);
        } else {
          assert.equal(company.ticker, undefined);
        }
        assert.ok(company.role.length > 20);
        const url = new URL(company.url);
        assert.equal(url.protocol, "https:");
      }
    }
  }
});

test("company examples include representative Chinese commercial space companies", () => {
  for (const { id: lang } of languages) {
    const urls = chapters.flatMap((chapter) => {
      const editorial = getEditorialLayer(chapter.nodeId, lang);
      return editorial.companyExamples.map((company) => company.url);
    });

    for (const expectedUrl of [
      "https://www.landspace.com/",
      "https://www.galactic-energy.cn/",
      "https://www.cas-space.com/",
      "https://www.spacepioneer.cc/",
      "https://www.dbaspace.com/",
      "https://www.commsat.cn/",
      "https://www.geespace.com/"
    ]) {
      assert.ok(urls.includes(expectedUrl), `${lang} company examples should include ${expectedUrl}`);
    }
  }
});

test("primary chapters include future signals for emerging space-economy opportunities", () => {
  for (const chapter of chapters) {
    for (const { id: lang } of languages) {
      const editorial = getEditorialLayer(chapter.nodeId, lang);
      assert.ok(editorial.futureSignals, `${chapter.nodeId} missing ${lang} future signals`);
      assert.ok(editorial.futureSignals.title.length >= 4);
      assert.ok(editorial.futureSignals.items.length >= 2);
      for (const item of editorial.futureSignals.items) {
        assert.ok(item.length >= (lang === "zh" ? 20 : 60));
      }
    }
  }
});

test("primary chapters include progressive educational layers", () => {
  for (const chapter of chapters) {
    for (const { id: lang } of languages) {
      const editorial = getEditorialLayer(chapter.nodeId, lang);
      const industry = editorial.learningLayers?.industry;
      const engineering = editorial.learningLayers?.engineering;

      assert.ok(industry?.intro.length >= (lang === "zh" ? 28 : 80), `${chapter.nodeId} missing ${lang} why intro`);
      assert.ok(
        industry.perspectives?.length >= 1,
        `${chapter.nodeId} missing ${lang} expert perspective`
      );
      assert.ok(
        industry.governmentPrograms?.length >= 3,
        `${chapter.nodeId} missing ${lang} government programs`
      );
      assert.ok(industry.research?.length >= 3, `${chapter.nodeId} missing ${lang} academic research programs`);
      assert.ok(
        engineering?.intro.length >= (lang === "zh" ? 28 : 80),
        `${chapter.nodeId} missing ${lang} how intro`
      );
      assert.ok(engineering.research?.length >= 1, `${chapter.nodeId} missing ${lang} research notes`);

      for (const reference of [
        ...industry.perspectives,
        ...industry.governmentPrograms,
        ...industry.research,
        ...engineering.research
      ]) {
        assert.ok(reference.title.length > 6);
        assert.ok(reference.source.length >= 3);
        assert.ok(reference.takeaway.length >= (lang === "zh" ? 28 : 80));
        const url = new URL(reference.url);
        assert.equal(url.protocol, "https:");
      }
    }
  }
});

test("government program references include China and Japan policy sources", () => {
  for (const { id: lang } of languages) {
    const references = chapters.flatMap((chapter) => {
      const editorial = getEditorialLayer(chapter.nodeId, lang);
      return editorial.learningLayers?.industry?.governmentPrograms ?? [];
    });
    const urls = references.map((reference) => reference.url);

    assert.ok(
      urls.some((url) => url.includes("fund.jaxa.jp")),
      `${lang} government programs should include Japan's Space Strategy Fund`
    );
    assert.ok(
      urls.some((url) => url.includes("en.cmse.gov.cn")),
      `${lang} government programs should include China Manned Space sources`
    );
    assert.ok(
      urls.some((url) => url.includes("cnsa.gov.cn")),
      `${lang} government programs should include CNSA sources`
    );
  }
});

test("audio summaries cover all primary chapters in both languages", () => {
  assert.deepEqual(
    audioSummaries.map((summary) => summary.nodeId),
    chapters.map((chapter) => chapter.nodeId)
  );

  for (const summary of audioSummaries) {
    for (const { id: lang } of languages) {
      assert.ok(summary.copy[lang].title.length > 1);
      assert.ok(summary.copy[lang].script.length > 50);
      assert.ok(summary.copy[lang].file.endsWith(".mp3"));
    }
  }
});

test("audio summary files exist for fixed MP3 playback", async () => {
  for (const summary of audioSummaries) {
    for (const { id: lang } of languages) {
      await access(summary.copy[lang].file);
    }
  }
});

test("public-facing content avoids direct document-title wording", () => {
  const publicContent = JSON.stringify({
    audioSummaries,
    editorialLayers,
    nodes,
    pageCopy,
    sourceNotes
  });

  assert.equal(new RegExp("prospec" + "tus", "i").test(publicContent), false);
  assert.equal(new RegExp("SpaceX " + "EU", "i").test(publicContent), false);
  assert.equal(/For education only, not investment advice/i.test(publicContent), false);
});
