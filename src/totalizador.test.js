import Totalizador from "./totalizador";

describe("Totalizar", () => {
  it("deberia calcular el precio neto de 1 item a $1", () => {
    const totalizador = new Totalizador(1, 1);
    expect(totalizador.calcularPrecioNeto()).toEqual(1);
  });

  it("deberia calcular el precio neto de 20 items a $3", () => {
    const totalizador = new Totalizador(20, 3);
    expect(totalizador.calcularPrecioNeto()).toEqual(60);
  });
});