const API_URL = 'http://localhost:8080/api/products'

const edit = document.querySelector('#edit')
const form = document.querySelector('#form')
const formEdit = document.querySelector('#formEdit')
const productsList = document.querySelector('#products-list')

function editButtonEvent() {
  const editButtons = document.querySelectorAll('.edit-button')
  editButtons.forEach((button) => {
    button.onclick = function(e) {
      e.preventDefault()

      edit.classList.remove('hidden-form')

      const productId = this.dataset.id
      const productName = this.dataset.name
      const productBrand = this.dataset.brand
      const productPrice = this.dataset.price

      document.forms['formEdit'].id.value = productId
      document.forms['formEdit'].name.value = productName
      document.forms['formEdit'].brand.value = productBrand
      document.forms['formEdit'].price.value = productPrice
    }
  })
}

function removeButtonEvent() {
  const removeButtons = document.querySelectorAll('.remove-button')
  removeButtons.forEach((button) => {
    button.onclick = function(e) {
      e.preventDefault()

      const id = this.dataset.id

      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      }).then((response) => {
        response.json().then((data) => {
          if (data.message = 'success') {
            showProductsList()
            alert('Product removed successfully!')
          } else {
            alert('Oops, an error occurred, please try again!')
          }
        })
      })
    }
  })
}

function showProductsList() {
  fetch(API_URL).then((response) => {
  response.json().then((data) => {
    const productsHtml = data.map((product) => `
      <li>
        ${product.name} - ${product.brand} - $${product.price} -
        <a
          href="#"
          class="edit-button" 
          data-id="${product._id}"
          data-name="${product.name}"
          data-brand="${product.brand}"
          data-price="${product.price}"
        >[ Edit ]</a> - 
        <a
          href="#"
          class="remove-button"
          data-id="${product._id}"
        >[ Remove ]</a>
      </li>
    `).join('')

      productsList.innerHTML = productsHtml

      editButtonEvent()
      removeButtonEvent()
    })
  })
}

showProductsList()

form.onsubmit = function(e) {
  e.preventDefault()

  const productName = document.forms['form'].name.value
  const productBrand = document.forms['form'].brand.value
  const productPrice = document.forms['form'].price.value

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: productName,
      brand: productBrand,
      price: productPrice,
    })
  }).then((response) => {
    response.json().then((data) => {
      if (data.message === 'success') {
        form.reset()
        showProductsList()
        alert('Product added successfully!')
      } else {
        alert('Oops, an error occurred, please try again!')
      }
    })
  })
}

formEdit.onsubmit = function(e) {
  e.preventDefault()

  const productId = document.forms['formEdit'].id.value
  const productName = document.forms['formEdit'].name.value
  const productBrand = document.forms['formEdit'].brand.value
  const productPrice = document.forms['formEdit'].price.value

  fetch(`${API_URL}/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: productName,
      brand: productBrand,
      price: productPrice,
    })
  }).then((response) => {
    response.json().then((data) => {
      if (data.message = 'success') {
        formEdit.reset()
        edit.classList.add('hidden-form')
        showProductsList()
        alert('Product edited successfully!')
      } else {
        alert('Oops, an error occurred, please try again!')
      }
    })
  })
}
