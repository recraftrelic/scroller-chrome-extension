function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            if(callback) callback(response);
        });
    });
}

const speedControllers = Array.from(document.querySelectorAll('[data-speed]'));
const stateControllers = Array.from(document.querySelectorAll('[data-action]'));

speedControllers.forEach(controller => {
    controller.addEventListener('click', () => {
        sendMessageToContentScript({
            action: 'SET_SPEED',
            payload: controller.getAttribute('data-speed')
        }, (response) => console.log(response));
    });
});

stateControllers.forEach(controller => {
    controller.addEventListener('click', () => {
        sendMessageToContentScript({
            action: 'SET_STATE',
            payload: controller.getAttribute('data-action')
        }, (response) => console.log(response));
    });
});
