FIX/PATCHES

Below are the concrete fixes to apply, short rationale, and where to change code. These are written so a developer can patch quickly or use as acceptance criteria.


1) End-of-interaction dialogs don't show after fight/shop/etc.
 - Issue: Final dialog lines aren't shown when interactions finish (combat end, closing shop, merchant, etc.). Possibly `ui` is cleared or events are overwritten when restoring `state.running = true`.
 - Fix: When ending an interaction, push any follow-up dialog into `state.ui.dialog` (or queue in `state.eventQueue` and call `runEvent`). Do not overwrite `state.ui.dialog` until the follow-up has been consumed. Ensure `EventRunner` uses `state._eventBus?.emit('uiUpdate')` after queuing.
 - Files: `game/systems/CombatSystem.ts`, `app/page.tsx`, `game/events/EventRunner.ts`.

---
FUTURE UPGRADE SUGGESTIONS (short list)
 - Add target selection UI (per `upgrade.md` existing idea): show target cursor, keyboard left/right to change target, wrap skipping dead targets.
 - Add hit variance & crit variance via `rng.random()` in `DamageSystem` (±10% damage randomized and scaled crit multiplier).
 - Add per-weapon attack animations using `AnimationScheduler` and sprite strips / frame sets; map animation to weapon id.
 - Implement save slots & persistence: localStorage-based save with defeated-enemies list and world flags; export/import via JSON file.
 - Add settings menu for keybindings and audio/graphics toggles.
 - Add a death screen UX for defeat with options: main menu / load save.

---
Notes / next steps
 - I created a tracked todo list for each fix; pick items to implement in priority order. For quick wins: (1) guard timing, (2) unique enemy instance ids, (3) skip dead enemies in loops.
 - I can start applying code changes for any specific numbered item — tell me which to implement first and I'll patch the code and tests.

UPGRADES :
- add another way to interract with warp when the player is facing one and pressing enter.
- In Combat, add a fade to black when the battle finished, either by winning,losing, or fleeing. then go back to the game.
- In combat, add a way to load an image file that has a frame by frame animation loop based on the weapon used for the attack actions, guard action, skill used for the skill action.
- In combat, add target selection UI (choose which enemy to attack) and wire keyboard target cycling.
- Add randomness to fight, to not always have the same damage during a fight. for example you are supposed to always deal a fixed amount of damages but by adding some of this randomness you can deal around 10% more or less damages so each hit isn't the exact same as the previous one. do the same for crit attack and enemies attack.
- add a way to save if an enemy has been defeated or not. the majority of the enemies can respawn.
- add a settings tabs in the game menu. it will contains for now just the key configuration (default : z,q,s,d/up arrow,left arrow, down arrow, right arrow , enter , esc)
- add a main menu at the start of the game with the basics option (new game, load game, settings). an image for the background, an image for the title menu, and the version(for now V0.7.4) on the bottom corner
- add a save tabs in the game menu, when opened you can choose between 3 save slots and see if you already have a save in each slot. this list of saves should be stored inside the local storage. the save should contain all the information of the player, the enemies that have been defeated that should not respawn, the location of the player,... 
- add inside the settings tabs an export saves button which let's you export the save inside a .txt file. then add an import saves buttons which let's you imports this type of file.
- In combat, when you lose,you should see a death screen with 2 options that you can choose from, main menu which make you go back to the main menu, load game which open the load tab


If many entities, consider an ECS or data-oriented approach for systems that need to iterate many entities (movement, collision).