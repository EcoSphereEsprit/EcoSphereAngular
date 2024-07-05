import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogStatComponent } from './blog-stat.component';

describe('BlogStatComponent', () => {
  let component: BlogStatComponent;
  let fixture: ComponentFixture<BlogStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogStatComponent]
    });
    fixture = TestBed.createComponent(BlogStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
