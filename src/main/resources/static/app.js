document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const clearButton = document.getElementById('clearButton');
    const cookieDetails = document.getElementById('cookieDetails');
    const cookieCount = document.getElementById('cookieCount');

    fetchButton.addEventListener('click', fetchCookies);
    clearButton.addEventListener('click', clearDisplay);

    function fetchCookies() {
        fetch('/api/cookies/details')
            .then(response => response.json())
            .then(data => displayCookies(data))
            .catch(error => {
                console.error('Error:', error);
                displayError('Failed to fetch cookies. Please try again.');
            });
    }

    function displayCookies(cookies) {
        cookieDetails.innerHTML = '';
        cookieCount.textContent = cookies.length;

        if (cookies.length === 0) {
            cookieDetails.innerHTML = '<p class="no-cookies">No cookies found.</p>';
            return;
        }

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const headers = ['Name', 'Value', 'Domain', 'Path', 'Max Age', 'Browser', 'Storage Location'];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        cookies.forEach((cookie, index) => {
            const row = document.createElement('tr');
            row.style.animationDelay = `${index * 0.1}s`;
            row.innerHTML = `
                <td>${cookie.name}</td>
                <td>${cookie.value}</td>
                <td>${cookie.domain}</td>
                <td>${cookie.path}</td>
                <td>${cookie.maxAge}</td>
                <td>${cookie.browser}</td>
                <td>${cookie.storageLocation}</td>
            `;
            table.appendChild(row);
        });

        cookieDetails.appendChild(table);
    }

    function clearDisplay() {
        cookieDetails.innerHTML = '';
        cookieCount.textContent = '0';
    }

    function displayError(message) {
        cookieDetails.innerHTML = `<p class="error-message">${message}</p>`;
    }
});