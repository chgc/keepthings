import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { KeepthingsAppComponent } from '../app/keepthings.component';

beforeEachProviders(() => [KeepthingsAppComponent]);

describe('App: Keepthings', () => {
  it('should create the app',
      inject([KeepthingsAppComponent], (app: KeepthingsAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'keepthings works!\'',
      inject([KeepthingsAppComponent], (app: KeepthingsAppComponent) => {
    expect(app.title).toEqual('keepthings works!');
  }));
});
