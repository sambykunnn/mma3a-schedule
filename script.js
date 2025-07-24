document.addEventListener('DOMContentLoaded', function() {
    // View Selector
    const viewSelect = document.getElementById('viewSelect');
    const weeklyView = document.getElementById('weeklyView');
    const tabularView = document.getElementById('tabularView');
    const timelineView = document.getElementById('timelineView');
    const rowView = document.getElementById('rowView');
    
    viewSelect.addEventListener('change', function() {
        const selectedView = this.value;
        
        // Hide all views
        weeklyView.classList.add('hidden');
        tabularView.classList.add('hidden');
        timelineView.classList.add('hidden');
        rowView.classList.add('hidden');
        
        // Show selected view
        if (selectedView === 'weekly') {
            weeklyView.classList.remove('hidden');
        } else if (selectedView === 'tabular') {
            tabularView.classList.remove('hidden');
        } else if (selectedView === 'timeline') {
            timelineView.classList.remove('hidden');
        } else if (selectedView === 'rows') {
            rowView.classList.remove('hidden');
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function() {
        const filter = this.value.toUpperCase();
        
        // Handle search for weekly view
        const weeklyCards = document.querySelectorAll('#weeklyView .schedule-card');
        weeklyCards.forEach(card => {
            const text = card.textContent || card.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
        
        // Handle search for tabular view
        const tabularRows = document.querySelectorAll('#tabularView tbody tr');
        tabularRows.forEach(row => {
            const text = row.textContent || row.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
        
        // Handle search for timeline view
        const timelineItems = document.querySelectorAll('#timelineView .time-slot');
        timelineItems.forEach(item => {
            const text = item.textContent || item.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
        
        // Handle search for row view
        const rowItems = document.querySelectorAll('#rowView > div > div');
        rowItems.forEach(item => {
            const text = item.textContent || item.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Day Filter
    const dayFilter = document.getElementById('dayFilter');
    dayFilter.addEventListener('change', function() {
        const selectedDay = this.value;
        const daySections = document.querySelectorAll('#weeklyView > div');
        
        if (selectedDay === 'all') {
            daySections.forEach(section => {
                section.style.display = "";
            });
        } else {
            daySections.forEach(section => {
                const dayTitle = section.querySelector('div:first-child').textContent;
                if (dayTitle.includes(selectedDay === 'M' ? 'Monday' : 
                                    selectedDay === 'T' ? 'Tuesday' : 
                                    selectedDay === 'W' ? 'Wednesday' : 'Friday')) {
                    section.style.display = "";
                } else {
                    section.style.display = "none";
                }
            });
        }
    });

    // Modal for Lab Details
    const labModal = document.getElementById('labModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubject = document.getElementById('modalSubject');
    const modalTime = document.getElementById('modalTime');
    const modalLocation = document.getElementById('modalLocation');
    const closeModal = document.getElementById('closeModal');
    
    // Global function to show lab details
    window.showLabDetails = function(subject, time, location) {
        modalTitle.textContent = 'Lab Session Details';
        modalSubject.textContent = subject;
        modalTime.textContent = time;
        modalLocation.textContent = location;
        
        // Show modal with animation
        labModal.classList.remove('modal-hidden');
        labModal.classList.add('modal-visible');
        setTimeout(() => {
            labModal.querySelector('.modal-content').classList.remove('modal-content-hidden');
            labModal.querySelector('.modal-content').classList.add('modal-content-visible');
        }, 10);
    };
    
    closeModal.addEventListener('click', function() {
        // Hide modal with animation
        labModal.querySelector('.modal-content').classList.remove('modal-content-visible');
        labModal.querySelector('.modal-content').classList.add('modal-content-hidden');
        setTimeout(() => {
            labModal.classList.remove('modal-visible');
            labModal.classList.add('modal-hidden');
        }, 300);
    });
    
    // Close modal when clicking outside
    labModal.addEventListener('click', function(e) {
        if (e.target === labModal) {
            labModal.querySelector('.modal-content').classList.remove('modal-content-visible');
            labModal.querySelector('.modal-content').classList.add('modal-content-hidden');
            setTimeout(() => {
                labModal.classList.remove('modal-visible');
                labModal.classList.add('modal-hidden');
            }, 300);
        }
    });
});
