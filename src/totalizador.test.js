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

  it("deberia obtener el porcentaje de descuento para un total de 7000", () => {
    const totalizador = new Totalizador(700, 10, "CA");
    expect(totalizador.obtenerPorcentajeDescuento()).toEqual(7);
  });

  it("deberia obtener el porcentaje de descuento para un total de 10000", () => {
    const totalizador = new Totalizador(1000, 10, "CA");
    expect(totalizador.obtenerPorcentajeDescuento()).toEqual(10);
  });

  it("deberia obtener el porcentaje de descuento para un total de 30000", () => {
    const totalizador = new Totalizador(3000, 10, "CA");
    expect(totalizador.obtenerPorcentajeDescuento()).toEqual(15);
  });

  it("deberia obtener el descuento total en dolares", () => {
    const totalizador = new Totalizador(100, 10, "CA");
    expect(totalizador.calcularDescuento()).toEqual(30); //1000 * 3%
  });

  it("deberia calcular el precio total con descuento e impuestos", () => {
    const totalizador = new Totalizador(100, 10, "CA");
    expect(totalizador.calcularPrecioTotal()).toEqual(1052.5);
  });

  it("deberia mostrar error si la cantidad es negativa o cero", () => {
    const totalizador = new Totalizador(-5, 3, "CA");
    expect(totalizador.validarCantidad()).toEqual("Error: la cantidad debe ser mayor a cero");
  });

  it("deberia mostrar error si el precio es negativo o cero", () => {
    const totalizador = new Totalizador(5, -3, "CA");
    expect(totalizador.validarPrecio()).toEqual("Error: el precio debe ser mayor a cero");
  });

  it("deberia obtener el porcentaje de impuesto adicional para la categoria de Varios", () => {
    const totalizador = new Totalizador(20, 3, "UT", "Varios");
    expect(totalizador.obtenerPorcentajeAdicionalCategoria()).toEqual(0);
  });

  it("deberia obtener el porcentaje de impuesto adicional para la categoria de Bebidas alcoholicas", () => {
    const totalizador = new Totalizador(20, 3, "UT", "Bebidas alcoholicas");
    expect(totalizador.obtenerPorcentajeAdicionalCategoria()).toEqual(7);
  });

  it("deberia obtener el porcentaje de impuesto adicional para la categoria de Electronicos", () => {
    const totalizador = new Totalizador(20, 3, "UT", "Electronicos");
    expect(totalizador.obtenerPorcentajeAdicionalCategoria()).toEqual(4);
  });

  it("deberia obtener el porcentaje de impuesto adicional para la categoria de Muebles", () => {
    const totalizador = new Totalizador(20, 3, "UT", "Muebles");
    expect(totalizador.obtenerPorcentajeAdicionalCategoria()).toEqual(3);
  });

  it("deberia obtener el porcentaje de impuesto adicional para la categoria de Vestimenta", () => {
    const totalizador = new Totalizador(20, 3, "UT", "Vestimenta");
    expect(totalizador.obtenerPorcentajeAdicionalCategoria()).toEqual(2);
  });

  it("deberia obtener el porcentaje de impuesto adicional para la categoria de Alimentos", () => {
    const totalizador = new Totalizador(20, 3, "UT", "Alimentos");
    expect(totalizador.obtenerPorcentajeAdicionalCategoria()).toEqual(0);
  });

  it("deberia obtener el impuesto adicional en dolares para la cateogoria Bebidas alcoholicas", () => {
    const totalizador = new Totalizador(20, 3, "CA", "Bebidas alcoholicas");
    expect(totalizador.calcularImpuestoCategoria()).toEqual(4.20); // 60 * 7.00%
  });

  it("deberia calcular el precio total con impuesto adicional por cateogoria para CA", () => {
    const totalizador = new Totalizador(20, 3, "CA", "Bebidas alcoholicas");
    expect(totalizador.calcularPrecioTotal()).toEqual(69.15); //64.95 + 4.20
  });

  it("deberia obtener el porcentaje de descuento para la categoria de Alimentos", () => {
    const totalizador = new Totalizador(100, 10, "CA", "Alimentos");
    expect(totalizador.obtenerPorcentajeDescuentoAdicionalCategoria()).toEqual(2);
  });

  it("deberia obtener el porcentaje de descuento para la categoria de Material de escritorio", () => {
    const totalizador = new Totalizador(100, 10, "CA", "Material de escritorio");
    expect(totalizador.obtenerPorcentajeDescuentoAdicionalCategoria()).toEqual(1.5);
  });

  it("deberia obtener el porcentaje de descuento para la categoria de Electronicos", () => {
    const totalizador = new Totalizador(100, 10, "CA", "Electronicos");
    expect(totalizador.obtenerPorcentajeDescuentoAdicionalCategoria()).toEqual(1);
  });

  it("deberia obtener el porcentaje de descuento para la categoria de Vestimenta", () => {
    const totalizador = new Totalizador(100, 10, "CA", "Vestimenta");
    expect(totalizador.obtenerPorcentajeDescuentoAdicionalCategoria()).toEqual(0);
  });

  it("deberia obtener el descuento adicional por cateogoria de producto total en dolares", () => {
    const totalizador = new Totalizador(100, 10, "CA", "Alimentos");
    expect(totalizador.calcularDescuentoCategoria()).toEqual(20); //1000 * 2%
  });

  it("deberia calcular el precio total con descuento e impuestos", () => {
    const totalizador = new Totalizador(100, 10, "CA", "Alimentos");
    expect(totalizador.calcularPrecioTotal()).toEqual(1032.5); //1000 + 82.5 - 30 - 20
  });

});