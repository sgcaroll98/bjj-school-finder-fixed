/**
 * Text animation script for the homepage
 * Controls the typing effect for the changing text in the hero section
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing text animation');
  
  // Find the element to animate
  const textElement = document.getElementById('changing-text');
  if (!textElement) {
    console.error('Could not find #changing-text element');
    return;
  }
  
  console.log('Found text element:', textElement);
  
  // List of phrases to animate
  const phrases = [
    'rated 5-stars by students...',
    'with world-class instruction...',
    'offering top-rated kids classes...',
    'with championship-level training...',
    'featuring elite competition teams...',
    'known for technical excellence...',
    'with highly experienced coaches...',
    'recommended by top athletes...',
    'with award-winning programs...',
    'offering premium facilities...',
    'with state-of-the-art training areas...',
    'specializing in no-gi excellence...',
    'featuring modern training methods...',
    'with dedicated competition classes...',
    'providing professional instruction...'
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  console.log('Starting text animation with', phrases.length, 'phrases');
  
  // Type single character
  function typeCharacter() {
    // Get current phrase
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      // Delete one character
      textElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      
      // Check if deletion is complete
      if (currentCharIndex === 0) {
        isDeleting = false;
        // Move to next phrase
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        console.log('Moving to phrase:', currentPhraseIndex, phrases[currentPhraseIndex]);
        // Pause before typing next word
        setTimeout(typeCharacter, 500);
        return;
      }
      
      // Continue deleting
      setTimeout(typeCharacter, 30);
    } else {
      // Type one character
      textElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      // Check if typing is complete
      if (currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        console.log('Completed typing phrase:', currentPhraseIndex);
        // Pause at the end of the word
        setTimeout(typeCharacter, 1500);
        return;
      }
      
      // Continue typing
      setTimeout(typeCharacter, 80);
    }
  }
  
  console.log('Setting initial timeout');
  // Start the animation with a short delay
  setTimeout(function() {
    console.log('Animation starting now');
    typeCharacter();
  }, 800);
  
  // Add a test to make sure the animation works
  setTimeout(function() {
    if (textElement.textContent.length === 0) {
      console.warn('Animation may not be working - text element still empty after 2 seconds');
      textElement.textContent = 'Animation script loaded...';
    }
  }, 2000);
});
