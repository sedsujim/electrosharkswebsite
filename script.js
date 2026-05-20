const portfolioHamburger = document.getElementById('portfolio-hamburger-btn');
        const portfolioTabs = document.getElementById('portfolio-tabs');
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        if (portfolioHamburger) {
            portfolioHamburger.addEventListener('click', () => {
                portfolioTabs.classList.toggle('open');
                const icon = portfolioHamburger.querySelector('i');
                if (portfolioTabs.classList.contains('open')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        }

        function activatePanel(targetId, updateHash = true) {
            const selectedPanel = document.getElementById(targetId);
            const selectedButton = document.querySelector(`[data-target="${targetId}"]`);

            if (!selectedPanel || !selectedButton) return;

            tabButtons.forEach((button) => {
                const isActive = button === selectedButton;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-selected', String(isActive));
            });

            tabPanels.forEach((panel) => {
                panel.classList.toggle('active', panel.id === targetId);
            });

            if (updateHash) {
                history.replaceState(null, '', `#${targetId}`);
            }

      
            if (portfolioTabs.classList.contains('open')) {
                portfolioTabs.classList.remove('open');
                portfolioHamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }

            const tabsContainer = document.getElementById('tabs-container');
            const containerTop = tabsContainer.getBoundingClientRect().top + window.scrollY;
            
            if (window.scrollY > containerTop) {
                 window.scrollTo({
                     top: containerTop - 20, 
                     behavior: 'smooth'
                 });
            }
        }

        tabButtons.forEach((button) => {
            button.addEventListener('click', () => activatePanel(button.dataset.target));
        });

        const initialPanel = window.location.hash.replace('#', '');
        if (initialPanel && document.getElementById(initialPanel)) {
            activatePanel(initialPanel, false);
        }