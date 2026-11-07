//Dimensioni virtuali del gioco (tutte le coordinate sono riferite a queste)
const GAME_W = 1920;
const GAME_H = 1080;

// Debug: premi H durante il gioco per vedere le hitbox
let debugHitbox = false;
function disegnaHitbox(h) {
  push();
  noFill(); stroke(0, 255, 0); strokeWeight(2);
  rectMode(CORNERS);
  rect(h.l, h.t, h.r, h.b);
  pop();
}

//Gestione livelli e schermate
let livello = 0;
let livelloPrima = 2; // livello da cui si e' entrati in pausa
let pausaInizio = 0;  // istante in cui e' iniziata la pausa

// Hitbox livello 3 (margini interni, in px)
const HIT_G_X = 20;
const HIT_G_Y = 12;

//Schermata Home
let font1; //font testo
let font2; //font intro
let giocatoreHome; //personaggio della home che si muove
let velPersonaggioHome = 5; //velocità personaggio schermata home
let imgGiocatoreHome; //gif giocatore nella home
let imgLupoHome; //Immagine lupo home
let musicaHome;//musica di sottofondo
let lettere = []; // Array contenente le lettere
let yPos; // Posizione verticale iniziale del testo
let speed = 1; // Velocità di caduta del testo
let imgGiocatore;

//Generali
let rectWidth = 500; // Larghezza del rettangolo //di qualsiasi livello 
let rectHeight = 120; // Altezza del rettangolo // qualsiasi livello 
let ultimoLivello; //Ultimo livello visitato
let interval = 0; //Gestisce il tempo in cui mostrare le schermate (gameOver, )
let imgGiocatoreFermoDestra; //Immagine hog fermo destra


//Schermata livelli
let rettangoloClick = -1; // Indice del rettangolo cliccato, -1 se nessuno è stato cliccato
let nLivelli = 3; // Numero di rettangoli = numero livelli
let totalHeight = nLivelli * (rectHeight + 50); // Altezza totale dei rettangoli, includendo spazi vuoti
let startY; // Posizione Y in modo che i rettangoli siano centrati verticalmente
let testoScorr = "Cerca di sopravvivere il piu' possibile! I livelli vanno dal più difficile al più facile, scegli con attenzione!"; //Testo informazioni scorrimento
let x; // Posizione iniziale del testo (partendo dalla destra)
let y; // Posizione verticale del testo
let velocitaScorrimento = 3; //Velocità scorrimento 
let imgHogLivelli;
let imgLarryLivelli;

//Game over
let imgGameOver;
let musicaGameOver;


// Spazio livello1
let timerId; // Variabile per memorizzare l'ID del timer (non piu' usato, tenuto per compatibilita')
let ultimoSpawnCerchi = 0; // millis() dell'ultima ondata di asteroidi
const INTERVALLO_ASTEROIDI = 5000; // ms tra un'ondata di asteroidi e l'altra
const MAX_ASTEROIDI = 28; // massimo asteroidi contemporanei
let giocatoreLiv1; //Giocatore
let cerchi = []; //Array che contiene le palline
let intervalloPalline; //Intervallo che gestisce dopo quanto tempo appaiono nuove palline 
let imgAsteroide; //immagine asteroide
let partenzaX = -30; //x di partenza degli asteroidi
let imgHogSpazio; //Personaggio immagine
let imgSfondoLv1; // immagine sfondo livello 1
let x1 = 0; //X iniziale dello sfondo che si muove
let x2; //X finale
let velScorrSfondo = 2; //Velocità di scorrimento
let musicaLivello1;
let tempoInizio; //Segnare il tempo in cui si gioca
let punteggioMigliore1 = 0; //Punteggio migliore
let tempoTrascorso = 0; //Tempo in cui si è vivi
let punteggio = 0; //Punteggio

//Livello 2
let primo = false;
let punteggioMigliore2 = 0; //Punteggio migliore
let punteggio2 = 0;  //Punteggio
let musicaLivello2win; //Musica vittoria
let musicaLiv2;
let imgSfondoLiv2;
let giocatoreLiv2; //Creo giocatore
let imgLupo;
let imgFine;
let lupo; //Creo avversario
let cerchioX, cerchioY; // Posizione del cerchio
let diametroCerchio = 72; // Diametro del cerchio (si restringe man mano che si avanza)
let tempoVisualizzazione = 1300; // millisecondi in cui si vede il cerchio (diminuisce avanzando)
const START_X_LIV2 = 200; // partenza uguale per giocatore e lupo (punteggio iniziale 0)
const FINISH_X_LIV2 = 1910; // traguardo
const PASSO_LIV2 = 70; // quanto avanza chi clicca (o il lupo se sbagli)
let targetGiocatore2 = START_X_LIV2; // posizione "vera" (il disegno la raggiunge con un'animazione fluida)
let targetLupo2 = START_X_LIV2;
let cerchioAttivo = false;
let cerchioScadenza = 0;
let prossimoCerchioAt = 0;
let tempoInizioVisualizzazione; // Tempo iniziale di visualizzazione
let cerchioCliccato = false; // Flag per controllare se il cerchio è stato cliccato

