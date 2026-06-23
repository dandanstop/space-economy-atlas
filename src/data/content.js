export const languages = [
  { id: "en", label: "EN", htmlLang: "en", speechLang: "en-US" },
  { id: "zh", label: "中文", htmlLang: "zh-Hant", speechLang: "zh-TW" }
];

export const valueChain = [
  { id: "manufacture", zh: "製造", en: "Manufacture" },
  { id: "launch", zh: "發射", en: "Launch" },
  { id: "deploy", zh: "部署", en: "Deploy" },
  { id: "connect", zh: "連線", en: "Connect" },
  { id: "apply", zh: "應用", en: "Apply" },
  { id: "revenue", zh: "收入", en: "Revenue" }
];

export const chapters = [
  { id: "launch-site", nodeId: "launch-site", icon: "pad" },
  { id: "rocket", nodeId: "rocket", icon: "rocket" },
  { id: "satellite", nodeId: "satellite", icon: "satellite" },
  { id: "ground-segment", nodeId: "ground-station", icon: "antenna" },
  { id: "applications", nodeId: "applications", icon: "market" }
];

export const audioSummaries = [
  {
    nodeId: "launch-site",
    copy: {
      zh: {
        title: "發射站",
        file: "assets/audio/zh-launch-site.mp3",
        script:
          "太空經濟，是一條從地面延伸到軌道的產業鏈。我們先從地面開始。發射站不是一塊空地，它像太空任務的總控中心，把整合、燃料、安全和倒數流程串起來，讓硬體真的變成軌道任務。"
      },
      en: {
        title: "Launch Site",
        file: "assets/audio/en-launch-site.mp3",
        script:
          "The space economy is an industry chain from Earth to orbit. Let's start on the ground. A launch site is not just a location; it is the mission control layer that turns hardware into an orbital launch through integration, fueling, safety, and countdown operations."
      }
    }
  },
  {
    nodeId: "rocket",
    copy: {
      zh: {
        title: "火箭",
        file: "assets/audio/zh-rocket.mp3",
        script:
          "接著看火箭。它是太空經濟的物流層，當可回收技術越成熟，發射就不只是一次冒險，而是更接近可重複營運的運輸服務。"
      },
      en: {
        title: "Rocket",
        file: "assets/audio/en-rocket.mp3",
        script:
          "Next comes the rocket. Think of it as the logistics layer of the space economy. Reuse is what can move launch from a one-time mission toward a repeatable transportation service."
      }
    }
  },
  {
    nodeId: "satellite",
    copy: {
      zh: {
        title: "衛星",
        file: "assets/audio/zh-satellite.mp3",
        script:
          "到了軌道，衛星才把太空變成服務。通訊、觀測、導航和資料中繼，都靠這些軌道上的平台，把太空能力帶回地面。"
      },
      en: {
        title: "Satellite",
        file: "assets/audio/en-satellite.mp3",
        script:
          "Once in orbit, satellites turn space into services. Communications, observation, navigation, and data relay all depend on these platforms quietly working above Earth."
      }
    }
  },
  {
    nodeId: "ground-station",
    copy: {
      zh: {
        title: "太空站",
        file: "assets/audio/zh-space-station.mp3",
        script:
          "太空站像軌道上的實驗室和工作平台。科研、維修、國際合作和商業實驗都在這裡發生，也讓未來在軌服務變得更具體。"
      },
      en: {
        title: "Space Station",
        file: "assets/audio/en-space-station.mp3",
        script:
          "A space station works like a laboratory and workbench in orbit. It supports research, servicing, experiments, and international cooperation, while pointing toward future in-orbit infrastructure."
      }
    }
  },
  {
    nodeId: "applications",
    copy: {
      zh: {
        title: "下游應用",
        file: "assets/audio/zh-applications.mp3",
        script:
          "最後回到地面。寬頻、航空、海事、災害備援、IoT 和手機直連衛星，這些應用才是一般人真正感受到太空經濟的時刻。"
      },
      en: {
        title: "Applications",
        file: "assets/audio/en-applications.mp3",
        script:
          "Finally, the value returns to Earth. Broadband, aviation, maritime links, disaster backup, IoT, and direct-to-device services are where people actually feel the space economy."
      }
    }
  }
];

export const latestSignals = [
  {
    id: "jaxa-space-strategy-fund-orbital-infrastructure",
    curatedAt: "2026-06-20",
    status: "program",
    sourceName: "JAXA Space Strategy Fund",
    sourceUrl: "https://fund.jaxa.jp/",
    topics: ["policy", "launch", "satellite", "applications"],
    relatedNodeIds: ["launch-site", "rocket", "satellite", "applications"],
    copy: {
      zh: {
        title: "日本把軌道資料中心、光通訊與月面基礎設施放進長期研發框架",
        summary: "JAXA Space Strategy Fund 適合追蹤日本如何把發射、衛星、探測與下一代太空應用放進同一個產業政策框架。",
        takeaway: "這不是單一任務，而是國家如何培養太空供應鏈與未來商業場景的訊號。"
      },
      en: {
        title: "Japan frames orbital data centers, optical links, and lunar infrastructure as long-term R&D themes",
        summary: "The JAXA Space Strategy Fund is a useful signal for how Japan connects launch, satellites, exploration, and next-generation space applications in one policy frame.",
        takeaway: "This is less about one mission and more about how a country cultivates the supply chain behind future space markets."
      }
    }
  },
  {
    id: "nasa-commercial-leo-stations-marketplace",
    curatedAt: "2026-06-20",
    status: "program",
    sourceName: "NASA Commercial LEO Destinations",
    sourceUrl: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/commercial-destinations-in-low-earth-orbit/",
    topics: ["station", "commercial-space", "research"],
    relatedNodeIds: ["ground-station", "applications"],
    copy: {
      zh: {
        title: "NASA 持續把低軌太空站描述為可購買服務的市場",
        summary: "NASA 的商業低軌方向讓太空站從政府擁有的單一平台，逐步轉向可由多個客戶使用的服務基礎設施。",
        takeaway: "這有助於讀者理解太空站為何可能成為研究、製造與在軌服務的共同平台。"
      },
      en: {
        title: "NASA keeps positioning LEO stations as a service marketplace",
        summary: "NASA's commercial LEO direction moves stations from a government-owned platform toward infrastructure that multiple customers can use as a service.",
        takeaway: "It helps readers understand why stations may become shared platforms for research, production, and in-orbit services."
      }
    }
  },
  {
    id: "esa-moonlight-lunar-navigation",
    curatedAt: "2026-06-20",
    status: "program",
    sourceName: "ESA Moonlight",
    sourceUrl: "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Moonlight",
    topics: ["lunar", "satellite", "infrastructure"],
    relatedNodeIds: ["satellite", "applications"],
    copy: {
      zh: {
        title: "ESA Moonlight 把月球通訊與導航視為下一層基礎設施",
        summary: "月球任務增加後，定位、時間同步與資料連線會像地球基礎設施一樣重要。",
        takeaway: "月球經濟不只需要火箭，也需要讓任務可以重複運作的通訊與導航服務。"
      },
      en: {
        title: "ESA Moonlight treats lunar communications and navigation as the next infrastructure layer",
        summary: "As lunar activity grows, positioning, timing, and data links become as important as they are for infrastructure on Earth.",
        takeaway: "The lunar economy needs more than rockets; it needs communications and navigation services that make missions repeatable."
      }
    }
  },
  {
    id: "cnsa-ilrs-lunar-research-station",
    curatedAt: "2026-06-20",
    status: "program",
    sourceName: "CNSA ILRS",
    sourceUrl: "https://www.cnsa.gov.cn/english/n6465652/n6465653/c6812150/content.html",
    topics: ["lunar", "station", "policy"],
    relatedNodeIds: ["ground-station", "applications"],
    copy: {
      zh: {
        title: "CNSA 國際月球科研站顯示月球正在被重新定義為研究平台",
        summary: "ILRS 方向讓月球不只是目的地，也可能成為科研、能源、通訊、導航與國際合作的長期平台。",
        takeaway: "這提醒讀者：太空站的概念未來可能從低軌延伸到月球表面與月球軌道。"
      },
      en: {
        title: "CNSA's ILRS direction reframes the Moon as a research platform",
        summary: "The ILRS direction points to the Moon as a long-term platform for science, energy, communications, navigation, and international cooperation.",
        takeaway: "It reminds readers that the idea of a station may extend from low Earth orbit to lunar orbit and the lunar surface."
      }
    }
  },
  {
    id: "arxiv-orbital-data-center-communications",
    curatedAt: "2026-06-20",
    status: "research",
    sourceName: "arXiv",
    sourceUrl: "https://arxiv.org/abs/2605.12681",
    topics: ["research", "orbital-compute", "satellite"],
    relatedNodeIds: ["satellite", "applications"],
    copy: {
      zh: {
        title: "軌道資料中心的瓶頸可能不只在電力，也在通訊容量",
        summary: "近期研究提醒，太空資料中心若要擴大，必須處理星間鏈路、下行頻寬、資料壓縮與任務導向運算。",
        takeaway: "這讓 orbital compute 從想像題變成工程題：資料在哪裡產生，就要思考在哪裡處理。"
      },
      en: {
        title: "Orbital data centers may be limited by communications, not only power",
        summary: "Recent research highlights inter-satellite links, downlink capacity, compression, and task-oriented processing as key constraints for space data centers.",
        takeaway: "That turns orbital compute from a speculative idea into an engineering question: process data closer to where it is created."
      }
    }
  },
  {
    id: "geespace-leo-iot-industry-services",
    curatedAt: "2026-06-20",
    status: "company",
    sourceName: "Geespace",
    sourceUrl: "https://www.geespace.com/",
    topics: ["satellite", "iot", "applications"],
    relatedNodeIds: ["satellite", "applications"],
    copy: {
      zh: {
        title: "Geespace 展示低軌 IoT 如何連到車聯網、物流與應急通信",
        summary: "它的案例適合觀察衛星不只提供通訊，也可能與終端、晶片、模組、天線與地面產業流程整合。",
        takeaway: "下游應用的關鍵往往不是衛星本身，而是終端與產業系統能否接得上。"
      },
      en: {
        title: "Geespace shows how LEO IoT connects to vehicles, logistics, and emergency communications",
        summary: "Its positioning is useful for studying how satellites connect with terminals, chips, modules, antennas, and industry workflows.",
        takeaway: "For downstream applications, the bottleneck is often not the satellite itself but whether terminals and operating systems can plug in."
      }
    }
  },
  {
    id: "landspace-methane-reusable-launch-path",
    curatedAt: "2026-06-20",
    status: "company",
    sourceName: "LandSpace",
    sourceUrl: "https://www.landspace.com/",
    topics: ["launch", "rocket", "reusability"],
    relatedNodeIds: ["launch-site", "rocket"],
    copy: {
      zh: {
        title: "LandSpace 讓中國商業火箭的液氧甲烷與可回收路線更值得追蹤",
        summary: "液氧甲烷、發動機重啟、發射服務與自建基礎設施，是觀察中國商業發射成熟度的切入點。",
        takeaway: "對讀者來說，重點不是單次發射，而是發射能力能否走向更高頻率、更低成本與可重複營運。"
      },
      en: {
        title: "LandSpace makes China's methane and reusable-launch path worth tracking",
        summary: "Methane propulsion, engine restart, launch services, and in-house infrastructure are useful entry points for understanding China's commercial launch maturity.",
        takeaway: "For readers, the signal is not one launch; it is whether launch capability can move toward higher cadence, lower cost, and repeatable operations."
      }
    }
  }
];

