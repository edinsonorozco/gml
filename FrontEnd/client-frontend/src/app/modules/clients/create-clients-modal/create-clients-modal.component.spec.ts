import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientsModalComponent } from './create-clients-modal.component';

describe('CreateClientsModalComponent', () => {
  let component: CreateClientsModalComponent;
  let fixture: ComponentFixture<CreateClientsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
