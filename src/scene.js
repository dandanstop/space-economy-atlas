import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { applyExplodedView, applyIntroCamera } from "./animations.js";
import { nodes } from "./data/content.js";
import { createNodeRegistry, createRaycastSelector } from "./interactions.js";

const OVERVIEW_POSITION = new THREE.Vector3(0, 2.6, 7.2);
const ORIGIN = new THREE.Vector3(0, 0, 0);
const ORBIT_DRAG_SENSITIVITY = 0.0042;
const ORBIT_MIN_POLAR = 0.35;
const ORBIT_MAX_POLAR = Math.PI - 0.45;
const visibleMarkerNodeIds = new Set(["orbit-link", "applications", "industry-chain"]);
const focusViews = {
  "launch-site": {
    position: new THREE.Vector3(-5.4, 1.1, 3.8),
    lookAt: new THREE.Vector3(-3.9, -0.95, 0)
  },
  rocket: {
    position: new THREE.Vector3(-3.95, 1.55, 4.35),
    lookAt: new THREE.Vector3(-2.62, 0.02, 0)
  },
  satellite: {
    position: new THREE.Vector3(2.28, 2.5, 3.08),
    lookAt: new THREE.Vector3(3.35, 1.94, -0.12)
  },
  "orbit-link": {
    position: new THREE.Vector3(-1.05, 2.24, 3.35),
    lookAt: new THREE.Vector3(0.35, 1.5, -1.05)
  },
  "ground-station": {
    position: new THREE.Vector3(-1.05, 2.24, 3.35),
    lookAt: new THREE.Vector3(0.35, 1.5, -1.05)
  },
  applications: {
    position: new THREE.Vector3(3.2, 1.25, 4.4),
    lookAt: new THREE.Vector3(4.5, 0.35, 0.5)
  },
  "industry-chain": {
    position: new THREE.Vector3(0.1, 2.15, 6.4),
    lookAt: new THREE.Vector3(0.2, -1.2, 0.2)
  }
};

function canUseWebGL() {
  try {
    if (!window.WebGLRenderingContext) return false;
    const testCanvas = document.createElement("canvas");
    return Boolean(testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function makeMaterial(color, emissive = "#10242c", options = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive,
    emissiveIntensity: 0.35,
    metalness: 0.5,
    roughness: 0.46,
    clearcoat: 0.18,
    clearcoatRoughness: 0.42,
    ...options
  });
}

function createEarthTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1024;
  textureCanvas.height = 512;
  const context = textureCanvas.getContext("2d");

  const ocean = context.createLinearGradient(0, 0, 0, textureCanvas.height);
  ocean.addColorStop(0, "#0a3151");
  ocean.addColorStop(0.45, "#125d78");
  ocean.addColorStop(1, "#051827");
  context.fillStyle = ocean;
  context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

  const landColors = ["#2f7044", "#6d7446", "#9a7b4f", "#4b6b3f", "#b6a06b"];
  for (let i = 0; i < 42; i += 1) {
    const x = seededValue(i, 8) * textureCanvas.width;
    const y = (0.18 + seededValue(i, 9) * 0.64) * textureCanvas.height;
    const radiusX = 34 + seededValue(i, 10) * 100;
    const radiusY = 14 + seededValue(i, 11) * 44;
    context.save();
    context.translate(x, y);
    context.rotate((seededValue(i, 12) - 0.5) * 1.4);
    context.fillStyle = landColors[i % landColors.length];
    context.globalAlpha = 0.72;
    context.beginPath();
    context.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  context.globalCompositeOperation = "screen";
  for (let i = 0; i < 70; i += 1) {
    const y = (0.1 + seededValue(i, 14) * 0.8) * textureCanvas.height;
    const width = 80 + seededValue(i, 15) * 210;
    const x = seededValue(i, 13) * textureCanvas.width;
    context.strokeStyle = `rgba(238, 250, 255, ${0.08 + seededValue(i, 16) * 0.16})`;
    context.lineWidth = 2 + seededValue(i, 17) * 5;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x + width * 0.28, y - 18, x + width * 0.72, y + 18, x + width, y);
    context.stroke();
  }
  context.globalCompositeOperation = "source-over";

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

function rememberBase(mesh) {
  mesh.userData.basePosition = mesh.position.clone();
  mesh.userData.baseScale = mesh.scale.clone();
  return mesh;
}

function createNodeMarker(node) {
  const geometry = new THREE.SphereGeometry(0.12, 24, 16);
  const material = makeMaterial("#bfefff", "#1b3c45", {
    metalness: 0.18,
    roughness: 0.2
  });
  const marker = new THREE.Mesh(geometry, material);
  marker.position.set(node.position.x, node.position.y, node.position.z);
  rememberBase(marker);
  marker.name = `node-${node.id}`;

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 24, 16),
    new THREE.MeshBasicMaterial({ color: "#5bd5ff", transparent: true, opacity: 0.14 })
  );
  marker.add(halo);

  return marker;
}

