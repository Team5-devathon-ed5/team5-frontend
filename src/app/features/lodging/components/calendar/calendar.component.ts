import { Component, EventEmitter, Output } from '@angular/core';
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatRangeDateSelectionModel,
} from '@angular/material/datepicker';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
    DefaultMatCalendarRangeStrategy,
    MatRangeDateSelectionModel,
  ],
})
export class CalendarComponent {
  @Output() rangeTravel = new EventEmitter<DateRange<Date>>();
  dateRange: DateRange<Date>;
  today = new Date();
  dateFilter = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today || date.toDateString() === today.toDateString();
  };

  constructor(
    private readonly selectionModel: MatRangeDateSelectionModel<Date>,
    private readonly selectionStrategy: DefaultMatCalendarRangeStrategy<Date>
  ) {
    const today = new Date();
    today.setDate(today.getDate());
    this.dateRange = new DateRange(today, new Date());
  }

  rangeChanged(selectedDate: Date | null) {
    if (!selectedDate) {
      return;
    }

    const selection = this.selectionModel.selection,
      newSelection = this.selectionStrategy.selectionFinished(
        selectedDate,
        selection
      );

    this.selectionModel.updateSelection(newSelection, this);
    this.dateRange = new DateRange<Date>(newSelection.start, newSelection.end);

    if (this.selectionModel.isComplete()) {
      this.rangeTravel.emit(newSelection);
    }
  }
}
