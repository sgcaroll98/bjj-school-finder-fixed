/**
 * Text animation script for the homepage
 * Controls the typing effect for the changing text in the hero section
 */

document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('changing-text');
    if (!textElement) return;
    
    const phrases = [
        'for beginners',
        'for advanced training',
        'for competition',
        'with No-Gi classes',
        'with kids programs'
    ];
    
    let currentPhrase = 0;
    let currentCharacter = 0;
    let isDeleting = false;
    let typingSpeed = 60; // Faster typing speed
    
    function type() {
        const currentText = phrases[currentPhrase];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, currentCharacter - 1);
            currentCharacter--;
        } else {
            textElement.textContent = currentText.substring(0, currentCharacter + 1);
            currentCharacter++;
        }
        
        // If word is complete, start deleting after delay
        if (!isDeleting && currentCharacter === currentText.length) {
            isDeleting = true;
            typingSpeed = 300; // Shorter pause before deleting
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && currentCharacter === 0) {
            isDeleting = false;
            typingSpeed = 60; // Faster typing speed
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
        
        // Set dynamic speed for more natural typing
        const speed = isDeleting ? 30 : typingSpeed; // Faster deletion speed
        
        setTimeout(type, speed);
    }
    
    // Start typing animation immediately
    setTimeout(type, 500);
});
