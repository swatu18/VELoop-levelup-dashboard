# VELoop Rewards — Gamified Level-Up Progression Platform (Task 16 Redesign)

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![CSS Modules](https://img.shields.io/badge/Styling-CSS%20Modules-1572B6?logo=css3)](https://github.com/css-modules/css-modules)
[![Web Audio API](https://img.shields.io/badge/Audio-Synthesized%20Web%20Audio-F59E0B)](#)
[![Responsive](https://img.shields.io/badge/Mobile-60FPS%20Touch%20Ready-10B981)](#)

> **Official Project Links:**
> - 🌐 **Live Vercel Deployment:** [https://ve-loop-levelup-dashboard.vercel.app](https://ve-loop-levelup-dashboard.vercel.app)
> - 📂 **GitHub Repository:** [https://github.com/swatu18/VELoop-levelup-dashboard](https://github.com/swatu18/VELoop-levelup-dashboard)

---

## 📌 Project Overview

**VELoop Rewards** is a gamified level-progression platform and rewards economy engineered for high user engagement and retention. Built with **React 19**, **Vite**, **HTML5 Canvas**, and **Web Audio API**, the application delivers a console-grade gaming experience combined with the sleek clarity of a modern fintech dashboard.

This redesign specifically addresses and fulfills all **10 Required Improvements** provided by the Team Lead for **Task 16 – Complete Level-Up Dashboard Redesign**.

---

## 🎯 Verification Matrix: Team Lead Requirements

| # | Requirement | Implementation Status & Details |
|---|---|---|
| **1** | **Overall UI** | Dark-themed luxury dashboard (`#0E101D`, `#161827`, `#1A1D33`) matching official VELoop branding with 24K gold (`#F59E0B`), electric purple (`#A855F7`), and emerald (`#10B981`) accents. |
| **2** | **Level Journey** | Completely redesigned as a **smooth horizontal-scrolling track** with scroll-snap, desktop navigation arrows, and an automated "Jump to My Level" locator. |
| **3** | **Badge Design** | 10 completely distinctive, 3D heraldic metallic vector badges. Each tier (Bronze to Celestial Immortal) has a bespoke geometric silhouette, gemstone cut, metallic rim gradient, and light ray reflections. |
| **4** | **Level Cards** | High-contrast layouts with crisp typography, XP requirement chips (`6,000 – 8,000 XP`), reward badges, perk previews, and interactive "Inspect Perks" modal dialogs. |
| **5** | **Level Progression** | Clear state hierarchy across all 10 tiers: `✓ COMPLETED` (emerald badge), `★ YOU ARE HERE` (pulsing gold beacon ring), `🎯 NEXT GOAL` (cyan target), and `🔒 LOCKED` (frosted glass). |
| **6** | **Progress Bar** | Liquid amber progress bar with continuous shimmer sweep animation displaying `6,420 XP / 8,000 XP`, `80% Progress`, and `1,580 XP Remaining to Level 6`. |
| **7** | **Level Game** | 60 FPS HTML5 Canvas arcade mini-game with falling XP orbs, gold V-Coins, and emerald gems, multi-touch/mouse/keyboard basket controls, combo multipliers, sound effects, and direct reward deposits (+30 XP, +12 VEs). |
| **8** | **Animations** | Smooth transitions, card hover lifts (`translateY(-8px)`), confetti particle celebrations (`canvas-confetti`), pulsing beacon rings, and tactile audio feedback. |
| **9** | **Task Assets** | 3D Mystery Chest with purple glowing crystals, Today's Boost icons (5-Day Streak, Survey Bonus, 2x XP Weekend), Lucky Spin Wheel, and all 6 Earn More XP quests. |
| **10** | **Responsiveness** | Fully responsive across mobile (320px+), tablet (768px+), and desktop (1440px+ widescreen) with fluid touch scrolling and sticky quick-access navigation. |

---

## ✨ Core Modules & Architecture

### 1. 🏆 10-Tier Heraldic Metallic Badge System
- **10 Unique Custom-Engineered SVG Plaques**: Precision-beveled rims, chamfered metallic reflections, and corner rivets representing tiers from *Bronze Scout* to *Celestial Immortal*.
- **Balanced Gaming Aesthetics**: Clean executive metallic finishes (Bronze, Titanium Silver, 24K Gold, Cyber Platinum, Celestial Diamond, Royal Amethyst Sovereign, Sapphire, and Emerald Dragonscale).
- **Interactive Badge Inspection**: Click any level card to view its high-resolution 3D badge rendering, unlock lore, required XP, and unlocked perks.

### 2. 🎡 Daily Lucky Spin Wheel
- **Physics-Based Deceleration**: 8-slice SVG reward wheel with synchronized ticker audio that slows down realistically as the wheel comes to a stop.
- **Victory Fanfare & Confetti**: Plays synthesized golden fanfare chords and multi-burst confetti upon winning.
- **Daily Spin Limits & VIP Pass**: 3 daily spins with a dedicated Pro Upgrade warning modal and one-tap return to dashboard.

### 3. 🎁 3D Mystery Box & Vault Rewards
- **Cinematic Unboxing Sequence**: 3-stage animated reveal (Idle ➔ Low-frequency suspense rumble & shake ➔ Golden burst).
- **Interactive Multi-Reward Claims**: Tactile individual claim actions (*"Collect +500 VEs"*, *"Collect +25 Gems"*, *"Activate 1.5x Multiplier"*, *"Claim All"*).

### 4. 🎮 XP Catcher Arcade Mini-Game
- **60 FPS Physics Engine**: Interactive falling purple XP orbs, golden V-Coins, and emerald gems with real-time collision detection.
- **Multi-Input Controls**: Mouse tracking, keyboard arrow keys, and touch swipe gestures on iOS and Android.
- **Combo System & Dynamic Multipliers**: Catch items without dropping to chain combo multipliers up to 3.0x frenzy mode.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite 6
- **Routing:** React Router v7 (`/`, `/Lvl-Dashboard`, `/lvl-dashboard`, `/dashboard`)
- **Styling:** CSS Modules (`.module.css`) + Bootstrap 5 grid utility baseline
- **Audio Engine:** HTML5 Web Audio API (real-time procedural frequency synthesizer)
- **Effects & Particles:** Canvas Confetti + Custom Canvas 60 FPS Engine
- **Icons:** Lucide React

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/swatu18/VELoop-levelup-dashboard.git
cd VELoop-levelup-dashboard

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run production build
npm run build

# Run linter
npm run lint
```

---

## 📄 License

MIT © 2026 VELoop Rewards Dashboard Team
