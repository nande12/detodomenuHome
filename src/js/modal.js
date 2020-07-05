const theForm = document.querySelector('.form-custom');
const theModal = document.getElementById('modal');

theForm.addEventListener('click', e => {
  
  if (e.target.classList.contains('submit-btn')) {
    openModal(e);
  }

})

theModal.addEventListener('click', e => {

  if (e.target.classList.contains('close-modal')) {
    closeModal();
  }

})

function openModal(e) {
  e.preventDefault();
  theModal.classList.remove('is-hidden');
}

function closeModal() {
  theModal.classList.add('is-hidden');
}