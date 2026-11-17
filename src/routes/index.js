import { Router } from "express";
import { footerGroups, socialLinks, tools } from "../data/site.js";

const router = Router();

const renderPage = (view, title, description) => (req, res) => {
  res.render(`v3/${view}`, {
    title: `${title} | Yehiibhii Estudio`,
    description,
    currentPath: req.path,
    footerGroups,
    socialLinks,
    tools,
  });
};

router.get("/", renderPage(
  "index",
  "Diseño, tecnología y evolución digital",
  "Yehiibhii Estudio une estrategia, identidad y tecnología web para impulsar la evolución digital de tu negocio.",
));
router.get("/about", renderPage(
  "about",
  "Nosotros",
  "Conoce la filosofía de Yehiibhii Estudio y su enfoque humano para la transformación digital.",
));
router.get("/servicios", renderPage(
  "servicios",
  "Servicios",
  "Diseño gráfico, identidad comercial, diseño y desarrollo web conectados con la experiencia del cliente.",
));
router.get("/tienda", renderPage(
  "tienda",
  "Portafolio",
  "Explora proyectos creativos, experiencias web y Edgewoonk de Yehiibhii Estudio.",
));
router.get("/contacto", renderPage(
  "contacto",
  "Contacto",
  "Contacta a Yehiibhii Estudio por WhatsApp, correo o teléfono para conversar sobre tu proyecto.",
));
router.get("/eventos", renderPage(
  "eventos",
  "Eventos y aprendizaje",
  "Videos, recursos y eventos de Yehiibhii Estudio sobre transformación digital.",
));
router.get("/ecosistema", renderPage(
  "ecosistema",
  "Ecosistema de herramientas",
  "Conoce el Experience Engine y las herramientas de diagnóstico, estrategia, productividad y experiencia del cliente.",
));
router.get("/experiencia", (req, res) =>
  res.render("experiencia", { title: "Yehiibhii Estudio | Experiencia visual" })
);
router.get("/disenoyartes", (req, res) =>
  res.render("disenoyartes", {
    title: "Yehiibhii Estudio | Diseño y Artes Graficas",
  })
);
router.get("/disenoydev", (req, res) =>
  res.render("disenoydev", {
    title: "Yehiibhii Estudio | Diseño y Desarrollo Web",
  })
);
router.get("/podcast", (req, res) => res.redirect(302, "https://open.spotify.com/show/02JMGEAGGkQVFqkngYb4gE"));
router.get("/src/views/manual", (req, res) => res.redirect(301, "/servicios"));

export default router;
