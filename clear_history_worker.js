(async () => {
    chrome.action.onClicked.addListener(async (tab) => {
        const historyItems = await chrome.history.search({
            text: '',
            maxResults: 65536,
            startTime: 0
        });
        historyItems.forEach((historyItem) => {
            console.log(`Item ${historyItem.url}`);
            if (historyItem.url.includes('.facebook.com/')
                || historyItem.url.includes('.linkedin.com/')) {
                (async (historyItem) => {
                    console.log(`Deleting ${historyItem.url} with id ${historyItem.id}`);
                    await chrome.history.deleteUrl({
                        url: historyItem.url
                    })
                })(historyItem);
            }
        });
    });
})();
