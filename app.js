let calcular = document.getElementById("calcular");
let categoria = document.getElementById("categoria");
let tasa = 0;
let tasaAsist = 0;
calcular.addEventListener("click", calculo);
var sumaAsegurada = document.getElementById("sumaAsegurada");
var sumaAseguradaAsistencia = document.getElementById(
  "sumaAseguradaAsistencia"
);
let cantidadPersonas = document.getElementById("cantidadPersonas");
let cantidadDias = document.getElementById("cantidadDias");

let primaAsist = 0;
let primaTotal = 0;

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

  //calculo de primas
  prima243 =
    ((tasa * 2 * (sumaAsegurada.value / 1000) * cantidadPersonas.value) / 365) *
    cantidadDias.value;
  prima365 = tasa * 2 * (sumaAsegurada.value / 1000) * cantidadPersonas.value; //prima por 365 dias por muerte,
  //es la prima a utilizar cuando la vigencia es mayor a 243 días

  //calculo de descuentos por cantidad de personas.
  if (cantidadPersonas.value > 29 && cantidadPersonas.value < 49) {
    prima243 = prima243 - (prima243 * 5) / 100;
    prima365 = prima365 - (prima365 * 5) / 100;
  } else if (cantidadPersonas.value > 49 && cantidadPersonas.value < 100) {
    prima243 = prima243 - (prima243 * 10) / 100;
    prima365 = prima365 - (prima365 * 5) / 100;
  } else if (cantidadPersonas.value > 100) {
    prima243 = prima243 - (prima243 * 20) / 100;
    prima365 = prima365 - (prima365 * 5) / 100;
  } else {
    alert("no hay descuento por cantidad de personas");
  }

  //calculo del recargo del 50% por periodo corto
  primarec = prima243 + (prima243 * 50) / 100;

  //----------------------------------------------//
  //calculo de prima para periodos cortos

  primaAsist =
    tasaAsist *
    (((sumaAseguradaAsistencia.value / 1000) * cantidadPersonas.value) / 365) * //calculo de prima de asistencia medica
    cantidadDias.value;

  if (sumaAseguradaAsistencia.value > 0) {
    primaAsistotal = primaAsist + (primaAsist * 50) / 100; //calculo de prima con asistencia + 50% recargo
    alert(primaAsistotal + primarec); //alerta de prima total CON asistencia medica en PERIODO CORTO
  } else {
    alert(primarec); //alerta de prima total SIN asistencia medica
  }
}
