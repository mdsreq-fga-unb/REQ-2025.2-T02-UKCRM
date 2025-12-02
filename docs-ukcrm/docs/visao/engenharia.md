## 4. Engenharia de Requisitos

A partir das informações apresentadas na seção 3 deste documento, foram estabelecidas as atividades da **Engenharia de Requisitos (ER)**, suas práticas e técnicas em alinhamento ao processo de **Engenharia de Software (XP/Scrum)** informado.

---

### 4.1 Atividades e Técnicas de ER


## 1. Elicitação e Descoberta

### **Entrevistas e Reuniões com o Cliente**
Foram conduzidas reuniões quinzenais (via Google Meet) com o Product Owner (PO).  
Nessas sessões:
- O PO descreveu o problema principal: dependência de CRMs de terceiros.
- Contribuiu ativamente para modelar a solução ideal.
- Refinou os requisitos de forma contínua com base nas discussões.

**Evidências:** Atas de reunião.

### **Análise de Concorrentes**
A equipe analisou soluções de CRM existentes no mercado, como:
- Salesforce  
- Pipedrive  
- Kommo  
- Pipefy  

Essa análise (registrada no Tópico 2.4) foi fundamental para:
- Identificar pontos fracos dos concorrentes (custo, suporte, complexidade).  
- Definir diferenciais estratégicos para o **UK CRM**.

---

## 2. Análise e Consenso

### **Priorização (MoSCoW)**
Os requisitos levantados foram discutidos e priorizados em conjunto com o PO utilizando o método **MoSCoW**:
- **Must**
- **Should**
- **Could**
- **Won’t**

Essa técnica definiu o escopo do **MVP**.

### **Estimativa (Planning Poker)**
A equipe de desenvolvimento aplicou **Planning Poker** para estimar a complexidade técnica dos requisitos, promovendo:
- Consenso técnico
- Planejamento mais preciso das sprints

**Evidências:** Priorização MoSCoW.

---

## 3. Declaração de Requisitos

### **Histórias de Usuário (User Stories)**
Seguindo práticas do XP:
- Todos os requisitos funcionais foram documentados como **Histórias de Usuário**.

### **Critérios de Aceitação (GWT)**
Cada história foi detalhada com critérios seguindo o modelo:
- **Dado**
- **Quando**
- **Então**

Esse padrão foi definido na **Definition of Ready (DoR)**, garantindo requisitos claros e testáveis.

---

## 4. Representação de Requisitos

### **Prototipação de Alta Fidelidade**
Foi criado um protótipo navegável de alta fidelidade no **Figma**, permitindo:
- Visualização do fluxo de uso
- Análise de UI/UX antes da codificação
- Aprovação antecipada do cliente

**Evidências:** Protótipo de alta fidelidade.

---

## 5. Verificação e Validação de Requisitos

### **Validação de Design via Prototipação**
O protótipo no Figma foi submetido à validação formal do cliente, garantindo:
- Alinhamento com a visão do cliente
- Redução de riscos de usabilidade

### **Revisão de Sprint (Validação Incremental)**
Ao final de cada sprint quinzenal:
- As entregas incrementais são apresentadas ao cliente em uma **Sprint Review**.
- Feedback é coletado continuamente para ajustes nas próximas sprints.

**Evidências:** Protótipo de alta fidelidade.


### 4.2 Engenharia de Requisitos e o Scrum/XP

A tabela a seguir mapeia como as atividades de ER foram integradas nas fases do processo de desenvolvimento **XP/Scrum** adotado pela equipe.


<div class="centered-text"><b>Tabela 3 - </b> Integração de Processos de Engenharia de Requisitos.</div>
# Fases do Scrum x Atividades de Engenharia de Requisitos

| **Fases do Scrum**              | **Atividades da ER**           | **Prática**                                     | **Técnica**                                                | **Resultado**                                                             |
|---------------------------------|--------------------------------|-------------------------------------------------|------------------------------------------------------------|---------------------------------------------------------------------------|
| **Planejamento da Release**     | Elicitação e descoberta        | Levantamento de necessidades e dores           | Entrevistas Quinzenais (Google Meet) e Diagrama de Ishikawa | Visão do produto alinhada e problema do cliente validado                 |
|                                 | Elicitação e descoberta        | Análise de mercado                              | Análise de Concorrência (Salesforce, Pipedrive, etc.)       | Identificação de diferenciais competitivos e pontos fracos dos rivais     |
|                                 | Análise e consenso             | Priorização de requisitos                       | Método MoSCoW                                              | Lista de requisitos classificada e MVP definido                           |
|                                 | Declaração                     | Registro de requisitos                           | Épicos e Histórias de Usuário                              | Funcionalidades estruturadas para organizar o desenvolvimento             |
| **Planejamento da Sprint**      | Elicitação e descoberta        | Refinamento de requisitos                        | Reuniões de Refinamento com PO (Udson)                      | Dúvidas esclarecidas sobre as histórias da sprint                         |
|                                 | Análise e consenso             | Estimativa de complexidade                       | Planning Poker                                             | Consenso técnico da equipe sobre o esforço de cada item                   |
|                                 | Verificação e validação        | Definição de prontidão                           | DoR e Critérios de Aceitação                               | Lista de requisitos aptos e detalhados para entrar na sprint              |
|                                 | Organização e atualização      | Gestão do Backlog                                | GitHub Projects                                            | Backlog da Sprint definido e tarefas criadas                              |
| **Execução da Sprint**          | Elicitação e descoberta        | Comunicação rápida e tira-dúvidas               | WhatsApp e Daily Scrum (Discord)                           | Resolução ágil de impedimentos ou dúvidas de regra de negócio             |
|                                 | Representação                  | Design de Interfaces                             | Prototipagem de Alta Fidelidade (Figma)                    | Protótipos navegáveis das telas que serão desenvolvidas                   |
|                                 | Verificação e validação        | Validação de Interfaces                          | Validação de Design com o Cliente                          | Aprovação visual das telas antes da codificação                           |
|                                 | Organização e atualização      | Acompanhamento de fluxo                          | Movimentação de Cards no GitHub Projects                   | Status real do desenvolvimento atualizado                                 |
| **Review da Sprint**            | Verificação e validação        | Validação do Incremento                          | Sprint Review (Demo via Google Meet)                       | Funcionalidades desenvolvidas validadas pelo cliente                      |
|                                 | Verificação e validação        | Garantia de Qualidade                            | DoD e Testes                                               | Garantia técnica de que o código está pronto para produção                |
|                                 | Organização e atualização      | Feedback e Ajustes                               | Atualização do Backlog                                     | Novos itens ou correções adicionados ao backlog para o futuro             |

<div class="centered-text"><b>Fonte: </b> Elaborado por João Guilherme (2025)</div>
---
