import { TopicItem } from '../types';
import { FOUNDATIONAL_CONTENT } from './studyContentFoundations';
import { INSTITUTIONAL_LAW_CONTENT } from './studyContentLaw';
import { ENGINEERING_CONTENT } from './studyContentEngineering';
import { DEVOPS_DATABASE_CONTENT, INFRASTRUCTURE_CONTENT } from './studyContentInfrastructure';
import { AI_GOV_ENGLISH_CONTENT } from './studyContentDataGov';
import { IT_LEGISLATION_CONTENT } from './studyContentLegislationIT';
import { OFFICIAL_WRITING_CONTENT } from './studyContentRedacao';
import { ORTOGRAFIA_CONTENT } from './studyContentOrtografia';
import { CRASE_CONTENT } from './studyContentCrase';
import { PORTUGUES_BLOCO1_CONTENT } from './studyContentPortuguesBloco1';
import { PORTUGUES_BLOCO2_CONTENT } from './studyContentPortuguesBloco2';
import { MATEMATICA_RL_COMPLETO_CONTENT } from './studyContentMatematicaCompleto';
import { MARKDOWN_LESSON_CONTENT } from './studyMarkdownContent';
import { SYLLABUS } from './syllabus';

type Lesson = Pick<TopicItem, 'summary' | 'markdownContent' | 'lessonSections' | 'example' | 'references' | 'quickQuestions'>;

// Material autoral de revisão; conteúdo curricular atualizado fica nos módulos especializados.
// As referências apontam para fontes primárias;
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

