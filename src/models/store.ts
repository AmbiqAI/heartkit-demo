import React from "react";
import { unprotect } from "mobx-state-tree";
import { IRoot, Root } from "./root";

const root = Root.create({
    state: {
        dataId: 0,
        appState: 'IDLE',
        data: [],
        segMask: [],
        results: {
            heartRate: 0,
            heartRhythm: 0,
            numNormBeats: 0,
            numPacBeats: 0,
            numPvcBeats: 0,
            arrhythmia: false
        }
    }
});

const store = {
    root
};

unprotect(root);

export const StoreContext = React.createContext(store);
export const useStore = () => React.useContext(StoreContext);
export default store;

export type IStore = {
    root: IRoot
};
