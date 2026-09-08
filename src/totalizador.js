class Totalizador {
  constructor(cantidad, precioUnitario) {
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    }

    calcularPrecioNeto() {
        return this.cantidad * this.precioUnitario;
    }
}
export default Totalizador;