export const pageCopy = {
  zh: {
    brand: "太空經濟地圖",
    hero: {
      kicker: "用視覺理解太空基礎設施如何運作",
      title: "太空經濟，是一條從地面延伸到軌道的產業鏈",
      subtitle:
        "從發射站、火箭、衛星到太空站與下游應用，每一個節點都在把太空變成可重複運作的基礎設施。",
      prompt: "點選任一節點，查看它在任務中的角色、背後供應鏈，以及它如何連到商業模式。"
    },
    intro: "導覽模式",
    explore: "探索模式",
    skipIntro: "略過導覽",
    replayIntro: "重播導覽",
    closePanel: "關閉資訊卡",
    about: {
      link: "關於",
      close: "關閉 About",
      titlePrefix: "Curated by",
      titleName: "DanDanStop",
      body: [
        "Hi - DanDanStop is basically a note-to-self: \"DanDan, stop before this turns into another all-nighter geeking out over new tech.\"",
        "This is my personal tech lab and inspiration hub, built around a simple mindset: move fast, stay curious, and keep iterating.",
        "I\u2019m usually hands-on, testing the latest AI tools, MarTech ideas, and little experiments just for fun.",
        "If something here sparks an idea, let\u2019s talk. I\u2019m always happy to swap thoughts on innovation, creative technology, and what might be worth building next."
      ],
      lastUpdated: "Last updated: June 2026",
      contactLabel: "Contact",
      contactHref: "mailto:hello@dandanstop.me"
    },
    keyNumbers: "關鍵數字",
    deepDive: "深讀",
    futureSignals: "未來訊號",
    companyExplorer: {
      title: "值得探索的太空公司",
      intro: "探索不同公司如何建置發射、衛星、太空站與下游服務基礎設施。",
      private: "未上市公司",
      public: "掛牌公司"
    },
    expertPerspective: "專家觀點",
    governmentPrograms: "全球政府計畫",
    researchNotes: "研究線索",
    sources: "來源",
    latestSignals: {
      title: "Latest Signals",
      intro: "人工策展的太空產業更新，先低調追蹤官方來源、研究與公司動態。",
      subscribe: "訂閱更新",
      subscribeHref: "mailto:hello@dandanstop.me?subject=Subscribe%20Space%20Economy%20Atlas",
      empty: "此節點尚無更新。"
    },
    audio: {
      title: "語音摘要",
      play: "播放",
      pause: "暫停",
      resume: "繼續",
      playlist: "播放清單",
      unavailable: "此瀏覽器不支援語音播放"
    },
    detailTabs: {
      overview: "摘要",
      industry: "為何重要",
      engineering: "如何運作"
    },
    fallbackTitle: "2D 太空產業鏈",
    fallbackIntro: "WebGL 無法啟動時，這裡會顯示同樣節點與內容的 2D 版本。"
  },
  en: {
    brand: "Space Economy Atlas",
    hero: {
      kicker: "A visual guide to how space infrastructure works",
      title: "The space economy is an industry chain from Earth to orbit",
      subtitle:
        "Launch sites, rockets, satellites, space stations, and downstream services turn space into repeatable infrastructure.",
      prompt: "Select a node to see its mission role, supply chain, and business model."
    },
    intro: "Guided Intro",
    explore: "Explore Atlas",
    skipIntro: "Skip intro",
    replayIntro: "Replay intro",
    closePanel: "Close overview",
    about: {
      link: "About",
      close: "Close about",
      titlePrefix: "Curated by",
      titleName: "DanDanStop",
      body: [
        "Hi - DanDanStop is basically a note-to-self: \"DanDan, stop before this turns into another all-nighter geeking out over new tech.\"",
        "This is my personal tech lab and inspiration hub, built around a simple mindset: move fast, stay curious, and keep iterating.",
        "I\u2019m usually hands-on, testing the latest AI tools, MarTech ideas, and little experiments just for fun.",
        "If something here sparks an idea, let\u2019s talk. I\u2019m always happy to swap thoughts on innovation, creative technology, and what might be worth building next."
      ],
      lastUpdated: "Last updated: June 2026",
      contactLabel: "Contact",
      contactHref: "mailto:hello@dandanstop.me"
    },
    keyNumbers: "Key numbers",
    deepDive: "Deep dive",
    futureSignals: "Future Signals",
    companyExplorer: {
      title: "Companies to Explore",
      intro: "Explore how different companies build launch, satellite, station, and downstream infrastructure.",
      private: "Private companies",
      public: "Listed companies"
    },
    expertPerspective: "Expert Perspective",
    governmentPrograms: "Government Programs",
    researchNotes: "Research Notes",
    sources: "Sources",
    latestSignals: {
      title: "Latest Signals",
      intro: "Quietly curated space-economy updates from official sources, research, and company signals.",
      subscribe: "Subscribe",
      subscribeHref: "mailto:hello@dandanstop.me?subject=Subscribe%20Space%20Economy%20Atlas",
      empty: "No updates for this node yet."
    },
    audio: {
      title: "Audio summary",
      play: "Play",
      pause: "Pause",
      resume: "Resume",
      playlist: "Playlist",
      unavailable: "Audio playback is not supported in this browser"
    },
    detailTabs: {
      overview: "Overview",
      industry: "Why It Matters",
      engineering: "How It Works"
    },
    fallbackTitle: "2D Space Value Chain",
    fallbackIntro: "When WebGL is unavailable, this view presents the same nodes and content in 2D."
  }
};

export const nodes = [
  {
    id: "launch-site",
    chapterId: "launch-site",
    position: { x: -4.2, y: -1.1, z: 0 },
    explodable: true,
    copy: {
      zh: {
        title: "發射站",
        summary: "發射站把太空硬體變成可進入軌道的任務，串起整合、燃料、測試、安全與任務控制。",
        industry: [
          "發射站把火箭轉換成可營運產能，瓶頸常在週轉速度而不只火箭性能",
          "場址、天候、安全走廊與法規會共同決定任務能多常飛行",
          "更高發射頻率能支撐衛星、太空站與未來軌道運算平台擴張"
        ],
        engineering: [
          "整合廠房、發射塔、支撐臂與燃料系統在起飛前完成任務準備",
          "遙測、追蹤、飛行安全與天候團隊把倒數流程串成一套系統",
          "地面設施必須在安全與環境規範內快速恢復，才能支撐高頻任務"
        ],
        realityCheck: "更高發射頻率仍受環評、安全規範、天候、場址容量與事故調查限制。"
      },
      en: {
        title: "Launch Site",
        summary: "A launch site turns finished space hardware into an orbital mission through integration, fueling, testing, safety, and mission control.",
        industry: [
          "Launch sites turn rockets into operational capacity; the key constraint is often pad turnaround, not only vehicle performance",
          "Site location, weather, safety corridors, and regulation shape how often missions can fly",
          "Higher launch cadence enables satellites, stations, and future orbital compute platforms to scale"
        ],
        engineering: [
          "Integration facilities, launch towers, service arms, and fueling systems prepare the vehicle before flight",
          "Telemetry, tracking, flight safety, and weather teams coordinate the countdown as one timed system",
          "Ground infrastructure must recover quickly after each launch while staying within safety and environmental rules"
        ],
        realityCheck: "More launches still depend on environmental review, safety rules, weather, pad capacity, and anomaly investigations."
      }
    }
  },
  {
    id: "rocket",
    chapterId: "rocket",
    position: { x: -2.6, y: 0.1, z: 0.1 },
    explodable: true,
    copy: {
      zh: {
        title: "火箭",
        summary: "火箭是太空經濟的物流層。可回收讓發射從一次性任務，走向可重複運輸。",
        industry: [
          "火箭是太空經濟的物流層，負責把質量從地球送到有用軌道",
          "可回收只有在檢查、維修與再發射週期可靠且夠快時才會改變經濟性",
          "更低發射成本會擴大可在軌道建置的系統，從星座到大型平台"
        ],
        engineering: [
          "引擎、燃料槽、結構、航電與分節設計共同把質量轉換成速度",
          "酬載整流罩在上升段保護貨物，並在部署前乾淨分離",
          "回收再利用會把熱防護、振動、疲勞與翻修限制加入火箭設計"
        ],
        realityCheck: "高頻重複使用仍受測試失敗、材料疲勞、翻修週期、供應鏈與監管審批影響。"
      },
      en: {
        title: "Rocket",
        summary: "Rockets are orbital logistics. Reuse can turn launch from a one-off mission into repeatable transport.",
        industry: [
          "Rockets are the logistics layer of the space economy, moving mass from Earth into useful orbit",
          "Reuse changes economics only when inspection, repair, and relaunch cycles become reliable and fast",
          "Lower launch cost expands what can be built in orbit, from satellite constellations to larger platforms"
        ],
        engineering: [
          "Engines, propellant tanks, structures, avionics, and staging work together to trade mass for velocity",
          "Payload fairings protect cargo during ascent, then separate cleanly so satellites or modules can deploy",
          "Reentry and reuse add heat, vibration, fatigue, and refurbishment constraints to vehicle design"
        ],
        realityCheck: "High-frequency reuse still faces test failures, material fatigue, refurbishment, supply-chain limits, and regulation."
      }
    }
  },
  {
    id: "satellite",
    chapterId: "satellite",
    position: { x: 3.35, y: 1.94, z: -0.12 },
    explodable: true,
    copy: {
      zh: {
        title: "衛星",
        summary: "衛星把軌道變成服務平台，承載通訊、觀測、導航、資料中繼與未來在軌運算。",
        industry: [
          "衛星把軌道硬體轉換成連線、導航、觀測與資料中繼等服務",
          "星座規模、更新週期與頻譜使用權會決定使用者實際感受到的容量",
          "下一步是 space-native computing，讓衛星先在軌道處理資料再傳回地球"
        ],
        engineering: [
          "衛星公車為酬載提供電力、熱控、姿態控制、指令與資料處理",
          "天線、光通訊鏈路與 onboard processors 決定資料如何在太空與地球間移動",
          "輻射、軌道碎片、有限維修能力與退役離軌規劃會影響每個設計選擇"
        ],
        realityCheck: "低軌衛星需要處理壽命、碰撞迴避、軌道碎片、頻譜協調與退役離軌。"
      },
      en: {
        title: "Satellite",
        summary: "Satellites turn orbit into service: connectivity, observation, navigation, relay, and future onboard compute.",
        industry: [
          "Satellites convert orbital hardware into services such as connectivity, navigation, Earth observation, and data relay",
          "Constellation scale, refresh rate, and spectrum access determine how much capacity users actually experience",
          "The next step is space-native computing, where satellites may process data in orbit before sending results to Earth"
        ],
        engineering: [
          "A satellite bus supplies power, thermal control, attitude control, command, and data handling for the payload",
          "Antennas, optical links, and onboard processors decide how data moves between spacecraft, stations, and Earth",
          "Radiation, orbital debris, limited repair access, and end-of-life deorbit planning shape every design choice"
        ],
        realityCheck: "LEO satellites must manage lifespan, collision avoidance, debris risk, spectrum coordination, and deorbiting."
      }
    }
  },
  {
    id: "orbit-link",
    chapterId: "satellite",
    position: { x: 1.55, y: 1.05, z: -1.25 },
    explodable: false,
    copy: {
      zh: {
        title: "軌道與通訊鏈路",
        summary: "軌道高度、衛星密度、太空站與鏈路設計決定延遲、覆蓋、容量與資料如何在太空中重新路由。",
        industry: ["LEO 補足地面網路覆蓋缺口", "太空站是科研、在軌服務與國際合作平台", "頻譜與地面閘道影響商業化速度"],
        engineering: ["LEO、MEO、GEO 差異", "太空站、星間鏈路與下行鏈路", "頻段、延遲與 handoff"],
        realityCheck: "通訊鏈路受頻譜授權、干擾、地面閘道、天候、容量管理與國際協調限制。"
      },
      en: {
        title: "Orbit and Link",
        summary: "Orbit altitude, constellation density, space stations, and link design determine latency, coverage, capacity, and how data routes through space.",
        industry: ["LEO complements terrestrial coverage gaps", "Space stations are platforms for research, in-orbit services, and international collaboration", "Spectrum and gateways shape commercialization speed"],
        engineering: ["LEO, MEO, and GEO tradeoffs", "Space stations, inter-satellite links, and downlinks", "Bands, latency, and handoff"],
        realityCheck: "Communications links depend on spectrum rights, interference control, gateways, weather, capacity management, and international coordination."
      }
    }
  },
  {
    id: "ground-station",
    chapterId: "ground-segment",
    position: { x: 0.48, y: 1.52, z: -1.02 },
    explodable: false,
    copy: {
      zh: {
        title: "太空站",
        summary: "太空站是軌道上的實驗室與工作平台，支撐科研、維修、商業實驗與未來在軌服務。",
        industry: [
          "太空站是軌道上的實驗室與工作平台，不只是人類長期駐留的象徵",
          "微重力能支撐生醫、材料、晶體與在軌製造等地面難以複製的研究",
          "商業太空站可能讓 NASA、企業、大學與政府成為低軌市場中的客戶"
        ],
        engineering: [
          "加壓艙、桁架、對接口、太陽能陣列、熱控與生命維持形成可維護棲地",
          "機械臂、氣閘艙與對接系統支撐實驗、貨運、維修與未來在軌服務",
          "乘員安全、補給頻率、輻射、軌道碎片與老化維護設定實際限制"
        ],
        realityCheck: "太空站受補給成本、軌道安全、乘員風險、老化維護、國際治理與退役規劃限制。"
      },
      en: {
        title: "Space Station",
        summary: "A space station is an orbital lab and work platform for research, servicing, experiments, and future in-orbit infrastructure.",
        industry: [
          "Space stations are orbital laboratories and work platforms, not only symbols of human presence",
          "Microgravity supports research in biotech, materials, crystals, and in-space production that is hard to reproduce on Earth",
          "Commercial stations could make NASA, companies, universities, and governments customers in a broader LEO marketplace"
        ],
        engineering: [
          "Pressurized modules, trusses, docking ports, solar arrays, thermal systems, and life support form a maintainable habitat",
          "Robotic arms, airlocks, and docking systems support experiments, cargo, repairs, and future in-orbit servicing",
          "Crew safety, resupply cadence, radiation exposure, orbital debris, and station aging set practical limits"
        ],
        realityCheck: "Stations face resupply cost, orbital safety, crew risk, aging hardware, governance, and deorbit planning."
      }
    }
  },
  {
    id: "applications",
    chapterId: "applications",
    position: { x: 4.5, y: 0.4, z: 0.5 },
    explodable: false,
    copy: {
      zh: {
        title: "下游應用",
        summary: "太空基礎設施的價值最後回到地面：寬頻、手機直連、航空、海事、IoT、災害通訊與政府任務。",
        industry: [
          "下游應用是太空經濟被地面使用者感受到的地方",
          "服務收入能回頭支撐下一層發射、衛星、太空站與軌道基礎設施",
          "新應用正在延伸到軌道 AI 運算、主權資料備援、在軌製造與太空資料產品"
        ],
        engineering: [
          "用戶終端、地面閘道、頻譜、星間鏈路與軟體路由共同決定服務品質",
          "地球觀測與太空感測器可用 onboard AI 減少下行瓶頸並加快洞察速度",
          "採用速度取決於價格、可靠度、延遲、法規、客戶信任與既有網路整合"
        ],
        realityCheck: "下游採用取決於價格、終端成本、法規、服務品質、競爭者與客戶信任。"
      },
      en: {
        title: "Applications",
        summary: "Space infrastructure creates value on Earth: broadband, direct-to-device, aviation, maritime, IoT, disaster response, and government missions.",
        industry: [
          "Applications are where the space economy becomes visible to users on Earth",
          "Service revenue can fund the next layer of launch, satellites, stations, and orbital infrastructure",
          "Emerging applications include orbital AI compute, sovereign cloud backup, in-space manufacturing, and data products created directly in orbit"
        ],
        engineering: [
          "User terminals, gateways, spectrum rights, inter-satellite links, and software routing determine service quality",
          "Earth observation and space sensors can use onboard AI to reduce downlink bottlenecks and deliver faster insights",
          "Adoption depends on price, reliability, latency, regulation, customer trust, and integration with existing networks"
        ],
        realityCheck: "Adoption depends on pricing, terminal cost, regulation, service quality, competition, and trust."
      }
    }
  },
  {
    id: "industry-chain",
    chapterId: "applications",
    position: { x: 0.2, y: -1.5, z: 0.2 },
    explodable: false,
    copy: {
      zh: {
        title: "產業鏈總覽",
        summary: "太空經濟是一個飛輪：製造與發射部署衛星，衛星提供連線與資料，應用收入再支撐下一代基礎設施。",
        industry: ["製造 -> 發射 -> 部署 -> 連線 -> 應用 -> 收入", "垂直整合可降低協調成本", "未來前沿包含月球經濟與在軌製造"],
        engineering: ["跨系統可靠性", "軌道安全與碎片管理", "地面/太空網路協同"],
        realityCheck: "太空經濟的瓶頸不只在技術，也在監管、資本支出、供應鏈、軌道安全與商業採用。"
      },
      en: {
        title: "Industry Chain",
        summary: "The space economy is a flywheel: manufacturing and launch deploy satellites, satellites provide connectivity and data, and applications fund the next infrastructure layer.",
        industry: ["Manufacture -> Launch -> Deploy -> Connect -> Apply -> Revenue", "Vertical integration can reduce coordination cost", "Future frontiers include the lunar economy and in-orbit manufacturing"],
        engineering: ["Cross-system reliability", "Orbital safety and debris management", "Ground-space network coordination"],
        realityCheck: "The bottlenecks are not only technical; they include regulation, capital intensity, supply chains, orbital safety, and commercial adoption."
      }
    }
  }
];

