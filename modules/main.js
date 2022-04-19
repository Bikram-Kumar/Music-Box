import {
    KeyManager
} from "./KeyManager.js";
import {
    GUIHandler
} from "../lib/JSUI/index.js";

window.onload = main;
window.keysContainer = window.document.getElementById('keys-container');
window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function main() {

    window.addEventListener('click', () => {
        var frqPrev = 27.5;
        var keys = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        for (let i = 0; i < 88; i++) {
            var frqCur = frqPrev * 1.0594630943592;
            var keyType = "white-key";
            var keyName = "";
            var octaveNum = Math.ceil((i - 2) / 12);
            var keyNum = (i - 2) % 12;

            switch (keyNum) {
                case -2:
                    keyName = "A";
                    break;
                case -1:
                    keyName = "A#";
                    keyType = "black-key";
                    break;
                case 0:
                    keyName = "B";
                    break;
                case 1:
                    keyName = "C";
                    break;
                case 2:
                    keyName = "C#";
                    keyType = "black-key";
                    break;
                case 3:
                    keyName = "D";
                    break;
                case 4:
                    keyName = "D#";
                    keyType = "black-key";
                    break;
                case 5:
                    keyName = "E";
                    break;
                case 6:
                    keyName = "F";
                    break;
                case 7:
                    keyName = "F#";
                    keyType = "black-key";
                    break;
                case 8:
                    keyName = "G";
                    break;
                case 9:
                    keyName = "G#";
                    keyType = "black-key";
                    break;
                case 10:
                    keyName = "A";
                    break;
                case 11:
                    keyName = "A#";
                    keyType = "black-key";
                    break;
            }

            Object.defineProperty(keys[octaveNum], keyName, {
                value: new KeyManager(frqPrev, keyType)
        });

        frqPrev = frqCur;
    }
        // end of for loop

        for (let i = 1; i < 9; i++) {
            keys[i]["C"].key.innerHTML = `<span>C${i}</span>`;
        }

    },
    {
        once: true
    });
    
var bodyGUIHandler = new GUIHandler();
if (window.innerWidth < window.innerHeight) {
        bodyGUIHandler.confirm("For better experience, you should use Music Box in landscape mode. Do you want to rotate?", (confirmed) => {
            if (confirmed) {
                window.document.body.requestFullscreen();
                window.screen.orientation.lock("landscape");
            }
        });
}


}