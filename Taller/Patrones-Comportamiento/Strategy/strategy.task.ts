/**
 * EJECUCIÓN DEL EJERCICIO: Strategy
 *
 * Cliente que usa una misma instancia de Carrito y cambia la estrategia de
 * descuento en tiempo de ejecución, sin modificar la clase Carrito.
 *
 * CÓMO EJECUTAR:
 *   deno run strategy.task.ts
 */
import { Carrito, DescuentoFijo, DescuentoPorcentaje } from "./strategy.ts";

const carrito = new Carrito();
carrito.agregarProducto(50000);
carrito.agregarProducto(30000);
carrito.agregarProducto(20000); // Subtotal: 100000

console.log("Subtotal de la compra: $100000\n");

console.log(`${carrito.descuentoActual()} -> $${carrito.calcularTotal()}`);

carrito.setEstrategia(new DescuentoPorcentaje(10));
console.log(`${carrito.descuentoActual()} -> $${carrito.calcularTotal()}`);

carrito.setEstrategia(new DescuentoFijo(15000));
console.log(`${carrito.descuentoActual()} -> $${carrito.calcularTotal()}`);
