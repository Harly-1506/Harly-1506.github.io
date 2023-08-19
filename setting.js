function updateLinkAndPreview() {
    let focus = document.getElementById('focus').value;
    let breakTime = document.getElementById('break').value;
    let reps = document.getElementById('reps').value;
    let color = document.getElementById('color').value;
    let timerFont = document.getElementById('timerFont').value;
    let sessionFont = document.getElementById('sessionFont').value;
    let alignment = document.getElementById('alignment').value;
    let link = `https://harly-1506.github.io/timer.html?focus=${focus}&break=${breakTime}&reps=${reps}&color=${encodeURIComponent(color)}&timerFont=${encodeURIComponent(timerFont)}&sessionFont=${encodeURIComponent(sessionFont)}&alignment=${alignment}`;
    document.getElementById('link').href = link;
    document.getElementById('link').innerHTML = link;

    let preview = document.getElementById('preview');
    preview.style.color = color;
    preview.style.textAlign = alignment;
    preview.children[0].style.fontFamily = sessionFont;
    preview.children[1].style.fontFamily = timerFont;
    let minutes = focus;
    preview.children[1].innerHTML = `${minutes.toString().padStart(2, '0')}:00`;
}

document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
});

document.querySelectorAll('#myForm input, #myForm select').forEach(function(elem) {
    elem.addEventListener('change', updateLinkAndPreview);
});

document.getElementById('link').addEventListener('click', function(e) {
    e.preventDefault();
    navigator.clipboard.writeText(this.href);
});

updateLinkAndPreview();