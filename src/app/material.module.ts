import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatToolbarModule, MatNativeDateModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule} from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    // tslint:disable-next-line:max-line-length
    imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule, MatExpansionModule, MatDividerModule, MatListModule, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule, MatSliderModule, MatProgressBarModule],
    // tslint:disable-next-line:max-line-length
    exports: [MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule, MatExpansionModule, MatDividerModule, MatListModule, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule, MatSliderModule, MatProgressBarModule],
})

export class MaterialModule { }
