import { useEffect, useMemo, useRef, useState } from 'react';
import Carousel from './Carousel.jsx';

const whatsappNumber = '556581313761';
const whatsappMessage = encodeURIComponent(
  'Olá, Isabelly! Vim pelo catálogo e gostaria de conhecer as máquinas disponíveis.',
);

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const instagramLink = 'https://www.instagram.com/isabelly_rufino?stkn=cXdqbXp0b2R3cDVq';

function InstagramIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle className="social-icon-dot" cx="17.4" cy="6.7" r="1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 3.8A11.55 11.55 0 0 0 12 0.4C5.62.4.43 5.59.43 11.97c0 2.03.53 4.02 1.54 5.77L.33 23.6l6-1.57a11.55 11.55 0 0 0 5.67 1.46h.01c6.38 0 11.56-5.19 11.56-11.57 0-3.1-1.2-6-3.37-8.12Zm-8.2 17.71h-.01a9.58 9.58 0 0 1-4.88-1.34l-.35-.21-3.56.93.95-3.47-.23-.36a9.57 9.57 0 0 1-1.47-5.08c0-5.27 4.29-9.56 9.57-9.56 2.55 0 4.95 1 6.76 2.81a9.51 9.51 0 0 1 2.8 6.77c0 5.27-4.29 9.56-9.58 9.56Zm5.25-7.17c-.29-.15-1.69-.83-1.95-.92-.26-.1-.45-.15-.64.15-.19.29-.73.92-.9 1.1-.16.2-.33.22-.62.07-1.7-.85-2.82-1.52-3.94-3.44-.3-.52.3-.48.86-1.59.1-.2.05-.37-.03-.52-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.54c-.19 0-.5.07-.76.37-.26.29-1 .98-1 2.4 0 1.42 1.03 2.8 1.17 2.99.15.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.62.69.22 1.32.19 1.82.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}

const categories = [
  {
    title: 'Linha amarela',
    description: 'Máquinas pesadas para construção, obras e infraestrutura.',
    folder: '3-fotos-linha-amarela',
  },
  {
    title: 'Linha verde',
    description: 'Equipamentos para o campo e operações rurais.',
    folder: '4-fotos-linha-verde',
  },
  {
    title: 'Caminhões e carretas',
    description: 'Opções novas e seminovas para diferentes operações.',
    folder: '5-fotos-caminhoes-e-carretas',
  },
];

const frequentlyAskedQuestions = [
  {
    question: 'Quais tipos de máquinas estão disponíveis?',
    answer: 'Trabalhamos com máquinas da linha amarela, linha verde, caminhões e carretas. A disponibilidade muda conforme o estoque, então fale pelo WhatsApp para consultar as opções atuais.',
  },
  {
    question: 'Vocês atendem em todo o Brasil?',
    answer: 'Sim. O atendimento é realizado para clientes de todo o Brasil, com orientação sobre a máquina e a logística de cada negociação.',
  },
  {
    question: 'As máquinas são novas ou seminovas?',
    answer: 'Há opções novas e seminovas. Informações como modelo, ano, estado de conservação, localização e condições são confirmadas durante o atendimento.',
  },
  {
    question: 'É possível consultar financiamento ou crédito?',
    answer: 'A Isabelly pode orientar sobre alternativas de crédito rural e imobiliário conforme o perfil da negociação. As condições dependem de análise e aprovação.',
  },
  {
    question: 'Como faço para consultar uma máquina?',
    answer: 'Veja as categorias e as fotos disponíveis nesta página. Depois, use o WhatsApp no topo ou o botão flutuante para informar o que você procura e receber as opções atuais.',
  },
];