function addLaunchSite(scene, registry) {
  const pad = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.12, 1.08), makeMaterial("#2b3335", "#071018", {
    metalness: 0.72,
    roughness: 0.48,
    clearcoat: 0.18
  }));
  pad.position.set(-3.9, -1.45, 0);
  rememberBase(pad);
  registry.add("launch-pad", pad, { selectable: true, selectableNodeId: "launch-site" });
  scene.add(pad);

  const trench = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 1.02), makeMaterial("#12191a", "#03080a", {
    metalness: 0.24,
    roughness: 0.82
  }));
  trench.position.set(-2.62, -1.34, 0);
  rememberBase(trench);
  registry.add("launch-flame-trench", trench, { selectable: true, selectableNodeId: "launch-site" });
  scene.add(trench);

  const towerMaterial = makeMaterial("#a7b3b7", "#0f181c", {
    metalness: 0.8,
    roughness: 0.28
  });

  const towerGroup = new THREE.Group();
  towerGroup.position.set(-4.22, -0.78, 0.2);
  const towerCore = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.35, 0.12), towerMaterial);
  rememberBase(towerCore);
  registry.add("launch-tower-core", towerCore, { selectable: true, selectableNodeId: "launch-site" });
  towerGroup.add(towerCore);

  for (const z of [-0.08, 0.08]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.035, 0.035), towerMaterial);
    rail.position.set(0.1, 0.3, z);
    rail.rotation.z = 0.72;
    towerGroup.add(rail);

    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.028, 0.028), towerMaterial);
    cross.position.set(0.1, -0.18, z);
    cross.rotation.z = -0.72;
    towerGroup.add(cross);
  }
  scene.add(towerGroup);

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.08), makeMaterial("#b5c1c6", "#111b1f", {
    metalness: 0.82,
    roughness: 0.3
  }));
  arm.position.set(-3.9, -0.35, 0.2);
  registry.add("launch-arm", arm, { selectable: true, selectableNodeId: "launch-site" });
  scene.add(arm);

  const storageMaterial = makeMaterial("#c8d3d6", "#1c2f35", {
    metalness: 0.64,
    roughness: 0.32,
    clearcoat: 0.28
  });
  for (const [index, z] of [-0.34, -0.12].entries()) {
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.52, 32), storageMaterial);
    cylinder.position.set(-3.28, -1.16, z);
    cylinder.rotation.z = Math.PI / 2;
    rememberBase(cylinder);
    registry.add(`launch-storage-tank-${index}`, cylinder, { selectable: true, selectableNodeId: "launch-site" });
    scene.add(cylinder);
  }

  const pipe = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.035, 0.035), makeMaterial("#7d8a8e", "#0b1518", {
    metalness: 0.74,
    roughness: 0.36
  }));
  pipe.position.set(-3.03, -1.12, -0.23);
  registry.add("launch-feedline", pipe, { selectable: true, selectableNodeId: "launch-site" });
  scene.add(pipe);
}

