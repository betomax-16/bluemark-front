export class Company {
    constructor(
        public name?: string,
        public address?: string,
        public phone?: string,
        public cp?: string,
        public type?: string,
        public rol?: string,
        public imageUrl?: string,
        public password?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public email?: string
    ) {}
}
