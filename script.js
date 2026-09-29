document.addEventListener('DOMContentLoaded', () => {

    configurarFormulario();

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener('click', () => {

            mobileNav.classList.toggle('active');

            const menuAberto = mobileNav.classList.contains('active');

            menuToggle.setAttribute(
                'aria-expanded',
                menuAberto ? 'true' : 'false'
            );

            menuToggle.setAttribute(
                'aria-label',
                menuAberto ? 'Fechar menu' : 'Abrir menu'
            );
        });

        const linksMenu = mobileNav.querySelectorAll('a');

        linksMenu.forEach(link => {

            link.addEventListener('click', () => {

                mobileNav.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                menuToggle.setAttribute(
                    'aria-label',
                    'Abrir menu'
                );
            });

        });
    }

});