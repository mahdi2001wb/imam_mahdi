import { amazonClone, dashboard, noorShop } from "@/assets/image";
import { defineService, f, L } from "./helpers";

export const ecommerceServices = [
  defineService({
    id: "ecommerce",
    category: "ecommerce",
    icon: "ShoppingCart",
    featured: true,
    title: L("E-commerce Website Development", "Sviluppo di siti e-commerce", "ই-কমার্স ওয়েবসাইট ডেভেলপমেন্ট", "Desarrollo de sitios de comercio electrónico", "Développement de sites e-commerce", "Entwicklung von E-Commerce-Websites", "تطوير مواقع التجارة الإلكترونية"),
    short: L("Custom online stores with product catalog, cart, secure checkout and an admin dashboard.", "Negozi online su misura con catalogo prodotti, carrello, checkout sicuro e pannello di amministrazione.", "পণ্য ক্যাটালগ, কার্ট, নিরাপদ চেকআউট ও অ্যাডমিন ড্যাশবোর্ডসহ কাস্টম অনলাইন স্টোর।", "Tiendas online a medida con catálogo de productos, carrito, pago seguro y panel de administración.", "Boutiques en ligne sur mesure avec catalogue, panier, paiement sécurisé et tableau de bord d’administration.", "Individuelle Online-Shops mit Produktkatalog, Warenkorb, sicherem Checkout und Admin-Dashboard.", "متاجر إلكترونية مخصصة مع كتالوج منتجات وسلة تسوق ودفع آمن ولوحة إدارة."),
    technologies: ["React", "Next.js", "Node.js", "Express.js", "MongoDB"],
    gallery: [amazonClone, noorShop],
    addons: ["extraRevision", "fastDelivery", "extraProducts"],
    basic: { days: 14, revisions: 2, features: [f("products", 20), f("checkout"), f("responsive"), f("seoBasic")] },
    standard: { days: 21, revisions: 3, features: [f("products", 100), f("checkout"), f("payments"), f("orders"), f("adminPanel"), f("seoStandard")] },
    premium: { days: 35, revisions: 5, features: [f("products", "500+"), f("payments"), f("orders"), f("inventory"), f("adminPanel"), f("integrations")] },
  }),
  defineService({
    id: "online-store-setup",
    category: "ecommerce",
    icon: "Store",
    title: L("Online Store Setup", "Configurazione di negozio online", "অনলাইন স্টোর সেটআপ", "Puesta en marcha de tienda online", "Mise en place de boutique en ligne", "Einrichtung von Online-Shops", "إعداد متجر إلكتروني"),
    short: L("Get your store ready to sell: products, payments, shipping and store settings configured for you.", "Metti il tuo negozio in condizione di vendere: prodotti, pagamenti, spedizioni e impostazioni configurati per te.", "আপনার স্টোর বিক্রির জন্য প্রস্তুত করুন: পণ্য, পেমেন্ট, শিপিং ও স্টোর সেটিংস আমি কনফিগার করে দিই।", "Deja tu tienda lista para vender: productos, pagos, envíos y ajustes de la tienda configurados por mí.", "Préparez votre boutique à vendre : produits, paiements, livraison et réglages configurés pour vous.", "Machen Sie Ihren Shop verkaufsbereit: Produkte, Zahlungen, Versand und Shop-Einstellungen werden für Sie eingerichtet.", "اجعل متجرك جاهزًا للبيع: إعداد المنتجات والمدفوعات والشحن وإعدادات المتجر نيابةً عنك."),
    technologies: ["WooCommerce", "Stripe", "PayPal"],
    addons: ["extraRevision", "fastDelivery", "extraProducts"],
    basic: { days: 5, revisions: 1, features: [f("products", 15), f("checkout"), f("responsive")] },
    standard: { days: 7, revisions: 2, features: [f("products", 50), f("payments"), f("checkout"), f("seoBasic")] },
    premium: { days: 12, revisions: 3, features: [f("products", 150), f("payments"), f("inventory"), f("orders"), f("analytics"), f("seoStandard")] },
  }),
  defineService({
    id: "product-management",
    category: "ecommerce",
    icon: "Package",
    title: L("Product Management System", "Sistema di gestione dei prodotti", "প্রোডাক্ট ম্যানেজমেন্ট সিস্টেম", "Sistema de gestión de productos", "Système de gestion de produits", "Produktverwaltungssystem", "نظام إدارة المنتجات"),
    short: L("A custom admin system to add, organise and update products, stock and categories with ease.", "Un sistema di amministrazione su misura per aggiungere, organizzare e aggiornare prodotti, scorte e categorie con facilità.", "পণ্য, স্টক ও ক্যাটাগরি সহজে যোগ, সাজানো ও আপডেট করার জন্য কাস্টম অ্যাডমিন সিস্টেম।", "Un sistema de administración a medida para añadir, organizar y actualizar productos, existencias y categorías con facilidad.", "Un système d’administration sur mesure pour ajouter, organiser et mettre à jour facilement produits, stocks et catégories.", "Ein individuelles Verwaltungssystem, um Produkte, Bestände und Kategorien einfach anzulegen, zu ordnen und zu aktualisieren.", "نظام إدارة مخصص لإضافة المنتجات والمخزون والفئات وتنظيمها وتحديثها بسهولة."),
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    gallery: [dashboard],
    addons: ["extraRevision", "fastDelivery"],
    basic: { days: 10, revisions: 2, features: [f("adminPanel"), f("database"), f("products", 100)] },
    standard: { days: 18, revisions: 3, features: [f("adminPanel"), f("database"), f("inventory"), f("auth"), f("products", 1000)] },
    premium: { days: 30, revisions: 5, features: [f("adminPanel"), f("database"), f("inventory"), f("auth"), f("orders"), f("integrations")] },
  }),
];
