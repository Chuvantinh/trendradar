import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepreviewComponent } from './filepreview.component';

describe('FilepreviewComponent', () => {
  let component: FilepreviewComponent;
  let fixture: ComponentFixture<FilepreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilepreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
