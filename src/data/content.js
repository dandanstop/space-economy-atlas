export const languages = [
  { id: "en", label: "EN", htmlLang: "en" },
  { id: "zh", label: "中文", htmlLang: "zh-Hant" }
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
        "Hi, the name DanDanStop is actually an internal warning to myself: \"DanDan, stop me from pulling another all-nighter geeking out over new tech!\"",
        "This is my personal tech lab and hub for inspiration, driven by a \"move fast and iterate\" agile mindset.",
        "I\u2019m always hands-on, testing the latest AI tools and MarTech experiments just for fun.",
        "Always happy to exchange ideas, discuss innovation, or explore new opportunities\u2014feel free to get in touch. \ud83d\ude0e"
      ],
      lastUpdated: "Last updated: June 2026",
      contactLabel: "Contact",
      contactHref: "mailto:hello@dandanstop.me"
    },
    keyNumbers: "關鍵數字",
    deepDive: "深讀",
    sources: "來源",
    detailTabs: {
      overview: "摘要",
      industry: "產業",
      engineering: "工程"
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
        "Hi, the name DanDanStop is actually an internal warning to myself: \"DanDan, stop me from pulling another all-nighter geeking out over new tech!\"",
        "This is my personal tech lab and hub for inspiration, driven by a \"move fast and iterate\" agile mindset.",
        "I\u2019m always hands-on, testing the latest AI tools and MarTech experiments just for fun.",
        "Always happy to exchange ideas, discuss innovation, or explore new opportunities\u2014feel free to get in touch. \ud83d\ude0e"
      ],
      lastUpdated: "Last updated: June 2026",
      contactLabel: "Contact",
      contactHref: "mailto:hello@dandanstop.me"
    },
    keyNumbers: "Key numbers",
    deepDive: "Deep dive",
    sources: "Sources",
    detailTabs: {
      overview: "Overview",
      industry: "Industry",
      engineering: "Engineering"
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
        summary: "發射站把製造完成的太空硬體轉換成可進入軌道的任務，包含整合、燃料、測試、安全與任務控制。",
        industry: ["場址與法規決定發射頻率", "地面設備支撐高週轉任務", "發射場容量會影響整體產業鏈節奏"],
        engineering: ["發射塔與支撐臂", "燃料與加壓系統", "遙測、追蹤與安全系統"],
        realityCheck: "更高發射頻率會受到環境審查、安全規範、天候、場址容量與事故調查限制。"
      },
      en: {
        title: "Launch Site",
        summary: "A launch site converts finished space hardware into an orbital mission through integration, fueling, testing, safety, and mission control.",
        industry: ["Site capacity shapes launch cadence", "Ground systems support rapid turnaround", "Launch infrastructure controls value-chain tempo"],
        engineering: ["Launch tower and service arms", "Fueling and pressurization systems", "Telemetry, tracking, and range safety"],
        realityCheck: "Higher launch cadence depends on environmental review, safety rules, weather, pad capacity, and anomaly investigations."
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
        summary: "火箭是太空經濟的物流層。可回收設計讓發射從一次性任務，逐步走向可重複運作的運輸系統。",
        industry: ["可回收性降低邊際發射成本", "發射頻率決定衛星部署速度", "mass to orbit 是衡量基礎設施規模的核心指標"],
        engineering: ["推進系統與引擎", "一級與二級結構", "酬載整流罩與分離機構"],
        realityCheck: "火箭開發與高頻重複使用仍受測試失敗、材料疲勞、維修週期、供應鏈與監管審批影響。"
      },
      en: {
        title: "Rocket",
        summary: "Rockets are the logistics layer of the space economy. Reuse shifts launch from one-off missions toward repeatable transport.",
        industry: ["Reuse lowers marginal launch cost", "Cadence controls constellation deployment speed", "Mass to orbit measures infrastructure scale"],
        engineering: ["Propulsion and engines", "First and second stage structure", "Payload fairing and separation systems"],
        realityCheck: "Rocket development and high-frequency reuse still face test failures, material fatigue, refurbishment cycles, supply chain limits, and regulation."
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
        industry: ["高產量製造支撐星座刷新", "衛星容量決定服務品質", "星座部署把硬體轉成 recurring service"],
        engineering: ["衛星公車與酬載", "太陽能板與電池", "天線、雷射鏈路與姿態控制"],
        realityCheck: "低軌衛星需要處理壽命、碰撞迴避、軌道碎片、頻譜協調與退役離軌。"
      },
      en: {
        title: "Satellite",
        summary: "Satellites turn orbit into a service platform for communications, observation, navigation, data relay, and future orbital compute.",
        industry: ["High-volume manufacturing supports constellation refresh", "Satellite capacity shapes service quality", "Constellations turn hardware into recurring services"],
        engineering: ["Satellite bus and payload", "Solar arrays and batteries", "Antennas, laser links, and attitude control"],
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
        summary: "太空站是軌道上的科研、維修、實驗與國際合作平台，也代表未來在軌服務與太空基礎設施節點。",
        industry: ["太空站支撐科研、商業實驗與在軌服務", "在軌平台可延伸到維修、製造與太空物流", "國際合作降低單一國家建置成本與任務風險"],
        engineering: ["主桁架、加壓艙與對接口", "太陽能陣列、熱控與姿態控制", "生命維持、通訊與機械臂作業"],
        realityCheck: "太空站受補給成本、軌道安全、乘員風險、老化維護、國際治理與退役規劃限制。"
      },
      en: {
        title: "Space Station",
        summary: "A space station is an orbital platform for research, servicing, experiments, and international collaboration, pointing toward future in-orbit infrastructure.",
        industry: ["Stations support research, commercial experiments, and in-orbit services", "Orbital platforms can extend into servicing, manufacturing, and space logistics", "International cooperation can reduce single-nation cost and mission risk"],
        engineering: ["Main truss, pressurized modules, and docking ports", "Solar arrays, thermal control, and attitude control", "Life support, communications, and robotic operations"],
        realityCheck: "Space stations face resupply cost, orbital safety, crew risk, aging maintenance, international governance, and deorbit planning."
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
        summary: "太空基礎設施的價值最後落在地面場景：寬頻、手機直連、航空、海事、IoT、災害通訊與政府任務。",
        industry: ["訂閱服務創造 recurring revenue", "企業備援與政府任務提高合約價值", "新應用讓太空成為數位經濟基礎層"],
        engineering: ["用戶終端與手機直連", "航空/海事移動通訊", "IoT、觀測資料與安全通訊"],
        realityCheck: "下游採用取決於價格、終端成本、法規、服務品質、競爭者與客戶信任。"
      },
      en: {
        title: "Applications",
        summary: "The value of space infrastructure lands in Earth use cases: broadband, direct-to-device, aviation, maritime, IoT, disaster response, and government missions.",
        industry: ["Subscriptions create recurring revenue", "Enterprise backup and government missions raise contract value", "New applications make space a digital infrastructure layer"],
        engineering: ["User terminals and direct-to-device", "Aviation and maritime mobility", "IoT, observation data, and secure communications"],
        realityCheck: "Adoption depends on pricing, terminal cost, regulation, service quality, competitors, and customer trust."
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

export const editorialLayers = {
  "launch-site": {
    zh: {
      keyNumbers: [
        { value: "165", label: "SpaceX 2025 年 Falcon 發射次數，顯示發射場週轉已是產能問題。" },
        { value: "2,213 t", label: "2025 年送入軌道質量，mass to orbit 是衡量太空基礎設施規模的核心指標。" }
      ],
      deepDive: [
        "發射站不是背景，而是任務變成產能的地方。NASA 的教育內容把火箭定位為把人員、貨物或太空船送往低地球軌道與更遠處的運輸系統；發射站則負責整合、燃料、安全、測試與任務控制。",
        "從 SpaceX Prospectus 的角度看，發射頻率和送入軌道質量是產業鏈速度的前導指標。當發射次數增加，瓶頸會從單一火箭性能延伸到發射場、環評、天候、事故調查和地面團隊週轉。"
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 132-133, Falcon launch cadence and mass-to-orbit disclosures" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "165", label: "Falcon launches disclosed by SpaceX for 2025, making pad turnaround a capacity question." },
        { value: "2,213 t", label: "Mass to orbit disclosed for 2025, a practical measure of infrastructure scale." }
      ],
      deepDive: [
        "A launch site is not scenery; it is where a mission becomes repeatable capacity. NASA frames rockets as transport systems that move crew, cargo, or spacecraft to low Earth orbit and beyond, while the site handles integration, fueling, testing, safety, and mission control.",
        "SpaceX's prospectus makes launch cadence and mass to orbit useful leading indicators for the whole value chain. As launch volume rises, constraints move beyond vehicle performance into pads, environmental review, weather, anomaly investigations, and ground-team turnaround."
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 132-133, Falcon launch cadence and mass-to-orbit disclosures" }
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
        "火箭是太空經濟的物流層。NASA 的科普語境強調，不同任務會需要不同大小、推力與能力的火箭；距離越遠、酬載越重，運輸系統就越複雜。",
        "SpaceX Prospectus 把 Starship 描述為發射能力的階梯式變化：更高酬載、更高頻率和可重複使用。但這類前瞻數字應標示為公司揭露或公司預期，並和測試失敗、監管審批、發射許可等風險一起呈現。"
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 94-98, Starship capacity and development expectations" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "100 t", label: "Reusable payload target disclosed by SpaceX for Starship V3 to Earth orbit." },
        { value: "2026 H2", label: "Company expectation for Starship orbital payload delivery, not an independent forecast." }
      ],
      deepDive: [
        "Rockets are the logistics layer of the space economy. NASA's educational framing is useful here: mission requirements determine the rocket, and farther or heavier missions require more capable launch systems.",
        "SpaceX describes Starship as a step-change in launch capability through payload, cadence, and reuse. In the site copy, these figures should be labeled as company disclosures or expectations and paired with development, licensing, anomaly, and regulatory risk."
      ],
      sources: [
        { label: "NASA Spaceships and Rockets", url: "https://www.nasa.gov/humans-in-space/spaceships-and-rockets/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 94-98, Starship capacity and development expectations" }
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
        "衛星是把軌道變成服務的核心載體。它可以承載通訊、觀測、導航、資料中繼，也可能延伸到在軌運算與邊緣資料處理。",
        "SpaceX 的數據很適合教育使用者理解星座經濟：衛星數量代表網路容量與覆蓋，訂閱戶代表下游採用，兩者一起說明為什麼衛星不只是硬體，而是 recurring service 的基礎。"
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 8, 96, 134, Starlink constellation and subscriber disclosures" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "9,600", label: "Approximate Starlink broadband and mobile satellites disclosed by SpaceX." },
        { value: "11.1M", label: "Starlink subscribers disclosed for Q1 2026, showing hardware becoming recurring service." }
      ],
      deepDive: [
        "Satellites are the core assets that turn orbit into services. They can carry communications, observation, navigation, data relay, and eventually orbital compute or edge processing.",
        "SpaceX's disclosed figures are useful for education because they connect constellation scale with business adoption: satellite count indicates coverage and capacity, while subscribers show how orbital hardware becomes a recurring service platform."
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 8, 96, 134, Starlink constellation and subscriber disclosures" }
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
        "太空站適合作為網站的教育橋樑：它不是單一任務，而是軌道上的研究、製造、生命科學、國際合作與在軌服務平台。",
        "NASA 的 LEO economy 論述強調，ISS 之後的低軌活動會逐步轉向商業太空站和私人太空人任務。這能讓使用者理解太空站不只是科研象徵，也是未來軌道市場的基礎設施。"
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "ISS -> commercial", label: "NASA is planning a transition from the International Space Station to commercial LEO platforms." },
        { value: "1 of many", label: "NASA's long-term framing is to become one of many customers in a LEO marketplace." }
      ],
      deepDive: [
        "The space station is a strong educational bridge for the site: it is not a single mission, but a platform for research, manufacturing, life sciences, international cooperation, and in-orbit services.",
        "NASA's LEO economy framing shows how activity after the ISS can shift toward commercial stations and private astronaut missions. That helps users understand stations as infrastructure for a future orbital marketplace."
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "NASA Commercial Space", url: "https://www.nasa.gov/humans-in-space/commercial-space/" }
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
        "下游應用是太空經濟被一般使用者感受到的地方：偏遠地區寬頻、災害備援、航空與海事連線、政府任務、IoT、地球觀測資料，以及未來手機直連衛星。",
        "NASA 的 LEO economy 也把太空應用延伸到在太空製造與材料研究。這讓網站可以把『應用』寫得更廣，不只等於衛星網路，也包含科研、製造和地面產業升級。"
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 21, 134, direct-to-cell partnerships and Starlink subscribers" }
      ]
    },
    en: {
      keyNumbers: [
        { value: "11.1M", label: "Starlink subscribers disclosed for Q1 2026, showing measurable downstream adoption." },
        { value: "~30", label: "Approximate countries with mobile network operator partnerships disclosed for direct-to-cell." }
      ],
      deepDive: [
        "Applications are where ordinary users feel the space economy: rural broadband, disaster backup, aviation and maritime connectivity, government missions, IoT, Earth observation data, and future satellite-to-phone service.",
        "NASA's LEO economy also extends applications into in-space production and materials research. That lets the site frame applications more broadly than satellite internet, including science, manufacturing, and industrial spillovers on Earth."
      ],
      sources: [
        { label: "NASA Low Earth Orbit Economy", url: "https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/" },
        { label: "SpaceX EU Prospectus", detail: "pp. 21, 134, direct-to-cell partnerships and Starlink subscribers" }
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
        { label: "SpaceX EU Prospectus", detail: "pp. 67-68, 130-140, segment and KPI disclosures" }
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
        { label: "SpaceX EU Prospectus", detail: "pp. 67-68, 130-140, segment and KPI disclosures" }
      ]
    }
  }
};

export function getCopy(lang) {
  return pageCopy[lang] ?? pageCopy.zh;
}

export function getNode(id) {
  return nodes.find((node) => node.id === id) ?? null;
}

export function getChapter(id) {
  return chapters.find((chapter) => chapter.id === id) ?? null;
}

export function labelForValueChain(item, lang) {
  return item[lang] ?? item.zh;
}

export function getEditorialLayer(nodeId, lang) {
  const layer = editorialLayers[nodeId];
  if (!layer) return null;
  return layer[lang] ?? layer.zh ?? null;
}

export const sourceNotes = [
  {
    id: "user-prospectus",
    label: "User-provided SpaceX EU prospectus, June 5, 2026",
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
