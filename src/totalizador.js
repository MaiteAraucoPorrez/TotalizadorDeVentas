const IMPUESTOS_POR_ESTADO = {
    "UT": 6.65,
    "NV": 8.00,
    "TX": 6.25,
    "AL": 4.00,
    "CA": 8.25
};

const iMPUESTO_ADICIONAL_CATEGORIA_DE_PRODUCTO = {
    "Varios": 0,
    "Alimentos": 0,
    "Bebidas alcoholicas": 7,
    "Material de escritorio": 0,
    "Muebles": 3,
    "Electronicos": 4,
    "Vestimenta": 2
}

class Totalizador {
  constructor(cantidad, precioUnitario, estado, categoria) {
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.estado = estado;
    this.categoria = categoria;
    }

    validarCantidad() {
        if (this.cantidad <= 0) {
            return "Error: la cantidad debe ser mayor a cero";
        }
        return null;
    }

    validarPrecio() {
        if (this.precioUnitario <= 0) {
            return "Error: el precio debe ser mayor a cero";
        }
        return null;
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

    obtenerPorcentajeDescuento() {
        const precioNeto = this.calcularPrecioNeto();

        if (precioNeto >= 30000) return 15;
        if (precioNeto >= 10000) return 10;
        if (precioNeto >= 7000) return 7;
        if (precioNeto >= 3000) return 5;
        if (precioNeto >= 1000) return 3;
        return 0;
    }

    calcularDescuento() {
        const porcentajeDescuento = this.obtenerPorcentajeDescuento();
        return this.calcularPrecioNeto() * (porcentajeDescuento / 100);
    }

    obtenerPorcentajeAdicionalCategoria() {
        return iMPUESTO_ADICIONAL_CATEGORIA_DE_PRODUCTO[this.categoria] || 0;
    }

    calcularImpuestoCategoria() {
        const porcentajeAdicionalCategoria = this.obtenerPorcentajeAdicionalCategoria();
        return this.calcularPrecioNeto() * (porcentajeAdicionalCategoria / 100);
    }

    obtenerPorcentajeDescuentoAdicionalCategoria() {
        if (this.categoria === "Alimentos") {
        return 2;
        } else if (this.categoria === "Material de escritorio") {
            return 1.5;
        }
        return 0;
    }

    calcularPrecioTotal() {
        const precioNeto = this.calcularPrecioNeto();
        const impuesto = this.calcularImpuesto();
        const descuento = this.calcularDescuento();
        const impuestoCategoria = this.calcularImpuestoCategoria();

        return precioNeto + impuesto + impuestoCategoria - descuento;
    }
}
export default Totalizador;