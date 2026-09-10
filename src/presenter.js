import Totalizador from "./totalizador";

const cantidadInput = document.querySelector("#cantidad-item");
const precioUnitarioInput = document.querySelector("#precio-item");
const codigoEstadoInput = document.querySelector("#codigo-estado");
const categoriaInput = document.querySelector("#categoria-producto");
const pesoInput = document.querySelector("#peso-volumetrico");
const tipoClienteInput = document.querySelector("#tipo-cliente");

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
  const precio = Number.parseFloat(precioUnitarioInput.value);
  const estado = codigoEstadoInput.value.trim().toUpperCase();
  const categoria = categoriaInput.value.trim();
  const peso = Number.parseFloat(pesoInput.value);
  const tipoCliente = tipoClienteInput.value.trim();

  const totalizador = new Totalizador(cantidad, precio, estado, categoria, peso, tipoCliente);

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

  const porcentajeImpuestoAdicionalCategoria = totalizador.obtenerPorcentajeImpuestoAdicionalCategoria();
  const impuestoCategoria = totalizador.calcularImpuestoCategoria();

  const porcentajeDescuentoAdicionalCategoria = totalizador.obtenerPorcentajeDescuentoAdicionalCategoria();
  const descuentoCategoria = totalizador.calcularDescuentoCategoria();

  const costoEnvioBruto = totalizador.calcularCostoEnvioBruto();
  const descuentoEnvio = totalizador.calcularDescuentoEnvio();
  const costoEnvioTotal = totalizador.calcularCostoEnvioTotal();
  
  const descuentoFijo = totalizador.obtenerDescuentoFijo();
  
  const total = totalizador.calcularPrecioTotal();
  ultimoTotalCalculado = total;

  div.innerHTML = "<p>" + "Precio neto: " + "(" + cantidad + " x $" + precio + ")" + ": $" + neto + "</p>"
                  + "<p>" + "Impuesto para " + estado + " (%" + porcentajeImpuesto + ")" + ": $" + impuesto + "</p>"
                  + "<p>" + "Descuento " + " (%" + porcentajeDescuento + ")" + ": $" + descuento + "</p>"
                  + "<p>" + "Impuesto adicional por categoría " + categoria + " (%" + porcentajeImpuestoAdicionalCategoria + ")" + ": $" + impuestoCategoria + "</p>"
                  + "<p>" + "Descuento adicional por categoría " + categoria + " (%" + porcentajeDescuentoAdicionalCategoria + ")" + ": $" + descuentoCategoria + "</p>"
                  + "<p>" + "Costo de envío: $" + costoEnvioBruto + "</p>"
                  + "<p>" + "Descuento de envío por ser cliente " + tipoCliente + ": $" + descuentoEnvio + "</p>"
                  + "<p>" + "Costo de envío total: $" + costoEnvioTotal + "</p>"
                  + "<p>" + "Descuento fijo aplicado " + ": $" + descuentoFijo + "</p>"
                  + "<p>" + "Precio total (impuestos + descuentos + costo de envío): $" + total + "</p>";
});
