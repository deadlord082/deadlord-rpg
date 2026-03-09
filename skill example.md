player.addBuff({
  id: "rage",
  name: "Rage",
  type: "buff",
  duration: 3,
  modifiers: [
    { stat: "strength", value: 5, type: "flat" },
    { stat: "critChance", value: 0.1, type: "percent" },
  ],
  source: "skill",
})