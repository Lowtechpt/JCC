/**
 * Serviços. Um registo por página de serviço, texto próprio em cada um.
 * Regra: nada de preços, prazos, marcas concretas ou visitas ao domicílio.
 */
export type Faq = { q: string; a: string };
export type IconName = 'phone' | 'laptop' | 'monitor' | 'tv' | 'console' | 'drive' | 'software' | 'office';
/** Fotos de equipamentos (assets-stock/, CC0): `dev-<chave>` na página do serviço e `dev-<chave>-320` na lista da home */
export type DeviceKey = 'telemovel' | 'placa' | 'comando-tv' | 'comando-consola' | 'disco' | 'ecra-software' | 'escritorio';

export interface Service {
  slug: string;
  name: string;
  /** Nome curto para cartões e listas */
  short: string;
  icon: IconName;
  /** Frase do cartão na página inicial */
  cardLine: string;
  metaTitle: string;
  metaDescription: string;
  h1: [main: string, place: string];
  /** Primeira frase: resposta direta (AEO) */
  answer: string;
  intro: string[];
  issuesTitle: string;
  issues: string[];
  issuesNote?: string;
  steps: { t: string; d: string }[];
  faqs: Faq[];
  related: string[];
  device: { key: DeviceKey; alt: string };
  serviceType: string;
}

