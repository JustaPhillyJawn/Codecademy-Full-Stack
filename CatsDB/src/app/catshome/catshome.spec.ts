import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Catshome } from './catshome';

describe('Catshome', () => {
  let component: Catshome;
  let fixture: ComponentFixture<Catshome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catshome],
    }).compileComponents();

    fixture = TestBed.createComponent(Catshome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
