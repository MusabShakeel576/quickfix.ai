function getPageContent(sendResponse) {
    const documents = [document.body.innerText];
    const name = encodeURIComponent(window.location.href);
    sendResponse({name, documents});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "get_page_content") {
        if (document.readyState === "complete") {
            getPageContent(sendResponse);
        } else {
            // Wait for the page to finish loading before sending the response
            document.addEventListener("DOMContentLoaded", function() {
                getPageContent(sendResponse);
            });
        }
        // To indicate that we will respond asynchronously
        return true;
    }
});
