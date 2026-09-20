const CAMPOS = [
  "bimestre1",
  "bimestre2",
  "bimestre3",
  "bimestre4",
];

export function calcularResultado(notas = {}) {
  const valores = CAMPOS.map((campo) => notas?.[campo]);

  const completas = valores.every(
    (nota) =>
      typeof nota === "number" &&
      Number.isFinite(nota) &&
      nota >= 0 &&
      nota <= 10
  );

  if (!completas) {
    return {
      media: null,
      status: "Em andamento",
    };
  }

  const media = valores.reduce((soma, nota) => soma + nota, 0) / 4;

  return {
    media,
    status: media >= 6 ? "Aprovado" : "Reprovado",
  };
}