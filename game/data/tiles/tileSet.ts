import { Tile } from "./tileTypes"

export const Tiles: Record<string, Tile> = {
  //
  // Base / Fallback
  //
  ground: {
    id: "ground",
    name: "Ground",
    walkable: true,
    image: "/assets/tiles/placeholder.png",
  },

  //
  // Grass Tiles
  //
  grass_1: {
    id: "grass_1",
    name: "Grass",
    walkable: true,
    image: "/assets/tiles/floors/grass1.png",
  },
  grass_2: {
    id: "grass_2",
    name: "Grass",
    walkable: true,
    image: "/assets/tiles/floors/grass2.png",
  },
  grass_3: {
    id: "grass_3",
    name: "Grass",
    walkable: true,
    image: "/assets/tiles/floors/grass3.png",
  },
  grass_4: {
    id: "grass_4",
    name: "Grass",
    walkable: true,
    image: "/assets/tiles/floors/grass4.png",
  },
  grass_5: {
    id: "grass_5",
    name: "Grass",
    walkable: true,
    image: "/assets/tiles/floors/grass5.png",
  },

  //
  // Tile Grass
  //
  tile_grass_1: {
    id: "tile_grass_1",
    name: "Tile Grass",
    walkable: true,
    image: "/assets/tiles/floors/tilegrass1.png",
  },
  tile_grass_2: {
    id: "tile_grass_2",
    name: "Tile Grass",
    walkable: true,
    image: "/assets/tiles/floors/tilegrass2.png",
  },
  tile_grass_3: {
    id: "tile_grass_3",
    name: "Tile Grass",
    walkable: true,
    image: "/assets/tiles/floors/tilegrass3.png",
  },
  tile_grass_4: {
    id: "tile_grass_4",
    name: "Tile Grass",
    walkable: true,
    image: "/assets/tiles/floors/tilegrass4.png",
  },
  tile_grass_5: {
    id: "tile_grass_5",
    name: "Tile Grass",
    walkable: true,
    image: "/assets/tiles/floors/tilegrass5.png",
  },

  //
  // Stone Ground
  //
  stone_ground_1: {
    id: "stone_ground_1",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground1.png",
  },
  stone_ground_2: {
    id: "stone_ground_2",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground2.png",
  },
  stone_ground_3: {
    id: "stone_ground_3",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground3.png",
  },
  stone_ground_4: {
    id: "stone_ground_4",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground4.png",
  },
  stone_ground_5: {
    id: "stone_ground_5",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground5.png",
  },
  stone_ground_6: {
    id: "stone_ground_6",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground6.png",
  },
  stone_ground_7: {
    id: "stone_ground_7",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground7.png",
  },
  stone_ground_8: {
    id: "stone_ground_8",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground8.png",
  },
  stone_ground_9: {
    id: "stone_ground_9",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground9.png",
  },
  stone_ground_10: {
    id: "stone_ground_10",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground10.png",
  },
  stone_ground_11: {
    id: "stone_ground_11",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground11.png",
  },
  stone_ground_12: {
    id: "stone_ground_12",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground12.png",
  },
  stone_ground_13: {
    id: "stone_ground_13",
    name: "Stone Ground",
    walkable: true,
    image: "/assets/tiles/floors/stoneground13.png",
  },

  //
  // Stone Stairs
  //
  stone_stairs_1: {
    id: "stone_stairs_1",
    name: "Stone Stairs",
    walkable: true,
    image: "/assets/tiles/floors/stonestairs1.png",
  },
  stone_stairs_2: {
    id: "stone_stairs_2",
    name: "Stone Stairs",
    walkable: true,
    image: "/assets/tiles/floors/stonestairs2.png",
  },
  stone_stairs_3: {
    id: "stone_stairs_3",
    name: "Stone Stairs",
    walkable: true,
    image: "/assets/tiles/floors/stonestairs3.png",
  },
  stone_stairs_4: {
    id: "stone_stairs_4",
    name: "Stone Stairs",
    walkable: true,
    image: "/assets/tiles/floors/stonestairs4.png",
  },

  //
  // Walls — Stone
  //
  wall_void: {
    id: "wall_void",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/void.png",
  },
  wall_stone_1: {
    id: "wall_stone_1",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall1.png",
  },
  wall_stone_2: {
    id: "wall_stone_2",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall2.png",
  },
  wall_stone_3: {
    id: "wall_stone_3",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall3.png",
  },
  wall_stone_4: {
    id: "wall_stone_4",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall4.png",
  },
  wall_stone_5: {
    id: "wall_stone_5",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall5.png",
  },
  wall_stone_6: {
    id: "wall_stone_6",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall6.png",
  },
  wall_stone_7: {
    id: "wall_stone_7",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall7.png",
  },
  wall_stone_8: {
    id: "wall_stone_8",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall8.png",
  },
  wall_stone_9: {
    id: "wall_stone_9",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/stonebrickwall9.png",
  },

  //
  // Walls — Forest
  //
  wall_forest_1: {
    id: "wall_forest_1",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/forest1.png",
  },
  wall_forest_2: {
    id: "wall_forest_2",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/forest2.png",
  },
  wall_forest_3: {
    id: "wall_forest_3",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/forest3.png",
  },
  wall_forest_4: {
    id: "wall_forest_4",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/forest4.png",
  },
  wall_forest_5: {
    id: "wall_forest_5",
    name: "Wall",
    walkable: false,
    image: "/assets/tiles/walls/forest5.png",
  },

  //
  // Warp Tiles
  //
  door_wood_stone_in: {
    id: "door_wood_stone_in",
    name: "Door",
    walkable: true,
    image: "/assets/tiles/warps/wooddoorinstonebick.png",
    onEnter: {
      type: "warp",
      targetMap: "frontYardHeroHouse",
      x: 3,
      y: 1,
    },
  },
  door_wood_stone_out: {
    id: "door_wood_stone_out",
    name: "Door",
    walkable: true,
    image: "/assets/tiles/warps/wooddoorinstonebick.png",
    onEnter: {
      type: "warp",
      targetMap: "heroHouse",
      x: 3,
      y: 6,
    },
  },
}
