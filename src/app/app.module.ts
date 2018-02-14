import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
  MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { WishListEditComponent } from './wish-list-edit/wish-list-edit.component';
import { WishService } from "./services/wish.service";
import { WishEditComponent } from './wish-edit/wish-edit.component';
import { WishListService } from "./services/wish-list.service";
import { UserService } from "./services/user.service";
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { WishViewComponent } from './wish-view/wish-view.component';
import { WishListViewComponent } from './wish-list-view/wish-list-view.component';
import { ShareComponent } from './shared/shared.component';
import { AllSharedComponent } from './all-shared/all-shared.component';
import { ConfigurationService } from "./services/configuration.service";
import { DeleteItemDialogComponent } from './delete-item-dialog/delete-item-dialog.component';
import { NamePartPipe } from './util/name-part.pipe';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class WishMaterialModule {
}

@NgModule({
  entryComponents: [ShareDialogComponent, DeleteItemDialogComponent, EditEventDialogComponent],
  declarations: [
    AppComponent, EditComponent, WishListEditComponent, WishEditComponent, LoginComponent,
    ShareDialogComponent, WishViewComponent, WishListViewComponent, ShareComponent, AllSharedComponent,
    DeleteItemDialogComponent, NamePartPipe, EditEventDialogComponent, ViewComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, WishMaterialModule, MatNativeDateModule,
    ReactiveFormsModule, AppRoutingModule, MatListModule, MatDialogModule
  ],
  providers: [WishService, WishListService, UserService, ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
