document.addEventListener('DOMContentLoaded', function () {
  const viewToggle = document.getElementById('viewToggle');
  const weeklyView = document.getElementById('weeklyView');
  const tabularView = document.getElementById('tabularView');

  viewToggle.addEventListener('click', function () {
    if (weeklyView.classList.contains('hidden')) {
      weeklyView.classList.remove('hidden');
      tabularView.classList.add('hidden');
      viewToggle.innerHTML = '<i class="fas fa-table mr-2"></i>Tabular View';
    } else {
      weeklyView.classList.add('hidden');
      tabularView.classList.remove('hidden');
      viewToggle.innerHTML = '<i class="fas fa-calendar-week mr-2"></i>Weekly View';
    }
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', function () {
    const filter = this.value.toUpperCase();
    const cards = document.querySelectorAll('.schedule-card');

    cards.forEach(card => {
      const text = card.textContent || card.innerText;
      card.style.display = text.toUpperCase().includes(filter) ? '' : 'none';
    });
  });

  const dayFilter = document.getElementById('dayFilter');
  dayFilter.addEventListener('change', function () {
    const selectedDay = this.value;
    const daySections = document.querySelectorAll('#weeklyView > div');

    if (selectedDay === 'all') {
      daySections.forEach(section => section.style.display = '');
    } else {
      daySections.forEach(section => {
        const dayTitle = section.querySelector('div:first-child').textContent;
        const match = selectedDay === 'M' ? 'Monday' :
                      selectedDay === 'T' ? 'Tuesday' :
                      selectedDay === 'W' ? 'Wednesday' :
                      'Friday';
        section.style.display = dayTitle.includes(match) ? '' : 'none';
      });
    }
  });

  const labModal = document.getElementById('labModal');
  const modalSubject = document.getElementById('modalSubject');
  const modalTime = document.getElementById('modalTime');
  const modalLocation = document.getElementById('modalLocation');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('.lab-bg').forEach(card => {
    card.addEventListener('click', function () {
      const subject = this.querySelector('h3').textContent;
      const time = this.querySelector('p.text-sm').textContent;
      const location = this.querySelector('p.mt-2').textContent;

      modalSubject.textContent = subject;
      modalTime.textContent = time;
      modalLocation.textContent = location;

      labModal.classList.remove('modal-hidden');
      labModal.classList.add('modal-visible');

      setTimeout(() => {
        labModal.querySelector('.modal-content').classList.remove('modal-content-hidden');
        labModal.querySelector('.modal-content').classList.add('modal-content-visible');
      }, 10);
    });
  });

  closeModal.addEventListener('click', () => {
    labModal.querySelector('.modal-content').classList.remove('modal-content-visible');
    labModal.querySelector('.modal-content').classList.add('modal-content-hidden');
    setTimeout(() => {
      labModal.classList.remove('modal-visible');
      labModal.classList.add('modal-hidden');
    }, 300);
  });

  labModal.addEventListener('click', function (e) {
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
