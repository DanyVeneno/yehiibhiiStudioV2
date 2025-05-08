import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Yehiibhii Estudio | Inicio" })
);
router.get("/about", (req, res) =>
  res.render("about", { title: "Yehiibhii Estudio | Nosotros" })
);

router.get("/servicios", (req, res) =>
  res.render("servicios", { title: "Yehiibhii Estudio | Servicios" })
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
router.get("/podcast", (req, res) =>
  res.render("podcast", { title: "Yehiibhii Estudio | Podcast" })
);
router.get("/tienda", (req, res) =>
  res.render("tienda", { title: "Yehiibhii Estudio | Tienda" })
);

router.get("/contacto", (req, res) =>
  res.render("contacto", { title: "Yehiibhii Estudio | Contacto" })
);
router.get("/eventos", (req, res) =>
  res.render("eventos", { title: "Yehiibhii Estudio | Eventos" })
);

router.get("/src/views/manual", (req, res) =>
  res.render("manual", {
    title: "Yehiibhii Estudio | Manual De Identidad",
  })
);

export default router;
