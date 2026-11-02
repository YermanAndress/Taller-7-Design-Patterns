/**
 * PATRÓN: Decorator (Estructural)
 *
 * QUÉ HACE:
 *   Permite agregar responsabilidades a un objeto de forma dinámica,
 *   envolviéndolo en otros objetos (decoradores) que implementan la misma
 *   interfaz. Es una alternativa flexible a la herencia.
 *
 * PROBLEMA QUE RESUELVE:
 *   Una cafetería vende café con extras (leche, azúcar, crema) y el cliente
 *   puede combinarlos como quiera. Con herencia habría que crear una subclase
 *   por cada combinación (CafeConLeche, CafeConLecheYAzucar, ...), lo que
 *   produce una explosión de clases imposible de mantener.
 *
 * POR QUÉ ES ADECUADO:
 *   Cada extra es un decorador pequeño que envuelve a la bebida y suma su
 *   descripción y su costo. Las combinaciones se arman en tiempo de ejecución
 *   anidando objetos, sin crear clases nuevas por cada combinación y sin
 *   modificar la clase Cafe original.
 *
 * CÓMO EJECUTAR:
 *   deno run decorator.task.ts
 */

// 1. Componente: interfaz común de las bebidas y de los decoradores.
export interface Bebida {
  getDescripcion(): string;
  getCosto(): number;
}

// 2. Componente concreto: la bebida base que será decorada.
export class Cafe implements Bebida {
  getDescripcion(): string {
    return "Café";
  }

  getCosto(): number {
    return 3000;
  }
}

// 3. Decorador base: implementa Bebida y guarda la bebida envuelta.
export abstract class DecoradorBebida implements Bebida {
  protected bebida: Bebida;

  constructor(bebida: Bebida) {
    this.bebida = bebida;
  }

  abstract getDescripcion(): string;
  abstract getCosto(): number;
}

// 4. Decoradores concretos: cada uno agrega su extra sobre lo que ya había.
export class ConLeche extends DecoradorBebida {
  getDescripcion(): string {
    return `${this.bebida.getDescripcion()} + leche`;
  }

  getCosto(): number {
    return this.bebida.getCosto() + 1000;
  }
}

export class ConAzucar extends DecoradorBebida {
  getDescripcion(): string {
    return `${this.bebida.getDescripcion()} + azúcar`;
  }

  getCosto(): number {
    return this.bebida.getCosto() + 300;
  }
}

export class ConCrema extends DecoradorBebida {
  getDescripcion(): string {
    return `${this.bebida.getDescripcion()} + crema`;
  }

  getCosto(): number {
    return this.bebida.getCosto() + 1500;
  }
}