function addRocket(scene, registry) {
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.2, 48), makeMaterial("#dfe6e5", "#182328", {
    metalness: 0.38,
    roughness: 0.32,
    clearcoat: 0.48,
    clearcoatRoughness: 0.28
  }));
  body.position.set(-2.6, 0.2, 0);
  rememberBase(body);
  registry.add("rocket-body", body, { selectable: true, selectableNodeId: "rocket" });
  scene.add(body);

  const booster = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.48, 48), makeMaterial("#39434a", "#101a1d", {
    metalness: 0.72,
    roughness: 0.34,
    clearcoat: 0.25
  }));
  booster.position.set(-2.6, -0.65, 0);
  rememberBase(booster);
  registry.add("rocket-booster", booster, { selectable: true, selectableNodeId: "rocket" });
  scene.add(booster);

  const fairing = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 48), makeMaterial("#eef3f1", "#1a2a31", {
    metalness: 0.26,
    roughness: 0.28,
    clearcoat: 0.52
  }));
  fairing.position.set(-2.6, 1, 0);
  rememberBase(fairing);
  registry.add("rocket-fairing", fairing, { selectable: true, selectableNodeId: "rocket" });
  scene.add(fairing);

  const flame = new THREE.Group();
  const outerFlame = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.86, 48),
    new THREE.MeshBasicMaterial({ color: "#ff8a2b", transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending })
  );
  const innerFlame = new THREE.Mesh(
    new THREE.ConeGeometry(0.11, 0.64, 48),
    new THREE.MeshBasicMaterial({ color: "#fff3cc", transparent: true, opacity: 0.56, blending: THREE.AdditiveBlending })
  );
  const flameLight = new THREE.PointLight("#ff9b45", 1.55, 3.2);
  flame.add(outerFlame, innerFlame, flameLight);
  flame.position.set(-2.6, -1.2, 0);
  outerFlame.rotation.x = Math.PI;
  innerFlame.rotation.x = Math.PI;
  scene.add(flame);

  return flame;
}

function addSatellite(scene, registry) {
  const origin = new THREE.Vector3(3.35, 1.94, -0.12);
  const busMaterial = makeMaterial("#d8b86d", "#2f2812", {
    emissiveIntensity: 0.22,
    metalness: 0.78,
    roughness: 0.28,
    clearcoat: 0.34
  });
  const darkMaterial = makeMaterial("#202833", "#070d14", {
    emissiveIntensity: 0.16,
    metalness: 0.62,
    roughness: 0.34,
    clearcoat: 0.24
  });
  const antennaMaterial = makeMaterial("#dfe8ea", "#26383d", {
    emissiveIntensity: 0.14,
    metalness: 0.82,
    roughness: 0.22
  });

  const bus = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.32), busMaterial);
  bus.position.copy(origin);
  rememberBase(bus);
  registry.add("satellite-bus", bus, { selectable: true, selectableNodeId: "satellite" });
  scene.add(bus);

  const panelMaterial = makeMaterial("#0a5b8c", "#0f6f99", {
    emissiveIntensity: 0.42,
    metalness: 0.34,
    roughness: 0.18,
    clearcoat: 0.7
  });
  const gridMaterial = makeMaterial("#9bd8f4", "#2e7fa0", {
    emissiveIntensity: 0.36,
    metalness: 0.28,
    roughness: 0.2,
    clearcoat: 0.55
  });
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.018, 0.28), panelMaterial);
  left.position.set(origin.x - 0.54, origin.y, origin.z);
  rememberBase(left);
  registry.add("satellite-left-array", left, { selectable: true, selectableNodeId: "satellite" });
  scene.add(left);

  const right = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.018, 0.28), panelMaterial);
  right.position.set(origin.x + 0.54, origin.y, origin.z);
  rememberBase(right);
  registry.add("satellite-right-array", right, { selectable: true, selectableNodeId: "satellite" });
  scene.add(right);

  for (const side of [-1, 1]) {
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.34, 12), antennaMaterial);
    boom.position.set(origin.x + side * 0.28, origin.y, origin.z);
    boom.rotation.z = Math.PI / 2;
    registry.add(`satellite-array-boom-${side > 0 ? "right" : "left"}`, boom, { selectable: true, selectableNodeId: "satellite" });
    scene.add(boom);

    for (let i = 0; i < 3; i += 1) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.022, 0.3), gridMaterial);
      rib.position.set(origin.x + side * (0.32 + i * 0.14), origin.y + 0.012, origin.z);
      scene.add(rib);
    }
  }

  const dish = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.1, 32, 1, true), antennaMaterial);
  dish.position.set(origin.x, origin.y + 0.02, origin.z - 0.23);
  dish.rotation.x = Math.PI / 2;
  registry.add("satellite-dish", dish, { selectable: true, selectableNodeId: "satellite" });
  scene.add(dish);

  const sensor = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.026, 24), darkMaterial);
  sensor.position.set(origin.x, origin.y - 0.165, origin.z + 0.02);
  sensor.rotation.x = Math.PI / 2;
  registry.add("satellite-sensor", sensor, { selectable: true, selectableNodeId: "satellite" });
  scene.add(sensor);

  for (const x of [-0.09, 0.09]) {
    const thruster = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.085, 18), darkMaterial);
    thruster.position.set(origin.x + x, origin.y, origin.z + 0.2);
    thruster.rotation.x = -Math.PI / 2;
    registry.add(`satellite-thruster-${x > 0 ? "right" : "left"}`, thruster, { selectable: true, selectableNodeId: "satellite" });
    scene.add(thruster);
  }
}

