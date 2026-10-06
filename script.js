import { KarticaProizvoda } from "./components/kartica";
import { Kosarica } from "./components/kosarica";
import { Sekcija } from "./components/sekcija";
import { dohvatiProizvode } from "./services/api-service";

const main = document.querySelector("#glavni-sadrzaj");
main.innerHTML = `
    <h1>Trgovina</h1>
    ${Sekcija("Ponuda", `<div id='ponuda' class='kartice'></div>`)}
    ${Sekcija("Košarica", `<div id='kosarica' class='kartice'></div>`)}
`;

const ponuda = document.querySelector("#ponuda");
let proizvodi = [];

async function ucitajProizvode() {
  ponuda.textContent = "Ucitavanje proizvoda...";

  try {
    proizvodi = await dohvatiProizvode();
    prikaziProizvode();
    prikaziKosaricu()
  } catch {
    ponuda.textContent = "Greska prilikom ucitavanja proizvoda.";
  }
}

ucitajProizvode();

function prikaziProizvode() {
  ponuda.innerHTML = proizvodi.length
    ? proizvodi.map((proizvod) => KarticaProizvoda(proizvod, stavkeKosarice.some((stavke) => stavke.id === proizvod.id))).join("")
    : "Nema proizvoda za prikaz.";
}

const stavkeKosarice = []

ponuda.addEventListener("click", (e)=>{
    const gumb = e.target.closest("button[data-proizvod-id]")

    if (!gumb) return

    const id = Number(gumb.dataset.proizvodId)
    const index = stavkeKosarice.findIndex((proizvod) => proizvod.id === id)

    if(index >= 0){
        stavkeKosarice.splice(index, 1)
    } else {
        const proizvod = proizvodi.find((proizvod) => proizvod.id === id)
        stavkeKosarice.push({
            ...proizvod,
            kolicina: 1
        })
    }
    prikaziKosaricu()
    prikaziProizvode()
})


const kosarica = document.querySelector("#kosarica");

function prikaziKosaricu() {
    kosarica.innerHTML = Kosarica(stavkeKosarice)
}

//zadatak-implementiraj sekciju s kosaricom i objavi na GitHub Pages.