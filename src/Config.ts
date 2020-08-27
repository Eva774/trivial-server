import fs from 'fs';
import { log } from './Log';

type ConfigFile = {
    port: number,
    staticAssets: string,
    staticClient: string,
    episode: number,
    presenterName: string,
    presenterCamera: string,
    juryName: string,
    juryCamera: string,
    grandFinaleMode: boolean,
}

function eqSet(a: Set<any>, b: Set<any>) {
    if (a.size !== b.size)
        return false;
    let aa = Array.from(a);
    let bb = Array.from(b);
    return aa.filter(function (i) { return bb.indexOf(i) < 0 }).length == 0;
}

class Config {

    public config: ConfigFile

    constructor() {
        this.config = JSON.parse(fs.readFileSync('./config.json').toString()) as ConfigFile;
        const keys = new Set(['port', 'staticAssets', 'staticClient', 'episode', 'presenterName', 'presenterCamera', 'juryName', 'juryCamera', 'grandFinaleMode']);
        if (!eqSet(keys, new Set(Object.keys(this.config)))) {
            throw new Error('Settings file incomplete, the following settings must be set in config.json: ' + Array.from(keys).join(', '))
        }
        const type = this.config.grandFinaleMode ? 'LOWEST' : 'HIGHEST';
        log.info(`Current mode: removing player with ${type} time`);
    }
}

export const config = (new Config()).config;
