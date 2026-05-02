const axios = require('axios'); // Ensure you install axios

const Log = async (stack, level, pkg, message) => {
    try {
        const response = await axios.post('YOUR_TEST_SERVER_URL/log', {
            stack: stack.toLowerCase(),   
            level: level.toLowerCase(),   
            package: pkg.toLowerCase(),   
            message: message
        }, {
            headers: { 'Authorization': `Bearer YOUR_ACCESS_TOKEN` }
        });
        console.log("Log Sent:", response.data.logID);
    } catch (error) {
        console.error("Logging failed", error.message);
    }
};

module.exports = Log;
