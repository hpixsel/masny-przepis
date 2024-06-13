import React from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="p-3 mt-auto text-center">
      <a
        className="inline border-b-2"
        href="https://adamusdev.pl"
        target="_blank"
        rel="noreferrer noopenner"
      >
        &copy; AdamusDev
      </a>{" "}
      2023-{currentYear} - Masny przepis
    </div>
  )
}
