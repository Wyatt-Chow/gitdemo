//锁定下拉
var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop
            ,totalScroll = el.scrollHeight
            ,currentScroll = top + el.offsetHeight;
        if(top === 0) {
            el.scrollTop = 1;
        }else if(currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });

    el.addEventListener('touchmove', function(evt) {
        if(el.offsetHeight < el.scrollHeight)
            evt._isScroller = true;
    });
}

overscroll(document.querySelector('.content'));
overscroll(document.querySelector('.a .content'));
overscroll(document.querySelector('.b .content'));
overscroll(document.querySelector('.c .content'));
overscroll(document.querySelector('.d .content'));

document.body.addEventListener('touchmove', function(evt) {
    if(!evt._isScroller) {
        evt.preventDefault();
    }
});
