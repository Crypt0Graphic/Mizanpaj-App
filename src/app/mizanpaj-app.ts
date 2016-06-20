export class MizanpajApp {

    public Clips: Array<Clip>;

    constructor() {
        this.Clips = new Array<Clip>();
    }

}

class Clip {

    public id: number;
    public name: string;
}

