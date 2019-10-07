export class Promotion {
    constructor(
        public name?: string,
        public namePromotion?: string,
        public description?: string,
        public idCompany?: string,
        public validity?: Date,
        public couponIssuance?: number,
        public imagePromotion?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) {}
}
