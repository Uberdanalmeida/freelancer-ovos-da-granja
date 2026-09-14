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

function ProductCard({ product, onAdd }) {
  return (
    <article className={`product-card ${product.tone}`}>
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={`Ovos de ${product.type.toLowerCase()}`}
          className="product-image"
        />
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
  const visibleProducts =
    activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const addToCart = (product) => setCart((current) => [...current, product]);
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <main className="site-shell">
      <div className="topline">
        ENTREGAS NA REGIÃO DE CAMPINAS <span>•</span> PEDIDOS ATÉ 16H CHEGAM
        AMANHÃ
      </div>
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
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
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
