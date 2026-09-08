class Totalizador {
  constructor(cantidad, precioUnitario) {
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    }

    calcularPrecioNeto() {
        return this.cantidad * this.precioUnitario;
    }

    obtenerPorcentajeImpuesto() {
        return 6.65;
    }
}
export default Totalizador;