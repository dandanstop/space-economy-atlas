import * as THREE from "three";

export function createNodeRegistry({ selectableIds = [] } = {}) {
  const meshes = new Map();
  const selectableIdSet = new Set(selectableIds);
  const selectableMeshes = new Map();

  return {
    add(nodeId, mesh, { selectable = selectableIdSet.has(nodeId), selectableNodeId = nodeId } = {}) {
      if (selectable) {
        mesh.traverse((object) => {
          object.userData.selectableNodeId = selectableNodeId;
        });
        mesh.userData.selectableNodeId = selectableNodeId;
        selectableMeshes.set(nodeId, mesh);
      } else {
        mesh.userData.partId = nodeId;
      }

      meshes.set(nodeId, mesh);
      return mesh;
    },
    get(nodeId) {
      return meshes.get(nodeId) ?? null;
    },
    all() {
      return [...meshes.values()];
    },
    selectable() {
      return [...selectableMeshes.values()];
    },
    setActive(nodeId) {
      for (const [id, mesh] of selectableMeshes) {
        mesh.userData.active = (mesh.userData.selectableNodeId ?? id) === nodeId;
      }
    }
  };
}

export function createRaycastSelector({ camera, canvas, registry, onSelect, onDrag, getEnabled = () => true }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dragThreshold = 7;
  let activePointerId = null;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;
  let isDragging = false;
  let startHit = null;

  function intersectSelectable(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(registry.selectable(), true);
    return hits.find((entry) => entry.object.userData.selectableNodeId);
  }

  function capturePointer(pointerId) {
    try {
      canvas.setPointerCapture?.(pointerId);
    } catch {
      // Some synthetic touch events do not create an active pointer capture target.
    }
  }

  function releasePointer(pointerId) {
    try {
      if (!canvas.hasPointerCapture || canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture?.(pointerId);
      }
    } catch {
      // Pointer capture may already be gone after cancellation or synthetic events.
    }
  }

  function handlePointerDown(event) {
    if (!getEnabled()) return;
    if (event.button !== undefined && event.button !== 0) return;

    activePointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    lastX = event.clientX;
    lastY = event.clientY;
    isDragging = false;
    startHit = intersectSelectable(event);
    capturePointer(event.pointerId);
    canvas.style.cursor = "grabbing";
  }

  function handlePointerMove(event) {
    if (activePointerId === event.pointerId) {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const totalDistance = Math.hypot(event.clientX - startX, event.clientY - startY);

      if (totalDistance > dragThreshold) {
        isDragging = true;
      }

      if (isDragging) {
        event.preventDefault();
        onDrag?.({ dx, dy, event });
      }

      lastX = event.clientX;
      lastY = event.clientY;
      return;
    }

    if (!getEnabled()) {
      canvas.style.cursor = "";
      return;
    }
    canvas.style.cursor = intersectSelectable(event) ? "pointer" : "grab";
  }

  function resetPointer(event) {
    if (activePointerId !== event.pointerId) return;
    releasePointer(event.pointerId);
    activePointerId = null;
    isDragging = false;
    startHit = null;
    canvas.style.cursor = "";
  }

  function handlePointerUp(event) {
    if (activePointerId !== event.pointerId) return;

    if (!isDragging && getEnabled()) {
      const hit = intersectSelectable(event) ?? startHit;
      if (hit) {
        event.preventDefault();
        onSelect(hit.object.userData.selectableNodeId);
      }
    }

    resetPointer(event);
  }

  function handlePointerLeave() {
    if (activePointerId === null) {
      canvas.style.cursor = "";
    }
  }

  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", resetPointer);
  canvas.addEventListener("pointerleave", handlePointerLeave);

  return {
    destroy() {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", resetPointer);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    }
  };
}
