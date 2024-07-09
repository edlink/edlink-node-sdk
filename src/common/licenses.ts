import { License, BearerTokenAPI, RequestOptionsPaging } from '../types';

export class Licenses {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Lists all licenses.
     * @param options provide a `limit` for the max number of results
     */
    async *list(options: RequestOptionsPaging = {}): AsyncGenerator<License> {
        yield* this.api.paginate<License>('/licenses', options);
    }
}