const governmentProgramReferences = {
  zh: {
    nasaArtemis: {
      title: "NASA Artemis",
      source: "NASA",
      takeaway: "從月球到火星的長期探索架構，能幫讀者理解發射、地面系統、月球基地、商業登陸器與國際合作如何串成大型太空計畫。",
      url: "https://www.nasa.gov/humans-in-space/artemis/"
    },
    nasaCommercialLeo: {
      title: "NASA Commercial LEO Destinations",
      source: "NASA",
      takeaway: "NASA 正推動商業低軌太空站，讓政府從擁有與營運者轉向服務客戶，這是理解商業太空站與低軌市場的重要入口。",
      url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/commercial-destinations-in-low-earth-orbit/"
    },
    esaMoonlight: {
      title: "ESA Moonlight",
      source: "European Space Agency",
      takeaway: "ESA 的 Moonlight 聚焦月球通訊與導航服務，說明月球經濟也需要像地球一樣的定位、時間同步與資料連線基礎設施。",
      url: "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Moonlight"
    },
    euIris2: {
      title: "EU IRIS2",
      source: "European Commission",
      takeaway: "IRIS2 是歐盟安全連線計畫，適合用來理解衛星通訊如何同時服務政府韌性、主權通訊與商業連線。",
      url: "https://defence-industry-space.ec.europa.eu/eu-space/iris2-secure-connectivity_en"
    },
    ukNationalSpaceStrategy: {
      title: "UK National Space Strategy",
      source: "UK Government",
      takeaway: "英國策略把太空產業、國防、科研、監管與國際合作放在同一框架，能幫讀者理解國家如何設計太空經濟政策。",
      url: "https://www.gov.uk/government/publications/national-space-strategy"
    },
    isroGaganyaan: {
      title: "ISRO Gaganyaan",
      source: "ISRO",
      takeaway: "印度 Gaganyaan 計畫涵蓋載人發射、生命維持、乘員逃生、訓練與未來太空站能力，是觀察新興太空強國能力累積的好入口。",
      url: "https://www.isro.gov.in/Gaganyaan.html"
    },
    jaxaSpaceStrategyFund: {
      title: "JAXA Space Strategy Fund",
      source: "JAXA",
      takeaway: "日本宇宙戰略基金把發射、衛星、探測、軌道資料中心、光通訊與月面基礎設施放進長期研發資助框架，能幫讀者理解國家如何培養下一代太空產業。",
      url: "https://fund.jaxa.jp/"
    },
    jaxaKibo: {
      title: "JAXA Kibo",
      source: "JAXA",
      takeaway: "日本 Kibo 實驗艙展示太空站如何支撐微重力研究、艙外實驗、產業應用與國際協作。",
      url: "https://global.jaxa.jp/projects/iss_human/kibo/"
    },
    jaxaH3: {
      title: "JAXA H3 Launch Vehicle",
      source: "JAXA",
      takeaway: "H3 是日本新一代主力運載火箭，適合用來理解國家發射能力、可靠度、成本與自主太空運輸的關係。",
      url: "https://global.jaxa.jp/projects/sas/h3/"
    },
    chinaMannedSpace: {
      title: "China Manned Space Program",
      source: "China Manned Space",
      takeaway: "中國載人航天以三步走策略累積載人飛船、艙外活動、交會對接、太空實驗室與太空站能力，是理解天宮與長期低軌活動的重要入口。",
      url: "https://en.cmse.gov.cn/aboutcms/"
    },
    chinaSpaceStationScience: {
      title: "China Space Station Science",
      source: "China Manned Space",
      takeaway: "天宮太空站的科學應用涵蓋生命科學、流體、燃燒、材料、基礎物理、天文、地球觀測與太空應用技術驗證，補足低軌研究平台的全球視角。",
      url: "https://en.cmse.gov.cn/spacescience/spacescienceresearchandapplication/"
    },
    cnsaPrograms: {
      title: "CNSA Space Programs",
      source: "CNSA",
      takeaway: "中國國家航天局的英文入口可追蹤嫦娥、天問、月球樣本、商業太空標準與太空網路等主題，適合做為觀察中國太空政策與任務更新的起點。",
      url: "https://www.cnsa.gov.cn/english/"
    },
    cnsaIlrs: {
      title: "CNSA International Lunar Research Station",
      source: "CNSA",
      takeaway: "國際月球科研站讓讀者看到月球不只是目的地，也可能成為長期科研、能源、通訊、導航、資源利用與國際合作的基礎設施平台。",
      url: "https://www.cnsa.gov.cn/english/n6465652/n6465653/c6812150/content.html"
    }
  },
  en: {
    nasaArtemis: {
      title: "NASA Artemis",
      source: "NASA",
      takeaway: "NASA's Moon-to-Mars architecture helps readers connect launch, ground systems, lunar infrastructure, commercial landers, and international cooperation into one long-term space program.",
      url: "https://www.nasa.gov/humans-in-space/artemis/"
    },
    nasaCommercialLeo: {
      title: "NASA Commercial LEO Destinations",
      source: "NASA",
      takeaway: "NASA's commercial LEO station strategy shows how government can shift from owning and operating infrastructure to buying services in a marketplace.",
      url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/commercial-destinations-in-low-earth-orbit/"
    },
    esaMoonlight: {
      title: "ESA Moonlight",
      source: "European Space Agency",
      takeaway: "ESA's Moonlight program focuses on lunar communications and navigation, showing that lunar activity will need positioning, timing, and data infrastructure.",
      url: "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Moonlight"
    },
    euIris2: {
      title: "EU IRIS2",
      source: "European Commission",
      takeaway: "IRIS2 frames satellite connectivity as resilience, sovereign communications, and commercial service infrastructure for Europe.",
      url: "https://defence-industry-space.ec.europa.eu/eu-space/iris2-secure-connectivity_en"
    },
    ukNationalSpaceStrategy: {
      title: "UK National Space Strategy",
      source: "UK Government",
      takeaway: "The UK strategy places space industry, defence, science, regulation, and international cooperation in one policy frame for the space economy.",
      url: "https://www.gov.uk/government/publications/national-space-strategy"
    },
    isroGaganyaan: {
      title: "ISRO Gaganyaan",
      source: "ISRO",
      takeaway: "India's Gaganyaan program connects crewed launch, life support, crew escape, training, and future station capability, making it a strong entry point for emerging space powers.",
      url: "https://www.isro.gov.in/Gaganyaan.html"
    },
    jaxaSpaceStrategyFund: {
      title: "JAXA Space Strategy Fund",
      source: "JAXA",
      takeaway: "Japan's Space Strategy Fund connects launch, satellites, exploration, orbital data centers, optical communications, and lunar infrastructure into a long-term public R&D funding frame.",
      url: "https://fund.jaxa.jp/"
    },
    jaxaKibo: {
      title: "JAXA Kibo",
      source: "JAXA",
      takeaway: "Japan's Kibo module shows how a station can support microgravity research, exposed-facility experiments, industrial use, and international coordination.",
      url: "https://global.jaxa.jp/projects/iss_human/kibo/"
    },
    jaxaH3: {
      title: "JAXA H3 Launch Vehicle",
      source: "JAXA",
      takeaway: "H3 is Japan's next-generation launch vehicle, useful for learning how national launch capability connects reliability, cost, and independent space transport.",
      url: "https://global.jaxa.jp/projects/sas/h3/"
    },
    chinaMannedSpace: {
      title: "China Manned Space Program",
      source: "China Manned Space",
      takeaway: "China's human spaceflight program frames a three-step path from crewed spacecraft to EVA, rendezvous, docking, space labs, and the Tiangong station for long-duration LEO activity.",
      url: "https://en.cmse.gov.cn/aboutcms/"
    },
    chinaSpaceStationScience: {
      title: "China Space Station Science",
      source: "China Manned Space",
      takeaway: "China's station-science program covers life sciences, fluids, combustion, materials, basic physics, astronomy, Earth observation, and space-application technology verification.",
      url: "https://en.cmse.gov.cn/spacescience/spacescienceresearchandapplication/"
    },
    cnsaPrograms: {
      title: "CNSA Space Programs",
      source: "CNSA",
      takeaway: "CNSA's English gateway helps readers follow Chang'e, Tianwen, lunar samples, commercial-space standards, space internet updates, and broader Chinese space-policy signals.",
      url: "https://www.cnsa.gov.cn/english/"
    },
    cnsaIlrs: {
      title: "CNSA International Lunar Research Station",
      source: "CNSA",
      takeaway: "The International Lunar Research Station points to the Moon as future infrastructure for science, energy, communications, navigation, resource use, and international cooperation.",
      url: "https://www.cnsa.gov.cn/english/n6465652/n6465653/c6812150/content.html"
    }
  }
};

