import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class ShareLoginService {
    logged: false;
    rol: string ;

    loggedSource = new BehaviorSubject<boolean>( this.logged );
    rolSource = new BehaviorSubject<string>( this.rol );

    constructor() {
    }

    sendLogin( login: boolean ) {
        this.loggedSource.next( login );
    }

    sendUser( rol: string ) {
        this.rolSource.next( rol );
    }
}
