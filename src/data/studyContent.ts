import { TopicItem } from '../types';
import { FOUNDATIONAL_CONTENT } from './studyContentFoundations';
import { INSTITUTIONAL_LAW_CONTENT } from './studyContentLaw';
import { ENGINEERING_CONTENT } from './studyContentEngineering';
import { DEVOPS_DATABASE_CONTENT, INFRASTRUCTURE_CONTENT } from './studyContentInfrastructure';
import { AI_GOV_ENGLISH_CONTENT } from './studyContentDataGov';
import { IT_LEGISLATION_CONTENT } from './studyContentLegislationIT';

type Lesson = Pick<TopicItem, 'summary' | 'lessonSections' | 'example' | 'references' | 'quickQuestions'>;

// Material autoral de revisão. As referências apontam para fontes primárias;
// questões são inéditas para treino e não representam itens oficiais da FCC.
const agenticContent: Record<string, Lesson> = {
  'ia-agentiva-0': {
    summary: 'IA aplicada ao desenvolvimento usa modelos para apoiar tarefas de análise, escrita e manutenção de software. Um LLM é um modelo treinado para prever sequências de tokens; ele produz respostas plausíveis, mas pode errar fatos, código e referências.',
    lessonSections: [
      { heading: 'Modelo de linguagem e contexto', body: 'O modelo recebe instruções e contexto em uma janela limitada e calcula uma continuação provável. O conhecimento incorporado no treinamento não equivale a uma base consultável e atualizada. Por isso, para assuntos normativos ou APIs, é preciso fornecer fontes e conferir a resposta.' },
      { heading: 'Onde ajuda no ciclo de software', body: 'Pode explicar código, sugerir testes, resumir documentação, gerar rascunhos e ajudar a localizar defeitos. A pessoa desenvolvedora continua responsável por requisitos, revisão, segurança, licenças e comportamento em produção.' },
      { heading: 'Limites e controles', body: 'Avalie a saída com testes e revisão humana. Não envie segredos ou dados pessoais sem autorização. Trate código gerado como código de terceiro: verifique dependências, licenças, vulnerabilidades e aderência à arquitetura.' },
    ],
    example: 'Ao pedir um teste para uma função de cálculo, forneça assinatura, regras de negócio e casos-limite; execute o teste e inspecione se ele realmente falha quando a regra é violada.',
    references: [{ label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }],
    quickQuestions: [{ id: 'ia0-q1', prompt: 'Uma resposta fluente de um LLM comprova que o conteúdo técnico está correto.', source: 'Questão inédita para treino', correctAnswer: 'errado', explanation: 'Fluência não garante veracidade; saídas precisam de validação e, quando aplicável, fontes verificáveis.' }],
  },
  'ia-agentiva-1': {
    summary: 'Programação baseada em intenção descreve o resultado desejado em linguagem natural ou especificações de alto nível, e usa ferramentas para propor ou produzir uma implementação. Ela muda a forma de expressar o trabalho, mas não elimina a necessidade de requisitos precisos e validação.',
    lessonSections: [
      { heading: 'Do pedido à implementação', body: 'Um pedido útil define objetivo, entradas, saídas, restrições, critérios de aceite e exemplos. A ferramenta pode decompor o pedido, alterar arquivos e executar comandos; cada etapa deve ser revisável.' },
      { heading: 'Ambiguidade e especificação', body: 'Pedidos vagos deixam decisões importantes implícitas. Exemplos de entrada e saída, invariantes e casos negativos reduzem interpretações diferentes e tornam os resultados testáveis.' },
      { heading: 'Responsabilidade técnica', body: 'A implementação ainda deve ser avaliada contra arquitetura, segurança, acessibilidade, desempenho e licenças. Uma solução que compila pode estar funcionalmente errada.' },
    ],
    example: 'Em vez de “crie login”, especifique autenticação, política de sessão, recuperação de conta, mensagens de erro, proteção contra tentativas abusivas e testes de autorização.',
    references: [{ label: 'NIST AI RMF — ciclo de gestão de riscos', url: 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/' }],
    quickQuestions: [{ id: 'ia1-q1', prompt: 'Quanto mais detalhados os critérios de aceite e exemplos, menor tende a ser a ambiguidade da implementação assistida por IA.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'Critérios explícitos ajudam a orientar a geração e oferecem condições verificáveis para avaliar a saída.' }],
  },
  'ia-agentiva-2': {
    summary: 'Engenharia de contexto seleciona e organiza as informações relevantes que acompanham uma solicitação ao modelo. Engenharia de prompts formula instruções para orientar a tarefa; nenhuma das duas torna o modelo infalível.',
    lessonSections: [
      { heading: 'Instruções eficazes', body: 'Declare tarefa, público, formato esperado e limites. Inclua exemplos quando o padrão for difícil de descrever. Separe instruções de dados não confiáveis e diga como lidar com informação ausente.' },
      { heading: 'Contexto relevante', body: 'Inclua apenas arquivos, requisitos e referências necessários. Contexto excessivo aumenta custo e pode distrair; contexto incompleto leva a respostas baseadas em suposições.' },
      { heading: 'Avaliação', body: 'Teste o prompt com exemplos representativos e adversos. Compare a resposta com critérios definidos e preserve fontes para fatos verificáveis.' },
    ],
    example: 'Para resumir um edital, peça uma tabela com item, disciplina e subitem; determine que o modelo não acrescente conteúdo ausente e exija a indicação da página de origem.',
    references: [{ label: 'NIST Generative AI Profile', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf' }],
    quickQuestions: [{ id: 'ia2-q1', prompt: 'Engenharia de prompt elimina alucinações quando a instrução é suficientemente detalhada.', source: 'Questão inédita para treino', correctAnswer: 'errado', explanation: 'Instruções podem reduzir ambiguidades, mas não garantem correção factual nem removem riscos do modelo.' }],
  },
  'ia-agentiva-3': {
    summary: 'Assistentes de codificação podem operar no editor ou em linha de comando. A integração determina que contexto a ferramenta enxerga e quais ações pode executar; por isso, permissões e revisão são parte do desenho seguro.',
    lessonSections: [
      { heading: 'Contexto de IDE', body: 'O assistente pode usar arquivo aberto, seleção, símbolos do projeto e instruções locais. O contexto disponível varia por produto e configuração; não se deve presumir que ele conhece todo o repositório.' },
      { heading: 'Contexto de CLI', body: 'Uma ferramenta de terminal pode inspecionar arquivos, editar código e iniciar comandos. O alcance depende do diretório, permissões do processo, confirmação de ações e controles do ambiente.' },
      { heading: 'Uso responsável', body: 'Revise diffs antes de aceitar, evite credenciais no contexto e limite acesso a diretórios e comandos necessários. Em repositórios sensíveis, use ambientes isolados.' },
    ],
    example: 'Peça primeiro um plano de alterações; depois permita mudanças apenas nos arquivos pertinentes e revise o diff antes de executar migrações ou comandos destrutivos.',
    references: [{ label: 'OWASP Top 10:2025', url: 'https://top10.owasp.org/2025/pt-BR/' }],
    quickQuestions: [{ id: 'ia3-q1', prompt: 'Um assistente de código em CLI deve receber apenas as permissões necessárias para a tarefa.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'O princípio do menor privilégio limita o impacto de erros, instruções maliciosas ou ações inesperadas.' }],
  },
  'ia-agentiva-4': {
    summary: 'Um agente combina um modelo com estado, ferramentas e um ciclo de decisão. Em termos gerais, recebe um objetivo, observa contexto, escolhe uma ação, recebe o resultado e decide se continua ou conclui.',
    lessonSections: [
      { heading: 'Ciclo de execução', body: 'Um fluxo agentivo pode planejar subtarefas, selecionar ferramentas, observar resultados e ajustar o plano. A autonomia pode variar de uma única chamada assistida até vários passos encadeados.' },
      { heading: 'Agente versus automação fixa', body: 'Uma automação tradicional segue regras previamente definidas. Um agente pode escolher ações a partir da saída do modelo, o que oferece flexibilidade e também introduz comportamento menos previsível.' },
      { heading: 'Limites', body: 'Defina escopo, orçamento, número máximo de passos, ferramentas permitidas e condições de parada. Para ações de alto impacto, exija confirmação humana.' },
    ],
    example: 'Um agente que investiga falha de build pode ler logs e sugerir correção; a publicação em produção deve continuar condicionada a testes, revisão e autorização.',
    references: [{ label: 'OWASP GenAI — Excessive Agency', url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/' }],
    quickQuestions: [{ id: 'ia4-q1', prompt: 'Um agente de IA se distingue de uma chamada simples ao modelo por poder operar em ciclos e acionar ferramentas.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'A combinação de decisão iterativa, estado e ferramentas caracteriza fluxos agentivos comuns.' }],
  },
  'ia-agentiva-5': {
    summary: 'Ações em sistema de arquivos e shell dão ao agente capacidade de alterar o ambiente, não apenas produzir texto. Cada ferramenta deve validar entradas, restringir escopo e registrar ações relevantes.',
    lessonSections: [
      { heading: 'Riscos de execução', body: 'Comandos podem sobrescrever dados, acessar segredos, instalar código ou afetar serviços. Uma instrução maliciosa pode aparecer em arquivos ou conteúdo externo e tentar induzir ações indevidas.' },
      { heading: 'Controles', body: 'Use diretórios de trabalho isolados, permissões mínimas, allowlists para comandos quando viável, validação de argumentos, limites de tempo e aprovação antes de operações destrutivas ou externas.' },
      { heading: 'Rastreabilidade', body: 'Registre comando, identidade, horário, arquivos modificados e resultado. Separe execução de teste de execução em produção.' },
    ],
    example: 'Antes de executar um script sugerido pelo modelo, leia o conteúdo, confira caminhos e permissões e rode em ambiente descartável sem tokens de produção.',
    references: [{ label: 'OWASP GenAI — Excessive Agency', url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/' }],
    quickQuestions: [{ id: 'ia5-q1', prompt: 'Como a resposta do modelo pode ser imprevisível, o próprio modelo é um controle suficiente para restringir os comandos que ele pode executar.', source: 'Questão inédita para treino', correctAnswer: 'errado', explanation: 'As restrições devem ser impostas pela aplicação e pelo sistema operacional, não apenas por instruções ao modelo.' }],
  },
  'ia-agentiva-6': {
    summary: 'Autocorreção é um ciclo no qual o sistema usa falhas observadas para tentar outra solução. Isso pode acelerar o diagnóstico, mas repetir tentativas não prova que a causa foi resolvida nem que a correção preservou requisitos.',
    lessonSections: [
      { heading: 'Feedback verificável', body: 'Testes, analisadores estáticos, linters e mensagens de build podem fornecer sinais para uma nova tentativa. A qualidade do ciclo depende da qualidade dos testes e da clareza do erro.' },
      { heading: 'Riscos de regressão', body: 'Uma correção pode satisfazer o teste existente e quebrar outro comportamento. Suítes incompletas, testes frágeis e alteração automática de testes podem mascarar defeitos.' },
      { heading: 'Portões de qualidade', body: 'Mantenha critérios independentes: testes relevantes, revisão de diff, verificação de segurança e aprovação antes de integrar. Limite o número de tentativas para evitar loops e custos descontrolados.' },
    ],
    example: 'Se um teste falha, o agente pode propor ajuste; valide a regra de negócio e rode também os testes de regressão, sem aceitar automaticamente a remoção ou enfraquecimento do teste.',
    references: [{ label: 'NIST AI RMF — medir e gerir riscos', url: 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/' }],
    quickQuestions: [{ id: 'ia6-q1', prompt: 'Um ciclo agentivo que termina com testes aprovados dispensa revisão do código alterado.', source: 'Questão inédita para treino', correctAnswer: 'errado', explanation: 'Testes cobrem apenas comportamentos previstos e não substituem revisão, análise de segurança e avaliação de requisitos.' }],
  },
  'ia-agentiva-7': {
    summary: 'Modelos podem apoiar geração, revisão, documentação e depuração de código. Essas tarefas são diferentes: gerar propõe uma implementação; revisar busca riscos; documentar descreve comportamento; depurar investiga causas a partir de evidências.',
    lessonSections: [
      { heading: 'Geração', body: 'Forneça requisitos e interfaces existentes. Avalie aderência, tratamento de erros, segurança, desempenho e consistência com padrões do projeto.' },
      { heading: 'Revisão e depuração', body: 'Peça análise localizada e evidências, como trecho de código ou log. Sugestões precisam ser reproduzidas e testadas; o modelo pode inventar causas ou ignorar caminhos de execução.' },
      { heading: 'Documentação', body: 'Compare a documentação gerada com o código real. Atualize-a junto à mudança e evite descrever funcionalidades que ainda não foram implementadas.' },
    ],
    example: 'Ao investigar erro HTTP 500, forneça log sanitizado, rota e alteração recente; peça hipóteses ordenadas por evidência e confirme cada uma reproduzindo o problema.',
    references: [{ label: 'NIST Generative AI Profile', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf' }],
    quickQuestions: [{ id: 'ia7-q1', prompt: 'Uma revisão de código feita por IA deve ser tratada como contribuição auxiliar sujeita a validação.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'O resultado pode omitir vulnerabilidades ou apontar problemas inexistentes; a responsabilidade pela decisão permanece com a equipe.' }],
  },
  'ia-agentiva-8': {
    summary: 'RAG (Retrieval-Augmented Generation) recupera trechos de uma base externa e os fornece como contexto ao modelo antes da geração. A técnica pode aproximar a resposta de documentos específicos e facilitar referências, mas não garante que o modelo use corretamente os trechos.',
    lessonSections: [
      { heading: 'Pipeline típico', body: 'Documentos são preparados e divididos em segmentos; uma consulta é convertida em representação de busca; o sistema recupera trechos relevantes e os inclui no prompt; o modelo gera resposta com base no contexto.' },
      { heading: 'Qualidade ponta a ponta', body: 'Erros podem ocorrer na atualização ou segmentação dos documentos, na busca, na ordenação dos resultados e na síntese. Avalie recuperação e resposta separadamente e mantenha metadados de origem.' },
      { heading: 'Bancos vetoriais', body: 'Embeddings representam conteúdo como vetores para comparar proximidade semântica. Similaridade não significa equivalência factual; filtros por fonte, data, assunto e permissão continuam importantes.' },
    ],
    example: 'Para responder sobre uma resolução, indexe o texto oficial com número e data, recupere os artigos pertinentes e exija que a resposta cite o trecho usado e indique quando não encontrou base suficiente.',
    references: [{ label: 'Lewis et al., Retrieval-Augmented Generation (2020)', url: 'https://arxiv.org/abs/2005.11401' }],
    quickQuestions: [{ id: 'ia-agentiva-8-q1', prompt: 'RAG atualiza os parâmetros do LLM com cada documento recuperado durante a consulta.', source: 'Questão inédita para treino', correctAnswer: 'errado', explanation: 'Na arquitetura usual, os documentos são recuperados e fornecidos como contexto de entrada; isso não é o mesmo que retreinar o modelo.' }],
  },
  'ia-agentiva-9': {
    summary: 'MCP (Model Context Protocol) é um protocolo de interoperabilidade para conectar aplicações de IA a contextos e capacidades externas. Entre as primitivas centrais estão recursos, ferramentas e prompts; a disponibilidade concreta depende das implementações conectadas.',
    lessonSections: [
      { heading: 'Papéis e primitivas', body: 'Em termos gerais, um host contém a aplicação de IA, um cliente mantém a conexão e um servidor MCP oferece capacidades. Recursos fornecem contexto; ferramentas executam operações; prompts oferecem modelos de interação.' },
      { heading: 'Interoperabilidade', body: 'Um protocolo comum reduz integrações específicas para cada par de produtos. Não significa que qualquer servidor seja automaticamente confiável, seguro ou compatível com todas as capacidades.' },
      { heading: 'Segurança', body: 'Autentique e autorize acessos, aplique mínimo privilégio, valide resultados de ferramentas e proteja credenciais. A confirmação do usuário é apropriada para ações sensíveis ou irreversíveis.' },
    ],
    example: 'Um servidor pode expor busca somente leitura em documentos do projeto; ele não precisa receber permissão para apagar arquivos ou consultar repositórios alheios.',
    references: [{ label: 'Especificação MCP — revisão 2025-11-25', url: 'https://modelcontextprotocol.io/specification/2025-11-25/server' }],
    quickQuestions: [{ id: 'ia-agentiva-9-q1', prompt: 'No MCP, ferramentas são funções executáveis que podem permitir ações ou consultas, enquanto recursos fornecem contexto.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'A especificação diferencia tools, que executam operações, de resources, que expõem dados ou contexto.' }],
  },
  'ia-agentiva-10': {
    summary: 'Skills e tool use organizam capacidades especializadas que um modelo pode acionar. Uma skill costuma encapsular instruções e procedimentos; uma ferramenta oferece uma operação definida por uma interface. Os nomes e formatos variam entre plataformas.',
    lessonSections: [
      { heading: 'Ferramentas', body: 'Cada ferramenta deve ter propósito claro, parâmetros tipados, validação e resposta previsível. O modelo pode escolher quando chamar, mas a aplicação controla se a chamada é permitida.' },
      { heading: 'Fluxos especializados', body: 'Uma skill pode orientar etapas como consultar documentos, comparar versões ou preparar relatório. Divida tarefas complexas, registre fontes e defina o que fazer quando uma etapa falhar.' },
      { heading: 'Menor privilégio', body: 'Exponha somente capacidades necessárias, limite autonomia e use confirmação para ações que alterem dados ou produzam efeitos externos. Registre chamadas para auditoria.' },
    ],
    example: 'Uma ferramenta de consulta a processos pode aceitar apenas identificador e retornar campos autorizados; não ofereça SQL livre nem acesso genérico ao banco ao agente.',
    references: [{ label: 'OWASP GenAI — Excessive Agency', url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/' }],
    quickQuestions: [{ id: 'ia-agentiva-10-q1', prompt: 'Para reduzir risco, ferramentas oferecidas a agentes devem limitar permissões e funções ao necessário para o caso de uso.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'Reduzir funcionalidade, permissões e autonomia diminui o impacto de saídas inesperadas ou manipuladas.' }],
  },
  'ia-agentiva-11': {
    summary: 'Avaliar IA exige critérios e casos de teste representativos. Alucinação é uma saída apresentada com confiança que não encontra suporte suficiente; validação compara a saída com requisitos, evidências e fontes confiáveis.',
    lessonSections: [
      { heading: 'Avaliação', body: 'Meça acurácia, completude, consistência, segurança, latência e custo conforme o uso. Inclua casos comuns, limites, entradas adversariais e situações em que o sistema deve se abster.' },
      { heading: 'Ground truth e evidência', body: 'Para fatos, compare com fontes autoritativas e preserve referências. Para código, combine testes, análise estática, revisão humana e execução em ambiente controlado.' },
      { heading: 'Monitoramento contínuo', body: 'Mudanças de modelo, dados, prompt e ferramentas podem alterar resultados. Registre versões e acompanhe erros em produção, respeitando privacidade e governança.' },
    ],
    example: 'Em um gerador de questões, revise gabarito e explicação contra material oficial antes de usar a questão para medir desempenho.',
    references: [{ label: 'NIST AI RMF — funções Govern, Map, Measure, Manage', url: 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/' }],
    quickQuestions: [{ id: 'ia-agentiva-11-q1', prompt: 'Uma avaliação robusta de IA deve incluir casos adversos e critérios de abstenção, além de exemplos típicos.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'Testes apenas típicos não mostram como o sistema se comporta em limites, falhas ou entradas manipuladas.' }],
  },
  'ia-agentiva-12': {
    summary: 'O uso de IA em desenvolvimento envolve privacidade, segurança, propriedade intelectual e responsabilidade. A análise depende do dado, da finalidade, do fornecedor, das licenças e das regras aplicáveis ao contexto.',
    lessonSections: [
      { heading: 'Privacidade e proteção de dados', body: 'Minimize dados enviados ao modelo, remova identificadores quando possível e avalie base legal, finalidade, retenção, compartilhamento e transferências. Dados pessoais em prompts podem ser armazenados ou processados por terceiros conforme o serviço contratado.' },
      { heading: 'Propriedade intelectual', body: 'Revise licenças de código e conteúdo de entrada e saída. Não presuma que código gerado está livre de obrigações de licença ou de semelhança com material protegido; documente fontes e revisão.' },
      { heading: 'Governança e ética', body: 'Avalie impacto, vieses, explicabilidade, segurança, prestação de contas e possibilidade de contestação. Em contexto público, registre decisões e responsabilidades conforme as normas institucionais.' },
    ],
    example: 'Antes de enviar logs a um serviço externo, retire tokens, nomes, identificadores e dados de cidadãos; confirme autorização institucional e política de retenção do fornecedor.',
    references: [
      { label: 'Lei Geral de Proteção de Dados — texto oficial', url: 'https://www.gov.br/pt-br/lgpd/lei-no-13-709-18-lei-geral-de-protecao-de-dados-lgpd' },
      { label: 'NIST Generative AI Profile', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf' },
    ],
    quickQuestions: [{ id: 'ia-agentiva-12-q1', prompt: 'Usar dados pessoais em um prompt é uma operação que deve ser avaliada sob as regras de proteção de dados e as políticas aplicáveis.', source: 'Questão inédita para treino', correctAnswer: 'certo', explanation: 'O uso de dados em prompts não afasta obrigações de finalidade, necessidade, segurança, transparência e governança.' }],
  },
};

export const STUDY_CONTENT: Record<string, Lesson> = {
  ...agenticContent,
  ...FOUNDATIONAL_CONTENT,
  ...INSTITUTIONAL_LAW_CONTENT,
  ...ENGINEERING_CONTENT,
  ...DEVOPS_DATABASE_CONTENT,
  ...INFRASTRUCTURE_CONTENT,
  ...AI_GOV_ENGLISH_CONTENT,
  ...IT_LEGISLATION_CONTENT,
};

export const STUDY_CONTENT_COUNT = Object.keys(STUDY_CONTENT).length;
