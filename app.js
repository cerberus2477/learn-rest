document.getElementById('copyButton').addEventListener('click', function() {
    const preTag = document.getElementById('myPreTag');
    const range = document.createRange();
    range.selectNode(preTag);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
   
    try {
       document.execCommand('copy');
       this.innerText = 'Copied!';
       setTimeout(() => {
         this.innerText = 'Copy';
       }, 2000);
    } catch (err) {
       console.error('Unable to copy text:', err);
    } finally {
       window.getSelection().removeAllRanges();
    }
   });
   