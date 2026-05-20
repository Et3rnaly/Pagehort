// =============================================================================
// Product Data - Zé das Frutas Hortifruti
// Catálogo baseado nos produtos reais do Anota Aí
// =============================================================================

import type { Product } from "@/src/types"

// =============================================================================
// Prontos e Processados
// =============================================================================

export const preparedProducts: Product[] = [
  { id: 1, name: "Salada de Frutas", priceUnit: "R$ 5,99", unitInfo: "Unidade", image: "🍓" },
  { id: 2, name: "Amendoim Cozinhado PCT", priceUnit: "R$ 5,99", unitInfo: "Pacote", image: "🥜" },
  { id: 3, name: "Alho Poró Processado", priceUnit: "R$ 14,99", unitInfo: "Unidade", image: "🥬" },
  { id: 4, name: "Água de Coco Verde 1L", priceUnit: "R$ 9,99", unitInfo: "1L", image: "🥥" },
  { id: 5, name: "Arroz de Brócolis UND", priceUnit: "R$ 12,99", unitInfo: "Unidade", image: "🥦" },
  { id: 6, name: "Amendoim Torrado PCT", priceUnit: "R$ 5,99", unitInfo: "Pacote", image: "🥜" },
  { id: 7, name: "Abacaxi Fatiado BDI", priceUnit: "R$ 8,99", unitInfo: "Bandeja", image: "🍍" },
  { id: 8, name: "Salada de Verduras", priceUnit: "R$ 4,99", unitInfo: "Unidade", image: "🥗" },
  { id: 9, name: "Salada Light UND", priceUnit: "R$ 11,99", unitInfo: "Unidade", image: "🥗" },
  { id: 10, name: "Salada de Frango", priceUnit: "R$ 14,99", unitInfo: "Unidade", image: "🥗" },
  { id: 11, name: "Mix Folhas", priceUnit: "R$ 9,99", unitInfo: "Unidade", image: "🥬" },
  { id: 12, name: "Mix Espaguete", priceUnit: "R$ 11,99", unitInfo: "Unidade", image: "🥕" },
  { id: 13, name: "Sunomono UND", priceUnit: "R$ 7,99", unitInfo: "Unidade", image: "🥒" },
  { id: 14, name: "Vinagrete UND", priceUnit: "R$ 4,99", unitInfo: "Unidade", image: "🍅" },
  { id: 15, name: "Coco Ralado", priceUnit: "R$ 5,99", unitInfo: "Unidade", image: "🥥" },
  { id: 16, name: "Kit Feijão Verde KG", pricePerKg: "R$ 24,99/kg", priceUnit: "R$ 24,99", unitInfo: "Venda por kg", image: "🫘" },
  { id: 17, name: "Mix Cheiro Verde", priceUnit: "R$ 24,99", unitInfo: "Unidade", image: "🌿" },
]

// =============================================================================
// Congelados e Proteínas
// =============================================================================

export const frozenAndProteinProducts: Product[] = [
  { id: 18, name: "Sobrecoxa KG - Bom Todo", pricePerKg: "R$ 15,99/kg", priceUnit: "R$ 15,99", unitInfo: "Venda por kg", image: "🍗" },
  { id: 19, name: "Peito de Frango KG - Bom Todo", pricePerKg: "R$ 19,99/kg", priceUnit: "R$ 19,99", unitInfo: "Venda por kg", image: "🍗" },
  { id: 20, name: "Pão de Alho 400G - Bom Todo", priceUnit: "R$ 13,99", unitInfo: "400g", image: "🥖" },
  { id: 21, name: "Mini Coxinha de Calabresa com Massa de Macaxeira", priceUnit: "R$ 17,99", unitInfo: "Pacote", image: "🥟" },
  { id: 22, name: "Frango Desfiado 400G", priceUnit: "R$ 20,99", unitInfo: "400g", image: "🍗" },
  { id: 23, name: "Filé de Tilápia 500G - Bom Todo", priceUnit: "R$ 34,99", unitInfo: "500g", image: "🐟" },
  { id: 24, name: "Filé de Peito de Frango - Bom Todo", priceUnit: "R$ 28,99", unitInfo: "Unidade", image: "🍗" },
  { id: 25, name: "Filé de Merluza 800G - Bom Todo", priceUnit: "R$ 34,99", unitInfo: "800g", image: "🐟" },
  { id: 26, name: "Esfera de Queijo 380G - Dream Fest", priceUnit: "R$ 20,99", unitInfo: "380g", image: "🧀" },
  { id: 27, name: "Esfera de Bacalhau 380G - Dream Fest", priceUnit: "R$ 24,99", unitInfo: "380g", image: "🐟" },
  { id: 28, name: "Croquete Misto 380G - Dream Fest", priceUnit: "R$ 20,99", unitInfo: "380g", image: "🥟" },
  { id: 29, name: "Coxinha de Frango 380G - Dream Fest", priceUnit: "R$ 18,99", unitInfo: "380g", image: "🥟" },
  { id: 30, name: "Coxa e Sobrecoxa KG - Bom Todo", pricePerKg: "R$ 15,99/kg", priceUnit: "R$ 15,99", unitInfo: "Venda por kg", image: "🍗" },
  { id: 31, name: "Coxa de Frango - Bom Todo", priceUnit: "R$ 15,99", unitInfo: "Unidade", image: "🍗" },
  { id: 32, name: "Camarão Embalado 320G - Dream Fest", priceUnit: "R$ 34,99", unitInfo: "320g", image: "🍤" },
  { id: 33, name: "Brócolis Congelado 300G - Bom Todo", priceUnit: "R$ 7,99", unitInfo: "300g", image: "🥦" },
  { id: 34, name: "Batata Palito 2KG - Bom Todo", priceUnit: "R$ 29,99", unitInfo: "2kg", image: "🍟" },
  { id: 35, name: "Batata Palito 1KG - Bom Todo", priceUnit: "R$ 18,99", unitInfo: "1kg", image: "🍟" },
]

