
document.getElementById('btnAddLink1').addEventListener('click', function(e) {
    openModal('#modalLink',e);
  },false)
  document.getElementById('btnAddLink2').addEventListener('click', function(e) {
    openModal('#modalLink',e);
  },false)

  document.querySelector('#inputFlags .flags__desc--arrow').addEventListener('click', function(e) {
    data = document.querySelector('#inputFlags .flags__select');
    data.classList.toggle('flags__select--show');
    dataHideChoice = document.querySelector('#modalChoice').classList.toggle('display-none');
});

document.querySelectorAll('#inputFlags .flags__select--field').forEach(function(node) {
    node.addEventListener('click', function(e) {
    console.dir(node);
    console.log(node.children[0].src);
    var a = node.children[0].src;
    dataFlag = document.querySelector('#inputFlags .flags__main .flags__icon');
    dataName = document.querySelector('#inputFlags .flags__main .flags__desc');
     
    dataName.textContent = node.textContent;  
    dataFlag.src = node.children[0].src;
    data.classList.toggle('flags__select--show');
    dataHideChoice = document.querySelector('#modalChoice').classList.toggle('display-none');
    });
});
  
  