const agenticClassroom: Record<string, Array<{ heading: string; body: string }>> = {
  'ia-agentiva-0': [
    { heading: 'Como ler a saída de um LLM', body: 'Um LLM estima próximos tokens condicionados ao contexto; a geração é sensível à instrução, aos dados e à configuração. O texto pode soar seguro mesmo incorreto. Use fonte oficial, teste ou cálculo independente conforme o tipo de afirmação.' },
    { heading: 'Exemplo de uso com controle', body: 'Ao pedir teste de cálculo, forneça assinatura, regra, limites e resultado esperado. Execute-o e confirme que falha quando a regra é violada. Não compartilhe tokens, código proprietário ou dados de cidadão sem autorização.' },
  ],
  'ia-agentiva-1': [
    { heading: 'Especificar intenção de forma verificável', body: 'Converta o pedido em objetivo, usuário, entrada, saída, restrição, critério de aceite e casos de erro. Exemplos reduzem interpretação divergente; invariantes esclarecem o que não pode mudar. Registre suposições para revisão.' },
    { heading: 'Do rascunho ao aceite', body: 'Peça plano antes da implementação, revise arquivos afetados e execute critérios de aceite e regressão. Compare a solução com arquitetura e segurança: compilar não prova que o código implementa a regra correta.' },
  ],
  'ia-agentiva-2': [
    { heading: 'Montar contexto útil', body: 'Inclua tarefa, contexto de negócio, trechos de fonte, formato e critério de avaliação. Remova redundância e dados sensíveis. Se fontes conflitarem ou estiverem incompletas, peça que a ferramenta indique a lacuna em vez de supor.' },
    { heading: 'Testar a instrução', body: 'Avalie prompts com casos típicos, limites e adversos. Registre modelo, prompt e documentos; compare precisão, completude, consistência, custo e abstenção. Mudança pequena pode alterar resultados.' },
  ],
  'ia-agentiva-3': [
    { heading: 'Escolher integração e permissões', body: 'IDE pode acessar arquivo aberto, seleção e instruções do projeto; CLI pode ler, editar e chamar comandos. Confira diretório, rede, segredos, confirmação e registro de ações antes de habilitar autonomia.' },
    { heading: 'Revisar a alteração', body: 'Peça mudança pequena, leia diff, confirme arquivos tocados, rode verificações e veja se não houve edição de segredo ou configuração. Limite comandos destrutivos, deploy e escrita fora do workspace.' },
  ],
  'ia-agentiva-4': [
    { heading: 'Ciclo e condição de parada', body: 'Agente pode decompor objetivo, selecionar ferramenta, observar retorno, atualizar plano e repetir. Defina orçamento, número máximo de passos, escopo, política de erro e condição de conclusão para evitar loops.' },
    { heading: 'Autonomia proporcional ao impacto', body: 'Leitura e rascunho podem ter supervisão menor; escrita persistente exige revisão; publicação, pagamento ou exclusão podem exigir confirmação explícita. Registre chamadas e resultados.' },
  ],
  'ia-agentiva-5': [
    { heading: 'Confinar ações no ambiente', body: 'Use workspace isolado, caminhos normalizados, permissões mínimas, limites de tempo e rede restrita. Valide cada parâmetro; uma instrução ao modelo não substitui os controles do sistema operacional.' },
    { heading: 'Executar comando com segurança', body: 'Leia conteúdo, origem e caminhos de script antes de executá-lo. Prefira sandbox sem credenciais de produção; para remoção, mostre alvos e peça aprovação. Registre ações sem expor tokens.' },
  ],
  'ia-agentiva-6': [
    { heading: 'Fechar o ciclo com evidência', body: 'Falha de teste só é feedback útil se o teste representa o requisito. O agente pode propor ajuste, mas deve repetir verificação independente sem alterar o teste para fazê-lo passar artificialmente.' },
    { heading: 'Autocorreção sem regressão', body: 'Após corrigir, rode testes relevantes, regressão, análise e revisão do diff. Limite tentativas; se o modelo modificar requisito ou desativar teste, interrompa e examine a causa.' },
  ],
  'ia-agentiva-7': [
    { heading: 'A tarefa determina a evidência', body: 'Geração deve ser comparada com requisitos; revisão precisa apontar trecho e risco; documentação deve refletir a versão real; depuração precisa de log e reprodução. Separe fatos observados de hipóteses.' },
    { heading: 'Exemplo de diagnóstico', body: 'Para HTTP 500, forneça rota, log sanitizado e mudança recente. Ordene hipóteses por evidência, reproduza e teste uma causa por vez. Confirme que a correção não enfraquece autorização.' },
  ],
  'ia-agentiva-8': [
    { heading: 'Pipeline RAG e memória', body: 'Ingestão registra fonte e versão; segmentação divide conteúdo; embedding representa segmentos; índice recupera candidatos; filtros aplicam metadados e permissões; modelo sintetiza. Memória de conversa tem finalidade e retenção próprias.' },
    { heading: 'Avaliar recuperação e resposta', body: 'Meça se trechos corretos são recuperados e se sustentam a resposta. Remova fontes revogadas, teste consultas ambíguas e não revele documento que o usuário não poderia acessar.' },
  ],
  'ia-agentiva-9': [
    { heading: 'Primitivas MCP', body: 'Host contém a aplicação; cliente mantém comunicação; servidor oferece capacidades. Resources fornecem contexto, tools executam operações e prompts oferecem modelos de interação. Recursos disponíveis dependem da implementação e da versão.' },
    { heading: 'Conexão segura', body: 'Confira origem, identidade e permissões; limite ferramentas, valide entrada e saída e proteja tokens. Para escrita, mostre o efeito esperado e peça confirmação conforme política e impacto.' },
  ],
  'ia-agentiva-10': [
    { heading: 'Contrato da ferramenta', body: 'Defina finalidade, parâmetros tipados, validação, erros, limites e efeitos. Ferramenta de escrita deve verificar identidade e autorização e devolver confirmação rastreável.' },
    { heading: 'Skill e fluxo especializado', body: 'Skill orienta procedimento; ferramenta executa operação. Divida etapas, identifique dados confiáveis, registre fontes e defina resposta a falhas. Versione instruções com dono, escopo e revisão.' },
  ],
  'ia-agentiva-11': [
    { heading: 'Avaliação representativa', body: 'Inclua casos típicos, raros, limites, adversariais e sem resposta possível. Defina referência, métrica, limiar e custo de erro. Avalie recuperação, geração, segurança, latência e abstenção.' },
    { heading: 'Validar questão e gabarito', body: 'Confira enunciado, resposta e explicação em fonte técnica ou normativa. Procure ambiguidade, exceção omitida e versão desatualizada. Fluência ou consenso entre modelos não substitui evidência primária.' },
  ],
  'ia-agentiva-12': [
    { heading: 'Dados e propriedade intelectual', body: 'Identifique dados pessoais, segredos, código e licenças antes do envio. Minimize informação; confirme finalidade, base legal, retenção, compartilhamento e contrato. Revise proveniência e licença da saída.' },
    { heading: 'Governança e responsabilidade', body: 'Defina quem valida, responde a incidente, recebe contestação e toma a decisão final. Avalie viés, segurança, explicabilidade e impacto. Registre decisões sem expor informação protegida.' },
  ],
};

