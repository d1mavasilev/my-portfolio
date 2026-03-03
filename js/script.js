// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const sharedFooterMarkup = `
        <div class="container">
            <p>
                © Dmitrii Vasilev, 2026 ·
                <a href="https://t.me/d_vasilev">Telegram</a> ·
                <a href="mailto:dvasilevdesign@gmail.com">dvasilevdesign@gmail.com</a>
            </p>
        </div>
    `;

    document.querySelectorAll('footer.footer[data-component="site-footer"]').forEach(function(footer) {
        footer.innerHTML = sharedFooterMarkup;
    });
    
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для добавления класса visible
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Запуск при загрузке и скролле
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);

    // РџРµСЂРµРјРµС‰РµРЅРёРµ Р°РІР°С‚Р°СЂР° РІ С…Р»РµР±РЅС‹Рµ РєСЂРѕС€РєРё РїСЂРё СЃРєСЂРѕР»Р»Рµ
    const heroImage = document.querySelector('.hero-image');
    const heroAvatar = heroImage ? heroImage.querySelector('img') : null;
    const breadcrumbsAvatar = document.querySelector('.breadcrumbs-avatar');
    const header = document.querySelector('.header');

    if (heroImage && heroAvatar && breadcrumbsAvatar) {
        function moveAvatarToHeader() {
            if (!breadcrumbsAvatar.contains(heroAvatar)) {
                breadcrumbsAvatar.appendChild(heroAvatar);
                document.body.classList.add('avatar-in-header');
            }
        }

        function moveAvatarToHero() {
            if (!heroImage.contains(heroAvatar)) {
                heroImage.appendChild(heroAvatar);
                document.body.classList.remove('avatar-in-header');
            }
        }

        function handleAvatarPlacement() {
            const headerHeight = header ? header.offsetHeight : 0;
            const rect = heroImage.getBoundingClientRect();
            const triggerPoint = headerHeight + 8;

            if (rect.top <= triggerPoint) {
                moveAvatarToHeader();
            } else {
                moveAvatarToHero();
            }
        }

        handleAvatarPlacement();
        window.addEventListener('scroll', handleAvatarPlacement);
        window.addEventListener('resize', handleAvatarPlacement);
    }
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // РЈРІРµР»РёС‡РµРЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёР№ РїСЂРѕРµРєС‚Р°
    const zoomableImages = document.querySelectorAll('.project-image img');
    if (zoomableImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Увеличенное изображение');

        const lightboxImage = document.createElement('img');
        lightbox.appendChild(lightboxImage);
        document.body.appendChild(lightbox);

        function openLightbox(src, alt) {
            lightboxImage.src = src;
            lightboxImage.alt = alt || '';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        zoomableImages.forEach(function(image) {
            image.addEventListener('click', function() {
                openLightbox(image.src, image.alt);
            });
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === lightboxImage) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }
    
});
