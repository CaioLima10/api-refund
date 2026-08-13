## Funcionalidades Implementadas

### Tabela Usuario

- [x] Cadastro de usuários

### Tabela Sessão

- [x] Cadastro de sessões

### Tabela Reembolsos

- [x] Cadastro de reembolsos
- [x] Listagem de reembolsos
- [x] Visualização de um reembolso

### Uploads

- [x] Upload de arquivos
- [x] Visualização de arquivo enviado

## Usuários

**Método | Endpoint | Descrição**

POST | `/users` | Cadastra um novo usuário.

## Sessões

**Método | Endpoint | Descrição**

POST | `/sessions` | Cria uma nova sessão de autenticação.

## Reembolsos

**Método | Endpoint | Descrição**

POST | `/refunds` | Cadastra um novo reembolso.  
GET | `/refunds` | Lista todos os reembolsos cadastrados.  
GET | `/refunds/:id` | Exibe os dados de um reembolso específico.

## Uploads

**Método | Endpoint | Descrição**

POST | `/uploads` | Realiza o upload de um arquivo.  
GET | `/uploads/:filename` | Exibe o arquivo enviado.

## Exemplo de requisição

```json
{
  "name": "troca de computador",
  "category": "services",
  "amount": 690.53,
  "filename": "computador.png"
}
```

```
npm install
npm run dev
```
