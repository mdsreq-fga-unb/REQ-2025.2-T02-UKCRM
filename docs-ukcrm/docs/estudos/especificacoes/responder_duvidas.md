# **Responder Dúvidas e Reclamações dos Usuários**

## **1. Introdução**

### **1.1. Breve Descrição**
Este caso de uso permite ao administrador visualizar, analisar e responder às dúvidas e reclamações enviadas pelos pacientes. O objetivo é garantir o suporte ao usuário e a resolução de problemas relatados na plataforma.

### **1.2. Atores**
* Administrador (Ator Principal)

## **2. Fluxo de Eventos**

### **2.1. Fluxo Principal**
#### **2.1.1.** O sistema apresenta a lista de dúvidas e reclamações com status "Pendente", ordenadas da mais antiga para a mais recente.
#### **2.1.2.** O administrador seleciona um item da lista para análise **\[FA01\]**.
#### **2.1.3.** O sistema exibe os detalhes da solicitação (Nome do Paciente, Data, Protocolo, Assunto e Mensagem).
#### **2.1.4.** O administrador analisa o conteúdo e redige a resposta no campo apropriado.
#### **2.1.5.** O administrador confirma o envio da resposta.
#### **2.1.6.** O sistema registra a resposta, altera o status da solicitação para "Concluído" e envia uma notificação ao paciente **\[RN01\]**.
#### **2.1.7.** O sistema exibe mensagem de sucesso e retorna à lista de atendimentos pendentes.
#### **2.1.8.** O caso de uso é encerrado.

### **2.2. Fluxos Alternativos**
#### **2.2.1. \[FA01\]** Filtrar Solicitações
* **Origem:** No passo 2.1.1 do fluxo principal, o Administrador deseja buscar uma solicitação específica.
##### **2.2.1.1.** O administrador utiliza os filtros de pesquisa (por número de protocolo, nome do paciente ou data).
##### **2.2.1.2.** O sistema atualiza a lista exibindo apenas os registros que correspondem aos critérios.
##### **2.2.1.3.** O fluxo **segue para o passo 2.1.2** do Fluxo Principal.

### **2.3. Fluxos de Exceção**
#### **2.3.1. \[FE01\]** Falha no Envio da Notificação
* **Origem:** No passo 2.1.6 do fluxo principal, ocorre um erro na comunicação com o serviço de notificações (e-mail ou push).
##### **2.3.1.1.** O sistema registra a resposta no banco de dados, mas alerta o administrador que a notificação automática falhou.
##### **2.3.1.2.** O sistema sugere o reenvio manual da notificação ou contato alternativo.
##### **2.3.1.3.** O fluxo **retorna ao passo 2.1.7** do Fluxo Principal (considerando que a resposta foi salva internamente).

## **3. Requisitos Especiais**
### **3.1.** O painel de resposta deve permitir o uso de modelos de resposta (templates) para agilizar o atendimento.

## **4. Regras de Negócio**
### **4.1. \[RN01\]** Notificação ao Usuário
Sempre que uma dúvida for respondida, o sistema deve disparar uma notificação (via e-mail ou push notification no app) avisando o paciente que há uma resposta disponível.

### **4.2. \[RN02\]** Imutabilidade do Histórico
As dúvidas e respostas registradas não podem ser excluídas ou alteradas após a conclusão, servindo como log de auditoria do atendimento.

## **5. Precondições**
### **5.1.** O administrador deve estar autenticado.
### **5.2.** Devem existir dúvidas com status "Pendente" registradas no sistema.

## **6. Pós-condições**
### **6.1.** A solicitação do paciente passa a ter o status "Concluído".
### **6.2.** A resposta fica disponível para visualização no perfil do paciente.

## **7. Pontos de Extensão**
### **7.1.** No passo 2, este caso de uso pode ser estendido por "Visualizar Perfil do Paciente" caso o administrador precise de mais dados para responder.