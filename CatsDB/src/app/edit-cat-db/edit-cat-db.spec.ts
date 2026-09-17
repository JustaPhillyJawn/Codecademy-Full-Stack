import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCatDB } from './edit-cat-db';

describe('EditCatDB', () => {
  let component: EditCatDB;
  let fixture: ComponentFixture<EditCatDB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCatDB],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCatDB);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
