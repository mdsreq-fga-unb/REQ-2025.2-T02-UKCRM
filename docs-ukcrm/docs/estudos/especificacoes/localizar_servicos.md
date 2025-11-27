# **Localizar Serviços de Saúde** 

## **1. Introdução**

### **1.1. Breve Descrição**
Este caso de uso permite ao paciente mapear e listar clínicas, hospitais e campanhas de saúde próximas. O sistema ConnectCare prioriza a exibição de unidades de fácil acesso físico, auxiliando usuários em regiões com infraestrutura de transporte limitada. 

### **1.2. Atores** 
* Paciente (Ator Principal)

## **2. Fluxo de eventos** 
Inicialmente é realizada a execução do caso de uso “Fazer login”\[Include\].

### **2.1. Fluxo Principal**
#### **2.1.1.** O Paciente seleciona a opção buscar serviços de saúde;   
#### **2.1.2.** O Sistema apresenta os filtros de busca:  
* Localização;  
* Tipo de Atendimento;   
* Disponibilidade.  
#### **2.1.3.** O Paciente define os filtros de busca (Ex: Sintomas, urgência, distância);   
#### **2.1.4.** O sistema verifica as unidades de saúde compatíveis com os filtros;   
#### **2.1.5.** O sistema analisa a disponibilidade de horários nas unidades encontradas **\[RN01\]**;  
#### **2.1.6.** O sistema exibe a lista de resultados;   
#### **2.1.7.** O sistema disponibiliza a opção de visualizar o mapa com a rota de origem e destino **\[Extensão\]\[RNF03\]**;  
#### **2.1.8.** O caso de uso encerra. 

### **2.2. Fluxos alternativos**
#### **2.2.1. \[FA01\]** Falta de Transporte   
* **Origem:** Passo 2.1.3 do Fluxo Principal.   
* **Condição:** O Paciente define o filtro de dificuldade de transporte ou o sistema detecta que as unidades fixas estão muito distantes.   
##### **2.2.1.1.** O sistema busca campanhas móveis de atendimento ou agentes comunitários disponíveis na região **\[RN02\]**;  
##### **2.2.1.2.** O sistema mostra as opções móveis;   
##### **2.2.1.3. Retorno ao passo 2.1.5.** 

#### **2.2.2. \[FA02\]** Busca de Urgente  
* **Origem:** Passo 2.1.3 do Fluxo Principal.   
* **Condição:** O Paciente define o filtro de urgente.   
##### **2.2.2.1.** O sistema filtra apenas unidades de Pronto Atendimento ou Emergência abertas no momento.   
##### **2.2.2.2.** O sistema ordena os resultados pela proximidade.   
##### **2.2.2.3.** **Retorno ao passo 2.1.5.** 

### **2.3. Fluxos de Exceção** 
#### **2.3.1. \[FE01\]**  Nenhum Serviço Encontrado   
* **Origem:** Passo 2.1.4 do Fluxo Principal  
##### **2.3.1.1.** O Sistema informa que não há unidades de saúde cadastradas na região ou para filtros definidos.   
##### **2.3.1.2.** O Sistema sugere ampliar a aŕea na localização ou remover filtros específicos para uma busca mais geral.  
##### **2.3.1.3.** **Retorna ao passo 2.1.3.** 

#### **2.3.2. \[FE02\]** Localização Negada   
* **Origem:** Passo 2.1.2 do Fluxo Principal (Filtro por localização).  
###### **2.3.2.1.** O Sistema informa que não é possível localizar unidades próximas automaticamente.   
###### **2.3.2.2.** O Sistema solicita que preencha manualmente a localização ou ative o GPS.  
###### **2.3.2.3.** **Retorna ao passo 2.1.2.** 

## **3. Requisitos Especiais**
### **3.1.** O mapa deve ser renderizado de forma otimizada para dispositivos com baixo processamento. 

### **3.2.** A funcionalidade de mapa deve permitir acesso simplificado mesmo no modo offline. 

## **4. Regras de Negócio**
### **4.1. \[RN01\]** Verificação de Disponibilidade 
O sistema deve consultar a agenda dos profissionais, os horários de funcionamento da unidade em tempo real e a disponibilidade de atendimento diretamente na listagem de busca. 

### **4.2.\[RN02\]** Priorização de exibição 
O sistema deve identificar e priorizar a exibição de Agentes Comunitários e Campanhas Móveis, antes das unidades fixadas na lista de resultados.  
(Caso do passo 2.2.1).  	  

### **4.3. \[RN03\]** Localização 
O sistema deve utilizar a localização atual do GPS. Caso o GPS esteja inacessível, deve-se utilizar o endereço digitado manualmente e registrado no perfil como ponto de origem.

## **5. Precondições**   
### **5.1.** O Paciente deve possuir um cadastro ativo no ConnectCare; 
### **5.2.** Unidade de Saúde e Profissionais devem estar cadastrados na base de dados do sistema. 

## **6. Pós-condições** 
### **6.1.** O Paciente obteve a informação sobre onde ser atendido.

## **7. Pontos de Extensão** 
### **7.1.** No passo 2.1.7 este caso de uso pode ser estendido por “Ver no mapa”. 