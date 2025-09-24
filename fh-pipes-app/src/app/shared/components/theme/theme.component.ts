import { DOCUMENT } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: [ './theme.component.css' ]
})
export class ThemeComponent {
  private readonly documentRef = inject(DOCUMENT);
  private readonly THEME_KEY = 'theme';
  private readonly THEME_ATTR = 'data-theme';

  position = 0;
  themes: ITheme[] = [
    { position: 0, theme: ETheme.DRACULA },
    { position: 1, theme: ETheme.DARK },
    { position: 2, theme: ETheme.NORD },
    { position: 3, theme: ETheme.CYBERPUNK },
    { position: 4, theme: ETheme.COFFEE },
  ];

  themeCurrent: ITheme = this.themes[ 0 ];
  themeNext: ITheme = this.themes[ 1 ];

  constructor() {
    this.loadTheme();
  }

  setTheme(): void {
    const currentTheme = this.documentRef.documentElement.getAttribute(this.THEME_ATTR);
    if (currentTheme) {
      this.themeCurrent = this.findTheme(currentTheme) ?? this.themes[ 0 ];
      this.position = this.getNextPosition(this.themeCurrent.position);
      this.themeNext = this.themes[ this.position ];
      this.saveTheme(this.themeNext.theme);
    }
  }

  private getNextPosition(currentPosition: number): number {
    return (currentPosition + 1) % this.themes.length;
  }

  saveTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.documentRef.documentElement.setAttribute(this.THEME_ATTR, theme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.documentRef.documentElement.setAttribute(this.THEME_ATTR, savedTheme);
      this.themeCurrent = this.findTheme(savedTheme) ?? this.themes[ 0 ];
      this.position = this.themeCurrent.position;
      this.themeNext = this.themes[ this.getNextPosition(this.position) ];
    }
    this.removeVersion();
  }

  findTheme(theme: string): ITheme | undefined {
    return this.themes.find(t => t.theme === theme);
  }

  removeVersion(): void {
    if (!isDevMode()) {
      this.documentRef.body.children.item(0)?.removeAttribute('ng-version');
    }
  }
}

interface ITheme {
  position: number;
  theme: ETheme;
}

enum ETheme {
  DRACULA = 'dracula',
  DARK = 'dark',
  NORD = 'nord',
  CYBERPUNK = 'cyberpunk',
  COFFEE = 'coffee'
}
