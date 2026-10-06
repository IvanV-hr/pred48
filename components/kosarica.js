export function Kosarica(proizvodi) {
  const ukupno = proizvodi.reduce((zbroj, proizvod) => {
    return zbroj + proizvod.price * proizvod.kolicina;
  }, 0);

  const listaProizvoda = proizvodi.length
    ? `
        <ul>
            ${proizvodi.map((proizvod) => `<li>${proizvod.title} - ${proizvod.price} USD po komadu</li>`).join("")}
        </ul>
    
    `
    : "<p>Košarica je prazna.</p>";

  return `
        <div class='kartica'>
            <h3>Različitih proizvoda: ${proizvodi.length}</h3>
            ${listaProizvoda}
            <p>Ukupno: ${ukupno.toFixed(2)} USD</p>
        </div>  
    `;
}
