import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDetailsComponent } from './student-details.component';

describe('StudentsDetailsComponent', () => {
  let component: StudentsDetailsComponent;
  let fixture: ComponentFixture<StudentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
