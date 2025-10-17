 // Update time display
        function updateTime() {
            const timeElement = document.querySelector('[data-testid="test-user-time"]');
            timeElement.textContent = Date.now();
        }
        
        // Initial call
        updateTime();
        
        // Update time every second
        setInterval(updateTime, 1000);