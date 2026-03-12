import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
