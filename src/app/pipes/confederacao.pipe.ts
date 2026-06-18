import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'confederacao',
  standalone: true,
})
export class ConfederacaoPipe implements PipeTransform {
  private nomes: { [key: string]: string } = {
    CONMEBOL: '🌎 CONMEBOL (América do Sul)',
    UEFA: '🌍 UEFA (Europa)',
    CONCACAF: '🌎 CONCACAF (América do Norte/Central)',
    AFC: '🌏 AFC (Ásia)',
    CAF: '🌍 CAF (África)',
    OFC: '🌏 OFC (Oceania)',
  };

  transform(value: string): string {
    return this.nomes[value] || value;
  }
}
