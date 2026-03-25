const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// ==========================================
// 摄影作品 Lightbox (点击放大) 逻辑
// ==========================================

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // 获取被点击元素的背景图片 URL
    const style = window.getComputedStyle(element);
    const bgImage = style.backgroundImage;
    
    // 将背景图赋值给灯箱内容区
    lightboxImg.style.backgroundImage = bgImage;
    
    // 显示灯箱
    lightbox.classList.add('show');
    // 阻止底层页面滚动
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // 隐藏灯箱
    lightbox.classList.remove('show');
    // 恢复底层页面滚动
    document.body.style.overflow = 'auto';
}

// 监听键盘事件：按 ESC 键关闭灯箱
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});