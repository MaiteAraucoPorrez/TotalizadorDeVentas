import Totalizador from "./totalizador";

const cantidadInput = document.querySelector("#cantidad-item");
const precioUnitarioInput = document.querySelector("#precio-item");
const codigoEstadoInput = document.querySelector("#codigo-estado");
const categoriaInput = document.querySelector("#categoria-producto");
const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");
const cancelarButton = document.querySelector("#cancelar-button");
const confirmarButton = document.querySelector("#confirmar-button");
let ultimoTotalCalculado = null;

cancelarButton.addEventListener("click", () => {
  form.reset();
  div.innerHTML = "<p>" + "Compra cancelada" + "</p>";
  ultimoTotalCalculado = null;
});

confirmarButton.addEventListener("click", () => {
  if (ultimoTotalCalculado === null) {
    div.innerHTML = "<p>" + "Primero debes totalizar tu compra" + "</p>";
    return;
  }
  div.innerHTML = "<p>Compra confirmada.Total: $" + ultimoTotalCalculado + "</p>";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number.parseInt(cantidadInput.value);
  const precio = Number.parseInt(precioUnitarioInput.value);
  const estado = codigoEstadoInput.value.trim().toUpperCase();
  const categoria = categoriaInput.value.trim();

  const totalizador = new Totalizador(cantidad, precio, estado, categoria);

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
  const porcentajeAdicionalCategoria = totalizador.obtenerPorcentajeAdicionalCategoria();
  const impuestoCategoria = totalizador.calcularImpuestoCategoria();
  
  const total = totalizador.calcularPrecioTotal();
  ultimoTotalCalculado = total;

  div.innerHTML = "<p>" + "Precio neto: " + "(" + cantidad + " x $" + precio + ")" + ": $" + neto + "</p>"
                  + "<p>" + "Impuesto para " + estado + " (%" + porcentajeImpuesto + ")" + ": $" + impuesto + "</p>"
                  + "<p>" + "Descuento para " + estado + " (%" + porcentajeDescuento + ")" + ": $" + descuento + "</p>"
                  + "<p>" + "Impuesto adicional por categoría " + categoria + " (%" + porcentajeAdicionalCategoria + ")" + ": $" + impuestoCategoria + "</p>"
                  + "<p>" + "Precio total (impuesto, descuento e impuesto por categoria): $" + total + "</p>";
});
