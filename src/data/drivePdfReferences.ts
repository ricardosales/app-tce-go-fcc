type PdfReference = { label: string; url: string };

const pdf = (id: string, label: string): PdfReference => ({
  label,
  url: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
});

const relationalParts = [
  pdf('1ED-QpVz_p1SM68tCc-wSwmTwaSAbmLmd', 'Banco de Dados Relacionais — Parte I'),
  pdf('1woj69imhddUuG1pIVA-F_ihDsu5Du18P', 'Banco de Dados Relacionais — Parte II'),
  pdf('1nUxSYjD5EyKxvKEaePX5mcojvRBL55HV', 'Banco de Dados Relacionais — Parte III'),
  pdf('1E8rWxVbgvlGBfiMcu4cWzzXN_OuR0Dp2', 'Banco de Dados Relacionais — Parte IV'),
  pdf('10vro7pmzPrlkpwbKLOtOl7TLZJcEaUx8', 'Banco de Dados Relacionais — Parte V'),
];

const nosql = pdf('1KSQnzWIMscbsVQXAb-1NnnulL2hIO0i8', 'Banco de Dados — Bancos de Dados NoSQL');
const dataGovernance = pdf('1nxukoWecntSdftkqSnCzHAMBO-JxxRMe', 'Banco de Dados — Governança de Dados');
const sqlDdl = pdf('1hOIqDngaAcu_7gQVN1pgX_xREYIYgjBj', 'Banco de Dados — SQL (DDL)');
const sqlDml = pdf('1FDQvcuATLlr3-FT4gGeqXA1gPvIGYIF7', 'Banco de Dados — SQL (DML)');

