"use client"

import { useEffect } from "react"
import { useLocale } from "next-intl"

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            autoDisplay: boolean
            includedLanguages: string
          },
          elementId: string
        ) => void
      }
    }
  }
}

const SCRIPT_ID = "google-translate-script"
const ELEMENT_ID = "google_translate_element"

export default function GoogleTranslate() {
  const locale = useLocale()

  useEffect(() => {
    if (locale !== "en") return

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "ko",
          autoDisplay: false,
          includedLanguages: "en",
        },
        ELEMENT_ID
      )

      // 자동으로 영어 번역 트리거
      const triggerTranslation = () => {
        const select = document.querySelector<HTMLSelectElement>(
          ".goog-te-combo"
        )
        if (select) {
          select.value = "en"
          select.dispatchEvent(new Event("change"))
        } else {
          setTimeout(triggerTranslation, 100)
        }
      }
      setTimeout(triggerTranslation, 500)
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script")
      script.id = SCRIPT_ID
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.head.appendChild(script)
    } else if (window.google?.translate) {
      window.googleTranslateElementInit()
    }

    return () => {
      delete window.googleTranslateElementInit
    }
  }, [locale])

  if (locale !== "en") return null

  return <div id={ELEMENT_ID} style={{ display: "none" }} />
}
