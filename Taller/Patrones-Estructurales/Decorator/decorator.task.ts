/**
 * EJECUCIÓN DEL EJERCICIO: Decorator
 *
 * Cliente que arma distintas combinaciones de bebida apilando decoradores
 * sobre un Cafe, sin crear una subclase por cada combinación.
 *
 * CÓMO EJECUTAR:
 *   deno run decorator.task.ts
 */
import type { Bebida } from "./decorator.ts";
import { Cafe, ConAzucar, ConCrema, ConLeche } from "./decorator.ts";

function imprimir(bebida: Bebida): void {
  console.log(`${bebida.getDescripcion()} -> $${bebida.getCosto()}`);
}

const pedido1: Bebida = new Cafe();
imprimir(pedido1);

const pedido2: Bebida = new ConLeche(new Cafe());
imprimir(pedido2);

// Se pueden apilar los extras que se quiera, incluso repetidos.
const pedido3: Bebida = new ConCrema(new ConAzucar(new ConLeche(new Cafe())));
imprimir(pedido3);
