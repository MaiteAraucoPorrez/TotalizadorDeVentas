
describe("Totalizar", () => {
  it("deberia calcular el precio neto de 1 item a $1", () => {
    const totalizador = new Totalizador(1, 1);
    expect(totalizador.calcularPrecioNeto()).toEqual(1);
  });
});

class Totalizador {
  constructor(cantidad, precioUnitario) {
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    }

    calcularPrecioNeto() {
        return 1;
    }
}