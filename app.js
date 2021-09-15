let calcular = document.getElementById("calcular");
let categoria = document.getElementById("categoria");
let tasa = 0;
let tasaAsist = 0;
calcular.addEventListener("click", calculo);
let sumaAsegurada = document.getElementById("sumaAsegurada");
let sumaAseguradaAsistencia = document.getElementById(
  "sumaAseguradaAsistencia"
);
let cantidadPersonas = document.getElementById("cantidadPersonas");
let cantidadDias = document.getElementById("cantidadDias");

let primaAsist = 0;
let primaTotal = 0;
let recargo = document.getElementById("recargo");
let premio = 0;
let derechoEmision = 1;
let primarec = 0;
let iva = document.getElementById("iva");
let condicion = 0;
let primaConRecargo = 0;
let premioSinIva = 0;
let premioConIva = 0;
let imp = 0;
let premioFinal = 0;
let descuento = 0;

function calculo() {
  let categoriaValue = categoria.value;
  switch (categoriaValue) {
    case "1":
      tasa = 0.43185; //valor de tasa por muerte
      tasaAsist = 6.88; //valor de tasa por asistencia medica
      break;
    case "2":
      tasa = 0.48;
      tasaAsist = 7.84;
      break;
    case "3":
      tasa = 0.5182;
      tasaAsist = 8.1826;
      break;
    case "4":
      tasa = 0.643;
      tasaAsist = 8.2636;
      break;
    case "5":
      tasa = 0.6942;
      tasaAsist = 8.4636;
      break;
    case "6":
      tasa = 0.952;
      tasaAsist = 16.16;
      break;
    case "7":
      tasa = 1.08185;
      tasaAsist = 18.3636;
      break;
    case "8":
      tasa = 2.18185;
      tasaAsist = 41.2727;
      break;
    default:
      alert("error, volver a intentar");
  }

  let ivaValue = iva.value;
  switch (ivaValue) {
    case "noCategorizado":
      condicion = 33.71;
      break;
    case "responsableInscripto":
      condicion = 21;
      break;
    case "monotributista":
      condicion = 21;
      break;
    case "exento":
      condicion = 21;
      break;
    case "consumidorFInal":
      condicion = 21;
      break;
    default:
      alert("error, volver a intentar");
  }

  //******************calculo de primas********************************
  prima243 =
    ((tasa * 2 * (sumaAsegurada.value / 1000) * cantidadPersonas.value) / 365) *
    cantidadDias.value;
  prima365 = tasa * 2 * (sumaAsegurada.value / 1000) * cantidadPersonas.value; //prima por 365 dias por muerte,
  //es la prima a utilizar cuando la vigencia es mayor a 243 días

  //*****************calculo de descuentos por cantidad de personas. */

  if (cantidadPersonas.value > 29 && cantidadPersonas.value < 49) {
    prima243 = prima243 - (prima243 * 5) / 100;
    prima365 = prima365 - (prima365 * 5) / 100;
    descuento = 5;
    alert("descuento por cantidad de personas: 5%");
  } else if (cantidadPersonas.value > 49 && cantidadPersonas.value < 100) {
    prima243 = prima243 - (prima243 * 10) / 100;
    prima365 = prima365 - (prima365 * 10) / 100;
    descuento = 10;
    alert("descuento por cantidad de personas: 10%");
  } else if (cantidadPersonas.value > 100) {
    prima243 = prima243 - (prima243 * 20) / 100;
    prima365 = prima365 - (prima365 * 20) / 100;
    descuento = 20;
    alert("descuento por cantidad de personas: 20%");
  } else {
    //alert("no hay descuento por cantidad de personas");
  }

  //   //********calculo del recargo del 50% por periodo corto*************************
  primarec = prima243 + (prima243 * 50) / 100;

  //   //****************CALUCLOS DE PRIMA*****************************/

  if (cantidadDias.value < 244) {
    primaAsist =
      tasaAsist *
      (((sumaAseguradaAsistencia.value / 1000) * cantidadPersonas.value) /
        365) * //calculo de prima de asistencia medica para periodo menor  244 días
      cantidadDias.value;
    // if (sumaAseguradaAsistencia.value > 0) {
    primaAsistotal = primaAsist + (primaAsist * 50) / 100; //calculo de prima con asistencia + 50% recargo
    //   alert(primaAsistotal + primarec); //alerta de prima total CON asistencia medica en PERIODO CORTO
    // primaTotal = primaAsistotal + primarec;
    primaTotal = primaAsistotal + primarec;
    //alert(primaTotal);
  } //else {
  //alert(primarec); //alerta de prima total SIN asistencia medica
  // }
  // }
  else {
    //prima para periodo largo
    primaAsist =
      tasaAsist *
      ((sumaAseguradaAsistencia.value / 1000) * cantidadPersonas.value); //prima para asistencia medica
    //if (sumaAseguradaAsistencia.value > 0) {
    //alert(prima365 + primaAsist); //prima Anual + asistencia medica
    primaTotal = prima365 + primaAsist;
    //alert(primaTotal);
    //}
  }

  //***********************PRIMA MINIMA***************************************//

  if (primaTotal < 300) {
    primaTotal = 300;
    alert(" se aplica prima mínima: $" + primaTotal);
  }

  //***********************derechos de emision********************************/
  if (primaTotal <= 120) {
    derechoEmision = 30;
  } else if (primaTotal <= 250 && primaTotal > 120) {
    derechoEmision = 40;
  } else if (primaTotal <= 500 && primaTotal > 250) {
    derechoEmision = 50;
  } else if (primaTotal <= 1000 && primaTotal > 500) {
    derechoEmision = 60;
  } else if (primaTotal > 1000) {
    derechoEmision = 80;
  }

  //******CALCULO DEL PREMIO!!!!!*******/
  recargo = recargo.value;
  primaConRecargo = (recargo * primaTotal) / 100;
  premioSinIva = primaTotal + primaConRecargo + derechoEmision;
  premioConIva = (condicion * premioSinIva) / 100;
  imp = (1.1 * premioSinIva) / 100;
  premioFinal = premioSinIva + premioConIva + imp;
  alert(
    "Prima: $" + primaTotal.toFixed(2) + " | Premio: $" + premioFinal.toFixed(2)
  );
}
