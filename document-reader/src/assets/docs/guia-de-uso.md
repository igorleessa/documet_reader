# Guia de Uso

Este guia explica como adicionar e visualizar seus documentos Markdown no Document Reader.

## Adicionando Documentos

### Passo 1: Crie seu arquivo .md

Crie um arquivo com extensão `.md` com o conteúdo da sua documentação:

```markdown
# Meu Documento

Conteúdo da documentação aqui...
```

### Passo 2: Coloque na pasta correta

Salve o arquivo em:

```
src/assets/docs/meu-documento.md
```

### Passo 3: Registre no serviço

Abra o arquivo `src/app/services/doc.service.ts` e adicione o documento à lista:

```typescript
getDocuments(): DocFile[] {
  return [
    { name: 'Meu Documento', filename: 'meu-documento.md' },
    // outros documentos...
  ];
}
```

## Sintaxe Markdown Suportada

### Títulos

```markdown
# H1 - Título Principal
## H2 - Subtítulo
### H3 - Seção
```

### Formatação de Texto

- **Negrito**: `**texto**`
- *Itálico*: `*texto*`
- ~~Tachado~~: `~~texto~~`
- `Código inline`: `` `código` ``

### Listas

**Lista não ordenada:**
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

**Lista ordenada:**
1. Primeiro
2. Segundo
3. Terceiro

### Links e Imagens

```markdown
[Texto do link](https://exemplo.com)
![Alt da imagem](caminho/para/imagem.png)
```

### Citações

> Esta é uma citação em bloco.
> Pode ter múltiplas linhas.

### Separadores

---

### Tabelas

| Nome    | Idade | Cidade     |
|---------|-------|------------|
| Ana     | 25    | São Paulo  |
| Carlos  | 30    | Rio        |
| Maria   | 28    | Brasília   |

## Dicas de Produtividade

1. **Organize por categoria**: Crie subpastas dentro de `docs/` para categorizar seus documentos
2. **Nomes descritivos**: Use nomes de arquivo que indiquem o conteúdo
3. **Mantenha atualizado**: Atualize a lista no serviço sempre que adicionar novos documentos
