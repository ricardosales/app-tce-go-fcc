import { TopicItem } from '../types';

type Lesson = Pick<TopicItem, 'summary' | 'lessonSections' | 'example' | 'references' | 'quickQuestions'>;

const id = 'portugues-2';

export const CRASE_CONTENT: Record<string, Lesson> = {
  [id]: {
    summary: 'Crase é, em sentido amplo, a fusão de sons vocálicos iguais; na escrita, o acento grave marca principalmente a contração da preposição a com o artigo feminino a/as. Também aparece diante de aquele(s), aquela(s), aquilo e dos relativos a qual/as quais quando a regência exige a preposição. Para decidir, identifique primeiro a regência e depois verifique se o termo seguinte admite artigo ou contém a vogal demonstrativa.',
    lessonSections: [
      {
        heading: '1. O que o acento grave indica',
        body: `Na maioria dos casos cobrados em concursos, ocorre crase quando dois elementos se encontram: uma preposição “a”, exigida por verbo ou nome, e um artigo feminino “a” ou “as” que acompanha o substantivo. A contração é escrita com acento grave: a + a = à; a + as = às. Exemplo: quem vai, vai a algum lugar; “escola” admite artigo (“a escola”); portanto: “Vou à escola”.\n\nA fórmula é um diagnóstico, não uma regra de que toda palavra feminina depois de verbo recebe crase. O verbo pode não exigir a preposição, e a palavra seguinte pode não admitir artigo. Primeiro descubra a relação sintática; depois confira a presença dos dois elementos. O acento grave não é um acento de tonicidade: ele sinaliza uma contração.`
      },
      {
        heading: '2. Regência: descubra se há preposição A',
        body: `Pergunte qual complemento o verbo ou o nome exige. “Obedecer” rege a preposição a: obedecer a algo. Como “lei” admite o artigo feminino, temos “Obedeço à lei”. “Assistir”, no sentido de ver, rege a: “Assisti à sessão”. “Referir-se” também rege a: “Referi-me à aluna”.\n\nA regência pode mudar conforme o sentido. “Aspirar a um cargo” significa desejar um cargo: a preposição é exigida pelo verbo, mas “um cargo” começa por artigo masculino “um”, não por artigo feminino “a”; a frase está correta e não tem crase. Já “aspirar o ar” (respirar) é transitivo direto e não leva preposição. Não classifique uma frase como incorreta apenas porque não há acento grave: determine antes o sentido do verbo e o complemento.`
      },
      {
        heading: '3. Substantivo feminino e artigo',
        body: `Com substantivo feminino determinado pelo artigo, a contração costuma ocorrer quando a regência exige preposição a: “Entreguei o documento à professora”; “Chegamos à conclusão”; “Fiz referência às normas”. O plural combina preposição e artigo plural: a + as = às.\n\nSem artigo, não há contração: “Entreguei o documento a uma professora”; “Não me referi a pessoas específicas”. A presença de um nome feminino, por si só, não determina crase. Compare “Escrevi a Maria” e “Escrevi à Maria”: o uso do artigo antes de nome próprio varia regionalmente e conforme o contexto; se o artigo é usado, a preposição pode contrair-se com ele. Em questões, observe a construção apresentada e a regência, sem tratar o artigo com nomes próprios como universalmente obrigatório ou proibido.`
      },
      {
        heading: '4. Locuções femininas',
        body: `Usa-se acento grave em muitas locuções adverbiais, prepositivas e conjuntivas femininas: “à noite”, “à tarde”, “às vezes”, “às pressas”, “à direita”, “à disposição de”, “à procura de”, “à medida que” e “à proporção que”. Essas expressões são construções consagradas; reconhecê-las ajuda, mas ainda é importante distinguir uma locução de uma sequência casual de palavras.\n\nA expressão “a distância” não recebe acento quando usada sem especificação: “O curso é realizado a distância”. Com distância determinada, ocorre crase: “O curso é realizado à distância de dois quilômetros”. Também há crase em “à moda de” e “à maneira de”, inclusive quando a expressão fica subentendida antes de nome masculino: “bife à milanesa” (à moda milanesa), “um gol à Pelé” (à maneira de Pelé).`
      },
      {
        heading: '5. Horas e expressões de tempo',
        body: `Indica-se crase diante de hora determinada: “A prova começa às 13h”; “Chegarei à uma hora”; “O atendimento vai das 8h às 17h”. A expressão “à meia-noite” também leva acento. A preposição “de” em “das” já mostra a presença do artigo: “das 8h às 17h”.\n\nNão se usa crase quando a indicação é indeterminada ou quando outra preposição ocupa o lugar: “Estudarei daqui a duas horas” (intervalo futuro); “A reunião foi marcada para as 14h” (preposição para); “O prazo termina após as 18h”. Com “até”, o acento pode ser facultativo diante de palavra feminina que admite artigo: “Fui até a sala” ou “Fui até à sala”. Em provas, aplique a construção exata do enunciado, sem generalizar a regra de horas para qualquer número.`
      },
      {
        heading: '6. Casos em que normalmente não ocorre crase',
        body: `Não se usa crase antes de verbo: “Começou a estudar”; antes de palavra masculina: “Foi a pé”, “pagamento a prazo”; nem em expressões com palavras repetidas: “cara a cara”, “gota a gota”, “face a face”. Em geral, não ocorre diante de artigo indefinido (“a uma pessoa”), da maioria dos pronomes pessoais (“a ela”), dos pronomes de tratamento iniciados por Vossa (“a Vossa Senhoria”) e de pronomes demonstrativos que não começam por a (“a esta”, “a essa”).\n\nEssas categorias têm construções próprias: “à moda de” pode produzir crase antes de nome masculino; “àquele” e “àquela” recebem crase; e certos relativos admitem a contração. Evite decorar “antes de pronome nunca”: identifique o pronome e a estrutura. Em “Entreguei o relatório a ela”, por exemplo, há preposição exigida por entregar algo a alguém, mas o pronome “ela” não vem precedido do artigo feminino “a”.`
      },
      {
        heading: '7. Demonstrativos: aquele, aquela, aquilo e a qual',
        body: `A preposição a pode contrair-se com a vogal inicial de aquele(s), aquela(s) e aquilo: “Refiro-me àquela aluna”; “Entreguei os documentos àqueles servidores”; “O relatório alude àquilo que foi decidido”. Teste a regência: quem se refere, refere-se a; a + aquela = àquela.\n\nTambém pode ocorrer crase antes de “a qual” e “as quais” quando o termo anterior exige a preposição a: “Esta é a norma à qual obedecemos”; “Estas são as regras às quais fiz referência”. Para testar, substitua o relativo por “a qual/as quais” e confira a regência. Não confunda com “a que”: pode haver crase se esse “a” for artigo antes de um substantivo ou se a construção exigir a contração, mas a análise depende da frase completa.`
      },
      {
        heading: '8. Casa, terra, distância e nomes de lugar',
        body: `“Casa”, sem determinante e no sentido de lar próprio, costuma aparecer sem artigo: “Voltei a casa cedo”. Se vier especificada ou determinada, admite artigo e pode haver crase: “Voltei à casa dos meus pais”. Compare também “cheguei a casa” (lar, uso sem artigo) e “cheguei à casa azul” (casa identificada).\n\n“Terra”, no sentido de chão firme em oposição a bordo, pode ocorrer sem artigo: “Os marinheiros chegaram a terra”. Com especificação, usa-se artigo: “Voltou à terra natal”. O nome do planeta pode ser empregado com artigo — “A nave retornou à Terra” —, portanto não é correto ensinar que “Terra (planeta)” sempre dispensa crase. Nomes de cidades e regiões variam: use o teste “volto da/do” para verificar artigo (“vou à Bahia” / “volto da Bahia”; “vou a Brasília” / “volto de Brasília”). A crase também pode surgir com distância determinada: “Ficou à distância de cinco quilômetros”; sem especificação: “Observou a distância”.`
      },
      {
        heading: '9. Numerais, medidas e expressões com A',
        body: `A sequência “a + numeral” não é automaticamente errada nem automaticamente leva crase. Em “Ficamos a três dias do evento”, o “a” marca distância temporal e não há artigo feminino; a frase pode estar correta sem acento. Já “compareceram a vinte pessoas” não é um exemplo adequado para ensinar ausência de crase: a construção natural é “compareceram vinte pessoas” ou “o convite foi enviado a vinte pessoas”.\n\nAparece crase diante de numeral feminino que indica hora (“às duas horas”) ou em construções com substantivo feminino determinado (“da página 5 à página 8”; “referiu-se à primeira questão”), se a regência pedir a preposição. Em medidas e distâncias, analise se há artigo e determinação: “a 5 km daqui” (distância aproximada, sem artigo); “à distância de 5 km” (locução especificada). A função do trecho, não o algarismo isolado, decide.`
      },
      {
        heading: '10. Teste de substituição: útil, com limites',
        body: `Troque o substantivo feminino por um masculino equivalente, mantendo a estrutura. Se a construção resultar naturalmente em “ao”, isso é um indício de que no feminino há “à”: “Vou à escola” → “Vou ao colégio”; “Obedeço à lei” → “Obedeço ao regulamento”. Se a construção masculina usar apenas “a”, a feminina tende a ficar sem crase: “Vou a pé” → “Vou a cavalo”.\n\nO teste não deve substituir a análise da regência e do artigo. Escolha um equivalente com a mesma função sintática e preserve o sentido. O teste pode confundir quando se troca a palavra por outra que altera a regência, quando há pronome demonstrativo (“àquela”) ou uma locução cristalizada. Use-o como confirmação depois de identificar a relação sintática, não como fórmula infalível.`
      },
      {
        heading: '11. Correção comentada dos exemplos enviados',
        body: `• “Obedeço à lei”: correto. Obedecer exige preposição a e “lei” vem com artigo a.\n• “Aspiro a um cargo”: frase correta no sentido de desejar. Não há crase porque o complemento é “um cargo”, masculino e indefinido.\n• “Chegamos às 10h”: correto, hora determinada.\n• “Ficamos a três dias do evento”: pode estar correto sem crase; expressa distância temporal. A marca de incorreto no material original não procede.\n• “Refiro-me àquela aluna”: correto. Referir-se exige a; a + aquela = àquela.\n• “Vou à praia”: ir a + a praia.\n• “Vestiu-se à moda antiga” e “bife à milanesa”: locução “à moda de” expressa ou subentendida.\n• “Vou a pé” e “começou a estudar”: sem crase, antes de palavra masculina e de verbo, respectivamente.\n• “Cara a cara”: sem crase, em expressão com termos repetidos.`
      },
      {
        heading: '12. Roteiro para resolver questões',
        body: `1. Leia a oração inteira e identifique o sentido do verbo ou nome.\n2. Verifique se esse termo rege a preposição a.\n3. Observe o termo seguinte: admite artigo feminino a/as ou começa por aquele/aquela/aquilo?\n4. Se os dois elementos estiverem presentes, marque à/às; se faltar um deles, não use acento grave.\n5. Confira locuções, horas, nomes de lugar, pronomes e expressões especiais.\n6. Use a substituição pelo masculino como teste auxiliar e revise se ela preservou o sentido.\n\nQuestão de treino: “Em ‘Aspiro a um cargo público’, o emprego de a sem acento está errado porque o verbo aspirar exige crase.” Errado. No sentido de desejar, aspirar exige a preposição a, mas o complemento “um cargo” está introduzido pelo artigo masculino indefinido um. Não existe fusão com artigo feminino.\n\nRecuperação ativa: explique quais são os dois elementos de “à lei”; por que “àquela” tem acento; quando “até a/à” pode variar; e por que “a três dias do evento” não deve ser classificado automaticamente como erro.`
      },
    ],
    example: 'Compare: “Obedeço à lei” (obedecer a + a lei); “Aspiramos a um cargo” (aspirar a, no sentido de desejar, + um cargo, sem artigo feminino); “Refiro-me àquela regra” (a + aquela); “A reunião começa às 14h” (hora determinada). Em cada caso, identifique a regência e o elemento que vem depois antes de decidir pelo acento grave.',
    references: [
      { label: 'Manual de Redação da Presidência da República — página oficial', url: 'https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica' },
      { label: 'Manual de Comunicação Escrita Oficial — CAPES/EDUCAPES (seção sobre crase)', url: 'https://educapes.capes.gov.br/bitstream/capes/573863/2/E-book%20-%20Manual%20de%20Comunica%C3%A7%C3%A3o%20em%20Escrita%20Oficial.pdf' },
    ],
    quickQuestions: [{
      id: `${id}-q1`,
      prompt: 'A frase “Aspiro a um cargo público” está errada porque o verbo aspirar, no sentido de desejar, exige crase.',
      source: 'Questão autoral para treino',
      correctAnswer: 'errado',
      explanation: 'No sentido de desejar, aspirar rege a preposição a. Porém, “um cargo” é masculino e está introduzido pelo artigo indefinido “um”; não existe artigo feminino “a” para se fundir com a preposição. A frase está correta sem acento grave.',
    }],
  },
};
