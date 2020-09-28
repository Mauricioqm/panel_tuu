import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenbresiasComponent } from './menbresias.component';

describe('MenbresiasComponent', () => {
  let component: MenbresiasComponent;
  let fixture: ComponentFixture<MenbresiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenbresiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenbresiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
