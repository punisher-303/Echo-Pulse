## [4.5.5] - 2025-08-18

### Changed
- **Playlist Songs**: The imported playlist songs listed by date modified like Latest added song on first and old one is last.
- **Contact Info**: Email to contact is added and fixed.

### Fixed
- Playlist Sorting.
- Contact info fixed.
- Updated By Anand PM.


## [4.5.4] - 2025-08-17

### Added
- **Windows Media Controls**: Implemented native media controls for Windows for a better desktop experience with `audio_service_win`.
- **Search in Downloads**: Added search functionality to the offline/downloads screen.
- **Changelog**: Added `CHANGELOG.md` for release notes and version history.
- **Changelog viewer**: In-app viewer that shows "what's new" after updates so users see release notes on first run after an update.
- **Global event notifier**: New global event cubit used for app-wide notifications and to drive the updated updater popup logic.
 - **Android: Backup sharing**: Added Android-specific sharing for backup JSON files so users can easily export/share backups from the app.

### Changed
- **Downloader Overhaul**: The download manager has been completely rewritten from the ground up, removing the `flutter_downloader` dependency. This new implementation enables downloads on desktop platforms and shows live progress on the downloads screen.
- **Backup & Restore Rework**: The backup and restore functionality has been completely rewritten to use a more reliable JSON format.
- **UI/UX Enhancements**:
    - Updated the app logo and various icons.
    - Improved themes and color schemes.
    - Redesigned and updated the "About" page to include the build number and small layout/text refinements.
    - Enhanced the Android notification thumbnail to a medium quality for better visuals.
- **Library Management**: Implemented a playlist watcher to keep the library in sync.
- **Player Modularization**: Refactored the core audio player code for better state management and maintainability.
- **Dependencies**: Upgraded Flutter, `flutter_bloc`, and the Android Gradle Plugin to their latest versions.
- **App updater**: Updated popup logic to use the new global event cubit and applied several updater fixes.
- **CI / Workflow**: Automatic version reading from `package.json` is enabled; Linux build number offset adjusted (+121) to align with Windows/Android.
- **Deploy script**: The deploy script now copies the changelog into the GitHub Pages build directory before force-pushes.
- **Docs & README**: Small README and documentation updates.
 - **Global footer animation**: Page animation in the global footer changed to a soft zoom-in transition for smoother navigation.
 - **YouTube service improvements**: Enhanced the YouTube service/provider for better reliability and performance (provider enhancements and multiple bug fixes).

### Fixed
- Resolved a bug with the 'like' button on album views.
- Fixed an issue preventing clicks on media items in the "Recently Played" section.
- Addressed loading problems on YouTube Music artist pages.
- Corrected the app updater logic and fixed a SourceForge header issue affecting Android updater requests.
- Fixed various UI bugs, including carousel alignment and button states.
 - Fixed play/pause not responding on first-time button press.
 - Fixed several UI issues: contrast adjustments, gradient box rendering, button state fixes, and small About-page fixes including back-pop navigation behavior.
 - Corrected Liberapay naming.

### Removed
- Removed the `flutter_downloader` package.
- Removed the `yt_streams` script.

## [4.5.3] - 2025-05-05

### Changed
- Refactored import/export functionality.
- General code cleanups and optimizations.

### Fixed
- Resolved issues with YouTube streaming.
- Addressed bugs related to YouTube playlists.