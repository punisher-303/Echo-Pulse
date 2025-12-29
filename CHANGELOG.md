## [4.6.9] - 2025-12-29

### Added
- **Canva Video**: A background video will play exact like spotify.
- **Video Behavior**: The video plays "in the background" of the player screen, behind all the buttons and text, just like on Spotify.
- **When App is Closed/Minimized**: he video will pause to save battery and data. Only the music audio will continue playing in the background. This is the standard behavior for music apps.

## [4.6.8] - 2025-12-22

### Added
- **Room Lock**: Room session can lock and unlock for privacy anyone can lock and unlock the room.
- **Hoster name**: Display the hoster name in room menu.
- **Emoji Picker**: You can pic emojis from chat bar like conversation apps.
- **Unique colour**: Each person get unique colour in chat box.
- **IOS Blur**: IOS Blur style applied in popup menu.

### Fixed
- **Sync logic change**: live sync will accurate and responsible.
- **Status check**: Current status check every 4 second is the music play or pause or seeked and update every 4 sec help to sync live.

## [4.6.7] - 2025-12-20

### Added
- **Live Room**: Room session added for listen music together and enjoy with your friends.
- **Live Chat**: Each room have each chat room you can chat with friends (room members only).

### Fixed
- **Live sync**: live sync added for low latency.
- **Power right**: Room creator and listeners have same power for control the music.


## [4.6.6] - 2025-12-08

### Added
- **Lyrics System**: Improve Lyrics system.

### Changed
- **YouTube Explode Update**: YouTube source update to 3.0.5.

### Fixed
- **Lyrics Accuracy**: 80% to 95% increases.
- **Lyrics Timing**: Lyrics matching timing accuracy increases.

## [4.6.5] - 2025-12-07

### Added
- **Lyrics new Algorithm**: Lyrics fetching improving.

### Fixed
- **Jio saavn Removed**: Jio Saavn source removed for copyright issue.
- **New Source Added**: You Know what i did ;/.

## [4.6.4] - 2025-12-07

### Added
- **Shortcut Pressed Indicator for Desktop**: Added visual indicator for pressed keyboard shortcuts on desktop platforms.
- **New Flavor Dev[Android]**: Introduced a new development flavor for Android builds.

### Fixed
- **What's New Font Family**: Fixed font family issues in the "What's New" section.
- **Keyboard Shortcut**: Resolved issues with keyboard shortcuts functionality.
- **Add to Playlist**: Fixed bugs in the add to playlist feature.
- **Player Disposer Problem**: Addressed player disposer issues on Realme, Oppo, and similar devices.

## [4.6.3] - 2025-12-07

### Added
- **Library Item Search Box**: Added search functionality for library items to improve navigation and discovery.
- **New Search in Playlist Database Function**: Implemented enhanced search capabilities within playlist databases.
- **DNS Checker**: Added DNS connectivity checking feature for better network diagnostics.
- **Touch Device Support**: Improved support for touch-based interactions across the application.
- **Redesigned Up Next Panel**: Completely redesigned the "Up Next" panel with modern UI elements.
- **Full Screen Lyrics Viewer**: Introduced a new full-screen lyrics viewing mode with enhanced display options.
- **Auto Scroll in Queue**: Automatic scroll to every song changed in the queue.

### Changed
- **New Progress Bar for Player**: Implemented a new progress bar design for the media player.
- **Up Next Panel and Song Tile Improvements**: Enhanced the "Up Next" panel and song tiles for better usability and appearance.
- **Ambient Background Enhancement**: Improved ambient background effects throughout the application.
- **Song Info UI Updates**: Updated the song information display interface for better readability.
- **Add to Playlist UI**: Redesigned the "Add to Playlist" feature with circular stacked avatars and improved layout.
- **Player Enhancements**: Various improvements to the media player functionality and user experience.
- **Custom Animated List**: Implemented custom animated lists for smoother UI transitions.
- **Subtitle Override in Song Model**: Added ability to override subtitles in song metadata.
- **Fullscreen Up Next Panel**: Made the fullscreen "Up Next" panel translucent for better visual integration.
- **Lyric Widget Enhancements**: Improved colors and icons in the lyrics widget.
- **Player UI Optimizations**: Optimized player interface for better performance and usability.
- **Gradient Adjustments**: Fine-tuned gradient effects in the player interface.
- **Media Kit Integration**: Switched to MediaKit for Android platform for improved media handling.

### Fixed
- **Font Fixes**: Resolved font rendering issues across the application.
- **Mini Player Fixes**: Fixed bleed and progress bar issues in the mini player.
- **Warning Fixes**: Addressed various deprecation warnings, including `.withOpacity` usage.
- **Full Screen Lyric View**: Corrected display issues in full-screen lyrics mode.
- **Auto Wake Controls**: Fixed auto-scroll behavior in wake controls.
- **Up Next Panel**: Resolved various issues with the "Up Next" panel functionality.
- **Desktop Handle Fix**: Fixed panel handle behavior on desktop platforms.
- **Player Reconfiguration**: Corrected player reconfiguration issues on Android.
- **JSON File Opening**: Partially addressed issues with JSON file handling (ongoing).

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