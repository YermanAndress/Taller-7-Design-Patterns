/**
 * PATRÓN: Strategy (Comportamiento)
 *
 * QUÉ HACE:
 *   Define una familia de algoritmos, encapsula cada uno en su propia clase
 *   y los hace intercambiables. El objeto que los usa (contexto) puede
 *   cambiar de algoritmo en tiempo de ejecución sin modificarse.
 *
 * PROBLEMA QUE RESUELVE:
 *   Una tienda necesita calcular el total de una compra aplicando distintos
 *   tipos de descuento (ninguno, por porcentaje, por valor fijo). Si se
 *   resuelve con if/else dentro del carrito, cada descuento nuevo obliga a
 *   modificar esa clase, que se vuelve larga, frágil y difícil de probar.
 *
 * POR QUÉ ES ADECUADO:
 *   Cada tipo de descuento queda en una clase independiente que implementa
 *   la misma interfaz. El carrito solo conoce la interfaz, así que se pueden
 *   agregar descuentos nuevos sin tocar el carrito (principio abierto/cerrado)
 *   y se elige el descuento en tiempo de ejecución (por ejemplo, según el cliente).
 *
 * CÓMO EJECUTAR:
 *   deno run strategy.task.ts
 */

// 1. Interfaz Strategy: contrato común que todos los descuentos cumplen.
export interface EstrategiaDescuento {
  aplicar(total: number): number;
  nombre(): string;
}

// 2. Estrategias concretas: cada una implementa un algoritmo distinto.
export class SinDescuento implements EstrategiaDescuento {
  aplicar(total: number): number {
    return total; // No se modifica el total.
  }

  nombre(): string {
    return "Sin descuento";
  }
}

export class DescuentoPorcentaje implements EstrategiaDescuento {
  private porcentaje: number; // Ej: 10 significa 10 %

  constructor(porcentaje: number) {
    this.porcentaje = porcentaje;
  }

  aplicar(total: number): number {
    return total - (total * this.porcentaje) / 100;
  }

  nombre(): string {
    return `Descuento del ${this.porcentaje} %`;
  }
}

export class DescuentoFijo implements EstrategiaDescuento {
  private monto: number;

  constructor(monto: number) {
    this.monto = monto;
  }

  aplicar(total: number): number {
    return Math.max(0, total - this.monto); // El total nunca queda negativo.
  }

  nombre(): string {
    return `Cupón de $${this.monto}`;
  }
}

// 3. Contexto: usa una estrategia sin saber cuál es en concreto.
export class Carrito {
  private subtotal = 0;
  private estrategia: EstrategiaDescuento = new SinDescuento(); // Por defecto.

  agregarProducto(precio: number): void {
    this.subtotal += precio;
  }

  // Permite cambiar el algoritmo en tiempo de ejecución.
  setEstrategia(estrategia: EstrategiaDescuento): void {
    this.estrategia = estrategia;
  }

  calcularTotal(): number {
    // El carrito delega el cálculo en la estrategia actual.
    return this.estrategia.aplicar(this.subtotal);
  }

  descuentoActual(): string {
    return this.estrategia.nombre();
  }
}
