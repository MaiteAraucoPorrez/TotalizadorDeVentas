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

  const errorCantidad = totalizador.validarCantidad();
  const errorPrecio = totalizador.validarPrecio();

  if (errorCantidad || errorPrecio) {
    div.innerHTML = "<p>" + (errorCantidad || errorPrecio) + "</p>";
    return;
  }

  const neto = totalizador.calcularPrecioNeto();
  const porcentajeImpuesto = totalizador.obtenerPorcentajeImpuesto();
  const impuesto = totalizador.calcularImpuesto();
  const porcentajeDescuento = totalizador.obtenerPorcentajeDescuento();
  const descuento = totalizador.calcularDescuento();
  const total = totalizador.calcularPrecioTotal();

  div.innerHTML = "<p>" + "Precio neto: " + "(" + cantidad + " x $" + precio + ")" + ": $" + neto + "</p>"
                  + "<p>" + "Impuesto para " + estado + " (%" + porcentajeImpuesto + ")" + ": $" + impuesto + "</p>"
                  + "<p>" + "Descuento para " + estado + " (%" + porcentajeDescuento + ")" + ": $" + descuento + "</p>"
                  + "<p>" + "Precio total (impuesto y descuento): $" + total + "</p>";
});
