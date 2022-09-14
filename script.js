const API_URL = 'http://localhost:8080/api/products'

const form = document.querySelector('#form')
const productsList = document.querySelector('#products-list')

function showProductsList() {
  fetch(API_URL).then((response) => {
  response.json().then((data) => {
    const productsHtml = data.map((product) => `
      <li>
        ${product.name} - ${product.brand} - $${product.price}
      </li>
    `).join('')

      productsList.innerHTML = productsHtml
    })
  })
}

showProductsList()

form.onsubmit = function(e) {
  e.preventDefault()

  const name = document.forms['form'].name.value
  const brand = document.forms['form'].brand.value
  const price = document.forms['form'].price.value

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      brand,
      price,
    })
  }).then((response) => {
    response.json().then((data) => {
      if (data.message === 'success') {
        form.reset()
        showProductsList()
        alert('Product successfully added!')
      } else {
        alert('Oops, an error occurred, please try again!')
      }
    })
  })
}
