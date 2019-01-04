document.querySelectorAll('.check-box').forEach(function(check) {
    check.addEventListener('click', function(e) {
      e.preventDefault()
        console.dir(this.children[0]);
        this.children[0].checked = !this.children[0].checked;
    })
})