function addSpaceStation(scene, registry) {
  const station = new THREE.Group();
  station.position.set(0.48, 1.52, -1.02);
  station.rotation.set(0.18, -0.35, 0.12);
  station.scale.setScalar(1.36);

  const truss = new THREE.Mesh(
    new THREE.BoxGeometry(1.78, 0.04, 0.04),
    makeMaterial("#bfcbd0", "#17272d", { metalness: 0.78, roughness: 0.28 })
  );
  rememberBase(truss);
  registry.add("space-station-truss", truss, { selectable: true, selectableNodeId: "ground-station" });
  station.add(truss);

  const trussDetailMaterial = makeMaterial("#8f9da3", "#111e23", {
    emissiveIntensity: 0.18,
    metalness: 0.76,
    roughness: 0.34
  });
  [-0.68, -0.34, 0, 0.34, 0.68].forEach((offset, index) => {
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.18, 0.032), trussDetailMaterial);
    brace.position.set(offset, 0, 0);
    brace.rotation.z = index % 2 === 0 ? 0.78 : -0.78;
    registry.add(`space-station-brace-${index}`, brace, { selectable: true, selectableNodeId: "ground-station" });
    station.add(brace);
  });

  const moduleMaterial = makeMaterial("#cbd6d6", "#0d171b", {
    emissiveIntensity: 0.08,
    metalness: 0.46,
    roughness: 0.42,
    clearcoat: 0.22
  });
  const ringMaterial = makeMaterial("#65757c", "#071016", {
    emissiveIntensity: 0.08,
    metalness: 0.7,
    roughness: 0.36
  });
  [-0.32, -0.08, 0.16, 0.4].forEach((offset, index) => {
    const module = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.32, 32), moduleMaterial);
    module.position.set(offset, -0.02, 0.03);
    module.rotation.z = Math.PI / 2;
    rememberBase(module);
    registry.add(`space-station-module-${index}`, module, { selectable: true, selectableNodeId: "ground-station" });
    station.add(module);

    for (const [endIndex, end] of [-0.16, 0.16].entries()) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.006, 8, 28), ringMaterial);
      ring.position.set(offset + end, -0.02, 0.03);
      ring.rotation.y = Math.PI / 2;
      registry.add(`space-station-module-ring-${index}-${endIndex}`, ring, { selectable: true, selectableNodeId: "ground-station" });
      station.add(ring);
    }
  });

  const nodeMaterial = makeMaterial("#cfd8dc", "#1d2b31", {
    emissiveIntensity: 0.18,
    metalness: 0.56,
    roughness: 0.28,
    clearcoat: 0.34
  });
  for (const [index, x] of [-0.5, 0.58].entries()) {
    const dockingPort = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 24), nodeMaterial);
    dockingPort.position.set(x, -0.02, 0.03);
    dockingPort.rotation.z = Math.PI / 2;
    registry.add(`space-station-docking-port-${index}`, dockingPort, { selectable: true, selectableNodeId: "ground-station" });
    station.add(dockingPort);
  }

  const radiatorMaterial = makeMaterial("#e5ecec", "#21333a", {
    emissiveIntensity: 0.15,
    metalness: 0.34,
    roughness: 0.38,
    clearcoat: 0.26
  });
  for (const z of [-0.18, 0.23]) {
    const radiator = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.018, 0.1), radiatorMaterial);
    radiator.position.set(0.12, -0.16, z);
    registry.add(`space-station-radiator-${z > 0 ? "aft" : "fore"}`, radiator, { selectable: true, selectableNodeId: "ground-station" });
    station.add(radiator);
  }

  const panelMaterial = makeMaterial("#1b6d9e", "#147ea8", {
    emissiveIntensity: 0.3,
    metalness: 0.24,
    roughness: 0.18,
    clearcoat: 0.52
  });
  const panelFrameMaterial = makeMaterial("#caa35b", "#2b210c", {
    emissiveIntensity: 0.18,
    metalness: 0.72,
    roughness: 0.3,
    clearcoat: 0.24
  });
  for (const [sideIndex, side] of [-1, 1].entries()) {
    for (const [rowIndex, z] of [-0.2, 0.2].entries()) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.018, 0.18), panelMaterial);
      panel.position.set(side * 1.02, 0, z);
      rememberBase(panel);
      registry.add(`space-station-array-${sideIndex}-${rowIndex}`, panel, { selectable: true, selectableNodeId: "ground-station" });
      station.add(panel);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.012, 0.012), panelFrameMaterial);
      frame.position.set(side * 1.02, 0.018, z);
      registry.add(`space-station-array-frame-${sideIndex}-${rowIndex}`, frame, { selectable: true, selectableNodeId: "ground-station" });
      station.add(frame);
    }

    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.02), trussDetailMaterial);
    mast.position.set(side * 0.78, 0, 0);
    registry.add(`space-station-array-mast-${side > 0 ? "right" : "left"}`, mast, { selectable: true, selectableNodeId: "ground-station" });
    station.add(mast);
  }

  scene.add(station);
  return station;
}

