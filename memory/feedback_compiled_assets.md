---
name: feedback-compiled-assets
description: Never edit compiled/built output files directly; always edit source files and let the build process regenerate them
metadata:
  type: feedback
---

Never edit compiled output files (e.g. `index.js`, `index.css` at the plugin root) directly. Always edit the source files in `src/` and let `npm run build` regenerate the compiled output.

**Why:** The user explicitly rejected a direct edit to the compiled `index.js`, stating "you need to update the js src file not the built one. dont touch this."

**How to apply:** When a name, string, or value needs changing across the plugin, only touch `src/index.js` and `src/index.css`. Remind the user to run `npm run build` to pick up the change in the compiled output.
