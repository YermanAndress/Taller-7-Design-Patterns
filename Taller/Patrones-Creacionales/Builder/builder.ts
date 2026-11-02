/**
 * PATRÓN: Builder (Creacional)
 *
 * QUÉ HACE:
 *   Permite construir un objeto complejo paso a paso, separando el proceso de
 *   construcción de la representación final del producto.
 *
 * PROBLEMA QUE RESUELVE:
 *   Una casa puede tener muchas partes: cimientos, paredes, techo, puertas,
 *   ventanas, garaje, piscina y jardín. Si el cliente tuviera que crearla con
 *   un constructor gigante lleno de parámetros, sería difícil de leer y de
 *   mantener, y cada configuración nueva requeriría otra firma o muchos if.
 *
 * POR QUÉ ES ADECUADO:
 *   El builder encapsula los pasos de construcción y permite encadenarlos. El
 *   director reutiliza esos pasos para crear casas básicas o de lujo, y el
 *   cliente puede armar una casa personalizada sin conocer los detalles
 *   internos del producto.
 *
 * CÓMO EJECUTAR:
 *   deno run builder.ts
 */

// 1. Producto: objeto complejo que se quiere construir.
class Casa {
  public cimientos = "sin definir";
  public paredes = "sin definir";
  public techo = "sin definir";
  public puertas = 0;
  public ventanas = 0;
  public garaje = false;
  public piscina = false;
  public jardin = false;

  describir(): string {
    const extras: string[] = [];

    if (this.garaje) extras.push("garaje");
    if (this.piscina) extras.push("piscina");
    if (this.jardin) extras.push("jardín");

    const detalleExtras = extras.length > 0
      ? `, además de ${extras.join(", ")}`
      : "";

    return `Casa con ${this.cimientos}, ${this.paredes}, ${this.techo}, ` +
      `${this.puertas} puertas y ${this.ventanas} ventanas${detalleExtras}.`;
  }
}

// 2. Builder: interfaz con los pasos de construcción.
interface CasaBuilder {
  reiniciar(): void;
  construirCimientos(): CasaBuilder;
  construirParedes(): CasaBuilder;
  construirTecho(): CasaBuilder;
  agregarPuertas(cantidad: number): CasaBuilder;
  agregarVentanas(cantidad: number): CasaBuilder;
  agregarGaraje(): CasaBuilder;
  agregarPiscina(): CasaBuilder;
  agregarJardin(): CasaBuilder;
  obtenerCasa(): Casa;
}

// 3. ConcreteBuilder: implementa los pasos sobre una Casa concreta.
class CasaConcretaBuilder implements CasaBuilder {
  private casa: Casa;

  constructor() {
    this.casa = new Casa();
  }

  reiniciar(): void {
    this.casa = new Casa();
  }

  construirCimientos(): CasaBuilder {
    this.casa.cimientos = "cimientos de concreto";
    return this;
  }

  construirParedes(): CasaBuilder {
    this.casa.paredes = "paredes de ladrillo";
    return this;
  }

  construirTecho(): CasaBuilder {
    this.casa.techo = "techo de teja";
    return this;
  }

  agregarPuertas(cantidad: number): CasaBuilder {
    this.casa.puertas += cantidad;
    return this;
  }

  agregarVentanas(cantidad: number): CasaBuilder {
    this.casa.ventanas += cantidad;
    return this;
  }

  agregarGaraje(): CasaBuilder {
    this.casa.garaje = true;
    return this;
  }

  agregarPiscina(): CasaBuilder {
    this.casa.piscina = true;
    return this;
  }

  agregarJardin(): CasaBuilder {
    this.casa.jardin = true;
    return this;
  }

  obtenerCasa(): Casa {
    return this.casa;
  }
}

// 4. Director: conoce el orden de los pasos para configuraciones comunes.
class Arquitecto {
  constructor(private readonly builder: CasaBuilder) {}

  construirCasaBasica(): Casa {
    this.builder.reiniciar();

    this.builder
      .construirCimientos()
      .construirParedes()
      .construirTecho()
      .agregarPuertas(2)
      .agregarVentanas(4);

    return this.builder.obtenerCasa();
  }

  construirCasaLujo(): Casa {
    this.builder.reiniciar();

    this.builder
      .construirCimientos()
      .construirParedes()
      .construirTecho()
      .agregarPuertas(4)
      .agregarVentanas(8)
      .agregarGaraje()
      .agregarPiscina()
      .agregarJardin();

    return this.builder.obtenerCasa();
  }
}

function main(): void {
  console.log("=== Builder: construcción de casas ===");

  const builder = new CasaConcretaBuilder();
  const arquitecto = new Arquitecto(builder);

  const casaBasica = arquitecto.construirCasaBasica();
  console.log(`\n[Arquitecto] Casa básica:\n  ${casaBasica.describir()}`);

  const casaLujo = arquitecto.construirCasaLujo();
  console.log(`\n[Arquitecto] Casa de lujo:\n  ${casaLujo.describir()}`);

  // El cliente también puede construir una casa personalizada paso a paso.
  builder.reiniciar();

  const casaPersonalizada = builder
    .construirCimientos()
    .construirParedes()
    .construirTecho()
    .agregarPuertas(3)
    .agregarVentanas(6)
    .agregarGaraje()
    .agregarJardin()
    .obtenerCasa();

  console.log(
    `\n[Cliente] Casa personalizada:\n  ${casaPersonalizada.describir()}`,
  );
}

main();