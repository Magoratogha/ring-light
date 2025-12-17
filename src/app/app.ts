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
    k: 7000,
    neutralK: 7000,
    defaultK: 7000,
    minK: 2000,
    maxK: 12000,
    stepK: 1000,
    radius: 0,
    defaultRadius: 0,
    minRadius: 0,
    maxRadius: 50,
    stepRadius: 5,
    fill: 100,
    defaultFill: 100,
    minFill: 10,
    maxFill: 100,
    stepFill: 10,
    enableFullScreen: false,
  });
}
