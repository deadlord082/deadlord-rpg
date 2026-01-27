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
    // StoneGround Tiles
    11: {
        id: 11,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground1.png",
    },
    12: {
        id: 12,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground2.png",
    },
    13: {
        id: 13,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground3.png",
    },
    14: {
        id: 14,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground4.png",
    },
    15: {
        id: 15,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground5.png",
    },
    16: {
        id: 16,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground6.png",
    },
    17: {
        id: 17,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground7.png",
    },
    18: {
        id: 18,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground8.png",
    },
    19: {
        id: 19,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground9.png",
    },
    20: {
        id: 20,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground10.png",
    },
    21: {
        id: 21,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground11.png",
    },
    22: {
        id: 22,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground12.png",
    },
    23: {
        id: 23,
        name: "StoneGround",
        walkable: true,
        image: "/assets/tiles/floors/stoneground13.png",
    },
    // Stone Stairs Tiles  
    31: {
        id: 31,
        name: "Stone Stairs",
        walkable: true,
        image: "/assets/tiles/floors/stonestairs1.png",
    },
    32: {
        id: 32,
        name: "Stone Stairs",
        walkable: true,
        image: "/assets/tiles/floors/stonestairs2.png",
    },
    33: {
        id: 33,
        name: "Stone Stairs",
        walkable: true,
        image: "/assets/tiles/floors/stonestairs3.png",
    },
    34: {
        id: 34,
        name: "Stone Stairs",
        walkable: true,
        image: "/assets/tiles/floors/stonestairs4.png",
    },

    //
    // Wall Tiles
    //
    500: {
        id: 500,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/void.png",
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
    506: {
        id: 506,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall6.png",
    },
    507: {
        id: 507,
        name: "Wall",
        walkable: false,
        image: "/assets/tiles/walls/stonebrickwall7.png",
    },

    //
    // Warp Tiles
    //
    1000: {
        id: 1000,
        name: "Door",
        walkable: true,
        image: "/assets/tiles/warps/wooddoorinstonebick.png",
        onEnter: {
        type: "warp",
        targetMap: "frontYardHeroHouse",
        x: 3,  // where the player will appear in the new map
        y: 1,
        },
    },
    1001: {
        id: 1001,
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