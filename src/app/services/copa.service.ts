import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// apicountries.com — mesma estrutura da restcountries v2, com CORS liberado
export interface Country {
  name: string;
  alpha3Code: string;
  flags: { png: string; svg: string };
  capital: string;
  population: number;
  region: string;
  languages?: { name: string; nativeName: string }[];
}

export interface Selecao {
  id: string;
  nome: string;
  bandeira: string;
  capital: string;
  populacao: number;
  regiao: string;
  idiomas: string;
  grupo: string;
  confederacao: string;
  titulos: number;
}

export interface Grupo {
  nome: string;
  selecoes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CopaService {
  private apiUrl = '/api';

  private selecoesManuais: { [key: string]: Selecao } = {
    SCO: {
      id: 'SCO',
      nome: 'Scotland',
      bandeira: 'https://flagcdn.com/w320/gb-sct.png',
      capital: 'Edinburgh',
      populacao: 5500000,
      regiao: 'Europe',
      idiomas: 'English, Scottish Gaelic',
      grupo: 'C',
      confederacao: 'UEFA',
      titulos: 0,
    },
    ENG: {
      id: 'ENG',
      nome: 'England',
      bandeira: 'https://flagcdn.com/w320/gb-eng.png',
      capital: 'London',
      populacao: 56000000,
      regiao: 'Europe',
      idiomas: 'English',
      grupo: 'L',
      confederacao: 'UEFA',
      titulos: 1,
    },
    WAL: {
      id: 'WAL',
      nome: 'Wales',
      bandeira: 'https://flagcdn.com/w320/gb-wls.png',
      capital: 'Cardiff',
      populacao: 3200000,
      regiao: 'Europe',
      idiomas: 'English, Welsh',
      grupo: 'B',
      confederacao: 'UEFA',
      titulos: 0,
    },
    CUW: {
      id: 'CUW',
      nome: 'Curaçao',
      bandeira: 'https://flagcdn.com/w320/cw.png',
      capital: 'Willemstad',
      populacao: 153671,
      regiao: 'Americas',
      idiomas: 'Papiamentu, Dutch, English',
      grupo: 'E',
      confederacao: 'CONCACAF',
      titulos: 0,
    },
  };

  private selecoesClassificadas = [
    { id: 'MEX', grupo: 'A', confederacao: 'CONCACAF', titulos: 0 },
    { id: 'ZAF', grupo: 'A', confederacao: 'CAF', titulos: 0 },
    { id: 'KOR', grupo: 'A', confederacao: 'AFC', titulos: 0 },
    { id: 'CZE', grupo: 'A', confederacao: 'UEFA', titulos: 0 },
    { id: 'CAN', grupo: 'B', confederacao: 'CONCACAF', titulos: 0 },
    { id: 'QAT', grupo: 'B', confederacao: 'AFC', titulos: 0 },
    { id: 'CHE', grupo: 'B', confederacao: 'UEFA', titulos: 0 },
    { id: 'BIH', grupo: 'B', confederacao: 'UEFA', titulos: 0 },
    { id: 'BRA', grupo: 'C', confederacao: 'CONMEBOL', titulos: 5 },
    { id: 'MAR', grupo: 'C', confederacao: 'CAF', titulos: 0 },
    { id: 'HTI', grupo: 'C', confederacao: 'CONCACAF', titulos: 0 },
    { id: 'SCO', grupo: 'C', confederacao: 'UEFA', titulos: 0 },
    { id: 'USA', grupo: 'D', confederacao: 'CONCACAF', titulos: 0 },
    { id: 'PRY', grupo: 'D', confederacao: 'CONMEBOL', titulos: 0 },
    { id: 'AUS', grupo: 'D', confederacao: 'AFC', titulos: 0 },
    { id: 'TUR', grupo: 'D', confederacao: 'UEFA', titulos: 0 },
    { id: 'DEU', grupo: 'E', confederacao: 'UEFA', titulos: 4 },
    { id: 'CUW', grupo: 'E', confederacao: 'CONCACAF', titulos: 0 },
    { id: 'CIV', grupo: 'E', confederacao: 'CAF', titulos: 0 },
    { id: 'ECU', grupo: 'E', confederacao: 'CONMEBOL', titulos: 0 },
    { id: 'NLD', grupo: 'F', confederacao: 'UEFA', titulos: 0 },
    { id: 'JPN', grupo: 'F', confederacao: 'AFC', titulos: 0 },
    { id: 'TUN', grupo: 'F', confederacao: 'CAF', titulos: 0 },
    { id: 'SWE', grupo: 'F', confederacao: 'UEFA', titulos: 0 },
    { id: 'BEL', grupo: 'G', confederacao: 'UEFA', titulos: 0 },
    { id: 'EGY', grupo: 'G', confederacao: 'CAF', titulos: 0 },
    { id: 'IRN', grupo: 'G', confederacao: 'AFC', titulos: 0 },
    { id: 'NZL', grupo: 'G', confederacao: 'OFC', titulos: 0 },
    { id: 'ESP', grupo: 'H', confederacao: 'UEFA', titulos: 1 },
    { id: 'CPV', grupo: 'H', confederacao: 'CAF', titulos: 0 },
    { id: 'SAU', grupo: 'H', confederacao: 'AFC', titulos: 0 },
    { id: 'URY', grupo: 'H', confederacao: 'CONMEBOL', titulos: 2 },
    { id: 'FRA', grupo: 'I', confederacao: 'UEFA', titulos: 2 },
    { id: 'SEN', grupo: 'I', confederacao: 'CAF', titulos: 0 },
    { id: 'NOR', grupo: 'I', confederacao: 'UEFA', titulos: 0 },
    { id: 'IRQ', grupo: 'I', confederacao: 'AFC', titulos: 0 },
    { id: 'ARG', grupo: 'J', confederacao: 'CONMEBOL', titulos: 3 },
    { id: 'DZA', grupo: 'J', confederacao: 'CAF', titulos: 0 },
    { id: 'AUT', grupo: 'J', confederacao: 'UEFA', titulos: 0 },
    { id: 'JOR', grupo: 'J', confederacao: 'AFC', titulos: 0 },
    { id: 'PRT', grupo: 'K', confederacao: 'UEFA', titulos: 0 },
    { id: 'UZB', grupo: 'K', confederacao: 'AFC', titulos: 0 },
    { id: 'COL', grupo: 'K', confederacao: 'CONMEBOL', titulos: 0 },
    { id: 'COD', grupo: 'K', confederacao: 'CAF', titulos: 0 },
    { id: 'ENG', grupo: 'L', confederacao: 'UEFA', titulos: 1 },
    { id: 'HRV', grupo: 'L', confederacao: 'UEFA', titulos: 0 },
    { id: 'GHA', grupo: 'L', confederacao: 'CAF', titulos: 0 },
    { id: 'PAN', grupo: 'L', confederacao: 'CONCACAF', titulos: 0 },
  ];

  private grupos: Grupo[] = [
    { nome: 'Grupo A', selecoes: ['MEX', 'ZAF', 'KOR', 'CZE'] },
    { nome: 'Grupo B', selecoes: ['CAN', 'QAT', 'CHE', 'BIH'] },
    { nome: 'Grupo C', selecoes: ['BRA', 'MAR', 'HTI', 'SCO'] },
    { nome: 'Grupo D', selecoes: ['USA', 'PRY', 'AUS', 'TUR'] },
    { nome: 'Grupo E', selecoes: ['DEU', 'CUW', 'CIV', 'ECU'] },
    { nome: 'Grupo F', selecoes: ['NLD', 'JPN', 'TUN', 'SWE'] },
    { nome: 'Grupo G', selecoes: ['BEL', 'EGY', 'IRN', 'NZL'] },
    { nome: 'Grupo H', selecoes: ['ESP', 'CPV', 'SAU', 'URY'] },
    { nome: 'Grupo I', selecoes: ['FRA', 'SEN', 'NOR', 'IRQ'] },
    { nome: 'Grupo J', selecoes: ['ARG', 'DZA', 'AUT', 'JOR'] },
    { nome: 'Grupo K', selecoes: ['PRT', 'UZB', 'COL', 'COD'] },
    { nome: 'Grupo L', selecoes: ['ENG', 'HRV', 'GHA', 'PAN'] },
  ];

  private idsManuais = ['SCO', 'ENG', 'WAL', 'CUW'];

  private nomesPT: { [key: string]: string } = {
    MEX: 'México', ZAF: 'África do Sul', KOR: 'Coreia do Sul', CZE: 'República Tcheca',
    CAN: 'Canadá', QAT: 'Catar', CHE: 'Suíça', BIH: 'Bósnia e Herzegovina',
    BRA: 'Brasil', MAR: 'Marrocos', HTI: 'Haiti',
    USA: 'Estados Unidos', PRY: 'Paraguai', AUS: 'Austrália', TUR: 'Turquia',
    DEU: 'Alemanha', CIV: 'Costa do Marfim', ECU: 'Equador',
    NLD: 'Holanda', JPN: 'Japão', TUN: 'Tunísia', SWE: 'Suécia',
    BEL: 'Bélgica', EGY: 'Egito', IRN: 'Irã', NZL: 'Nova Zelândia',
    ESP: 'Espanha', CPV: 'Cabo Verde', SAU: 'Arábia Saudita', URY: 'Uruguai',
    FRA: 'França', SEN: 'Senegal', NOR: 'Noruega', IRQ: 'Iraque',
    ARG: 'Argentina', DZA: 'Argélia', AUT: 'Áustria', JOR: 'Jordânia',
    PRT: 'Portugal', UZB: 'Uzbequistão', COL: 'Colômbia', COD: 'Congo (RDC)',
    HRV: 'Croácia', GHA: 'Gana', PAN: 'Panamá',
  };

  constructor(private http: HttpClient) {}

  private mapCountry(country: Country): Selecao {
    const info = this.selecoesClassificadas.find(s => s.id === country.alpha3Code);
    return {
      id: country.alpha3Code,
      nome: this.nomesPT[country.alpha3Code] || country.name,
      bandeira: country.flags?.png || '',
      capital: country.capital || 'N/A',
      populacao: country.population || 0,
      regiao: country.region || 'N/A',
      idiomas: country.languages ? country.languages.map(l => l.name).join(', ') : 'N/A',
      grupo: info?.grupo || 'N/A',
      confederacao: info?.confederacao || 'N/A',
      titulos: info?.titulos || 0,
    };
  }

  getSelecoes(): Observable<Selecao[]> {
    const idsApi = this.selecoesClassificadas
      .map(s => s.id)
      .filter(id => !this.idsManuais.includes(id));

    const manuais: Selecao[] = this.selecoesClassificadas
      .filter(s => this.idsManuais.includes(s.id))
      .map(s => this.selecoesManuais[s.id])
      .filter(Boolean);

    // apicountries só aceita um código por vez no /alpha — usamos forkJoin para buscar todos em paralelo
    const requisicoes = idsApi.map(id =>
      this.http.get<Country[]>(`${this.apiUrl}/alpha/${id}`).pipe(
        map(res => (Array.isArray(res) ? res[0] : res)),
        catchError(() => of(null))
      )
    );

    return forkJoin(requisicoes).pipe(
      map(results => {
        const daApi = results
          .filter((c): c is Country => c !== null)
          .map(c => this.mapCountry(c));
        return [...daApi, ...manuais].sort((a, b) => a.nome.localeCompare(b.nome));
      }),
      catchError(() => of(manuais))
    );
  }

  getSelecaoPorId(id: string): Observable<Selecao | null> {
    if (this.idsManuais.includes(id)) {
      return of(this.selecoesManuais[id] || null);
    }
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${id}`).pipe(
      map(res => {
        const country = Array.isArray(res) ? res[0] : res;
        return country ? this.mapCountry(country) : null;
      }),
      catchError(() => of(null))
    );
  }

  getGrupos(): Grupo[] {
    return this.grupos;
  }
}
