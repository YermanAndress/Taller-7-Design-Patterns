/**
 * PATRÓN: Command (Comportamiento)
 *
 * QUÉ HACE:
 *   Encapsula una solicitud como un objeto, de modo que se pueda parametrizar
 *   con diferentes acciones, almacenar en una cola o historial, y deshacer.
 *
 * PROBLEMA QUE RESUELVE:
 *   Un editor de imágenes necesita ejecutar acciones como rotar, redimensionar
 *   o aplicar un filtro, y poder deshacer la última. Si el editor llamara
 *   directamente a los métodos de la imagen, quedaría acoplado a cada acción y
 *   no tendría una forma uniforme de guardar el historial.
 *
 * POR QUÉ ES ADECUADO:
 *   Cada acción es un comando con ejecutar() y deshacer(). El editor solo
 *   conoce la interfaz ComandoImagen y puede guardar comandos en una pila para
 *   deshacerlos sin conocer los detalles de la imagen.
 *
 * CÓMO EJECUTAR:
 *   deno run command.ts
 */

// 1. Receiver: sabe cómo realizar el trabajo real.
class Imagen {
  private ancho: number;
  private alto: number;
  private rotacion = 0;
  private filtro = "ninguno";

  constructor(ancho: number, alto: number) {
    this.ancho = ancho;
    this.alto = alto;
  }

  get dimensiones(): { ancho: number; alto: number } {
    return { ancho: this.ancho, alto: this.alto };
  }

  get rotacionActual(): number {
    return this.rotacion;
  }

  get filtroActual(): string {
    return this.filtro;
  }

  rotar(grados: number): void {
    this.establecerRotacion(this.rotacion + grados);
  }

  establecerRotacion(grados: number): void {
    this.rotacion = ((grados % 360) + 360) % 360;
  }

  redimensionar(ancho: number, alto: number): void {
    if (ancho <= 0 || alto <= 0) {
      throw new Error("Las dimensiones deben ser positivas.");
    }

    this.ancho = ancho;
    this.alto = alto;
  }

  aplicarFiltro(filtro: string): void {
    this.filtro = filtro;
  }

  describir(): string {
    return `${this.ancho}x${this.alto}px, rotación ${this.rotacion}°, ` +
      `filtro: ${this.filtro}`;
  }
}

// 2. Command: contrato común para ejecutar y deshacer.
interface ComandoImagen {
  ejecutar(): void;
  deshacer(): void;
}

// 3. ConcreteCommands: cada uno conoce una acción y su estado anterior.
class RotarImagenCommand implements ComandoImagen {
  private rotacionAnterior = 0;

  constructor(
    private readonly imagen: Imagen,
    private readonly grados: number,
  ) {}

  ejecutar(): void {
    this.rotacionAnterior = this.imagen.rotacionActual;
    this.imagen.rotar(this.grados);
    console.log(
      `[Command] Rotar ${this.grados}° -> ${this.imagen.describir()}`,
    );
  }

  deshacer(): void {
    this.imagen.establecerRotacion(this.rotacionAnterior);
    console.log(`[Undo] Rotación restaurada -> ${this.imagen.describir()}`);
  }
}

class RedimensionarImagenCommand implements ComandoImagen {
  private anchoAnterior = 0;
  private altoAnterior = 0;

  constructor(
    private readonly imagen: Imagen,
    private readonly nuevoAncho: number,
    private readonly nuevoAlto: number,
  ) {}

  ejecutar(): void {
    const { ancho, alto } = this.imagen.dimensiones;

    this.anchoAnterior = ancho;
    this.altoAnterior = alto;
    this.imagen.redimensionar(this.nuevoAncho, this.nuevoAlto);

    console.log(
      `[Command] Redimensionar a ${this.nuevoAncho}x${this.nuevoAlto}px -> ` +
        `${this.imagen.describir()}`,
    );
  }

  deshacer(): void {
    this.imagen.redimensionar(this.anchoAnterior, this.altoAnterior);
    console.log(`[Undo] Tamaño restaurado -> ${this.imagen.describir()}`);
  }
}

class AplicarFiltroCommand implements ComandoImagen {
  private filtroAnterior = "ninguno";

  constructor(
    private readonly imagen: Imagen,
    private readonly filtro: string,
  ) {}

  ejecutar(): void {
    this.filtroAnterior = this.imagen.filtroActual;
    this.imagen.aplicarFiltro(this.filtro);
    console.log(
      `[Command] Aplicar filtro "${this.filtro}" -> ${this.imagen.describir()}`,
    );
  }

  deshacer(): void {
    this.imagen.aplicarFiltro(this.filtroAnterior);
    console.log(`[Undo] Filtro restaurado -> ${this.imagen.describir()}`);
  }
}

// 4. Invoker: ejecuta comandos y mantiene el historial para deshacer.
class EditorImagenes {
  private readonly historial: ComandoImagen[] = [];

  ejecutar(comando: ComandoImagen): void {
    comando.ejecutar();
    this.historial.push(comando);
  }

  deshacerUltimo(): void {
    const comando = this.historial.pop();

    if (!comando) {
      console.log("[Editor] No hay acciones para deshacer.");
      return;
    }

    comando.deshacer();
  }

  get accionesRealizadas(): number {
    return this.historial.length;
  }
}

function main(): void {
  console.log("=== Command: editor de imágenes ===");

  const imagen = new Imagen(800, 600);
  const editor = new EditorImagenes();

  console.log(`Estado inicial: ${imagen.describir()}`);

  editor.ejecutar(new RotarImagenCommand(imagen, 90));
  editor.ejecutar(new RedimensionarImagenCommand(imagen, 1200, 800));
  editor.ejecutar(new AplicarFiltroCommand(imagen, "sepia"));

  console.log(`\nEstado final: ${imagen.describir()}`);
  console.log(`Acciones en el historial: ${editor.accionesRealizadas}`);

  console.log("\nDeshaciendo la última acción...");
  editor.deshacerUltimo();
  console.log(`Estado actual: ${imagen.describir()}`);

  console.log("\nDeshaciendo otra acción...");
  editor.deshacerUltimo();
  console.log(`Estado actual: ${imagen.describir()}`);

  console.log(
    `\nAcciones pendientes en el historial: ${editor.accionesRealizadas}`,
  );
}

main();