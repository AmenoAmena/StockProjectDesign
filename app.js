document.addEventListener('DOMContentLoaded', () => {
    const stocks = [
        { symbol: 'AAPL', price: 145.09 },
        { symbol: 'GOOGL', price: 2738.80 },
        { symbol: 'AMZN', price: 3460.00 },
    ];

    const portfolio = [];

    const performanceData = {
        labels: ['1W', '1M', '3M', '6M', '1Y'],
        values: [10000, 10200, 9800, 10500, 11000]
    };

    const tradeForm = document.getElementById('trade-form');

    tradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const symbol = document.getElementById('stock-symbol').value.toUpperCase();
        const tradeType = document.getElementById('trade-type').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        const stock = stocks.find(s => s.symbol === symbol);
        if (!stock) {
            alert('Stock not found');
            return;
        }

        const portfolioItem = portfolio.find(item => item.symbol === symbol);

        if (tradeType === 'buy') {
            if (portfolioItem) {
                portfolioItem.quantity += quantity;
            } else {
                portfolio.push({ symbol, quantity });
            }
        } else if (tradeType === 'sell') {
            if (!portfolioItem || portfolioItem.quantity < quantity) {
                alert('Not enough shares to sell');
                return;
            }
            portfolioItem.quantity -= quantity;
            if (portfolioItem.quantity === 0) {
                const index = portfolio.indexOf(portfolioItem);
                portfolio.splice(index, 1);
            }
        }

        renderPortfolio();
        updatePerformanceChart();
    });

    function renderPortfolio() {
        const portfolioElement = document.getElementById('portfolio');
        const portfolioOverview = portfolioElement.querySelector('.overview');
        portfolioOverview.innerHTML = '';
        
        portfolio.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'overview-item';
            portfolioItem.innerHTML = `<strong>${item.symbol}</strong>: ${item.quantity} shares`;
            portfolioOverview.appendChild(portfolioItem);
        });
    }

    function updatePerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: performanceData.labels,
                datasets: [{
                    label: 'Portfolio Performance',
                    data: performanceData.values,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Initialize the chart when the page loads
    updatePerformanceChart();
});
