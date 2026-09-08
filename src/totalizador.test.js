import Totalizador from "./totalizador";

describe("Totalizar", () => {
  it("deberia calcular el precio neto de 1 item a $1", () => {
    const totalizador = new Totalizador(1, 1);
    expect(totalizador.calcularPrecioNeto()).toEqual(1);
  });
});