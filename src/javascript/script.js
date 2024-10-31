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
  const cartItemsDiv = document.getElementById("cart_items");
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
  document.getElementById("total_price").textContent = `Total: ${formatPrice(
    total
  )}`;
}

//Carregar o header dinamicamente
document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header_placeholder");
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerPlaceholder.innerHTML = data;

      // Configura o menu mobile somente após o header ser carregado
      const mobileBtn = document.getElementById("mobile_btn");
      const mobileMenu = document.getElementById("mobile_menu");

      if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", function () {
          mobileMenu.classList.toggle("active");
        });
      }
      // Carregar o cart após o header estar carregado
      loadCart();
    })
    .catch((error) => console.error("Erro ao carregar o header:", error));
});

// Função para carregar o carrinho de compras
function loadCart() {
  const cartPlaceholder = document.getElementById("cart_placeholder");
  fetch("cart.html")
    .then((response) => response.text())
    .then((data) => {
      cartPlaceholder.innerHTML = data;

      // Agora que o cart.html foi carregado, selecione o botão do carrinho e a seção do carrinho
      const cartButton = document.getElementById("cart_button");
      const shoppingCart = document.getElementById("shopping_cart");

      // Verifique se ambos existem antes de adicionar o evento de clique
      if (cartButton && shoppingCart) {
        cartButton.onclick = () => {
          shoppingCart.classList.toggle("show");
        };
      } else {
        console.error("Elemento cartButton ou shoppingCart não encontrado.");
      }

      // Carregar o footer após o cart estar carregado
      loadFooter();
    })
    .catch((error) => console.error("Erro ao carregar o cart:", error));
}

// Função para carregar o footer dinamicamente
function loadFooter() {
  const footerPlaceholder = document.getElementById("footer_placeholder");
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerPlaceholder.innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar o footer:", error));
}