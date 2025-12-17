import {Component, computed, input} from '@angular/core';
import {Settings} from '../../app';

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.html',
  styleUrl: './background.css',
})
export class Background {
  public settings = input<Settings>();

  readonly bgColor = computed(() => {
    const k = this.settings()!.k;
    const { r, g, b } = this._kelvinTintedWhite(k);
    return `rgb(${r} ${g} ${b})`;
  });

  readonly aspectRatio = computed(() => {
    return Math.max(0, Math.min(50, this.settings()!.radius)) / 50 - 0.00001;
  });

  private _lerp(a: number, b: number, t: number) {
    return Math.round(a + (b - a) * t);
  }

  private _kelvinToRgb(k: number) {
    const temp = Math.max(1000, Math.min(40000, k)) / 100;

    let r: number, g: number, b: number;

    if (temp <= 66) {
      r = 255;
      g = 99.4708025861 * Math.log(temp) - 161.1195681661;
      b = temp <= 19
        ? 0
        : 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
    } else {
      r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
      g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
      b = 255;
    }

    const clamp = (x: number) => Math.max(0, Math.min(255, Math.round(x)));
    return { r: clamp(r), g: clamp(g), b: clamp(b) };
  }

  private _kelvinStrength(k: number) {
    const NEUTRAL = this.settings()!.neutralK;

    if (k === NEUTRAL) return 0;

    const range = k < NEUTRAL
      ? NEUTRAL - this.settings()!.minK
      : this.settings()!.maxK - NEUTRAL;

    const dist = Math.abs(k - NEUTRAL) / range;

    return Math.pow(dist, 1.4);
  }

  private _kelvinTintedWhite(k: number, maxStrength = 0.65) {
    const NEUTRAL = this.settings()!.neutralK;

    const base = this._kelvinToRgb(NEUTRAL);
    const light = this._kelvinToRgb(k);

    const target = {
      r: Math.max(0, Math.min(255, 255 + (light.r - base.r))),
      g: Math.max(0, Math.min(255, 255 + (light.g - base.g))),
      b: Math.max(0, Math.min(255, 255 + (light.b - base.b))),
    };

    const t = this._kelvinStrength(k) * maxStrength;

    return {
      r: this._lerp(255, target.r, t),
      g: this._lerp(255, target.g, t),
      b: this._lerp(255, target.b, t),
    };
  }
}
