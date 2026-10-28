import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import "./App.css";

const STORE_WHATSAPP = "5519999999999";
const PIX_KEY = "+5511986716561";
const PIX_RECEIVER = "UBERDAN ALMEIDA";
const PIX_CITY = "SAO PAULO";

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
    price: 30,
    priceQuantity: 30,
    formatPrices: { 1: 1, 12: 12, 30: 30 },
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
    name: "Ovos de pata",
    type: "Pato",
    category: "pato",
    detail: "Extra grandes",
    price: 36,
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
    name: "Ovos de gansa",
    type: "Ganso",
    category: "ganso",
    detail: "Selecionados",
    price: 180,
    priceQuantity: 12,
    formatPrices: { 1: 5, 12: 60, 30: 150 },
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
  { id: "pix", label: "Pix", icon: "◇", description: "Pague pelo QR Code" },
  {
    id: "card",
    label: "Cartão",
    icon: "▣",
    description: "Crédito ou débito na entrega",
  },
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

const CART_STORAGE_KEY = "freelancer-granja-cart";

function pixField(id, value) {
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

function buildPixPayload(amount) {
  const merchantAccount =
    pixField("00", "BR.GOV.BCB.PIX") + pixField("01", PIX_KEY);
  const payload = [
    pixField("00", "01"),
    pixField("01", "11"),
    pixField("26", merchantAccount),
    pixField("52", "0000"),
    pixField("53", "986"),
    pixField("54", amount.toFixed(2)),
    pixField("58", "BR"),
    pixField("59", PIX_RECEIVER),
    pixField("60", PIX_CITY),
    pixField("62", pixField("05", "***")),
  ].join("");
  const crcInput = `${payload}6304`;
  let crc = 0xffff;

  for (let index = 0; index < crcInput.length; index += 1) {
    crc ^= crcInput.charCodeAt(index) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }

  return `${crcInput}${(crc & 0xffff).toString(16).toUpperCase().padStart(4, "0")}`;
}

function PixQrCode({ payload }) {
  const [result, setResult] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(payload, { errorCorrectionLevel: "M", margin: 4, width: 280 })
      .then((dataUrl) => {
        if (!cancelled) {
          setResult({ payload, dataUrl });
        }
      })
      .catch((error) => {
        console.error("Não foi possível gerar o QR Code Pix.", error);
        if (!cancelled) {
          setResult({ payload, error: true });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [payload]);

  if (!result || result.payload !== payload) {
    return <p className="pix-qr-status">Gerando QR Code Pix...</p>;
  }

  if (result.error) {
    return (
      <p className="pix-qr-status" role="alert">
        Não foi possível gerar o QR Code. Tente novamente.
      </p>
    );
  }

  const copyPixCode = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("A área de transferência não está disponível.");
      }
      await navigator.clipboard.writeText(payload);
      setCopyStatus("Código copiado. Cole em Pix > Pix Copia e Cola no app do banco.");
    } catch (error) {
      console.error("Não foi possível copiar o código Pix.", error);
      setCopyStatus("Não foi possível copiar. Abra “Mostrar código Pix” para copiá-lo manualmente.");
    }
  };

  return (
    <>
      <img className="pix-qr-image" src={result.dataUrl} alt="QR Code para pagamento Pix" />
      <p className="pix-qr-instructions">
        <span className="pix-mobile-instructions">
          No celular, copie o código e cole em Pix &gt; Pix Copia e Cola no app do banco.
        </span>
        <span className="pix-desktop-instructions">
          Abra o app do banco e escaneie este QR Code por Pix &gt; Pagar com QR Code.
        </span>
      </p>
      <button className="pix-copy-button" type="button" onClick={copyPixCode}>
        Copiar Pix copia e cola
      </button>
      {copyStatus && (
        <p className="pix-qr-status" role="status">
          {copyStatus}
        </p>
      )}
      <details className="pix-code-details">
        <summary>Mostrar código Pix</summary>
        <textarea aria-label="Código Pix copia e cola" readOnly value={payload} />
      </details>
    </>
  );
}

function getCartItemId(product, format) {
  return `${product.id}-${format.id}`;
}

function getStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart === null) {
      return [];
    }

    const cart = JSON.parse(storedCart);
    if (
      !Array.isArray(cart) ||
      !cart.every(
        (item) =>
          item &&
          typeof item.cartId === "string" &&
          typeof item.name === "string" &&
          typeof item.detail === "string" &&
          Number.isFinite(item.price) &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0,
      )
    ) {
      throw new Error("O carrinho salvo possui um formato inválido.");
    }

    return cart.map((item) => {
      if (!/^\d+-custom-\d+$/.test(item.cartId)) {
        return item;
      }

      const quantityPerAdd = item.stepQuantity ?? 1;
      if (!Number.isFinite(quantityPerAdd) || quantityPerAdd <= 0) {
        throw new Error("O carrinho salvo possui uma quantidade inválida.");
      }

      return {
        ...item,
        detail: item.detail.replace(
          /^Quantidade personalizada \([^)]*\)/,
          "Unidade (1 ovo)",
        ),
        price: item.price / quantityPerAdd,
        stepQuantity: 1,
      };
    });
  } catch (error) {
    console.error("Não foi possível carregar o carrinho salvo.", error);
    return [];
  }
}

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getUnitPrice(product) {
  return product.formatPrices?.[1] ?? product.price / product.priceQuantity;
}

function getFormatPrice(product, format) {
  if (!format || !format.quantity) {
    return 0;
  }

  const formatPrice = product.formatPrices?.[format.quantity];

  if (formatPrice !== undefined) {
    return formatPrice;
  }

  const unitPrice = getUnitPrice(product);

  return Math.round((unitPrice * format.quantity + Number.EPSILON) * 100) / 100;
}

