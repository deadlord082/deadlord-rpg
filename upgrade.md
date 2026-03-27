FIX/PATCHES

Below are the concrete fixes to apply, short rationale, and where to change code. These are written so a developer can patch quickly or use as acceptance criteria.


---

UPGRADES :
These are concrete, scoped upgrades we can implement next. Each item is small enough to complete in a short PR.
- In Combat, add a fade to black when the battle finished, either by winning,losing, or fleeing. then go back to the game.
- In combat, add a way to load an image file that has a frame by frame animation loop based on the weapon used for the attack actions, guard action, skill used for the skill action.
- add a way to gain skill through level up via an event to be able to reuse it for other way of gaining skill.
- add a way to use consumable item in the inventory. consumable item can be used for regenerating/decreasing health of the player(potion,food,...) but can also be used to gain gold(lost purse, Scratch Ticket, ...), to gain other item(loot box,...), to gain a skill (skill book,...).
- In combat, add an item section to use consumable item during combat.
- In combat, add a way to apply buff/debuff and status effect.
- when walking add a timer to add animation and to not make the player just teleport while moving.
- add a way to register a path for an npc so he can move during the game.
- add an event that when trigger load a cinematic. with moving npc + text + moment without text
- add sound + music trigger for the game

- In combat, add boss, these enemies will change sprites, say a line of dialog, change stats when certain hp treshold are passed.
- redo the camera that show tiles on screen to really move with the player and not have any tiles that are outside the screen based on the resolution of the screen to always have a 11x11 tiles shown on screens. 
- also make the tiles shown on the center of the screen because right now it is on the left side.
- do the same for combat by making it take all screen instead of the corner
- after a successful combat, not all event in the sequence are triggered(exemple : removeEnemiebyId works, but rewards doesn't)
- make a way to have some npc only have one texture because they cannot rotate.
- add on the title screen a new button to change language. for now let's just add french and keep english as the default language.
--------

FUTURE UPGRADE
 - Add per-weapon attack animations using `AnimationScheduler` and sprite strips / frame sets; map animation to weapon id.
 - Implement save slots & persistence: localStorage-based save with defeated-enemies list and world flags; export/import via JSON file.
 - Add settings menu for keybindings and audio/graphics toggles.
 - Add a death screen UX for defeat with options: main menu / load save.

---


If many entities, consider an ECS or data-oriented approach for systems that need to iterate many entities (movement, collision).