/**
 * Formata um valor numérico para o padrão de moeda brasileira (R$)
 * @param {number} value - O valor a ser formatado
 * @returns {string} Valor formatado como moeda brasileira
 */
export const formatCurrency = (value, currency = "BRL") => {
  // Tratar casos onde o valor é null, undefined ou não é um número
  if (value === null || value === undefined) {
    return "";
  }

  // Garantir que o valor seja um número, mesmo que seja passado como string
  const numericValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numericValue)) {
    return "";
  }
  // Formatar o valor usando Intl.NumberFormat para o padrão brasileiro
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(numericValue);
};

/**
 * Formata uma data para o padrão brasileiro (DD/MM/YYYY)
 * @param {string|Date} date - A data a ser formatada
 * @returns {string} Data formatada
 */
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR");
};
