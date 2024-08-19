const face = document.querySelector('.face');
        const eyes = document.querySelectorAll('.eye');
        let blinkInterval;
        let blinkCount = 0;

        function followCursor(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const faceRect = face.getBoundingClientRect();
            const faceCenterX = faceRect.left + faceRect.width / 2;
            const faceCenterY = faceRect.top + faceRect.height / 2;

            const angle = Math.atan2(mouseY - faceCenterY, mouseX - faceCenterX);
            const distance = Math.min(15, Math.sqrt(Math.pow(mouseX - faceCenterX, 2) + Math.pow(mouseY - faceCenterY, 2)) / 10);

            eyes.forEach(eye => {
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance * 1.5; // Slightly increase vertical movement
                eye.style.transform = `translate(${x}px, ${y}px)`;
            });
        }

        function blink() {
            eyes.forEach(eye => eye.classList.add('blink'));
            setTimeout(() => {
                eyes.forEach(eye => eye.classList.remove('blink'));
            }, 200);
        }

        function startBlinking() {
            blinkInterval = setInterval(() => {
                if (blinkCount % 2 === 0) {
                    // Single blink
                    blink();
                } else {
                    // Double blink
                    blink();
                    setTimeout(blink, 300);
                }
                blinkCount++;
            }, 4000);
        }

        document.addEventListener('mousemove', followCursor);
        startBlinking();