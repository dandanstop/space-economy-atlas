import * as THREE from "three";

const introTargets = [
  {
    time: 0,
    camera: new THREE.Vector3(-5, 2.8, 7),
    lookAt: new THREE.Vector3(-3.9, -0.8, 0),
    chapter: "launch-site"
  },
  {
    time: 0.25,
    camera: new THREE.Vector3(-3.6, 1.4, 4.4),
    lookAt: new THREE.Vector3(-2.6, 0.1, 0),
    chapter: "rocket"
  },
  {
    time: 0.5,
    camera: new THREE.Vector3(2.0, 2.56, 3.78),
    lookAt: new THREE.Vector3(3.35, 1.94, -0.12),
    chapter: "satellite"
  },
  {
    time: 0.75,
    camera: new THREE.Vector3(3.8, 1.2, 4.8),
    lookAt: new THREE.Vector3(3.4, -0.6, 0.2),
    chapter: "ground-segment"
  },
  {
    time: 1,
    camera: new THREE.Vector3(0, 2.6, 7.2),
    lookAt: new THREE.Vector3(0, 0, 0),
    chapter: "applications"
  }
];

const explodedViewSpecs = {
  rocket: [
    ["rocket-body", new THREE.Vector3(0, 0.6, 0)],
    ["rocket-booster", new THREE.Vector3(0, -0.8, 0)],
    ["rocket-fairing", new THREE.Vector3(0.65, 0.2, 0)]
  ],
  satellite: [
    ["satellite-bus", new THREE.Vector3(0, 0, 0.38)],
    ["satellite-left-array", new THREE.Vector3(-0.8, 0, 0)],
    ["satellite-right-array", new THREE.Vector3(0.8, 0, 0)]
  ],
  "launch-site": [
    ["launch-pad", new THREE.Vector3(0, -0.2, 0)],
    ["launch-tower-core", new THREE.Vector3(-0.6, 0.3, 0)],
    ["launch-storage-tank-0", new THREE.Vector3(0.68, 0, -0.1)],
    ["launch-storage-tank-1", new THREE.Vector3(0.68, 0, 0.1)]
  ]
};

export function easeInOut(t) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  return clamped < 0.5 ? 2 * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
}

export function applyIntroCamera({ camera, elapsed, duration = 26000 }) {
  const progress = THREE.MathUtils.clamp(elapsed / duration, 0, 1);
  const eased = easeInOut(progress);
  let start = introTargets[0];
  let end = introTargets[introTargets.length - 1];

  for (let i = 0; i < introTargets.length - 1; i += 1) {
    if (eased >= introTargets[i].time && eased <= introTargets[i + 1].time) {
      start = introTargets[i];
      end = introTargets[i + 1];
      break;
    }
  }

  const localProgress = (eased - start.time) / Math.max(end.time - start.time, 0.001);
  const localEased = easeInOut(localProgress);
  const lookAt = new THREE.Vector3().lerpVectors(start.lookAt, end.lookAt, localEased);

  camera.position.lerpVectors(start.camera, end.camera, localEased);
  camera.lookAt(lookAt);

  return {
    done: progress >= 1,
    chapter: localProgress < 0.5 ? start.chapter : end.chapter
  };
}

export function applyExplodedView({ registry, explodedView, amount }) {
  for (const parts of Object.values(explodedViewSpecs)) {
    for (const [partId] of parts) {
      const mesh = registry.get(partId);
      if (mesh?.userData.basePosition) {
        mesh.position.copy(mesh.userData.basePosition);
      }
    }
  }

  const normalizedAmount = THREE.MathUtils.clamp(amount ?? 0, 0, 1);
  for (const [partId, offset] of explodedViewSpecs[explodedView] ?? []) {
    const mesh = registry.get(partId);
    if (mesh?.userData.basePosition) {
      mesh.position.copy(mesh.userData.basePosition).addScaledVector(offset, normalizedAmount);
    }
  }
}
