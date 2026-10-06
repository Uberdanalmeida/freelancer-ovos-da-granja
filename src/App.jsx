import { useEffect, useState } from "react";
import "./App.css";

const toplineSlides = [
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Chickens_feeding_on_grass_in_a_breathtaking_cool_environment_in_rural_Kenya_%28Kuria_East%29.jpg/1920px-Chickens_feeding_on_grass_in_a_breathtaking_cool_environment_in_rural_Kenya_%28Kuria_East%29.jpg",
    alt: "Galinhas caipiras ciscando no gramado",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Female_mallard_duck_on_grass_in_Hamilton_Gardens.jpg/1920px-Female_mallard_duck_on_grass_in_Hamilton_Gardens.jpg",
    alt: "Pata caminhando pela grama",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/15/Greylag_geese_%28Anser_anser%29_-_geograph.org.uk_-_812428.jpg",
    alt: "Gansos em área gramada",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Rain_Quail_in_Bhigwan_August_2025_by_Tisha_Mukherjee_07.jpg/1920px-Rain_Quail_in_Bhigwan_August_2025_by_Tisha_Mukherjee_07.jpg",
    alt: "Codorna em seu ambiente natural",
  },
];

const products = [
  {
    id: 1,
    name: "Ovos caipiras",
    type: "Galinha",
    category: "galinha",
    detail: "Casca marrom",
    price: 25,
    priceQuantity: 30,
    formatPrices: { 1: 1, 12: 12, 30: 25 },
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
    detail: "Extra grandes",
    price: 90,
    priceQuantity: 12,
    formatPrices: { 1: 3, 12: 36, 30: 90 },
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
    detail: "Casca pintada",
    price: 11.9,
    priceQuantity: 30,
    formatPrices: { 30: 11.9 },
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
    detail: "Selecionados",
    price: 180,
    priceQuantity: 12,
    formatPrices: { 1: 5, 12: 60, 30: 180 },
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
    detail: "Produção artesanal",
    price: 25.9,
    priceQuantity: 12,
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

const paymentMethods = [
  { id: "pix", label: "Pix", icon: "◇", description: "Aprovação imediata" },
  { id: "card", label: "Cartão", icon: "▣", description: "Crédito ou débito" },
  {
    id: "cash",
    label: "Dinheiro",
    icon: "◌",
    description: "Pagamento na entrega",
  },
];

const productFormats = [
  { id: "unit", label: "Unidade (1 ovo)", quantity: 1 },
  { id: "dozen", label: "Dúzia", quantity: 12 },
  { id: "thirty", label: "30 ovos", quantity: 30 },
];

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getFormatPrice(product, format) {
  const formatPrice = product.formatPrices?.[format.quantity];

  if (formatPrice !== undefined) {
    return formatPrice;
  }

  return Math.round(
    (product.price * format.quantity / product.priceQuantity + Number.EPSILON) *
      100,
  ) / 100;
}

function ProductCard({ product, onAdd, onOpenGallery }) {
  const [imageIndex, setImageIndex] = useState(0);
  const availableFormats =
    product.category === "codorna"
      ? productFormats.filter((format) => format.quantity === 30)
      : productFormats;
  const [formatId, setFormatId] = useState(
    () =>
      availableFormats.find(
        (format) => format.quantity === product.priceQuantity,
      )?.id ?? "dozen",
  );
  const currentImage = product.gallery[imageIndex];
  const selectedFormat = availableFormats.find(
    (format) => format.id === formatId,
  );
  const selectedPrice = getFormatPrice(product, selectedFormat);

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
        <label className="product-format">
          Formato
          <select
            value={formatId}
            onChange={(event) => setFormatId(event.target.value)}
            aria-label={`Formato dos ${product.name.toLowerCase()}`}
          >
            {availableFormats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.label}
              </option>
            ))}
          </select>
        </label>
        <small className="product-price-note">
          {selectedFormat.quantity === 1
            ? "Preço individual por ovo"
            : product.formatPrices
              ? "Preço definido para este formato"
              : "Valor proporcional à embalagem cadastrada"}
        </small>
        <div className="product-bottom">
          <strong>{formatPrice(selectedPrice)}</strong>
          <button
            className="add-button"
            onClick={() => onAdd(product, selectedFormat)}
            aria-label={`Adicionar ${product.name}, formato ${selectedFormat.label}`}
          >
            adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [toplineSlide, setToplineSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [orderPlaced, setOrderPlaced] = useState(false);
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setToplineSlide((current) => (current + 1) % toplineSlides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  const visibleProducts =
    activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const addToCart = (product, format) =>
    setCart((current) => {
      const cartId = `${product.id}-${format.id}`;
      const existingItem = current.find((item) => item.cartId === cartId);

      if (existingItem) {
        return current.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          cartId,
          detail: `${format.label} • ${product.detail}`,
          price: getFormatPrice(product, format),
          quantity: 1,
        },
      ];
    });
  const removeFromCart = (cartId) =>
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  const updateCartQuantity = (cartId, change) =>
    setCart((current) =>
      current
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const closeGallery = () => setGallery(null);
  const closeCart = () => {
    setCartOpen(false);
    setCheckoutOpen(false);
    setOrderPlaced(false);
  };
  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <main className="site-shell">
      <section className="topline" aria-label="Oferta da semana">
        {toplineSlides.map((slide, index) => (
          <img
            key={slide.src}
            className={`topline-image${index === toplineSlide ? " is-active" : ""}${index === 3 ? " topline-image-quail" : ""}`}
            src={slide.src}
            alt={index === toplineSlide ? slide.alt : ""}
            aria-hidden={index !== toplineSlide}
          />
        ))}
        <div className="topline-content">
          <p>Direto da nossa granja</p>
          <strong>
            O sabor começa
            <br />
            <i>no quintal.</i>
          </strong>
          <span>Ovos frescos para deixar sua mesa mais gostosa.</span>
        </div>
        <div className="topline-dots" role="group" aria-label="Selecionar imagem do banner">
          {toplineSlides.map((slide, index) => (
            <button
              key={slide.src}
              className={`topline-dot${index === toplineSlide ? " is-active" : ""}`}
              onClick={() => setToplineSlide(index)}
              aria-label={`Mostrar imagem ${index + 1}: ${slide.alt}`}
              aria-pressed={index === toplineSlide}
            />
          ))}
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
          <a href="#ovos">Nossos produtos</a>
          <a href="#origem">Nossa origem</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <div className="header-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrinho"
          >
            Sacola <span className="cart-count">{cartItemCount}</span>
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
              src="https://upload.wikimedia.org/wikipedia/commons/3/34/A_basket_of_fresh_eggs_%289339949261%29.jpg"
              alt="Cesta com ovos frescos"
            />
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
        <div className="footer-main">
          <div className="footer-brand">
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
            <p>O cuidado da nossa granja, fresquinho na sua mesa.</p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <a href="#ovos">Nossos produtos</a>
            <a href="#origem">Nossa origem</a>
            <a href="#duvidas">Dúvidas</a>
          </div>
          <div className="footer-column footer-contact">
            <strong>Fale com a gente</strong>
            <a
              href="https://wa.me/5519999999999"
              target="_blank"
              rel="noreferrer"
              aria-label="Conversar pelo WhatsApp"
            >
              <svg
                className="whatsapp-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.8L.2 24l6.6-1.7a11.8 11.8 0 0 0 5.3 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3ZM12.2 21.4h-.1c-1.7 0-3.4-.5-4.8-1.4l-.3-.2-3.9 1 1-3.8-.2-.4a9.6 9.6 0 0 1-1.5-5.1c0-5.3 4.3-9.6 9.7-9.6 2.6 0 5 1 6.8 2.8a9.5 9.5 0 0 1 2.8 6.8c0 5.5-4.3 9.9-9.5 9.9Zm5.2-7.3c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.4-.2-.7-.4Z" />
              </svg>
              WhatsApp <span>↗</span>
            </a>
            <span>Atendimento de segunda a sábado</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Quintal da Serra. Todos os direitos reservados.</span>
          <span className="footer-credit">Desenvolvido por Uberdan Almeida</span>
        </div>
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
        <div className="cart-overlay" onClick={closeCart}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>{checkoutOpen ? "Pagamento" : "Sua sacola"}</h2>
              <button onClick={closeCart} aria-label="Fechar sacola">
                ×
              </button>
            </div>
            {orderPlaced ? (
              <div className="order-success">
                <span>✓</span>
                <h3>Pedido recebido!</h3>
                <p>Vamos preparar tudo com carinho para você.</p>
                <button className="checkout-button" onClick={closeCart}>
                  Voltar para a loja <span>↗</span>
                </button>
              </div>
            ) : checkoutOpen ? (
              <div className="checkout-content">
                <p className="checkout-intro">
                  Escolha como você prefere pagar o seu pedido.
                </p>
                <div
                  className="payment-options"
                  role="radiogroup"
                  aria-label="Forma de pagamento"
                >
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className={`payment-option ${paymentMethod === method.id ? "selected" : ""}`}
                      onClick={() => setPaymentMethod(method.id)}
                      role="radio"
                      aria-checked={paymentMethod === method.id}
                    >
                      <span className="payment-icon">{method.icon}</span>
                      <span>
                        <b>{method.label}</b>
                        <small>{method.description}</small>
                      </span>
                      <span className="payment-check">✓</span>
                    </button>
                  ))}
                </div>
                {paymentMethod === "pix" && (
                  <div className="payment-detail">
                    <b>Você receberá o código Pix após confirmar.</b>
                    <span>O pagamento será aprovado em poucos segundos.</span>
                  </div>
                )}
                {paymentMethod === "card" && (
                  <div className="payment-fields">
                    <label>
                      Número do cartão
                      <input
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                      />
                    </label>
                    <label>
                      Nome impresso
                      <input placeholder="Como está no cartão" />
                    </label>
                    <div className="payment-field-row">
                      <label>
                        Validade
                        <input placeholder="MM/AA" />
                      </label>
                      <label>
                        CVV
                        <input placeholder="123" inputMode="numeric" />
                      </label>
                    </div>
                  </div>
                )}
                {paymentMethod === "cash" && (
                  <label className="change-field">
                    Troco para quanto?
                    <input placeholder="Ex.: R$ 50,00" inputMode="decimal" />
                    <small>Deixe em branco se não precisar de troco.</small>
                  </label>
                )}
                <div className="checkout-total">
                  <span>Total do pedido</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <button className="checkout-button" onClick={placeOrder}>
                  Confirmar pedido <span>↗</span>
                </button>
                <button
                  className="back-to-cart"
                  onClick={() => setCheckoutOpen(false)}
                >
                  Voltar para a sacola
                </button>
              </div>
            ) : cart.length === 0 ? (
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
                  {cart.map((item) => (
                    <div className="cart-item" key={item.cartId}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <b>{item.name}</b>
                        <span>{item.detail}</span>
                        <div className="quantity-controls">
                          <button
                            onClick={() => updateCartQuantity(item.cartId, -1)}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            −
                          </button>
                          <span aria-label={`Quantidade: ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartId, 1)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                      <button
                        className="remove-cart-item"
                        onClick={() => removeFromCart(item.cartId)}
                        aria-label={`Excluir ${item.name} da sacola`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <button
                  className="checkout-button"
                  onClick={() => setCheckoutOpen(true)}
                >
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