const expandedAgenticContent: Record<string, Lesson> = Object.fromEntries(
  Object.entries(agenticContent).map(([id, lesson]) => [id, {
    ...lesson,
    lessonSections: [...(lesson.lessonSections ?? []), ...(agenticClassroom[id] ?? [])],
  }]),
);

const rawStudyContent: Record<string, Lesson> = {
  ...expandedAgenticContent,
  ...FOUNDATIONAL_CONTENT,
  ...INSTITUTIONAL_LAW_CONTENT,
  ...ENGINEERING_CONTENT,
  ...DEVOPS_DATABASE_CONTENT,
  ...INFRASTRUCTURE_CONTENT,
  ...AI_GOV_ENGLISH_CONTENT,
  ...IT_LEGISLATION_CONTENT,
  ...OFFICIAL_WRITING_CONTENT,
  ...ORTOGRAFIA_CONTENT,
  ...CRASE_CONTENT,
  ...PORTUGUES_BLOCO1_CONTENT,
  ...PORTUGUES_BLOCO2_CONTENT,
  ...MATEMATICA_RL_COMPLETO_CONTENT,
};

const methodBySubject: Record<string, string> = {
  portugues: 'Leia o enunciado inteiro antes de classificar a regra. Localize o termo ou trecho decisivo, observe a relação sintática e confirme o efeito de sentido no contexto. Ao avaliar uma reescrita, compare quem pratica a ação, o que é afirmado, a negação, o tempo e a relação entre as ideias.',
  'matematica-rl': 'Traduza o enunciado para símbolos, variáveis, tabela ou diagrama antes de calcular. Identifique o que é conhecido e o que se pede; escolha a regra a partir da relação descrita, não de palavras isoladas. Ao final, substitua o resultado no problema e verifique sinal, unidade, ordem e plausibilidade.',
  'legislacao-institucional': 'Leia a norma vigente e identifique o sujeito, a competência, a hipótese de aplicação, o verbo que indica obrigação ou faculdade, os prazos, as exceções e os efeitos. Diferencie regra geral de regra específica e confira a redação consolidada antes de memorizar um número ou atribuição.',
  'legislacao-ti': 'Na norma, marque quem é responsável, qual dado ou atividade está abrangido, em que condição a regra se aplica, quais direitos ou deveres surgem e que exceções existem. Diferencie conceitos próximos e consulte o texto oficial atualizado; não conclua uma obrigação apenas pelo nome do princípio.',
  'engenharia-software': 'Identifique o problema que a prática resolve, seus participantes e o artefato ou resultado esperado. Depois examine sequência, critérios de qualidade, limites e dependências. Em questões, separe a definição do conceito de seus benefícios possíveis: um benefício não é garantia automática.',
  'desenvolvimento-sistemas': 'Rastreie dados e controle: quais são as entradas, quais transformações ocorrem, que estado muda e qual saída é esperada? Compare a implementação com o contrato e teste também valores-limite, erros e permissões. Em código, não confunda sintaxe válida com comportamento correto.',
  'ia-agentiva': 'Separe capacidade do modelo, contexto fornecido, ferramenta disponível e controle imposto pela aplicação. Siga o fluxo desde o objetivo até a ação e o resultado; identifique onde podem surgir erro, dado não confiável ou efeito externo. Avalie a saída com evidência independente e limite permissões.',
  devops: 'Siga o fluxo de mudança desde o commit até a entrega: quais etapas são automatizadas, quais verificações bloqueiam avanço e como se detecta falha? Diferencie ferramenta, prática e resultado operacional. Verifique segurança, rastreabilidade, reversão e responsabilidades de cada ambiente.',
  'banco-dados': 'Comece pela estrutura e pelas regras dos dados; acompanhe como a operação lê ou altera registros e quais garantias são necessárias. Analise cardinalidade, chaves, restrições, concorrência e custo da consulta conforme o assunto. Em exemplos SQL, observe a ordem lógica e o efeito sobre os dados.',
  'ia-dados': 'Distinga dado de entrada, representação, método aplicado, resultado e critério de avaliação. Pergunte qual problema a técnica resolve, quais pressupostos faz, como pode falhar e que evidência sustenta a conclusão. Não trate correlação, similaridade ou geração plausível como prova de causalidade ou verdade.',
  seguranca: 'Parta do ativo e da ameaça, identifique a vulnerabilidade ou condição de risco e relacione o controle ao objetivo protegido. Diferencie prevenção, detecção, resposta e recuperação. Ao avaliar uma solução, verifique cobertura, privilégio, configuração, evidência de funcionamento e risco residual.',
  'so-redes-nuvem': 'Desenhe origem, destino, camadas e dependências da comunicação ou do serviço. Identifique protocolo, componente responsável e ponto de falha. Diferencie o que o sistema operacional, a rede, a aplicação e o provedor de nuvem administram; depois avalie segurança e disponibilidade ponta a ponta.',
  'governanca-ti': 'Separe governança (direcionar e monitorar) de gestão (planejar e executar) e identifique o nível decisório, os responsáveis, os objetivos e as evidências de resultado. Relacione cada processo ou framework ao problema que trata, sem presumir que nomes semelhantes indiquem o mesmo escopo.',
  ingles: 'Leia primeiro o título e o contexto para prever o tema; depois localize a informação pedida no texto. Use conectivos, pronomes e palavras de contraste para entender relações. Confirme o sentido de um termo pelo contexto e evite traduzir cada palavra isoladamente quando isso quebrar a ideia.',
};

