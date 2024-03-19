function isTokenExpired() : boolean {
  const expirationDateString = localStorage.getItem('expirationDate');
  // Caso não haja data de expiração, consideramos o token como expirado
  if (!expirationDateString) {
    return true;
  }
  const expirationDate = new Date(expirationDateString);
  // Verifica se a data de expiração é menor ou igual à data atual
  console.log(expirationDate);
  return expirationDate <= new Date();
}

export { isTokenExpired };