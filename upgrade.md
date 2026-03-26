FIX/PATCHES

Below are the concrete fixes to apply, short rationale, and where to change code. These are written so a developer can patch quickly or use as acceptance criteria.


---

UPGRADES :
These are concrete, scoped upgrades we can implement next. Each item is small enough to complete in a short PR.
- In Combat, add a fade to black when the battle finished, either by winning,losing, or fleeing. then go back to the game.
- In combat, add a way to load an image file that has a frame by frame animation loop based on the weapon used for the attack actions, guard action, skill used for the skill action.
- add a way to save if an enemy has been defeated or not. the majority of the enemies can respawn.
- add a settings tabs in the game menu. it will contains for now just the key configuration (default : z,q,s,d/up arrow,left arrow, down arrow, right arrow , enter , esc)
- add a main menu at the start of the game with the basics option (new game, load game, settings). an image for the background, an image for the title menu, and the version(for now V0.7.4) on the bottom corner
- add inside the settings tabs an export saves button which let's you export the save inside a json file. then add an import saves buttons which let's you imports this type of file.
- In combat, when you lose,you should see a death screen with 2 options that you can choose from, main menu which make you go back to the main menu, load game which open the load tab
- add a way to gain skill through level up via an event to be able to reuse it for other way of gaining skill.
- add a way to use consumable item in the inventory. consumable item can be used for regenerating/decreasing health of the player(potion,food,...) but can also be used to gain gold(lost purse, Scratch Ticket, ...), to gain other item(loot box,...), to gain a skill (skill book,...).
- In combat, add an item section to use consumable item during combat.
- In combat, add a way to apply buff/debuff and status effect.
- when walking add a timer to add animation and to not make the player just teleport while moving.
- add a way to register a path for an npc so he can move during the game.
- add an event that when trigger load a cinematic. with moving npc + text + moment without text
- add sound + music trigger for the game
  
--------

FUTURE UPGRADE
 - Add per-weapon attack animations using `AnimationScheduler` and sprite strips / frame sets; map animation to weapon id.
 - Implement save slots & persistence: localStorage-based save with defeated-enemies list and world flags; export/import via JSON file.
 - Add settings menu for keybindings and audio/graphics toggles.
 - Add a death screen UX for defeat with options: main menu / load save.

---


If many entities, consider an ECS or data-oriented approach for systems that need to iterate many entities (movement, collision).