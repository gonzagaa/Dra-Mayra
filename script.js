

AOS.init(
  {
      duration: 1200,
  }
);

const larguraDaTela = window.innerWidth
  
if (larguraDaTela < 800) {
    var swiper3 = new Swiper(".mySwiper3", {
        grabCursor: true,

        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
          },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        spaceBetween: 30,
      });
} else {
    var swiper3 = new Swiper(".mySwiper3", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}

// Seleciona os novos botões para abrir o modal
const openModalButtons = document.querySelectorAll('.openModalForm');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('closeModal');

// Variável para armazenar a origem do modal (WhatsApp ou Obrigado)
let redirectType = null;

// Função para abrir o modal e definir o tipo de redirecionamento
function openModal(event) {
    modalOverlay.classList.add('active');

    // Verifica qual botão foi clicado e define o tipo de redirecionamento
    if (event.target.closest('.btn-whatsapp-pulse')) {
        redirectType = 'whatsapp';
    } else {
        redirectType = 'obrigado';
    }
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
    redirectType = null; // Reseta a variável
}

// Adiciona evento para abrir o modal nos novos botões
openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// Fecha o modal ao clicar no botão de fechar
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Fecha o modal ao clicar na overlay
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});
