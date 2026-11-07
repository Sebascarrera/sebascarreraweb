/* Trabajos reales del portafolio para la portada cinematográfica.
 * Los textos viven en src/locales/{es,en}/translation.json → projects.cases.<id>.* (igual que la página clásica).
 * Para agregar un proyecto: importa su media, súmalo aquí (el orden es el de aparición) y agrega sus textos. */
import ciberImage from '../assets/projects/ciberseguridad.webp';
import ciberseguridadVideo from '../assets/videos/ciberseguridad.mp4';
import jornada2026Image from '../assets/projects/jornada-2026.webp';
import mundoColmenaImage from '../assets/projects/mundo-colmena.webp';
import mundoColmenaVideo from '../assets/videos/mundo-colmena.mp4';
import colmenaRouteImage from '../assets/projects/colmena-route-game.webp';
import colmenaRouteVideo from '../assets/videos/COLMENA-ROUTE-GAME.mp4';
import ukcolImage from '../assets/projects/ukcol-touch.webp';
import ukcolVideo from '../assets/videos/ukcol-touch.mp4';
import fullStaffImage from '../assets/projects/fullstaff.webp';
import fullStaffVideo from '../assets/videos/fullstaff.mp4';
import gogoImage from '../assets/projects/gogo-racing.webp';
import gogoVideo from '../assets/videos/gogoracing.mp4';
import moneyWeekImage from '../assets/projects/money-week.webp';
import moneyWeekFull from '../assets/videos/moneyweek-challenge.webp';
import sprintImage from '../assets/projects/sprint-falabella.webp';
import sprintFull from '../assets/videos/sprint-falabella.webp';
import iaImage from '../assets/projects/iaBdb-Enko.webp';
import iaVideo from '../assets/videos/iaBdb-Enko.mp4';
import { mentorCanada, mentorStand } from '../data/designProjects.js';

export const REACH = { 1: 3000, 7: 5000, 8: 10000, 12: 1000 };
export const JORNADA_URL = 'https://ciberseguridad.sebastiancarreramoya.com';

export const WORK = [
  { id: 11, image: jornada2026Image, live: JORNADA_URL },
  { id: 12, image: mentorStand.cover, gallery: mentorStand.categories },
  { id: 10, image: mentorCanada.cover, gallery: mentorCanada.categories },
  { id: 8, image: sprintImage, full: sprintFull },
  { id: 7, image: moneyWeekImage, full: moneyWeekFull },
  { id: 3, image: colmenaRouteImage, video: colmenaRouteVideo },
  { id: 2, image: mundoColmenaImage, video: mundoColmenaVideo },
  { id: 9, image: iaImage, video: iaVideo },
  { id: 1, image: ciberImage, video: ciberseguridadVideo },
  { id: 6, image: gogoImage, video: gogoVideo },
  { id: 4, image: ukcolImage, video: ukcolVideo },
  { id: 5, image: fullStaffImage, video: fullStaffVideo },
];
