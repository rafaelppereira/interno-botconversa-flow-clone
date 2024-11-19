/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateQueryParams = (key: any, value: any) => {
  const url = new URL(String(window.location));
  url.searchParams.set(key, value); // Adiciona ou atualiza o parâmetro
  window.history.pushState({}, '', url);
};

export const getQueryParam = (key: any) => {
  const url = new URL(String(window.location));
  return url.searchParams.get(key); // Retorna o valor ou null se não existir
};