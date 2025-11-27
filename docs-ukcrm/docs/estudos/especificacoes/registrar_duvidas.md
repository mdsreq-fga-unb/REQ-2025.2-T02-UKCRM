# **Registrar Dúvidas ou Reclamações**

## **1. Introdução**

### **1.1. Breve Descrição**
Este caso de uso permite ao paciente enviar dúvidas, questionamentos ou solicitações de esclarecimento para a administração do sistema *ConnectCare*. O objetivo é fornecer um canal direto de comunicação para resolver questões sobre o uso do aplicativo, agendamentos ou campanhas de saúde.

### **1.2. Atores**
* Paciente (Ator Principal)

## **2. Fluxo de Eventos**

### **2.1. Fluxo Principal**
#### **2.1.1.** O sistema apresenta um formulário para envio da dúvida contendo os campos: Assunto (obrigatório) e Mensagem (obrigatório).
#### **2.1.2.** O paciente preenche os campos solicitados com as informações da sua dúvida **\[RN01\]**.
#### **2.1.3.** O paciente confirma o envio da mensagem.
#### **2.1.4.** O sistema valida o preenchimento dos campos **\[FE01\]**.
#### **2.1.5.** O sistema registra a dúvida, gera um número de protocolo de atendimento e define o status como "Pendente" **\[RN02\]**.
#### **2.1.6.** O sistema exibe uma mensagem de sucesso informando o número do protocolo gerado.
#### **2.1.7.** O caso de uso é encerrado.

### **2.2. Fluxos Alternativos**
#### **2.2.1. \[FA01\]** Consultar Dúvidas Frequentes (FAQ)
* **Origem:** Passo 2.1.1 do Fluxo Principal.
* **Condição:** O paciente opta por visualizar as dúvidas frequentes antes de enviar uma nova mensagem.
##### **2.2.1.1.** O sistema exibe uma lista de perguntas e respostas frequentes.
##### **2.2.1.2.** O paciente visualiza as informações.
##### **2.2.1.3.** O paciente decide se sua dúvida foi sanada:
* Se sim, o caso de uso é encerrado.
* Se não, o paciente seleciona a opção "Enviar nova dúvida" e o fluxo **retorna ao passo 2.1.1** do Fluxo Principal.

### **2.3. Fluxos de Exceção**
#### **2.3.1. \[FE01\]** Campos Obrigatórios não Preenchidos
* **Origem:** Passo 2.1.4 do Fluxo Principal.
* **Condição:** O sistema identifica que o assunto ou a mensagem estão em branco.
##### **2.3.1.1.** O sistema apresenta uma mensagem de alerta informando que todos os campos são obrigatórios.
##### **2.3.1.2.** O fluxo **retorna ao passo 2.1.2** do Fluxo Principal para que o paciente complete o preenchimento.

## **3. Requisitos Especiais**
### **3.1.** O editor de texto da mensagem deve suportar caracteres especiais e acentuação.

### **3.2.** O sistema deve ser responsivo para facilitar a digitação em dispositivos móveis.

## **4. Regras de Negócio**
### **4.1. \[RN01\]** Limite de Caracteres
O campo de mensagem deve permitir no máximo 2000 caracteres para garantir objetividade e performance no armazenamento.

### **4.2. \[RN02\]** Geração de Protocolo
Todo envio de dúvida deve gerar um código único de protocolo visível ao usuário para acompanhamento futuro.

## **5. Precondições**
### **5.1.** O paciente deve estar autenticado no aplicativo *ConnectCare*.

## **6. Pós-condições**
### **6.1.** Uma nova dúvida é registrada no banco de dados com status "Pendente", visível para a administração.

## **7. Pontos de Extensão**
### **7.1.** Não se aplica.