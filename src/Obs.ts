import OBSWebSocket from 'obs-websocket-js';
import { ObsScene } from '../../client/src/models/ObsScene';
import { log } from './Log';
import { RoundType } from '../../client/src/models/RoundType';

const obs = new OBSWebSocket();

export function openOBSConnection() {
    obs.connect({ address: 'localhost:4444' })
        .then(() => log.debug('Connected to OBS'))
        .catch((error: any) => log.error('Couldn\'t connect to OBS', error))
}

export function setOBSScene(roundType: RoundType) {
    let scene = ObsScene.Blank;
    switch (roundType) {
        case RoundType.TextRound:
            scene = ObsScene.TextRound
            break;
        case RoundType.MediaRound:
            scene = ObsScene.MediaRound;
            break;
    }
    log.debug('setting OBS scene to', scene);
    obs.send('SetCurrentScene', {
        'scene-name': scene
    }).catch((error: any) => log.error('Couldn\'t send update to OBS'))

}
