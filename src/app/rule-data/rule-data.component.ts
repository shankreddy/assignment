import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-rule-data',
  templateUrl: './rule-data.component.html',
  styleUrls: ['./rule-data.component.less']
})
export class RuleDataComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient) {
  }

  data: { id: string, ruleName: string }[];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnInit(): void {
    this.http.get('assets/rules.json')
      .pipe(switchMap((res: { data: { id: string, ruleName: string }[] }) => {
        this.data = res.data;
        return of(null);
      }),
      takeUntil(this.destroyed$))
      .subscribe();
  }

  public trackByRule(index: number): number {
    return index;
  }

  public performOperation(type: string, index: number): void {
    if (type === 'delete') {
      this.data.splice(index, 1);
    } else if (type === 'clone') {
      this.data.splice(index, 0, this.data[index]);
    } else if (type === 'move-up') {
      this.swapArray(index, index - 1);
    } else if (type === 'move-down') {
      this.swapArray(index, index + 1);
    }
  }

  private swapArray(a: number, b: number): void {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}


