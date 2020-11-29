import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Element, ELEMENT_TYPE} from '../model/element';
import {Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../service/shared.service';

@Component({
  selector: 'app-folder-files',
  templateUrl: './folder-files.component.html',
  styleUrls: ['./folder-files.component.less']
})
export class FolderFilesComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  private dataMap: {id: string, element: Element};

  public id: number;

  public element: Element;

  public parentId: number;

  public displayRuleData;

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }
  ngOnInit(): void {
    this.dataMap = {} as {id: string, element: Element};
    this.getData().pipe(
      switchMap(() => this.build()),
      takeUntil(this.destroyed$)).subscribe();

    this.sharedService.element$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      value.id = Object.keys(this.dataMap).length;
      value.parentId = this.id;
      if (!this.element.children) {
        this.element.children = [];
      }
      this.element.children.push(value);
      this.dataMap[value.id] = value;
      this.build().pipe(takeUntil(this.destroyed$));;
      this.sharedService.modal$.next(false);
    });
  }

  private build(): Observable<void> {
    /* small condition to display rule data on page */
    if (this.id === 99999999) {
      this.displayRuleData = true;
      this.parentId = 0;
      return of();
    }
    this.displayRuleData = false;
    this.element = this.dataMap[this.id ? this.id : 0];
    if (!this.element) {
      this.id = 0;
      return of();
    }
    this.parentId = this.element.parentId;
    return of();
  }

  navigateToFolder(id: number): void {
    this.id = id;
    this.build().pipe(takeUntil(this.destroyed$));
  }

  private getData(): Observable<void> {
    return this.http.get('assets/data.json')
      .pipe(switchMap((data: Element) => {
        this.processData(data);
        return of(null);
      }));
  }

  private processData(data: Element): void {
    this.dataMap[data.id] = data;
    data.children.map(elem => {
        this.dataMap[elem.id] = elem;
        elem.parentId = data.id;
        if (elem.children && elem.children.length){
          this.processData(elem);
        }
      }
    );
  }

  openModal(): void {
    this.sharedService.modal$.next(true);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}