//Livello 3 Race
let velocitaScheletri = 7.5; // Velocità corrente degli ostacoli (aumenta col tempo)
let velocitaNuvole;  // Velocità iniziale delle nuvole
let velocitaUccelli = 7.5; //Velocità uccelli (uguale agli scheletri)
let musicaLivello3;
let scheletri = []; //Nemici scheletri
let punteggioMigliore3 = 0 //Punteggio migliore
let giocatoreLiv3; //Giocatore
let nuvole = []; // Array per tenere traccia delle nuvole
let uccelli = [];// Array per tenere traccia uccelli
let ultimoTempoNuvola = 0; // Variabile per tenere traccia dell'ultimo tempo in cui è apparsa una nuvola
let intervalloNuvole = 3000; // Intervallo di tempo tra l'apparizione di nuvole
let punteggio3 = 0;  //Punteggio
let tempoInizio3; //Tempo 
let tempoTrascorso3 = 0; //In cui si è vivi
let jump = false; //Per vedere se il giocatore ha saltato
let ySpeed = 0; //Velocità di salto
const VEL_SALTO = -9.5; // Impulso di salto
const GRAVITA = 0.3; // Gravità per frame
const VEL_START3 = 9.5; // Velocità iniziale del livello 3 (px/frame)
const VEL_MAX3 = 18;    // Velocità massima
const DURATA_RAMPA3 = 100; // Secondi per arrivare alla velocità massima
let FRAME_ARIA = 60;      // Frame di un salto completo (calcolato da simulaSalto)
let FINESTRA_SALTO = 40;  // Frame in cui si e' abbastanza in alto per scavalcare un ostacolo alto (calcolato)
let stelle = [];          // Sfondo stellato del livello 3
let offsetTerreno = 0;    // Scorrimento del terreno
let distTrascorsa = 0; // Distanza (px) percorsa dall'ultimo ostacolo generato
let distProssimoOstacolo = 1000; // Distanza dopo cui generare il prossimo ostacolo
let imgLarry;
let imgUccello;
let puoSaltare = false; //Massimo due salti di fila
let musicaLiv3;

//Schermata Pausa
let imgHogPausa;
let imgSgherroPausa;


function preload() {
  //caricare immagini giocatore, oggetti e nemici
  imgGiocatore = loadImage('./img/hog.gif');
  imgGiocatoreFermoDestra = loadImage('./img/hogFermoDestra.gif');
  imgGiocatoreHome = loadImage('./img/hogHome.png');
  imgUccello = loadImage('./img/bird.gif');
  imgLupo = loadImage('./img/wolf.gif');
  imgFine = loadImage('./img/fine.png');
  imgLupoHome = loadImage('./img/lupoHome.png');
  imgHogLivelli = loadImage('./img/livelliHog.png');
  imgLarryLivelli = loadImage('./img/larryLivelli.png');
  imgAsteroide = loadImage('./img/asteroide.png');
  imgHogSpazio = loadImage('./img/hogSpace.png');
  imgSfondoLv1 = loadImage('./img/spazio.png');
  imgLarry = loadImage('./img/larry.gif');
  imgGameOver = loadImage('./img/hogTriste.gif');
  imgSfondoLiv2 = loadImage('./img/sfondoLiv2.jpg');
  imgHogPausa = loadImage('./img/pausaHog.png');
  imgSgherroPausa = loadImage('./img/eagle.png');
  //carico font per i testi
  font1 = loadFont('./font/minecraft/Minecraft.ttf');
  font2 = loadFont('./font/intro/intro.ttf');
  //carico suono
  musicaHome = loadSound('./sound/homeSound.mp3');
  musicaLivello1 = loadSound('./sound/Tycho.mp3');
  musicaLivello2win = loadSound('./sound/vittoria.mp3');
  musicaLiv2 = loadSound('./sound/mario.mp3');
  musicaLiv3 = loadSound('./sound/hog.mp3');
  musicaGameOver = loadSound('./sound/gameOver.mp3');
}


function setup() {

  // Risoluzione VIRTUALE fissa: tutto il gioco e' disegnato su 1920x1080 e il canvas
  // viene poi scalato via CSS per adattarsi a qualsiasi schermo (PC, tablet, ...)
  pixelDensity(1); // necessario anche per la collisione pixel-per-pixel con get()
  let cnv = createCanvas(GAME_W, GAME_H); //creo lo schermo di gioco
  cnv.parent(document.body);
  // Qualsiasi click o tasto sblocca l'audio (cosi' la musica della home parte subito)
  window.addEventListener('pointerdown', () => userStartAudio());
  window.addEventListener('keydown', () => userStartAudio());
  adattaCanvas();
  frameRate(60);
  textAlign(CENTER, CENTER);
  caricaRecord();
  simulaSalto();
  for (let i = 0; i < 80; i++) stelle.push({ x: random(width), y: random(height - 220), s: random(1, 3) });

  //Livello 1
  x2 = width;
  x = width + 2000;
  y = height / 2 + 450;
  yPos = height / 2 + 360

  giocatoreHome = new Giocatore(150, 150, height - 350); //Creo giocatore per la home
  giocatoreLiv2 = new Giocatore(120, 120, height - 350); //Creo giocatore livello 2
  lupo = new Giocatore(140, 160, height - 450); //Creo lupo avversario livello 2
  giocatoreLiv1 = new GiocatoreSpazioLv1(70, 59); //Creo il giocatore per il livello 1 (proporzioni dello sprite)
  giocatoreLiv3 = new Giocatore(90, 90, height - 290); //Creo giocatore livello 3


  giocatoreLiv2.x = START_X_LIV2; // Posizione del giocatore nel livello 2
  lupo.x = START_X_LIV2; // il lupo parte alla pari

  //Livello Home
  // Aggiungi ogni lettera del testo nell'array
  let textString = "Benvenuto/a, sarai pronto/a ad affrontare tutte le sfide proposte? Vedremo se avrai la stoffa giusta!";
  for (let i = 0; i < textString.length; i++) {
    lettere.push({
      char: textString.charAt(i),
      yPos: yPos,
      speed: random(1, 3)
    });
  }

  //Menu livelli
  startY = (height - totalHeight) / 2; // Posizione Y in modo che i rettangoli siano centrati verticalmente nel menu dei livelli
}

// ---- Record salvati nel browser (restano anche dopo aver chiuso la pagina)
function caricaRecord() {
  try {
    punteggioMigliore1 = Number(localStorage.getItem('hog_rec1')) || 0;
    punteggioMigliore2 = Number(localStorage.getItem('hog_rec2')) || 0;
    punteggioMigliore3 = Number(localStorage.getItem('hog_rec3')) || 0;
  } catch (e) { /* localStorage non disponibile: i record valgono solo per la sessione */ }
}
function salvaRecord() {
  try {
    localStorage.setItem('hog_rec1', punteggioMigliore1);
    localStorage.setItem('hog_rec2', punteggioMigliore2);
    localStorage.setItem('hog_rec3', punteggioMigliore3);
  } catch (e) { }
}

