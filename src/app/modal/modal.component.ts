import {Component, OnInit} from '@angular/core';
import {SharedService} from '../service/shared.service';
import {Element, ELEMENT_TYPE} from '../model/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

  inputText = '';

  type = '';

  constructor(public sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

  createElement(): void {
    this.sharedService.element$.next({
      name: this.inputText,
      type: this.type === ELEMENT_TYPE.File ? ELEMENT_TYPE.File : ELEMENT_TYPE.Folder
    } as Element);
  }

}
