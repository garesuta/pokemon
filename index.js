/*จง fetching api pokemon https://pokeapi.co/api/v2/pokemon/
โดยนำมาแสดงผลหน้า Ui ชื่อ ขีดพลัง รูปภาพ และต้องค้นหาได้ (ค้นหาข้อมูลได้) */

const formEle = document.querySelector("#searchForm");
const formSearchBox = document.querySelector("#searchBox");
const formSearchResult = document.querySelector("#searchResult");
const selectBox = document.querySelector("#selectBox");

const aLink = document.querySelectorAll('a');

//async function for picture & link
const searchImage = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const pokeDetails = data.stats

    const image = document.createElement('img');
    image.src = data.sprites.back_default;
    //image details
    const pokeName = document.createElement('h3');
    pokeName.innerText = `${data.name}`;
    //Pokemon details
    let arr = [];
    for (let i = 0; i < pokeDetails.length; i++) {
        let pokeDum = document.createElement('p');
        pokeDum.innerHTML = `<b>${data.stats[i].stat.name}</b> : ${pokeDetails[i].base_stat}`;
        arr.push(pokeDum);
    }
    //link
    const imageLink = document.createElement('a');
    imageLink.innerText = `Pokemon No.${id}`;
    imageLink.href = "./nextpage.html";
    imageLink.target = "_blank";
    //card
    const divEle = document.createElement('div');
    const divEle2 = document.createElement('div');
    //gauage div
    const gaugeDiv = document.createElement('div');
    gaugeDiv.className = "gauge-container";
    //gauage detail
    const gaugeEle = document.createElement('div');
    gaugeEle.className = "gauge-bar";
    gaugeEle.style = `width:${data.stats[1].base_stat}%`;
    if (data.stats[1].base_stat < 40) {
        gaugeEle.innerHTML = `<a>${data.stats[1].base_stat}</a>`;
    } else {
        gaugeEle.innerHTML = `<a>Attack: ${data.stats[1].base_stat}</a>`;
    }
    //combine element together
    gaugeDiv.appendChild(gaugeEle);
    imageLink.appendChild(image);
    divEle.appendChild(imageLink);
    divEle.append(pokeName);
    //test
    for (let ar of arr) {
        divEle2.append(ar);
    }
    divEle.append(divEle2);
    divEle.append(gaugeDiv);
    formSearchResult.appendChild(divEle);

}

formEle.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        for (let i = 1; i <= selectBox.value; i++) {
            await searchImage(i);
        }
    } catch (error) {
        console.log(error);
    }
})
