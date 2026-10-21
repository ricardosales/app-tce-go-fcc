import { TopicItem } from '../types';

type Lesson = Pick<TopicItem, 'summary' | 'lessonSections' | 'example' | 'references' | 'quickQuestions'>;

const id = 'portugues-0';

export const OFFICIAL_WRITING_CONTENT: Record<string, Lesson> = {
  [id]: {
    summary: 'Redação oficial é a comunicação escrita produzida em nome de uma instituição pública para tratar de assuntos de interesse público. Deve permitir que o leitor compreenda com precisão a informação ou providência esperada. O Manual de Redação da Presidência da República apresenta padrões para comunicações do Poder Executivo federal; órgãos como o TCE-GO também podem adotar normas próprias que complementem esse padrão.',
    lessonSections: [
      {
        heading: '1. O que torna um texto oficial',
        body: `O caráter oficial decorre da finalidade e da instituição que comunica, não de um conjunto de palavras rebuscadas. O texto registra informação, solicita providência, responde a demanda, encaminha documento ou formaliza decisão. Por isso, deve ser compreensível, verificável e adequado ao destinatário.\n\nO Manual de Redação da Presidência da República (MRPR) é referência para comunicações oficiais e atos normativos do Poder Executivo federal. Um tribunal de contas estadual pode ter orientações internas próprias. Em questão, observe o manual ou a norma expressamente indicada no enunciado; não aplique automaticamente um modelo federal a qualquer instituição sem verificar o contexto.`,
      },
      {
        heading: '2. Atributos: como reconhecer na prática',
        body: `Clareza e precisão evitam ambiguidade; objetividade mantém o texto concentrado no assunto; concisão retira excessos sem eliminar informação necessária; coesão e coerência organizam as ideias; impessoalidade preserva o caráter institucional; formalidade usa padrão culto e tratamento respeitoso; padronização mantém estrutura e apresentação consistentes.\n\nEsses atributos não são sinônimos. Um texto pode ser curto e ainda impreciso. Pode ser formal e difícil de entender. Pode mencionar o órgão responsável em primeira pessoa do plural e continuar institucional. A revisão deve perguntar: quem precisa fazer o quê, até quando, com base em qual informação e por qual canal?`,
      },
      {
        heading: '3. Impessoalidade não é uma regra mecânica de terceira pessoa',
        body: `A impessoalidade decorre de a comunicação representar a instituição e tratar de assunto público, sem transformar o documento em manifestação de gosto, emoção ou interesse particular do redator. Ela não significa esconder o responsável nem escrever sempre com “informa-se”, “solicita-se” ou outras construções impessoais.\n\n“Encaminhamos o relatório para análise” pode ser adequado quando o “nós” representa institucionalmente a unidade que assina. “Eu fiquei muito preocupado com o ocorrido” personaliza a mensagem e introduz emoção. Em vez disso, registre o fato e a providência: “A unidade encaminhou o registro para apuração”. Prefira a frase mais clara; a voz passiva não é automaticamente mais oficial.`,
        code: `Menos claro: “Informa-se que será realizada a análise dos documentos.”\nMais direto: “A equipe analisará os documentos até 20 de maio.”\nInstitucional: “Encaminhamos o relatório para manifestação da unidade responsável.”`,
      },
      {
        heading: '4. Formalidade, vocabulário e tom',
        body: `Formalidade exige respeito ao padrão culto, tratamento adequado e ausência de gírias, abreviações de internet e intimidade incompatível com a situação. Não exige palavras raras. Use o termo técnico quando ele for necessário e conhecido pelo público; se puder, explique-o. Estrangeirismo sem necessidade pode ser substituído por palavra portuguesa precisa, mas não se deve trocar termo técnico consagrado por sinônimo impreciso.\n\nEvite elogios, censuras emocionais, ironias, adjetivos ornamentais e fórmulas vazias como “venho por meio deste”. Não retire cortesia: transforme-a em tratamento respeitoso e pedido claro. “Solicito o envio do relatório até 20 de maio” é formal, objetivo e compreensível.`,
      },
      {
        heading: '5. Padrão ofício e partes da comunicação',
        body: `Na 3ª edição do MRPR, os expedientes aviso, ofício e memorando foram unificados no padrão ofício, com padronização de forma. Assim, não memorize “memorando” como categoria geral do modelo federal atual sem considerar a norma e o contexto indicados. Órgãos podem conservar nomenclaturas internas próprias.\n\nUm documento no padrão ofício pode conter cabeçalho institucional; identificação do expediente e número; local e data; endereçamento; assunto; vocativo; texto; fecho; identificação do signatário. Cada parte tem função. O assunto antecipa o tema; o endereçamento identifica destinatário; o vocativo inicia a interlocução; o corpo apresenta a mensagem. Formatação e presença de elementos devem seguir o modelo oficial aplicável.`,
      },
      {
        heading: '6. Vocativo, endereçamento e tratamento',
        body: `Vocativo é a forma de chamar o destinatário no início do texto: “Senhor Diretor,” ou “Senhora Ministra,”, conforme cargo e tratamento. Não se deve acumular títulos e adjetivos como “Excelentíssimo e Ilustríssimo Senhor Doutor Diretor” sem previsão ou necessidade. O endereçamento e o tratamento pronominal obedecem às convenções do manual e à posição do destinatário.\n\nNão confunda vocativo com endereçamento: “Ao Senhor João da Silva, Diretor...” identifica o destinatário; “Senhor Diretor,” é o vocativo do corpo. Para autoridades com pronome de tratamento específico, confirme a regra aplicável. Em prova, avalie cargo, pronome, gênero, concordância e norma de referência, em vez de escolher a forma mais cerimoniosa por parecer mais respeitosa.`,
      },
      {
        heading: '7. Corpo do texto: motivo, informação e providência',
        body: `Organize o corpo para que o leitor encontre rapidamente o motivo da comunicação e a ação necessária. Uma estrutura útil é: apresentar o assunto ou referência; explicar dados e fundamentos essenciais; concluir com pedido, resposta, encaminhamento ou próximo passo. A ordem pode variar conforme a finalidade, desde que a lógica fique explícita.\n\nInclua datas, prazos, números de processo, responsáveis, anexos e condições quando forem necessários para agir. Evite parágrafos longos com várias solicitações diferentes. Numere parágrafos apenas conforme o modelo adotado ou quando isso facilitar referências; não transforme uma preferência de formatação em regra universal.`,
      },
      {
        heading: '8. Fechos e identificação do signatário',
        body: `O MRPR padroniza dois fechos para comunicações oficiais: “Respeitosamente,” para autoridade de hierarquia superior à do remetente; “Atenciosamente,” para autoridades de mesma hierarquia, de hierarquia inferior e demais casos. A escolha se relaciona à hierarquia, não simplesmente a o documento ser externo. “Cordialmente” pode aparecer em outras práticas, mas não integra esse par padronizado pelo MRPR.\n\nApós o fecho, identifique quem assina conforme o modelo: nome e cargo/função, além de outros elementos exigidos pelo órgão ou sistema. Não invente assinatura ou autoridade. A forma de assinatura eletrônica pode ser regulada por norma institucional.`,
      },
      {
        heading: '9. Exemplo resolvido de padrão ofício',
        body: `Observe a sequência: identificação do órgão e documento; destinatário; assunto; vocativo; referência e informação principal; providência; fecho e signatário. O exemplo é didático e simplificado — campos e diagramação devem ser ajustados ao manual e ao sistema do órgão.`,
        code: `SECRETARIA DE EDUCAÇÃO\n\nOFÍCIO Nº 123/2026/SEB\nGoiânia, 10 de outubro de 2026.\n\nAo Senhor\nJoão da Silva\nDiretor da Escola Municipal Modelo\n\nAssunto: Previsão de repasse para manutenção escolar\n\nSenhor Diretor,\n\n1. Em resposta ao Ofício nº 45/2026, informamos que o repasse destinado à manutenção escolar está previsto para novembro de 2026.\n\n2. O valor será creditado na conta cadastrada pela unidade. Solicitamos que eventuais divergências nos dados bancários sejam comunicadas até 20 de outubro.\n\nAtenciosamente,\n\nMaria Souza\nSecretária de Educação Básica`,
      },
      {
        heading: '10. Revisão: erros comuns e como corrigir',
        body: `• “Venho por meio deste solicitar” pode virar “Solicito”; elimine fórmula vazia, não informação necessária.\n• “Lamentamos profundamente” introduz emoção; registre fato, impacto e providência.\n• “O mais breve possível” é vago; indique prazo quando houver.\n• “Informamos” não é automaticamente inadequado: avalie se o plural representa a instituição e se a frase é clara.\n• “Excelentíssimo/Ilustríssimo” não deve ser acrescentado por excesso de cerimônia; siga a forma prevista.\n• “Memorando” não é a categoria geral do padrão ofício do MRPR, embora regras internas possam usar nomenclatura própria.\n• “Respeitosamente” e “Atenciosamente” são escolhidos conforme hierarquia, não conforme externo/interno.\n• Concisão não autoriza omitir fundamento, prazo, destinatário ou providência indispensável.`,
      },
      {
        heading: '11. Como a banca costuma cobrar',
        body: `A questão pode pedir a identificação de atributo, a reescrita de trecho, a adequação do vocativo ou fecho, o reconhecimento de partes do padrão ofício ou a detecção de excesso, subjetividade e ambiguidade. Leia o enunciado para saber qual manual ou órgão está em foco.\n\nNa reescrita, preserve o conteúdo: agente, ação, objeto, prazo, condição, negação e relação entre ideias. Uma frase pode ficar mais curta e mudar o sentido se retirar “até”, “somente”, “salvo” ou o responsável pela ação. Ao julgar vocativo e fecho, não use “parece mais formal” como justificativa: compare com a regra específica.`,
      },
      {
        heading: '12. Treino comentado e recuperação ativa',
        body: `1) “Informamos que o processo foi encaminhado” é necessariamente pessoal e proibido? Não. O plural pode representar a unidade institucional; o contexto e a clareza decidem.\n\n2) “Respeitosamente” deve ser usado sempre que o destinatário for externo? Não. No MRPR, a distinção é hierárquica: superior recebe “Respeitosamente”; mesma hierarquia, inferior e demais casos recebem “Atenciosamente”.\n\n3) A 3ª edição do MRPR mantém aviso, ofício e memorando como três expedientes distintos? Não. Eles foram unificados no padrão ofício.\n\n4) “Solicito o relatório até 20 de maio” é informal por usar verbo direto? Não. A frase pode ser formal, objetiva e adequada.\n\nFeche a aula e explique: (a) por que impessoalidade não é sinônimo de terceira pessoa; (b) quais partes compõem um ofício; (c) como escolher o fecho; (d) por que concisão não é simplesmente cortar palavras; (e) qual norma deve ser consultada para uma comunicação do TCE-GO.`,
      },
    ],
    example: 'Revisão de frase: “Venho por meio deste solicitar, se possível, o envio do relatório o mais breve possível.” Versão mais clara: “Solicito o envio do relatório até 20 de maio.” A reescrita elimina fórmulas vagas, explicita o pedido e define prazo; só deve ser usada quando esse prazo corresponder à necessidade real.',
    references: [
      { label: 'Manual de Redação da Presidência da República — página oficial de consulta', url: 'https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica' },
      { label: 'Portaria nº 1.369/2018 — aprova a 3ª edição do Manual', url: 'https://www.planalto.gov.br/ccivil_03/portaria/prt1369-18.htm' },
    ],
    quickQuestions: [{
      id: `${id}-q1`,
      prompt: 'No padrão do Manual de Redação da Presidência da República, o fecho “Respeitosamente” é escolhido porque o destinatário é externo ao órgão, independentemente de hierarquia.',
      source: 'Questão autoral para treino',
      correctAnswer: 'errado',
      explanation: 'A distinção dos fechos padronizados considera a hierarquia: “Respeitosamente” para autoridade superior; “Atenciosamente” para mesma hierarquia, inferior e demais casos.',
    }],
  },
};
