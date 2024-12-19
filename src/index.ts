import { Platform } from 'react-native';

const getConsolePrefix = (): string => {
    switch (Platform.OS) {
        case 'android':
            return '\x1b[32m[and]\x1b[0m';
        case 'ios':
            return '\x1b[35m[ios]\x1b[0m';
        case 'web':
            return '\x1b[33m[web]\x1b[0m';
        case 'windows':
            return '\x1b[33m[win]\x1b[0m';
        case 'macos':
            return '\x1b[33m[mac]\x1b[0m';
        default:
            return '';
    }
};

const wrapConsoleMethod = (
    originalMethod: (...args: any[]) => void
): ((...args: any[]) => void) => {
    return function(this: any, ...args: any[]) {
        const prefix = getConsolePrefix();
        const newArgs = args[0] !== prefix ? [prefix, ...args] : args;
        return originalMethod.apply(this, newArgs);
    };
};

export const initializeConsolePlatform = (): void => {
    const methods: (keyof Console)[] = ['log', 'info', 'warn', 'error'];

    methods.forEach((method) => {
        const original = console[method];
        // @ts-ignore
        console[method] = wrapConsoleMethod(original);
    });
};

export default initializeConsolePlatform;
