import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CopaService, Selecao } from '../../services/copa.service';
import { NumeroGrandePipe } from '../../pipes/numero-grande.pipe';
import { DestaqueDirective } from '../../directives/destaque.directive';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonListHeader, IonItem, IonLabel, IonBadge,
  IonSearchbar, IonSpinner, IonBackButton, IonButtons, IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-selecoes',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonListHeader, IonItem, IonLabel, IonBadge,
    IonSearchbar, IonSpinner, IonBackButton, IonButtons, IonButton,
    NumeroGrandePipe, DestaqueDirective,
  ],
  templateUrl: './selecoes.page.html',
  styleUrls: ['./selecoes.page.scss'],
})
export class SelecoesPage implements OnInit {
  selecoes: Selecao[] = [];
  selecoesFiltradas: Selecao[] = [];
  carregando = true;
  erro = false;

  constructor(private copaService: CopaService) {}

  ngOnInit() {
    this.carregarSelecoes();
  }

  carregarSelecoes() {
    this.carregando = true;
    this.erro = false;
    this.copaService.getSelecoes().subscribe({
      next: (data) => {
        this.selecoes = data.sort((a, b) => a.nome.localeCompare(b.nome));
        this.selecoesFiltradas = [...this.selecoes];
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  onBuscaChange(event: any) {
    const termo = event.detail.value?.toLowerCase() || '';
    this.selecoesFiltradas = this.selecoes.filter(s =>
      s.nome.toLowerCase().includes(termo) ||
      s.grupo.toLowerCase().includes(termo) ||
      s.confederacao.toLowerCase().includes(termo)
    );
  }
}
