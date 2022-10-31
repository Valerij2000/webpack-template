export default (function webpParser() {
  const dom = document.querySelector('body');
  let images = dom.querySelectorAll('img');

  function __replaceFormat(value) {
    return value.replace(/\.(jpe?g|png|gif)/gi, '.webp');
  }

  function __setAttribute(source, img, attr, newAttr) {
    let value = img.getAttribute(attr);
    if (value) {
      source.setAttribute(
        newAttr || attr,
        __replaceFormat(value)
      );
    }
  }

  for (let i = 0; i < images.length; i++) {
    let img = images[i];
    if (img.parentElement && img.parentElement.tagName === 'PICTURE') {
      let sources = img.parentElement.querySelectorAll('source');
      img.src = __replaceFormat(img.getAttribute('src'));
      sources.forEach(source => {
        source.srcset = __replaceFormat(source.getAttribute('srcset'));
      })
      continue;
    }
    let picture = document.createElement('picture');
    let source = document.createElement('source');
    source.setAttribute('type', 'image/webp');
    __setAttribute(source, img, 'sizes');
    __setAttribute(source, img, 'srcset');
    __setAttribute(source, img, 'media');

    if (!source.hasAttribute('srcset')) {
      __setAttribute(source, img, 'src', 'srcset');
    }

    img.parentElement.insertBefore(picture, img);
    picture.appendChild(source);
    picture.appendChild(img);
  }
}())