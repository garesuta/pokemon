/*จง fetching api pokemon https://pokeapi.co/api/v2/pokemon/
โดยนำมาแสดงผลหน้า Ui ชื่อ ขีดพลัง รูปภาพ และต้องค้นหาได้ (ค้นหาข้อมูลได้) */

// const formEle = document.querySelector("#searchForm");
// const formSearchBox = document.querySelector("#searchBox");
// const formSearchResult = document.querySelector("#searchResult");
// const selectBox = document.querySelector("#selectBox");

//declare data
const allData = [];
const filData = [];
//async function for fetch data
const getData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        allData.push(data);
        await getDropdownName();
        await getImage().then(() => { renderHTML(); });
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
};
//get drop-down
const getDropdownName = () => {
    let html = "";
    const dropdown = document.getElementById("selectBox");
    allData[0].results.map((data) => {
        html += `<option value="${data.name}">${data.name}</option>`;
    });
    dropdown.innerHTML = html;
};
//async for get image
const getImage = async () => {
    const promises = allData[0].results.map(async (item) => {
        if (item.name) {
            const url = `https://pokeapi.co/api/v2/pokemon/${item.name}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                item.image = data.sprites.front_default;
            } catch (error) {
                console.error(`Failed to fetch image for ${item.name}:`, error);
            }
        }
    }); await Promise.all(promises);
};
//clear
const clear = () => { renderHTML(); };
//render details
const renderHTML = (filter = null) => {
    const container = document.getElementById("dataContainer");
    container.innerHTML = "";
    // data ที่ fetch ได้ทั้งหมด
    // console.log(allData[0].results);
    allData[0].results.filter(async (item) => {
        if (filter !== null && filter.value !== "") {
            if (item.name === filter.value) {
                const element = document.createElement("div");
                element.innerHTML += `<img src="${item.image}" class="w-100">`;
                element.innerHTML += `<h3>${item.name}</h3>`;
                // container.appendChild(element);
                const divEle = document.createElement("div");
                details(item.name).then((resolve) => {
                    for (let re of resolve) {
                        divEle.appendChild(re);
                    }
                });
                element.append(divEle);
                container.appendChild(element);
            }
        }
        else {
            const element = document.createElement("div");
            element.innerHTML += `<img src="${item.image}" class="w-100">`;
            element.innerHTML += `<h3>${item.name}</h3>`;
            container.appendChild(element);
        }
    });
};
//all detail and gauge bar
const details = async (name) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const res = await fetch(url);
        const data = await res.json();

        const pokeDetails = data.stats;
        let arr = [];
        for (let i = 0; i < pokeDetails.length; i++) {
            let pokeDum = document.createElement('p');
            pokeDum.innerHTML = `<b>${data.stats[i].stat.name}</b> : ${pokeDetails[i].base_stat}`;
            arr.push(pokeDum);
        }
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
        gaugeDiv.appendChild(gaugeEle);
        arr.push(gaugeDiv);
        return arr;
    } catch (e) {
        console.error("Failed to fetch data:", e);
    }
};
getData();
//async function for picture & link
// const searchImage = async (id) => {
//     const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//     const res = await fetch(url);
//     const data = await res.json();

//     const pokeDetails = data.stats

//     const image = document.createElement('img');
//     image.src = data.sprites.back_default;
//     //image details
//     const pokeName = document.createElement('h3');
//     pokeName.innerText = `${data.name}`;
//     //Pokemon details
//     let arr = [];
//     for (let i = 0; i < pokeDetails.length; i++) {
//         let pokeDum = document.createElement('p');
//         pokeDum.innerHTML = `<b>${data.stats[i].stat.name}</b> : ${pokeDetails[i].base_stat}`;
//         arr.push(pokeDum);
//     }
//     //link
//     const imageLink = document.createElement('a');
//     imageLink.innerText = `Pokemon No.${id}`;
//     imageLink.href = "./nextpage.html";
//     imageLink.target = "_blank";
//     //card
//     const divEle = document.createElement('div');
//     const divEle2 = document.createElement('div');
//     //gauage div
//     const gaugeDiv = document.createElement('div');
//     gaugeDiv.className = "gauge-container";
//     //gauage detail
//     const gaugeEle = document.createElement('div');
//     gaugeEle.className = "gauge-bar";
//     gaugeEle.style = `width:${data.stats[1].base_stat}%`;
//     if (data.stats[1].base_stat < 40) {
//         gaugeEle.innerHTML = `<a>${data.stats[1].base_stat}</a>`;
//     } else {
//         gaugeEle.innerHTML = `<a>Attack: ${data.stats[1].base_stat}</a>`;
//     }
//     //combine element together
//     gaugeDiv.appendChild(gaugeEle);
//     imageLink.appendChild(image);
//     divEle.appendChild(imageLink);
//     divEle.append(pokeName);
//     //test
//     for (let ar of arr) {
//         divEle2.append(ar);
//     }
//     divEle.append(divEle2);
//     divEle.append(gaugeDiv);
//     formSearchResult.appendChild(divEle);

// }

// formEle.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     try {
//         for (let i = 1; i <= selectBox.value; i++) {
//             await searchImage(i);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })
