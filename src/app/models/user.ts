export class User {
    constructor(
        public name?: string,
        public firstLastName?: string,
        public secondLastName?: string,
        public birthdate?: Date,
        public email?: string,
        public rol?: string,
        public sex?: string,
        public imageUrl?: string,
        public password?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) {}
}