// Cada subpasta em src/assets/maquinas vira uma galeria automaticamente.
// Basta adicionar fotos numeradas (01.jpg, 02.jpg, ...) na pasta correta.
const imageModules = import.meta.glob('./assets/maquinas/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

const imagesByFolder = {};
Object.entries(imageModules).forEach(([path, url]) => {
  const match = path.match(/assets\/maquinas\/([^/]+)\//);
  if (!match) return;
  const folder = match[1];
  (imagesByFolder[folder] ||= []).push({ path, url });
});
Object.values(imagesByFolder).forEach((files) => {
  files.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
});

function getFolderImages(folder) {
  return (imagesByFolder[folder] || []).map((file) => file.url);
}

function App() {
  const heroVisualRef = useRef(null);
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [profileImageFailed, setProfileImageFailed] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);
  const heroImages = useMemo(() => getFolderImages('2-foto-principal-topo-pagina'), []);
  const profileImages = useMemo(() => getFolderImages('1-foto-perfil-isabelly'), []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    // Elementos que já começam visíveis na tela (ex.: o hero) recebem a
    // classe de imediato, sem depender do primeiro disparo assíncrono do
    // IntersectionObserver — evita o conteúdo ficar preso em opacidade 0.
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('is-visible');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealElements.forEach((element) => observer.observe(element));

    // Rede de segurança: garante que nenhum bloco fique invisível para
    // sempre caso o observer não dispare por algum motivo.
    const fallbackTimer = window.setTimeout(() => {
      revealElements.forEach((element) => element.classList.add('is-visible'));
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const handleScroll = () => {
      if (!heroVisualRef.current) return;
      const offset = Math.min(window.scrollY * 0.08, 36);
      heroVisualRef.current.style.setProperty('--hero-parallax', `${offset}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Voltar ao início">
          {profileImages[0] && !profileImageFailed ? (
            <img
              className="brand-photo"
              src={profileImages[0]}
              alt="Isabelly"
              onError={() => setProfileImageFailed(true)}
            />
          ) : (
            <span className="brand-mark">I</span>
          )}
          <span>ISABELLY</span>
        </a>
        <nav className="header-links" aria-label="Canais de contato">
          <a className="header-link" href={instagramLink} target="_blank" rel="noreferrer">
            <InstagramIcon /> <span>Instagram</span>
          </a>
          <a className="header-link" href={whatsappLink} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> <span>Falar no WhatsApp</span>
          </a>
        </nav>
      </header>

      <div className="highlight-strip" role="note">
        <div className="section-shell highlight-strip-inner">
          <span>Atendimento em todo o Brasil</span>
          <span aria-hidden="true">•</span>
          <span>Máquinas novas e seminovas</span>
          <span aria-hidden="true">•</span>
          <span>Negociação com acompanhamento próximo</span>
        </div>
      </div>

      <section className="hero section-shell" id="inicio">
        <div className="hero-copy" data-reveal="left">
          <p className="eyebrow">Máquinas para o próximo passo</p>
          <h1>O equipamento certo para fazer seu negócio avançar.</h1>
          <p className="hero-text">
            Máquinas pesadas, caminhões e carretas, com atendimento humano e
            transparente em todo o Brasil.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#catalogo">Ver catálogo <span>↓</span></a>
          </div>
          <p className="hero-note">Novos e seminovos · Pronta entrega e encomenda</p>
        </div>
        <div className="hero-visual" data-reveal="right" ref={heroVisualRef} aria-label="Foto principal da máquina">
          {heroImages[0] && !heroImageFailed ? (
            <img
              className="hero-photo"
              src={heroImages[0]}
              alt="Máquina em destaque"
              fetchPriority="high"
              decoding="async"
              onError={() => setHeroImageFailed(true)}
            />
          ) : (
            <div className="image-placeholder">
              <span>Foto principal<br />a inserir</span>
            </div>
          )}

        </div>
      </section>

      <section className="catalog section-shell" id="catalogo">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2>Encontre sua próxima máquina.</h2>
          </div>
          <p>Consulte disponibilidade, localização e condições pelo WhatsApp.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div className="category-card" data-reveal data-delay={index} key={category.title}>
              <div className="category-image">
                <Carousel
                  images={getFolderImages(category.folder)}
                  alt={category.title}
                  placeholderLabel="Foto a inserir"
                />
              </div>
              <div className="category-content">
                <div className="category-title-row">
                  <h3>{category.title}</h3>
                  <span className="category-status">Disponível</span>
                </div>
                <p>{category.description}</p>
                <div className="category-meta">
                  <span>Novos e seminovos</span>
                  <span>Consulte condições</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="why-us section-shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Por que negociar com a Isabelly?</p>
            <h2>Mais clareza para uma decisão importante.</h2>
          </div>
          <p>Você encontra orientação em cada etapa, do primeiro contato à logística.</p>
        </div>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-number">01</span>
            <h3>Atendimento humano</h3>
            <p>Conversa direta para entender sua operação e indicar caminhos que façam sentido.</p>
          </article>
          <article className="why-card">
            <span className="why-number">02</span>
            <h3>Negociação transparente</h3>
            <p>Informações sobre disponibilidade, localização e condições são alinhadas com clareza.</p>
          </article>
          <article className="why-card">
            <span className="why-number">03</span>
            <h3>Alcance nacional</h3>
            <p>Atendimento para todo o Brasil, com acompanhamento próximo em cada negociação.</p>
          </article>
          <article className="why-card">
            <span className="why-number">04</span>
            <h3>Visão completa</h3>
            <p>Além da máquina, você recebe orientação sobre crédito e logística para planejar melhor.</p>
          </article>
        </div>
      </section>

      <section className="about section-shell" data-reveal>
        <div className="about-photo">
          {profileImages[0] && !profileImageFailed ? (
            <img src={profileImages[0]} alt="Isabelly, responsável pelo atendimento" loading="lazy" onError={() => setProfileImageFailed(true)} />
          ) : (
            <div className="about-initial" aria-hidden="true">I</div>
          )}
        </div>
        <div className="about-copy">
          <p className="eyebrow">Quem está com você</p>
          <h2>Atendimento próximo para você negociar com confiança.</h2>
          <p>Meu objetivo é entender o que você precisa e ajudar a encontrar uma solução que combine com o seu momento e com a sua operação.</p>
          <p>Conte comigo para consultar opções, esclarecer condições e acompanhar os próximos passos com transparência.</p>
          <a className="about-link" href={instagramLink} target="_blank" rel="noreferrer"><InstagramIcon /> Conheça mais no Instagram</a>
        </div>
      </section>

      <section className="consulting" data-reveal>
        <div className="section-shell consulting-inner">
          <div>
            <p className="eyebrow">Do seu jeito</p>
            <h2>Negociação clara, do primeiro contato ao fechamento.</h2>
          </div>
          <div className="benefit-list">
            <div><span>01</span><p><strong>Atendimento consultivo</strong> para encontrar uma condição que faça sentido para você.</p></div>
            <div><span>02</span><p><strong>Crédito imobiliário e rural</strong> para viabilizar sua compra com mais tranquilidade.</p></div>
            <div><span>03</span><p><strong>Logística incluída</strong> e acompanhamento próximo em todo o processo.</p></div>
          </div>
        </div>
      </section>

      <section className="process section-shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Como funciona</p>
            <h2>Da escolha da máquina ao próximo passo.</h2>
          </div>
          <p>Um atendimento próximo para você decidir com mais segurança.</p>
        </div>
        <div className="process-grid">
          <div className="process-step">
            <span>01</span>
            <h3>Conte o que você precisa</h3>
            <p>Informe o tipo de operação, máquina ou veículo que procura.</p>
          </div>
          <div className="process-step">
            <span>02</span>
            <h3>Receba as opções</h3>
            <p>Consultamos disponibilidade, localização e condições atuais.</p>
          </div>
          <div className="process-step">
            <span>03</span>
            <h3>Negocie com clareza</h3>
            <p>Acompanhamos os próximos passos até a conclusão presencial.</p>
          </div>
        </div>
      </section>

      <section className="faq section-shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>Informação para escolher melhor.</h2>
          </div>
        </div>
        <div className="faq-list">
          {frequentlyAskedQuestions.map((item, index) => {
            const isOpen = openQuestion === index;
            return (
              <div className={isOpen ? 'faq-item is-open' : 'faq-item'} key={item.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenQuestion(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="contact section-shell" data-reveal>
        <div>
          <p className="eyebrow">Vamos conversar?</p>
          <h2>Me diga o que você procura.</h2>
          <p>Use o WhatsApp no topo da página para receber as opções disponíveis e as condições atuais.</p>
          <a className="contact-instagram" href={instagramLink} target="_blank" rel="noreferrer">
            <InstagramIcon /> Acompanhe novidades no Instagram
          </a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <span>ISABELLY</span>
        <span>Atendimento em todo o Brasil</span>
      </footer>
      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar com Isabelly pelo WhatsApp">
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
      <a className="floating-instagram" href={instagramLink} target="_blank" rel="noreferrer" aria-label="Visitar o Instagram da Isabelly">
        <InstagramIcon />
        <span>Instagram</span>
      </a>
    </main>
  );
}

export default App;
