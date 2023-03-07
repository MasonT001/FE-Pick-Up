import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymkComponent } from './pymk.component';

describe('PymkComponent', () => {
  let component: PymkComponent;
  let fixture: ComponentFixture<PymkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PymkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PymkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
