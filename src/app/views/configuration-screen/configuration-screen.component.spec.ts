import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationScreenComponent } from './configuration-screen.component';

describe('ConfigurationScreenComponent', () => {
  let component: ConfigurationScreenComponent;
  let fixture: ComponentFixture<ConfigurationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
