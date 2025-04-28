import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOfServicesComponent } from './page-of-services.component';

describe('PageOfServicesComponent', () => {
  let component: PageOfServicesComponent;
  let fixture: ComponentFixture<PageOfServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageOfServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOfServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
