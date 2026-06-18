import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { CopaService, Selecao } from '../../services/copa.service';
import { NumeroGrandePipe } from '../../pipes/numero-grande.pipe';
import { ConfederacaoPipe } from '../../pipes/confederacao.pipe';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonListHeader, IonItem, IonLabel, IonBadge,
  IonBackButton, IonButtons, IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [
    CommonModule, DatePipe,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonListHeader, IonItem, IonLabel, IonBadge,
    IonBackButton, IonButtons, IonSpinner,
    NumeroGrandePipe, ConfederacaoPipe,
  ],
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  selecao: Selecao | null = null;
  carregando = true;
  id = '';
  today = new Date();

  curiosidades: { [key: string]: string[] } = {
    BRA: ['5 vezes campeã mundial (1958, 1962, 1970, 1994, 2002)', 'Único país a disputar todas as Copas do Mundo', 'Maior artilheiro: Ronaldo com 15 gols em Copas'],
    ARG: ['3 vezes campeã (1978, 1986, 2022)', 'Lionel Messi levou o país ao tri em 2022', 'Diego Maradona é considerado o maior ídolo da história'],
    FRA: ['2 vezes campeã (1998 e 2018)', 'Kylian Mbappé é o atual astro da seleção', 'Em 1998 venceu a Copa em casa'],
    DEU: ['4 vezes campeã (1954, 1974, 1990, 2014)', 'Miroslav Klose é o maior artilheiro da história das Copas com 16 gols', 'Esteve em semifinais em 13 Copas'],
    ENG: ['Campeã em 1966, jogando em casa', 'Berço do futebol moderno', 'Harry Kane é o artilheiro histórico da seleção'],
    ESP: ['Campeã em 2010 na África do Sul', 'O estilo tiki-taka revolucionou o futebol mundial', 'Iniesta marcou o gol do título na final'],
    ITA: ['4 vezes campeã (1934, 1938, 1982, 2006)', 'Única seleção a vencer duas Copas consecutivas', 'Ficou fora das Copas de 2018 e 2022'],
    URY: ['2 vezes campeã (1930 e 1950)', 'Sediou e venceu a primeira Copa do Mundo em 1930', 'Forlan foi eleito melhor jogador da Copa de 2010'],
  };

  constructor(
    private route: ActivatedRoute,
    private copaService: CopaService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.copaService.getSelecaoPorId(this.id).subscribe({
        next: (data) => {
          this.selecao = data;
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
        }
      });
    }
  }

  getCuriosidades(): string[] {
    return this.curiosidades[this.id] || [
      'Classificou-se para a Copa do Mundo 2026',
      'Representará sua confederação no torneio',
      'Busca conquistar seu primeiro ou próximo título',
    ];
  }
}
