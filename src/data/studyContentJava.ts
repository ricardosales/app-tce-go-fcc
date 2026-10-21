import { TopicItem } from '../types';

type Lesson = Pick<TopicItem, 'summary' | 'lessonSections' | 'example' | 'references' | 'quickQuestions'>;

const id = 'desenvolvimento-sistemas-2';

export const JAVA_CONTENT: Record<string, Lesson> = {
  [id]: {
    summary: 'Java é uma linguagem estaticamente tipada, de propósito geral e fortemente associada à orientação a objetos. O código-fonte é compilado em bytecode, que a Java Virtual Machine (JVM) carrega, verifica e executa. A plataforma inclui tipos, classes, interfaces, exceções, coleções e gerenciamento de memória; conhecer o ciclo de compilação e os contratos da linguagem ajuda a resolver questões e construir programas confiáveis.',
    lessonSections: [
      {
        heading: '1. Do código-fonte ao programa em execução',
        body: `O arquivo .java contém código-fonte. O compilador javac verifica sintaxe e tipos e gera bytecode em arquivos .class. Esse bytecode é executado pela JVM, que carrega as classes, verifica o formato e pode interpretar ou compilar trechos frequentes durante a execução (JIT). Assim, compilação e execução são etapas diferentes: erro de compilação impede produzir o programa válido; exceção de execução aparece depois que a aplicação iniciou.\n\nO bytecode favorece portabilidade entre ambientes que tenham JVM compatível, mas não elimina dependências, diferenças de sistema, configuração ou versões. “Escreva uma vez, execute em qualquer lugar” expressa uma meta da plataforma, não uma garantia absoluta.`,
        code: `javac Programa.java   // gera Programa.class\njava Programa        // inicia a classe na JVM`,
      },
      {
        heading: '2. JVM, JDK e JRE',
        body: `JVM é a máquina virtual que executa bytecode. JDK (Java Development Kit) reúne ferramentas para desenvolver, compilar, depurar e empacotar programas, incluindo o compilador. Em materiais tradicionais, JRE (Java Runtime Environment) designa o ambiente com JVM e bibliotecas necessárias à execução; distribuições modernas podem organizar e empacotar o runtime de outra forma. Em questão, observe a versão e a definição explicitamente adotadas.\n\nA entrada tradicional de uma aplicação é um método main com assinatura reconhecida pela plataforma. A JVM carrega classes conforme necessário, cria estruturas de execução e administra memória de objetos. Isso não significa que arquivos, sockets e conexões sejam liberados corretamente sem ação do programa.`,
        code: `public class Programa {\n    public static void main(String[] args) {\n        System.out.println("Olá, TCE-GO");\n    }\n}`,
      },
      {
        heading: '3. Tipos, variáveis e conversões',
        body: `Java é estaticamente tipada: o compilador conhece o tipo de cada variável e expressão. Tipos primitivos incluem boolean, char e tipos numéricos como int, long, float e double. Variáveis de referência apontam para objetos; null representa ausência de referência e pode levar a NullPointerException se for desreferenciado.\n\nConversão de ampliação geralmente cabe no tipo de destino; conversão de redução pode perder informação e costuma exigir cast explícito. Cast só altera a interpretação/conversão prevista pela linguagem, não valida se o valor faz sentido para o domínio. Dados recebidos de arquivo, rede ou usuário ainda precisam de validação de formato, faixa e autorização. Generics, como List<String>, ajudam a verificar tipos em compilação.`,
        code: `int quantidade = 3;\ndouble total = quantidade * 12.5;\nString nome = "Ana";\nList<String> nomes = new ArrayList<>();`,
      },
      {
        heading: '4. Classes, objetos e encapsulamento',
        body: `Classe declara campos (estado) e métodos (comportamento); objeto é uma instância concreta, com identidade e estado próprios. Construtores inicializam a instância e ajudam a estabelecer invariantes. Modificadores de acesso controlam visibilidade. Encapsular não significa criar getter e setter para cada campo: significa proteger decisões e estado interno por uma interface coerente.\n\nEm uma conta bancária, deixar saldo público permite atribuir um valor negativo sem validação. Uma operação sacar pode verificar valor positivo e saldo suficiente antes de alterar o estado. Quem usa a classe depende do contrato público, enquanto detalhes internos podem mudar. Composição é adequada quando um objeto utiliza outro; herança deve representar uma especialização válida, uma relação “é um”.`,
        code: `class Conta {\n    private BigDecimal saldo = BigDecimal.ZERO;\n\n    public void depositar(BigDecimal valor) {\n        if (valor.signum() <= 0) throw new IllegalArgumentException();\n        saldo = saldo.add(valor);\n    }\n\n    public BigDecimal getSaldo() { return saldo; }\n}`,
      },
      {
        heading: '5. Herança, abstração, interfaces e polimorfismo',
        body: `Herança especializa uma classe e permite sobrescrever comportamento. Deve ser usada quando a subclasse consegue cumprir o contrato da classe-base. Abstração destaca operações relevantes e esconde detalhes desnecessários. Interface declara um contrato que implementações distintas podem cumprir. Polimorfismo permite usar uma referência da abstração e executar o comportamento do tipo concreto em tempo de execução.\n\nSe Email e SMS implementam Notificador, um serviço pode chamar enviar sem conhecer detalhes de cada canal. Essa substituição diminui dependência de classes concretas. Polimorfismo não é sinônimo de herança: interfaces e composição também participam de desenhos polimórficos.`,
        code: `interface Notificador { void enviar(String mensagem); }\nclass Email implements Notificador {\n    public void enviar(String m) { System.out.println("E-mail: " + m); }\n}\nNotificador canal = new Email();\ncanal.enviar("Prazo atualizado"); // método de Email`,
      },
      {
        heading: '6. Sobrecarga e sobrescrita',
        body: `Sobrecarga (overload) declara métodos com o mesmo nome e parâmetros diferentes; o compilador escolhe a assinatura aplicável com base nos argumentos e tipos disponíveis. Sobrescrita (override) redefine em uma subclasse um método herdado, respeitando assinatura e compatibilidade; o despacho dinâmico seleciona a implementação do objeto concreto.\n\nExemplo: calcular(int) e calcular(double) são sobrecargas. Se Analista estende Funcionario e sobrescreve executar(), uma variável Funcionario pode apontar para um Analista e a chamada executar() usa a implementação de Analista. A assinatura escolhida e a implementação executada são decisões diferentes.`,
      },
      {
        heading: '7. Exceções e recursos',
        body: `Exceções representam condições que desviam o fluxo normal. Exceções checked devem ser capturadas ou declaradas; unchecked, como subclasses de RuntimeException, não têm essa obrigação. Capture tipos específicos e apenas quando puder tratar, adicionar contexto ou recuperar. Um catch vazio esconde a falha e dificulta diagnóstico.\n\ntry-with-resources fecha automaticamente recursos que implementam AutoCloseable, mesmo quando ocorre exceção. Use-o para arquivos e conexões. finally é útil para limpeza, mas não substitui o contrato de fechamento de recursos e não é garantia diante de encerramento abrupto da máquina.`,
        code: `try (var reader = Files.newBufferedReader(path)) {\n    return reader.readLine();\n} catch (IOException e) {\n    throw new LeituraException("Falha ao ler arquivo", e);\n}`,
      },
      {
        heading: '8. Coleções: List, Set e Map',
        body: `List representa sequência e permite acesso por posição; Set representa elementos sem duplicidade segundo suas regras de igualdade; Map associa chaves a valores. ArrayList favorece acesso indexado; LinkedList oferece operações nas extremidades, mas não torna toda busca mais rápida. HashMap usa hash e costuma ter custo médio favorável sob boa distribuição, sem prometer ordem geral de iteração.\n\nEscolha a implementação considerando operações frequentes, volume e contrato de ordenação. Para elementos em Set ou chaves de Map, equals e hashCode devem ser consistentes. Alterar depois da inserção campos usados no cálculo pode tornar o objeto difícil de localizar.`,
        code: `Map<String, Integer> tentativas = new HashMap<>();\ntentativas.merge("prova-1", 1, Integer::sum);\nSet<String> assuntos = new HashSet<>();\nassuntos.add("Java");`,
      },
      {
        heading: '9. Generics e invariância',
        body: `Generics parametrizam tipos e detectam incompatibilidades em compilação. List<String> restringe os elementos esperados e evita casts repetidos. A informação genérica é em grande parte apagada em execução (type erasure), então não é possível testar diretamente, por exemplo, se algo é exatamente uma List<String>.\n\nArmadilha: List<Integer> não é List<Number>, embora Integer seja subtipo de Number; coleções genéricas são invariantes. Wildcards permitem flexibilidade. A regra PECS resume Producer Extends, Consumer Super: use ? extends T para ler valores como T; use ? super T para inserir valores T. Considere se a estrutura fornece ou recebe dados antes de escolher.`,
      },
      {
        heading: '10. Igualdade, identidade e String',
        body: `== compara valores primitivos ou, para referências, se apontam para o mesmo objeto. equals pode definir igualdade de conteúdo. Não compare texto com ==: duas Strings podem conter as mesmas letras e ser objetos distintos. Se uma classe redefine equals, mantenha o contrato coerente de hashCode para que Set e Map funcionem corretamente.\n\nString é imutável: uma operação que parece alterar seu conteúdo retorna outra String. Para muitas concatenações em laço, StringBuilder evita objetos intermediários desnecessários. Imutabilidade ajuda a reduzir compartilhamento mutável, mas não torna automaticamente thread-safe todo objeto que contém uma String.`,
        code: `String a = new String("TCE");\nString b = new String("TCE");\nSystem.out.println(a == b);      // false: referências diferentes\nSystem.out.println(a.equals(b)); // true: conteúdo igual`,
      },
      {
        heading: '11. Memória e coleta de lixo',
        body: `A JVM administra memória de objetos e pode coletar objetos que se tornaram inalcançáveis. Isso reduz a necessidade de desalocar manualmente cada objeto, mas não elimina vazamentos lógicos: referências mantidas sem necessidade impedem que o coletor libere os objetos. Heap e pilha são áreas diferentes em uma explicação conceitual usual: objetos ficam na heap e chamadas usam quadros na pilha de execução.\n\nGarbage collector não fecha deterministicamente arquivos, sockets ou conexões. Recursos externos devem ser fechados com try-with-resources ou mecanismos próprios. Em produção, acompanhe pressão de memória, pausas, latência e limites de pools; “tem GC” não significa memória infinita.`,
      },
      {
        heading: '12. Exemplo resolvido: total de pagamentos aprovados',
        body: `O problema é somar somente pagamentos aprovados. Separe dados (id, status, valor) da operação de consulta. Primeiro filter seleciona os aprovados; map extrai valores; reduce agrega os valores sem modificar a lista original. Para dinheiro, use BigDecimal com escala e arredondamento definidos pelo domínio, pois double representa números em ponto flutuante binário e pode produzir erros de precisão decimal.`,
        code: `record Pagamento(String id, boolean aprovado, BigDecimal valor) {}\n\nBigDecimal total = pagamentos.stream()\n    .filter(Pagamento::aprovado)\n    .map(Pagamento::valor)\n    .reduce(BigDecimal.ZERO, BigDecimal::add);\n\n// filter seleciona; map transforma; reduce agrega`,
      },
      {
        heading: '13. Como resolver uma questão de código Java',
        body: `Primeiro pergunte se o trecho compila: confira tipos, visibilidade, assinatura, imports e exceções checked. Depois simule a execução: valores iniciais, chamadas, objeto concreto, mudança de estado, saída e ponto de eventual exceção. Em referência declarada como interface, separe os métodos permitidos pelo tipo declarado da implementação chamada em execução.\n\nPara coleções, verifique nulidade, duplicidade, ordem e igualdade. Para generics, observe invariância e wildcards. Para erros, localize onde são lançados e qual catch os alcança. Uma resposta que parece correta pelo conceito pode falhar por uma condição de compilação ou caso-limite.`,
      },
      {
        heading: '14. Armadilhas frequentes de prova',
        body: `• javac compila fonte; JVM executa bytecode.\n• JDK contém ferramentas de desenvolvimento; JVM é o ambiente de execução do bytecode.\n• Overload muda parâmetros; override redefine método herdado.\n• == compara identidade de referência; equals pode comparar conteúdo.\n• Set/Map baseados em hash dependem de equals/hashCode coerentes.\n• List<Integer> não é List<Number>; generics são invariantes.\n• HashMap não promete ordenação geral.\n• Garbage collector não dispensa fechamento de recursos externos.\n• Java e JavaScript são linguagens diferentes.\n• A compilação bem-sucedida não garante que a lógica produza o resultado correto.`,
      },
      {
        heading: '15. Questões comentadas e revisão ativa',
        body: `1) Uma referência Notificador aponta para um Email; enviar() chama o método sobrescrito de Email? Sim: despacho dinâmico escolhe o comportamento do objeto concreto.\n\n2) Duas Strings têm o mesmo conteúdo; == necessariamente retorna true? Não: == compara referências; equals compara conteúdo.\n\n3) Uma classe redefine equals sem redefinir hashCode e vira chave de HashMap. Está correto? Não: igualdade e hash devem respeitar contrato consistente.\n\n4) List<Integer> pode ser atribuída diretamente a List<Number>? Não: a invariância evita inserir, por essa referência, outro Number que não seja Integer.\n\n5) GC fecha automaticamente conexão de banco ao fim do método? Não: recursos externos precisam de fechamento explícito.\n\nFeche a aula e explique: (a) fonte, bytecode e JVM; (b) overload e override; (c) == e equals; (d) List, Set e Map; (e) por que usar BigDecimal para valores monetários. Depois compile um programa pequeno e simule uma chamada polimórfica.`,
      },
    ],
    example: 'Um serviço recebe três pagamentos: R$ 20,00 aprovado, R$ 15,00 pendente e R$ 8,00 aprovado. A Stream filtra os aprovados, extrai os valores e soma com BigDecimal: total de R$ 28,00. A lista original não é modificada; Pagamento modela os dados e o serviço aplica a regra de seleção.',
    references: [{ label: 'Oracle Java Tutorials — fundamentos da linguagem', url: 'https://docs.oracle.com/javase/tutorial/' }],
    quickQuestions: [{
      id: `${id}-q1`,
      prompt: 'Se uma referência declarada como Notificador aponta para Email, uma chamada sobrescrita a enviar() pode executar a implementação de Email em tempo de execução.',
      source: 'Questão autoral para treino',
      correctAnswer: 'certo',
      explanation: 'O despacho dinâmico seleciona a implementação sobrescrita do objeto concreto, desde que a chamada seja permitida pelo tipo declarado da referência.',
    }],
  },
};
