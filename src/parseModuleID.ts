import { log } from './log';

/**
 * @summary Separate a RequireJS module ID from associated plugin
 */
export function parseModuleID(request: string) {
    const parts = request.split('!');
    if (parts.length === 1) {
        return { id: parts[0], plugin: '' };
    }

    const [plugin, id, ...others] = parts;

    if (plugin === 'text') {
        if (others.length) {
            log.warn(
                `Too many values passed to "text" plugin for request "${request}"`,
            );
        }
        return { id, plugin: 'text' };
    }

    if (plugin === 'domReady') {
        if (others.length) {
            log.warn(
                `Too many values passed to "domReady" plugin for request "${request}"`,
            );
        }
        return { id, plugin: 'domReady' };
    }

    log.warn(
        `Unrecognized plugin "${plugin}" for request "${request}". This file will be skipped`,
    );

    return { id: '', plugin: '' };
}
