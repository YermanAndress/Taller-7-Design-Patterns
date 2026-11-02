/**
 * PATRÓN: Flyweight (Estructural)
 *
 * QUÉ HACE:
 *   Permite compartir objetos inmutables para soportar grandes cantidades de
 *   objetos sin duplicar la información que todos tienen en común. Separa el
 *   estado intrínseco (compartido) del estado extrínseco (propio de cada uso).
 *
 * PROBLEMA QUE RESUELVE:
 *   Una biblioteca tiene muchos ejemplares físicos de los mismos libros. Si
 *   cada ejemplar guardara título, autor, portada y categoría, esa información
 *   se repetiría cientos de veces y consumiría memoria innecesariamente.
 *
 * POR QUÉ ES ADECUADO:
 *   La ficha bibliográfica (intrínseca) se crea una sola vez por ISBN y se
 *   comparte entre todos los ejemplares. Cada ejemplar conserva únicamente
 *   sus datos propios (código, estante y estado), que sí cambian.
 *
 * CÓMO EJECUTAR:
 *   deno run flyweight.ts
 */

interface DatosFicha {
  isbn: string;
  titulo: string;
  autor: string;
  portada: string;
  categoria: string;
}

// 1. Flyweight: datos intrínsecos compartidos e inmutables.
class FichaBibliografica {
  public readonly isbn: string;
  public readonly titulo: string;
  public readonly autor: string;
  public readonly portada: string;
  public readonly categoria: string;

  constructor(datos: DatosFicha) {
    this.isbn = datos.isbn;
    this.titulo = datos.titulo;
    this.autor = datos.autor;
    this.portada = datos.portada;
    this.categoria = datos.categoria;
  }

  describir(): string {
    return `${this.titulo} — ${this.autor} (${this.categoria})`;
  }
}

// 2. Flyweight Factory: reutiliza una ficha por ISBN.
class CatalogoFichas {
  private readonly fichas = new Map<string, FichaBibliografica>();
  private creaciones = 0;

  obtener(datos: DatosFicha): FichaBibliografica {
    const existente = this.fichas.get(datos.isbn);
    if (existente) {
      return existente;
    }

    const ficha = new FichaBibliografica(datos);
    this.fichas.set(datos.isbn, ficha);
    this.creaciones++;
    console.log(`[Catálogo] Ficha creada para ISBN ${datos.isbn}`);
    return ficha;
  }

  get totalFichas(): number {
    return this.fichas.size;
  }

  get totalCreaciones(): number {
    return this.creaciones;
  }
}

// 3. Contexto: cada ejemplar tiene estado extrínseco propio.
class Ejemplar {
  private estado: "disponible" | "prestado" = "disponible";

  constructor(
    public readonly codigo: string,
    public readonly estante: string,
    public readonly ficha: FichaBibliografica,
  ) {}

  prestar(): void {
    this.estado = "prestado";
  }

  devolver(): void {
    this.estado = "disponible";
  }

  mostrar(): void {
    console.log(
      `  ${this.codigo} [${this.estante}] ${this.ficha.describir()} -> ${this.estado}`,
    );
  }
}

function main(): void {
  console.log("=== Flyweight: catálogo de biblioteca ===");

  const catalogo = new CatalogoFichas();

  const cienAnios: DatosFicha = {
    isbn: "978-84-376-0494-7",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    portada: "cien-anios.jpg",
    categoria: "Novela",
  };

  const quijote: DatosFicha = {
    isbn: "978-84-376-2214-9",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    portada: "quijote.jpg",
    categoria: "Clásico",
  };

  const principito: DatosFicha = {
    isbn: "978-84-261-3337-3",
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    portada: "principito.jpg",
    categoria: "Infantil",
  };

  const ejemplares = [
    new Ejemplar("EJ-001", "A1", catalogo.obtener(cienAnios)),
    new Ejemplar("EJ-002", "A1", catalogo.obtener(cienAnios)),
    new Ejemplar("EJ-003", "A2", catalogo.obtener(cienAnios)),
    new Ejemplar("EJ-004", "B1", catalogo.obtener(quijote)),
    new Ejemplar("EJ-005", "B1", catalogo.obtener(quijote)),
    new Ejemplar("EJ-006", "B2", catalogo.obtener(quijote)),
    new Ejemplar("EJ-007", "C1", catalogo.obtener(principito)),
    new Ejemplar("EJ-008", "C1", catalogo.obtener(principito)),
  ];

  console.log("\n[Biblioteca] Ejemplares:");
  for (const ejemplar of ejemplares) {
    ejemplar.mostrar();
  }

  ejemplares[0].prestar();
  console.log("\n[Biblioteca] Después de prestar EJ-001:");
  ejemplares[0].mostrar();

  // La ficha se comparte: no se crea otra instancia para el mismo ISBN.
  const mismaFicha = catalogo.obtener(cienAnios);
  console.log(
    `\n[Flyweight] ¿EJ-001 y EJ-002 comparten la misma ficha? ${
      ejemplares[0].ficha === ejemplares[1].ficha ? "Sí" : "No"
    }`,
  );
  console.log(
    `[Flyweight] ¿La ficha obtenida de nuevo es la misma instancia? ${
      mismaFicha === ejemplares[0].ficha ? "Sí" : "No"
    }`,
  );

  console.log(
    `\n[Resumen] Ejemplares: ${ejemplares.length} | Fichas únicas: ${catalogo.totalFichas} | Creaciones: ${catalogo.totalCreaciones}`,
  );
  console.log(
    `[Resumen] Metadatos que se habrían duplicado sin Flyweight: ${
      ejemplares.length - catalogo.totalFichas
    }`,
  );
}

main();
