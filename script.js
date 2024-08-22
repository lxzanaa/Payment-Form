document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style')
  style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Farro:wght@300;400;500;700&display=swap');

        body {
            font-family: "Farro", sans-serif;
        }

        .form-container {
            padding: 20px;
            background-color: #f5f5f5;
            border: 1px solid #e3e3e3;
            border-radius: 4px;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
            color: #717171;
            transition: all 600ms cubic-bezier(0.2, 1.3, 0.7, 1);
            z-index: 1;
            max-width: 350px;
            width: 100%;
            position: relative;
        }

        .form-container .logo {
            position: absolute;
            top: 55px;
            right: 30px;
            width: 35px;
            height: auto;
        }

        .second {
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }

        .cvv-label,
        .card-number,
        .expiration-date {
            display: flex;
            flex-direction: column;
        }

        .cvv-label input,
        .card-number input,
        .expiration-date input {
            outline: none;
            height: 2.75em;
            padding: 5px 10px;
            margin-bottom: 1em;
            background: rgba(255, 255, 255, 0.86);
            border: 1px solid #eee;
            border-radius: 2px;
            font-size: 16px;
        }

        .expiration-date input,
        .cvv-label input {
            max-width: 150px;
        }

        .cvv-label label,
        .card-number label,
        .expiration-date label {
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 7px;
        }

        .button-pay {
            text-transform: uppercase;
            width: 100%;
            padding: 1em 1em;
            color: #fff;
            background: #282c37;
            font-size: 15px;
            border: 0;
            cursor: pointer;
            opacity: 0.1;
            transition: opacity 0.3s ease;
        }

        .button-pay:enabled {
            opacity: 1;
        }

        .animate-background {
            transition: background 0.6s cubic-bezier(0.2, 1.3, 0.7, 1);
        }

        .mastercard-bg {
            background: linear-gradient(115deg, #d82332, #d82332 50%, #f1ad3d 50%, #f1ad3d);
        }
            .mastercard-bg label{
            color: #fff;
            }

        .visa-bg {
            background: #003087;
        }
            .visa-bg label{
            color: #fff;
        }

        .default-bg {
            background: #f5f5f5;
        }
            .default-bg label{
            color: #717171;
            }
    `
  document.head.appendChild(style)

  const form = document.createElement('form')
  form.className = 'form'

  const formContainer = document.createElement('div')
  formContainer.className = 'form-container'

  const logoContainer = document.createElement('img')
  logoContainer.className = 'logo'
  formContainer.appendChild(logoContainer)

  const cardNumberDiv = document.createElement('div')
  cardNumberDiv.className = 'card-number'

  const cardNumberLabel = document.createElement('label')
  cardNumberLabel.setAttribute('for', 'cardNumberLabel')
  cardNumberLabel.textContent = 'Card Number'

  const cardNumberInput = document.createElement('input')
  cardNumberInput.type = 'text'
  cardNumberInput.id = 'cardNumberLabel'
  cardNumberInput.placeholder = '#### #### #### ####'

  cardNumberDiv.appendChild(cardNumberLabel)
  cardNumberDiv.appendChild(cardNumberInput)

  const secondDiv = document.createElement('div')
  secondDiv.className = 'second'

  const expirationDateDiv = document.createElement('div')
  expirationDateDiv.className = 'expiration-date'

  const expirationDateLabel = document.createElement('label')
  expirationDateLabel.setAttribute('for', 'expirationDateLabel')
  expirationDateLabel.textContent = 'Expiration Date'

  const expirationDateInput = document.createElement('input')
  expirationDateInput.type = 'text'
  expirationDateInput.id = 'expirationDateLabel'
  expirationDateInput.placeholder = 'MM / YYYY'

  expirationDateDiv.appendChild(expirationDateLabel)
  expirationDateDiv.appendChild(expirationDateInput)

  const cvvDiv = document.createElement('div')
  cvvDiv.className = 'cvv-label'

  const cvvLabel = document.createElement('label')
  cvvLabel.setAttribute('for', 'cvvLabel')
  cvvLabel.textContent = 'CVV'

  const cvvInput = document.createElement('input')
  cvvInput.type = 'text'
  cvvInput.id = 'cvvLabel'
  cvvInput.placeholder = '###'

  cvvDiv.appendChild(cvvLabel)
  cvvDiv.appendChild(cvvInput)

  secondDiv.appendChild(expirationDateDiv)
  secondDiv.appendChild(cvvDiv)

  const payButton = document.createElement('button')
  payButton.className = 'button-pay'
  payButton.textContent = 'Pay with Card'
  payButton.disabled = true

  formContainer.appendChild(cardNumberDiv)
  formContainer.appendChild(secondDiv)
  formContainer.appendChild(payButton)

  form.appendChild(formContainer)
  document.body.appendChild(form)

  function formatCardNumber (number) {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  function validateCardNumber () {
    let cardNumber = cardNumberInput.value
      .replace(/\s+/g, '')
      .replace(/\D/g, '')
    const isMasterCard = /^5[1-5]/.test(cardNumber)
    const isVisa = /^4/.test(cardNumber)

    if (cardNumber.length > 16) {
      cardNumber = cardNumber.slice(0, 16)
    }

    cardNumberInput.value = formatCardNumber(cardNumber)

    if (cardNumber.length > 0) {
      if (isMasterCard) {
        formContainer.classList.remove('visa-bg', 'default-bg')
        formContainer.classList.add('mastercard-bg', 'animate-background')
        logoContainer.src =
          'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
      } else if (isVisa) {
        formContainer.classList.remove('mastercard-bg', 'default-bg')
        formContainer.classList.add('visa-bg', 'animate-background')
        logoContainer.src =
          'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
      } else {
        formContainer.classList.remove('mastercard-bg', 'visa-bg')
        formContainer.classList.add('default-bg')
        logoContainer.src = '' 
      }

      if (cardNumber.length === 16) {
        cardNumberInput.style.color = 'black'
        return true
      } else {
        cardNumberInput.style.color = 'red'
        return false
      }
    } else {
      cardNumberInput.style.color = 'black'
      formContainer.classList.add('default-bg')
      logoContainer.src = '' 
      return false
    }
  }

  function validateExpirationDate () {
    const expirationDate = expirationDateInput.value.replace(/\D/g, '')
    const [mm, yyyy] = expirationDateInput.value
      .split(' / ')
      .map(part => part.trim())

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    let isValid = false

    if (mm && yyyy) {
      const month = parseInt(mm, 10)
      let year = parseInt(yyyy, 10)

      if (yyyy.length > 4) {
        year = parseInt(yyyy.slice(0, 4), 10)
        expirationDateInput.value = `${mm} / ${year}`
      }

      if (month >= 1 && month <= 12) {
        if (yyyy.length === 4) {
          if (
            year > currentYear ||
            (year === currentYear && month >= currentMonth)
          ) {
            isValid = true
          }
        } else if (yyyy.length === 2) {
          const fullYear = year + 2000
          if (
            fullYear > currentYear ||
            (fullYear === currentYear && month >= currentMonth)
          ) {
            isValid = true
          }
        }
      }
    }

    if (isValid) {
      expirationDateInput.style.color = 'black'
      return true 
    } else if (expirationDateInput.value.replace(/\D/g, '').length > 0) {
      expirationDateInput.style.color = 'red'
      return false
    } else {
      expirationDateInput.style.color = 'black'
      return false
    }
  }

  function validateCVV () {
    const cvv = cvvInput.value.replace(/\D/g, '')
    if (cvv.length === 3) {
      cvvInput.style.color = 'black'
      return true 
    } else if (cvv.length > 0) {
      cvvInput.style.color = 'red'
      return false
    } else {
      cvvInput.style.color = 'black'
      return false
    }
  }

  function validateForm () {
    const isCardNumberValid = validateCardNumber()
    const isExpirationDateValid = validateExpirationDate()
    const isCVVValid = validateCVV()

    payButton.disabled = !(
      isCardNumberValid &&
      isExpirationDateValid &&
      isCVVValid
    )
  }

  cardNumberInput.addEventListener('input', function () {
    let number = cardNumberInput.value.replace(/\D/g, '')
    number = number.match(/.{1,4}/g)?.join(' ') || ''
    cardNumberInput.value = number

    validateForm()
  })

  expirationDateInput.addEventListener('input', function () {
    let date = expirationDateInput.value.replace(/\D/g, '')
    if (date.length === 0) {
      expirationDateInput.value = ''
    } else if (date.length <= 2) {
      expirationDateInput.value = date
    } else if (date.length <= 6) {
      expirationDateInput.value =
        date.substring(0, 2) + ' / ' + date.substring(2, 6)
    }

    validateForm()
  })

  cvvInput.addEventListener('input', function () {
    let cvv = cvvInput.value.replace(/\D/g, '')
    if (cvv.length > 3) {
      cvv = cvv.substring(0, 3)
    }
    cvvInput.value = cvv
    validateForm()
  })
})
