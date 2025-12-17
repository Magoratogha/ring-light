import {Component, inject, WritableSignal} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {Settings} from '../../../app';
import {FormsModule} from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {Field, form} from '@angular/forms/signals';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tools',
  imports: [MatSliderModule, MatIconModule, FormsModule, Field, MatButtonModule],
  templateUrl: './tools.html',
  styleUrl: './tools.css',
})
export class Tools {
  private _bottomSheetData = inject<{ settings: WritableSignal<Settings> }>(MAT_BOTTOM_SHEET_DATA);
  public settings : WritableSignal<Settings> = this._bottomSheetData.settings;
  public settingsForm = form(this.settings);

  public resetForm() {
    this.settingsForm().reset({
      ...this.settings(),
      k: this.settings().defaultK,
      radius: this.settings().defaultRadius,
      fill: this.settings().defaultFill,
    })
  }
}



