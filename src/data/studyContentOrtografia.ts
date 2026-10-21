import { TopicItem } from '../types';

type Lesson = Pick<TopicItem, 'summary' | 'lessonSections' | 'example' | 'references' | 'quickQuestions'>;

const id = 'portugues-1';

export const ORTOGRAFIA_CONTENT: Record<string, Lesson> = {
  [id]: {
    summary: 'Ortografia é o conjunto de convenções que determina como as palavras são escritas. Para resolver dúvidas, reconheça padrões produtivos, observe a família da palavra e consulte o Vocabulário Ortográfico quando a grafia depender de memória lexical. A acentuação gráfica, por sua vez, marca determinadas vogais tônicas conforme regras de posição, terminação, hiato e distinções previstas na norma.',
    lessonSections: [
      {
        heading: '1. Ortografia: regra, família da palavra e consulta',
        body: `A escrita correta depende de convenções comuns a todos os textos, não apenas da pronúncia individual. Algumas grafias seguem padrões previsíveis; outras dependem da origem e da história da palavra. Quando a regra não for suficiente, consulte dicionário ou Vocabulário Ortográfico do Português (VOLP), em vez de criar uma regra absoluta a partir de poucos exemplos.\n\nNa prova, veja se a questão pede uma regra geral, uma palavra específica ou a comparação entre formas parecidas. Grafia, classe gramatical e sentido podem se combinar: “viagem” é substantivo; “viajem” é forma verbal. A frase ajuda a descobrir a classe e, por consequência, a grafia.`,
      },
      {
        heading: '2. S e Z: padrões frequentes e limites',
        body: `O sufixo -oso/-osa escreve-se com S: gostoso, medrosa, cuidadoso. Nos verbos terminados em -isar, observe se a palavra-base já apresenta S: pesquisa → pesquisar; análise → analisar; aviso → avisar. Quando a base não termina em S, é comum formar o verbo com -izar: real → realizar; civil → civilizar; atual → atualizar.\n\nEsses padrões ajudam, mas não cobrem todas as palavras. Há formações lexicalizadas e exceções, como batizar. Verifique a família e confirme no dicionário quando houver dúvida. Não conclua que qualquer som /z/ entre vogais deve ser escrito com Z, nem que toda palavra relacionada a uma base com S mantém essa letra sem alteração.`,
        code: `gosto → gostoso\npesquisa → pesquisar\nanálise → analisar\nreal → realizar\ncivil → civilizar`,
      },
      {
        heading: '3. G e J: posição ajuda, mas nem sempre resolve',
        body: `Antes de E e I, G pode representar o som /ʒ/: gelo, girafa, viagem. Antes de A, O e U, esse som costuma ser representado por J: janela, jogada, juízo. Há padrões de sufixos que ajudam: -agem/-igem/-ugem frequentemente se escrevem com G (mensagem, origem, ferrugem); palavras terminadas em -ágio, -égio, -ígio, -ógio e -úgio também costumam usar G (estágio, colégio, prestígio, relógio, refúgio).\n\nA origem indígena ou árabe pode explicar a grafia de algumas palavras, mas não é um método prático para decidir todas elas. “Jeito” e “jiboia” escrevem-se com J; “gente” e “gelo”, com G. Em caso de dúvida lexical, consulte o VOLP. Compare ainda “viagem” (substantivo: a viagem foi longa) e “viajem” (verbo: espero que eles viajem).`,
      },
      {
        heading: '4. Os quatro porquês',
        body: `Por que, separado e sem acento, aparece em perguntas diretas ou indiretas e pode significar “por qual motivo”: “Por que o prazo mudou?”; “Não sei por que o prazo mudou”. Também pode equivaler a “pelo qual”: “A razão por que lutamos”.\n\nPorque, junto e sem acento, é conjunção explicativa ou causal, frequentemente substituível por “pois”: “O prazo mudou porque houve uma retificação”. Por quê, separado e com acento, ocorre quando o quê fica tônico no fim da oração ou antes de pausa: “O prazo mudou por quê?”; “Ele não explicou por quê.” Porquê, junto e com acento, é substantivo e costuma vir acompanhado de determinante: “Não explicou o porquê da mudança”; “Há vários porquês”.`,
        code: `Pergunta: Por que a sessão foi adiada?\nResposta: Foi adiada porque faltou energia.\nNo fim: A sessão foi adiada por quê?\nSubstantivo: Ninguém explicou o porquê do adiamento.`,
      },
      {
        heading: '5. Sílaba tônica e classificação',
        body: `A sílaba tônica é pronunciada com maior intensidade; acento tônico não é a mesma coisa que acento gráfico. Oxítona tem tonicidade na última sílaba (café, também); paroxítona, na penúltima (fácil, língua); proparoxítona, na antepenúltima (médico, lâmpada). Primeiro separe e pronuncie a palavra; depois aplique a regra de acentuação.\n\nToda palavra tem sílaba tônica, mas nem toda recebe sinal gráfico. A posição da tonicidade é uma parte da análise; terminação, encontros vocálicos e regras especiais determinam se se escreve acento agudo ou circunflexo. Não use apenas a presença do acento para classificar a palavra sem contar as sílabas.`,
      },
      {
        heading: '6. Monossílabos tônicos e oxítonas',
        body: `Monossílabos tônicos terminados em A, E ou O, seguidos ou não de S, recebem acento: pá, pás, pé, mês, pó, nós. Monossílabos átonos como de, me, se e o não recebem acento por essa regra.\n\nOxítonas são acentuadas quando terminam em A, E, O, EM ou ENS, seguidas ou não de S: sofá, café, cipó, também, parabéns. Ditongos abertos tônicos -éi, -éu e -ói também permanecem acentuados em oxítonas e monossílabos: anéis, papéis, herói, chapéu, céu, dói. Classifique a tonicidade antes de aplicar a terminação.`,
      },
      {
        heading: '7. Paroxítonas: terminações que recebem acento',
        body: `Paroxítonas recebem acento em várias terminações, como -l (fácil), -n (hífen), -r (açúcar), -x (tórax), -ps (bíceps), -ã/-ãs (ímã), -ão/-ãos (órfão), -i/-is (júri, lápis, tênis), -us (vírus), -um/-uns (álbum, álbuns), -om/-ons (próton, prótons) e ditongo oral (história, língua, série). Há regras específicas e exceções; use a lista como mapa de padrões, não como substituto de análise da palavra.\n\nEm geral, paroxítonas terminadas em A, E, O, EM e ENS não recebem acento por essas terminações: casa, parede, livro, jovem, homens. Acentos em outras regras podem coexistir. Exemplos fundamentais: “língua” é acentuada por ser paroxítona terminada em ditongo oral; “história” também é acentuada.`,
      },
      {
        heading: '8. Proparoxítonas e ditongos abertos',
        body: `Todas as proparoxítonas são acentuadas: médico, lâmpada, matemática, sótão. Conte a partir da sílaba tônica: se ela for a antepenúltima, a palavra é proparoxítona.\n\nO Acordo Ortográfico retirou o acento de EI e OI tônicos em paroxítonas: ideia, assembleia, jiboia, heroico. Isso não elimina o acento em oxítonas como anéis, papéis, herói e constrói, nem em ditongos abertos -éu, como chapéu e céu. “Jiboia” é escrita sem acento; o fato de o ditongo soar aberto não basta: a posição da tonicidade decide.`,
      },
      {
        heading: '9. Hiato: acento em I e U tônicos',
        body: `I e U tônicos recebem acento quando formam hiato com a vogal anterior e ficam sozinhos na sílaba ou acompanhados de S: sa-í-da, ju-í-zo, ba-ú, pa-ís, ba-la-ús-tre. O hiato separa vogais que pertencem a sílabas diferentes.\n\nA regra tem condições: não se acentuam I ou U tônicos quando formam sílaba com consoante diferente de S, como em ju-iz e ra-iz; o H de palavras como rainha também impede a regra; e paroxítonas com I/U depois de ditongo não recebem acento por esse motivo (feiura, baiuca). Nas oxítonas, como Piauí e tuiuiú, o acento permanece conforme a regra do hiato. Faça a divisão silábica e confira a posição da tonicidade.`,
      },
      {
        heading: '10. Acentos diferenciais e mudanças do Acordo',
        body: `Pôr (verbo) mantém acento para se distinguir de por (preposição); pôde, passado do verbo poder, diferencia-se de pode, presente. Têm e vêm marcam a terceira pessoa do plural, em contraste com tem e vem no singular. Esses acentos têm regras próprias; não são aplicação da regra geral de oxítonas ou paroxítonas.\n\nApós o Acordo, perderam acento, entre outros casos, para (verbo), pelo, polo, voo, enjoo, leem e veem. Também não se acentuam ideia, assembleia, heroico e jiboia. Não aplique a forma antiga por analogia com palavras que continuam acentuadas, como herói, papéis e chapéu.`,
      },
      {
        heading: '11. Quadro resolvido das palavras do material',
        body: `• Anéis: oxítona terminada em ditongo aberto -éi(s), acentuada.\n• Língua: paroxítona terminada em ditongo oral, acentuada. A afirmação de que termina em “-ua” e não recebe acento está errada.\n• História: paroxítona terminada em ditongo oral, acentuada.\n• Só: monossílabo tônico terminado em O, acentuado.\n• Voo: forma sem acento depois do Acordo.\n• Jiboia e ideia: paroxítonas com ditongo aberto EI/OI, sem acento pela regra atual.\n• Balaústre: acento de hiato em U tônico seguido de S na mesma sílaba.\n• Café, também e parabéns: oxítonas acentuadas pelas terminações E, EM e ENS.`,
      },
      {
        heading: '12. Estratégia de resolução e treino',
        body: `Para grafia: (1) identifique a palavra e a classe; (2) procure família e sufixo; (3) aplique padrão conhecido; (4) confira exceção lexical no VOLP se necessário. Para acento: (1) separe sílabas; (2) localize a tônica; (3) classifique como oxítona, paroxítona, proparoxítona ou monossílabo; (4) confira terminação, hiato ou acento diferencial; (5) compare com o Acordo vigente.\n\nQuestão comentada: “A palavra língua não é acentuada porque termina em -ua.” Errado. A sílaba tônica é “lín”, a penúltima; “língua” é paroxítona terminada em ditongo oral e recebe acento.\n\nRecuperação ativa: explique a diferença entre por que e porquê; classifique anéis, língua e voo; diga por que ideia não tem acento e herói tem; explique quando I/U do hiato recebe acento.`,
      },
    ],
    example: 'Compare: “Por que a ideia mudou?” (pergunta); “Mudou porque a equipe revisou o plano” (causa); “A equipe mudou por quê?” (fim de oração); “Ninguém explicou o porquê da mudança” (substantivo). Na grafia e no acento, use a função da expressão e a tonicidade, não apenas a sonoridade.',
    references: [
      { label: 'Acordo Ortográfico da Língua Portuguesa — texto promulgado no Brasil', url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/decreto/d6583.htm' },
      { label: 'Vocabulário Ortográfico da Língua Portuguesa — Academia Brasileira de Letras', url: 'https://www.academia.org.br/nossa-lingua/busca-no-vocabulario' },
    ],
    quickQuestions: [{
      id: `${id}-q1`,
      prompt: '“Língua” não leva acento porque é paroxítona terminada em -ua, assim como “casa”.',
      source: 'Questão autoral para treino',
      correctAnswer: 'errado',
      explanation: '“Língua” é paroxítona terminada em ditongo oral e é acentuada. “Casa” termina em A e não recebe acento por essa terminação.',
    }],
  },
};
