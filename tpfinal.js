let pantalla = 0;
let imagenes = [];

let archivos = [
  "pantalla de inicio.jpeg",
  "pantalla 1.jpeg",
  "pantalla 2.jpeg",
  "images/pantalla 3.png"
];

let textos = [
  "",
  "Asterion vive en una casa que no tiene puertas cerradas. Todas están abiertas, de día y de noche, y a cualquiera le da paso. Hoy el patio está en silencio y las galerías lo llaman. ¿Qué hará?",
  "Las galerías recorren pasillos que se repiten. Cada corredor se parece al anterior y Asterion no sabe si camina hacia adelante o vuelve sobre sus pasos. A lo lejos hay una luz, y más cerca, una oscuridad tranquila.",
  "En el patio, Asterion inventa un juego: imagina que otro Asterion, otra versión de sí mismo, viene a visitarlo. Lo recibe con entusiasmo y se prepara para jugar con él."
];

let opcionesTexto = [
  ["Empezar"],
  ["A. Explorar las galerías", "B. Quedarse jugando en el patio"],
  ["C. Ir hacia la luz", "D. Seguir en la oscuridad"],
  ["E. Preguntarle cosas a su otro yo", "F. Cansarse corriendo y dormirse"]
];

let destinos = [
  [1],
  [2, 3],
  [4, 5],
  [6, 7]
];

function setup() {
  createCanvas(800, 450);
  cargarImagenes();
}

function draw() {
  background(0);

  if (pantalla === 0) {
    dibujarInicio();
  } else {
    dibujarPantalla(pantalla);
  }
}

function cargarImagenes() {
  for (let i = 0; i < archivos.length; i++) {
    imagenes.push(null);
    loadImage(
      archivos[i],
      function (img) {
        imagenes[i] = img;
      },
      function () {
        print("No se encontró: " + archivos[i]);
      }
    );
  }
}


function dibujarInicio() {
  background(0);

  textFont("Georgia");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(54);
  fill(90, 0, 0);
  text("La Casa de Asterion", width / 2 + 3, 38 + 3); 
  fill(210, 20, 20);
  text("La Casa de Asterion", width / 2, 38);
  textStyle(NORMAL);

  dibujarImagenCentrada(imagenes[0], width / 2, 205, 480, 260);

  dibujarBoton(300, 355, 200, 55, opcionesTexto[0][0]);
}

function dibujarImagenCentrada(img, cx, cy, maxAncho, maxAlto) {
  if (img === null) {
    return;
  }
  let escala = min(maxAncho / img.width, maxAlto / img.height);
  imageMode(CENTER);
  image(img, cx, cy, img.width * escala, img.height * escala);
  imageMode(CORNER);
}

function dibujarPantalla(num) {
  if (imagenes[num] !== null) {
    image(imagenes[num], 0, 0, width, height);
  } else {
    background(50, 35, 80);
  }

  dibujarCajaTexto(textos[num]);

  let cantidad = opcionesTexto[num].length;
  for (let i = 0; i < cantidad; i++) {
    dibujarBoton(30 + i * 380, 375, 360, 50, opcionesTexto[num][i]);
  }
}

function dibujarCajaTexto(contenido) {
  noStroke();
  fill(0, 190);
  rect(30, 230, 740, 125, 10);

  fill(255);
  textFont("Georgia");
  textStyle(NORMAL);
  textSize(17);
  textAlign(LEFT, TOP);
  text(contenido, 45, 243, 710, 100);
}


function dibujarBoton(x, y, ancho, alto, etiqueta) {
  if (mouseSobre(x, y, ancho, alto)) {
    fill(220, 180, 90);
  } else {
    fill(90, 60, 130);
  }
  stroke(255);
  strokeWeight(2);
  rect(x, y, ancho, alto, 10);

  noStroke();
  fill(255);
  textFont("Georgia");
  textStyle(NORMAL);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(etiqueta, x + ancho / 2, y + alto / 2);
}

function mouseSobre(x, y, ancho, alto) {
  return mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto;
}

function mousePressed() {
  if (pantalla === 0) {
    if (mouseSobre(300, 355, 200, 55)) {
      pantalla = destinos[0][0];
    }
  } else {
    let cantidad = opcionesTexto[pantalla].length;
    for (let i = 0; i < cantidad; i++) {
      if (mouseSobre(30 + i * 380, 375, 360, 50)) {
        let destino = destinos[pantalla][i];
        if (destino < textos.length) {
          pantalla = destino;
        } else {
          print("La pantalla " + destino + " todavía no está creada");
        }
      }
    }
  }
}
