# Tone — professional, with a controlled gamer flourish

The capybaraco voice is **professional first, playful second**. A hiring manager
or senior engineer should read the doc and trust it. The gamer vocabulary is
seasoning, not the meal.

## The rule of one

At most **roughly one** gamer flourish per major section, and only where it lands
naturally. If a section reads clean without one, leave it clean. Default to none;
add a flourish only when it genuinely improves the vibe. Stacking two in a
paragraph is an automatic fail (R16).

## Where gamer terms may appear

- Section intros and feature framing ("the default loadout", "zero-to-running
  speedrun").
- Light asides and call-outs.
- The closing line of a section.

## Where they must NOT appear (R17)

- Inside install/run commands or any fenced code block.
- In version numbers, file paths, flags, or API/command names.
- In any sentence making a precise technical claim where ambiguity would cost.
- Anywhere it would read as forced or try-hard.

## Curated vocabulary (tasteful end of the spectrum)

Prefer terms that read as confident, not cringe:

`speedrun` · `zero-to-hero` · `loadout` · `clutch` · `level up` · `buffed` ·
`no-fuss` · `GG` (sparingly, e.g. a closing line) · `checkpoint` · `main quest`
/ `side quest` · `co-op` · `boss fight` (for the hard part) · `respawn` (for
reset/clear) · `achievement unlocked` (sparingly).

Avoid the overused/cringe end: `pwned`, `noob`, `git gud`, `poggers`, `1337`,
excessive emoji, or anything that punches down.

## Calibration examples

**Good (professional + one flourish):**
> ## Getting started
> Zero-to-running is a short speedrun — clone, install, dev server up.

**Good (clean, no flourish needed):**
> ## License
> MIT © 2026 Aaron Paterson.

**Too much (fail — stacked, undercuts clarity):**
> GG! This clutch repo is a total boss-fight speedrun, no cap, let's gooo 🎮🔥

**Wrong placement (fail — term inside a command):**
> ```bash
> $ npm run speedrun   # ← not a real script; never do this
> ```

## North star

Read the finished doc aloud. If the gaming references feel like a confident
wink between professionals, they are calibrated. If they feel like a teenager
wrote the docs, cut them back until only the best one or two remain.
