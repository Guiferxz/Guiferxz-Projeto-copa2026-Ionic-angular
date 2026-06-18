import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CopaService, Grupo, Selecao } from '../../services/copa.service';
import { DestaqueDirective } from '../../directives/destaque.directive';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonListHeader, IonItem, IonLabel, IonBadge,
  IonBackButton, IonButtons, IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonListHeader, IonItem, IonLabel, IonBadge,
    IonBackButton, IonButtons, IonSpinner,
    DestaqueDirective,
  ],
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  grupos: Grupo[] = [];
  selecoes: Selecao[] = [];
  carregando = true;

  constructor(private copaService: CopaService) {}

  ngOnInit() {
    this.grupos = this.copaService.getGrupos();
    this.copaService.getSelecoes().subscribe({
      next: (data) => {
        this.selecoes = data;
        this.carregando = false;
      },
      error: () => { this.carregando = false; }
    });
  }

  getSelecaoPorId(id: string): Selecao | undefined {
    return this.selecoes.find(s => s.id === id);
  }
}
