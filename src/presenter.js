import Totalizador from "./totalizador";

const cantidadInput = document.querySelector("#cantidad-item");
const precioUnitarioInput = document.querySelector("#precio-item");
const codigoEstadoInput = document.querySelector("#codigo-estado");
const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number.parseInt(cantidadInput.value);
  const precio = Number.parseInt(precioUnitarioInput.value);
  const estado = codigoEstadoInput.value.trim().toUpperCase();

  const totalizador = new Totalizador(cantidad, precio, estado);
  const neto = totalizador.calcularPrecioNeto();

  div.innerHTML = "<p>" + "Precio neto: " + "(" + cantidad + " x $" + precio + ")" + ": $" + neto + "</p>";
});
