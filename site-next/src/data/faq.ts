import type { Faq } from './services';
import { business, slotsText } from './business';

/** Perguntas gerais (página /perguntas-frequentes/ e secção da página inicial). Resposta direta na 1.ª frase. */
export const generalFaqs: Faq[] = [
  {
    q: 'Quanto custa reparar o ecrã de um telemóvel em Leça da Palmeira?',
    a: 'Depende do modelo e da avaria, por isso não damos preços de cabeça. Vemos o telemóvel e dizemos-lhe o valor antes de começar a trabalhar.',
  },
  {
    q: 'Quanto tempo demora a reparação de um portátil?',
    a: 'Depende da avaria e de a peça estar ou não disponível. Depois do diagnóstico dizemos-lhe o prazo, antes de avançar.',
  },
  {
    q: 'Vale a pena reparar ou é melhor comprar novo?',
    a: 'Muitas vezes vale a pena reparar. Avaliamos o seu equipamento sem compromisso e, se não compensar, dizemos-lho antes de gastar dinheiro.',
  },
  {
    q: 'Fazem orçamento antes de reparar?',
    a: 'Sempre. Explicamos o que está avariado, o que é possível reparar e quanto custa, antes de avançar com qualquer trabalho. A avaliação é sem compromisso.',
  },
  {
    q: 'Que garantia têm os recondicionados?',
    a: `Os desktops, portáteis e telemóveis recondicionados são testados e têm ${business.warrantyYears} anos de garantia JCC. Os detalhes da garantia explicamos-lhe ao balcão.`,
  },
  {
    q: 'Reparam televisões, consolas e telemóveis de várias marcas?',
    a: 'Sim. Reparamos telemóveis e televisões de várias marcas e consolas de videojogos das principais marcas. Se tem dúvidas sobre o seu modelo, ligue-nos ou escreva por WhatsApp.',
  },
  {
    q: 'Conseguem recuperar fotos de um disco avariado?',
    a: 'Em alguns casos sim, noutros não: depende do estado do disco. Vemos o suporte e dizemos-lhe com franqueza o que é possível.',
  },
  {
    q: 'Fazem assistência informática a empresas?',
    a: 'Sim. Damos suporte técnico regular a empresas: software, redes e manutenção do parque informático.',
  },
  {
    q: 'Qual é o horário? Abrem ao sábado?',
    a: `Abrimos de segunda a sexta, das ${slotsText(1).replace('–', ' às ').replace(' · ', ' e das ').replace('–', ' às ')}, e ao sábado das ${slotsText(6).replace('–', ' às ')}. Ao domingo estamos encerrados.`,
  },
  {
    q: 'Onde fica a loja?',
    a: `Na ${business.street}, ${business.postalCode} ${business.city}, em Matosinhos. É a loja que faz esquina, com o letreiro azul "JCC Computadores".`,
  },
  {
    q: 'Têm condições para profissionais?',
    a: 'Sim. Fazemos serviços técnicos e de reparação eletrónica para profissionais, a preço de revenda. Contacte-nos para mais informações.',
  },
];
