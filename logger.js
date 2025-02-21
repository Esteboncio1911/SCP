class Logger {
    static logToFile(logData) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] User: ${logData.user} | Action: ${logData.action} | IP: ${logData.ip} | Details: ${logData.details}\n`;
        
        // Create Blob with log data
        const blob = new Blob([logEntry], { type: 'text/plain' });
        
        // Download log file
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `scp_access_log_${timestamp.split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
