const density = 'Ñ@#W$9876543210?!abc;:+=-,._                       ';

let video;
let asciiImage;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(198, 48);
  asciiImage = createDiv();
  asciiDiv = createDiv(); // Create a div element to display the ASCII art
  asciiDiv.child(asciiImage); // Append the asciiImage div to the asciiDiv
}

function draw() {
  video.loadPixels();

  let newRow = ''; // Store each row of ASCII characters

  for (let j = 0; j < video.height; j++) {
    let row = '';
    for (let i = 0; i < video.width; i++) {
      let pixelIndex = (i + j * video.width) * 4;
      let r = video.pixels[pixelIndex + 0];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];
      let avg = (r + g + b) / 3;

      let len = density.length;
      let charIndex = floor(map(avg, 0, 255, 0, len - 1));
      const c = density.charAt(charIndex);

      if (c === ' ') {
        row += '&nbsp;';
      } else {
        row += c;
      }
    }
    newRow += row + '<br/>';
  }

  // Set the innerHTML of asciiImage to the newRow containing the ASCII characters
  asciiImage.html(newRow);
}
