/**
 * ROSE GOLD - اسکریپت ماژولار و پایش منطقی فرانت‌آند لوکس عمارت زیبایی
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ۱. سیستم حذف پرلوئدر و آغاز به کار وب‌سایت پس از بارگذاری منابع گرافیکی
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // اجرای موتورهای متحرک و کانترها پس از اتمام لودر
                initScrollRevealEngine();
                initAnimatedStatistics();
            }, 500);
        }, 1000);
    }

    // ۲. مدیریت منوی کشویی موبایل (Mobile Drawer Framework)
    const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
    const navNavigation = document.getElementById('navNavigation');
    
    if (mobileMenuTrigger && navNavigation) {
        mobileMenuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            navNavigation.classList.toggle('active');
            const icon = mobileMenuTrigger.querySelector('i');
            if (navNavigation.classList.contains('active')) {
                icon.className = 'fas fa-xmark';
            } else {
                icon.className = 'fas fa-bars-staggered';
            }
        });

        // بستن منو با کلیک بر روی فضاهای خالی بیرونی داک ناوبری
        document.addEventListener('click', (e) => {
            if (!navNavigation.contains(e.target) && !mobileMenuTrigger.contains(e.target)) {
                navNavigation.classList.remove('active');
                mobileMenuTrigger.querySelector('i').className = 'fas fa-bars-staggered';
            }
        });
    }

    // ۳. بستن خودکار منوی موبایل پس از کلیک روی لینک‌های پرش داخلی (Smooth UX)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navNavigation) navNavigation.classList.remove('active');
            if (mobileMenuTrigger) mobileMenuTrigger.querySelector('i').className = 'fas fa-bars-staggered';
        });
    });

    // ۴. ساختار عملکرد آکاردئونی سوالات متداول (FAQ Accordion Logic)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // بستن سایر المان‌های آکاردئون جهت خوانایی بهتر کلاینت (Single Open Mode)
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });

    // ۵. افکت چسبندگی هدر و تغییر ظاهر هنگام اسکرول صفحه (Sticky Header Transition)
    const mainHeader = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (mainHeader) {
            if (window.scrollY > 60) {
                mainHeader.style.padding = '2px 0';
                mainHeader.style.background = 'rgba(255, 253, 249, 0.98)';
                mainHeader.style.boxShadow = '0 10px 30px rgba(196, 139, 159, 0.05)';
            } else {
                mainHeader.style.padding = '';
                mainHeader.style.background = 'var(--glass-bg)';
                mainHeader.style.boxShadow = 'none';
            }
        }
        
        // پایش موقعیت اسکرول جهت فعال‌سازی منوهای اکتیو (ScrollSpy Tracker)
        trackScrollSpyNavigation();
    });

    function trackScrollSpyNavigation() {
        const currentScrollPos = window.scrollY + 140;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(sec => {
            const id = sec.getAttribute('id');
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            
            if (currentScrollPos >= top && currentScrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ۶. انیمیشن نمایان شدن تدریجی المان‌ها حین اسکرول (Scroll Reveal System)
    function initScrollRevealEngine() {
        const revealTargets = document.querySelectorAll('.scroll-reveal');
        
        const executeReveal = () => {
            revealTargets.forEach(target => {
                const elementTop = target.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;
                if (elementTop < viewportHeight * 0.88) {
                    target.classList.add('revealed');
                }
            });
        };

        window.addEventListener('scroll', executeReveal);
        executeReveal(); // اجرای تک‌مرتبه‌ای برای بخش‌های بالایی صفحه هیرو
    }

    // ۷. سیستم افزایش عددی آمار سالن زیبایی (Digital Statistics Counter)
    function initAnimatedStatistics() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const frameSpeedFactor = 120;

        const animateCounter = (counter) => {
            const targetValue = +counter.getAttribute('data-target');
            const currentValue = +counter.innerText;
            const stepValue = targetValue / frameSpeedFactor;

            if (currentValue < targetValue) {
                counter.innerText = Math.ceil(currentValue + stepValue);
                setTimeout(() => animateCounter(counter), 15);
            } else {
                // فرمت‌دهی کاراکترهای پسوند پس از خاتمه شمارش دیجیتال
                if (targetValue === 18200 || targetValue === 9650) {
                    counter.innerText = targetValue.toLocaleString('fa-IR') + '+';
                } else if (targetValue === 12) {
                    counter.innerText = targetValue + ' سال';
                } else {
                    counter.innerText = targetValue + '+';
                }
            }
        };

        // استفاده از Intersection Observer جهت بهینه‌سازی پرفورمنس اجرای اسکریپت
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(num => animateCounter(num));
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });

            observer.observe(statsSection);
        }
    }

    // ۸. هندلینگ و شبیه‌سازی ارسال فرم رزرو نوبت کلاینت زیبایی
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cName = document.getElementById('clientName').value;
            const cPhone = document.getElementById('clientPhone').value;
            
            alert(`خانم ${cName} عزیز، درخواست رزو نوبت گرید پلاتینیوم شما در لایه ایمن عمارت ثبت گردید. کارشناسان پذیرش ما به زودی با خط تلفن ${cPhone} تماس حاصل خواهند کرد.`);
            appointmentForm.reset();
        });
    }
});