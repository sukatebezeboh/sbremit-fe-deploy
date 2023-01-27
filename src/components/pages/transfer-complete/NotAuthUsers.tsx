import React, { useEffect } from 'react'
import confetti from 'canvas-confetti';
import { SuccessfulTransaction } from './TransferComplete.css';

const NotAuthUser = () => {
    useEffect(() => {
        (() => {
            const durationInSeconds = 5 * 1000;
            const animationEnd = Date.now() + durationInSeconds;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min:number, max:number) => Math.random() * (max - min) + min
          
            const interval: any = setInterval(function() {
              const timeLeft = animationEnd - Date.now();
          
              if (timeLeft <= 0) {
                return clearInterval(interval);
              }
          
              const particleCount = 100 * (timeLeft / durationInSeconds);
              // since particles fall down, start a bit higher than random
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        })(); 
      }, [])

    return(
        <SuccessfulTransaction>
            <div className="success">
                <h2>Transfer created!</h2>
                <p>Your transfer process will continue when SBremit receives the payment from your bank. You will receive an email confirmation</p>
                <p>Please note, it may take up to 3 minutes for the status of your transaction to be updated.</p>

            </div>
        </SuccessfulTransaction>
    )
}



export default NotAuthUser;
