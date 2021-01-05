//TODO: Improve onclick function to await response from content then display info here in popup
document.addEventListener(
    'DOMContentLoaded',
    function () {
        document
            .querySelector('button')
            .addEventListener('click', onclick, false);

        function onclick() {
            chrome.tabs.query(
                { currentWindow: true, active: true },
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, 'rolls');
                }
            );
        }
    },
    false
);
