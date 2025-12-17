import {Component, inject, input, WritableSignal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {Tools} from './tools/tools';
import {MatIconModule} from '@angular/material/icon';
import {Settings} from '../../app';

@Component({
  selector: 'app-toolbar',
  imports: [MatButtonModule, MatBottomSheetModule, MatIconModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  private _bottomSheet = inject(MatBottomSheet);
  public settings = input<WritableSignal<Settings>>();

  openBottomSheet(): void {
    this._bottomSheet.open(Tools, {
      panelClass: 'tools-bottom-sheet',
      backdropClass: 'tools-bottom-sheet-backdrop',
      autoFocus: false,
      data: { settings: this.settings() }
    });
  }

  async toggleFullscreen() {
    if (this.isFullscreen) {
      return document.exitFullscreen();
    }
    return document.documentElement.requestFullscreen();
  }

  get isFullscreen(): boolean {
    return !!document.fullscreenElement;
  }
}
