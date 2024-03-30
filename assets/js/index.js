// class Animal {
//     constructor(nombre, imagen, sonido){
//         this.nombre=nombre;
//         this.imagen=imagen;
//         this.sonido=sonido;
//     }
//     //Backtick > Alt }} + ctrl Z to delete 1 par
//     // Metodos
//     reproducirSonido() {
//         console.log(this.sonido);
//     }

//     mostrarInformacion(){
//         console.log(`Nombre: ${this.nombre}`)
//         console.log(`Imagen: ${this.imagen}`)
//         console.log(`Sonido: ${this.sonido}`)
//     }
// }


class Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        this.nombre = nombre;
        this.edad = edad;
        this.img = img;
        this.comentarios = comentarios;
        this.sonido = sonido;
    }

    get Nombre() {
        return this.nombre;
    }

    get Edad() {
        return this.edad;
        }

    get Img() {
        return this.img;
    }

    set Comentarios(comentarios) {
        this.comentarios = comentarios;
    }

    get Sonido() {
        return this.sonido;
    }
}
        
class Leon extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Rugir() {
        console.log(`¡${this.nombre} ruge!`);
    }
}

class Lobo extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Aullar() {
        console.log(`¡${this.nombre} aúlla!`);
    }
}

class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Chillar() {
        console.log(`¡${this.nombre} chilla!`);
    }
}

class Serpiente extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Sisear() {
        console.log(`¡${this.nombre} sisea!`);
    }
}  

class Oso extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Gruñir() {
        console.log(`¡${this.nombre} gruñe!`);
    }
}


fetch('animales.json')

.then(response => response.json())
.then(data => {
    const animalData = data.animales;

    // Event listener para buton Agregar
    document.getElementById('btnRegistrar').addEventListener('click', function() {
    const animalSelect = document.getElementById('animal');
    const selectedAnimal = animalSelect.value;
    const edadSelect = document.getElementById('edad');
    const selectedEdad = edadSelect.value;
    const comentarios = document.getElementById('comentarios').value;

    if (selectedAnimal === 'Seleccione un animal' || selectedEdad === 'Seleccione un rango de años') {
        alert('¡Por favor, selecciona un animal y un rango de edad!');
        return;
    }

    // Encuentra el animal desde animales.json
    const animalInfo = animalData.find(animal => animal.name === selectedAnimal);

    if (!animalInfo) {
        console.error('Error: Animal data not found for:', selectedAnimal);
        return;
    }

    // Crea una instancia del correspondiente animal
    let animalInstance;
    switch (selectedAnimal) {
        case 'Leon':
            animalInstance = new Leon(comentarios, selectedEdad, animalInfo.imagen, animalInfo.sonido);
            break;
            case 'Lobo':
            animalInstance = new Lobo(comentarios, selectedEdad, animalInfo.imagen, animalInfo.sonido);
            break;
            case 'Oso':
            animalInstance = new Oso(comentarios, selectedEdad, animalInfo.imagen, animalInfo.sonido);
            break;
            case 'Serpiente':
            animalInstance = new Serpiente(comentarios, selectedEdad, animalInfo.imagen, animalInfo.sonido);
            break;
            case 'Aguila':
            animalInstance = new Aguila(comentarios, selectedEdad, animalInfo.imagen, animalInfo.sonido);
            break;
            default:
            console.error('Error: Unhandled animal type:', selectedAnimal);
            return;
    }

    // Crea HTML para nuevo animal
        const animalCard = document.createElement('div');
        animalCard.classList.add('card', 'bg-dark', 'text-white', 'm-2', 'shadow');

        const animalCardBody = document.createElement('div');
        animalCardBody.classList.add('card-body');

        const animalImage = document.createElement('img');
        animalImage.classList.add('card-img-top');
        animalImage.src = `assets/imgs/${animalInfo.imagen}`; 

        const animalTitle = document.createElement('h5');
        animalTitle.classList.add('card-title');
        animalTitle.textContent = `${selectedAnimal} - ${selectedEdad}`;

        const animalComments = document.createElement('p');
        animalComments.classList.add('card-text');
        animalComments.textContent = `Comentarios: ${comentarios}`;

        const playSoundButton = document.createElement('button');
        playSoundButton.classList.add('btn', 'btn-light', 'btn-sm', 'd-block', 'mt-2');
        playSoundButton.textContent = 'Reproducir sonido';

        // Funcion play sonido
        playSoundButton.addEventListener('click', function() {
            const audioPlayer = document.getElementById('player');
            audioPlayer.src = `assets/sounds/${animalInfo.sonido}`; 
            audioPlayer.play();
        });

        animalCardBody.appendChild(animalImage);
        animalCardBody.appendChild(animalTitle);
        animalCardBody.appendChild(animalComments);
        animalCardBody.appendChild(playSoundButton);

        animalCard.appendChild(animalCardBody);

        // Agrega un nuevo animal a la card 
        const animalesContainer = document.getElementById('Animales');
        animalesContainer.appendChild(animalCard);

      // Limpia la forma despues de registro exitoso
        animalSelect.selectedIndex = 0;
        edadSelect.selectedIndex = 0;
        comentarios.value = '';
        });
})

.catch(error => console.error('Error fetching animal data:', error));
