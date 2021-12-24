import axios from 'axios';

export function api(url: string): any {
    return axios.get(url).then(x => x.data);
}

export const delay = ms => new Promise(res => setTimeout(res, ms));

