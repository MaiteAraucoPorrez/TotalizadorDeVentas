const IMPUESTOS_POR_ESTADO = {
    "UT": 6.65,
    "NV": 8.00,
    "TX": 6.25,
    "AL": 4.00,
    "CA": 8.25
};

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
        return IMPUESTOS_POR_ESTADO[this.estado] || 0;
    }

    calcularImpuesto() {
        const porcentajeImpuesto = this.obtenerPorcentajeImpuesto();
        return this.calcularPrecioNeto() * (porcentajeImpuesto / 100);
    }

    calcularPrecioTotal() {
        const precioNeto = this.calcularPrecioNeto();
        const impuesto = this.calcularImpuesto();
        return precioNeto + impuesto;
    }

    obtenerPorcentajeDescuento() {
        const precioNeto = this.calcularPrecioNeto();
        
        if (precioNeto >= 3000) return 5;
        if (precioNeto >= 1000) return 3;
        return 0;
    }
}
export default Totalizador;