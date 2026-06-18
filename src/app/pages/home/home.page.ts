import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DestaqueDirective } from '../../directives/destaque.directive';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonList, IonListHeader, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { football, trophy, people, globe } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonList, IonListHeader, IonItem, IonLabel, IonIcon,
    RouterLink, DestaqueDirective,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  estatisticas = [
    { label: 'Seleções participantes', valor: '48 times', icone: 'people' },
    { label: 'Total de jogos', valor: '104 partidas', icone: 'football' },
    { label: 'Cidades-sede', valor: '16 cidades', icone: 'globe' },
    { label: 'Grupos', valor: '12 grupos', icone: 'trophy' },
  ];

  sedes = [
    { cidade: 'Nova York / Nova Jersey', pais: 'EUA', estadio: 'MetLife Stadium', capacidade: '82.500' },
    { cidade: 'Los Angeles', pais: 'EUA', estadio: 'SoFi Stadium', capacidade: '70.000' },
    { cidade: 'Dallas', pais: 'EUA', estadio: "AT&T Stadium", capacidade: '80.000' },
    { cidade: 'San Francisco', pais: 'EUA', estadio: "Levi's Stadium", capacidade: '68.500' },
    { cidade: 'Cidade do México', pais: 'México', estadio: 'Estadio Azteca', capacidade: '87.600' },
    { cidade: 'Guadalajara', pais: 'México', estadio: 'Estadio Akron', capacidade: '49.850' },
    { cidade: 'Toronto', pais: 'Canadá', estadio: 'BMO Field', capacidade: '30.000' },
    { cidade: 'Vancouver', pais: 'Canadá', estadio: 'BC Place', capacidade: '54.500' },
  ];

  constructor() {
    addIcons({ football, trophy, people, globe });
  }
}
