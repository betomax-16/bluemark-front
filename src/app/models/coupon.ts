import { Promotion } from './promotion';
export class Coupon {
    constructor(
        public status?: string,
        public redemptionDate?: Date,
        public idPromotion?: string,
        public idUser?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public promotion?: Promotion,
        public message?: string
    ) {}
}
