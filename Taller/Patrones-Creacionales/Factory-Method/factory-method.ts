/**
 * PATRÓN: Factory Method (Creacional)
 *
 * QUÉ HACE:
 *   Define un método para crear objetos en una clase base, pero deja que
 *   las subclases decidan qué clase concreta se instancia. El código cliente
 *   trabaja con la interfaz del producto y no con las clases concretas.
 *
 * PROBLEMA QUE RESUELVE:
 *   Una aplicación debe enviar notificaciones por correo, SMS o push. Si el
 *   código cliente crea los objetos con "new NotificacionEmail()" directamente,
 *   queda acoplado a cada clase concreta y agregar un canal nuevo obliga a
 *   modificar ese código en todos los lugares donde se usa.
 *
 * POR QUÉ ES ADECUADO:
 *   La decisión de qué notificación crear se mueve a un método fábrica que
 *   sobrescribe cada subclase. El cliente solo llama a notificar() y no sabe
 *   (ni le importa) qué canal se usa. Para agregar WhatsApp, por ejemplo,
 *   solo se crean dos clases nuevas sin modificar el código existente.
 *
 * CÓMO EJECUTAR:
 *   deno run factory-method.task.ts
 */

// 1. Producto: interfaz común de todas las notificaciones.
export interface Notificacion {
  enviar(mensaje: string): void;
}

// 2. Productos concretos: cada canal implementa su propia forma de enviar.
export class NotificacionEmail implements Notificacion {
  enviar(mensaje: string): void {
    console.log(`[EMAIL] Enviando correo: ${mensaje}`);
  }
}

export class NotificacionSMS implements Notificacion {
  enviar(mensaje: string): void {
    console.log(`[SMS] Enviando mensaje de texto: ${mensaje}`);
  }
}

export class NotificacionPush implements Notificacion {
  enviar(mensaje: string): void {
    console.log(`[PUSH] Enviando notificación al celular: ${mensaje}`);
  }
}

// 3. Creador: declara el método fábrica y usa el producto que este devuelve.
export abstract class CreadorNotificacion {
  // MÉTODO FÁBRICA: cada subclase decide qué objeto crear.
  protected abstract crearNotificacion(): Notificacion;

  // Lógica común que usa el producto sin conocer su clase concreta.
  notificar(mensaje: string): void {
    const notificacion = this.crearNotificacion();
    notificacion.enviar(mensaje);
  }
}

// 4. Creadores concretos: sobrescriben el método fábrica.
export class CreadorEmail extends CreadorNotificacion {
  protected crearNotificacion(): Notificacion {
    return new NotificacionEmail();
  }
}

export class CreadorSMS extends CreadorNotificacion {
  protected crearNotificacion(): Notificacion {
    return new NotificacionSMS();
  }
}

export class CreadorPush extends CreadorNotificacion {
  protected crearNotificacion(): Notificacion {
    return new NotificacionPush();
  }
}
