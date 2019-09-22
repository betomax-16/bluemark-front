import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class ShareLoginService {
    logged: false;
    user: User = new User();

    loggedSource = new BehaviorSubject<boolean>( this.logged );
    userSource = new BehaviorSubject<User>( this.user );

    constructor() {
    }

    sendLogin( login: boolean ) {
        this.loggedSource.next( login );
    }

    sendUser( user: User ) {
        this.userSource.next( user );
    }
}
