import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWishListDialogComponent } from './delete-wish-list-dialog.component';

describe('DeleteWishListDialogComponent', () => {
  let component: DeleteWishListDialogComponent;
  let fixture: ComponentFixture<DeleteWishListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWishListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWishListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
