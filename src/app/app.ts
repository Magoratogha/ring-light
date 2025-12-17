import { Component, signal } from '@angular/core';
import { Background } from './components/background/background';
import { Toolbar } from './components/toolbar/toolbar';

export interface Settings {
  k: number;
  neutralK: number;
  defaultK: number;
  minK: number;
  maxK: number;
  stepK: number;
  radius: number;
  defaultRadius: number;
  minRadius: number;
  maxRadius: number;
  stepRadius: number;
  fill: number;
  defaultFill: number;
  minFill: number;
  maxFill: number;
  stepFill: number;
  enableFullScreen: boolean;
}

@Component({
  selector: 'app-root',
  imports: [Background, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public settings = signal<Settings>({
    k: 5500,
    neutralK: 5500,
    defaultK: 5500,
    minK: 2500,
    maxK: 10000,
    stepK: 100,
    radius: 0,
    defaultRadius: 0,
    minRadius: 0,
    maxRadius: 50,
    stepRadius: 1,
    fill: 100,
    defaultFill: 100,
    minFill: 1,
    maxFill: 100,
    stepFill: 1,
    enableFullScreen: false,
  });
}
