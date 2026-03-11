# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Calendar Versioning](https://calver.org/) (CalVer).

## 2026-03-11 Morning

### Added
- `.junie/junie-tips.md` with JetBrains IDE workflow tips (`f156e8c`) - improves developer productivity with IDE-specific guidance for verification and monitoring.

### Changed
- Modernized `HeaderComponent` and `ButtonComponent` to use Angular signals and `ChangeDetectionStrategy.OnPush` (`acdf550`) - improves performance with fine-grained reactivity.
- Updated Angular configurations (`f156e8c`) - optimizes build and development settings.

### Added
- Six color variants support in `ButtonComponent` (primary, secondary, success, warning, danger, neutral) and corresponding stories.

### Changed
- `ButtonComponent` styles refactored to use `class-variance-authority` (cva) – gold standard for Tailwind variant management, improving DX and Storybook docs readability.

### Fixed
- Figma design links in all `Button` stories (`src/stories/button.stories.ts`).

## 2026-03-10 Evening

### Added
- Custom theme with Figma colors and app variables in Tailwind CSS (`21bb11e`) - implements brand-consistent design system.
- `technology.md` as a source of truth for the project tech stack (`21bb11e`) - documents architectural decisions and dependencies.
- `.junie` configuration files and MCP server setup (`4dea3c8`) - streamlines AI-assisted development with context-aware tooling.

### Changed
- Refactored `ButtonComponent` for cleaner API and Tailwind integration (`21bb11e`) - simplifies component usage with improved prop interface.

## 2026-03-10 Afternoon

### Added
- Angular project setup with initial configuration and structure (`79868d0`) - establishes foundation for scalable web application.
- Initial documentation file for components and interfaces (`c2a4ab7`) - provides reference for component APIs and data structures.
- Storybook MCP addon with dev and docs toolsets (`60b5d1c`) - enables interactive component development and documentation workflow.
