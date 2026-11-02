# Taller de Patrones de Diseño

El objetivo del taller es analizar problemas reales y resolverlos aplicando
patrones de diseño, documentando en cada ejercicio qué hace el patrón, qué
problema resuelve y por qué es una solución adecuada.

## Integrantes

- Angela Patricia Aponte Escudero
- German Andres Rojas Cardona
- Nicolle Daniela Valverde Gallego

## Patrones del taller

| #   | Patrón             | Tipo           | Ejercicio                                                              | Ubicación                                            |
| --- | ------------------ | -------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | **Builder**        | Creacional     | Construcción paso a paso de objetos complejos                          | `Taller/Patrones-Creacionales/Builder/`              |
| 2   | **Factory Method** | Creacional     | Notificaciones por correo, SMS y push mediante creadores concretos     | `Taller/Patrones-Creacionales/Factory-Method/`       |
| 3   | **Singleton**      | Creacional     | Instancia única de un recurso compartido                               | `Taller/Patrones-Creacionales/Singleton/`            |
| 4   | **Adapter**        | Estructural    | Integración de dispositivos domóticos con interfaces incompatibles     | `Taller/Patrones-Estructurales/Adapter/`             |
| 5   | **Decorator**      | Estructural    | Café con extras que se agregan dinámicamente                           | `Taller/Patrones-Estructurales/Decorator/`           |
| 6   | **Flyweight**      | Estructural    | Fichas bibliográficas compartidas por muchos ejemplares                | `Taller/Patrones-Estructurales/Flyweight/`           |
| 7   | **Command**        | Comportamiento | Encapsulación de solicitudes como objetos                              | `Taller/Patrones-Comportamiento/Command/`            |
| 8   | **Observer**       | Comportamiento | Subasta que notifica a postores y a un registro de auditoría           | `Taller/Patrones-Comportamiento/Observer/`           |
| 9   | **State**          | Comportamiento | Ciclo de vida de un pedido online con transiciones válidas e inválidas | `Taller/Patrones-Comportamiento/State/`              |
| 10  | **Strategy**       | Comportamiento | Descuentos intercambiables en un carrito de compras                    | `Taller/Patrones-Comportamiento/Strategy/`           |

## Estructura del repositorio

```text
Taller/
├── Patrones-Creacionales/
│   ├── Builder/
│   ├── Factory-Method/
│   └── Singleton/
├── Patrones-Estructurales/
│   ├── Adapter/
│   ├── Decorator/
│   └── Flyweight/
└── Patrones-Comportamiento/
    ├── Command/
    ├── Observer/
    ├── State/
    └── Strategy/
```

## Requisitos

- [Deno](https://deno.com/) 2.x

## Ejecución

Cada ejercicio es independiente y se ejecuta desde la raíz del repositorio.

### Ejercicios del grupo

```bash
# Factory Method
deno run Taller/Patrones-Creacionales/Factory-Method/factory-method.task.ts

# Builder
deno run Taller/Patrones-Creacionales/Builder/builder.ts

# Singleton
deno run Taller/Patrones-Creacionales/Singleton/singleton.ts

# Decorator
deno run Taller/Patrones-Estructurales/Decorator/decorator.task.ts

# Adapter
deno run Taller/Patrones-Estructurales/Adapter/adapter.ts

# Flyweight
deno run Taller/Patrones-Estructurales/Flyweight/flyweight.ts

# Command
deno run Taller/Patrones-Comportamiento/Command/command.ts

# Observer
deno run Taller/Patrones-Comportamiento/Observer/observer.ts

# State
deno run Taller/Patrones-Comportamiento/State/state.ts

# Strategy
deno run Taller/Patrones-Comportamiento/Strategy/strategy.task.ts
```

### Verificación

```bash
deno check <archivo.ts>
deno lint <archivo.ts>
deno fmt --check <archivo.ts>
```

## Documentación de los ejercicios

Cada ejercicio incluye comentarios con:

- **Qué hace el patrón.**
- **Qué problema se está resolviendo.**
- **Por qué ese patrón es adecuado para el problema.**
- **Cómo ejecutar el ejercicio.**

Además, el código está dividido en roles comentados (por ejemplo: `Target`,
`Adaptee`, `Adapter`, `Flyweight`, `Factory`, `Subject`, `Observer`, `Context` y
`State`).

## Recursos

- [Refactoring Guru — Patrones de diseño](https://refactoring.guru/es/design-patterns)
- [Design Patterns for Humans](https://github.com/kamranahmedse/design-patterns-for-humans)
- [Patterns.dev](https://www.patterns.dev/)
- [Java Design Patterns](https://github.com/iluwatar/java-design-patterns)
- [Design Patterns in TypeScript](https://github.com/torokmark/design_patterns_in_typescript)
