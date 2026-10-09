import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocView } from './doc-view';

describe('DocView', () => {
  let component: DocView;
  let fixture: ComponentFixture<DocView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocView],
    }).compileComponents();

    fixture = TestBed.createComponent(DocView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
