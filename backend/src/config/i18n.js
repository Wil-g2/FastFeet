import i18n from 'i18n';
import path from 'path'; 

i18n.configure({
  locales: ['en', 'pt-BR'], 
  directory: path.resolve(__dirname, '..','locales'),
  queryParameter: 'lang', 
  defaultLocale: 'pt-BR'
});

export default i18n;