import { Tile } from "./tileTypes"

export const Tiles: Record<number, Tile> = {
    //
    // Floor Tiles
    //
    0: {
        id: 0,
        name: "Ground",
        walkable: true,
        image: "/assets/tiles/placeholder.png",
    },
    // Grass Tiles  
    1: {
        id: 1,
        name: "Grass",
        walkable: true,
        image: "/assets/tiles/floors/grass1.png",
    },
    2: {
        id: 2,
        name: "Grass",
        walkable: true,
        image: "/assets/tiles/floors/grass2.png",
    },
    3: {
        id: 3,
        name: "Grass",
        walkable: true,
        image: "/assets/tiles/floors/grass3.png",
    },
    4: {
        id: 4,
        name: "Grass",
        walkable: true,
        image: "/assets/tiles/floors/grass4.png",
    },
    5: {
        id: 5,
        name: "Grass",
        walkable: true,
        image: "/assets/tiles/floors/grass5.png",
    },
    // TileGrass Tiles
    6: {
        id: 6,
        name: "TileGrass",
        walkable: true,
        image: "/assets/tiles/floors/tilegrass1.png",
    },
    7: {
        id: 7,
        name: "TileGrass",
        walkable: true,
        image: "/assets/tiles/floors/tilegrass2.png",
    },
    8: {
        id: 8,
        name: "TileGrass",
        walkable: true,
        image: "/assets/tiles/floors/tilegrass3.png",
    },
    9: {
        id: 9,
        name: "TileGrass",
        walkable: true,
        image: "/assets/tiles/floors/tilegrass4.png",
    },
    10: {
        id: 10,
        name: "TileGrass",
        walkable: true,
        image: "/assets/tiles/floors/tilegrass5.png",
    },

    //
    // Wall Tiles
    //
    500: {
        id: 500,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/wall.png",
    },
    501: {
        id: 501,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall1.png",
    },
    502: {
        id: 502,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall2.png",
    },
    503: {
        id: 503,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall3.png",
    },
    504: {
        id: 504,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall4.png",
    },
    505: {
        id: 505,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall5.png",
    },

    //
    // Warp Tiles
    //
    1000: {
        id: 1000,
        name: "Door",
        walkable: true,
        image: "/assets/tiles/warps/door.png",
        onEnter: {
        type: "warp",
        targetMap: "frontYardHeroHouse",
        x: 2,  // where the player will appear in the new map
        y: 1,
        },
    },
    1001: {
        id: 1001,
        name: "Door",
        walkable: true,
        image: "/assets/tiles/warps/door.png",
        onEnter: {
        type: "warp",
        targetMap: "heroHouse",
        x: 2,
        y: 3,
        },
    },
}