import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientsModalComponent } from './edit-clients-modal.component';

describe('EditClientsModalComponent', () => {
  let component: EditClientsModalComponent;
  let fixture: ComponentFixture<EditClientsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
