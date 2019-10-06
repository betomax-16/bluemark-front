export class Promotion {
    constructor(
        name?: string,
        namePromotion?: string,
        description?: string,
        idCompany?: string,
        validity?: Date,
        couponIssuance?: number,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) {}
}
