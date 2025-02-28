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
  let typingSpeed = 40; // Even faster typing
  
  function type() {
    const currentText = phrases[currentPhrase];
    
    if (isDeleting) {
      // Make deletion extremely fast by deleting the entire text at once
      textElement.textContent = '';
      currentCharacter = 0;
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    } else {
      textElement.textContent = currentText.substring(0, currentCharacter + 1);
      currentCharacter++;
      
      // If word is complete, start deleting after minimal delay
      if (currentCharacter === currentText.length) {
        isDeleting = true;
        setTimeout(type, 800); // Pause at complete word
        return;
      }
    }
    
    // Set dynamic speed
    const speed = isDeleting ? 1 : typingSpeed; // Extremely fast deletion
    
    setTimeout(type, speed);
  }
  
  // Start typing animation immediately
  setTimeout(type, 200);
});
