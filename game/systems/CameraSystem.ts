import { GameState } from "@/game/core/GameState"

export const CameraSystem = {
  // Smoothly move camera center toward the target based on player position.
  update(state: GameState, deltaSeconds: number, viewWidth: number, viewHeight: number) {
    if (!state.player) return

    const radiusX = Math.floor(viewWidth / 2)
    const radiusY = Math.floor(viewHeight / 2)

    const mapW = state.currentMap.width
    const mapH = state.currentMap.height

    // Use player's rendered/interpolated position when moving so camera follows visual
    const p = state.player as any
    let playerRenderX = p.x
    let playerRenderY = p.y
    if (p.moving && p.moveFrom) {
      const fromX = p.moveFrom.x
      const fromY = p.moveFrom.y
      const elapsed = p.moveElapsed ?? 0
      const dur = p.moveDuration ?? 200
      const t = dur > 0 ? Math.min(1, (elapsed / dur)) : 1
      playerRenderX = fromX + (p.x - fromX) * t
      playerRenderY = fromY + (p.y - fromY) * t
    }

    // Desired clamped camera center so edges don't show outside map
    const minCenterX = radiusX
    const maxCenterX = Math.max(radiusX, mapW - radiusX)
    const minCenterY = radiusY
    const maxCenterY = Math.max(radiusY, mapH - radiusY)

    const targetX = Math.max(minCenterX, Math.min(playerRenderX, maxCenterX))
    const targetY = Math.max(minCenterY, Math.min(playerRenderY, maxCenterY))

    state.cameraX = state.cameraX ?? targetX
    state.cameraY = state.cameraY ?? targetY

    const speed = 8 // higher = snappier

    // exponential/LERP smoothing
    const alpha = Math.min(1, speed * deltaSeconds)
    state.cameraX = state.cameraX + (targetX - state.cameraX) * alpha
    state.cameraY = state.cameraY + (targetY - state.cameraY) * alpha
  }
}

export default CameraSystem
