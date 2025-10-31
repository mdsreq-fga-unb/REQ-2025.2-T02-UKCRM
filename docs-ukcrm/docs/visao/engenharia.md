## 4. Engenharia de Requisitos

A partir das informações apresentadas na seção 3 deste documento, foram estabelecidas as atividades da **Engenharia de Requisitos (ER)**, suas práticas e técnicas em alinhamento ao processo de **Engenharia de Software (XP/Scrum)** informado.

---

### 4.1 Atividades e Técnicas de ER

### Elicitação e Descoberta

- **Entrevistas e Reuniões com o Cliente:**  
  Foram conduzidas reuniões quinzenais (via Google Meet) com o Product Owner (PO). Nessas sessões, o PO descreveu o problema (dependência de CRMs de terceiros) e colaborou ativamente na modelagem da solução ideal, refinando os requisitos de forma contínua.

- **Análise de Concorrentes:**  
  A equipe analisou soluções de CRM existentes no mercado (como Salesforce, Pipedrive, Kommo e Pipefy).  
  Essa análise, registrada no Tópico 2.4, foi crucial para identificar pontos fracos dos concorrentes (custo, suporte, complexidade) e definir diferenciais para o **UK CRM**.

---

### Análise e Consenso

- **Priorização (MoSCoW):**  
  Os requisitos elicitados foram analisados e priorizados em conjunto com o PO, utilizando o método MoSCoW (*Must, Should, Could, Won’t*).  
  Essa técnica foi fundamental para definir o escopo do **Mínimo Produto Viável (MVP)**.

- **Estimativa (Planning Poker):**  
  A equipe de desenvolvimento utilizou o método **Planning Poker** para estimar a complexidade técnica de cada requisito.  
  Isso promoveu consenso técnico e auxiliou no planejamento das **Sprints**.

---

### Declaração de Requisitos

- **Histórias de Usuário (User Stories):**  
  Seguindo a prática do XP, todos os requisitos funcionais foram declarados no formato de **Histórias de Usuário**.

- **Critérios de Aceitação (GWT):**  
  Cada História de Usuário foi detalhada com **Critérios de Aceitação** claros e testáveis, seguindo o formato **Dado-Quando-Então (GWT)**, conforme definido na **Definition of Ready (DoR)**.

---

### Representação de Requisitos

- **Prototipação de Alta Fidelidade:**  
  Foi desenvolvido um **protótipo navegável de alta fidelidade** na ferramenta **Figma**, permitindo que o cliente e a equipe visualizassem o fluxo de uso e o design da interface antes do início da codificação.

---

### Verificação e Validação de Requisitos

- **Validação de Design via Prototipação:**  
  O protótipo do Figma foi submetido à validação formal do cliente, garantindo o alinhamento com sua visão e mitigando riscos de usabilidade.

- **Revisão de Sprint (Validação Incremental):**  
  Ao final de cada sprint quinzenal, as entregas parciais funcionais são apresentadas ao cliente (**Sprint Review**) para avaliação e coleta de feedback contínuo.

---

### Organização e Atualização de Requisitos

- **Backlog de Produto (GitHub Projects):**  
  Todas as Histórias de Usuário, Épicos e tarefas são organizados e gerenciados como **Backlog de Produto** dentro da ferramenta **GitHub Projects**.  
  O backlog é um artefato vivo, atualizado continuamente pela equipe e pelo PO.

---

### 4.2 Engenharia de Requisitos e o Scrum/XP

A tabela a seguir mapeia como as atividades de ER foram integradas nas fases do processo de desenvolvimento **XP/Scrum** adotado pela equipe.


<div class="centered-text"><b>Tabela 3 - </b> Integração de Processos de Engenharia de Requisitos.</div>
| Fase do Processo | Atividade de ER           | Prática                      | Técnica                                      | Resultado Esperado |
|------------------|---------------------------|------------------------------|----------------------------------------------|--------------------|
| **Sprint 0**     | Elicitação e Descoberta   | Descoberta de Valor          | Entrevistas, Análise de Concorrentes, Diagrama de Ishikawa | Problema validado e visão inicial do produto definida. |
| **Sprint 0**     | Análise e Consenso        | Priorização de Backlog       | MoSCoW (Inicial)                             | Backlog inicial priorizado com escopo do MVP definido. |
| **Sprint 0**     | Declaração                | Escrita de Requisitos        | Histórias de Usuário (Iniciais)              | Primeiras User Stories escritas para o Backlog. |
| **Sprint 0**     | Representação             | Design de Interação          | Prototipação (Figma)                         | Wireframes e protótipo de alta fidelidade criados. |
| **Sprint 0**     | Verificação e Validação   | Validação de Design          | Reunião de Validação de Protótipo            | Protótipo inicial aprovado pelo cliente. |
| **Sprint 1**     | Elicitação e Descoberta   | Refinamento (Grooming)       | Reuniões Quinzenais                          | Dúvidas esclarecidas e requisitos refinados para próximas Sprints. |
| **Sprint 1**     | Análise e Consenso        | Planejamento da Sprint       | Planning Poker                               | Histórias estimadas e selecionadas para a Sprint (Sprint Backlog). |
| **Sprint 1**     | Organização e Atualização | Gestão do Backlog            | Backlog de Produto (GitHub Projects)         | Backlog atualizado com novas histórias, repriorização ou bugs. |
| **Sprint 1**     | Verificação e Validação   | Inspeção e Adaptação         | Revisão de Sprint (Sprint Review)            | Incremento do produto validado pelo PO e feedback coletado. |
<div class="centered-text"><b>Fonte: </b> Elaborado por João Guilherme (2025)</div>
---
