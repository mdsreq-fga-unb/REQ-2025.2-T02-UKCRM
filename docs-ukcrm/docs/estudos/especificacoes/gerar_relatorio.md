# **Gerar Relatório de Saúde Comunitária**

## **1. Introdução**

### **1.1. Breve Descrição**
Este caso de uso permite ao Agente Comunitário compilar e visualizar dados consolidados sobre as condições de saúde da região atendida. O objetivo é transformar os dados das visitas domiciliares em informações estratégicas para identificar áreas prioritárias, surtos de doenças recorrentes ou demandas de campanhas preventivas.

### **1.2. Atores**
* Agente Comunitário (Ator Principal)

## **2. Fluxo de eventos**
Este caso de uso é iniciado quando o Agente Comunitário acessa o módulo de análise e seleciona a opção “Relatórios da Comunidade”.

### **2.1. Fluxo Principal**
#### **2.1.1.** O sistema apresenta as opções de filtros para a geração do relatório (período, região/microárea, tipo de agravo/doença, faixa etária).
#### **2.1.2.** O Agente define os parâmetros desejados para a análise **\[RN01\]**.
#### **2.1.3.** O Agente solicita a geração do relatório.
#### **2.1.4.** O sistema processa os dados das visitas e prontuários da área selecionada, aplicando as regras de anonimização **\[RN02\]**.
#### **2.1.5.** O sistema exibe o relatório contendo gráficos e indicadores (ex: número de casos de dengue, taxa de vacinação infantil).
#### **2.1.6.** O Agente analisa as informações e opta por exportar o documento para compartilhamento.
#### **2.1.7.** O sistema gera o arquivo em formato digital (PDF ou planilha) para download ou envio.
#### **2.1.8.** O caso de uso é encerrado.

### **2.2. Fluxos alternativos**
#### **2.2.1. \[FA01\]** Visualizar Histórico de Relatórios
* **Origem:** Passo 2.1.1 do Fluxo Principal.
* **Condição:** O Agente deseja ver um relatório salvo anteriormente.
##### **2.2.1.1.** O Agente seleciona a aba "Relatórios Salvos".
##### **2.2.1.2.** O sistema lista os relatórios gerados previamente ordenados por data.
##### **2.2.1.3.** O Agente seleciona o arquivo desejado.
##### **2.2.1.4.** O sistema exibe o conteúdo do relatório antigo.
##### **2.2.1.5.** **Retorna ao passo 2.1.6.**

### **2.3. Fluxos de Exceção**
#### **2.3.1. \[FE01\]** Nenhum Dado Encontrado
* **Origem:** Passo 2.1.4 do Fluxo Principal.
* **Condição:** O sistema não encontra registros que correspondam aos filtros selecionados.
##### **2.3.1.1.** O sistema exibe a mensagem "Nenhum dado encontrado para os critérios informados" e sugere a alteração dos filtros.
##### **2.3.1.2.** **O sistema retorna ao passo 2.1.1.**

#### **2.3.2. \[FE02\]** Filtro Inválido
* **Origem:** Passo 2.1.3 do Fluxo Principal.
* **Condição:** O sistema detecta inconsistência nos filtros (ex: Data Final anterior à Data Inicial).
##### **2.3.2.1.** O sistema alerta o erro e bloqueia a geração.
##### **2.3.2.2.** **O sistema retorna ao passo 2.1.2.**

## **3. Requisitos Especiais**
### **3.1.** O relatório deve ser visualizável em dispositivos móveis (smartphones/tablets) com layout responsivo, dado que o agente trabalha em campo.

### **3.2.** A geração do relatório requer conexão com a internet para consolidar dados do servidor central, a menos que os dados sejam estritamente locais do dispositivo do agente.

## **4. Regras de Negócio**
### **4.1. \[RN01\]** Restrição de Escopo Geográfico
O sistema deve permitir que o Agente gere relatórios apenas referentes às microáreas ou comunidades às quais ele está oficialmente vinculado no cadastro profissional.

### **4.2. \[RN02\]** Anonimização de Dados
Os relatórios gerados para fins estatísticos não devem exibir nomes ou dados sensíveis que identifiquem individualmente os pacientes, apresentando apenas dados agregados (quantitativos e percentuais).

## **5. Precondições**
### **5.1.** O Agente Comunitário deve estar autenticado no sistema.
### **5.2.** Devem existir registros de visitas ou atendimentos na base de dados para a região selecionada.

## **6. Pós-condições**
### **6.1.** O relatório é disponibilizado para análise e tomada de decisão.
### **6.2.** Um log é gerado registrando que o agente acessou dados consolidados da comunidade.

## **7. Pontos de Extensão**
### **7.1.** -