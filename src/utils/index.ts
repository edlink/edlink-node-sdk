export function deepDefaults<T extends Record<string, any>>(target: T, defaults: Partial<T>): T {
    for (const key in defaults) {
        if ((target[key] === undefined || target[key] === null) && (defaults[key] !== undefined && defaults[key] !== null)) {
            target[key] = defaults[key]!;
        } else if (typeof defaults[key] === 'object' && defaults[key] !== null) {
            target[key] = deepDefaults(target[key], defaults[key]!);
        }
    }
    return target;
}