// Simula la fisica del salto per sapere quanto dura e per quanti frame si e' abbastanza in alto
// da scavalcare l'ostacolo piu' alto: serve a generare solo ostacoli sempre superabili
function simulaSalto() {
  const H_MAX = 80; // altezza da superare per l'ostacolo piu' alto (uccello basso)
  let rise = 0, v = VEL_SALTO, frames = 0, sopra = 0;
  do {
    rise -= v; // v e' negativo: sale
    v += GRAVITA;
    frames++;
    if (rise >= H_MAX) sopra++;
  } while (rise > 0 && frames < 500);
  FRAME_ARIA = frames;
  FINESTRA_SALTO = sopra;
}

// Pausa / ripresa: al ripristino sposto in avanti i timer cosi' il tempo in pausa non conta
function mettiInPausa() {
  livelloPrima = livello;
  pausaInizio = millis();
  livello = 6;
}
function riprendi() {
  let d = millis() - pausaInizio;
  if (tempoInizio) tempoInizio += d;
  if (tempoInizio3) tempoInizio3 += d;
  ultimoSpawnCerchi += d;
  prossimoCerchioAt += d;
  cerchioScadenza += d;
  livello = livelloPrima;
}

// I browser bloccano l'audio finché l'utente non interagisce con la pagina
function audioPronto() {
  return getAudioContext().state === 'running';
}

// Scala il canvas mantenendo le proporzioni 16:9 e centrandolo (bande nere se serve)
function adattaCanvas() {
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let scala = Math.min(vw / GAME_W, vh / GAME_H);
  let c = document.querySelector('canvas');
  if (c) {
    c.style.width = Math.floor(GAME_W * scala) + 'px';
    c.style.height = Math.floor(GAME_H * scala) + 'px';
  }
}

function windowResized() {
  adattaCanvas();
}

// Salto del livello 3
function saltaLivello3() {
  if (giocatoreLiv3.numeroSalti < 2) { // Massimo due salti consecutivi (doppio salto)
    ySpeed = VEL_SALTO; // Velocità di salto
    jump = true;
    giocatoreLiv3.numeroSalti++;
    puoSaltare = true;
  }
}

function draw() {
  // Ogni frame riparte da uno stato di disegno pulito: prima il contorno (stroke) lasciato
  // dal livello 2 si "trascinava" nel menu livelli e faceva sembrare il font diverso
  noStroke();
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  imageMode(CORNER);
  velocitaNuvole = random(1, 5); //Velocità casuale nuvole

  if (livello == 0) {
    //Livello Start
    menuStart();
  }

  else if (livello == 1) {
    //Livelli
    menuLivelli();
  }

  else if (livello == 2) {
    //Livello Asteoridi
    livello1();
  }

  else if (livello == 3) {
    //Corsa sprint
    livello2();
  }

  else if (livello == 4) {
    //Livello Ostacoli
    livello3();
  }

  else if (livello == 5) {
    //Schermata gameOver
    gameOver();
  }

  else if (livello == 6) {
    //Schermata Pausa, restart e resume
    menuPausa();
  }
  else if (livello == 7) {
    //In caso di vittoria nel livello 3(2)
    vittoria();
  }
  else if (livello == 8) { //Istruzioni livello 1 asteroidi
    istruzioni1();
  }
  else if (livello == 9) { //Istruzioni livello 1 gara
    istruzioni2();
  }
  else if (livello == 10) { //Istruzioni livello 1 ostacoli
    istruzioni3();
  }
}


function keyPressed() {
  // H = mostra/nasconde le hitbox (debug)
  if (key === 'h' || key === 'H') debugHitbox = !debugHitbox;
  // F = schermo intero
  if (key === 'f' || key === 'F') fullscreen(!fullscreen());

  if (livello == 2 || livello == 3 || livello == 4) { // Nei livelli ESC mette in pausa
    if (keyCode === ESCAPE) {
      mettiInPausa();
      return false;
    }
  } else if (livello == 6) { // In pausa ESC riprende
    if (keyCode === ESCAPE) {
      riprendi();
      return false;
    }
  }

  // Salta le schermate di attesa premendo un tasto
  if ((livello == 5 || livello == 7) && interval > 45 && keyCode !== ESCAPE) {
    resetAll();
    return false;
  }
  if (livello >= 8 && livello <= 10 && interval > 20 && key !== 'h' && key !== 'H' && key !== 'f' && key !== 'F') {
    avviaDaIstruzioni();
    return false;
  }

  if (livello == 4) { // Nel livello 3 salto con spazio o freccia in su
    if (key === ' ' || keyCode === UP_ARROW) {
      saltaLivello3();
      return false; // evita lo scroll della pagina con la barra spaziatrice
    }
  }
}

function avviaDaIstruzioni() {
  if (livello == 8) livello = 2;
  else if (livello == 9) livello = 3;
  else if (livello == 10) livello = 4;
  interval = 0;
}

// Livello 2: reagisco al PRESSIONE del mouse (non al rilascio) per essere piu' reattivo
function mousePressed() {
  userStartAudio();
  if (livello == 3 && cerchioAttivo &&
    dist(mouseX, mouseY, cerchioX, cerchioY) <= diametroCerchio / 2 + 8) {
    cerchioAttivo = false;
    cerchioCliccato = true;
    targetGiocatore2 += PASSO_LIV2;
    prossimoCerchioAt = millis() + 300;
  }
}

