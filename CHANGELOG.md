## [4.6.2] - 2025-11-4

### Changed
- **Bug Fixed**: Some Bugs fixed.
- **Download fix**: Download fix.

### Fixed
- **Isar Version Compatibility**: Fixed Isar database version compatibility issues.
- **Code Reverts**: Reverted problematic code changes to maintain stability.

## [4.6.1] - 2025-10-25

### Changed
- **Flutter Version Upgrade**: Updated Flutter version to 3.35.4 with CI/CD pipeline improvements.
- **Package Upgrades**: Updated various dependencies and packages for better performance and security.
- **Connectivity Improvements**: Enhanced connectivity handling after package upgrades.
- **YouTube Shared Music**: Added support for playing YouTube shared music links.
- **Audio Source Optimization**: Removed concatenating audio source usage for improved performance.
- **Network Failure Handling**: Added maximum limit of 10 retries before shifting to next song on network failures.
- **Track Recovery**: Improved track recovery when lost during network interruptions.
- **About Page Refactor**: Refactored the about section for better maintainability.
- **Color Analyzer**: Added new color analyzer functionality from URLs.
- **Chart Widget Fixes**: Fixed image display issues in chart widgets.
- **Billboard Image Fixes**: Resolved image loading issues in Billboard charts.

### Fixed
- **Isar Version Compatibility**: Fixed Isar database version compatibility issues.
- **Code Reverts**: Reverted problematic code changes to maintain stability.

## [4.6.0] - 2025-09-29

### Added
- **Bulk Download Feature**: Added the ability to select and download multiple songs from playlists at once.
- **Enhanced Queue Management**: Added `showPlayNext` and `showAddtoQueue` boolean controls for better UI customization.
- **Song Options in Up Next Panel**: Added song options menu in the "Up Next" panel for better track management.
- **Recently Played Tracking**: Implemented recently played tracking with configurable thresholds (40% playback or 15 seconds).
- **Trendshift Badge**: Added Trendshift badge to the project.

### Changed
- **Audio Service Updates**: Updated audio service configuration and handling.
- **Bulk Download UI Enhancements**: Improved the bulk download progress dialog and user experience.
- **Queue Title Broadcasting**: Fixed queue title override to properly broadcast updated queue titles.
- **Button Renaming**: Changed "Play Now" button to "Play with Mix" for clarity.
- **Player Error Handling**: Enhanced error handling for network-related playback issues.
- **Snackbar Improvements**: Enhanced snackbar notifications throughout the app.
- **Volume Control**: Fixed volume sliding on cover art for manual control.
- **YouTube Download Fix**: Temporary fix for YouTube downloading (requires future maintenance for youtube_explode_dart).
- **Restore Warning**: Clarified warning messages for restore operations.
- **Code Cleanup**: General code cleanup and optimizations.
- **Documentation Updates**: Updated README, GitHub Pages, and fastlane changelog.
- **Workflow Improvements**: Enhanced GitHub Actions workflows for better CI/CD.
- **Funding Information**: Updated funding URLs and configuration.

### Fixed
- **Bulk Download Snackbars**: Fixed snackbar notifications to show only one message for bulk downloads instead of individual messages per song.
- Updated By Anand PM.


## [4.5.9] - 2025-09-26

### Changed
- **Downloding isssue**: Music download issue fixed.

### Fixed
- Music download issue , error URL link issue fixed ).
- Updated By Anand PM.

## [4.5.8] - 2025-09-20

### Changed
- **Bulck Download Added**: Added You can download more song at a time.
- **showPlayNext**: implt. showPlayNext btn bools for disabling them sometimes.
- **showAddtoQueue**: implt. showAddtoQueue btn bools for disabling them sometimes.
- **Discord Rich Presence**: Discord Rich Presence music timeline left update.

### Fixed
- QueueTitle override fix to broadcast the updated queue title.
- Show song options in upnext panel.
- Volume sliding on cover fix for manual control.
- Discord Rich Presence music timeline left update. 
- Updated By Anand PM.

## [4.5.7] - 2025-09-20

### Changed
- **Bulck Download Added**: Added You can download more song at a time.
- **showPlayNext**: implt. showPlayNext btn bools for disabling them sometimes.
- **showAddtoQueue**: implt. showAddtoQueue btn bools for disabling them sometimes.

### Fixed
- QueueTitle override fix to broadcast the updated queue title.
- Show song options in upnext panel.
- Volume sliding on cover fix for manual control.
- Updated By Anand PM.

## [4.5.6] - 2025-08-21

### Changed
- **Discord RichPresence**: Added Discord RichPresence & Updated Some designs.
- **Windows Notification Controll**: Added Windows Notification Wedgets Controll Systems.

### Fixed
- Minor Bugs.
- Realtime Wedgets.
- Updated By Anand PM.

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