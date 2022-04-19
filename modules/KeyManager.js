export class KeyManager {
    frequency;
    key;
    oscillator;
    gainNode;

    constructor(frequency, keyType = 'white-key') {
        this.frequency = frequency;
        
        // Create Key and set its class for css formatting 
        this.key = window.document.createElement('button');
        this.key.classList.add(keyType);
        this.key.addEventListener('touchstart', this);
        this.key.addEventListener('touchend', this);
        window.keysContainer.appendChild(this.key);

        // Create oscillator and gainNode for the key
        this.oscillator = window.audioCtx.createOscillator();
        this.gainNode = window.audioCtx.createGain();

        // Set the frequency and start the oscillator with zero volume.
        
        this.oscillator.frequency.setValueAtTime(this.frequency, window.audioCtx.currentTime);
        this.oscillator.type = 'sawtooth';
        this.gainNode.gain.setValueAtTime(0, window.audioCtx.currentTime);
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(window.audioCtx.destination);
        this.oscillator.start();

    }
    
    handleEvent(e) {
        switch (e.type) {
            case 'touchstart':
                this.key.classList.add('pressed');
                this.gainNode.gain.setTargetAtTime(1, window.audioCtx.currentTime + 0.1, 0.5);
               // this.gainNode.gain.setTargetAtTime(0, window.audioCtx.currentTime + 0.2, 1);
                break;
            
            case 'touchend':
                this.key.classList.remove('pressed');
                this.gainNode.gain.setTargetAtTime(0, window.audioCtx.currentTime + 0.3, 0.1);
                break;
            
        }
    }

}