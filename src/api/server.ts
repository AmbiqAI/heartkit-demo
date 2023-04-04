import axios from "axios";
import * as Constants from '../constants';
import { IHeartKitState } from "../models/root";

const server = axios.create({
    baseURL: Constants.DEVICE_API_URL,
    timeout: 30000
});

class ServerAPI {
    public getDataId = async (): Promise<number|undefined> => {
        try {
            // return Math.round(100*Math.random());
            const {data: value} = await server.get('data_id');
            return value as number;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public getState = async (): Promise<IHeartKitState|undefined> => {
        try {
            const {data: state} = await server.get('state');
            return state as IHeartKitState;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public getAppState = async (): Promise<string|undefined> => {
        try {
            const {data: app_state} = await server.get('app/state');
            return app_state as string;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}

const api = new ServerAPI();

export default api;

export const createServer = () => new ServerAPI();