// Funzione per gestire il click del mouse
function mouseClicked() {
  userStartAudio(); // i browser bloccano l'audio finché l'utente non interagisce

  //Il mouse nel livello 0
  if (livello == 0) {
    // Controlla se il mouse è sopra il rettangolo quando viene cliccato
    let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
    let rectY = (height - rectHeight) / 2; // Posizione Y del rettangolo
    if (mouseX > rectX && mouseX < rectX + rectWidth && mouseY > rectY && mouseY < rectY + rectHeight) {
      livello = 1; //Imposto il livello a 1
    }
  }
  //Il mouse nella schermata dei livelli
  else if (livello == 1) {
    let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
    for (let i = 0; i < nLivelli; i++) {
      let rectY = startY + i * (rectHeight + 50); // Calcola la posizione Y per il rettangolo corrente
      if (mouseX > rectX && mouseX < rectX + rectWidth && mouseY > rectY && mouseY < rectY + rectHeight) {
        // Se il click del mouse è avvenuto all'interno del rettangolo i-esimo, memorizza l'indice del rettangolo cliccato
        rettangoloClick = i;
        switch (rettangoloClick) { // in base al valore di i imposto il livello delle istruzioni
          case 0:
            livello = 8;
            break;
          case 1:
            livello = 9;
            break;
          case 2:
            livello = 10;
            break;
        }
      }
    }
  }
  // Salta le schermate di attesa con un click
  else if ((livello == 5 || livello == 7) && interval > 45) {
    resetAll();
  }
  else if (livello >= 8 && livello <= 10 && interval > 20) {
    avviaDaIstruzioni();
  }
  //Il mouse nella schermata di pausa
  else if (livello == 6) {
    let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
    for (let i = 0; i < nLivelli; i++) {
      let rectY = startY + i * (rectHeight + 100); // Calcola la posizione Y per il rettangolo corrente
      if (mouseX > rectX && mouseX < rectX + rectWidth && mouseY > rectY && mouseY < rectY + rectHeight) {
        // Se il click del mouse è avvenuto all'interno del rettangolo i-esimo, memorizza l'indice del rettangolo cliccato
        rettangoloClick = i;
        switch (rettangoloClick) { // in base al valore di i imposto il livello
          case 0: //Se schiaccio resume riprendo esattamente da dove mi sono interrotto
            riprendi();
            break;
          case 1: //Se schiaccio restart resetto tutto e riprendo dal livello corrente
            resetAll()
            livello = ultimoLivello;
            break;
          case 2: //Se schiaccia esci resetto tutto e torno all'inizio
            resetAll();
            break;
        }
      }
    }
  }

}

// Schermata di introduzione al gioco
function menuStart() {

  ultimoLivello = 0;

  // La musica parte solo quando il browser ha sbloccato l'audio (serve un click/tasto dell'utente)
  if (audioPronto() && !musicaHome.isPlaying()) {
    musicaHome.loop();
  }

  background(0); // Sfondo nero
  // Ripristina il cursore predefinito
  cursor();
  musicaGameOver.stop(); //Fermo la musica game over

  // Rettangolo start to play
  let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
  let rectY = (height - rectHeight) / 2; // Posizione Y del rettangolo
  let borderRadius = 20;

  textFont(font1);
  fill(255); //Coloro di bianco
  textSize(70); //Grandezza testo
  text("A HOG RIDER'S LIFE", width / 2, height / 6);
  textSize(40);
  text("BY DAVIDE DELOGU", width / 2, height / 4)

  textFont(font1);
  textSize(26);
  textAlign(RIGHT, TOP);
  noStroke();
  fill(255, 255, 255, 200);
  text("-Premi F per schermo intero", 1800, 20);
  text("-Mentre giochi premi H per vedere le hitbox", 1800, 60)

  // Suggerimento finché il browser blocca l'audio
  if (!audioPronto()) {
    push();
    textFont(font1);
    textSize(26);
    textAlign(RIGHT, TOP);
    noStroke();
    fill(255, 255, 255, 200);
    text("-Clicca o premi un tasto per attivare la musica", 1800, 100);
    pop();
  }

  // Disegna il rettangolo
  fill(179, 40, 179); // Colore rettangolo
  stroke(255); // Colore del contorno bianco
  strokeWeight(2); // Spessore del contorno
  rectMode(CORNER); // Imposta il modo di disegnare il rettangolo al vertice in alto a sinistra
  rect(rectX, rectY, rectWidth, rectHeight, borderRadius);
  // Testo da centrare nel rettangolo
  noStroke(); // Rimuove il contorno
  textSize(30); // Imposta la dimensione del testo
  textAlign(CENTER, CENTER); // Allinea il testo al centro
  fill(0); // Colore del testo bianco
  textFont(font1);
  text("Clicca qui per giocare", width / 2, height / 2); // Disegna il testo al centro del rettangolo

  stroke(255); // Colore della linea bianco
  strokeWeight(2); // Spessore della linea
  line(0, height - 200, width, height - 200); // Disegna una linea orizzontale che attraversa il centro del canvas

  // Movimento orizzontale
  giocatoreHome.x += velPersonaggioHome;
  giocatoreHome.mostraMovimentoDestra();
  // Se il giocatore esce dal canvas da destra
  if (giocatoreHome.x > width) {
    giocatoreHome.x = -100; // Riporta il giocatore alla posizione iniziale
  }

  //Testo introduzione
  fill(255);
  textSize(44);
  textFont(font2);
  // Spaziatura calcolata in modo che tutta la frase stia sempre dentro lo schermo
  let margine = 80;
  let spaziatura = (width - margine * 2) / lettere.length;
  // Disegna e aggiorna la posizione di ogni lettera
  for (let i = 0; i < lettere.length; i++) {
    let lettera = lettere[i];
    // Disegna la lettera
    text(lettera.char, margine + spaziatura / 2 + i * spaziatura, lettera.yPos);
    // Aggiorna la posizione verticale
    lettera.yPos += lettera.speed;
    // Se la lettera raggiunge un'altezza desiderata, ferma il suo movimento
    if (lettera.yPos > height - 125) {
      lettera.speed = 0;
    }
  }
  //Immagini nella home
  image(imgGiocatoreHome, width / -22, height / 2 - 550, 850, 750);
  image(imgLupoHome, width - 750, height / 2 - 400, 700, 600);
}

function updateTextPosition() {
  // Aggiorna la posizione del testo
  x -= velocitaScorrimento;
  if (x < -textWidth(testoScorr)) {
    x = width + 2000;
  }
}


