/*
 * Proyectos de DISEÑO (impresos, banners, stands…).
 * Para agregar un nuevo trabajo de diseño:
 *  1. Pon las imágenes optimizadas (.webp, ~1600–2400 px) en src/assets/<carpeta>/
 *  2. Crea una entrada como la de abajo (categorías → piezas).
 *  3. Agrega los textos en src/locales/{es,en}/translation.json
 *     (projects.items.<id> y projects.designGallery.pieces.<key>) y la entrada en Home.jsx.
 */
import mentorCover from '../assets/mentor/cover.webp';
import banner1 from '../assets/mentor/banner-1.webp';
import banner3 from '../assets/mentor/banner-3.webp';
import banner5 from '../assets/mentor/banner-5.webp';
import bannersSet from '../assets/mentor/banners-set.webp';
import backwall from '../assets/mentor/backwall.webp';
import boost from '../assets/mentor/boost-banner.webp';
import augCovers from '../assets/mentor/brochure-aug-covers.webp';
import augStories from '../assets/mentor/brochure-aug-stories.webp';
import recCover from '../assets/mentor/brochure-rec-cover.webp';
import warranty from '../assets/mentor/warranty-cover.webp';

export const mentorCanada = {
  cover: mentorCover,
  categories: [
    {
      key: 'banners',
      pieces: [
        { key: 'banner1', src: banner1 },
        { key: 'bannersSet', src: bannersSet },
        { key: 'banner3', src: banner3 },
        { key: 'banner5', src: banner5 },
        { key: 'backwall', src: backwall },
        { key: 'boost', src: boost },
      ],
    },
    {
      key: 'brochures',
      pieces: [
        { key: 'augCovers', src: augCovers },
        { key: 'augStories', src: augStories },
        { key: 'recCover', src: recCover },
        { key: 'warranty', src: warranty },
      ],
    },
  ],
};
