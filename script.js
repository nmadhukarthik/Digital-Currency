

// const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`

document.addEventListener("DOMContentLoaded", dataFetcher())

async function dataFetcher()
{
    try
    {
        let response = await fetch('data.json')
        let bitcoinData = await response.json()
        console.log(bitcoinData)
        renderData(bitcoinData)
    }
    catch(e)
    { console.log(e)}
    
}

function renderData(data)
{
    const tableBody = document.querySelector("tbody")
    tableBody.innerHTML = " "
    data.forEach(element => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td><img src=${element.image}></td>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.symbol}</td>
                <td> $ ${element.current_price}</td>
                <td>${element.total_volume}</td>
                <td>${element.price_change_percentage_24h.toFixed(2)} %</td>
                <td> $ ${element.market_cap}</td>
            `
        //tableBody.innerHTML += row
        tableBody.appendChild(row)
    });



    // Search functionality for searching by name or symbol
    const searchInput = document.querySelector("input")
    searchInput.addEventListener("change", () =>{
        let userinput = searchInput.value.toLowerCase()
        // console.log(userinput)
        const filteredData = data.filter(item => item.name.toLowerCase().includes(userinput) || item.symbol.toLowerCase().includes(userinput))
        renderData(filteredData)
    })


    //sorting by mkt cap
    const mktCapBtn = document.querySelector("#mktCap")
    mktCapBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let sortedData = data.sort((a,b) => (a.market_cap - b.market_cap))
        renderData(sortedData)
    })


    //sorting by percentage
    const percentBtn = document.querySelector("#percentage")
    percentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let sortedData = data.sort((a,b) => (a.price_change_percentage_24h - b.price_change_percentage_24h))
        renderData(sortedData)
    })


}



