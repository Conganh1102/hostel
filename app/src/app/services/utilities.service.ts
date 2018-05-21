import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilitiesService {

  constructor() { }

  getHttpPromise(obs: Observable<Response>): any {
    return new Promise((resolve, reject) => {
      obs.subscribe(data => {
        return resolve(data);
      }, err => {
        console.log(err);
        return reject(new Error(err._body));
      });
    });
  }

  b64decode(str) {
    // tslint:disable-next-line:prefer-const
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 === 1) {
        throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
    }
    for (
    // initialize result and counters
    let bc = 0, bs = void 0, buffer = void 0, idx = 0;
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    // tslint:disable-next-line:no-bitwise
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        // tslint:disable-next-line:no-bitwise
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
  }

  b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  urlBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0: {
            break;
        }
        case 2: {
            output += '==';
            break;
        }
        case 3: {
            output += '=';
            break;
        }
        default: {
            throw new Error('Illegal base64url string!');
        }
    }
    return this.b64DecodeUnicode(output);
  }

  decodeToken(token) {
    // tslint:disable-next-line:prefer-const
    let parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
    }
    // tslint:disable-next-line:prefer-const
    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
        throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  getTokenExpirationDate(token) {
    let decoded;
    decoded = this.decodeToken(token);
    if (!decoded.hasOwnProperty('exp')) {
        return null;
    }
    // tslint:disable-next-line:prefer-const
    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token) {
    if (!token) {
      return true;
    }
    // tslint:disable-next-line:prefer-const
    let date = this.getTokenExpirationDate(token);
    if (date == null) {
        return false;
    }
    // Token expired?
    return !(date.valueOf() > (new Date().valueOf()));
  }
}
