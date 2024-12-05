import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ViewImagePage } from './view-image.page';

describe('ViewImagePage', () => {
  let component: ViewImagePage;
  let fixture: ComponentFixture<ViewImagePage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ViewImagePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