const academicProgramReferences = {
  zh: {
    mitSsl: {
      title: "MIT Space Systems Laboratory",
      source: "MIT",
      takeaway: "MIT SSL 研究未來太空系統、小衛星、任務設計與系統整合，適合作為理解太空工程教育與研究的入口。",
      url: "https://ssl.scripts.mit.edu/www/"
    },
    stanfordSlab: {
      title: "Stanford Space Rendezvous Laboratory",
      source: "Stanford University",
      takeaway: "Stanford SLAB 聚焦分散式太空系統、編隊飛行、rendezvous、docking 與在軌服務，是理解未來衛星群與太空服務的重要研究基地。",
      url: "https://slab.stanford.edu/"
    },
    caltechSpaceSolar: {
      title: "Caltech Space Solar Power Project",
      source: "Caltech",
      takeaway: "Caltech 的太空太陽能計畫研究超輕量結構、太陽能轉換與無線能量傳輸，對未來軌道能源與大型平台很有啟發性。",
      url: "https://www.spacesolar.caltech.edu/"
    },
    cuBoulderAerospace: {
      title: "CU Boulder Aerospace Research",
      source: "University of Colorado Boulder",
      takeaway: "CU Boulder 的航太研究涵蓋 astrodynamics、bioastronautics、remote sensing 與 autonomous systems，能補足太空站、衛星與應用層的學術視角。",
      url: "https://www.colorado.edu/aerospace/research"
    },
    lasp: {
      title: "Laboratory for Atmospheric and Space Physics",
      source: "University of Colorado Boulder",
      takeaway: "LASP 結合科學、工程、任務營運與資料系統，適合用來理解學術機構如何直接參與太空任務與資料產品。",
      url: "https://lasp.colorado.edu/"
    },
    jaxaIsas: {
      title: "JAXA Institute of Space and Astronautical Science",
      source: "JAXA ISAS",
      takeaway: "ISAS 是日本太空科學與探測任務的研究核心，能提供深空探測、太空科學與研究型任務的全球視角。",
      url: "https://www.isas.jaxa.jp/en/"
    }
  },
  en: {
    mitSsl: {
      title: "MIT Space Systems Laboratory",
      source: "MIT",
      takeaway: "MIT SSL researches future space systems, small spacecraft, mission design, and systems integration, making it a useful gateway into space-engineering education and research.",
      url: "https://ssl.scripts.mit.edu/www/"
    },
    stanfordSlab: {
      title: "Stanford Space Rendezvous Laboratory",
      source: "Stanford University",
      takeaway: "Stanford SLAB focuses on distributed space systems, formation flying, rendezvous, docking, and on-orbit servicing, all central to future satellite and service architectures.",
      url: "https://slab.stanford.edu/"
    },
    caltechSpaceSolar: {
      title: "Caltech Space Solar Power Project",
      source: "Caltech",
      takeaway: "Caltech's space solar research covers ultralight structures, solar conversion, and wireless power transfer, offering a forward-looking lens on orbital power infrastructure.",
      url: "https://www.spacesolar.caltech.edu/"
    },
    cuBoulderAerospace: {
      title: "CU Boulder Aerospace Research",
      source: "University of Colorado Boulder",
      takeaway: "CU Boulder covers astrodynamics, bioastronautics, remote sensing, and autonomous systems, helping connect stations, satellites, and downstream applications to research practice.",
      url: "https://www.colorado.edu/aerospace/research"
    },
    lasp: {
      title: "Laboratory for Atmospheric and Space Physics",
      source: "University of Colorado Boulder",
      takeaway: "LASP combines science, engineering, mission operations, and data systems, showing how academic institutions can operate close to real space missions and data products.",
      url: "https://lasp.colorado.edu/"
    },
    jaxaIsas: {
      title: "JAXA Institute of Space and Astronautical Science",
      source: "JAXA ISAS",
      takeaway: "ISAS is a major Japanese research institute for space science and exploration missions, adding a global view of deep-space science and research-led missions.",
      url: "https://www.isas.jaxa.jp/en/"
    }
  }
};