const deepenLesson = ([id, lesson]: [string, Lesson]): [string, Lesson] => {
  // A aula de POO foi escrita seção por seção como modelo completo.
  if (id === 'desenvolvimento-sistemas-1' || (lesson.lessonSections?.length ?? 0) >= 4) return [id, lesson];

  const subjectId = id.slice(0, id.lastIndexOf('-'));
  const topicIndex = Number(id.slice(id.lastIndexOf('-') + 1));
  const topicTitle = SYLLABUS.find((subject) => subject.id === subjectId)?.topics[topicIndex] ?? subjectId.replaceAll('-', ' ');
  const studyMethod = methodBySubject[subjectId] ?? 'Defina o conceito com precisão, identifique seus elementos e acompanhe como eles se relacionam no cenário apresentado. Compare a situação com o exemplo, verifique condições e limites e justifique cada conclusão com uma regra ou evidência do próprio assunto.';
  const exampleWalkthrough = lesson.example
    ? `Use o exemplo prático desta aula como um problema resolvido. Primeiro, destaque os dados e a pergunta. Em seguida, localize a regra ou conceito que se aplica e explique cada passagem até o resultado. Por fim, altere uma condição do cenário e pergunte se a conclusão continuaria válida; essa variação ajuda a distinguir compreensão de memorização.`
    : `Construa um exemplo simples para o assunto: declare o cenário, aplique a regra passo a passo e explique o resultado. Depois altere uma condição e veja o que muda. Esse teste revela limites e pressupostos que uma definição decorada pode esconder.`;
  const questionPrompt = lesson.quickQuestions?.[0]?.prompt;
  const questionPractice = questionPrompt
    ? `Antes de responder à questão de treino abaixo, diga qual regra ou distinção ela está testando e formule uma justificativa sem consultar o gabarito. Afirmação: “${questionPrompt}” Depois de responder, compare seu fundamento com a explicação e identifique a palavra ou condição decisiva.`
    : `Crie uma afirmação sobre o assunto e decida se ela é correta. Justifique com uma condição, regra ou evidência; em seguida, transforme a afirmação em incorreta mudando apenas um elemento. Isso treina a identificação de limites e exceções.`;
  const recallPractice = `Feche o material e explique em voz alta: (1) o que significa “${topicTitle}”; (2) como você aplicaria esse conceito em um caso concreto; (3) qual condição, exceção ou risco faria você rever a solução. Reabra a aula apenas para corrigir os pontos que não conseguiu explicar.`;

  const additions = [
    { heading: 'Roteiro de raciocínio', body: studyMethod },
    { heading: 'Como destrinchar o exemplo', body: exampleWalkthrough },
    { heading: 'Prática de questão', body: questionPractice },
    { heading: 'Revisão ativa', body: recallPractice },
  ];
  return [id, { ...lesson, lessonSections: [...(lesson.lessonSections ?? []), ...additions] }];
};

export const STUDY_CONTENT: Record<string, Lesson> = Object.fromEntries(
  Object.entries(rawStudyContent).map(([id, lesson]) => {
    const [lessonId, deepenedLesson] = deepenLesson([id, lesson]);
    return [lessonId, { ...deepenedLesson, markdownContent: MARKDOWN_LESSON_CONTENT[id] }];
  }),
);

export const STUDY_CONTENT_COUNT = Object.keys(STUDY_CONTENT).length;
