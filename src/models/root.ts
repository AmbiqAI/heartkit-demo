import { flow, Instance, types } from 'mobx-state-tree';
import api from '../api/server';

const HeartKitResult = types
.model('HeartKitResult', {
    heartRate: types.number,
    heartRhythm: types.number,
    numNormBeats: types.number,
    numPacBeats: types.number,
    numPvcBeats: types.number,
    arrhythmia: types.boolean,
})
.views(self => ({
    get numBeats() {
        return self.numNormBeats+self.numPacBeats+self.numPvcBeats
    },
    get rhythmName() {
        const rhythms = ['Normal', 'Tachycardia', 'Bradycardia'];
        return self.arrhythmia ? 'Arrhythmia' : self.heartRate <=0 ? '--' : rhythms[self.heartRhythm] ?? '--';
    }
}))

const HeartKitState = types
.model('HeartKitState', {
    dataId: types.number,
    appState: types.string,
    data: types.array(types.number),
    segMask: types.array(types.number),
    results: HeartKitResult
})
.views(self => ({
    get beatIdxs() {
        const idxs = [];
        for(let i = 0; i < self.segMask.length; i++) {
            if ((self.segMask[i] >> 4) !== 0) { idxs.push(i); }
        }
        return idxs;
    },

}))
.views(self => ({
    get pacBeatIdxs() {
        const idxs = [];
        for (const beatIdx of self.beatIdxs) {
            if ((self.segMask[beatIdx] >> 4) === 2) { idxs.push(beatIdx); }
        }
        return idxs;
    },
    get pvcBeatIdxs() {
        const idxs = [];
        for (const beatIdx of self.beatIdxs) {
            if ((self.segMask[beatIdx] >> 4) === 3) { idxs.push(beatIdx); }
        }
        return idxs;
    },
}))
export interface IHeartKitResult extends Instance<typeof HeartKitResult> {}
export interface IHeartKitState extends Instance<typeof HeartKitState> {}


export const Root = types
.model('Root', {
    state: HeartKitState
})
.actions(self => ({
    fetchDataId: flow(function*() {
        const value = yield api.getDataId();
        if (value !== self.state.dataId) {
            self.state.dataId = value;
            return true;
        }
        return false;
    }),
    fetchState: flow(function* () {
        const state = yield api.getState();
        if (state !== undefined) {
            self.state = state;
        }
    }),
}))
.actions(self => ({
    backgroundRoutine: flow(function*() {
        const dataId = yield api.getDataId();
        const appState = yield api.getAppState();
        if (appState !== undefined) {
            self.state.appState = appState;
        }
        if (dataId === undefined) { return; }
        if (dataId !== self.state.dataId) {
            const state = yield self.fetchState();
            if (state === undefined) { return; }
            self.state = state;
            // console.log('Background done.');
        }
    })
}))
.actions(self => ({
    afterCreate() {
        setInterval(self.backgroundRoutine, 2000);
    },
    beforeDestroy() {

    }
}))

export interface IRoot extends Instance<typeof Root> {}
