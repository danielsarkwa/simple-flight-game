# Simple Flight Game

A small WebGL flight demo built with Three.js and vanilla JavaScript. This repository contains a lightweight, self-contained game demo showing a controllable plane, obstacles, explosion effects, and simple physics/interaction helpers.

## Features

- Simple flight controls (keyboard + optional on-screen joystick)
- Obstacles and collisions with explosion effect
- Uses included `three.*` libraries (multiple versions in `libs/`)
- Lightweight, zero-build static site (open `index.html` in a browser/server)

 ![Screenshot 2026-01-20 at 12 03 22 PM](https://github.com/user-attachments/assets/0b163c13-0a38-4bc0-aa28-62cc658b7641)

<img width="2560" height="1440" alt="Screenshot 2026-01-20 at 12 03 51 PM" src="https://github.com/user-attachments/assets/aacc268a-097e-4542-9835-addd2f5fbfb1" />

<img width="2560" height="1440" alt="Screenshot 2026-01-20 at 12 04 13 PM" src="https://github.com/user-attachments/assets/0ca5d481-3517-411f-a068-74b30f99f063" />

## Quick Start

Serve the project over a local HTTP server (recommended) and open the page in your browser.

Using Python 3 built-in server:

```bash
cd /path/to/simple-flight-game
python3 -m http.server 8000
# open http://localhost:8000 in your browser
```

Or with `http-server` (Node):

```bash
npx http-server -c-1
# open http://localhost:8080 by default
```

You can also use the Live Server / Workspace Server extensions in editors like VS Code.

## Controls

- Keyboard: use `W A S D` or the arrow keys to steer the plane (forward/left/right/down/backwards depending on build).
- Mouse: move camera/view (if enabled by the current build of the demo).
- Touch: the included `JoyStick.js` provides on-screen joystick support for mobile/touch.

Note: exact control mapping may be implemented in `Player.js` / `Game.js`; check those files to customize controls.

## Project Structure (high level)

- `index.html` — game entry page
- `Game.js` — main game loop and initialization
- `Plane.js` — plane model and behavior
- `Player.js` — player input handling and higher-level control glue
- `Obstacles.js` — obstacle generation and management
- `Explosion.js` — explosion effects
- `libs/` — bundled libraries (three.js builds, helper libs, cannon physics, utilities)
- `assets/` — HDRs, models, textures, sound effects

There are several versions of `three.module.js` in `libs/` (e.g., `three125`, `three128`, `three134`, `three137`). The demo is self-contained and references the version used by `index.html`.

## Development notes

- No build step required: the project is intended to run as static files.
- If you change module imports or swap Three.js versions, verify that the loader scripts referenced in `index.html` match the files under `libs/`.
- Sound effects are in `assets/factory/sfx/` and environment HDRs in `assets/hdr/`.

## Testing / Debugging

- Open the browser console to watch logs and warnings.
- `stats.module.js` is included for performance metrics; enable it in `index.html` if needed.

## License

This repository currently has no license file. If you want to make it open-source, consider adding a `LICENSE` such as the MIT license. Example: add a `LICENSE` file with the MIT text and update `package.json` (if you add one).

## Contributing

- Report issues or open pull requests with clear descriptions.
- For UI or UX changes, include screenshots or short screen recordings.

## Contact / Author

Author: (you) — update author/contact information here if you want to publish this repo on GitHub.