//Schermata a livelli
function menuLivelli() {
  ultimoLivello = 1;
  // Ripristina il cursore predefinito
  cursor();
  background('#2B4CA6');
  let borderRadius = 50;
  let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
  rectMode(CORNER); // Imposta il modo di disegnare il rettangolo al vertice in alto a sinistra
  for (let i = 0; i < nLivelli; i++) {
    let rectY = startY + i * (rectHeight + 50); // Calcola la posizione Y per il rettangolo corrente
    rect(rectX, rectY, rectWidth, rectHeight, borderRadius);
    // Testo da centrare nel rettangolo
    textSize(50); // Imposta la dimensione del testo
    textFont(font1);
    textAlign(CENTER, CENTER); // Allinea il testo al centro
    fill(0); // Reimposta il colore del riempimento a nero
    text(`LIVELLO ${i + 1}`, rectX + rectWidth / 2, rectY + rectHeight / 2); // Disegna il testo al centro del rettangolo
    fill(255);
  }

  fill(255);
  textFont(font2);
  textSize(100);
  // Disegna il testo
  text(testoScorr, x, y);
  // Aggiorna la posizione orizzontale del testo scorrevole (scorre da destra verso sinistra)
  x -= velocitaScorrimento;
  // Se il testo è completamente uscito dallo schermo, riportalo alla posizione iniziale
  if (x < -textWidth(testoScorr)) {
    x = 4450;
  }

  // Disegna l'immagine centrata verticalmente
  image(imgHogLivelli, width - 850, height / 950, 800, 950); // Utilizza le dimensioni desiderate per l'immagine
  image(imgLarryLivelli, width / 14, (height - 750) / 2, 500, 700);

  if (!musicaHome.isPlaying()) { //Continuo la musica 
    musicaHome.loop();
  }

}




function livello1() {
  interval = 0;
  ultimoLivello = 8;
  textFont(font2);

  // Inizio del livello, registra il tempo attuale
  if (!tempoInizio) {
    tempoInizio = millis();
    ultimoSpawnCerchi = millis() - (INTERVALLO_ASTEROIDI - 1500); // primo gruppo dopo 1,5 secondi
  }

  // Metto la musica
  if (!musicaLivello1.isPlaying()) {
    musicaLivello1.loop();
  }
  musicaHome.stop();

  // Disegna l'immagine dello sfondo in due parti che scorrono
  image(imgSfondoLv1, x1, 0, width, height);
  image(imgSfondoLv1, x2, 0, width, height);
  x1 -= velScorrSfondo;
  x2 -= velScorrSfondo;
  if (x1 <= -width) {
    x1 = width;
  }
  if (x2 <= -width) {
    x2 = width;
  }

  noCursor(); // Tolgo il cursore

  // Nuove ondate di asteroidi (a tempo, e ferme durante la pausa)
  if (millis() - ultimoSpawnCerchi >= INTERVALLO_ASTEROIDI) {
    aggiungiCerchi();
    ultimoSpawnCerchi = millis();
  }

  giocatoreLiv1.movimento();
  risolviUrtiAsteroidi();
  for (let i = 0; i < cerchi.length; i++) {
    cerchi[i].movimento();
  }
  for (let i = 0; i < cerchi.length; i++) {
    cerchi[i].display();
  }
  giocatoreLiv1.display();

  // Collisione precisa: ellisse del corpo dell'hog contro cerchio dell'asteroide
  for (let i = 0; i < cerchi.length; i++) {
    if (giocatoreLiv1.collide(cerchi[i])) {
      livello = 5; // Game over
      break;
    }
  }

  // Calcola il tempo trascorso e il punteggio
  tempoTrascorso = (millis() - tempoInizio) / 1000; // Tempo in secondi
  punteggio = Math.round(tempoTrascorso * 10);
  if (punteggio > punteggioMigliore1) {
    punteggioMigliore1 = punteggio;
  }

  // Mostra il punteggio e il punteggio migliore sullo schermo
  push();
  textSize(54);
  stroke(0);
  strokeWeight(6);
  fill(255);
  text("Punteggio: " + punteggio, width / 8, 40);
  text("Punteggio Migliore: " + punteggioMigliore1, width / 8, 100);
  pop();
}

function aggiungiCerchi() {
  // Gli asteroidi diventano un po' piu' veloci col passare del tempo (fino a +50% dopo 90 s)
  let moltiplicatore = 1 + Math.min(tempoTrascorso, 90) / 90 * 0.5;
  for (let i = 0; i < 4; i++) { // quattro asteroidi per ondata
    let nuovaY, valida, tentativi = 0;
    do {
      nuovaY = random(60, height - 60);
      valida = true;
      for (let j = 0; j < cerchi.length; j++) { // non sovrapposti ad altri asteroidi appena entrati
        if (!cerchi[j].entrato && Math.abs(cerchi[j].cy - nuovaY) < 100) { valida = false; break; }
      }
      // non far comparire un asteroide proprio addosso al giocatore se e' vicino al bordo sinistro
      if (giocatoreLiv1.cx < 300 && Math.abs(giocatoreLiv1.cy - nuovaY) < 100) valida = false;
      tentativi++;
    } while (!valida && tentativi < 30);
    let xVel = random(3, 6) * moltiplicatore; // verso destra
    let yVel = random(-5, 5) * moltiplicatore;
    cerchi.push(new Cerchi(-60, nuovaY, xVel, yVel));
  }
  // Limite agli asteroidi contemporanei: tolgo i piu' vecchi
  if (cerchi.length > MAX_ASTEROIDI) {
    cerchi.splice(0, cerchi.length - MAX_ASTEROIDI);
  }
}

// (la collisione del livello 1 e' ora in GiocatoreSpazioLv1.collide)

function clamp(valore, minimo, massimo) {
  return Math.max(minimo, Math.min(valore, massimo));
}


