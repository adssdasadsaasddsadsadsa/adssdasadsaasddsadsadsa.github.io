// 3D Card Effect
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add glow element to each card
        const glow = document.createElement('div');
        glow.classList.add('glow');
        card.appendChild(glow);
        
        let bounds;

        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            card.style.transform = `
                scale3d(1.03, 1.03, 1.03)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
            `;
            
            card.querySelector('.glow').style.backgroundImage = `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width/2}px
                    ${center.y * 2 + bounds.height/2}px,
                    rgba(255, 255, 255, 0.2),
                    rgba(0, 0, 0, 0.05)
                )
            `;
        }

        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
        });

        card.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = '';
            card.querySelector('.glow').style.backgroundImage = '';
        });
    });
}); 