// =============================================================================
// Combos
// =============================================================================

export const comboProducts: Product[] = [
  { id: 36, name: "Essencial da Semana", priceUnit: "R$ 49,99", unitInfo: "Combo", image: "🛒" },
  { id: 37, name: "Combo Família", priceUnit: "R$ 99,99", unitInfo: "Combo", image: "🧺" },
]

// =============================================================================
// Mercearia
// =============================================================================

export const groceryProducts: Product[] = [
  { id: 38, name: "Achocolatado Nescau 200G", priceUnit: "R$ 9,99", unitInfo: "200g", image: "🍫" },
  { id: 39, name: "Açúcar Alegre KG", pricePerKg: "R$ 4,99/kg", priceUnit: "R$ 4,99", unitInfo: "1kg", image: "🍚" },
  { id: 40, name: "Açúcar Refinado 1KG", priceUnit: "R$ 8,99", unitInfo: "1kg", image: "🍚" },
  { id: 41, name: "Arroz Camil Branco 1KG", priceUnit: "R$ 7,99", unitInfo: "1kg", image: "🍚" },
  { id: 42, name: "Arroz Kika Parboilizado 1KG", priceUnit: "R$ 6,99", unitInfo: "1kg", image: "🍚" },
  { id: 43, name: "Aveia em Flocos Quaker 165G", priceUnit: "R$ 6,99", unitInfo: "165g", image: "🥣" },
  { id: 44, name: "Aveia Flocos Finos 165G - Quaker", priceUnit: "R$ 6,99", unitInfo: "165g", image: "🥣" },
  { id: 45, name: "Azeitona Fatiada Vale Fértil", priceUnit: "R$ 7,99", unitInfo: "Unidade", image: "🫒" },
  { id: 46, name: "Azeitona Sem Caroço Vale Fértil", priceUnit: "R$ 7,99", unitInfo: "Unidade", image: "🫒" },
  { id: 47, name: "Bananada Brazil com Açaí 230G", priceUnit: "R$ 17,99", unitInfo: "230g", image: "🍌" },
  { id: 48, name: "Bananada Brazil com Cupuaçu 230G", priceUnit: "R$ 17,99", unitInfo: "230g", image: "🍌" },
  { id: 49, name: "Bananada Brazil Natural 230G", priceUnit: "R$ 17,99", unitInfo: "230g", image: "🍌" },
  { id: 50, name: "Biscoito Cream Cracker Vitarella", priceUnit: "R$ 6,99", unitInfo: "Pacote", image: "🍪" },
  { id: 51, name: "Biscoito Maria Leite Vitarella", priceUnit: "R$ 7,99", unitInfo: "Pacote", image: "🍪" },
  { id: 52, name: "Biscoito Rainha Bom Jesus 300G", priceUnit: "R$ 6,99", unitInfo: "300g", image: "🍪" },
  { id: 53, name: "Biscoito Suíça Bom Jesus 300G", priceUnit: "R$ 6,99", unitInfo: "300g", image: "🍪" },
  { id: 54, name: "Biscoito Treloso 120G Chocolate", priceUnit: "R$ 2,29", unitInfo: "120g", image: "🍪" },
  { id: 55, name: "Biscoito Treloso 120G Morango", priceUnit: "R$ 2,29", unitInfo: "120g", image: "🍪" },
  { id: 56, name: "Biscoito Vitarella Rosquinha Chocolate 350G", priceUnit: "R$ 6,99", unitInfo: "350g", image: "🍪" },
  { id: 57, name: "Biscoito Vitarella Rosquinha Coco 350G", priceUnit: "R$ 6,99", unitInfo: "350g", image: "🍪" },
  { id: 58, name: "Biscoito Vitarella Rosquinha Leite 350G", priceUnit: "R$ 6,99", unitInfo: "350g", image: "🍪" },
  { id: 59, name: "Café São Brás Família 250G", priceUnit: "R$ 18,99", unitInfo: "250g", image: "☕" },
  { id: 60, name: "Café Solúvel Nescafé 50G", priceUnit: "R$ 6,99", unitInfo: "50g", image: "☕" },
  { id: 61, name: "Café Solúvel Santa Clara 40G", priceUnit: "R$ 6,49", unitInfo: "40g", image: "☕" },
  { id: 62, name: "Canela em Pó 100% Pura 35G", priceUnit: "R$ 6,99", unitInfo: "35g", image: "🧂" },
  { id: 63, name: "Catchup Tambaú PET 830G", priceUnit: "R$ 11,99", unitInfo: "830g", image: "🍅" },
  { id: 64, name: "Creme de Leite Betânia 200G", priceUnit: "R$ 4,99", unitInfo: "200g", image: "🥛" },
  { id: 65, name: "Creme de Leite Italac 200G", priceUnit: "R$ 4,99", unitInfo: "200g", image: "🥛" },
  { id: 66, name: "Creme de Leite Piracanjuba 200G", priceUnit: "R$ 4,99", unitInfo: "200g", image: "🥛" },
  { id: 67, name: "Farofa Seridoense 300G", priceUnit: "R$ 14,99", unitInfo: "300g", image: "🌾" },
  { id: 68, name: "Feijão Camil Carioca", priceUnit: "R$ 11,99", unitInfo: "Pacote", image: "🫘" },
  { id: 69, name: "Feijão Camil Preto 1KG", priceUnit: "R$ 9,99", unitInfo: "1kg", image: "🫘" },
  { id: 70, name: "Fermento Qualimax 100G", priceUnit: "R$ 7,99", unitInfo: "100g", image: "🥣" },
  { id: 71, name: "Fermento Royal 100G", priceUnit: "R$ 8,99", unitInfo: "100g", image: "🥣" },
  { id: 72, name: "Flocão Coringa 500G", priceUnit: "R$ 3,99", unitInfo: "500g", image: "🌽" },
  { id: 73, name: "Flocão Novomilho 500G", priceUnit: "R$ 2,49", unitInfo: "500g", image: "🌽" },
  { id: 74, name: "Flocão São Brás Não Transgênico 500G", priceUnit: "R$ 4,99", unitInfo: "500g", image: "🌽" },
  { id: 75, name: "Gelatina Diet Maracujá", priceUnit: "R$ 5,99", unitInfo: "Unidade", image: "🍮" },
  { id: 76, name: "Gelatina Diet Morango", priceUnit: "R$ 5,99", unitInfo: "Unidade", image: "🍮" },
  { id: 77, name: "Ketchup Heinz 567G", priceUnit: "R$ 14,99", unitInfo: "567g", image: "🍅" },
  { id: 78, name: "Lámen de Carne Vitarella", priceUnit: "R$ 1,99", unitInfo: "Unidade", image: "🍜" },
  { id: 79, name: "Lámen de Galinha Vitarella", priceUnit: "R$ 1,99", unitInfo: "Unidade", image: "🍜" },
  { id: 80, name: "Lámen Galinha Caipira Vitarella", priceUnit: "R$ 1,99", unitInfo: "Unidade", image: "🍜" },
  { id: 81, name: "Lasanha Pré-Cozida 200G - Galo", priceUnit: "R$ 9,99", unitInfo: "200g", image: "🍝" },
  { id: 82, name: "Leite Condensado Semidesnatado Betânia", priceUnit: "R$ 7,99", unitInfo: "Unidade", image: "🥛" },
  { id: 83, name: "Leite Desnatado Betânia 1L", priceUnit: "R$ 7,99", unitInfo: "1L", image: "🥛" },
  { id: 84, name: "Leite em Pó Integral Itambé 200G", priceUnit: "R$ 9,99", unitInfo: "200g", image: "🥛" },
  { id: 85, name: "Leite Ninho em Pó Lata Integral 380G", priceUnit: "R$ 21,99", unitInfo: "380g", image: "🥛" },
  { id: 86, name: "Leite Ninho em Pó Sachê Integral 750G", priceUnit: "R$ 41,99", unitInfo: "750g", image: "🥛" },
  { id: 87, name: "Leite UHT Zero Lactose Betânia 1L", priceUnit: "R$ 8,99", unitInfo: "1L", image: "🥛" },
  { id: 88, name: "Macarrão Lasanha Vitarella Sêmola 500G", priceUnit: "R$ 8,99", unitInfo: "500g", image: "🍝" },
  { id: 89, name: "Macarrão Vitarella Espaguete Fino", priceUnit: "R$ 3,99", unitInfo: "Pacote", image: "🍝" },
  { id: 90, name: "Macarrão Vitarella Sêmola Parafuso Speciale 500G", priceUnit: "R$ 4,99", unitInfo: "500g", image: "🍝" },
  { id: 91, name: "Macarrão Vitarella Spec Ninho Sêmola 500G", priceUnit: "R$ 6,99", unitInfo: "500g", image: "🍝" },
  { id: 92, name: "Maionese Heinz 390G", priceUnit: "R$ 16,99", unitInfo: "390g", image: "🥫" },
  { id: 93, name: "Maionese Quero 200G Sachê", priceUnit: "R$ 3,99", unitInfo: "200g", image: "🥫" },
  { id: 94, name: "Milho para Pipoca 400G", priceUnit: "R$ 5,99", unitInfo: "400g", image: "🍿" },
  { id: 95, name: "Molho Barbecue Sadia 380G", priceUnit: "R$ 11,99", unitInfo: "380g", image: "🥫" },
  { id: 96, name: "Molho de Alho Gota Regina 150ML", priceUnit: "R$ 3,99", unitInfo: "150ml", image: "🧄" },
  { id: 97, name: "Molho de Pimenta ao Leite 150ML", priceUnit: "R$ 3,99", unitInfo: "150ml", image: "🌶️" },
  { id: 98, name: "Molho de Pimenta Regina 150ML", priceUnit: "R$ 3,99", unitInfo: "150ml", image: "🌶️" },
  { id: 99, name: "Molho de Tomate Quero 240G", priceUnit: "R$ 3,99", unitInfo: "240g", image: "🍅" },
  { id: 100, name: "Molho de Tomate Tradicional Heinz 240G", priceUnit: "R$ 4,99", unitInfo: "240g", image: "🍅" },
  { id: 101, name: "Molho Inglês Regina 150ML", priceUnit: "R$ 3,99", unitInfo: "150ml", image: "🥫" },
  { id: 102, name: "Molho Shoyu Regina 150ML", priceUnit: "R$ 3,99", unitInfo: "150ml", image: "🥫" },
  { id: 103, name: "Quero Ervilha 170G", priceUnit: "R$ 4,99", unitInfo: "170g", image: "🫛" },
  { id: 104, name: "Quero Ketchup 400G", priceUnit: "R$ 8,99", unitInfo: "400g", image: "🍅" },
  { id: 105, name: "Quero Milho e Ervilha 170G", priceUnit: "R$ 4,99", unitInfo: "170g", image: "🌽" },
  { id: 106, name: "Sal Grosso 1KG", priceUnit: "R$ 2,49", unitInfo: "1kg", image: "🧂" },
  { id: 107, name: "Sal Moído KG", pricePerKg: "R$ 2,49/kg", priceUnit: "R$ 2,49", unitInfo: "1kg", image: "🧂" },
  { id: 108, name: "Sal Parrilha Defumado 450G - Maker", priceUnit: "R$ 21,99", unitInfo: "450g", image: "🧂" },
  { id: 109, name: "Sal Parrilha Ervas Finas 450G - Maker", priceUnit: "R$ 21,99", unitInfo: "450g", image: "🧂" },
  { id: 110, name: "Sal Parrilha Pimenta 450G - Maker", priceUnit: "R$ 21,99", unitInfo: "450g", image: "🧂" },
  { id: 111, name: "Sal Parrilha Tradicional 450G - Maker", priceUnit: "R$ 21,99", unitInfo: "450g", image: "🧂" },
  { id: 112, name: "Sardinha com Molho de Tomate 160G - 88", priceUnit: "R$ 7,99", unitInfo: "160g", image: "🐟" },
  { id: 113, name: "Sardinha Óleo 160G - 88", priceUnit: "R$ 7,99", unitInfo: "160g", image: "🐟" },
  { id: 114, name: "Torrada Vitarella Integral", priceUnit: "R$ 5,99", unitInfo: "Pacote", image: "🍞" },
  { id: 115, name: "Torrada Vitarella Multigrãos", priceUnit: "R$ 5,99", unitInfo: "Pacote", image: "🍞" },
  { id: 116, name: "Vela Nº 8 - Vidaluz", priceUnit: "R$ 7,99", unitInfo: "Unidade", image: "🕯️" },
  { id: 117, name: "Vinagre de Maçã Orgânico 500ML", priceUnit: "R$ 39,99", unitInfo: "500ml", image: "🍎" },
  { id: 118, name: "Vinagre Minhoto Álcool 250ML", priceUnit: "R$ 3,49", unitInfo: "250ml", image: "🧴" },
]