export const editorialLayers = {
  "launch-site": {
    zh: {
      keyNumbers: [
        { value: "165", label: "SpaceX 2025 年 Falcon 發射次數，顯示發射場週轉已是產能問題。" },
        { value: "2,213 t", label: "2025 年送入軌道質量，mass to orbit 是衡量太空基礎設施規模的核心指標。" }
      ],
      deepDive: [
        "發射站不是背景，而是任務變成產能的地方。火箭負責把人員、貨物或太空船送往軌道；發射站則整合載具、加注燃料、確認安全並執行任務控制。",
        "發射次數與送入軌道質量，是觀察產業鏈速度的前導指標。當任務變多，瓶頸會延伸到發射台、環評、天候、事故調查與地面團隊週轉。"
      ],
      learningLayers: {
        industry: {
          intro: "發射站是太空經濟最容易被低估的基礎設施。它不是單一建築，而是一套把硬體、團隊、安全規則與任務節奏同步起來的營運系統。",
          perspectives: [
            {
              title: "NASA 的任務需求觀點",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA 以任務需求解釋火箭與太空船選擇：目的地越遠、酬載越重，系統越複雜。這讓發射站不只是地點，而是任務能力的一部分。",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.zh.nasaArtemis,
            governmentProgramReferences.zh.isroGaganyaan,
            governmentProgramReferences.zh.jaxaH3,
            governmentProgramReferences.zh.jaxaSpaceStrategyFund,
            governmentProgramReferences.zh.chinaMannedSpace,
            governmentProgramReferences.zh.ukNationalSpaceStrategy
          ],
          research: [
            academicProgramReferences.zh.mitSsl,
            academicProgramReferences.zh.cuBoulderAerospace,
            academicProgramReferences.zh.stanfordSlab
          ]
        },
        engineering: {
          intro: "發射站工程的核心是把許多高風險流程壓縮到同一個倒數時間軸：整合、燃料、天候、追蹤、安全與撤離方案都必須同時成立。",
          research: [
            {
              title: "Launch systems as integrated mission infrastructure",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA 的科普資料適合作為入門：讀者可以從火箭如何依任務選型，延伸理解發射場如何承接地面準備、發射支援與任務控制。",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ]
        }
      },
      futureSignals: {
        title: "未來訊號",
        items: [
          "當發射頻率提高，發射站會成為大型軌道基礎設施的入口，包含商業太空站、在軌服務與未來運算平台。",
          "容易被忽略的機會是營運節奏：更快整合、更安全週轉、更少延誤，可能比單一火箭升級更關鍵。"
        ]
      },
      companyExamples: [
        {
          name: "SpaceX",
          status: "public",
          ticker: "SPCX",
          role: "可探索高頻發射、發射場週轉、載具回收與垂直整合如何支撐大型星座與深空任務。",
          url: "https://www.spacex.com/"
        },
        {
          name: "Blue Origin",
          status: "private",
          role: "可探索重型運載、發射場建設、月球任務與長期太空基礎設施的布局。",
          url: "https://www.blueorigin.com/"
        },
        {
          name: "LandSpace",
          status: "private",
          role: "可探索中國商業發射如何以液氧甲烷火箭、可回收路線與自建測試/製造能力支撐衛星網路需求。",
          url: "https://www.landspace.com/"
        },
        {
          name: "CAS Space",
          status: "private",
          role: "可探索中國商業發射服務如何連接火箭研發、試驗、生產、發射與低成本星座組網任務。",
          url: "https://www.cas-space.com/"
        },
        {
          name: "Rocket Lab",
          status: "public",
          ticker: "RKLB",
          role: "可觀察發射服務、發射場配置、衛星製造與任務管理如何整合成端到端太空公司。",
          url: "https://www.rocketlabusa.com/"
        },
        {
          name: "Arianespace",
          status: "private",
          role: "可探索歐洲商業發射服務、國際酬載任務與發射場協調如何形成區域太空能力。",
          url: "https://www.arianespace.com/"
        },
        {
          name: "Northrop Grumman",
          status: "public",
          ticker: "NOC",
          role: "可觀察大型航太國防公司如何布局發射、推進、太空系統與政府任務。",
          url: "https://www.northropgrumman.com/what-we-do/space"
        }
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX company disclosures", detail: "Falcon launch cadence and mass-to-orbit figures disclosed by SpaceX" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "165", label: "Falcon launches disclosed by SpaceX for 2025, making pad turnaround a capacity question." },
        { value: "2,213 t", label: "Mass to orbit disclosed for 2025, a practical measure of infrastructure scale." }
      ],
      deepDive: [
        "Launch sites are where missions become repeatable capacity. Rockets carry crew, cargo, and spacecraft to orbit; the site integrates the vehicle, loads propellant, verifies safety, and runs mission control.",
        "Launch cadence and mass to orbit are useful signals for the whole chain. As volume rises, bottlenecks move into pads, environmental review, weather, investigations, and ground-team turnaround."
      ],
      learningLayers: {
        industry: {
          intro: "A launch site is the operational front door of the space economy. It turns hardware, range safety, weather windows, fueling, and mission control into a repeatable launch rhythm.",
          perspectives: [
            {
              title: "NASA's mission-requirements lens",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA explains rockets through mission requirements: heavier payloads and farther destinations need more capable systems. That makes the launch site part of mission capability, not a passive backdrop.",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.en.nasaArtemis,
            governmentProgramReferences.en.isroGaganyaan,
            governmentProgramReferences.en.jaxaH3,
            governmentProgramReferences.en.jaxaSpaceStrategyFund,
            governmentProgramReferences.en.chinaMannedSpace,
            governmentProgramReferences.en.ukNationalSpaceStrategy
          ],
          research: [
            academicProgramReferences.en.mitSsl,
            academicProgramReferences.en.cuBoulderAerospace,
            academicProgramReferences.en.stanfordSlab
          ]
        },
        engineering: {
          intro: "Launch-site engineering is about synchronizing risk. Integration, propellant loading, weather, tracking, range safety, and abort planning must all work on one countdown clock.",
          research: [
            {
              title: "Launch systems as integrated mission infrastructure",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA's explainer is a useful starting point for readers: it connects mission needs to launch-vehicle design, then helps explain why ground support and launch operations are part of the same system.",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ]
        }
      },
      futureSignals: {
        title: "Future Signals",
        items: [
          "As cadence rises, launch sites become gateways for larger orbital infrastructure: stations, servicing vehicles, and future compute platforms.",
          "Often the hidden opportunity is rhythm: integrate faster, turn pads safely, and coordinate the range with fewer delays."
        ]
      },
      companyExamples: [
        {
          name: "SpaceX",
          status: "public",
          ticker: "SPCX",
          role: "Shows how high-cadence launch, pad turnaround, vehicle recovery, and vertical integration support large constellations and deep-space ambitions.",
          url: "https://www.spacex.com/"
        },
        {
          name: "Blue Origin",
          status: "private",
          role: "Shows heavy-lift development, launch-site infrastructure, lunar missions, and long-term space-infrastructure planning.",
          url: "https://www.blueorigin.com/"
        },
        {
          name: "LandSpace",
          status: "private",
          role: "Shows how Chinese commercial launch is using methane engines, reusability work, and in-house test and manufacturing capacity to serve satellite-network demand.",
          url: "https://www.landspace.com/"
        },
        {
          name: "CAS Space",
          status: "private",
          role: "Shows how Chinese commercial launch services connect rocket R&D, testing, production, launch operations, and lower-cost constellation deployment.",
          url: "https://www.cas-space.com/"
        },
        {
          name: "Rocket Lab",
          status: "public",
          ticker: "RKLB",
          role: "Shows how launch services, launch pads, satellite manufacturing, and on-orbit management can combine in one public space company.",
          url: "https://www.rocketlabusa.com/"
        },
        {
          name: "Arianespace",
          status: "private",
          role: "Shows Europe's commercial launch-service model, international payload missions, and launch-range coordination.",
          url: "https://www.arianespace.com/"
        },
        {
          name: "Northrop Grumman",
          status: "public",
          ticker: "NOC",
          role: "Shows how a large aerospace and defense company spans launch, propulsion, space systems, and government missions.",
          url: "https://www.northropgrumman.com/what-we-do/space"
        }
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX company disclosures", detail: "Falcon launch cadence and mass-to-orbit figures disclosed by SpaceX" }
      ]
    }
  },
  rocket: {
    zh: {
      keyNumbers: [
        { value: "100 t", label: "SpaceX 揭露 Starship V3 目標可在可重複使用狀態下送入地球軌道的酬載。" },
        { value: "2026 H2", label: "公司預期 Starship 在 2026 年下半年開始執行軌道酬載交付，屬公司預期。" }
      ],
      deepDive: [
        "火箭是太空經濟的物流層。NASA 的科普語境很直白：任務需求決定火箭大小、推力與能力；酬載越重、目的地越遠，運輸系統越複雜。",
        "SpaceX 將 Starship 描述為酬載、頻率與可回收能力的階梯式變化。這類前瞻數字應標示為公司揭露或預期，並和測試、發射許可與監管風險一起閱讀。"
      ],
      learningLayers: {
        industry: {
          intro: "火箭決定太空基礎設施能以多大規模、多少成本、多久一次被送上軌道。從產業角度看，真正的問題不是能不能飛一次，而是能不能穩定、快速、可預期地重複飛。",
          perspectives: [
            {
              title: "NASA 的火箭選型觀點",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA 用任務需求說明火箭能力：距離、酬載與任務目的會決定載具。這個觀點能幫讀者把火箭理解成物流系統，而不是單純的交通工具。",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.zh.nasaArtemis,
            governmentProgramReferences.zh.isroGaganyaan,
            governmentProgramReferences.zh.jaxaH3,
            governmentProgramReferences.zh.jaxaSpaceStrategyFund,
            governmentProgramReferences.zh.chinaMannedSpace,
            governmentProgramReferences.zh.ukNationalSpaceStrategy
          ],
          research: [
            academicProgramReferences.zh.mitSsl,
            academicProgramReferences.zh.cuBoulderAerospace,
            academicProgramReferences.zh.caltechSpaceSolar
          ]
        },
        engineering: {
          intro: "火箭工程是一連串取捨：推力、重量、燃料、結構、分節、熱防護與可回收設計都會互相牽動。任何一項改善，都可能把壓力轉移到另一個子系統。",
          research: [
            {
              title: "Reusable systems and mission requirements",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA 的火箭科普可作為基礎框架：先理解任務需求如何決定載具，再往下看可回收、重型運載與大型軌道基礎設施的工程限制。",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ]
        }
      },
      futureSignals: {
        title: "未來訊號",
        items: [
          "可回收重型運載能力會讓大型軌道系統更可行，從太空站模組、可展開太陽能陣列到太空資料基礎設施。",
          "真正要看的不是單次發射價格，而是每一美元、每一公斤風險，能換到多少可用壽命。"
        ]
      },
      companyExamples: [
        {
          name: "SpaceX",
          status: "public",
          ticker: "SPCX",
          role: "可探索 Falcon、Starship、可回收發射與 Starlink 垂直整合如何改變軌道物流想像。",
          url: "https://www.spacex.com/"
        },
        {
          name: "Blue Origin",
          status: "private",
          role: "可探索 New Glenn、可回收系統、月球架構與長期太空基礎設施的發展路線。",
          url: "https://www.blueorigin.com/"
        },
        {
          name: "LandSpace",
          status: "private",
          role: "可探索中國液氧甲烷火箭、Zhuque 系列、可重複使用大型運載與衛星網路運輸需求。",
          url: "https://www.landspace.com/"
        },
        {
          name: "Galactic Energy",
          status: "private",
          role: "可探索 Ceres 固體火箭、Pallas 液體可回收火箭與中國商業發射公司如何服務星座補網。",
          url: "https://www.galactic-energy.cn/"
        },
        {
          name: "CAS Space",
          status: "private",
          role: "可探索 Kinetica/力箭系列如何支援微小衛星、大規模星座組網、貨運飛船與太空實驗平台。",
          url: "https://www.cas-space.com/"
        },
        {
          name: "Space Pioneer",
          status: "private",
          role: "可探索 Tianlong 液體火箭、可重複使用第一級與商業市場需求如何推動中國新創火箭迭代。",
          url: "https://www.spacepioneer.cc/"
        },
        {
          name: "Deep Blue Aerospace",
          status: "private",
          role: "可探索 Nebula 系列、垂直回收、液氧煤油發動機與 3D 列印製造如何服務低成本進入太空。",
          url: "https://www.dbaspace.com/"
        },
        {
          name: "Rocket Lab",
          status: "public",
          ticker: "RKLB",
          role: "可觀察小型發射、Neutron 大型火箭開發、衛星平台與任務服務的組合。",
          url: "https://www.rocketlabusa.com/"
        },
        {
          name: "Relativity Space",
          status: "private",
          role: "可探索以製造技術、迭代設計與新型中大型火箭切入發射市場的路線。",
          url: "https://www.relativityspace.com/"
        },
        {
          name: "Stoke Space",
          status: "private",
          role: "可探索完全可重複使用火箭、上面級回收與高頻運輸的工程挑戰。",
          url: "https://www.stokespace.com/"
        },
        {
          name: "Northrop Grumman",
          status: "public",
          ticker: "NOC",
          role: "可觀察固體火箭馬達、發射、推進與深空探索任務的供應鏈角色。",
          url: "https://www.northropgrumman.com/what-we-do/space"
        },
        {
          name: "L3Harris",
          status: "public",
          ticker: "LHX",
          role: "可觀察火箭、太空載具與防務系統中的推進與動力系統。",
          url: "https://www.l3harris.com/company/powering-defense-and-space-exploration"
        }
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX company disclosures", detail: "Starship capacity targets and development expectations disclosed by SpaceX" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "100 t", label: "Reusable payload target disclosed by SpaceX for Starship V3 to Earth orbit." },
        { value: "2026 H2", label: "Company expectation for Starship orbital payload delivery, not an independent forecast." }
      ],
      deepDive: [
        "Rockets are the space economy's logistics layer. NASA's framing is simple: mission requirements shape the launch vehicle, and heavier or farther missions need more capable systems.",
        "SpaceX presents Starship as a step change in payload, cadence, and reuse. On this site, forward-looking figures should stay labeled as company disclosures and paired with development, licensing, anomaly, and regulatory risk."
      ],
      learningLayers: {
        industry: {
          intro: "Rockets determine how much infrastructure can reach orbit, how often, and at what cost. The industry question is not only whether a vehicle can fly once; it is whether it can fly repeatedly with predictable operations.",
          perspectives: [
            {
              title: "NASA's launch-vehicle selection lens",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA explains rocket capability through mission need: destination, payload, and mission profile shape the vehicle. That helps readers see rockets as logistics systems, not only transportation icons.",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.en.nasaArtemis,
            governmentProgramReferences.en.isroGaganyaan,
            governmentProgramReferences.en.jaxaH3,
            governmentProgramReferences.en.jaxaSpaceStrategyFund,
            governmentProgramReferences.en.chinaMannedSpace,
            governmentProgramReferences.en.ukNationalSpaceStrategy
          ],
          research: [
            academicProgramReferences.en.mitSsl,
            academicProgramReferences.en.cuBoulderAerospace,
            academicProgramReferences.en.caltechSpaceSolar
          ]
        },
        engineering: {
          intro: "Rocket engineering is a chain of trade-offs. Thrust, mass, propellant, structure, staging, thermal protection, and reuse each solve one problem while pushing stress into another subsystem.",
          research: [
            {
              title: "Reusable systems and mission requirements",
              source: "NASA Spaceships and Rockets",
              takeaway: "NASA's explainer gives readers the base model: start with mission requirements, then layer in reuse, heavy lift, and the engineering limits of larger orbital infrastructure.",
              url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/"
            }
          ]
        }
      },
      futureSignals: {
        title: "Future Signals",
        items: [
          "Reusable heavy lift makes large orbital systems more plausible: station modules, deployable solar arrays, and space-based data infrastructure.",
          "The key metric is useful lifetime delivered to orbit per dollar, kilogram, and mission risk."
        ]
      },
      companyExamples: [
        {
          name: "SpaceX",
          status: "public",
          ticker: "SPCX",
          role: "Shows how Falcon, Starship, reusable launch, and Starlink vertical integration reshape the idea of orbital logistics.",
          url: "https://www.spacex.com/"
        },
        {
          name: "Blue Origin",
          status: "private",
          role: "Shows New Glenn, reusable systems, lunar architecture, and long-term space-infrastructure development.",
          url: "https://www.blueorigin.com/"
        },
        {
          name: "LandSpace",
          status: "private",
          role: "Shows China's methane-launch path through Zhuque vehicles, reusable heavy-lift work, and launch demand from satellite networks.",
          url: "https://www.landspace.com/"
        },
        {
          name: "Galactic Energy",
          status: "private",
          role: "Shows Ceres solid launchers, Pallas reusable-liquid development, and how Chinese commercial launch serves constellation replenishment.",
          url: "https://www.galactic-energy.cn/"
        },
        {
          name: "CAS Space",
          status: "private",
          role: "Shows how the Kinetica rocket family supports small satellites, large-scale constellation deployment, cargo vehicles, and space-science platforms.",
          url: "https://www.cas-space.com/"
        },
        {
          name: "Space Pioneer",
          status: "private",
          role: "Shows Tianlong liquid rockets, reusable first-stage development, and how market demand pushes Chinese launch startups to iterate.",
          url: "https://www.spacepioneer.cc/"
        },
        {
          name: "Deep Blue Aerospace",
          status: "private",
          role: "Shows the Nebula rocket family, vertical recovery, kerosene-liquid oxygen engines, and additive manufacturing for lower-cost access to space.",
          url: "https://www.dbaspace.com/"
        },
        {
          name: "Rocket Lab",
          status: "public",
          ticker: "RKLB",
          role: "Shows the mix of small launch, Neutron development, spacecraft platforms, and mission services.",
          url: "https://www.rocketlabusa.com/"
        },
        {
          name: "Relativity Space",
          status: "private",
          role: "Shows how manufacturing technology, rapid iteration, and medium-to-heavy launch development can enter the launch market.",
          url: "https://www.relativityspace.com/"
        },
        {
          name: "Stoke Space",
          status: "private",
          role: "Shows the engineering challenge of fully reusable launch, reusable upper stages, and higher-cadence transport.",
          url: "https://www.stokespace.com/"
        },
        {
          name: "Northrop Grumman",
          status: "public",
          ticker: "NOC",
          role: "Shows the supply-chain role of solid rocket motors, launch, propulsion, and exploration missions.",
          url: "https://www.northropgrumman.com/what-we-do/space"
        },
        {
          name: "L3Harris",
          status: "public",
          ticker: "LHX",
          role: "Shows propulsion and power systems used across rockets, spacecraft, and defense systems.",
          url: "https://www.l3harris.com/company/powering-defense-and-space-exploration"
        }
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX company disclosures", detail: "Starship capacity targets and development expectations disclosed by SpaceX" }
      ]
    }
  },
  satellite: {
    zh: {
      keyNumbers: [
        { value: "9,600", label: "SpaceX 揭露 Starlink 寬頻與行動衛星約數，顯示低軌星座已進入規模化階段。" },
        { value: "11.1M", label: "2026 Q1 Starlink 訂閱戶數，顯示衛星硬體已轉化為持續性服務收入。" }
      ],
      deepDive: [
        "衛星是把軌道變成服務的核心資產。它們承載通訊、觀測、導航、資料中繼，也逐步延伸到在軌資料處理。",
        "星座規模與訂閱採用，能說明衛星為什麼不只是硬體。衛星數量代表覆蓋與容量，付費使用者則顯示容量是否變成持續服務。"
      ],
      learningLayers: {
        industry: {
          intro: "衛星讓太空不再只是探索目的地，而是可被地面使用者訂閱、查詢、連線與整合的服務層。理解衛星，就是理解軌道如何變成資料與通訊市場。",
          perspectives: [
            {
              title: "NASA 的低軌經濟觀點",
              source: "NASA Low Earth Orbit Economy",
              takeaway: "NASA 將低軌視為可由政府、企業、研究單位共同使用的商業市場。衛星服務是這個市場最成熟的入口，也連接未來太空站與在軌生產。",
              url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.zh.euIris2,
            governmentProgramReferences.zh.esaMoonlight,
            governmentProgramReferences.zh.jaxaSpaceStrategyFund,
            governmentProgramReferences.zh.cnsaPrograms,
            governmentProgramReferences.zh.ukNationalSpaceStrategy,
            governmentProgramReferences.zh.nasaCommercialLeo
          ],
          research: [
            academicProgramReferences.zh.stanfordSlab,
            academicProgramReferences.zh.lasp,
            academicProgramReferences.zh.cuBoulderAerospace
          ]
        },
        engineering: {
          intro: "衛星工程不是只把酬載送上天，而是讓它在有限電力、熱控、頻寬與壽命內穩定服務。下一階段的難題是資料不只下傳，還可能先在軌道運算。",
          research: [
            {
              title: "Communication-efficient space data centers",
              source: "arXiv, 2026",
              takeaway: "研究指出軌道資料中心的瓶頸不只在電力與散熱，也在地面與太空之間的通訊容量；語意通訊與星間鏈路可能成為解法之一。",
              url: "https://arxiv.org/abs/2605.12681"
            }
          ]
        }
      },
      futureSignals: {
        title: "未來訊號",
        items: [
          "衛星可能從感測器與中繼器，進化成軌道邊緣運算節點。",
          "先在太空處理影像、訊號與科學資料，可降低下行頻寬需求，並加快氣候、災害、安全與物流警示。"
        ]
      },
      companyExamples: [
        {
          name: "Starlink (SpaceX)",
          status: "public",
          ticker: "SPCX",
          role: "可探索大型低軌星座如何把衛星硬體轉成寬頻、行動連線與全球覆蓋服務。",
          url: "https://www.starlink.com/"
        },
        {
          name: "Commsat",
          status: "private",
          role: "可探索中國商業衛星定制、星座核心服務、微小衛星批量研製與行業終端應用如何連成服務鏈。",
          url: "https://www.commsat.cn/"
        },
        {
          name: "Geespace",
          status: "private",
          role: "可探索低軌衛星物聯網、衛星通信終端、車載連線與智慧交通如何把星座能力延伸到地面產業。",
          url: "https://www.geespace.com/"
        },
        {
          name: "Planet Labs",
          status: "public",
          ticker: "PL",
          role: "可觀察地球觀測衛星如何把每日影像轉成資料產品與 recurring revenue。",
          url: "https://www.planet.com/"
        },
        {
          name: "Iridium",
          status: "public",
          ticker: "IRDM",
          role: "可觀察 LEO 衛星通訊、IoT、政府任務、PNT 與直接連接裝置服務。",
          url: "https://www.iridium.com/"
        },
        {
          name: "Astranis",
          status: "private",
          role: "可探索小型 GEO 通訊衛星如何服務區域市場與特定容量需求。",
          url: "https://www.astranis.com/"
        },
        {
          name: "Capella Space",
          status: "private",
          role: "可探索 SAR 地球觀測如何在雲層、夜間與災害場景提供可用資料。",
          url: "https://www.capellaspace.com/"
        },
        {
          name: "MDA Space",
          status: "public",
          ticker: "MDA",
          role: "可觀察衛星系統、地球觀測、機械臂與太空任務製造能力。",
          url: "https://mda.space/"
        }
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX company disclosures", detail: "Starlink constellation scale and subscriber figures disclosed by SpaceX" },
        { label: "Starcloud-1", url: "https://www.starcloud.com/starcloud-1" },
        { label: "Orbital Data Centers: Spacecraft Constraints and Economic Viability", url: "https://arxiv.org/abs/2604.27197" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "9,600", label: "Approximate Starlink broadband and mobile satellites disclosed by SpaceX." },
        { value: "11.1M", label: "Starlink subscribers disclosed for Q1 2026, showing hardware becoming recurring service." }
      ],
      deepDive: [
        "Satellites are the assets that turn orbit into services. They carry communications, observation, navigation, relay, and, increasingly, onboard processing.",
        "Constellation scale and subscriber adoption explain why satellites are not only hardware. More satellites can expand coverage and capacity; paying users show whether that capacity becomes recurring service."
      ],
      learningLayers: {
        industry: {
          intro: "Satellites turn space from a destination into a service layer people can subscribe to, query, connect through, and integrate into daily systems. To understand satellites is to understand how orbit becomes data and communications markets.",
          perspectives: [
            {
              title: "NASA's LEO economy lens",
              source: "NASA Low Earth Orbit Economy",
              takeaway: "NASA frames low Earth orbit as a marketplace used by government, companies, researchers, and new customers. Satellite services are the most mature entry point into that marketplace.",
              url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.en.euIris2,
            governmentProgramReferences.en.esaMoonlight,
            governmentProgramReferences.en.jaxaSpaceStrategyFund,
            governmentProgramReferences.en.cnsaPrograms,
            governmentProgramReferences.en.ukNationalSpaceStrategy,
            governmentProgramReferences.en.nasaCommercialLeo
          ],
          research: [
            academicProgramReferences.en.stanfordSlab,
            academicProgramReferences.en.lasp,
            academicProgramReferences.en.cuBoulderAerospace
          ]
        },
        engineering: {
          intro: "Satellite engineering is not only getting a payload into orbit; it is keeping it useful within tight limits on power, heat, bandwidth, lifetime, and repair access. The next problem is whether data should be processed before it is downlinked.",
          research: [
            {
              title: "Communication-efficient space data centers",
              source: "arXiv, 2026",
              takeaway: "This research argues that space data centers are limited not only by energy and thermal design, but by ground-space communication capacity; semantic communication and inter-satellite links may help.",
              url: "https://arxiv.org/abs/2605.12681"
            }
          ]
        }
      },
      futureSignals: {
        title: "Future Signals",
        items: [
          "Satellites may evolve from sensors and relays into orbital edge-compute nodes.",
          "Processing imagery, signals, and science data in orbit can reduce bandwidth needs and speed up alerts for climate, disasters, security, and logistics."
        ]
      },
      companyExamples: [
        {
          name: "Starlink (SpaceX)",
          status: "public",
          ticker: "SPCX",
          role: "Shows how a large LEO constellation turns satellites into broadband, mobile connectivity, and global coverage services.",
          url: "https://www.starlink.com/"
        },
        {
          name: "Commsat",
          status: "private",
          role: "Shows Chinese commercial satellite customization, constellation core services, smallsat manufacturing, and industry terminal applications as one service chain.",
          url: "https://www.commsat.cn/"
        },
        {
          name: "Geespace",
          status: "private",
          role: "Shows LEO satellite IoT, satellite-communications terminals, vehicle connectivity, and smart-mobility applications built around a constellation.",
          url: "https://www.geespace.com/"
        },
        {
          name: "Planet Labs",
          status: "public",
          ticker: "PL",
          role: "Shows how Earth-observation satellites turn daily imagery into data products and recurring revenue.",
          url: "https://www.planet.com/"
        },
        {
          name: "Iridium",
          status: "public",
          ticker: "IRDM",
          role: "Shows LEO satellite communications, IoT, government, PNT, and direct-to-device services.",
          url: "https://www.iridium.com/"
        },
        {
          name: "Astranis",
          status: "private",
          role: "Shows how small GEO communications satellites can serve regional markets and focused capacity needs.",
          url: "https://www.astranis.com/"
        },
        {
          name: "Capella Space",
          status: "private",
          role: "Shows how SAR Earth observation can provide usable data through clouds, darkness, and disaster conditions.",
          url: "https://www.capellaspace.com/"
        },
        {
          name: "MDA Space",
          status: "public",
          ticker: "MDA",
          role: "Shows satellite systems, Earth observation, robotics, and mission manufacturing capabilities.",
          url: "https://mda.space/"
        }
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX company disclosures", detail: "Starlink constellation scale and subscriber figures disclosed by SpaceX" },
        { label: "Starcloud-1", url: "https://www.starcloud.com/starcloud-1" },
        { label: "Orbital Data Centers: Spacecraft Constraints and Economic Viability", url: "https://arxiv.org/abs/2604.27197" }
      ]
    }
  },
  "orbit-link": {
    zh: {
      keyNumbers: [
        { value: "$25.8B-$42.3B", label: "WEF 估計 2025-2035 年太空碎片與碰撞風險在 business-as-usual 情境下的累計損失。" },
        { value: "$3.031T", label: "WEF 估計 2025-2035 年衛星與相關服務累計價值，凸顯軌道安全的經濟意義。" }
      ],
      deepDive: [
        "軌道與通訊鏈路是看不見的基礎設施。使用者看到的是寬頻、導航或資料，但背後依賴軌道高度、星座密度、星間鏈路、地面閘道和頻譜授權。",
        "WEF 報告提醒，軌道壅塞不是抽象風險。碰撞、碎片、避碰機動和服務中斷會轉化為直接經濟損失，也會影響航空、通訊、地球觀測與災害應變等地面活動。"
      ],
      sources: [
        { label: "WEF Clear Orbit, Secure Future", detail: "pp. 11-16, orbital debris economic-loss model" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "$25.8B-$42.3B", label: "WEF estimate of cumulative debris and collision losses in 2025-2035 under business as usual." },
        { value: "$3.031T", label: "WEF estimate of cumulative satellite and related services value in 2025-2035." }
      ],
      deepDive: [
        "Orbit and links are invisible infrastructure. Users see broadband, navigation, or data products, but the service depends on altitude, constellation density, inter-satellite links, gateways, and spectrum rights.",
        "The WEF report makes orbital congestion concrete. Collisions, debris, avoidance maneuvers, and outages become direct economic losses and can affect aviation, communications, Earth observation, disaster response, and other Earth-based systems."
      ],
      sources: [
        { label: "WEF Clear Orbit, Secure Future", detail: "pp. 11-16, orbital debris economic-loss model" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" }
      ]
    }
  },
  "ground-station": {
    zh: {
      keyNumbers: [
        { value: "ISS -> commercial", label: "NASA 正規劃從國際太空站過渡到商業低地球軌道平台。" },
        { value: "1 of many", label: "NASA 的長期方向是成為低軌商業市場中的多個客戶之一。" }
      ],
      deepDive: [
        "太空站是連接科學與產業的橋樑。它不是單一任務，而是研究、生命科學、製造、國際合作與在軌服務的平台。",
        "NASA 的 LEO economy 論述，從 ISS 指向商業太空站與私人太空人任務。這能幫助使用者把太空站理解為未來低軌基礎設施。"
      ],
      learningLayers: {
        industry: {
          intro: "太空站是低軌經濟中最接近「共享基礎設施」的節點。它讓研究人員、政府、企業與未來製造服務有機會在同一個軌道平台上工作。",
          perspectives: [
            {
              title: "NASA 的商業低軌市場觀點",
              source: "NASA Commercial Space Stations",
              takeaway: "NASA 正支持由商業公司擁有並營運的低軌太空站，讓 NASA 與其他客戶購買服務，並延續微重力研究與人類低軌活動。",
              url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/commercial-destinations-in-low-earth-orbit/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.zh.nasaCommercialLeo,
            governmentProgramReferences.zh.jaxaKibo,
            governmentProgramReferences.zh.chinaMannedSpace,
            governmentProgramReferences.zh.chinaSpaceStationScience,
            governmentProgramReferences.zh.isroGaganyaan,
            governmentProgramReferences.zh.nasaArtemis
          ],
          research: [
            academicProgramReferences.zh.cuBoulderAerospace,
            academicProgramReferences.zh.mitSsl,
            academicProgramReferences.zh.jaxaIsas
          ]
        },
        engineering: {
          intro: "太空站工程的挑戰是把實驗室、住宅、電力系統、熱控、生命維持、對接、機械臂與安全冗餘整合成可以長期維護的平台。",
          research: [
            {
              title: "In-space production and microgravity strategy",
              source: "NASA InSPA and LEO Microgravity Strategy",
              takeaway: "NASA 將微重力研究、先進材料、生醫、在太空生產與商業平台連在一起，適合作為讀者理解太空站價值的研究入口。",
              url: "https://www.nasa.gov/international-space-station/space-station-research-and-technology/in-space-production-applications/"
            }
          ]
        }
      },
      futureSignals: {
        title: "未來訊號",
        items: [
          "微重力是太空少數天然優勢之一，可用於細胞、晶體、流體、光纖、半導體與先進材料研究。",
          "商業太空站可能成為共享軌道實驗室，讓研究、製造、機器人與在軌服務先成熟。"
        ]
      },
      companyExamples: [
        {
          name: "Axiom Space",
          status: "private",
          role: "可探索商業太空站、私人太空人任務、在軌研究與太空基礎設施建設。",
          url: "https://www.axiomspace.com/"
        },
        {
          name: "Vast",
          status: "private",
          role: "可探索 Haven 太空站、人工重力願景與下一代商業低軌居住平台。",
          url: "https://www.vastspace.com/"
        },
        {
          name: "Sierra Space",
          status: "private",
          role: "可探索 Dream Chaser、商業太空站、生物科技與在軌製造相關布局。",
          url: "https://www.sierraspace.com/"
        },
        {
          name: "Starlab",
          status: "private",
          role: "可探索美歐商業太空站合作、微重力實驗室與大型軌道平台設計。",
          url: "https://starlab-space.com/"
        },
        {
          name: "Redwire",
          status: "public",
          ticker: "RDW",
          role: "可觀察在軌基礎設施、ISS 太陽能陣列、微重力實驗與商業太空站供應鏈。",
          url: "https://www.redwirespace.com/"
        },
        {
          name: "MDA Space",
          status: "public",
          ticker: "MDA",
          role: "可觀察太空站機械臂、在軌作業、衛星系統與任務支援能力。",
          url: "https://mda.space/"
        },
        {
          name: "Northrop Grumman",
          status: "public",
          ticker: "NOC",
          role: "可觀察太空站補給、太空系統與政府太空任務中的大型承包商角色。",
          url: "https://www.northropgrumman.com/what-we-do/space"
        }
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" },
        { label: "NASA Why Go to Space", url: "https://www.nasa.gov/humans-in-space/why-go-to-space/" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "ISS -> commercial", label: "NASA is planning a transition from the International Space Station to commercial LEO platforms." },
        { value: "1 of many", label: "NASA's long-term framing is to become one of many customers in a LEO marketplace." }
      ],
      deepDive: [
        "The station is a bridge between science and industry. It is a platform for research, life sciences, manufacturing, international work, and future in-orbit services.",
        "NASA's LEO economy framing points from the ISS toward commercial stations and private astronaut missions. That helps readers see stations as future orbital infrastructure, not only research symbols."
      ],
      learningLayers: {
        industry: {
          intro: "A space station is the closest low-Earth-orbit node to shared infrastructure. It gives researchers, governments, companies, and future production services a place to work on the same orbital platform.",
          perspectives: [
            {
              title: "NASA's commercial LEO marketplace lens",
              source: "NASA Commercial Space Stations",
              takeaway: "NASA is supporting commercially owned and operated stations so the agency and other customers can purchase services while continuing microgravity research and human activity in low Earth orbit.",
              url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/commercial-destinations-in-low-earth-orbit/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.en.nasaCommercialLeo,
            governmentProgramReferences.en.jaxaKibo,
            governmentProgramReferences.en.chinaMannedSpace,
            governmentProgramReferences.en.chinaSpaceStationScience,
            governmentProgramReferences.en.isroGaganyaan,
            governmentProgramReferences.en.nasaArtemis
          ],
          research: [
            academicProgramReferences.en.cuBoulderAerospace,
            academicProgramReferences.en.mitSsl,
            academicProgramReferences.en.jaxaIsas
          ]
        },
        engineering: {
          intro: "Station engineering combines a laboratory, habitat, power system, thermal control, life support, docking, robotics, and safety redundancy into a platform that must be maintained for years.",
          research: [
            {
              title: "In-space production and microgravity strategy",
              source: "NASA InSPA and LEO Microgravity Strategy",
              takeaway: "NASA links microgravity research, advanced materials, biotechnology, in-space production, and commercial platforms, making it a strong research gateway for station value.",
              url: "https://www.nasa.gov/international-space-station/space-station-research-and-technology/in-space-production-applications/"
            }
          ]
        }
      },
      futureSignals: {
        title: "Future Signals",
        items: [
          "Microgravity is a natural advantage for experiments in cells, crystals, fluids, fiber optics, semiconductors, and advanced materials.",
          "Commercial stations could become shared orbital labs where research, manufacturing, robotics, and servicing mature before larger platforms arrive."
        ]
      },
      companyExamples: [
        {
          name: "Axiom Space",
          status: "private",
          role: "Shows commercial space-station development, private astronaut missions, in-orbit research, and space-infrastructure buildout.",
          url: "https://www.axiomspace.com/"
        },
        {
          name: "Vast",
          status: "private",
          role: "Shows Haven station development, artificial-gravity ambition, and next-generation commercial LEO habitats.",
          url: "https://www.vastspace.com/"
        },
        {
          name: "Sierra Space",
          status: "private",
          role: "Shows Dream Chaser, commercial station work, biotech, and in-space manufacturing pathways.",
          url: "https://www.sierraspace.com/"
        },
        {
          name: "Starlab",
          status: "private",
          role: "Shows U.S.-European commercial station collaboration, microgravity laboratories, and large orbital-platform design.",
          url: "https://starlab-space.com/"
        },
        {
          name: "Redwire",
          status: "public",
          ticker: "RDW",
          role: "Shows in-orbit infrastructure, ISS solar arrays, microgravity investigations, and commercial-station supply-chain exposure.",
          url: "https://www.redwirespace.com/"
        },
        {
          name: "MDA Space",
          status: "public",
          ticker: "MDA",
          role: "Shows station robotics, on-orbit operations, satellite systems, and mission support capabilities.",
          url: "https://mda.space/"
        },
        {
          name: "Northrop Grumman",
          status: "public",
          ticker: "NOC",
          role: "Shows the large-prime role in station resupply, space systems, and government space missions.",
          url: "https://www.northropgrumman.com/what-we-do/space"
        }
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" },
        { label: "NASA Why Go to Space", url: "https://www.nasa.gov/humans-in-space/why-go-to-space/" }
      ]
    }
  },
  applications: {
    zh: {
      keyNumbers: [
        { value: "11.1M", label: "Starlink 2026 Q1 訂閱戶數，說明下游服務已形成可量化市場。" },
        { value: "~30", label: "SpaceX 揭露 direct-to-cell 已有約 30 個國家的行動網路合作夥伴。" }
      ],
      deepDive: [
        "下游應用是一般人真正感受到太空經濟的地方：偏遠寬頻、災害備援、航空與海事連線、政府任務、IoT、地球觀測與手機直連衛星。",
        "NASA 的 LEO economy 也把應用延伸到在太空製造與材料研究，讓網站能把『應用』寫成科研、製造與地面產業升級的交會點。"
      ],
      learningLayers: {
        industry: {
          intro: "下游應用把太空基礎設施翻譯成地面可以使用的服務。讀者可以從三個問題理解價值：誰需要連線、誰需要資料、誰需要太空環境本身。",
          perspectives: [
            {
              title: "NASA 的商業太空觀點",
              source: "NASA Commercial Space",
              takeaway: "NASA 將商業太空描述為由企業建置、擁有與營運太空系統，NASA 則購買服務。這個服務化邏輯也能用來理解下游應用為何重要。",
              url: "https://www.nasa.gov/humans-in-space/commercial-space/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.zh.euIris2,
            governmentProgramReferences.zh.esaMoonlight,
            governmentProgramReferences.zh.jaxaSpaceStrategyFund,
            governmentProgramReferences.zh.cnsaPrograms,
            governmentProgramReferences.zh.cnsaIlrs,
            governmentProgramReferences.zh.ukNationalSpaceStrategy,
            governmentProgramReferences.zh.nasaCommercialLeo
          ],
          research: [
            academicProgramReferences.zh.caltechSpaceSolar,
            academicProgramReferences.zh.lasp,
            academicProgramReferences.zh.stanfordSlab,
            academicProgramReferences.zh.cuBoulderAerospace
          ]
        },
        engineering: {
          intro: "應用層的工程常發生在看不見的地方：終端、閘道、頻譜、星間鏈路、資料壓縮、雲端整合與客戶系統接軌，決定太空能力能否變成日常服務。",
          research: [
            {
              title: "Solar-powered orbital AI data centers",
              source: "arXiv, 2025",
              takeaway: "研究提出以 Dawn-Dusk 太陽同步軌道、太陽能、輻射散熱與模組化節點支撐 AI inference；同時也點出微流星、熱控與結構設計等限制。",
              url: "https://arxiv.org/abs/2512.09044"
            },
            {
              title: "Communication bottlenecks for space data centers",
              source: "arXiv, 2026",
              takeaway: "另一項研究提醒，軌道資料中心的關鍵瓶頸可能是通訊容量，未來需要星間光通訊、語意通訊與任務導向資料壓縮。",
              url: "https://arxiv.org/abs/2605.12681"
            }
          ]
        }
      },
      futureSignals: {
        title: "未來訊號",
        items: [
          "下一階段的太空經濟，可能不只把資料經過軌道傳回地球，而是在軌道上直接運算、儲存，甚至製造價值。",
          "軌道 GPU server 最可信的早期場景，是先處理衛星與太空站資料，再把更小、更有用的結果傳回地球。"
        ]
      },
      companyExamples: [
        {
          name: "Starlink (SpaceX)",
          status: "public",
          ticker: "SPCX",
          role: "可探索衛星寬頻、行動網路合作、直連手機與全球覆蓋如何轉化為日常服務。",
          url: "https://www.starlink.com/"
        },
        {
          name: "Starcloud",
          status: "private",
          role: "可探索軌道 GPU server、太空資料中心與 space-native compute 的早期實驗方向。",
          url: "https://www.starcloud.com/"
        },
        {
          name: "Skylo",
          status: "private",
          role: "可探索衛星物聯網、非地面網路與手機/裝置連線如何和既有電信系統整合。",
          url: "https://www.skylo.tech/"
        },
        {
          name: "Geespace",
          status: "private",
          role: "可探索衛星 IoT、車載衛星通信、智慧物流、應急通信與智慧農業如何把低軌星座變成產業服務。",
          url: "https://www.geespace.com/"
        },
        {
          name: "Commsat",
          status: "private",
          role: "可探索衛星地面終端、星座方案、行業應用與航天科普如何把商業衛星能力帶到政企與教育場景。",
          url: "https://www.commsat.cn/"
        },
        {
          name: "AST SpaceMobile",
          status: "public",
          ticker: "ASTS",
          role: "可觀察 direct-to-cell 如何把衛星網路延伸到一般手機與行動網路合作夥伴。",
          url: "https://ast-science.com/"
        },
        {
          name: "Iridium",
          status: "public",
          ticker: "IRDM",
          role: "可觀察全球衛星通訊、IoT、政府服務與裝置連線如何形成下游收入。",
          url: "https://www.iridium.com/"
        },
        {
          name: "Viasat",
          status: "public",
          ticker: "VSAT",
          role: "可觀察航空、海事、政府與企業連線如何把衛星容量轉成服務合約。",
          url: "https://www.viasat.com/"
        },
        {
          name: "Planet Labs",
          status: "public",
          ticker: "PL",
          role: "可觀察地球觀測資料如何服務農業、政府、保險、環境與供應鏈場景。",
          url: "https://www.planet.com/"
        }
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX company disclosures", detail: "Direct-to-cell partnerships and Starlink subscriber figures disclosed by SpaceX" },
        { label: "Starcloud-2", url: "https://www.starcloud.com/starcloud-2" },
        { label: "Tether-Based Architecture for Solar-Powered Orbital AI Data Centers", url: "https://arxiv.org/abs/2512.09044" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "11.1M", label: "Starlink subscribers disclosed for Q1 2026, showing measurable downstream adoption." },
        { value: "~30", label: "Approximate countries with mobile network operator partnerships disclosed for direct-to-cell." }
      ],
      deepDive: [
        "Applications are where everyday users feel the space economy: rural broadband, disaster backup, aviation, maritime, government missions, IoT, Earth observation, and direct-to-device service.",
        "NASA's LEO economy also widens applications to in-space production and materials research, connecting orbital work to science, manufacturing, and benefits on Earth."
      ],
      learningLayers: {
        industry: {
          intro: "Applications translate space infrastructure into services people can use on Earth. A useful way to read this layer is to ask: who needs connectivity, who needs data, and who needs the space environment itself?",
          perspectives: [
            {
              title: "NASA's commercial-space service lens",
              source: "NASA Commercial Space",
              takeaway: "NASA frames commercial space as industry building, owning, and operating space systems while NASA purchases services. That service model is the clearest bridge to downstream applications.",
              url: "https://www.nasa.gov/humans-in-space/commercial-space/"
            }
          ],
          governmentPrograms: [
            governmentProgramReferences.en.euIris2,
            governmentProgramReferences.en.esaMoonlight,
            governmentProgramReferences.en.jaxaSpaceStrategyFund,
            governmentProgramReferences.en.cnsaPrograms,
            governmentProgramReferences.en.cnsaIlrs,
            governmentProgramReferences.en.ukNationalSpaceStrategy,
            governmentProgramReferences.en.nasaCommercialLeo
          ],
          research: [
            academicProgramReferences.en.caltechSpaceSolar,
            academicProgramReferences.en.lasp,
            academicProgramReferences.en.stanfordSlab,
            academicProgramReferences.en.cuBoulderAerospace
          ]
        },
        engineering: {
          intro: "Application engineering often happens in the invisible layers: terminals, gateways, spectrum, inter-satellite links, compression, cloud integration, and customer workflows decide whether space capability becomes daily utility.",
          research: [
            {
              title: "Solar-powered orbital AI data centers",
              source: "arXiv, 2025",
              takeaway: "This paper proposes dawn-dusk sun-synchronous orbits, solar power, radiative cooling, and modular nodes for AI inference while also surfacing micrometeoroid, thermal, and structural constraints.",
              url: "https://arxiv.org/abs/2512.09044"
            },
            {
              title: "Communication bottlenecks for space data centers",
              source: "arXiv, 2026",
              takeaway: "A newer study argues that communication capacity may be the central bottleneck for orbital data centers, requiring optical links, semantic communication, and task-oriented compression.",
              url: "https://arxiv.org/abs/2605.12681"
            }
          ]
        }
      },
      futureSignals: {
        title: "Future Signals",
        items: [
          "The next space economy may not only move data through orbit. It may compute, store, and make value there.",
          "Orbital GPU servers make the most sense first as space-native compute: process satellite and station data in orbit, then return smaller results to Earth."
        ]
      },
      companyExamples: [
        {
          name: "Starlink (SpaceX)",
          status: "public",
          ticker: "SPCX",
          role: "Shows how satellite broadband, mobile-network partnerships, direct-to-device links, and global coverage become everyday services.",
          url: "https://www.starlink.com/"
        },
        {
          name: "Starcloud",
          status: "private",
          role: "Shows early experiments in orbital GPU servers, space data centers, and space-native compute.",
          url: "https://www.starcloud.com/"
        },
        {
          name: "Skylo",
          status: "private",
          role: "Shows satellite IoT, non-terrestrial networks, and device connectivity integrated with existing telecom systems.",
          url: "https://www.skylo.tech/"
        },
        {
          name: "Geespace",
          status: "private",
          role: "Shows how satellite IoT, vehicle satellite communications, logistics, emergency communications, and smart agriculture can turn LEO constellations into industry services.",
          url: "https://www.geespace.com/"
        },
        {
          name: "Commsat",
          status: "private",
          role: "Shows how satellite terminals, constellation planning, industry applications, and space education bring commercial satellite capability to enterprise and learning contexts.",
          url: "https://www.commsat.cn/"
        },
        {
          name: "AST SpaceMobile",
          status: "public",
          ticker: "ASTS",
          role: "Shows how direct-to-cell can extend satellite networks to ordinary phones and mobile-network partnerships.",
          url: "https://ast-science.com/"
        },
        {
          name: "Iridium",
          status: "public",
          ticker: "IRDM",
          role: "Shows how global satellite communications, IoT, government services, and device connectivity become downstream revenue.",
          url: "https://www.iridium.com/"
        },
        {
          name: "Viasat",
          status: "public",
          ticker: "VSAT",
          role: "Shows how aviation, maritime, government, and enterprise connectivity turn satellite capacity into service contracts.",
          url: "https://www.viasat.com/"
        },
        {
          name: "Planet Labs",
          status: "public",
          ticker: "PL",
          role: "Shows how Earth-observation data serves agriculture, government, insurance, environment, and supply-chain use cases.",
          url: "https://www.planet.com/"
        }
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX company disclosures", detail: "Direct-to-cell partnerships and Starlink subscriber figures disclosed by SpaceX" },
        { label: "Starcloud-2", url: "https://www.starcloud.com/starcloud-2" },
        { label: "Tether-Based Architecture for Solar-Powered Orbital AI Data Centers", url: "https://arxiv.org/abs/2512.09044" }
      ]
    }
  },
  "industry-chain": {
    zh: {
      keyNumbers: [
        { value: "$191B", label: "WEF 引用 OECD 分析，估計 2024 年依賴太空基礎設施的全球經濟活動。" },
        { value: "2025-2035", label: "WEF 以十年視角衡量衛星服務價值與太空碎片風險，適合作為長期趨勢框架。" }
      ],
      deepDive: [
        "產業鏈節點應把所有模型串起來：製造與發射把資產送上軌道，衛星和太空站提供服務平台，下游應用創造收入，收入再支持下一代基礎設施。",
        "WEF 報告補上一個重要編輯角度：太空經濟的長期成長必須和軌道永續一起呈現。沒有碎片治理、資料共享、保險、法規和國際協調，商業化速度會反過來增加系統性風險。"
      ],
      sources: [
        { label: "WEF Clear Orbit, Secure Future", detail: "pp. 4, 16, 18-23, space sustainability and economic-risk framing" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" },
        { label: "SpaceX company disclosures", detail: "Segment and KPI figures disclosed by SpaceX" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "$191B", label: "Global economic activity in 2024 dependent on space infrastructure, cited by WEF from OECD analysis." },
        { value: "2025-2035", label: "WEF's decade horizon for satellite value and debris-risk impact, useful as a long-term trend frame." }
      ],
      deepDive: [
        "The industry-chain node should connect every model: manufacturing and launch place assets in orbit, satellites and stations provide service platforms, downstream applications create revenue, and revenue funds the next infrastructure layer.",
        "The WEF report adds the editorial lens the site needs: long-term space-economy growth must be presented with orbital sustainability. Without debris governance, data sharing, insurance, policy, and international coordination, commercialization can increase systemic risk."
      ],
      sources: [
        { label: "WEF Clear Orbit, Secure Future", detail: "pp. 4, 16, 18-23, space sustainability and economic-risk framing" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" },
        { label: "SpaceX company disclosures", detail: "Segment and KPI figures disclosed by SpaceX" }
      ]
    }
  }
};

export function getCopy(lang) {
  return pageCopy[lang] ?? pageCopy.en;
}

export function getNode(id) {
  return nodes.find((node) => node.id === id) ?? null;
}

export function getChapter(id) {
  return chapters.find((chapter) => chapter.id === id) ?? null;
}

export function labelForValueChain(item, lang) {
  return item[lang] ?? item.en ?? item.zh;
}

export function getEditorialLayer(nodeId, lang) {
  const layer = editorialLayers[nodeId];
  if (!layer) return null;
  return layer[lang] ?? layer.en ?? layer.zh ?? null;
}

export const sourceNotes = [
  {
    id: "spacex-company-disclosures",
    label: "SpaceX company disclosure materials, June 2026",
    note: "Use for structure and themes; independently verify market numbers before publishing."
  },
  {
    id: "wef-clear-orbit",
    label: "WEF Clear Orbit, Secure Future, 2026",
    note: "Use for orbital sustainability, debris risk, and long-term economic-risk framing."
  },
  {
    id: "nasa-commercial-space",
    label: "NASA commercial space and low Earth orbit economy pages",
    url: "https://www.nasa.gov/humans-in-space/commercial-space/"
  },
  {
    id: "x-threejs-reference",
    label: "FHILY Three.js cinematic hero reference",
    url: "https://x.com/Oluwaphilemon1/status/2066394029076435318"
  }
];
