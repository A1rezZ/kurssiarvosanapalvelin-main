
async function sendData() {
  const formData = new URLSearchParams();
  const formArvosanat = document.querySelector("#kurssiarvosanat").value;
  formData.append("kurssiarvosanat", formArvosanat)

  try {
    const response = await fetch("http://localhost:3000/lataa", {
      method: "POST",
      body: formData,
    });
    // TODO: kirjoita vastaus html:ään ja tyhjennä lomake
    const data = await response.json()
    const tulos = document.querySelector('#lataustulos')
    if(data === 'ok'){
      tulos.innerHTML = '<p>arvosanat lisätty</p>'
      
    }
    else{
      tulos.innerHTML='<p>ERROR404</p>'

    }
    console.log(await response.json())
  } catch (e) {
    // TODO: kirjoita vastaus html:ään
    const tulos = document.querySelector('#lataustulos')
    tulos.innerHTML = '<p>ok</p>'
  }
}

async function search() {
  const formData = new URLSearchParams();
  const formKurssi = document.querySelector("#kurssi").value;
  const formOpiskelija = document.querySelector("#opiskelija").value;
  formData.append("kurssi", formKurssi);
  formData.append("opiskelija", formOpiskelija);

  try {
    const response = await fetch("http://localhost:3000/hae", {
      method: "POST",
      body: formData,
    });
    // TODO: laita vastaus hakutulos-elementtiin
    // TODO: huomaa tyhjä vastaus
    const data = await response.json()
    const hakutulos = document.querySelector('#hakutulos')
    const kurssii = document.querySelector('#kurssi')
    const opis = document.querySelector('#kurssi')
    console.log(data.length);
    if(data.length === 0){
      hakutulos.innerHTML='<p>ei tuluksia</p> '
    }
    else{
      let papa='<ul>'
      data.forEach(item=>{
        papa+=`<li>${item.kurssi}-${item.opiskelija}-${item.arvosana}</li>`
      })
      papa+='</ul>'
      hakutulos.innerHTML=papa
    }
    //console.log(await response.json());
  } catch (e) {
    // TODO: laita virheilmoitus html:ään
    const hakutulos = document.querySelector('#hakutulos')
    hakutulos.innerHTML='<p>ERROR404</p>'

  }
}

// Take over form submissions
document.querySelector("#lisaa").addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

document.querySelector('#haku').addEventListener('submit', (event) => {
  event.preventDefault();
  search();
});