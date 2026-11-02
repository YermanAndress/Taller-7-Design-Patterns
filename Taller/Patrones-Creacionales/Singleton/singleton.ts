/**
 * PATRÓN: Singleton (Creacional)
 *
 * QUÉ HACE:
 *   Garantiza que una clase tenga una única instancia y ofrece un punto de
 *   acceso global a ella.
 *
 * PROBLEMA QUE RESUELVE:
 *   Varios servicios de una aplicación necesitan escribir en el mismo registro
 *   de auditoría. Si cada servicio creara su propio registro, los eventos
 *   quedarían dispersos y no habría una historia única de lo que ocurrió.
 *
 * POR QUÉ ES ADECUADO:
 *   El registro tiene un constructor privado y solo se obtiene mediante
 *   getInstance(). Todos los servicios reciben la misma instancia y comparten
 *   el mismo historial, sin pasar el registro manualmente por todas partes.
 *
 * CÓMO EJECUTAR:
 *   deno run singleton.ts
 */

class RegistroAuditoria {
  private static instancia: RegistroAuditoria | null = null;
  private readonly eventos: string[] = [];

  private constructor() {
    console.log("[Singleton] Registro de auditoría creado.");
  }

  static getInstance(): RegistroAuditoria {
    if (!RegistroAuditoria.instancia) {
      RegistroAuditoria.instancia = new RegistroAuditoria();
    }

    return RegistroAuditoria.instancia;
  }

  registrar(servicio: string, mensaje: string): void {
    const evento = `[${this.eventos.length + 1}] ${servicio}: ${mensaje}`;
    this.eventos.push(evento);
    console.log(evento);
  }

  obtenerEventos(): readonly string[] {
    return [...this.eventos];
  }

  limpiar(): void {
    this.eventos.length = 0;
  }
}

// Servicios que usan el registro compartido.
class ServicioAutenticacion {
  private readonly registro = RegistroAuditoria.getInstance();

  iniciarSesion(usuario: string): void {
    this.registro.registrar("Auth", `Inicio de sesión de ${usuario}`);
  }
}

class ServicioPedidos {
  private readonly registro = RegistroAuditoria.getInstance();

  crearPedido(id: string): void {
    this.registro.registrar("Pedidos", `Pedido ${id} creado`);
  }

  cancelarPedido(id: string): void {
    this.registro.registrar("Pedidos", `Pedido ${id} cancelado`);
  }
}

function main(): void {
  console.log("=== Singleton: registro de auditoría ===");

  const auth = new ServicioAutenticacion();
  const pedidos = new ServicioPedidos();

  auth.iniciarSesion("ana");
  pedidos.crearPedido("PED-001");
  pedidos.cancelarPedido("PED-001");

  const registro1 = RegistroAuditoria.getInstance();
  const registro2 = RegistroAuditoria.getInstance();

  console.log(
    `\n¿registro1 y registro2 son la misma instancia? ${
      registro1 === registro2 ? "Sí" : "No"
    }`,
  );
  console.log(`Eventos compartidos: ${registro1.obtenerEventos().length}`);

  console.log("\nHistorial completo:");
  for (const evento of registro1.obtenerEventos()) {
    console.log(`  ${evento}`);
  }
}

main();