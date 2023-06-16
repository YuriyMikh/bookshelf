let calcScrollValue = () => {
    let scrollProgress = document.getElementById('progress');
    let progressValue = document.getElementById('progress-value');
    let pos = document.documentElement.scrollTop;
    // console.log(pos);
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // console.log(calcHeight);
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProgress.style.display = 'grid'; 
    } else {
        scrollProgress.style.display = 'none';
    }
    scrollProgress.addEventListener('click', () => {
        document.documentElement.scrollTop = 0;
    })
    scrollProgress.style.background = `conic-gradient(rgba(79, 46, 232, 0.3) ${scrollValue}%, #F6F6F6 ${scrollValue}%)`;
}
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;