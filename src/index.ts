import { Platform } from "react-native";

interface ConsolePlatformConfig {
  enabled?: boolean;
  customPrefixes?: {
    android?: string;
    ios?: string;
    web?: string;
    windows?: string;
    macos?: string;
  };
}

export class ConsolePlatform {
  private static enabled: boolean = true;
  private static customPrefixes: Record<string, string> = {};

  static configure(config: ConsolePlatformConfig = {}) {
    if (typeof config.enabled === "boolean") {
      this.enabled = config.enabled;
    }
    if (config.customPrefixes) {
      this.customPrefixes = { ...config.customPrefixes };
    }
  }

  private static getConsolePrefix(): string {
    if (!this.enabled) return "";

    const platform = Platform.OS;
    if (this.customPrefixes[platform]) {
      return this.customPrefixes[platform];
    }

    switch (platform) {
      case "android":
        return "\x1b[32m[and]\x1b[0m";
      case "ios":
        return "\x1b[35m[ios]\x1b[0m";
      case "web":
        return "\x1b[33m[web]\x1b[0m";
      case "windows":
        return "\x1b[33m[win]\x1b[0m";
      case "macos":
        return "\x1b[33m[mac]\x1b[0m";
      default:
        return "";
    }
  }

  private static wrapConsoleMethod(
    originalMethod: (...args: any[]) => void,
  ): (...args: any[]) => void {
    return function (this: any, ...args: any[]) {
      if (!ConsolePlatform.enabled) {
        return originalMethod.apply(this, args);
      }

      const prefix = ConsolePlatform.getConsolePrefix();
      const newArgs = args[0] !== prefix ? [prefix, ...args] : args;
      return originalMethod.apply(this, newArgs);
    };
  }

  static init(): void {
    // Only run in development environment
    if (__DEV__) {
      const methods: (keyof Console)[] = ["log", "info", "warn", "error"];

      methods.forEach((method) => {
        const original = console[method];
        // @ts-ignore
        console[method] = this.wrapConsoleMethod(original);
      });
    }
  }
}

// Export default instance
export default ConsolePlatform;
