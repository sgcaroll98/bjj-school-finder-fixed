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
    let typingSpeed = 50; // Faster typing speed
    
    function type() {
        const currentText = phrases[currentPhrase];
        
        if (isDeleting) {
            // Make deletion much faster by deleting multiple characters at once
            const charsToDelete = 3; // Delete 3 characters at once
            const newPosition = Math.max(0, currentCharacter - charsToDelete);
            textElement.textContent = currentText.substring(0, newPosition);
            currentCharacter = newPosition;
        } else {
            textElement.textContent = currentText.substring(0, currentCharacter + 1);
            currentCharacter++;
        }
        
        // If word is complete, start deleting after a shorter delay
        if (!isDeleting && currentCharacter === currentText.length) {
            isDeleting = true;
            typingSpeed = 150; // Very short pause before deleting
        }
        
        // If deletion is complete, move to next word immediately
        if (isDeleting && currentCharacter === 0) {
            isDeleting = false;
            typingSpeed = 50; // Faster typing speed
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
        
        // Set dynamic speed for more natural typing
        const speed = isDeleting ? 10 : typingSpeed; // Super fast deletion speed (10ms)
        
        setTimeout(type, speed);
    }
    
    // Start typing animation immediately
    setTimeout(type, 300);
});
