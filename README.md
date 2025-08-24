# Gun Game

An exhilarating browser-based gun game where players control a gun to shoot moving targets while tracking their score.

## Game Features

### Core Mechanics
- **Gun Movement**: Use left/right arrow keys to move the gun within canvas bounds
- **Shooting**: Press spacebar to shoot bullets with sound effects
- **Moving Target**: Monster target bounces across the canvas
- **Dynamic Speed**: Target speed increases when score exceeds 50
- **Scoring System**: 
  - +5 points for hitting the target
  - -2 points for missed bullets
  - Game ends after 3 consecutive misses

### Game Controls
- **Arrow Keys (←/→)**: Move gun left/right
- **Spacebar**: Shoot bullets
- **Enter Key**: Start game (alternative to button)
- **Start Game Button**: Click to begin

### Visual & Audio
- Sound effects for bullet firing and game over
- Canvas turns red when game ends
- Score tracking with local storage for high scores
- Responsive design with gradient background

## How to Play

1. Open `index.html` in a web browser
2. Click "Start Game" button or press Enter
3. Use arrow keys to move the gun
4. Press spacebar to shoot at the moving monster
5. Avoid missing 3 shots in a row
6. Try to beat your high score!

## File Structure

- `index.html` - Main game interface
- `script.js` - Game logic and mechanics
- `styles.css` - Visual styling
- `bulletFire.mp3` - Shooting sound effect
- `gameOver.wav` - Game over sound effect
- `gunimage.png` - Gun sprite
- `bulletimage.png` - Bullet sprite
- `monsterimage.png` - Target monster sprite

## Technical Implementation

### Game Objects
- **Gun**: Controllable player object with movement constraints
- **Bullets**: Array of projectiles with collision detection
- **Target**: Moving monster with bounce physics
- **Score System**: Real-time scoring with persistent high score storage

### Game States
- `notStarted`: Initial state, waiting for player input
- `ongoing`: Active gameplay with all mechanics enabled
- `ended`: Game over state with visual/audio feedback

### Performance Features
- Efficient collision detection using distance calculation
- Optimized rendering with requestAnimationFrame
- Image fallbacks for assets that fail to load
- Memory management for bullet cleanup

## Browser Compatibility

Compatible with all modern browsers supporting HTML5 Canvas and Web Audio API.