export const services: Service[] = [
  {
    slug: 'reparacao-telemoveis',
    name: 'Reparação de telemóveis',
    short: 'Telemóvel',
    icon: 'phone',
    cardLine: 'Ecrã partido, bateria que já não aguenta, porta de carregamento avariada.',
    metaTitle: 'Reparação de telemóveis em Leça da Palmeira | JCC Computadores',
    metaDescription:
      'Troca de ecrã e bateria, reparação de porta de carregamento e outras avarias em smartphones de várias marcas. Loja em Leça da Palmeira, Matosinhos, desde 1994.',
    h1: ['Reparação de telemóveis', 'em Leça da Palmeira'],
    answer:
      'Reparamos telemóveis de várias marcas na nossa loja em Leça da Palmeira: troca de ecrã, troca de bateria, porta de carregamento e outras avarias comuns.',
    intro: [
      'O ecrã partiu-se, a bateria já não chega ao fim do dia ou o telemóvel deixou de carregar. Traga-o à loja, na esquina da Rua General Humberto Delgado, e diga-nos o que se passa.',
      'Vemos o telemóvel, explicamos o problema em palavras simples e damos-lhe o orçamento antes de mexer em nada. Se não valer a pena reparar, dizemos-lho.',
    ],
    issuesTitle: 'Avarias que reparamos',
    issues: [
      'Ecrã partido, riscado ou sem imagem',
      'Bateria que descarrega depressa ou já não segura carga',
      'Porta de carregamento que não carrega ou carrega mal',
    ],
    issuesNote: 'Não encontra a sua avaria na lista? Há outras avarias comuns que também tratamos. Pergunte-nos.',
    steps: [
      { t: 'Traga o telemóvel', d: 'Passe pela loja ou ligue-nos primeiro, se preferir.' },
      { t: 'Diagnóstico', d: 'Vemos o que se passa e explicamos-lhe o problema sem termos técnicos.' },
      { t: 'Orçamento', d: 'Diz-lhe quanto custa antes de qualquer trabalho. Só avançamos com o seu sim.' },
      { t: 'Reparação e entrega', d: 'Reparamos e avisamos quando pode levantar.' },
    ],
    faqs: [
      {
        q: 'Quanto custa trocar o ecrã de um telemóvel?',
        a: 'Depende do modelo e do estado do aparelho. Não damos preços de cabeça: vemos o telemóvel e dizemos-lhe o valor antes de começar.',
      },
      {
        q: 'Reparam telemóveis de todas as marcas?',
        a: 'Trabalhamos com smartphones de várias marcas. Se tem dúvidas sobre o seu modelo, ligue-nos ou envie mensagem por WhatsApp.',
      },
      {
        q: 'Vale a pena reparar ou é melhor comprar um novo?',
        a: 'Muitas vezes vale a pena reparar. Quando não vale, dizemos-lho com franqueza, antes de gastar dinheiro.',
      },
      {
        q: 'Preciso de marcar?',
        a: 'Pode passar pela loja no nosso horário de atendimento. Se preferir, ligue antes para o 965 882 675.',
      },
    ],
    related: ['reparacao-computadores', 'manutencao-software', 'recuperacao-dados'],
    device: { key: 'telemovel', alt: 'Telemóvel branco pousado sobre um portátil, numa mesa clara' },
    serviceType: 'Reparação de telemóveis',
  },
  {
    slug: 'reparacao-computadores',
    name: 'Reparação de computadores',
    short: 'Computador ou portátil',
    icon: 'laptop',
    cardLine: 'Desktops e portáteis que não arrancam, peças a trocar, placas avariadas.',
    metaTitle: 'Reparação de PC e portáteis em Leça da Palmeira | JCC',
    metaDescription:
      'Reparação de desktops e portáteis: falhas de arranque, troca de peças e reparação de placas. Orçamento antes de reparar. Leça da Palmeira, desde 1994.',
    h1: ['Reparação de computadores e portáteis', 'em Leça da Palmeira'],
    answer:
      'Fazemos o diagnóstico e a reparação de desktops e portáteis na loja: falhas de arranque, troca de peças e reparação de placas (boards).',
    intro: [
      'Desde 1994 que reparamos computadores. O seu não liga? Liga e desliga sozinho? Ficou lento de repente? Traga-o à loja.',
      'Primeiro percebemos o que se passa. Depois explicamos-lhe, com clareza, o que está avariado, o que é possível reparar e quanto custa. Só depois mexemos no equipamento.',
    ],
    issuesTitle: 'O que tratamos',
    issues: [
      'Computador que não arranca ou falha no arranque',
      'Substituição de peças em desktops e portáteis',
      'Reparação de placas (boards), quando há reparação possível',
      'Diagnóstico de avarias que ainda ninguém explicou',
    ],
    issuesNote:
      'Se o problema é lentidão, vírus ou o sistema, veja também a manutenção e otimização de software.',
    steps: [
      { t: 'Traga o equipamento', d: 'Desktop ou portátil. Diga-nos o que foi acontecendo antes da avaria.' },
      { t: 'Diagnóstico', d: 'Descobrimos a causa e dizemos-lhe o que se passa, sem rodeios.' },
      { t: 'Orçamento claro', d: 'Valor combinado antes de qualquer reparação.' },
      { t: 'Reparação', d: 'Trocamos ou reparamos o necessário e avisamos quando está pronto.' },
    ],
    faqs: [
      {
        q: 'Quanto tempo demora a reparação de um portátil?',
        a: 'Depende da avaria e de a peça estar ou não disponível. Depois do diagnóstico dizemos-lhe o prazo, antes de avançar.',
      },
      {
        q: 'Reparam placas-mãe?',
        a: 'Sim, a reparação de placas (boards) faz parte do que fazemos, em desktops e portáteis. Nem toda a placa tem reparação possível: vemos o seu caso e dizemos-lhe.',
      },
      {
        q: 'Vale a pena reparar um computador antigo?',
        a: 'Depende da avaria e do que precisa dele. Avaliamos sem compromisso e dizemos-lhe se compensa reparar.',
      },
      {
        q: 'O diagnóstico obriga-me a avançar com a reparação?',
        a: 'Não. A avaliação é sem compromisso. Só avançamos depois de lhe explicar o problema e o orçamento.',
      },
    ],
    related: ['manutencao-software', 'recuperacao-dados', 'assistencia-informatica-empresas'],
    device: {
      key: 'placa',
      alt: 'Placa-mãe de computador com o processador no encaixe e as ranhuras de memória azuis',
    },
    serviceType: 'Reparação de computadores e portáteis',
  },
  {
    slug: 'reparacao-televisoes',
    name: 'Reparação de televisões',
    short: 'Televisão',
    icon: 'tv',
    cardLine: 'Sem imagem, sem som, não liga: avarias de ecrã, som e fonte de alimentação.',
    metaTitle: 'Reparação de televisões em Leça da Palmeira | JCC Computadores',
    metaDescription:
      'Assistência técnica a televisores de várias marcas: ecrã, som, fontes de alimentação e outras avarias comuns. Loja em Leça da Palmeira, Matosinhos.',
    h1: ['Reparação de televisões', 'em Leça da Palmeira'],
    answer:
      'Prestamos assistência técnica a televisores de várias marcas: avarias de ecrã, de som, de fonte de alimentação e outras avarias comuns.',
    intro: [
      'A televisão não liga, tem imagem mas não tem som, ou o ecrã apareceu com riscas. Antes de pensar em comprar outra, peça-nos uma avaliação.',
      'Dizemos-lhe o que está avariado e se a reparação compensa. Sem surpresas: o valor é combinado antes de trabalharmos no televisor.',
    ],
    issuesTitle: 'Avarias comuns',
    issues: [
      'Problemas de ecrã (sem imagem, riscas, manchas)',
      'Problemas de som',
      'Fontes de alimentação avariadas, quando a televisão não liga',
      'Outras avarias comuns em televisores de várias marcas',
    ],
    steps: [
      { t: 'Fale connosco', d: 'Ligue ou mande mensagem a contar o que a televisão faz (ou deixou de fazer).' },
      { t: 'Avaliação', d: 'Vemos o televisor e identificamos a avaria.' },
      { t: 'Orçamento', d: 'Explicamos o que está avariado e se compensa reparar.' },
      { t: 'Reparação', d: 'Só avançamos depois do seu sim.' },
    ],
    faqs: [
      {
        q: 'Reparam televisões de várias marcas?',
        a: 'Sim, damos assistência técnica a televisores de várias marcas. Se tiver dúvidas sobre a sua, pergunte-nos.',
      },
      {
        q: 'A televisão não liga. Sabem o que pode ser?',
        a: 'Pode ser, por exemplo, a fonte de alimentação, que é uma das avarias mais comuns. Só vendo o televisor é que conseguimos confirmar.',
      },
      {
        q: 'Compensa reparar ou é melhor comprar outra?',
        a: 'Depende da avaria. Avaliamos sem compromisso e dizemos-lhe com honestidade o que faria no seu lugar.',
      },
      {
        q: 'Fazem orçamento antes de reparar?',
        a: 'Sempre. Antes de mexermos no televisor, explicamos o problema e o custo.',
      },
    ],
    related: ['reparacao-consolas', 'reparacao-computadores', 'reparacao-telemoveis'],
    device: { key: 'comando-tv', alt: 'Comando de televisão preto sobre uma mesa clara' },
    serviceType: 'Reparação de televisões',
  },
  {
    slug: 'reparacao-consolas',
    name: 'Reparação e limpeza de consolas',
    short: 'Consola',
    icon: 'console',
    device: { key: 'comando-consola', alt: 'Comando de consola em contraluz, iluminado a azul' },
    cardLine: 'Consola que aquece, faz barulho ou deixou de funcionar.',
    metaTitle: 'Reparação de consolas em Leça da Palmeira | JCC Computadores',
    metaDescription:
      'Manutenção, limpeza interna e reparação de avarias em consolas de videojogos das principais marcas. Leça da Palmeira, Matosinhos.',
    h1: ['Reparação e limpeza de consolas', 'em Leça da Palmeira'],
    answer:
      'Fazemos manutenção, limpeza interna e reparação de avarias em consolas de videojogos das principais marcas.',
    intro: [
      'A consola aquece de mais, faz um barulho que antes não fazia ou simplesmente deixou de ligar. Por vezes basta uma boa limpeza; outras vezes há uma avaria a resolver.',
      'Vemos qual é o caso, explicamos-lhe o que encontrámos e damos o orçamento antes de começar.',
    ],
    issuesTitle: 'O que fazemos',
    issues: [
      'Manutenção da consola',
      'Limpeza interna (pó acumulado, ventilação)',
      'Reparação de avarias em consolas das principais marcas',
    ],
    issuesNote:
      'Com o tempo, o pó acumula-se por dentro e a consola deixa de arrefecer bem. É uma das razões mais comuns para aquecer e fazer barulho.',
    steps: [
      { t: 'Traga a consola', d: 'Diga-nos o que está a acontecer: se aquece, se faz barulho, se não liga.' },
      { t: 'Vemos por dentro', d: 'Identificamos se precisa de limpeza ou de reparação.' },
      { t: 'Orçamento', d: 'Sabe o que vamos fazer e quanto custa antes de começarmos.' },
      { t: 'Entrega', d: 'Avisamos assim que a consola estiver pronta.' },
    ],
    faqs: [
      {
        q: 'Porque é que a minha consola faz tanto barulho?',
        a: 'Muitas vezes é pó acumulado na ventilação. A limpeza interna costuma ser o primeiro passo. Se houver outra causa, dizemos-lhe depois de ver a consola.',
      },
      {
        q: 'Reparam consolas de todas as marcas?',
        a: 'Reparamos consolas de videojogos das principais marcas. Diga-nos o seu modelo e confirmamos.',
      },
      {
        q: 'Vale a pena só limpar a consola?',
        a: 'Se o problema é calor e ruído, a limpeza pode resolver. Vemos o seu caso e dizemos-lhe o que faz sentido.',
      },
    ],
    related: ['reparacao-televisoes', 'reparacao-computadores', 'manutencao-software'],
    serviceType: 'Reparação e limpeza de consolas de videojogos',
  },
  {
    slug: 'recuperacao-dados',
    name: 'Recuperação de dados',
    short: 'Dados perdidos',
    icon: 'drive',
    device: { key: 'disco', alt: 'Disco rígido aberto, com o prato e a cabeça de leitura à vista' },
    cardLine: 'Fotos, documentos e ficheiros num disco que deixou de responder.',
    metaTitle: 'Recuperação de dados em Leça da Palmeira | JCC Computadores',
    metaDescription:
      'Recuperação de ficheiros, fotos e documentos a partir de discos e outros suportes com falhas ou danificados. Leça da Palmeira, Matosinhos.',
    h1: ['Recuperação de dados', 'em Leça da Palmeira'],
    answer:
      'Tentamos recuperar ficheiros, fotos e documentos de discos e outros suportes com falhas ou danificados. Depois de vermos o suporte, dizemos-lhe com franqueza o que é possível.',
    intro: [
      'As fotos da família, os documentos do trabalho, anos de ficheiros: tudo num disco que deixou de abrir. Antes de desistir, traga-no-lo.',
      'Não prometemos o que não sabemos. Vemos o estado do suporte e dizemos-lhe o que há a fazer.',
    ],
    issuesTitle: 'Situações que vemos',
    issues: [
      'Discos com falhas que já não abrem',
      'Suportes danificados',
      'Ficheiros, fotos e documentos que desapareceram',
    ],
    issuesNote:
      'Se o disco faz ruídos estranhos ou deixou de aparecer no computador, evite ligá-lo repetidamente. Cada tentativa pode piorar o estado do suporte.',
    steps: [
      { t: 'Traga o suporte', d: 'Disco ou outro suporte, com o que se passou antes de falhar.' },
      { t: 'Avaliação', d: 'Vemos o estado e dizemos-lhe se há hipóteses de recuperar.' },
      { t: 'Orçamento', d: 'Combinado antes de começarmos.' },
      { t: 'Recuperação', d: 'Tentamos recuperar o que pediu e entregamos-lhe o resultado.' },
    ],
    faqs: [
      {
        q: 'Conseguem recuperar fotos de um disco avariado?',
        a: 'Em alguns casos sim, noutros não: depende do estado do disco. Vemos o suporte e dizemos-lhe com franqueza o que é possível.',
      },
      {
        q: 'Que suportes aceitam?',
        a: 'Discos e outros suportes com falhas ou danificados. Se tem dúvidas sobre o seu, ligue-nos ou envie mensagem.',
      },
      {
        q: 'Devo continuar a ligar o disco para ver se volta a funcionar?',
        a: 'Não. Se o disco já dá sinais de avaria, ligá-lo vezes sem conta pode piorar as coisas. Traga-o como está.',
      },
    ],
    related: ['reparacao-computadores', 'manutencao-software', 'assistencia-informatica-empresas'],
    serviceType: 'Recuperação de dados',
  },
  {
    slug: 'manutencao-software',
    name: 'Manutenção e otimização de software',
    short: 'Software',
    icon: 'software',
    device: { key: 'ecra-software', alt: 'Ecrã de portátil com código, em tons de azul' },
    cardLine: 'Vírus, sistema a falhar, computador lento.',
    metaTitle: 'Remoção de vírus e formatação em Leça da Palmeira | JCC',
    metaDescription:
      'Remoção de vírus, reinstalação do sistema operativo, atualizações e otimização para o seu computador voltar a responder bem. Leça da Palmeira, Matosinhos.',
    h1: ['Manutenção e otimização de computadores', 'em Leça da Palmeira'],
    answer:
      'Removemos vírus, reinstalamos o sistema operativo, tratamos das atualizações e otimizamos o desempenho para o computador voltar a responder bem.',
    intro: [
      'O computador demora uma eternidade a ligar, abre janelas que ninguém pediu ou deixou de atualizar. Nem sempre é avaria. Muitas vezes é só software a precisar de uma boa arrumação.',
      'Vemos o que o está a atrasar e dizemos-lhe o que é preciso fazer. Reinstalar o sistema é só uma das hipóteses.',
    ],
    issuesTitle: 'O que fazemos',
    issues: [
      'Remoção de vírus',
      'Reinstalação do sistema operativo',
      'Atualizações',
      'Otimização de desempenho',
    ],
    steps: [
      { t: 'Traga o computador', d: 'Conte-nos o que notou: lentidão, avisos estranhos, falhas.' },
      { t: 'Vemos a causa', d: 'Identificamos o que está a prejudicar o computador.' },
      { t: 'Combinamos o que fazer', d: 'Explicamos as hipóteses e o custo antes de começar.' },
      { t: 'Entrega', d: 'Deixamos o equipamento a responder bem e avisamos que está pronto.' },
    ],
    faqs: [
      {
        q: 'O meu computador está lento. Tenho de formatar?',
        a: 'Nem sempre. Primeiro vemos o que o atrasa. Reinstalar o sistema é só uma das hipóteses.',
      },
      {
        q: 'Vou perder os meus ficheiros?',
        a: 'Se for preciso reinstalar o sistema, falamos consigo sobre os seus ficheiros antes de começar.',
      },
      {
        q: 'Removem vírus em portáteis e desktops?',
        a: 'Sim, em ambos. Fazemos também as atualizações em falta e a otimização do desempenho.',
      },
    ],
    related: ['reparacao-computadores', 'recuperacao-dados', 'assistencia-informatica-empresas'],
    serviceType: 'Manutenção e otimização de software',
  },
  {
    slug: 'assistencia-informatica-empresas',
    name: 'Assistência informática a empresas',
    short: 'Empresa',
    icon: 'office',
    device: { key: 'escritorio', alt: 'Posto de trabalho de escritório com monitor, teclado e rato' },
    cardLine: 'Software, redes e manutenção do parque informático.',
    metaTitle: 'Assistência informática a empresas em Matosinhos | JCC',
    metaDescription:
      'Software, redes e manutenção de parque informático: suporte técnico regular para a sua empresa não parar. JCC Computadores, Leça da Palmeira, Matosinhos.',
    h1: ['Assistência informática a empresas', 'em Matosinhos'],
    answer:
      'Damos suporte técnico regular a empresas: software, redes e manutenção do parque informático, para o negócio continuar a funcionar sem interrupções.',
    intro: [
      'Quando um computador pára, o trabalho pára com ele. Numa empresa, isso custa tempo e dinheiro.',
      'Tratamos do software, das redes e da manutenção dos equipamentos. Fale connosco e vemos o que a sua empresa precisa.',
    ],
    issuesTitle: 'O que cobrimos',
    issues: [
      'Software: instalação, atualizações, resolução de problemas',
      'Redes: configuração e resolução de falhas',
      'Manutenção do parque informático (computadores e restante equipamento)',
      'Suporte técnico regular',
    ],
    steps: [
      { t: 'Conversa', d: 'Diga-nos quantos equipamentos tem e o que lhe tem dado dores de cabeça.' },
      { t: 'Levantamento', d: 'Percebemos o estado do que já tem.' },
      { t: 'Proposta', d: 'Combinamos o que faz sentido para a sua empresa.' },
      { t: 'Acompanhamento', d: 'Suporte regular, para os problemas não se acumularem.' },
    ],
    faqs: [
      {
        q: 'Fazem assistência a empresas?',
        a: 'Sim. Damos suporte técnico regular: software, redes e manutenção do parque informático.',
      },
      {
        q: 'Como pedir uma proposta?',
        a: 'Ligue para o 965 882 675 ou escreva-nos por WhatsApp. Contamos-lhe como trabalhamos e combinamos o que a sua empresa precisa.',
      },
      {
        q: 'Têm condições para profissionais da área?',
        a: 'Sim, fazemos serviços técnicos de reparação eletrónica a preço de revenda. Veja a página de revenda.',
      },
    ],
    related: ['manutencao-software', 'reparacao-computadores', 'recuperacao-dados'],
    serviceType: 'Assistência informática a empresas',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
