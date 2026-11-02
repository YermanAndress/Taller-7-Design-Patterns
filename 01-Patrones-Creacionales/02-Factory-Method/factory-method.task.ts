/**
 * EJECUCIÓN DEL EJERCICIO: Factory Method
 *
 * Cliente que usa únicamente el creador abstracto (CreadorNotificacion).
 * Nunca instancia NotificacionEmail, NotificacionSMS ni NotificacionPush
 * directamente: cada creador concreto decide qué producto fabricar.
 *
 * CÓMO EJECUTAR:
 *   deno run factory-method.task.ts
 */
import {
  CreadorEmail,
  CreadorNotificacion,
  CreadorPush,
  CreadorSMS,
} from "./factory-method.ts";

const canales: CreadorNotificacion[] = [
  new CreadorEmail(),
  new CreadorSMS(),
  new CreadorPush(),
];

// El mismo código sirve para cualquier canal.
for (const canal of canales) {
  canal.notificar("Tu pedido fue enviado");
}