export const DRIVE_PDF_REFERENCES: Record<string, PdfReference[]> = {
  'banco-dados-0': relationalParts.slice(0, 2),
  'banco-dados-1': relationalParts.slice(0, 2),
  'banco-dados-2': [...relationalParts, sqlDdl, sqlDml],
  'banco-dados-3': relationalParts.slice(2, 4),
  'banco-dados-4': relationalParts.slice(3, 5),
  'banco-dados-5': [...relationalParts.slice(3, 5), sqlDdl, sqlDml],
  'banco-dados-6': [relationalParts[4]],
  'banco-dados-7': [nosql],
  'banco-dados-8': [nosql],
  'banco-dados-10': relationalParts.slice(2, 5),
  'banco-dados-11': [dataGovernance],

  'desenvolvimento-sistemas-0': [
    pdf('1ZMQzpxZ6MTZ1IrmZSM_DSTDMBJYaoEQG', 'Desenvolvimento de Sistemas — Algoritmos e Estruturas de Dados'),
    pdf('1hX3aaZfeb6Ylm8_7HUoV88ShadYlSGV5', 'Desenvolvimento de Sistemas — Interpretação de Algoritmos'),
  ],
  'desenvolvimento-sistemas-1': [
    pdf('1WMmcMp-IMrh-SeuP5gRmjPJJJk2hzAAm', 'Desenvolvimento de Sistemas — Orientação a Objetos e UML'),
  ],
  'desenvolvimento-sistemas-2': [
    pdf('1W9IcDOKLYLoKGgZABvEVpKQG_8GllSLL', 'Desenvolvimento de Sistemas — Linguagem Java'),
  ],
  'desenvolvimento-sistemas-3': [
    pdf('1OKyBtbwmNFouJDz9KBKRe45Z6keAz1Yu', 'Desenvolvimento de Sistemas — Linguagem Javascript'),
  ],
  'desenvolvimento-sistemas-5': [
    pdf('1oeSZ7Fnq_QaIJOENmgLKbqQS-5GSTTnA', 'Desenvolvimento de Sistemas — Bibliotecas do Python'),
    pdf('1yCB3s0lPq4M42H-VoSCWikHqwQ1D3oew', 'Desenvolvimento de Sistemas — Linguagem Python'),
  ],
  'desenvolvimento-sistemas-8': [
    pdf('1wmt0ViNGgxQD_zK0qcMlhrtC6fXvhFL3', 'Desenvolvimento de Sistemas — Gestão de Identidade e Acesso'),
  ],
  'desenvolvimento-sistemas-11': [
    pdf('1gJAUQKPlnNfJLE8t-NpjfqVfTY0nl40h', 'Desenvolvimento de Sistemas — HTML'),
    pdf('1-4TLCE3sxvpXJKUduGxgaShRd_-xlJOD', 'Desenvolvimento de Sistemas — Linguagem CSS'),
  ],

  'engenharia-software-0': [
    pdf('1689z_aP-MdQqOu7QacZEzoj2WxcbT_eV', 'Engenharia de Software — Fundamentos e ciclo de vida'),
  ],
  'engenharia-software-1': [
    pdf('1689z_aP-MdQqOu7QacZEzoj2WxcbT_eV', 'Engenharia de Software — Fundamentos e ciclo de vida'),
  ],
  'engenharia-software-2': [
    pdf('1UvcGRgtHFZ091dykeqX-HdBHHPz2jlU2', 'Engenharia de Software — Métodos e frameworks ágeis'),
  ],
  'engenharia-software-3': [
    pdf('1JdwnWLmbjGngChQZEz_k5HMQnLb6X8Hn', 'Engenharia de Software — Requisitos funcionais e não funcionais'),
  ],
  'engenharia-software-4': [
    pdf('1JdwnWLmbjGngChQZEz_k5HMQnLb6X8Hn', 'Engenharia de Software — Requisitos funcionais e não funcionais'),
  ],
  'engenharia-software-7': [
    pdf('1sWUms6y6lcSKyIxBuQ6f0iA5cd5xfcwX', 'Engenharia de Software — Processos de negócio, BPM e tópicos relacionados'),
    pdf('1WMmcMp-IMrh-SeuP5gRmjPJJJk2hzAAm', 'Desenvolvimento de Sistemas — Orientação a Objetos e UML'),
  ],
  'engenharia-software-9': [
    pdf('1YBBFC0RVrd7R94oDBHKJLBH68AE8x8NW', 'Engenharia de Software — Qualidade de software'),
  ],
  'engenharia-software-10': [
    pdf('1uaRd2_3x6wqbrtsBmV-xzeDBIugLJ-rU', 'Engenharia de Software — Testes de software'),
  ],
  'engenharia-software-11': [
    pdf('1uaRd2_3x6wqbrtsBmV-xzeDBIugLJ-rU', 'Engenharia de Software — Testes de software'),
  ],

  'governanca-ti-0': [
    pdf('1lKVshqM9sIYtZiN9QG30-gq8gYcKaq6B', 'Governança de TI — Governança e planejamento estratégico'),
  ],
  'governanca-ti-1': [
    pdf('1N2ST9F3I6Rrx-gDni2gRlK7nd-gp4QEJ', 'Governança de TI — ITIL 4, Parte I'),
    pdf('1jCbW-srkn6VtxQIoZdyBqU6dj5uPpk7o', 'Governança de TI — ITIL 4, Parte II'),
  ],
  'governanca-ti-2': [
    pdf('1lKVshqM9sIYtZiN9QG30-gq8gYcKaq6B', 'Governança de TI — Governança e planejamento estratégico'),
  ],
  'governanca-ti-3': [
    pdf('1914NUS6gEw9E5eBuFf5zzwMZaaPgRp9z', 'Governança de TI — COBIT 2019'),
    pdf('1N2ST9F3I6Rrx-gDni2gRlK7nd-gp4QEJ', 'Governança de TI — ITIL 4, Parte I'),
    pdf('1jCbW-srkn6VtxQIoZdyBqU6dj5uPpk7o', 'Governança de TI — ITIL 4, Parte II'),
  ],

  'ia-dados-0': [
    pdf('1Ca4YjhOglCyWtVn-A4wlYdpD7FZEh8eR', 'Inteligência Artificial — Fundamentos'),
  ],
  'ia-dados-1': [
    pdf('1Z_JQemN2nCmNFkQTA2xNa33hQ1G582D_', 'Inteligência Artificial — Aprendizado de Máquina'),
  ],
  'ia-dados-2': [
    pdf('1e9m3EvI4o69-At66XQdlWTsH1b_tLqhT', 'Inteligência Artificial — Redes Neurais Artificiais'),
  ],
  'ia-dados-3': [
    pdf('1TuAa9Pp0S4EJAta191vto7iIopU32uVK', 'Inteligência Artificial — Processamento de Linguagem Natural'),
  ],
  'ia-dados-9': [
    pdf('1x2OdN4JXd-3fqCqFdrehNmtOmi_iPS2x', 'Ciência de Dados — Ciências de Dados'),
    pdf('14KWDr9xQNsYGex6r1wi_Ur3ZPoTHcX7f', 'Ciência de Dados — Análise de Dados e Analytics'),
    pdf('1crK0lvC9HkOlxc6uitNiFKljUp5wLOeq', 'DevOps — Pipeline de Dados'),
  ],
  'ia-dados-10': [
    pdf('14KWDr9xQNsYGex6r1wi_Ur3ZPoTHcX7f', 'Ciência de Dados — Análise de Dados e Analytics'),
  ],
  'ia-dados-11': [
    pdf('1hyRKfypp80ZuZsRrjRCE6I24LopvkOF_', 'Big Data, Hadoop e Spark'),
  ],

  'legislacao-ti-0': [
    pdf('1MXCEcvyJl6JjHcBq5ypRjMTJMMYZynIq', 'Legislação de TI — Lei Geral de Proteção de Dados'),
  ],
  'legislacao-ti-1': [
    pdf('1MXCEcvyJl6JjHcBq5ypRjMTJMMYZynIq', 'Legislação de TI — Lei Geral de Proteção de Dados'),
  ],
  'legislacao-ti-2': [
    pdf('12q1nHytU7Q0TEYVjBUEFDhGdXcJNT-O3', 'Legislação de TI — Marco Civil da Internet'),
  ],

  'legislacao-institucional-3': [
    pdf('1WHy4Tj-j0DEN5FKAm_0ivcqFqC6zGx_1', 'Legislação Institucional — Lei Orgânica do TCE-GO, Parte I'),
    pdf('1xlMacq7Ihp8fjkzL22K1f0oTnF7JxWyz', 'Legislação Institucional — Lei Orgânica do TCE-GO, Parte II'),
  ],
  'legislacao-institucional-4': [
    pdf('1nxiBhKqNPtmDL2orQKfiNHo7mScbOsN9', 'Legislação Institucional — Regimento Interno, Parte I'),
    pdf('1AgrzcYzlzaTcZwApRdxdCvftWLjlHvPB', 'Legislação Institucional — Regimento Interno, Parte II'),
    pdf('1JZFXo1E5_PYbEXv2f8JsgeGPvsj3Z-OW', 'Legislação Institucional — Regimento Interno, Parte III'),
    pdf('1FMq0vBd92zYM0mRjbVYHptMSyaYpKGf6', 'Legislação Institucional — Regimento Interno, Parte IV'),
    pdf('10yunIzMnCyCTDLpEfiNAIiOzbE2lLq_z', 'Legislação Institucional — Resoluções do TCE-GO'),
  ],
  'legislacao-institucional-5': [
    pdf('1ogkcpH_6xJM3jn84r9YeEFWW_bRF2SRx', 'Legislação Institucional — Plano de Cargos e Carreiras'),
  ],
  'legislacao-institucional-6': [
    pdf('1lXKu3QzEunPppEgL57b-fxtJ8cogFDTx', 'Legislação Institucional — Regime Jurídico, Parte I'),
    pdf('1R2DDvrS4mrGvO3I6y4N2ER-3D57320f9', 'Legislação Institucional — Regime Jurídico, Parte II'),
  ],
  'legislacao-institucional-7': [
    pdf('1tk50VeJunKP9uKX8tHdtYkxDQEsd7TG9', 'Legislação Institucional — Código de Ética dos Servidores do TCE-GO'),
  ],
};
