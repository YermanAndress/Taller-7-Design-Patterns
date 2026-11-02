/**
 * PATRÓN: Observer (Comportamiento)
 *
 * QUÉ HACE:
 *   Define una relación de uno a muchos entre un sujeto y varios observadores.
 *   Cuando el sujeto cambia de estado, notifica automáticamente a todos los
 *   observadores suscritos sin conocer sus clases concretas.
 *
 * PROBLEMA QUE RESUELVE:
 *   En una subasta, cuando alguien hace una mejor oferta, varios interesados
 *   y el registro de la casa de subastas necesitan enterarse. Si la subasta
 *   llamara directamente a cada uno, quedaría acoplada a sus clases y habría
 *   que modificarla cada vez que se agregara un nuevo tipo de interesado.
 *
 * POR QUÉ ES ADECUADO:
 *   La subasta solo conoce la interfaz ObservadorSubasta. Los postores y el
 *   registro se suscriben o se dan de baja en tiempo de ejecución, y la
 *   subasta los notifica a todos con el evento Oferta.
 *
 * CÓMO EJECUTAR:
 *   deno run observer.ts
 */

interface Oferta {
  postor: string;
  monto: number;
}

interface ObservadorSubasta {
  actualizar(subasta: Subasta, oferta: Oferta): void;
}

// 1. Subject: mantiene la lista de observadores y notifica los cambios.
class Subasta {
  private readonly observadores = new Set<ObservadorSubasta>();
  private mejorOferta: Oferta | null = null;

  constructor(public readonly articulo: string) {}

  suscribir(observador: ObservadorSubasta): void {
    this.observadores.add(observador);
    console.log(`[Subasta] Observador suscrito a "${this.articulo}".`);
  }

  desuscribir(observador: ObservadorSubasta): void {
    const eliminado = this.observadores.delete(observador);
    if (eliminado) {
      console.log(`[Subasta] Observador retirado de "${this.articulo}".`);
    }
  }

  pujar(postor: string, monto: number): void {
    if (monto <= 0) {
      console.log("[Subasta] La oferta debe ser mayor que cero.");
      return;
    }

    if (this.mejorOferta && monto <= this.mejorOferta.monto) {
      console.log(
        `[Subasta] La oferta de $${monto} no supera la mejor oferta actual de $${this.mejorOferta.monto}.`,
      );
      return;
    }

    this.mejorOferta = { postor, monto };
    console.log(
      `\n[Subasta] ${postor} ofreció $${monto} por "${this.articulo}".`,
    );
    this.notificar();
  }

  get ofertaActual(): Oferta | null {
    return this.mejorOferta;
  }

  private notificar(): void {
    const oferta = this.mejorOferta;
    if (!oferta) {
      return;
    }

    for (const observador of this.observadores) {
      observador.actualizar(this, oferta);
    }
  }
}

// 2. ConcreteObserver: un postor que reacciona a las ofertas.
class Postor implements ObservadorSubasta {
  constructor(
    public readonly nombre: string,
    private readonly limite: number,
  ) {}

  actualizar(subasta: Subasta, oferta: Oferta): void {
    if (oferta.postor === this.nombre) {
      console.log(
        `  [${this.nombre}] Mi oferta de $${oferta.monto} quedó registrada.`,
      );
      return;
    }

    if (oferta.monto > this.limite) {
      console.log(
        `  [${this.nombre}] La oferta de ${oferta.postor} supera mi límite de $${this.limite}.`,
      );
      return;
    }

    console.log(
      `  [${this.nombre}] ${oferta.postor} lidera con $${oferta.monto} por "${subasta.articulo}".`,
    );
  }
}

// 3. Otro observador: lleva un registro de auditoría.
class RegistroSubasta implements ObservadorSubasta {
  actualizar(subasta: Subasta, oferta: Oferta): void {
    console.log(
      `  [Registro] "${subasta.articulo}": nueva mejor oferta de $${oferta.monto} por ${oferta.postor}.`,
    );
  }
}

function main(): void {
  console.log("=== Observer: subasta ===");

  const subasta = new Subasta("Reloj antiguo");
  const ana = new Postor("Ana", 150000);
  const luis = new Postor("Luis", 120000);
  const registro = new RegistroSubasta();

  subasta.suscribir(ana);
  subasta.suscribir(luis);
  subasta.suscribir(registro);

  subasta.pujar("Ana", 80000);
  subasta.pujar("Luis", 100000);
  subasta.pujar("Ana", 95000); // Rechazada: no supera la mejor oferta.
  subasta.pujar("Ana", 130000); // Aceptada: Luis supera su límite.

  subasta.desuscribir(luis);
  subasta.pujar("Ana", 160000); // Luis ya no recibe la notificación.

  console.log(
    `\n[Subasta] Mejor oferta final: $${subasta.ofertaActual?.monto} por ${subasta.ofertaActual?.postor}.`,
  );
}

main();