// Funzione per gestire il Livello 2 del gioco
function livello2() {
  interval = 0;
  ultimoLivello = 9;
  background(imgSfondoLiv2); //Immagine di sfondo
  musicaHome.stop();
  if (!musicaLiv2.isPlaying()) { //Metto la musica
    musicaLiv2.loop();
  }

  if (!primo) { // Prima volta in questa partita: tutto riparte da zero
    primo = true;
    targetGiocatore2 = START_X_LIV2;
    targetLupo2 = START_X_LIV2;
    giocatoreLiv2.x = START_X_LIV2;
    lupo.x = START_X_LIV2;
    cerchioAttivo = false;
    cerchioCliccato = false;
    prossimoCerchioAt = millis() + 2500; // il primo cerchio compare dopo 2,5 secondi
  }

  // Difficolta' crescente: piu' si avanza, piu' i cerchi sono piccoli, veloci a sparire e il lupo incalza
  let progresso = constrain((max(targetGiocatore2, targetLupo2) - START_X_LIV2) / (FINISH_X_LIV2 - START_X_LIV2), 0, 1);
  diametroCerchio = lerp(40, 30, progresso);
  tempoVisualizzazione = lerp(1200, 800, progresso);
  let incalzare = lerp(0.07, 0.20, progresso); // il lupo avanza anche da solo (px/frame)
  targetLupo2 += incalzare;

  // Gestione del cerchio
  if (!cerchioAttivo && millis() >= prossimoCerchioAt) {
    generaNuovoCerchio();
  }
  if (cerchioAttivo && millis() >= cerchioScadenza) {
    // Cerchio mancato: il lupo scatta in avanti
    targetLupo2 += PASSO_LIV2;
    cerchioAttivo = false;
    prossimoCerchioAt = millis() + 200;
  }

  // Movimento fluido verso la posizione vera
  giocatoreLiv2.x += (targetGiocatore2 - giocatoreLiv2.x) * 0.2;
  lupo.x += (targetLupo2 - lupo.x) * 0.2;

  // Quando un giocatore supera la metà appare il traguardo
  if (giocatoreLiv2.x > width / 2 || lupo.x > width / 2) {
    image(imgFine, width / 2 + 900, height / 2 + 200, 100, 150);
  }
  if (targetLupo2 > FINISH_X_LIV2) { //Se vince il lupo passo al game over
    livello = 5;
  }
  else if (targetGiocatore2 > FINISH_X_LIV2) { //Se vinco io passo alla schermata della vittoria
    livello = 7;
  }

  giocatoreLiv2.mostraMovimentoDestra(); //Mostro i personaggi
  lupo.mostraLupo();

  // Disegna il cerchio con l'anello del tempo che si consuma
  if (cerchioAttivo) {
    let rimasto = constrain((cerchioScadenza - millis()) / tempoVisualizzazione, 0, 1);
    push();
    stroke(0);
    strokeWeight(5);
    fill(255, 0, 0);
    ellipse(cerchioX, cerchioY, diametroCerchio);
    noFill();
    stroke(255, 230, 0);
    strokeWeight(7);
    arc(cerchioX, cerchioY, diametroCerchio + 28, diametroCerchio + 28, -HALF_PI, -HALF_PI + TWO_PI * rimasto);
    pop();
  }

  punteggio2 = Math.round(giocatoreLiv2.x - lupo.x); //Punteggio è la distanza del mio giocatore dal lupo
  if (punteggio2 > punteggioMigliore2) {
    punteggioMigliore2 = punteggio2;
  }

  // Mostra il punteggio e il punteggio migliore sullo schermo
  push();
  fill(255);
  stroke(0);
  strokeWeight(6);
  textFont(font2);
  textSize(54);
  text("Punteggio: " + punteggio2, width / 8, 40);
  text("Punteggio Migliore: " + punteggioMigliore2, width / 8, 100);
  pop();
}

function generaNuovoCerchio() {
  // Posizione casuale ben dentro lo schermo e lontana dal cerchio precedente
  let tentativi = 0, nx, ny;
  do {
    nx = random(150, width - 150);
    ny = random(200, height - 120);
    tentativi++;
  } while (dist(nx, ny, cerchioX, cerchioY) < 300 && tentativi < 20);
  cerchioX = nx;
  cerchioY = ny;
  cerchioAttivo = true;
  cerchioCliccato = false;
  cerchioScadenza = millis() + tempoVisualizzazione;
}

function livello3() {
  interval = 0;
  ultimoLivello = 10;
  textFont(font2);
  musicaHome.stop();
  if (!musicaLiv3.isPlaying()) { // Metto la musica
    musicaLiv3.loop();
  }

  // Inizio del livello, registra il tempo attuale
  if (!tempoInizio3) {
    tempoInizio3 = millis();
    distTrascorsa = 0;
    distProssimoOstacolo = 1100; // primo ostacolo dopo ~2,5 secondi
  }
  tempoTrascorso3 = (millis() - tempoInizio3) / 1000; // Tempo in secondi

  // Velocità crescente: parte da VEL_START3 e arriva a VEL_MAX3
  velocitaScheletri = velocitaAl(tempoTrascorso3);
  velocitaUccelli = velocitaScheletri;

  background(0);

  // Stelle con scorrimento lento (effetto profondità)
  noStroke();
  fill(255, 255, 255, 170);
  for (let i = 0; i < stelle.length; i++) {
    let st = stelle[i];
    st.x -= velocitaScheletri * 0.06 * st.s;
    if (st.x < -5) st.x = width + 5;
    rect(st.x, st.y, st.s, st.s);
  }

  // Luna
  fill(230, 230, 180);
  ellipse(width - 240, 150, 210, 210);

  // Terreno: linea + trattini che scorrono alla velocità del gioco
  stroke(255);
  strokeWeight(2);
  let yTerreno = height - 200;
  line(0, yTerreno, width, yTerreno);
  offsetTerreno = (offsetTerreno - velocitaScheletri) % 160;
  strokeWeight(4);
  for (let gx = offsetTerreno - 160; gx < width; gx += 160) {
    line(gx, yTerreno + 22, gx + 40, yTerreno + 22);
    line(gx + 90, yTerreno + 48, gx + 105, yTerreno + 48);
  }
  noStroke();

  // Generazione ostacoli "a distanza": tra un ostacolo e il successivo c'è SEMPRE lo spazio
  // per atterrare e saltare di nuovo, quindi ogni salto è fattibile (come Dino Run)
  distTrascorsa += velocitaScheletri;
  if (distTrascorsa >= distProssimoOstacolo) {
    generaOstacolo();
  }

  // Scheletri
  for (let i = scheletri.length - 1; i >= 0; i--) {
    scheletri[i].xVel = velocitaScheletri; // tutti alla velocità corrente
    scheletri[i].display();
    scheletri[i].movimento();
    if (scheletri[i].x + scheletri[i].imgWidth < 0) {
      scheletri.splice(i, 1);
    }
  }

  // Nuvole (decorative)
  if (millis() - ultimoTempoNuvola > intervalloNuvole) {
    aggiungiNuvola();
    ultimoTempoNuvola = millis();
  }
  for (let i = nuvole.length - 1; i >= 0; i--) {
    nuvole[i].display();
    nuvole[i].movimento();
  }

  // Uccelli
  for (let i = uccelli.length - 1; i >= 0; i--) {
    uccelli[i].xVel = velocitaUccelli;
    uccelli[i].display();
    uccelli[i].movimento();
    if (uccelli[i].x + uccelli[i].imgWidth < 0) {
      uccelli.splice(i, 1);
    }
  }

  // Giocatore
  giocatoreLiv3.salto();

  // Punteggio
  punteggio3 = Math.round(tempoTrascorso3 * 10);
  if (punteggio3 > punteggioMigliore3) {
    punteggioMigliore3 = punteggio3;
  }
  push();
  fill(255);
  textSize(45);
  text("Punteggio: " + punteggio3, width / 8, 40);
  text("Punteggio Migliore: " + punteggioMigliore3, width / 8, 100);
  pop();

  giocatoreLiv3.controllaCollisione(scheletri);
  giocatoreLiv3.controllaCollisione(uccelli);
}

