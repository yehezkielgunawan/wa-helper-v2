import { useState, useEffect } from 'hono/jsx'

interface CountryCode {
  name: string
  code: string
}

export function WhatsAppForm() {
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])
  const [countryCode, setCountryCode] = useState('+62')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [copyButtonText, setCopyButtonText] = useState('Copy URL')
  const [showCopyButton, setShowCopyButton] = useState(false)

  // Fetch country codes on mount
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/yehezkielgunawan/country-call-code/main/db.json')
      .then((res) => res.json())
      .then((data) => {
        setCountryCodes(data.countries || [])
      })
      .catch((error) => {
        console.error('Error fetching country codes:', error)
      })
  }, [])

  const handleCountryCodeChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    let value = target.value
    // Only allow + at the start and numbers
    value = value.replace(/[^0-9+]/g, '')
    if (value.indexOf('+') > 0) {
      value = value.replace(/\+/g, '')
      value = '+' + value
    }
    setCountryCode(value)
  }

  const handlePhoneNumberChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value.replace(/[^0-9\s-]/g, '')
    setPhoneNumber(value)
  }

  const handleMessageChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    setMessage(target.value)
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    // Get country code and phone number
    let code = countryCode.trim()
    let phone = phoneNumber.trim().replace(/[^0-9]/g, '')

    // Remove + from country code for the URL
    if (code.startsWith('+')) {
      code = code.substring(1)
    }

    const fullPhoneNumber = code + phone
    const msg = message.trim()

    // Build WhatsApp URL
    let waUrl = `https://wa.me/${fullPhoneNumber}`
    if (msg) {
      waUrl += `?text=${encodeURIComponent(msg)}`
    }

    // Store the URL
    setGeneratedUrl(waUrl)
    setShowCopyButton(true)

    // Redirect to WhatsApp
    window.open(waUrl, '_blank')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl)
      setCopyButtonText('Copied!')

      setTimeout(() => {
        setCopyButtonText('Copy URL')
      }, 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopyButtonText('Failed to copy')
      setTimeout(() => {
        setCopyButtonText('Copy URL')
      }, 2000)
    }
  }

  return (
    <form id="wa-form" class="form" onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="country-code-input" class="label">
          Phone Number
        </label>
        <div class="phone-input-wrapper">
          <input
            type="text"
            id="country-code-input"
            list="country-list"
            placeholder="+62"
            class="input country-code-input"
            autocomplete="off"
            required
            value={countryCode}
            onInput={handleCountryCodeChange}
          />
          <datalist id="country-list">
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </datalist>
          <input
            type="tel"
            id="phone-input"
            placeholder="812 3456 7890"
            class="input phone-main-input"
            required
            value={phoneNumber}
            onInput={handlePhoneNumberChange}
          />
        </div>
        <p class="helper-text">
          Select country code from dropdown, then enter phone number
        </p>
      </div>

      <div class="form-group">
        <label for="message-input" class="label">
          Message (Optional)
        </label>
        <textarea
          id="message-input"
          placeholder="Type your message here..."
          rows={4}
          class="input textarea"
          value={message}
          onInput={handleMessageChange}
        ></textarea>
      </div>

      <div class="button-group">
        <button type="submit" class="submit-btn">
          <svg
            class="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Open WhatsApp
        </button>

        {showCopyButton && (
          <button
            type="button"
            id="copy-btn"
            class={`copy-btn ${copyButtonText === 'Copied!' ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            <svg
              class="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
            <span id="copy-btn-text">{copyButtonText}</span>
          </button>
        )}
      </div>

      {generatedUrl && (
        <div id="generated-url-display" class="url-display">
          <p class="url-label">Generated URL:</p>
          <div class="url-box">
            <code id="generated-url" class="url-text">
              {generatedUrl}
            </code>
          </div>
        </div>
      )}
    </form>
  )
}
