const slowSpeed = 1;
const mediumSpeed = 10;
const fastSpeed = 30;

let currentTimeout = null;
let currentSpeed = slowSpeed;

function stop () {
    clearTimeout(currentTimeout);
    currentTimeout = null;
}

window.onload = async function() {
    // function which increments the scroll position by 1
    async function scroll(maxPosition = null, speed = slowSpeed) {
        if (window.scrollY < maxPosition || maxPosition === null) {
            window.scrollBy(0, speed);

            currentTimeout = setTimeout(() => {
                scroll(maxPosition, speed)
            }, 10)
        }
    }

    // setup listeners for the messages from the popup
    chrome.runtime.onMessage.addListener(
        function(request, _, sendResponse) {
            switch (request.action) {
                case 'SET_STATE':
                    switch (request.payload) {
                        case 'start':
                            if (currentTimeout) {
                                return;
                            }
                            scroll(null, currentSpeed);
                            break;
                        case 'stop':
                            stop();
                            break;
                    }
                    break;
                case 'SET_SPEED':
                    switch (request.payload) {
                        case 'slow':
                            currentSpeed = slowSpeed;
                            break;
                        case 'medium':
                            currentSpeed = mediumSpeed;
                            break;
                        case 'fast':
                            currentSpeed = fastSpeed;
                            break;
                    }

                    if (currentTimeout) {
                        stop();
                        scroll(null, currentSpeed);
                    }
            }

            sendResponse(true);
        }
    );
}