// =============================================================================
// Legumes e Verduras
// =============================================================================

export const vegetableProducts: Product[] = [
  { id: 119, name: "Tomate Cereja 180G", priceUnit: "R$ 7,99", unitInfo: "180g", image: "🍅" },
  { id: 120, name: "Tomate KG", pricePerKg: "R$ 12,99/kg", priceUnit: "R$ 12,99", unitInfo: "Venda por kg", image: "🍅" },
  { id: 121, name: "Repolho Roxo 500G", priceUnit: "R$ 4,99", unitInfo: "500g", image: "🥬" },
  { id: 122, name: "Repolho Branco 1KG", priceUnit: "R$ 6,99", unitInfo: "1kg", image: "🥬" },
  { id: 123, name: "Pimentão Vermelho KG", pricePerKg: "R$ 24,99/kg", priceUnit: "R$ 24,99", unitInfo: "Venda por kg", image: "🫑" },
  { id: 124, name: "Pimentão Amarelo KG", pricePerKg: "R$ 24,99/kg", priceUnit: "R$ 24,99", unitInfo: "Venda por kg", image: "🫑" },
  { id: 125, name: "Pimentão UND", priceUnit: "R$ 2,49", unitInfo: "Unidade", image: "🫑" },
  { id: 126, name: "Pimenta de Cheiro PCT", priceUnit: "R$ 3,99", unitInfo: "Pacote", image: "🌶️" },
  { id: 127, name: "Pepino Japonês 500G", priceUnit: "R$ 3,99", unitInfo: "500g", image: "🥒" },
  { id: 128, name: "Pepino 500G", priceUnit: "R$ 2,99", unitInfo: "500g", image: "🥒" },
  { id: 129, name: "Milho 5 Unidades Pacote", priceUnit: "R$ 7,99", unitInfo: "5 unidades", image: "🌽" },
  { id: 130, name: "Macaxeira Descascada KG", pricePerKg: "R$ 6,99/kg", priceUnit: "R$ 6,99", unitInfo: "Venda por kg", image: "🍠" },
  { id: 131, name: "Macaxeira com Casca KG", pricePerKg: "R$ 4,99/kg", priceUnit: "R$ 4,99", unitInfo: "Venda por kg", image: "🍠" },
  { id: 132, name: "Jerimum de Leite KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🎃" },
  { id: 133, name: "Jerimum Caboclo KG", pricePerKg: "R$ 7,99/kg", priceUnit: "R$ 7,99", unitInfo: "Venda por kg", image: "🎃" },
  { id: 134, name: "Inhame KG", pricePerKg: "R$ 14,99/kg", priceUnit: "R$ 14,99", unitInfo: "Venda por kg", image: "🍠" },
  { id: 135, name: "Feijão Verde 500G", priceUnit: "R$ 12,50", unitInfo: "500g", image: "🫘" },
  { id: 136, name: "Chuchu UND", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🥒" },
  { id: 137, name: "Cenoura 1KG", priceUnit: "R$ 10,99", unitInfo: "1kg", image: "🥕" },
  { id: 138, name: "Cebola Roxa 500G", priceUnit: "R$ 3,99", unitInfo: "500g", image: "🧅" },
  { id: 139, name: "Cebola 1KG", priceUnit: "R$ 8,99", unitInfo: "1kg", image: "🧅" },
  { id: 140, name: "Cará KG", pricePerKg: "R$ 8,99/kg", priceUnit: "R$ 8,99", unitInfo: "Venda por kg", image: "🍠" },
  { id: 141, name: "Beterraba 500G", priceUnit: "R$ 4,99", unitInfo: "500g", image: "🫜" },
  { id: 142, name: "Berinjela 500G", priceUnit: "R$ 2,99", unitInfo: "500g", image: "🍆" },
  { id: 143, name: "Batata Inglesa 1KG", priceUnit: "R$ 12,99", unitInfo: "1kg", image: "🥔" },
  { id: 144, name: "Batata Doce KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🍠" },
  { id: 145, name: "Alho Pacote 500G", priceUnit: "R$ 19,99", unitInfo: "500g", image: "🧄" },
  { id: 146, name: "Alho Descascado Congelado 300G - Bom Todo", priceUnit: "R$ 9,99", unitInfo: "300g", image: "🧄" },
  { id: 147, name: "Alho Branco/Roxo UND", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🧄" },
  { id: 148, name: "Abobrinha 500G", priceUnit: "R$ 3,99", unitInfo: "500g", image: "🥒" },
]

// =============================================================================
// Frutas
// =============================================================================

export const fruitProducts: Product[] = [
  { id: 149, name: "Uva Vitória Sem Sementes 500G", priceUnit: "R$ 7,99", unitInfo: "500g", image: "🍇" },
  { id: 150, name: "Uva Thompson 500G Sem Semente", priceUnit: "R$ 14,99", unitInfo: "500g", image: "🍇" },
  { id: 151, name: "Uva Red Isis 500G Sem Semente", priceUnit: "R$ 9,99", unitInfo: "500g", image: "🍇" },
  { id: 152, name: "Uva Jubileu/Núbia 500G", priceUnit: "R$ 8,99", unitInfo: "500g", image: "🍇" },
  { id: 153, name: "Uva Itália 500G", priceUnit: "R$ 7,99", unitInfo: "500g", image: "🍇" },
  { id: 154, name: "Tangerina Importada KG", pricePerKg: "R$ 19,99/kg", priceUnit: "R$ 19,99", unitInfo: "Venda por kg", image: "🍊" },
  { id: 155, name: "Pitaya KG", pricePerKg: "R$ 29,99/kg", priceUnit: "R$ 29,99", unitInfo: "Venda por kg", image: "🐉" },
  { id: 156, name: "Pêra Portuguesa 500G", priceUnit: "R$ 10,99", unitInfo: "500g", image: "🍐" },
  { id: 157, name: "Pêra Argentina 500G", priceUnit: "R$ 11,99", unitInfo: "500g", image: "🍐" },
  { id: 158, name: "Morango Premium 250G", priceUnit: "R$ 16,99", unitInfo: "250g", image: "🍓" },
  { id: 159, name: "Melão Rei KG", pricePerKg: "R$ 15,99/kg", priceUnit: "R$ 15,99", unitInfo: "Venda por kg", image: "🍈" },
  { id: 160, name: "Melão Japonês KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🍈" },
  { id: 161, name: "Melão Espanhol KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🍈" },
  { id: 162, name: "Melancia Baby KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🍉" },
  { id: 163, name: "Melancia KG", pricePerKg: "R$ 3,49/kg", priceUnit: "R$ 3,49", unitInfo: "Venda por kg", image: "🍉" },
  { id: 164, name: "Maracujá KG", pricePerKg: "R$ 7,99/kg", priceUnit: "R$ 7,99", unitInfo: "Venda por kg", image: "🟡" },
  { id: 165, name: "Manga Tommy KG", pricePerKg: "R$ 6,99/kg", priceUnit: "R$ 6,99", unitInfo: "Venda por kg", image: "🥭" },
  { id: 166, name: "Manga Rosa KG", pricePerKg: "R$ 7,99/kg", priceUnit: "R$ 7,99", unitInfo: "Venda por kg", image: "🥭" },
  { id: 167, name: "Manga Palmer KG", pricePerKg: "R$ 6,99/kg", priceUnit: "R$ 6,99", unitInfo: "Venda por kg", image: "🥭" },
  { id: 168, name: "Mamão Havaí KG", pricePerKg: "R$ 4,99/kg", priceUnit: "R$ 4,99", unitInfo: "Venda por kg", image: "🍈" },
  { id: 169, name: "Mamão Formosa Gold KG", pricePerKg: "R$ 7,99/kg", priceUnit: "R$ 7,99", unitInfo: "Venda por kg", image: "🍈" },
  { id: 170, name: "Mamão Formosa KG", pricePerKg: "R$ 4,99/kg", priceUnit: "R$ 4,99", unitInfo: "Venda por kg", image: "🍈" },
  { id: 171, name: "Maçã Verde KG", pricePerKg: "R$ 16,99/kg", priceUnit: "R$ 16,99", unitInfo: "Venda por kg", image: "🍏" },
  { id: 172, name: "Maçã Red KG", pricePerKg: "R$ 16,99/kg", priceUnit: "R$ 16,99", unitInfo: "Venda por kg", image: "🍎" },
  { id: 173, name: "Maçã Nacional KG", pricePerKg: "R$ 14,99/kg", priceUnit: "R$ 14,99", unitInfo: "Venda por kg", image: "🍎" },
  { id: 174, name: "Maçã Fuji KG", pricePerKg: "R$ 16,99/kg", priceUnit: "R$ 16,99", unitInfo: "Venda por kg", image: "🍎" },
  { id: 175, name: "Limão Siciliano KG", pricePerKg: "R$ 17,99/kg", priceUnit: "R$ 17,99", unitInfo: "Venda por kg", image: "🍋" },
  { id: 176, name: "Limão KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🍋" },
  { id: 177, name: "Laranja Pêra 18KG", priceUnit: "R$ 59,99", unitInfo: "Saco 18kg", image: "🍊" },
  { id: 178, name: "Laranja Pêra KG", pricePerKg: "R$ 4,49/kg", priceUnit: "R$ 4,49", unitInfo: "Venda por kg", image: "🍊" },
  { id: 179, name: "Laranja Navelina KG", pricePerKg: "R$ 14,99/kg", priceUnit: "R$ 14,99", unitInfo: "Venda por kg", image: "🍊" },
  { id: 180, name: "Laranja Mimo do Céu KG", pricePerKg: "R$ 8,99/kg", priceUnit: "R$ 8,99", unitInfo: "Venda por kg", image: "🍊" },
  { id: 181, name: "Kiwi 500G", priceUnit: "R$ 17,99", unitInfo: "500g", image: "🥝" },
  { id: 182, name: "Goiaba 1KG", priceUnit: "R$ 6,99", unitInfo: "1kg", image: "🍐" },
  { id: 183, name: "Coco Verde Processado Unidade", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🥥" },
  { id: 184, name: "Coco Seco Inteiro", priceUnit: "R$ 4,99", unitInfo: "Unidade", image: "🥥" },
  { id: 185, name: "Caqui KG", pricePerKg: "R$ 34,99/kg", priceUnit: "R$ 34,99", unitInfo: "Venda por kg", image: "🍅" },
  { id: 186, name: "Caju Bandeja com 8 Unidades", priceUnit: "R$ 14,99", unitInfo: "8 unidades", image: "🍎" },
  { id: 187, name: "Banana Prata KG", pricePerKg: "R$ 6,99/kg", priceUnit: "R$ 6,99", unitInfo: "Venda por kg", image: "🍌" },
  { id: 188, name: "Banana Pacovan KG", pricePerKg: "R$ 5,99/kg", priceUnit: "R$ 5,99", unitInfo: "Venda por kg", image: "🍌" },
  { id: 189, name: "Banana Maçã KG", pricePerKg: "R$ 8,99/kg", priceUnit: "R$ 8,99", unitInfo: "Venda por kg", image: "🍌" },
  { id: 190, name: "Banana de Cozinhar KG", pricePerKg: "R$ 9,99/kg", priceUnit: "R$ 9,99", unitInfo: "Venda por kg", image: "🍌" },
  { id: 191, name: "Ameixa Fresca 500G", priceUnit: "R$ 7,99", unitInfo: "500g", image: "🍑" },
  { id: 192, name: "Acerola KG", pricePerKg: "R$ 14,99/kg", priceUnit: "R$ 14,99", unitInfo: "Venda por kg", image: "🍒" },
  { id: 193, name: "Abacaxi Unidade", priceUnit: "R$ 7,99", unitInfo: "Unidade", image: "🍍" },
  { id: 194, name: "Abacate KG", pricePerKg: "R$ 7,99/kg", priceUnit: "R$ 7,99", unitInfo: "Venda por kg", image: "🥑" },
]

// =============================================================================
// Folhas, Ervas e Temperos Frescos
// =============================================================================

export const greensAndHerbsProducts: Product[] = [
  { id: 195, name: "Acelga KG", pricePerKg: "R$ 9,99/kg", priceUnit: "R$ 9,99", unitInfo: "Venda por kg", image: "🥬" },
  { id: 196, name: "Alecrim", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🌿" },
  { id: 197, name: "Alface Americana", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🥬" },
  { id: 198, name: "Alface Crespa", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🥬" },
  { id: 199, name: "Alface Lisa", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🥬" },
  { id: 200, name: "Alface Roxo/Francês", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🥬" },
  { id: 201, name: "Alho Poró", priceUnit: "R$ 9,99", unitInfo: "Unidade", image: "🥬" },
  { id: 202, name: "Brócolis UND", priceUnit: "R$ 13,99", unitInfo: "Unidade", image: "🥦" },
  { id: 203, name: "Cebolinha", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🌿" },
  { id: 204, name: "Coentro", priceUnit: "R$ 3,99", unitInfo: "Unidade", image: "🌿" },
  { id: 205, name: "Couve Flor UND", priceUnit: "R$ 21,99", unitInfo: "Unidade", image: "🥦" },
  { id: 206, name: "Couve Folha", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🥬" },
  { id: 207, name: "Espinafre", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🥬" },
  { id: 208, name: "Gengibre 250G", priceUnit: "R$ 5,99", unitInfo: "250g", image: "🫚" },
  { id: 209, name: "Hortelã", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🌿" },
  { id: 210, name: "Jiló Bandeja 350G", priceUnit: "R$ 4,99", unitInfo: "350g", image: "🍆" },
  { id: 211, name: "Manjericão", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🌿" },
  { id: 212, name: "Maxixe Bandeja", priceUnit: "R$ 4,99", unitInfo: "Bandeja", image: "🥒" },
  { id: 213, name: "Quiabo Bandeja", priceUnit: "R$ 4,99", unitInfo: "Bandeja", image: "🫛" },
  { id: 214, name: "Rúcula", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🥬" },
  { id: 215, name: "Salsa", priceUnit: "R$ 2,99", unitInfo: "Unidade", image: "🌿" },
  { id: 216, name: "Vagem 250G", priceUnit: "R$ 15,99", unitInfo: "250g", image: "🫛" },
]

// =============================================================================
// Polpas, Cremes e Congelados de Frutas
// =============================================================================

export const frozenFruitProducts: Product[] = [
  { id: 217, name: "Creme de Açaí Fruta Plus 900ML", priceUnit: "R$ 49,99", unitInfo: "900ml", image: "🫐" },
  { id: 218, name: "Creme de Cajá Prime 1L - Canaã", priceUnit: "R$ 19,99", unitInfo: "1L", image: "🥤" },
  { id: 219, name: "Creme de Graviola Prime 1L - Canaã", priceUnit: "R$ 19,99", unitInfo: "1L", image: "🥤" },
  { id: 220, name: "Creme de Morango Prime 1L - Canaã", priceUnit: "R$ 19,99", unitInfo: "1L", image: "🍓" },
  { id: 221, name: "Frutas Vermelhas Congeladas 1KG - Canaã", priceUnit: "R$ 39,99", unitInfo: "1kg", image: "🍓" },
  { id: 222, name: "Morango Congelado Canaã 1KG", priceUnit: "R$ 21,99", unitInfo: "1kg", image: "🍓" },
  { id: 223, name: "Polpa de Abacaxi Canaã 1KG", priceUnit: "R$ 10,99", unitInfo: "1kg", image: "🍍" },
  { id: 224, name: "Polpa de Açaí Canaã 1KG", priceUnit: "R$ 27,99", unitInfo: "1kg", image: "🫐" },
  { id: 225, name: "Polpa de Acerola Canaã 1KG", priceUnit: "R$ 12,99", unitInfo: "1kg", image: "🍒" },
  { id: 226, name: "Polpa de Cajá Canaã 1KG", priceUnit: "R$ 17,99", unitInfo: "1kg", image: "🍊" },
  { id: 227, name: "Polpa de Caju Canaã 1KG", priceUnit: "R$ 9,99", unitInfo: "1kg", image: "🍎" },
  { id: 228, name: "Polpa de Goiaba Canaã 1KG", priceUnit: "R$ 9,99", unitInfo: "1kg", image: "🍐" },
  { id: 229, name: "Polpa de Graviola Canaã 1KG", priceUnit: "R$ 19,99", unitInfo: "1kg", image: "🍈" },
  { id: 230, name: "Polpa de Manga Canaã 1KG", priceUnit: "R$ 9,99", unitInfo: "1kg", image: "🥭" },
  { id: 231, name: "Polpa de Maracujá Canaã 1KG", priceUnit: "R$ 23,99", unitInfo: "1kg", image: "🟡" },
  { id: 232, name: "Polpa de Morango Canaã 1KG", priceUnit: "R$ 24,99", unitInfo: "1kg", image: "🍓" },
  { id: 233, name: "Polpa de Tangerina Canaã 1KG", priceUnit: "R$ 12,99", unitInfo: "1kg", image: "🍊" },
  { id: 234, name: "Polpa de Uva Canaã 1KG", priceUnit: "R$ 12,99", unitInfo: "1kg", image: "🍇" },
]

// =============================================================================
// Ovos
// =============================================================================

export const eggProducts: Product[] = [
  { id: 235, name: "Ovo Caipira 12 Unidades", priceUnit: "R$ 12,99", unitInfo: "12 unidades", image: "🥚" },
  { id: 236, name: "Ovo Caipira 15 Unidades", priceUnit: "R$ 17,99", unitInfo: "15 unidades", image: "🥚" },
  { id: 237, name: "Ovos Branco Bandeja com 15 Unidades", priceUnit: "R$ 11,99", unitInfo: "15 unidades", image: "🥚" },
  { id: 238, name: "Ovos Vermelho Bandeja com 15 Unidades", priceUnit: "R$ 12,50", unitInfo: "15 unidades", image: "🥚" },
]

// =============================================================================
// Bebidas
// =============================================================================

export const drinkProducts: Product[] = [
  { id: 239, name: "Sprite 2L Sem Açúcar", priceUnit: "R$ 11,99", unitInfo: "2L", image: "🥤" },
  { id: 240, name: "Fanta Lata 350ML", priceUnit: "R$ 3,99", unitInfo: "350ml", image: "🥤" },
  { id: 241, name: "Fanta Laranja 2L", priceUnit: "R$ 9,99", unitInfo: "2L", image: "🥤" },
  { id: 242, name: "Coca-Cola Zero 2L", priceUnit: "R$ 12,99", unitInfo: "2L", image: "🥤" },
  { id: 243, name: "Coca-Cola Sem Açúcar 350ML", priceUnit: "R$ 4,99", unitInfo: "350ml", image: "🥤" },
  { id: 244, name: "Coca-Cola Lata 350ML", priceUnit: "R$ 4,99", unitInfo: "350ml", image: "🥤" },
  { id: 245, name: "Coca-Cola 2L", priceUnit: "R$ 12,99", unitInfo: "2L", image: "🥤" },
  { id: 246, name: "Água Mineral Sterbom 510ML", priceUnit: "R$ 1,99", unitInfo: "510ml", image: "💧" },
]

// =============================================================================
// Padaria
// =============================================================================

export const bakeryProducts: Product[] = [
  { id: 247, name: "Rap10 Tapioca 297G", priceUnit: "R$ 11,99", unitInfo: "297g", image: "🫓" },
  { id: 248, name: "Rap10 Original 297G", priceUnit: "R$ 11,99", unitInfo: "297g", image: "🫓" },
  { id: 249, name: "Rap10 Integral 297G", priceUnit: "R$ 11,99", unitInfo: "297g", image: "🫓" },
  { id: 250, name: "Pão Plusvita Sem Açúcar 12 Grãos", priceUnit: "R$ 14,99", unitInfo: "Pacote", image: "🍞" },
  { id: 251, name: "Pão Integral Plusvita 480G", priceUnit: "R$ 12,99", unitInfo: "480g", image: "🍞" },
  { id: 252, name: "Pão Grãos e Castanhas", priceUnit: "R$ 14,99", unitInfo: "Pacote", image: "🍞" },
  { id: 253, name: "Pão de Hambúrguer Plusvita 400G", priceUnit: "R$ 9,99", unitInfo: "400g", image: "🍔" },
  { id: 254, name: "Pão de Hambúrguer Brioche Plusvita", priceUnit: "R$ 11,99", unitInfo: "Pacote", image: "🍔" },
  { id: 255, name: "Pão Artesano Original", priceUnit: "R$ 13,99", unitInfo: "Pacote", image: "🍞" },
  { id: 256, name: "Pão Artesano Integral", priceUnit: "R$ 14,99", unitInfo: "Pacote", image: "🍞" },
  { id: 257, name: "Nutrella Frutas, Grãos e Castanhas", priceUnit: "R$ 14,99", unitInfo: "Pacote", image: "🍞" },
  { id: 258, name: "Farinha de Rosca Plusvita 500G", priceUnit: "R$ 7,99", unitInfo: "500g", image: "🥖" },
  { id: 259, name: "Bolo Cocada 150G", priceUnit: "R$ 10,99", unitInfo: "150g", image: "🍰" },
  { id: 260, name: "Bisnaguito Plusvita", priceUnit: "R$ 11,99", unitInfo: "Pacote", image: "🍞" },
  { id: 261, name: "Bisnaguito 300G", priceUnit: "R$ 10,99", unitInfo: "300g", image: "🍞" },
  { id: 262, name: "Bisnaga Original Artesano 300G", priceUnit: "R$ 11,99", unitInfo: "300g", image: "🍞" },
  { id: 263, name: "Bisnaga Na Chapa Artesano 300G", priceUnit: "R$ 11,99", unitInfo: "300g", image: "🍞" },
  { id: 264, name: "Biscoito de Nata 160G - Vale do Açu", priceUnit: "R$ 14,99", unitInfo: "160g", image: "🍪" },
]

// =============================================================================
// Churrasco
// =============================================================================

export const barbecueProducts: Product[] = [
  { id: 265, name: "Carvão Vegetal 2,5KG", priceUnit: "R$ 12,99", unitInfo: "2,5kg", image: "🔥" },
  { id: 266, name: "Carvão Vegetal 4KG", priceUnit: "R$ 19,99", unitInfo: "4kg", image: "🔥" },
]

// =============================================================================
// Agrupamento geral para renderização dinâmica de seções
// =============================================================================

export const productSections = [
  {
    id: "combos",
    title: "Combos em Destaque",
    description: "Cestas prontas para facilitar as compras da semana.",
    products: comboProducts,
  },
  {
    id: "frutas",
    title: "Frutas Frescas",
    description: "Seleção de frutas para o dia a dia.",
    products: fruitProducts,
  },
  {
    id: "legumes-verduras",
    title: "Legumes e Verduras",
    description: "Produtos frescos para sua cozinha.",
    products: vegetableProducts,
  },
  {
    id: "folhas-temperos",
    title: "Folhas, Ervas e Temperos",
    description: "Mais frescor e sabor nas suas receitas.",
    products: greensAndHerbsProducts,
  },
  {
    id: "prontos-processados",
    title: "Prontos e Processados",
    description: "Praticidade para consumir ou preparar.",
    products: preparedProducts,
  },
  {
    id: "congelados-proteinas",
    title: "Congelados e Proteínas",
    description: "Carnes, peixes, salgados e congelados.",
    products: frozenAndProteinProducts,
  },
  {
    id: "polpas-cremes",
    title: "Polpas, Cremes e Frutas Congeladas",
    description: "Ideais para sucos, vitaminas e sobremesas.",
    products: frozenFruitProducts,
  },
  {
    id: "ovos",
    title: "Ovos",
    description: "Opções caipiras, brancas e vermelhas.",
    products: eggProducts,
  },
  {
    id: "mercearia",
    title: "Mercearia",
    description: "Itens essenciais para completar a compra.",
    products: groceryProducts,
  },
  {
    id: "bebidas",
    title: "Bebidas",
    description: "Refrigerantes, água e opções geladas.",
    products: drinkProducts,
  },
  {
    id: "padaria",
    title: "Padaria",
    description: "Pães, bisnagas, bolos e complementos.",
    products: bakeryProducts,
  },
  {
    id: "churrasco",
    title: "Churrasco",
    description: "Itens extras para o fim de semana.",
    products: barbecueProducts,
  },
]
