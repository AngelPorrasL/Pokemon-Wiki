import { Component, OnInit } from '@angular/core';
import { GamesService } from './services/games.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  versions: any[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    const versionGroupIds = Array.from({ length: 27 }, (_, index) => index + 1); // Generar IDs del 1 al 27
    versionGroupIds.forEach(versionGroupId => {
      this.gamesService.getGames(versionGroupId).subscribe((data: any) => {
        if (data.versions) {
          this.versions = this.versions.concat(data.versions.map((version: any) => version.name));
        }
      });
    });
  }
}