function ProductCard({ product, cart, onAdd, onOpenGallery }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [addedCartId, setAddedCartId] = useState(null);
  const addedTimeoutRef = useRef(null);
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
  const selectedFormat =
    availableFormats.find((format) => format.id === formatId) ?? productFormats[0];
  const selectedPrice = getFormatPrice(product, selectedFormat);
  const selectedCartId = getCartItemId(product, selectedFormat);
  const isInCart = cart.some((item) => item.cartId === selectedCartId);
  const wasJustAdded = addedCartId === selectedCartId;

  useEffect(
    () => () => {
      if (addedTimeoutRef.current !== null) {
        window.clearTimeout(addedTimeoutRef.current);
      }
    },
    [],
  );

  const handleAdd = () => {
    onAdd(product, selectedFormat);
    const cartId = getCartItemId(product, selectedFormat);
    setAddedCartId(cartId);

    if (addedTimeoutRef.current !== null) {
      window.clearTimeout(addedTimeoutRef.current);
    }

    addedTimeoutRef.current = window.setTimeout(() => {
      setAddedCartId(null);
      addedTimeoutRef.current = null;
    }, 1800);
  };

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
            onChange={(event) => {
              setFormatId(event.target.value);
              setAddedCartId(null);
            }}
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
          <div className="product-price">
            <strong>{formatPrice(selectedPrice)}</strong>
            <span className="selected-format">{selectedFormat.label}</span>
          </div>
          <button
            className={`add-button${wasJustAdded ? " is-added" : ""}`}
            onClick={handleAdd}
            aria-label={
              wasJustAdded
                ? `${product.name}, formato ${selectedFormat.label} adicionado ao carrinho`
                : isInCart
                  ? `${product.name}, formato ${selectedFormat.label} no carrinho`
                : `Adicionar ${product.name}, formato ${selectedFormat.label}`
            }
          >
            <span aria-live="polite">
              {wasJustAdded
                ? "Adicionado ao carrinho!"
                : isInCart
                  ? "No carrinho"
                  : "Adicionar ao carrinho"}
            </span>
            <span aria-hidden="true">{wasJustAdded || isInCart ? "✓" : "+"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [toplineSlide, setToplineSlide] = useState(0);
  const [cart, setCart] = useState(getStoredCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cashChange, setCashChange] = useState("");
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Não foi possível salvar o carrinho.", error);
    }
  }, [cart]);

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
    const cartId = getCartItemId(product, format);
    const existingItem = current.find((item) => item.cartId === cartId);
    const incrementValue = 1;

    if (existingItem) {
      return current.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + incrementValue }
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
        quantity: incrementValue,
        stepQuantity: incrementValue,
      },
    ];
  });
  const removeFromCart = (cartId) =>
  setCart((current) => current.filter((item) => item.cartId !== cartId));
  const updateCartQuantity = (cartId, change) =>
  setCart((current) =>
    current
      .map((item) => {
        if (item.cartId !== cartId) {
          return item;
        }

        const stepQuantity = item.stepQuantity ?? 1;
        const nextQuantity = item.quantity + change * stepQuantity;
        return { ...item, quantity: nextQuantity };
      })
      .filter((item) => item.quantity > 0),
  );
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === paymentMethod,
  );
  const orderMessage = [
    "Olá! Gostaria de fazer este pedido:",
    "",
    ...cart.map(
      (item) =>
        `• ${item.name} (${item.detail}) — ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`,
    ),
    "",
    `Total: ${formatPrice(cartTotal)}`,
    `Forma de pagamento: ${selectedPaymentMethod.label}`,
    paymentMethod === "pix"
      ? "Pagamento via Pix pelo QR Code."
      : "O pagamento será realizado na entrega.",
    ...(paymentMethod === "cash" && cashChange.trim()
      ? [`Troco para: ${cashChange.trim()}`]
      : []),
  ].join("\n");
  const whatsappOrderUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(orderMessage)}`;
  const closeGallery = () => setGallery(null);
  const changeGalleryImage = (direction) => {
    setGallery((current) => {
      if (!current) return current;

      const totalImages = current.product.gallery.length;
      return {
        ...current,
        imageIndex: (current.imageIndex + direction + totalImages) % totalImages,
      };
    });
  };
  useEffect(() => {
    if (!gallery) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeGalleryImage(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        changeGalleryImage(1);
      }
      if (event.key === "Escape") {
        closeGallery();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery]);
  const closeCart = () => {
    setCartOpen(false);
    setCheckoutOpen(false);
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
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 9H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className="cart-count">{cartItemCount}</span>
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
            Escolher ovos <span>↘</span>
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
              cart={cart}
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
              href={`https://wa.me/${STORE_WHATSAPP}`}
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
          <span className="footer-copyright">
            © 2026 Quintal da Serra. Todos os direitos reservados.
          </span>
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
            <div className="gallery-image-shell">
              <button
                className="gallery-nav gallery-nav-left"
                onClick={() => changeGalleryImage(-1)}
                aria-label={`Imagem anterior de ${gallery.product.name}`}
              >
                ‹
              </button>
              <img
                src={gallery.product.gallery[gallery.imageIndex]}
                alt={`Imagem ampliada de ${gallery.product.name}`}
                onError={(event) => {
                  event.currentTarget.src = gallery.product.image;
                }}
              />
              <button
                className="gallery-nav gallery-nav-right"
                onClick={() => changeGalleryImage(1)}
                aria-label={`Próxima imagem de ${gallery.product.name}`}
              >
                ›
              </button>
            </div>
            <div className="gallery-thumbs" role="group" aria-label="Seleção de imagens">
              {gallery.product.gallery.map((image, index) => (
                <button
                  key={`${gallery.product.id}-${index}`}
                  className={`gallery-thumb${index === gallery.imageIndex ? " is-active" : ""}`}
                  onClick={() =>
                    setGallery((current) =>
                      current ? { ...current, imageIndex: index } : current,
                    )
                  }
                  aria-label={`Mostrar imagem ${index + 1} de ${gallery.product.name}`}
                  aria-pressed={index === gallery.imageIndex}
                >
                  <img src={image} alt={`Miniatura ${index + 1} de ${gallery.product.name}`} />
                </button>
              ))}
            </div>
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
            {checkoutOpen ? (
              <div className="checkout-content">
                <p className="checkout-intro">
                  Escolha a forma de pagamento. O WhatsApp abrirá com o resumo
                  do pedido para você enviar à granja.
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
                  <div className="pix-payment">
                    <PixQrCode payload={buildPixPayload(cartTotal)} />
                    <p>Chave Pix para pagamento manual:</p>
                    <strong className="pix-key">{PIX_KEY}</strong>
                    <small>
                      Recebedor: {PIX_RECEIVER} · {PIX_CITY}
                    </small>
                  </div>
                )}
                {paymentMethod === "cash" && (
                  <label className="change-field">
                    Troco para quanto?
                    <input
                      placeholder="Ex.: R$ 50,00"
                      inputMode="decimal"
                      value={cashChange}
                      onChange={(event) => setCashChange(event.target.value)}
                    />
                    <small>Deixe em branco se não precisar de troco.</small>
                  </label>
                )}
                <div className="checkout-total">
                  <span>Total do pedido</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <a
                  className="checkout-button"
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enviar pedido pelo WhatsApp <span>↗</span>
                </a>
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
