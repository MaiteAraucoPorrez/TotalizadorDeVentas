class Totalizador {
  constructor(cantidad, precioUnitario, estado) {
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.estado = estado;
    }

    calcularPrecioNeto() {
        return this.cantidad * this.precioUnitario;
    }

    obtenerPorcentajeImpuesto() {
        const impuestosPorEstado = {
            "UT": 6.65,
            "NV": 8.00,
            "TX": 6.25,
            "AL": 4.00,
            "CA": 8.25
        };
        return impuestosPorEstado[this.estado] || 0;
    }
}
export default Totalizador;