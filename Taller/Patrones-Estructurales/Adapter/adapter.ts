/**
 * PATRÓN: Adapter (Estructural)
 *
 * QUÉ HACE:
 *   Convierte la interfaz de una clase existente en otra interfaz que el
 *   cliente espera. El adaptador envuelve al objeto incompatible y traduce
 *   sus llamadas.
 *
 * PROBLEMA QUE RESUELVE:
 *   El panel domótico solo sabe trabajar con la interfaz Dispositivo, pero
 *   las lámparas, el aire acondicionado y las persianas vienen de fabricantes
 *   distintos y exponen métodos diferentes (turnOn, startCooling, subir...).
 *   Sin Adapter, el panel tendría que conocer cada API y llenarse de if/else.
 *
 * POR QUÉ ES ADECUADO:
 *   Cada adaptador aísla las diferencias de una API. El panel usa siempre
 *   Dispositivo y se pueden agregar marcas nuevas creando un adaptador, sin
 *   modificar el panel ni las clases originales (principio abierto/cerrado).
 *
 * CÓMO EJECUTAR:
 *   deno run adapter.ts
 */

// 1. Target: interfaz que consume el cliente.
interface Dispositivo {
  readonly nombre: string;
  encender(): void;
  apagar(): void;
  estado(): string;
}

// 2. Adaptees: APIs existentes con interfaces incompatibles.
class LamparaIoT {
  private encendida = false;

  constructor(public readonly ubicacion: string) {}

  turnOn(): void {
    this.encendida = true;
  }

  turnOff(): void {
    this.encendida = false;
  }

  isOn(): boolean {
    return this.encendida;
  }
}

class AireAcondicionadoLegacy {
  private modo: "apagado" | "encendido" = "apagado";

  constructor(public readonly sala: string) {}

  startCooling(): void {
    this.modo = "encendido";
  }

  stop(): void {
    this.modo = "apagado";
  }

  getMode(): "apagado" | "encendido" {
    return this.modo;
  }
}

class PersianaZigbee {
  private posicion = 0; // 0 = cerrada, 100 = abierta

  constructor(public readonly ventana: string) {}

  subir(): void {
    this.posicion = 100;
  }

  bajar(): void {
    this.posicion = 0;
  }

  getPosicion(): number {
    return this.posicion;
  }
}

// 3. Adapters: traducen la interfaz del adaptee a la interfaz Dispositivo.
class AdaptadorLampara implements Dispositivo {
  constructor(private readonly lampara: LamparaIoT) {}

  get nombre(): string {
    return `Lámpara ${this.lampara.ubicacion}`;
  }

  encender(): void {
    this.lampara.turnOn();
  }

  apagar(): void {
    this.lampara.turnOff();
  }

  estado(): string {
    return this.lampara.isOn() ? "encendida" : "apagada";
  }
}

class AdaptadorAire implements Dispositivo {
  constructor(private readonly aire: AireAcondicionadoLegacy) {}

  get nombre(): string {
    return `Aire acondicionado ${this.aire.sala}`;
  }

  encender(): void {
    this.aire.startCooling();
  }

  apagar(): void {
    this.aire.stop();
  }

  estado(): string {
    return this.aire.getMode() === "encendido" ? "encendido (frío)" : "apagado";
  }
}

class AdaptadorPersiana implements Dispositivo {
  constructor(private readonly persiana: PersianaZigbee) {}

  get nombre(): string {
    return `Persiana ${this.persiana.ventana}`;
  }

  encender(): void {
    this.persiana.subir();
  }

  apagar(): void {
    this.persiana.bajar();
  }

  estado(): string {
    return `${this.persiana.getPosicion()}% abierta`;
  }
}

// 4. Client: solo depende de la interfaz Dispositivo.
class PanelDomotico {
  private readonly dispositivos: Dispositivo[] = [];

  agregar(dispositivo: Dispositivo): void {
    this.dispositivos.push(dispositivo);
  }

  encenderTodos(): void {
    console.log("\n[Panel] Encendiendo todos los dispositivos...");
    for (const dispositivo of this.dispositivos) {
      dispositivo.encender();
      console.log(`  ${dispositivo.nombre}: ${dispositivo.estado()}`);
    }
  }

  apagarTodos(): void {
    console.log("\n[Panel] Apagando todos los dispositivos...");
    for (const dispositivo of this.dispositivos) {
      dispositivo.apagar();
      console.log(`  ${dispositivo.nombre}: ${dispositivo.estado()}`);
    }
  }

  mostrarEstado(): void {
    console.log("\n[Panel] Estado actual:");
    for (const dispositivo of this.dispositivos) {
      console.log(`  ${dispositivo.nombre}: ${dispositivo.estado()}`);
    }
  }
}

function main(): void {
  console.log("=== Adapter: panel domótico ===");

  const panel = new PanelDomotico();

  // El panel no sabe que estos objetos tienen APIs diferentes: solo ve Dispositivo.
  panel.agregar(new AdaptadorLampara(new LamparaIoT("sala")));
  panel.agregar(new AdaptadorAire(new AireAcondicionadoLegacy("habitación")));
  panel.agregar(new AdaptadorPersiana(new PersianaZigbee("ventana principal")));

  panel.mostrarEstado();
  panel.encenderTodos();
  panel.apagarTodos();
}

main();
