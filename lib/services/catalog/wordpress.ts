import { defineService, f, L } from "./helpers";

const addons = ["extraRevision", "fastDelivery", "extraPage"] as const;

export const wordpressServices = [
  defineService({
    id: "wordpress",
    category: "wordpress",
    icon: "LayoutTemplate",
    featured: true,
    title: L("WordPress Business Website", "Sito aziendale WordPress", "ওয়ার্ডপ্রেস বিজনেস ওয়েবসাইট", "Sitio web corporativo en WordPress", "Site d’entreprise WordPress", "WordPress-Unternehmenswebsite", "موقع شركة على ووردبريس"),
    short: L("A professional WordPress website for your business that you can update yourself.", "Un sito WordPress professionale per la tua attività, che puoi aggiornare in autonomia.", "আপনার ব্যবসার জন্য পেশাদার ওয়ার্ডপ্রেস ওয়েবসাইট, যা আপনি নিজেই আপডেট করতে পারবেন।", "Un sitio WordPress profesional para tu negocio que puedes actualizar tú mismo.", "Un site WordPress professionnel pour votre entreprise, que vous pouvez mettre à jour vous-même.", "Eine professionelle WordPress-Website für Ihr Unternehmen, die Sie selbst pflegen können.", "موقع ووردبريس احترافي لنشاطك التجاري يمكنك تحديثه بنفسك."),
    technologies: ["WordPress", "Elementor", "CSS3"],
    addons: [...addons],
    basic: { days: 5, revisions: 2, features: [f("pages", "3–5"), f("theme"), f("plugins"), f("responsive"), f("seoBasic")] },
    standard: { days: 8, revisions: 3, features: [f("pages", "6–8"), f("theme"), f("plugins"), f("customization"), f("contactForm"), f("seoStandard"), f("security")] },
    premium: { days: 14, revisions: 5, features: [f("pages", "10+"), f("theme"), f("plugins"), f("customization"), f("seoAdvanced"), f("security"), f("backups")] },
  }),
  defineService({
    id: "wordpress-customization",
    category: "wordpress",
    icon: "SlidersHorizontal",
    title: L("WordPress Customization", "Personalizzazione WordPress", "ওয়ার্ডপ্রেস কাস্টমাইজেশন", "Personalización de WordPress", "Personnalisation WordPress", "WordPress-Anpassung", "تخصيص ووردبريس"),
    short: L("Tailored changes to your theme, layout and plugins so your WordPress site works exactly as you need.", "Modifiche su misura a tema, layout e plugin, perché il tuo sito WordPress funzioni esattamente come ti serve.", "থিম, লেআউট ও প্লাগইনে প্রয়োজনমতো পরিবর্তন, যাতে আপনার ওয়ার্ডপ্রেস সাইট ঠিক আপনার চাহিদা অনুযায়ী কাজ করে।", "Cambios a medida en tu tema, diseño y plugins para que tu sitio WordPress funcione exactamente como necesitas.", "Modifications sur mesure du thème, de la mise en page et des extensions pour que votre site WordPress fonctionne exactement comme vous le souhaitez.", "Maßgeschneiderte Änderungen an Theme, Layout und Plugins, damit Ihre WordPress-Website genau so funktioniert, wie Sie es brauchen.", "تعديلات مخصصة على القالب والتخطيط والإضافات ليعمل موقع ووردبريس تمامًا كما تحتاج."),
    technologies: ["WordPress", "PHP", "CSS3", "JavaScript"],
    addons: ["extraRevision", "fastDelivery"],
    basic: { days: 2, revisions: 1, features: [f("customization"), f("plugins")] },
    standard: { days: 4, revisions: 2, features: [f("customization"), f("plugins"), f("responsive"), f("performance")] },
    premium: { days: 7, revisions: 3, features: [f("customization"), f("plugins"), f("responsive"), f("performance"), f("security"), f("backups")] },
  }),
  defineService({
    id: "elementor-design",
    category: "wordpress",
    icon: "MousePointerClick",
    title: L("Elementor Website Design", "Design di siti con Elementor", "Elementor ওয়েবসাইট ডিজাইন", "Diseño de sitios web con Elementor", "Conception de sites avec Elementor", "Website-Design mit Elementor", "تصميم مواقع باستخدام Elementor"),
    short: L("Visually polished pages built with Elementor, fully responsive and easy for you to edit.", "Pagine curate nell’aspetto create con Elementor, completamente responsive e facili da modificare.", "Elementor দিয়ে তৈরি দৃষ্টিনন্দন, সম্পূর্ণ রেসপন্সিভ ও সহজে সম্পাদনাযোগ্য পেজ।", "Páginas visualmente cuidadas creadas con Elementor, totalmente responsivas y fáciles de editar.", "Pages soignées créées avec Elementor, entièrement responsives et faciles à modifier.", "Optisch ansprechende, mit Elementor gebaute Seiten, vollständig responsiv und leicht zu bearbeiten.", "صفحات أنيقة المظهر مبنية بـ Elementor، متجاوبة بالكامل وسهلة التعديل."),
    technologies: ["WordPress", "Elementor"],
    addons: [...addons],
    basic: { days: 4, revisions: 2, features: [f("pages", "1–3"), f("elementor"), f("responsive")] },
    standard: { days: 7, revisions: 3, features: [f("pages", "4–6"), f("elementor"), f("responsive"), f("seoBasic"), f("contactForm")] },
    premium: { days: 10, revisions: 4, features: [f("pages", "7–10"), f("elementor"), f("responsiveAdvanced"), f("seoStandard"), f("animations")] },
  }),
];