// Velocità del livello 3 dopo t secondi di gioco
function velocitaAl(t) {
  return lerp(VEL_START3, VEL_MAX3, constrain(t / DURATA_RAMPA3, 0, 1));
}

function generaOstacolo() {
  let prog = constrain(tempoTrascorso3 / DURATA_RAMPA3, 0, 1);
  let larghezza; // larghezza occupata dall'ostacolo (da bordo sinistro a bordo destro)
  let r = random();
  const PG_W = giocatoreLiv3.sizex - 2 * HIT_G_X; // larghezza hitbox del giocatore

  if (r < 0.64) {
    // Gruppo di scheletri: quanti ne metto dipende dalla velocità, cosi' il gruppo si
    // scavalca SEMPRE con un salto singolo (a bassa velocità i gruppi larghi sarebbero troppo)
    let nMax = 1;
    for (let n = 2; n <= 3; n++) {
      let larghHit = (n - 1) * 60 + 45 + PG_W;
      if (larghHit / velocitaScheletri <= FINESTRA_SALTO - 15) nMax = n;
    }
    let pesi = [45, 35, 20 + prog * 15]; // piu' gruppi grandi andando avanti
    let tot = 0;
    for (let n = 1; n <= nMax; n++) tot += pesi[n - 1];
    let x = random(tot), n = 1;
    while (n < nMax && x >= pesi[n - 1]) { x -= pesi[n - 1]; n++; }
    let y = height - 282; // sulla linea
    for (let i = 0; i < n; i++) {
      scheletri.push(new Scheletri(width + i * 60, y, velocitaScheletri));
    }
    larghezza = (n - 1) * 60 + 65;
  } else if (r < 0.92) {
    // Uccello basso: va scavalcato come uno scheletro
    let y = random(775, 795);
    uccelli.push(new Uccelli(width, y, velocitaUccelli));
    larghezza = 70;
  } else {
    // Uccello alto: innocuo se stai a terra, ma se salti nel momento sbagliato ti colpisce
    let y = random(560, 680);
    uccelli.push(new Uccelli(width, y, velocitaUccelli));
    larghezza = 70;
  }

  // Distanza dal prossimo ostacolo = larghezza + un salto intero + margine (in frame).
  // Il margine si accorcia col tempo: ritmo piu' serrato, ma mai impossibile.
  // Uso la velocita' che gli ostacoli avranno quando arriveranno sul giocatore.
  let tArrivo = tempoTrascorso3 + (width - giocatoreLiv3.x) / velocitaScheletri / 60;
  let vArrivo = velocitaAl(tArrivo);
  let margine = random(lerp(34, 16, prog), lerp(62, 30, prog)); // frame
  distTrascorsa = 0;
  distProssimoOstacolo = larghezza + vArrivo * (FRAME_ARIA + margine);
}

function aggiungiNuvola() {
  let x = width; // Posizione iniziale da destra dello schermo
  let y = random(height / 2 - 500, height / 2 - 20); // Altezza dello schermo
  nuvole.push(new Nuvole(x, y, velocitaNuvole));
}




function gameOver() {
  interval++;
  if (interval == 1) {
    salvaRecord();
  }

  // Stop music
  if (musicaLivello1.isPlaying()) {
    musicaLivello1.stop();
  }
  if (!musicaGameOver.isPlaying()) {
    musicaGameOver.loop(); // Start game over music
  }
  if (musicaLiv2.isPlaying()) {
    musicaLiv2.stop();
  }
  if (musicaLiv3.isPlaying()) {
    musicaLiv3.stop();
  }
  cursor();

  // Punteggio dell'ultima partita
  let ultimo, record;
  if (ultimoLivello == 8) { ultimo = punteggio; record = punteggioMigliore1; }
  else if (ultimoLivello == 9) { ultimo = punteggio2; record = punteggioMigliore2; }
  else { ultimo = punteggio3; record = punteggioMigliore3; }

  background(0);
  image(imgGameOver, (width - 600) / 2, (height - 900) / 2, 600, 600);
  textFont(font2);
  textSize(80);
  fill(255);
  text("Oh no, hai perso! Sarai più fortunato la prossima volta.", width / 2, (height + 500) / 2);
  textSize(60);
  text("Punteggio: " + ultimo + "   -   Record: " + record, width / 2, (height + 680) / 2);
  if (interval > 45) {
    textSize(46);
    fill(200);
    text("Premi un tasto o clicca per riprovare", width / 2, (height + 860) / 2);
  }
  //Dopo un tot che viene mostrata la schermata
  if (interval == 450) {
    resetAll();
  }
}

