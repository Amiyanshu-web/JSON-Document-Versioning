const axios = require('axios');

// 👉 Replace with your API URL
const API_URL = 'http://localhost:5000/api/documents';

// 👉 Replace with a valid document ID
const DOCUMENT_ID = '6867a6da2ce30b44bf6b9c2d';

// 👉 Replace with a valid JWT if you have authentication
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjY5ZWQzNzIyNmY1OWYxODgzZjI1OCIsImlhdCI6MTc1MTU1NzY2OSwiZXhwIjoxNzUyODUzNjY5fQ.tjtSekIgvWPn-1ahrsz7ZG_O9v8eCZI0_GeLgicex1Y';

// Number of parallel requests
const NUM_REQUESTS = 15;

const runTest = async () => {
    const promises = [];

    for (let i = 0; i < NUM_REQUESTS; i++) {
        const requestPromise = axios.put(
            `${API_URL}/${DOCUMENT_ID}`,
            {
                content: {
                    "name": 'Mastercard'+ (i + 1),
                    "type": "Card",
                    "offer": {
                        "type": "creditcard" + (i + 1),
                        "keyword": "cc"
                    }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                console.log(`✅ Request ${i + 1} succeeded:`, response.data);
            })
            .catch((error) => {
                console.log(`❌ Request ${i + 1} failed: ${error}`);
            });

        promises.push(requestPromise);
    }

    // Run all requests concurrently
    await Promise.all(promises);

    console.log('✅ Test complete.');
};

runTest();
