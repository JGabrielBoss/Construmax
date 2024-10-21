//Carrinho de compra
let cart = []; // Array para armazenar os itens do carrinho
let total = 0; // Variável para armazenar o total

// Função para formatar o preço
function formatPrice(value) {
  return `R$ ${value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(".", ",")}`;
}

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
  cart.push({ name, price }); // Adiciona o item ao carrinho
  total += price; // Atualiza o total
  updateCart(); // Atualiza a exibição do carrinho
}

// Função para remover itens do carrinho
function removeFromCart(index) {
  total -= cart[index].price; // Atualiza o total
  cart.splice(index, 1); // Remove o item do carrinho
  updateCart(); // Atualiza a exibição do carrinho
}

// Função para atualizar a exibição do carrinho
function updateCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = ""; // Limpa os itens do carrinho

  // Adiciona cada item do carrinho à exibição
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    // Formata o preço usando a função formatPrice
    itemDiv.textContent = `${item.name} - ${formatPrice(item.price)}`; // Formata o preço

    // Cria o botão de remoção
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.className = "remove-button";
    removeButton.onclick = () => removeFromCart(index); // Ação ao clicar no botão

    itemDiv.appendChild(removeButton); // Adiciona o botão ao item
    cartItemsDiv.appendChild(itemDiv); // Adiciona o item à exibição do carrinho
  });

  // Atualiza o total do carrinho usando a função formatPrice
  document.getElementById("total-price").textContent = `Total: ${formatPrice(
    total
  )}`;
}

// Carregar o header dinamicamente
document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header_placeholder");
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerPlaceholder.innerHTML = data;

      const mobileBtn = document.getElementById("mobile_btn");
      const mobileMenu = document.getElementById("mobile_menu");

      // Verifica se os elementos existem antes de adicionar os event listeners
      if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", function () {
          // Alterna a classe 'active' no menu mobile
          mobileMenu.classList.toggle("active");
        });
      }
    })
    .catch((error) => console.error("Erro ao carregar o header:", error));
});

//Carregar o footer dinamicamente
document.addEventListener("DOMContentLoaded", function () {
  const footerPlaceholder = document.getElementById("footer_placeholder");
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerPlaceholder.innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar o footer:", error));
});