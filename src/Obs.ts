import OBSWebSocket from 'obs-websocket-js';
import { ObsScene } from '../../client/src/models/ObsScene';
import { log } from './Log';

const obs = new OBSWebSocket();

export function openOBSConnection() {
    obs.connect({ address: 'localhost:4444' })
        .then(() => log.debug('Connected to OBS'))
        .catch(error => log.error('Couldn\'t connect to OBS', error))
}

export function setOBSScene(scene: ObsScene) {
    log.debug('setting OBS scene to', scene)
    obs.send('SetCurrentScene', {
        'scene-name': scene
    }).catch(error => log.error('Couldn\'t send update to OBS'))

}
