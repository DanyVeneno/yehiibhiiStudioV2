import { readFileSync } from "node:fs";
import { z } from "zod";

const toolSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  url: z.url(),
  description: z.string(),
  purpose: z.string(),
  tags: z.array(z.string()),
  accessNote: z.string().optional(),
}));

export const tools = toolSchema.parse(
  JSON.parse(readFileSync(new URL("./tools.json", import.meta.url), "utf8")),
);

export const footerGroups = [
  {
    title: "Explora",
    links: [
      { label: "Servicios", href: "/servicios" },
      { label: "Portafolio", href: "/tienda" },
      { label: "Ecosistema", href: "/ecosistema" },
      { label: "Experience Engine", href: "https://ybestudio.com/" },
      { label: "Eventos", href: "/eventos" },
      { label: "Experiencia visual", href: "/experiencia" },
    ],
  },
  {
    title: "Conocimiento",
    links: [
      { label: "Blog", href: "https://ybestudio.site/" },
      { label: "Podcast", href: "https://open.spotify.com/show/02JMGEAGGkQVFqkngYb4gE" },
      { label: "Guía PMBOK 7", href: "https://pmbok7guia.netlify.app/" },
      { label: "Integración Digital", href: "https://integraciondigital.netlify.app/" },
      { label: "Usabilidad Nielsen", href: "https://nielsenflow.netlify.app/" },
      { label: "Guía SCRUM", href: "https://scrumguia.netlify.app/" },
    ],
  },
  {
    title: "Proyectos y recursos",
    links: [
      { label: "Portafolio extendido", href: "https://yehiibhiiportafolio.vercel.app/" },
      { label: "Tarjeta de presentación", href: "https://ybestudio.pro/" },
      { label: "Carta de presentación", href: "https://danyvallejo.netlify.app/" },
      { label: "Herramientas con IA", href: "https://yehiibhiiai.netlify.app/" },
      { label: "Plan operacional", href: "https://operacionesyehii.netlify.app/" },
      { label: "Consultoría general", href: "https://consultoriaeco249.netlify.app/" },
      { label: "Implementa en tres fases", href: "https://tresfases.netlify.app/" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/juanitovenenoestudio/" },
  { label: "LinkedIn", href: "https://mx.linkedin.com/in/danielvallejoch" },
  { label: "Behance", href: "https://www.behance.net/danielvallejo23" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC8UhdMAKJX56O2PY8kzBIlw" },
  { label: "GitHub", href: "https://github.com/DanyVeneno" },
  { label: "Facebook", href: "https://www.facebook.com/juanitovenenoestudiodigital" },
  { label: "X", href: "https://twitter.com/VenenoDigital" },
];
