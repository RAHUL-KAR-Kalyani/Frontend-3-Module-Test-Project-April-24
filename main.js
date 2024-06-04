let allData = [];

function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            allData = data;
            renderTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        allData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderTable(data) {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = ''; // Clear previous data
    // let formattedNum=coin.price_change_percentage_24h.toFixed(2);
    // const percentaCalculate=(price_change_24h/current_price)*100;

    data.forEach(coin => {
       
        const row = `
            <tr>
                <td><img class="me-2" src="${coin.image}" alt="${coin.name}" width="20"> ${coin.name}</td>
                <td class="text-uppercase">${coin.symbol}</td>
                <td>$${coin.current_price}</td>
                <td>$${coin.total_volume}</td>
                <td>${coin.price_change_percentage_24h}%</td>
                <td>$${coin.market_cap}</td>
            </tr>
        `;
        dataBody.innerHTML += row;
    });
}

function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = allData.filter(coin => coin.name.toLowerCase().includes(searchInput) || coin.symbol.toLowerCase().includes(searchInput));
    renderTable(filteredData);
}

function sortData(criteria) {
    let sortedData;
    if (criteria === 'market_cap') {
        sortedData = [...allData].sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'percentage_change') {
        sortedData = [...allData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    renderTable(sortedData);
}

// Initial fetch
fetchDataWithAsyncAwait();
