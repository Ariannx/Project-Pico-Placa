import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseConsultingComponent } from './response-consulting.component';

describe('ResponseConsultingComponent', () => {
  let component: ResponseConsultingComponent;
  let fixture: ComponentFixture<ResponseConsultingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseConsultingComponent]
    });
    fixture = TestBed.createComponent(ResponseConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
