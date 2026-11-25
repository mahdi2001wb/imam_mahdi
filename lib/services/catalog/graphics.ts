import { defineService, f, L } from "./helpers";

const addons = ["extraRevision", "fastDelivery", "extraDesign"] as const;

export const graphicsServices = [
  defineService({
    id: "business-card",
    category: "graphics",
    icon: "CreditCard",
    title: L("Business Card Design", "Design di biglietti da visita", "বিজনেস কার্ড ডিজাইন", "Diseño de tarjetas de visita", "Création de cartes de visite", "Visitenkarten-Design", "تصميم بطاقات الأعمال"),
    short: L("Clean, professional business cards that make a strong first impression, ready for print.", "Biglietti da visita puliti e professionali che lasciano una buona prima impressione, pronti per la stampa.", "পরিচ্ছন্ন, পেশাদার বিজনেস কার্ড, যা প্রথম পরিচয়েই ভালো ছাপ ফেলে এবং প্রিন্টের জন্য প্রস্তুত।", "Tarjetas de visita limpias y profesionales que causan una gran primera impresión, listas para imprimir.", "Des cartes de visite soignées et professionnelles qui font bonne impression, prêtes à imprimer.", "Klare, professionelle Visitenkarten, die einen starken ersten Eindruck hinterlassen – druckfertig geliefert.", "بطاقات أعمال نظيفة واحترافية تترك انطباعًا أوليًا قويًا وجاهزة للطباعة."),
    technologies: ["Adobe Illustrator", "Figma", "Canva"],
    addons: [...addons],
    basic: { days: 2, revisions: 2, features: [f("concepts", 1), f("formats")] },
    standard: { days: 3, revisions: 3, features: [f("concepts", 3), f("printReady"), f("formats"), f("brandKit")] },
    premium: { days: 5, revisions: 5, features: [f("concepts", 5), f("printReady"), f("formats"), f("brandKit"), f("sourceFiles")] },
  }),
  defineService({
    id: "banner-design",
    category: "graphics",
    icon: "ImageIcon",
    title: L("Banner Design", "Design di banner", "ব্যানার ডিজাইন", "Diseño de banners", "Création de bannières", "Banner-Design", "تصميم اللافتات"),
    short: L("Eye-catching banners for websites, ads and social media in the sizes you need.", "Banner accattivanti per siti web, pubblicità e social nei formati che ti servono.", "ওয়েবসাইট, বিজ্ঞাপন ও সোশ্যাল মিডিয়ার জন্য প্রয়োজনীয় মাপে দৃষ্টিআকর্ষক ব্যানার।", "Banners llamativos para sitios web, anuncios y redes sociales en los tamaños que necesites.", "Des bannières percutantes pour sites web, publicités et réseaux sociaux, aux dimensions dont vous avez besoin.", "Auffällige Banner für Websites, Werbung und Social Media in den benötigten Größen.", "لافتات جذابة للمواقع والإعلانات ووسائل التواصل الاجتماعي بالمقاسات التي تحتاجها."),
    technologies: ["Adobe Illustrator", "Figma", "Canva"],
    addons: [...addons],
    basic: { days: 2, revisions: 2, features: [f("designs", 1), f("formats")] },
    standard: { days: 3, revisions: 3, features: [f("designs", 2), f("formats"), f("brandKit")] },
    premium: { days: 5, revisions: 5, features: [f("designs", 4), f("formats"), f("brandKit"), f("sourceFiles")] },
  }),
  defineService({
    id: "social-post-design",
    category: "graphics",
    icon: "LayoutGrid",
    title: L("Social Media Post Design", "Design di post per i social media", "সোশ্যাল মিডিয়া পোস্ট ডিজাইন", "Diseño de publicaciones para redes sociales", "Création de visuels pour les réseaux sociaux", "Social-Media-Post-Design", "تصميم منشورات وسائل التواصل الاجتماعي"),
    short: L("Consistent post designs that match your brand across every platform.", "Grafiche per i post coerenti con il tuo brand su ogni piattaforma.", "প্রতিটি প্ল্যাটফর্মে আপনার ব্র্যান্ডের সঙ্গে মানানসই, সামঞ্জস্যপূর্ণ পোস্ট ডিজাইন।", "Diseños de publicaciones coherentes con tu marca en todas las plataformas.", "Des visuels de publications cohérents avec votre marque sur chaque plateforme.", "Einheitliche Post-Designs, die auf jeder Plattform zu Ihrer Marke passen.", "تصاميم منشورات متناسقة تتماشى مع علامتك التجارية على كل منصة."),
    technologies: ["Canva", "Figma", "Adobe Illustrator"],
    addons: [...addons],
    basic: { days: 2, revisions: 2, features: [f("designs", 3), f("formats")] },
    standard: { days: 4, revisions: 3, features: [f("designs", 8), f("formats"), f("brandKit")] },
    premium: { days: 6, revisions: 4, features: [f("designs", 15), f("formats"), f("brandKit"), f("sourceFiles")] },
  }),
  defineService({
    id: "poster-design",
    category: "graphics",
    icon: "Frame",
    title: L("Poster Design", "Design di poster", "পোস্টার ডিজাইন", "Diseño de pósteres", "Création d’affiches", "Poster-Design", "تصميم الملصقات"),
    short: L("Bold, clear posters for events, promotions and campaigns, ready for print and online use.", "Poster chiari e d’impatto per eventi, promozioni e campagne, pronti per la stampa e per il web.", "ইভেন্ট, প্রচার ও ক্যাম্পেইনের জন্য স্পষ্ট ও দৃষ্টিনন্দন পোস্টার, প্রিন্ট ও অনলাইনে ব্যবহারের উপযোগী।", "Pósteres claros y llamativos para eventos, promociones y campañas, listos para imprimir y usar en línea.", "Des affiches claires et percutantes pour événements, promotions et campagnes, prêtes pour l’impression et le web.", "Klare, wirkungsvolle Poster für Veranstaltungen, Aktionen und Kampagnen – bereit für Druck und Online-Nutzung.", "ملصقات واضحة وجريئة للفعاليات والعروض والحملات، جاهزة للطباعة والاستخدام الرقمي."),
    technologies: ["Adobe Illustrator", "Figma", "Canva"],
    addons: [...addons],
    basic: { days: 3, revisions: 2, features: [f("concepts", 1), f("printReady")] },
    standard: { days: 4, revisions: 3, features: [f("concepts", 2), f("printReady"), f("brandKit")] },
    premium: { days: 6, revisions: 5, features: [f("concepts", 3), f("printReady"), f("brandKit"), f("sourceFiles")] },
  }),
];