function addEarth(scene) {
  const earthTexture = createEarthTexture();
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3.8, 64, 32),
    new THREE.MeshPhysicalMaterial({
      map: earthTexture,
      color: "#d8f4ff",
      emissive: "#061728",
      emissiveIntensity: 0.28,
      roughness: 0.88,
      metalness: 0.02,
      sheen: 0.25,
      sheenColor: "#5bd5ff"
    })
  );
  earth.position.set(0, -4.6, -1.8);
  scene.add(earth);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(3.9, 64, 32),
    new THREE.MeshBasicMaterial({
      color: "#62d6ff",
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
  );
  atmosphere.position.copy(earth.position);
  scene.add(atmosphere);

  return earth;
}

function addOrbitLines(scene) {
  const material = new THREE.LineBasicMaterial({ color: "#42c6ff", transparent: true, opacity: 0.7 });
  const lines = [];

  for (const radius of [2.2, 2.7, 3.2]) {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.34, 0, Math.PI * 2);
    const points = curve.getPoints(128).map((point) => new THREE.Vector3(point.x, point.y + 0.2, -0.9));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.rotation.x = -0.22;
    scene.add(line);
    lines.push(line);
  }

  return lines;
}

function seededValue(index, salt) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function addParticles(scene) {
  const count = 1400;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (seededValue(i, 1) - 0.5) * 12;
    positions[i * 3 + 1] = seededValue(i, 2) * 6 - 2;
    positions[i * 3 + 2] = (seededValue(i, 3) - 0.5) * 7;
    color.setHSL(0.53 + seededValue(i, 4) * 0.12, 0.45, 0.74 + seededValue(i, 5) * 0.22);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setDrawRange(0, count);

  const material = new THREE.PointsMaterial({
    size: 0.02,
    transparent: true,
    opacity: 0.82,
    vertexColors: true
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return { points, count };
}

function setParticleTier(particleField, tier) {
  const visibleCount = tier === "low" ? 450 : tier === "medium" ? 900 : particleField.count;
  particleField.points.geometry.setDrawRange(0, visibleCount);
}

function getFocusView(nodeId) {
  return focusViews[nodeId] ?? {
    position: OVERVIEW_POSITION,
    lookAt: ORIGIN
  };
}

function createFallbackScene(onWebGLUnavailable) {
  onWebGLUnavailable?.();
  return {
    start() {},
    syncState() {},
    resetCamera() {}
  };
}

export function createSpaceScene({ canvas, onNodeSelect, onIntroComplete, onWebGLUnavailable }) {
  if (new URLSearchParams(window.location.search).get("forceFallback") === "1") {
    return createFallbackScene(onWebGLUnavailable);
  }

  if (!canUseWebGL()) {
    return createFallbackScene(onWebGLUnavailable);
  }

  let renderer;
  try {
    const preserveDrawingBuffer = new URLSearchParams(window.location.search).has("verify");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer });
  } catch {
    return createFallbackScene(onWebGLUnavailable);
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#030912", 6.4, 14);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.copy(OVERVIEW_POSITION);
  camera.lookAt(ORIGIN);

  const registry = createNodeRegistry({ selectableIds: nodes.map((node) => node.id) });
  const stateRef = { current: null };
  let introStarted = performance.now();
  let previousMode = null;
  let previousSelectedNode = null;
  let introCompleted = false;
  const clock = new THREE.Clock();
  let animationFrameId = null;
  let lastWidth = 0;
  let lastHeight = 0;
  const focusLookAt = ORIGIN.clone();
  const orbitState = {
    yaw: 0,
    pitch: 0,
    velocityYaw: 0,
    velocityPitch: 0
  };
  const orbitOffset = new THREE.Vector3();
  const orbitTarget = new THREE.Vector3();
  const orbitSpherical = new THREE.Spherical();

  scene.add(new THREE.HemisphereLight("#9bdcff", "#17110b", 0.62));
  scene.add(new THREE.AmbientLight("#6f9bb0", 0.24));

  const keyLight = new THREE.DirectionalLight("#fff6e0", 2.65);
  keyLight.position.set(-3, 5.4, 5.4);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight("#4bdcff", 2.7, 8);
  rimLight.position.set(2.6, 1.8, 2.4);
  scene.add(rimLight);

  const earth = addEarth(scene);
  addLaunchSite(scene, registry);
  const flame = addRocket(scene, registry);
  addSatellite(scene, registry);
  const spaceStation = addSpaceStation(scene, registry);
  const orbitLines = addOrbitLines(scene);
  const particleField = addParticles(scene);

  for (const node of nodes) {
    if (visibleMarkerNodeIds.has(node.id)) {
      scene.add(registry.add(node.id, createNodeMarker(node)));
    }
  }

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1024, 1024), 0.62, 0.48, 0.28));

  function clampOrbitPitch(focusView) {
    orbitOffset.subVectors(focusView.position, focusView.lookAt);
    orbitSpherical.setFromVector3(orbitOffset);
    orbitState.pitch = THREE.MathUtils.clamp(
      orbitState.pitch,
      ORBIT_MIN_POLAR - orbitSpherical.phi,
      ORBIT_MAX_POLAR - orbitSpherical.phi
    );
  }

  function getOrbitCameraTarget(focusView) {
    orbitOffset.subVectors(focusView.position, focusView.lookAt);
    orbitSpherical.setFromVector3(orbitOffset);
    orbitSpherical.theta += orbitState.yaw;
    orbitSpherical.phi = THREE.MathUtils.clamp(orbitSpherical.phi + orbitState.pitch, ORBIT_MIN_POLAR, ORBIT_MAX_POLAR);
    orbitTarget.setFromSpherical(orbitSpherical).add(focusView.lookAt);
    return orbitTarget;
  }

  function handleOrbitDrag({ dx, dy }) {
    const yawDelta = -dx * ORBIT_DRAG_SENSITIVITY;
    const pitchDelta = dy * ORBIT_DRAG_SENSITIVITY;
    orbitState.yaw += yawDelta;
    orbitState.pitch += pitchDelta;
    orbitState.velocityYaw = yawDelta * 14;
    orbitState.velocityPitch = pitchDelta * 14;
  }

  createRaycastSelector({
    camera,
    canvas,
    registry,
    onSelect: onNodeSelect ?? (() => {}),
    onDrag: handleOrbitDrag,
    getEnabled: () => stateRef.current?.mode === "explore"
  });

  function resize() {
    const width = Math.max(canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth || 1, 1);
    const height = Math.max(canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight || 1, 1);

    if (width === lastWidth && height === lastHeight) return;

    lastWidth = width;
    lastHeight = height;
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function render() {
    resize();

    const delta = clock.getDelta();
    const elapsed = performance.now() - introStarted;
    const state = stateRef.current;

    earth.rotation.y += delta * 0.018;
    spaceStation.rotation.y += delta * 0.045;
    particleField.points.rotation.y += delta * 0.018;
    flame.scale.y = 0.85 + Math.sin(performance.now() / 90) * 0.12;

    orbitLines.forEach((line, index) => {
      line.rotation.z += delta * (0.012 + index * 0.004);
    });

    if (state?.mode === "intro") {
      const intro = applyIntroCamera({ camera, elapsed });
      if (intro.done && !introCompleted) {
        introCompleted = true;
        onIntroComplete?.();
      }
    } else if (state?.mode === "explore") {
      const focusView = getFocusView(state.selectedNode);
      const focusEase = 1 - Math.exp(-delta * 2.8);
      orbitState.yaw += orbitState.velocityYaw * delta;
      orbitState.pitch += orbitState.velocityPitch * delta;
      clampOrbitPitch(focusView);
      orbitState.velocityYaw *= Math.exp(-delta * 6.2);
      orbitState.velocityPitch *= Math.exp(-delta * 6.2);
      camera.position.lerp(getOrbitCameraTarget(focusView), focusEase);
      focusLookAt.lerp(focusView.lookAt, focusEase);
      camera.lookAt(focusLookAt);
    }

    applyExplodedView({
      registry,
      explodedView: state?.explodedView,
      amount: state?.explodedView ? 1 : 0
    });

    composer.render();
    animationFrameId = requestAnimationFrame(render);
  }

  return {
    start() {
      if (animationFrameId !== null) return;
      resize();
      clock.start();
      render();
    },
    syncState(nextState) {
      if (previousMode !== "intro" && nextState?.mode === "intro") {
        introStarted = performance.now();
        introCompleted = false;
      }

      previousMode = nextState?.mode ?? null;
      if (nextState?.selectedNode !== previousSelectedNode) {
        previousSelectedNode = nextState?.selectedNode ?? null;
        orbitState.yaw = 0;
        orbitState.pitch = 0;
        orbitState.velocityYaw = 0;
        orbitState.velocityPitch = 0;
      }
      stateRef.current = nextState;
      registry.setActive(nextState?.selectedNode);
      setParticleTier(particleField, nextState?.performanceTier);
    },
    resetCamera() {
      camera.position.copy(OVERVIEW_POSITION);
      orbitState.yaw = 0;
      orbitState.pitch = 0;
      orbitState.velocityYaw = 0;
      orbitState.velocityPitch = 0;
      focusLookAt.copy(ORIGIN);
      camera.lookAt(focusLookAt);
    }
  };
}
