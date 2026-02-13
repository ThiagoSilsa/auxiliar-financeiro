/**
 * Formata um valor numérico para o padrão de moeda brasileira (R$)
 * @param {number} value - O valor a ser formatado
 * @returns {string} Valor formatado como moeda brasileira
 */
export const formatCurrency = (value, currency = "BRL") => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(value);
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
