import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleTaskPage } from './single-task.page';

describe('SingleTaskPage', () => {
  let component: SingleTaskPage;
  let fixture: ComponentFixture<SingleTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
