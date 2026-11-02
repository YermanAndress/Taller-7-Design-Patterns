/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from '../../helpers/colors.ts';

interface Hamburger {
    prepare(): void;
}

class ChickenHamburger implements Hamburger {
    prepare(){
        console.log('Preparando Hamburguesa de %cPollo', COLORS.yellow);
    }
}

class BeefHamburger implements Hamburger {
    prepare(){
        console.log('Preparando Hamburguesa de %cRes', COLORS.brown);
    }
}

class SpicyHamburger implements Hamburger {
    prepare(){
        console.log('Preparando Hamburguesa de %cPicante', COLORS.red);
    }
}

abstract class RestaurantFactory {
    protected abstract createHamburger(): Hamburger;

    orderHamburger(): void {
        const hamburguer = this.createHamburger();
        hamburguer.prepare();
    }

}

class ChickenRestaurant extends RestaurantFactory {
    createHamburger(): Hamburger {
        return new ChickenHamburger();
    }
}

class BeefRestaurant extends RestaurantFactory {
    createHamburger(): Hamburger {
        return new BeefHamburger();
    }
}

class SpicyRestaurant extends RestaurantFactory {
    createHamburger(): Hamburger {
        return new SpicyHamburger();
    }
}

function main(){
    let restaurant: RestaurantFactory;
    
    const burgerType = prompt('¿Qué tipo de hamburguesa quieres? (Chicken/Beef/Spicy)');
    switch(burgerType){
        case 'Chicken': 
            restaurant = new ChickenRestaurant();
            break;
        case 'Beef': 
            restaurant = new BeefRestaurant();
            break;
        case 'Spicy': 
            restaurant = new SpicyRestaurant();
            break;
        default:
            throw new Error('Opción no Válida');
    }

    restaurant.orderHamburger();

}

main();