import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Ovos caipiras",
    type: "Galinha",
    category: "galinha",
    detail: "Dúzia • casca marrom",
    price: 14.9,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chicken%20eggs.jpg?width=900",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chicken%20eggs.jpg?width=900",
      "https://upload.wikimedia.org/wikipedia/commons/1/12/6-Pack-Chicken-Eggs.jpg",
    ],
    tone: "sun",
  },
  {
    id: 2,
    name: "Ovos de pato",
    type: "Pato",
    category: "pato",
    detail: "Dúzia • extra grandes",
    price: 22.5,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Duck%20eggs.jpg?width=900",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Duck%20eggs.jpg?width=900",
      "https://upload.wikimedia.org/wikipedia/commons/3/34/A_one_boxed_Duck_Eggs_and_Quail_Eggs_on_the_Local_Food_Store_in_Tuen_Mun.jpg",
    ],
    tone: "sage",
  },
  {
    id: 3,
    name: "Ovos de codorna",
    type: "Codorna",
    category: "codorna",
    detail: "Bandeja com 30 unidades",
    price: 11.9,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Quail%20eggs.jpg?width=900",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Quail%20eggs.jpg?width=900",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Quail_Eggs_%284278252407%29.jpg",
    ],
    tone: "rose",
  },
  {
    id: 4,
    name: "Ovos de ganso",
    type: "Ganso",
    category: "ganso",
    detail: "Meia dúzia • selecionados",
    price: 29.9,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Goose%20eggs.jpg?width=900",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Goose%20eggs.jpg?width=900",
      "https://upload.wikimedia.org/wikipedia/commons/2/28/A_basket_of_Goose_Eggs.jpg",
    ],
    tone: "mist",
  },
  {
    id: 5,
    name: "Ovos de peru",
    type: "Peru",
    category: "peru",
    detail: "Dúzia • produção artesanal",
    price: 25.9,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Domesticated%20turkey.jpg?width=900",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Domesticated%20turkey.jpg?width=900",
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Wild_turkey_eggs_from_Ontario.jpg",
    ],
    tone: "clay",
  },
];

