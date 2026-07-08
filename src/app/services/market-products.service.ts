import { Injectable } from '@angular/core';

export interface MarketProduct {
  code: string;
  title: string;
  price: string;
  description: string;
  category: string;
  img: string;
}

@Injectable({ providedIn: 'root' })
export class MarketProductsService {
  private readonly csvPath = '/assets/Market/cenovnik.csv';
  private readonly fallbackImage = 'assets/market_diamond.jpg';

  async loadProducts(): Promise<MarketProduct[]> {
    const response = await fetch(this.csvPath);
    if (!response.ok) {
      throw new Error(`Failed to load market CSV: ${response.status}`);
    }

    const csvText = await response.text();
    return this.parseCsv(csvText)
      .slice(1) // Skip header row.
      .map(row => this.mapRow(row))
      .filter((product): product is MarketProduct => product !== null);
  }

  private mapRow(row: string[]): MarketProduct | null {
    const code = (row[0] ?? '').trim();
    const title = (row[1] ?? '').trim();
    const rawPrice = (row[2] ?? '').trim();

    if (!title) {
      return null;
    }

    const parsedPrice = Number(rawPrice.replace(',', '.'));
    const price = Number.isFinite(parsedPrice)
      ? `${Math.round(parsedPrice)} ден`
      : rawPrice;

    const category = this.inferCategory(title);

    return {
      code,
      title,
      price,
      description: code ? `Шифра: ${code}` : '',
      category,
      img: this.fallbackImage
    };
  }

  private inferCategory(title: string): string {
    const [firstWord] = title.split(/\s+/);
    return firstWord?.trim() || 'Other';
  }

  // Handles comma-separated CSV rows with quoted fields and escaped quotes.
  private parseCsv(input: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let value = '';
    let inQuotes = false;

    const text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          value += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (!inQuotes && char === ',') {
        row.push(value.trim());
        value = '';
        continue;
      }

      if (!inQuotes && (char === '\n' || char === '\r')) {
        if (char === '\r' && next === '\n') {
          i++;
        }

        row.push(value.trim());
        if (row.some(cell => cell.length > 0)) {
          rows.push(row);
        }

        row = [];
        value = '';
        continue;
      }

      value += char;
    }

    if (value.length > 0 || row.length > 0) {
      row.push(value.trim());
      if (row.some(cell => cell.length > 0)) {
        rows.push(row);
      }
    }

    return rows;
  }
}

