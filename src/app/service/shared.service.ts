import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Element} from '../model/element';

@Injectable()
export class SharedService {
  modal$: Subject<boolean> = new Subject<boolean>();
  element$: Subject<Element> = new Subject<Element>();
}