const categories = [
  { id: "todos", label: "Todos", icon: "✦" },
  { id: "galinha", label: "Galinha", icon: "◉" },
  { id: "pato", label: "Pato", icon: "◒" },
  { id: "ganso", label: "Ganso", icon: "◇" },
  { id: "peru", label: "Peru", icon: "✺" },
  { id: "codorna", label: "Codorna", icon: "•" },
];

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProductCard({ product, onAdd, onOpenGallery }) {
  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = product.gallery[imageIndex];

  const changeImage = (direction) => {
    setImageIndex(
      (current) =>
        (current + direction + product.gallery.length) % product.gallery.length,
    );
  };

  return (
    <article className={`product-card ${product.tone}`}>
      <div className="product-image-wrap">
        <button
          className="product-image-trigger"
          onClick={() => onOpenGallery(product, imageIndex)}
          aria-label={`Ver imagens de ${product.name}`}
        >
          <img
            src={currentImage}
            alt={`Ovos de ${product.type.toLowerCase()}`}
            className="product-image"
            onError={(event) => {
              event.currentTarget.src = product.image;
            }}
          />
        </button>
        <button
          className="gallery-arrow gallery-arrow-left"
          onClick={() => changeImage(-1)}
          aria-label={`Imagem anterior de ${product.name}`}
        >
          ‹
        </button>
        <button
          className="gallery-arrow gallery-arrow-right"
          onClick={() => changeImage(1)}
          aria-label={`Próxima imagem de ${product.name}`}
        >
          ›
        </button>
        <span className="product-tag">fresco</span>
        <button className="favorite" aria-label={`Favoritar ${product.name}`}>
          ♡
        </button>
      </div>
      <div className="product-info">
        <span className="product-type">{product.type}</span>
        <h3>{product.name}</h3>
        <p>{product.detail}</p>
        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <button
            className="add-button"
            onClick={() => onAdd(product)}
            aria-label={`Adicionar ${product.name}`}
          >
            <span>+</span> adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [gallery, setGallery] = useState(null);
  const visibleProducts =
    activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const addToCart = (product) => setCart((current) => [...current, product]);
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const closeGallery = () => setGallery(null);

  return (
    <main className="site-shell">
      <section className="topline" aria-label="Oferta da semana">
        <img
          src="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1600&q=85"
          alt="Ovos frescos em uma cesta"
        />
        <div className="topline-content">
          <p>Direto da nossa granja</p>
          <strong>
            O sabor começa
            <br />
            <i>no quintal.</i>
          </strong>
          <span>Ovos frescos para deixar sua mesa mais gostosa.</span>
        </div>
      </section>
      <header className="header">
        <a
          className="brand"
          href="#inicio"
          aria-label="Quintal da Serra início"
        >
          <span className="brand-mark">QS</span>
          <span>
            <b>quintal</b>
            <em>da serra</em>
          </span>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#ovos">Nossos ovos</a>
          <a href="#origem">Nossa origem</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <div className="header-actions">
          <button
            className="location-button"
            aria-label="Selecionar localização"
          >
            ⌖ <span>Campinas, SP</span>
          </button>
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrinho"
          >
            Sacola <span className="cart-count">{cart.length}</span>
          </button>
        </div>
      </header>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">DO NOSSO QUINTAL PARA A SUA MESA</p>
          <h1>
            O simples,
            <br />
            <i>bem cuidado.</i>
          </h1>
          <p className="hero-description">
            Ovos frescos, de verdade, vindos de aves criadas soltas e com tempo
            para viver bem.
          </p>
          <a href="#ovos" className="primary-button">
            Escolher meus ovos <span>↘</span>
          </a>
          <div className="hero-note">
            <span className="note-line" /> Mais sabor em cada manhã
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=1400&q=90"
              alt="Cesta com ovos frescos"
            />
          </div>
          <div className="hero-stamp">
            <span>desde</span>
            <strong>1987</strong>
            <span>com cuidado</span>
          </div>
          <div className="hero-caption">
            OVOS DE QUINTAL
            <br />
            <span>colhidos toda manhã</span>
          </div>
        </div>
      </section>
      <section className="benefits" id="origem">
        <div>
          <span className="benefit-icon">✧</span>
          <div>
            <b>Colhidos diariamente</b>
            <small>Da nossa granja para você</small>
          </div>
        </div>
        <div>
          <span className="benefit-icon">♡</span>
          <div>
            <b>Aves bem cuidadas</b>
            <small>Criação livre e responsável</small>
          </div>
        </div>
        <div>
          <span className="benefit-icon">⌁</span>
          <div>
            <b>Entrega cuidadosa</b>
            <small>Frescor preservado até a sua porta</small>
          </div>
        </div>
      </section>
      <section className="catalog" id="ovos">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ESCOLHA O SEU</p>
            <h2>Ovos para cada gosto.</h2>
          </div>
          <p>
            Da delicadeza da codorna
            <br />à generosidade do ganso.
          </p>
        </div>
        <div
          className="category-tabs"
          role="tablist"
          aria-label="Filtrar por espécie"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={activeCategory === category.id ? "active" : ""}
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              onOpenGallery={(selectedProduct, imageIndex) =>
                setGallery({ product: selectedProduct, imageIndex })
              }
            />
          ))}
        </div>
      </section>
      <section className="story-banner" id="duvidas">
        <div>
          <p className="eyebrow">POR TRÁS DE CADA OVO</p>
          <h2>
            Tem uma história
            <br />
            <i>bonita aqui.</i>
          </h2>
        </div>
        <p>
          Somos uma família que acredita que cuidar do começo muda tudo. Por
          isso, nossas aves têm espaço, sol e uma rotina tranquila. O resultado
          você sente no sabor.
        </p>
        <a href="#origem" className="text-link">
          Conheça o nosso jeito <span>↗</span>
        </a>
      </section>
      <footer className="footer">
        <span>quintal da serra © 2024</span>
        <span>feito com calma, servido com carinho</span>
        <span>instagram ↗</span>
      </footer>
      {gallery && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagens de ${gallery.product.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-close"
              onClick={closeGallery}
              aria-label="Fechar galeria"
            >
              ×
            </button>
            <img
              src={gallery.product.gallery[gallery.imageIndex]}
              alt={`Imagem ampliada de ${gallery.product.name}`}
              onError={(event) => {
                event.currentTarget.src = gallery.product.image;
              }}
            />
            <div className="gallery-modal-footer">
              <div>
                <span>{gallery.product.type}</span>
                <strong>{gallery.product.name}</strong>
              </div>
              <span>
                {gallery.imageIndex + 1}/{gallery.product.gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>Sua sacola</h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Fechar sacola"
              >
                ×
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♡</span>
                <p>
                  Sua sacola está esperando
                  <br />
                  ovos fresquinhos.
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item.id}-${index}`}>
                      <img src={item.image} alt="" />
                      <div>
                        <b>{item.name}</b>
                        <span>{item.detail}</span>
                      </div>
                      <strong>{formatPrice(item.price)}</strong>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <button className="checkout-button">
                  Finalizar pedido <span>↗</span>
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

export default App;
