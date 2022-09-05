// DOM内容加载完成后执行
window.addEventListener('DOMContentLoaded', function () {

    // 4. 封装函数docsifyBackTopFn()
    // 4.1 调用函数
    docsifyBackTopFn(docsifyBackTop.size, docsifyBackTop.bottom, docsifyBackTop.right, docsifyBackTop.logo, docsifyBackTop.bgColor);
    // 4.2 封装函数
    function docsifyBackTopFn(backTopSize, backTopBottom, backTopRight, backTopLogo, backTopBGColor) {

        // 1. 创建元素
        // 1.1 获取body元素
        var body = document.body;
        // 1.2 创建回到顶部组件div
        var div = document.createElement('div');
        div.className = 'backTop';
        div.innerHTML = backTopLogo;
        body.appendChild(div);
        // 1.3 回到顶部CSS
        div.style.opacity = 0;
        div.style.position = 'fixed';
        div.style.bottom = backTopBottom + 'px';
        div.style.right = backTopRight + 'px';
        div.style.width = backTopSize + 'px';
        div.style.height = div.style.width;
        div.style.textAlign = 'center';
        div.style.lineHeight = div.style.width;
        div.style.backgroundColor = backTopBGColor;
        div.style.borderRadius = '50%';
        div.style.cursor = 'pointer';
        div.style.transition = 'opacity 0.5s';

        // 1.4 svg CSS 如果存在则设置宽高
        if (div.children.length) {
            div.children[0].style.width = '100%';
            div.children[0].style.height = '100%';
        }

        // 2.点击回到顶部
        div.addEventListener('click', function () {
            backToTopAnimate(window, 0);
        });
        // 2.1 回到顶部缓动函数封装
        function backToTopAnimate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var step = (target - obj.scrollY) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.scrollY == target) {
                    clearInterval(obj.timer);
                    callback && callback();
                }
                window.scroll(0, obj.scrollY + step);
            }, 15);
        }

        // 3.显示与隐藏
        window.addEventListener('scroll', function () {
            div.style.opacity = window.scrollY > 0 ? 1 : 0;
        });

    }
});