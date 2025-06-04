// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('#main-nav ul');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Fechar menu ao clicar em um link ou fora do menu
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            // Se clicou fora do menu ou no botão do menu
            if (!e.target.closest('#main-nav') && !e.target.closest('#mobile-menu-btn')) {
                navMenu.classList.remove('active');
                menuBtn.textContent = '☰';
            }
        }
    });

    // Rolagem suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ - Perguntas e respostas
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Fecha todas as outras respostas
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
            
            // Alterna a resposta atual
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });

    // Validação do formulário
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Elementos do formulário
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Elementos de erro
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            const successMsg = document.getElementById('success-message');

            // Resetar mensagens de erro
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';
            successMsg.style.display = 'none';

            // Validação do nome
            if (!name.value.trim()) {
                nameError.textContent = 'Por favor, insira seu nome';
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validação do email
            if (!email.value.trim()) {
                emailError.textContent = 'Por favor, insira seu e-mail';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                emailError.textContent = 'Por favor, insira um e-mail válido';
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validação do assunto
            if (!subject.value) {
                // Adicione um elemento de erro para o assunto se necessário
                isValid = false;
            }

            // Validação da mensagem
            if (!message.value.trim()) {
                messageError.textContent = 'Por favor, insira sua mensagem';
                messageError.style.display = 'block';
                isValid = false;
            }

            // Se o formulário for válido
            if (isValid) {
                // Simulação de envio (substitua por AJAX/API real)
                successMsg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                successMsg.style.display = 'block';
                
                // Resetar o formulário
                contactForm.reset();
                
                // Esconder a mensagem após 5 segundos
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Ativar link ativo na navegação durante a rolagem
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});