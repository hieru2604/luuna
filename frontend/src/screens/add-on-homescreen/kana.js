document.addEventListener('mousemove', (event) => {
  const cursorImage = document.getElementById('kana');

  if (document.getElementById('kana')) {
    cursorImage.style.visibility = 'visible';

    // Get cursor position
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    const imageRect = cursorImage.getBoundingClientRect();

    const imageWidth = imageRect.width;
    const imageX = imageRect.left + imageWidth / 2;

    // Update image position
    if (mouseX < imageX) {
      // Cursor is on the left side
      cursorImage.style.top = mouseY - 70 + 'px';
      cursorImage.style.left = mouseX - 33 + 'px';
      cursorImage.style.transform = 'scaleX(1)'; // Normal orientation
    } else {
      // Cursor is on the right side
      cursorImage.style.top = mouseY - 70 + 'px';
      cursorImage.style.left = mouseX - 62 + 'px';
      cursorImage.style.transform = 'scaleX(-1)'; // Flip horizontally
    }
  }
});
