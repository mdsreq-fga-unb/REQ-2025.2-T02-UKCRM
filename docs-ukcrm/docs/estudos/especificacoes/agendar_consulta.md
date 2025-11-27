# **Agendar Consulta**

## **1. Introdução**

### **1.1. Breve Descrição**
Este caso de uso permite que o paciente realize o agendamento de consultas de forma simples e rápida após selecionar um serviço de saúde. O objetivo é reduzir barreiras administrativas e o tempo de espera, automatizando o processo de marcação.

### **1.2. Atores**
* Paciente (Ator Principal).
* Profissional de Saúde (Ator Secundário - tem sua agenda afetada).

## **2. Fluxo de eventos**
Inicialmente é realizada a execução do caso de uso “Localizar Serviços de Saúde” (ou o paciente já selecionou um serviço previamente).

### **2.1. Fluxo Principal**
#### **2.1.1.** O Paciente seleciona a opção de agendar consulta em uma unidade ou serviço específico.
#### **2.1.2.** O Sistema apresenta os horários e datas disponíveis para aquele serviço.
#### **2.1.3.** O Paciente seleciona o horário desejado.
#### **2.1.4.** O Sistema solicita a confirmação dos dados do paciente ou dependente (ex: nome, idade, sintomas).
#### **2.1.5.** O Sistema verifica o histórico médico existente para vincular ao agendamento **\[RN01\]**.
#### **2.1.6.** O Sistema confirma o agendamento e gera um comprovante com detalhes do local.
#### **2.1.7.** O Sistema envia uma notificação automática com orientações e documentos necessários **\[RN02\]**.
#### **2.1.8.** O Sistema atualiza a agenda do profissional de saúde correspondente.
#### **2.1.9.** O caso de uso encerra.

### **2.2. Fluxos Alternativos**
#### **2.2.1. \[FA01\]** Agendamento para Dependente
* **Origem:** Passo 2.1.4 do Fluxo Principal.
* **Condição:** O paciente está agendando para um filho ou familiar (Exemplo: Joana agendando para Pedro).
##### **2.2.1.1.** O Paciente insere as informações do dependente (nome, idade, sintomas).
##### **2.2.1.2.** O Sistema processa o agendamento vinculado ao perfil do responsável, mas utilizando os dados clínicos do dependente para triagem.
##### **2.2.1.3.** **Retorno ao passo 2.1.5.**

#### **2.2.2. \[FA02\]** Agendamento de Exame Complementar
* **Origem:** Passo 2.1.1 do Fluxo Principal.
* **Condição:** O paciente foi instruído a retornar para um exame solicitado em consulta anterior.
##### **2.2.2.1.** O Paciente seleciona a opção de agendar exame.
##### **2.2.2.2.** O Sistema verifica a solicitação pendente no prontuário digital.
##### **2.2.2.3.** O Sistema exibe laboratórios ou unidades disponíveis na região.
##### **2.2.2.4.** **Retorno ao passo 2.1.3.**

### **2.3. Fluxos de Exceção**
#### **2.3.1. \[FE01\]** Conflito de Horário
* **Origem:** Passo 2.1.6 do Fluxo Principal (momento da confirmação).
* **Condição:** O horário selecionado foi ocupado por outro usuário simultaneamente.
##### **2.3.1.1.** O Sistema informa que o horário não está mais disponível.
##### **2.3.1.2.** O Sistema atualiza a lista e sugere os próximos horários livres.
##### **2.3.1.3.** **Retorna ao passo 2.1.3.**

## **3. Requisitos Especiais**
### **3.1.** O sistema deve ser acessível através de dispositivos simples (smartphones básicos) e funcionar adequadamente mesmo com conexões de internet limitadas.

### **3.2.** O sistema deve fornecer mapas simplificados para acesso offline após a confirmação do agendamento, auxiliando na chegada ao local.

## **4. Regras de Negócio**
### **4.1. \[RN01\]** Integração de Histórico Médico
Ao confirmar o agendamento, o sistema deve liberar o acesso ao histórico médico digital do paciente para o profissional de saúde, permitindo a visualização de consultas anteriores, alergias e condições preexistentes.

### **4.2. \[RN02\]** Notificações de Orientação
A confirmação deve incluir orientações específicas, como uso obrigatório de máscara, documentos de identificação necessários ou preparo para exames.

### **4.3. \[RN03\]** Priorização de Casos
O sistema deve utilizar algoritmos baseados nos sintomas informados para sugerir a unidade mais adequada (ex: unidade com atendimento pediátrico para crianças com febre) antes de efetivar a agenda.

## **5. Precondições**
### **5.1.** O Paciente deve estar registrado e logado na plataforma "ConnectCare".
### **5.2.** A unidade de saúde ou campanha deve ter horários cadastrados e visíveis no sistema.

## **6. Pós-condições**
### **6.1.** O Paciente tem sua vaga garantida e recebe as instruções de acesso.
### **6.2.** O Profissional de Saúde visualiza o novo paciente em seu fluxo de trabalho.

## **7. Pontos de Extensão**
### **7.1.** No passo 2.1.7 do Fluxo Principal, este caso de uso pode ser estendido por "Visualizar Rota no Mapa".