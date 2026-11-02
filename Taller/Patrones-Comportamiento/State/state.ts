/**
 * PATRÓN: State (Comportamiento)
 *
 * QUÉ HACE:
 *   Permite que un objeto cambie su comportamiento cuando cambia su estado
 *   interno. Cada estado se representa con una clase que decide qué acciones
 *   son válidas y a qué estado se pasa después.
 *
 * PROBLEMA QUE RESUELVE:
 *   Un pedido online pasa por varios estados: pendiente de pago, pagado,
 *   enviado, entregado o cancelado. Las acciones permitidas dependen del
 *   estado actual. Si se resolviera con if/else, el código del pedido sería
 *   largo, frágil y difícil de extender con nuevos estados.
 *
 * POR QUÉ ES ADECUADO:
 *   Cada estado encapsula sus transiciones y sus acciones inválidas. El Pedido
 *   delega el comportamiento en el estado actual, así que agregar un estado
 *   nuevo no obliga a modificar todos los condicionales del contexto.
 *
 * CÓMO EJECUTAR:
 *   deno run state.ts
 */

interface EstadoPedido {
  readonly nombre: string;
  pagar(pedido: Pedido): void;
  enviar(pedido: Pedido): void;
  entregar(pedido: Pedido): void;
  cancelar(pedido: Pedido): void;
}

// 1. Context: delega las acciones en el estado actual.
class Pedido {
  private estado: EstadoPedido;
  private readonly historial: string[] = [];

  constructor(public readonly id: string) {
    this.estado = new PendientePago();
    this.historial.push(this.estado.nombre);
  }

  setEstado(estado: EstadoPedido): void {
    this.estado = estado;
    this.historial.push(estado.nombre);
    console.log(`[Pedido ${this.id}] Nuevo estado: ${estado.nombre}`);
  }

  get estadoActual(): string {
    return this.estado.nombre;
  }

  get historialEstados(): readonly string[] {
    return [...this.historial];
  }

  pagar(): void {
    this.estado.pagar(this);
  }

  enviar(): void {
    this.estado.enviar(this);
  }

  entregar(): void {
    this.estado.entregar(this);
  }

  cancelar(): void {
    this.estado.cancelar(this);
  }
}

// 2. Base de estados: las acciones no permitidas se rechazan por defecto.
abstract class EstadoBase implements EstadoPedido {
  abstract readonly nombre: string;

  pagar(pedido: Pedido): void {
    this.rechazar(pedido, "pagar");
  }

  enviar(pedido: Pedido): void {
    this.rechazar(pedido, "enviar");
  }

  entregar(pedido: Pedido): void {
    this.rechazar(pedido, "entregar");
  }

  cancelar(pedido: Pedido): void {
    this.rechazar(pedido, "cancelar");
  }

  protected rechazar(pedido: Pedido, accion: string): void {
    console.log(
      `[Pedido ${pedido.id}] No se puede ${accion} un pedido en estado "${this.nombre}".`,
    );
  }
}

// 3. ConcreteStates: cada uno define sus transiciones válidas.
class PendientePago extends EstadoBase {
  override readonly nombre = "Pendiente de pago";

  override pagar(pedido: Pedido): void {
    pedido.setEstado(new Pagado());
  }

  override cancelar(pedido: Pedido): void {
    pedido.setEstado(new Cancelado("cancelado antes del pago"));
  }
}

class Pagado extends EstadoBase {
  override readonly nombre = "Pagado";

  override enviar(pedido: Pedido): void {
    pedido.setEstado(new Enviado());
  }

  override cancelar(pedido: Pedido): void {
    pedido.setEstado(new Cancelado("reembolso procesado"));
  }
}

class Enviado extends EstadoBase {
  override readonly nombre = "Enviado";

  override entregar(pedido: Pedido): void {
    pedido.setEstado(new Entregado());
  }

  override cancelar(pedido: Pedido): void {
    console.log(
      `[Pedido ${pedido.id}] El pedido ya fue enviado; no se puede cancelar.`,
    );
  }
}

class Entregado extends EstadoBase {
  override readonly nombre = "Entregado";
}

class Cancelado extends EstadoBase {
  override readonly nombre: string;

  constructor(motivo: string) {
    super();
    this.nombre = `Cancelado (${motivo})`;
  }
}

function main(): void {
  console.log("=== State: ciclo de vida de un pedido ===");

  const pedido = new Pedido("PED-001");
  console.log(`\n[Pedido ${pedido.id}] Estado inicial: ${pedido.estadoActual}`);

  pedido.enviar(); // Inválido: todavía no está pagado.
  pedido.pagar(); // Pendiente de pago -> Pagado.
  pedido.pagar(); // Inválido: ya está pagado.
  pedido.enviar(); // Pagado -> Enviado.
  pedido.cancelar(); // Inválido: ya fue enviado.
  pedido.entregar(); // Enviado -> Entregado.
  pedido.cancelar(); // Inválido: ya fue entregado.

  console.log(
    `\n[Pedido ${pedido.id}] Historial: ${
      pedido.historialEstados.join(" -> ")
    }`,
  );

  const cancelado = new Pedido("PED-002");
  console.log(
    `\n[Pedido ${cancelado.id}] Estado inicial: ${cancelado.estadoActual}`,
  );

  cancelado.cancelar(); // Pendiente de pago -> Cancelado.
  cancelado.pagar(); // Inválido: el pedido está cancelado.

  console.log(
    `\n[Pedido ${cancelado.id}] Historial: ${
      cancelado.historialEstados.join(" -> ")
    }`,
  );
}

main();
