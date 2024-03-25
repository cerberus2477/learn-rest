// a kódrészleteknél a másolás gomb kijelöli a kódot
function copyCode(button) {
   const preTag = button.previousElementSibling;
   const range = document.createRange();
   range.selectNode(preTag);

   try {
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      button.innerText = 'Másolva!';
      setTimeout(() => {
         button.innerText = 'Másolás';
      }, 2000);
   } catch (err) {
      console.error('Nem sikerült a szöveg másolása:', err);
   } finally {
      window.getSelection().removeAllRanges();
   }
}
