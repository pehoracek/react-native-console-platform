# react-native-console-platform

A lightweight utility for React Native that adds platform-specific prefixes to console output, making it easier to identify which platform your logs are coming from during development.

## Features

- Automatically adds colored platform prefixes ([ios], [and], [web], etc.) to console output
- Supports all major console methods (log, info, warn, error)
- Fully configurable prefixes and colors
- TypeScript support
- Minimal overhead
- Easy to enable/disable

## Installation

```bash
npm install react-native-console-platform
# or
yarn add react-native-console-platform
```

## Usage

### Basic Usage

```javascript
import ConsolePlatform from 'react-native-console-platform';

// Initialize at app startup
ConsolePlatform.init();

// Your existing console calls will now include platform prefixes
console.log('Hello World'); // Output: [ios] Hello World (on iOS)
console.info('Info message'); // Output: [and] Info message (on Android)
console.warn('Warning'); // Output: [web] Warning (on web)
console.error('Error'); // Output: [mac] Error (on macOS)
```

### Configuration

You can customize the behavior using the `configure` method:

```javascript
ConsolePlatform.configure({
  enabled: true, // Enable/disable the platform prefixes
  customPrefixes: {
    android: '\x1b[32m[Android]\x1b[0m',
    ios: '\x1b[35m[iOS]\x1b[0m',
    web: '\x1b[33m[Web]\x1b[0m',
    windows: '\x1b[33m[Windows]\x1b[0m',
    macos: '\x1b[33m[MacOS]\x1b[0m',
  },
});
```

## API

### ConsolePlatform.init()

Initializes the console platform prefixes by wrapping the native console methods.

### ConsolePlatform.configure(config)

Configures the behavior of the console platform prefixes.

#### Config Options

- `enabled` (boolean): Enable or disable the platform prefixes
- `customPrefixes` (object): Custom prefix strings for each platform
    - `android` (string): Custom prefix for Android
    - `ios` (string): Custom prefix for iOS
    - `web` (string): Custom prefix for Web
    - `windows` (string): Custom prefix for Windows
    - `macos` (string): Custom prefix for MacOS

## License

MIT