function menuPausa() {
  // Stop music
  if (musicaLivello1.isPlaying()) {
    musicaLivello1.stop();
  }
  if (musicaLiv2.isPlaying()) {
    musicaLiv2.stop();
  }
  if (musicaLiv3.isPlaying()) {
    musicaLiv3.stop();
  }
  background(0);
  // Ripristina il cursore predefinito
  cursor();
  // Stop music
  musicaLivello1.stop();
  rectMode(CORNER);
  let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
  rectMode(CORNER); // Imposta il modo di disegnare il rettangolo al vertice in alto a sinistra
  let opzioni = ["RIPRENDI", "RICOMINCIA", "ESCI"]; // Array delle opzioni
  for (let i = 0; i < opzioni.length; i++) {
    stroke(255);
    strokeWeight(5);
    fill(179, 40, 179); // Colore rettangolo
    let rectY = startY + i * (rectHeight + 100); // Calcola la posizione Y per il rettangolo corrente
    rect(rectX, rectY, rectWidth, rectHeight, 20);
    // Testo da centrare nel rettangolo
    textSize(50); // Imposta la dimensione del testo
    textFont(font2);
    textAlign(CENTER, CENTER); // Allinea il testo al centro
    fill(0); // Reimposta il colore del riempimento a nero3
    noStroke();
    text(opzioni[i], rectX + rectWidth / 2, rectY + rectHeight / 2); // Disegna il testo al centro del rettangolo
    fill(255);
  }
  image(imgHogPausa, width / -20 + 150, height / 12 - 100, 650, 1050);
  image(imgSgherroPausa, width - 700, height / 2 - 300, 650, 550);

}
function resetAll() {
  salvaRecord();

  //Reset livello 2
  primo = false;
  cerchioAttivo = false;
  cerchioCliccato = false;
  targetGiocatore2 = START_X_LIV2;
  targetLupo2 = START_X_LIV2;
  giocatoreLiv2.x = START_X_LIV2;
  lupo.x = START_X_LIV2;
  punteggio2 = 0;

  //Reset livello 3
  scheletri = [];
  nuvole = [];
  uccelli = [];
  tempoInizio3 = 0;
  tempoTrascorso3 = 0;
  punteggio3 = 0;
  velocitaScheletri = VEL_START3;
  velocitaUccelli = VEL_START3;
  distTrascorsa = 0;
  distProssimoOstacolo = 1100;
  offsetTerreno = 0;
  jump = false;
  ySpeed = 0;
  puoSaltare = false;
  giocatoreLiv3.y = height - 290;
  giocatoreLiv3.numeroSalti = 0;

  //Reset livello 1
  cerchi = [];
  tempoInizio = 0;
  tempoTrascorso = 0;
  punteggio = 0;
  ultimoSpawnCerchi = 0;

  // Reset timer (vecchio sistema)
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  // Reset music
  if (musicaLivello1.isPlaying()) {
    musicaLivello1.stop();
  }
  if (musicaLivello2win.isPlaying()) {
    musicaLivello2win.stop();
  }
  if (musicaLiv2.isPlaying()) {
    musicaLiv2.stop();
  }
  if (musicaGameOver.isPlaying()) {
    musicaGameOver.stop();
  }
  if (musicaLiv3.isPlaying()) {
    musicaLiv3.stop();
  }

  livello = 1; // Torno al menu dei livelli
  interval = 0;
}

function vittoria() {
  interval++;
  if (interval == 1) {
    salvaRecord();
  }
  if (musicaLiv2.isPlaying()) { //Musica fermata
    musicaLiv2.stop();
  }
  // Metto la musica
  if (!musicaLivello2win.isPlaying()) {
    musicaLivello2win.loop();
  }
  cursor();
  background(0);
  fill(255);
  textSize(100);
  textFont(font2);
  text("Complimenti hai vinto!", width / 2, height / 2 - 40);
  if (interval > 45) {
    textSize(46);
    fill(200);
    text("Premi un tasto o clicca per continuare", width / 2, height / 2 + 100);
  }
  if (interval == 360) {
    resetAll();
  }
}

function istruzioni1() {
  musicaHome.stop(); //tolgo musica
  interval++; //Parte intervallo
  background(0);
  textFont(font2);
  textSize(50);
  fill(255);
  text("Il nostro amico hog rider si trova nella nube di oort\nper scappare dai suoi nemici sulla terra!\nAiutalo ad evitare gli asteroidi guidandolo con il mouse!\nGli asteroidi aumentano e accelerano col tempo: resisti il più possibile!\nBuon viaggio!", width / 2, height / 2 - 40);
  if (interval > 20) {
    textSize(36);
    fill(170);
    text("Premi un tasto o clicca per iniziare  -  ESC = pausa", width / 2, height - 90);
  }
  if (interval == 600) {
    avviaDaIstruzioni();
  }
}

function istruzioni2() {
  musicaHome.stop(); //tolgo musica
  interval++; //Parte intervallo
  background(0);
  textFont(font2);
  textSize(50);
  fill(255);
  text("L'hog rider è stato sfidato dal Lupo in una gara di corsa!\nSchiacciando i punti sullo schermo aiuterai il nostro amico ad andare più veloce!\nSe non premi in tempo il punto il Lupo scatta in avanti,\ne più si avanza, più i punti sono piccoli e veloci!\nBuona gara!", width / 2, height / 2 - 40);
  if (interval > 20) {
    textSize(36);
    fill(170);
    text("Premi un tasto o clicca per iniziare  -  ESC = pausa", width / 2, height - 90);
  }
  if (interval == 600) {
    avviaDaIstruzioni();
  }
}

function istruzioni3() {
  musicaHome.stop(); //tolgo musica
  interval++; //Parte intervallo
  background(0);
  textFont(font2);
  textSize(50);
  fill(255);
  text("Gli Scheletri e le Aquile hanno deciso di attaccare il nostro amico Hog Rider!!\nAiutalo a schivare gli ostacoli cliccando spazio o la freccia in su!\nSe schiacci 2 volte questi pulsanti il giocatore farà un salto in più in aria!\nPiù resisti, più si corre veloce!\nBuona fortuna!", width / 2, height / 2 - 40);
  if (interval > 20) {
    textSize(36);
    fill(170);
    text("Premi un tasto o clicca per iniziare  -  ESC = pausa", width / 2, height - 90);
  }
  if (interval == 700) {
    avviaDaIstruzioni();
  }
}

