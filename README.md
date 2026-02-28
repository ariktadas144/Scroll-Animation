# Scroll Animation Project

This repository contains a Next.js application showcasing a scroll-driven hero animation inspired by the reference:
https://paraschaturvedi.github.io/car-scroll-animation/

## Features

- **Scroll-bound animations** using [GSAP](https://greensock.com/gsap/) with the ScrollTrigger plugin.
- Hero section with a car graphic moving across the screen as the user scrolls.
- A dark band that reveals a green background and headline text during scroll.
- Responsive headline (`WELCOME ITZFIZZ`) that fades in letter-by-letter tied to scroll progress.
- Statistics boxes that animate in sequence (58%, 23%, 27%, 40%) with adjusted spacing and colours.
- Tailwind CSS for styling and responsive layout.
- TypeScript-based components within a Next.js 16 project.

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd "Scroll animation"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

## Project Structure

- `app/` – Next.js app directory containing `page.tsx` which renders the hero component.
- `components/` – React components including `Hero.tsx`, `AnimatedHeadline.tsx`, and `Stats.tsx`.
- `lib/` – utility hooks (e.g., `useScrollProgress.ts` not currently used).
- `public/` – static assets (e.g., `car.svg`).
- `tsconfig.json`, `package.json`, and Tailwind/ESLint configs for project setup.

## Development Notes

- GSAP animations are registered in `Hero.tsx` under a `useEffect` hook.
- Headline letters start hidden and reveal through a scroll-triggered GSAP timeline.
- Stats boxes are animated via a combined ScrollTrigger timeline for a sequential fade-in order.
- Z-index layering is used to ensure correct overlap and visibility during scroll.
- Responsive sizing uses CSS `clamp()` for fluid typography.

## Customisation

- Modify stats percentages, text, or colours directly in `Hero.tsx`.
- Adjust scroll animation timings by editing the ScrollTrigger `start`/`end` values.
- Add new sections below the hero by editing `app/page.tsx` or inserting components.

## License

This project is provided for educational/demo purposes. Use as needed.