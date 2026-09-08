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

  it("deberia obtener el porcentaje de impuesto para UT", () => {
    const totalizador = new Totalizador(20, 3, "UT");
    expect(totalizador.obtenerPorcentajeImpuesto()).toEqual(6.65);
  });

  it("deberia obtener el porcentaje de impuesto para NV", () => {
    const totalizador = new Totalizador(20, 3, "NV");
    expect(totalizador.obtenerPorcentajeImpuesto()).toEqual(8.00);
  });

  it("deberia obtener el porcentaje de impuesto para TX", () => {
    const totalizador = new Totalizador(20, 3, "TX");
    expect(totalizador.obtenerPorcentajeImpuesto()).toEqual(6.25);
  });

  it("deberia obtener el porcentaje de impuesto para AL", () => {
    const totalizador = new Totalizador(20, 3, "AL");
    expect(totalizador.obtenerPorcentajeImpuesto()).toEqual(4.00);
  });

  it("deberia obtener el porcentaje de impuesto para CA", () => {
    const totalizador = new Totalizador(20, 3, "CA");
    expect(totalizador.obtenerPorcentajeImpuesto()).toEqual(8.25);
  });

  it("deberia obtener el impuesto en dolares para CA", () => {
    const totalizador = new Totalizador(20, 3, "CA");
    expect(totalizador.calcularImpuesto()).toEqual(4.95); // 60 * 8.25%
  });

  it("deberia calcular el precio total con impuesto para CA", () => {
    const totalizador = new Totalizador(20, 3, "CA");
    expect(totalizador.calcularPrecioTotal()).toEqual(64.95); //60 + 4.95
  });

  it("deberia obtener el porcentaje de descuento para un total de 1000", () => {
    const totalizador = new Totalizador(100, 10, "CA"); //neto: 1000
    expect(totalizador.obtenerPorcentajeDescuento()).toEqual(3);
  });

  it("deberia obtener el porcentaje de descuento para un total de 3000", () => {
    const totalizador = new Totalizador(300, 10, "CA");
    expect(totalizador.obtenerPorcentajeDescuento()).toEqual(5);
  });
});