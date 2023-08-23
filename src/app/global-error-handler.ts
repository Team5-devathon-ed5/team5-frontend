import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private _notification: NotificationService) {}

  handleError(error: HttpErrorResponse | Error) {
    this._notification.showError(error?.message || 'Error no identificado');
  }
}
