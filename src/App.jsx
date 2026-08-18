import { useEffect, useRef, useState } from 'react'
import couplePhoto from './assets/couple-photo.jpeg'
import './index.css'

/**
 * ───────────────────────────────────────────────────────────────
 *  EDIT ME: this is the only section you should need to touch.
 * ───────────────────────────────────────────────────────────────
 */
const COUPLE = {
  bride: 'Funmilayo',
  groom: 'Babatunde',

}

const CEREMONY = [
  { title: 'Processional Hymn', note: '\u201cGreat Is Thy Faithfulness\u201d', hymnKey: 'greatIsThyFaithfulness' },
  { title: 'Opening Prayer' },
  { title: 'Bible Reading' },
  { title: 'Hymn 2', note: '\u201cGod Give Us Christian Homes\u201d', hymnKey: 'GodGiveUsChristianHomes' },
  { title: 'Joining and Blessing' },
  { title: 'Presentation of Ring' },
  { title: 'Sermon' },
  { title: 'Announcement' },
  { title: 'Signing of Wedding Register', note: 'Choir Medley' },
  { title: 'Thanksgiving', note: 'Offering' },
  { title: 'Blessing of the Couple' },
  { title: 'Presentation of the Certificate' },
  { title: 'Ministers\u2019 Photograph' },
  { title: 'Recessional Hymn', note: '\u201cTo God Be The Glory\u201d', hymnKey: 'toGodBeTheGlory' },
]

const MINISTERS = ['Pastor Seun Akinloye', 'Pastor Stephen Omotere', 'Pastor David Abubakar', 'Amb. Emmanuel Ohis', 'Pastor Akanbi Ayoyinka']

const RECEPTION = [
  { title: 'Arrival of Guests' },
  { title: 'Recognition of Special Guests' },
  { title: 'Arrival of Bride\u2019s Family' },
  { title: 'Arrival of Groom\u2019s Family' },
  { title: 'Groomsmen & Bridal Ladies Entrance' },
  { title: 'Couple\u2019s Grand Entrance' },
  { title: 'Opening Prayers' },
  { title: 'Welcome Address by Chairman' },
  { title: 'First Dance' },
  { title: 'Cutting of the Cake' },
  { title: 'Toast' },
  { title: 'Parent Dance' },
  { title: 'Couples\u2019 Games' },
  { title: 'Groomsmen & Bridesmaids Games' },
  { title: 'Dance Floor Celebration' },
  { title: 'Vote of Thanks' },
  { title: 'After Party' },
]

const HYMNS = {
  GodGiveUsChristianHomes: {
    title: 'God Give Us Christian Homes',
    verses: [
      {
        lines: [
          'God, give us Christian homes!',
          'Homes where the Bible is loved and taught,',
          "Homes where the Master's will is sought,",
          'Homes crowned with beauty Your love has wrought;',
          'God, give us Christian homes;',
          'God, give us Christian homes!',
        ],
      },
      {
        lines: [
          'God, give us Christian homes!',
          'Homes where the father is true and strong,',
          'Homes that are free from the blight of wrong,',
          'Homes that are joyous with love and song;',
          'God, give us Christian homes;',
          'God, give us Christian homes!',
        ],
      },
      {
        lines: [
          'God, give us Christian homes!',
          'Homes where the mother, in caring quest,',
          'Strives to show others Your way is best,',
          'Homes where the Lord is an honored guest;',
          'God, give us Christian homes;',
          'God, give us Christian homes!',
        ],
      },
      {
        lines: [
          'God, give us Christian homes!',
          'Homes where the children are led to know',
          'Christ in His beauty who loves them so,',
          'Homes where the altar fires burn and glow;',
          'God, give us Christian homes;',
          'God, give us Christian homes!',
        ],
      },
    ],
  },
  greatIsThyFaithfulness: {
    title: 'Great Is Thy Faithfulness',
    verses: [
      {
        lines: [
          'Great is Thy faithfulness, O God my Father;',
          'There is no shadow of turning with Thee;',
          'Thou changest not, Thy compassions, they fail not;',
          'As Thou hast been, Thou forever wilt be.',
        ],
      },
      {
        lines: [
          'Summer and winter, and springtime and harvest,',
          'Sun, moon, and stars in their courses above',
          'Join with all nature in manifold witness',
          'To Thy great faithfulness, mercy, and love.',
        ],
      },
      {
        lines: [
          'Pardon for sin and a peace that endureth,',
          "Thine own dear presence to cheer and to guide;",
          'Strength for today and bright hope for tomorrow,',
          'Blessings all mine, with ten thousand beside!',
        ],
      },
    ],
    chorus: [
      'Great is Thy faithfulness! Great is Thy faithfulness!',
      'Morning by morning new mercies I see;',
      "All I have needed Thy hand hath provided\u2014",
      'Great is Thy faithfulness, Lord, unto me!',
    ],
  },
  toGodBeTheGlory: {
    title: 'To God Be The Glory',
    verses: [
      {
        lines: [
          'To God be the glory, great things He hath done,',
          'so loved He the world that He gave us His Son,',
          'who yielded His life an atonement for sin,',
          'and opened the life-gate that all may go in.',
        ],
      },
      {
        lines: [
          "O perfect redemption, the purchase of blood,",
          "to ev'ry believer the promise of God;",
          'the vilest offender who truly believes,',
          'that moment from Jesus a pardon receives.',
        ],
      },
      {
        lines: [
          'Great things He hath taught us, great things He hath done,',
          'and great our rejoicing through Jesus the Son;',
          'but purer, and higher, and greater will be',
          'our wonder, our transport, when Jesus we see.',
        ],
      },
    ],
    chorus: [
      'Praise the Lord, praise the Lord,',
      "let the earth hear His voice!",
      'Praise the Lord, praise the Lord,',
      "let the people rejoice!",
      "O come to the Father through Jesus the Son,",
      'and give Him the glory, great things He hath done.',
    ],
  },
}

function useRevealOnScroll(deps) {
  const itemRefs = useRef([])
  itemRefs.current = []
  const register = (el) => el && itemRefs.current.push(el)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      itemRefs.current.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    itemRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return register
}

function HymnAccordion({ hymnKey }) {
  const [open, setOpen] = useState(false)
  const hymn = HYMNS[hymnKey]
  if (!hymn) return null

  return (
    <div className="hymn">
      <button
        type="button"
        className="hymn-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? 'Hide' : 'Read'} lyrics — {hymn.title}</span>
        <span className="hymn-caret" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="hymn-body">
          {hymn.verses.map((verse, i) => (
            <div className="hymn-verse" key={i}>
              <p className="hymn-verse-number">{i + 1}.</p>
              <div>
                {verse.lines.map((line, j) => (
                  <p className="hymn-line" key={j}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {hymn.chorus && (
            <div className="hymn-chorus">
              <p className="hymn-chorus-label">Chorus</p>
              {hymn.chorus.map((line, j) => (
                <p className="hymn-line" key={j}>{line}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const registerCeremony = useRevealOnScroll([])
  const registerReception = useRevealOnScroll([])

  return (
    <div className="page">
      <div className="botanical botanical-tl" aria-hidden="true" />
      <div className="botanical botanical-br" aria-hidden="true" />

      <main className="card">
        {/* ── Hero (couple photo) ────────────────────────────── */}
        <section className="hero">
          {/* Full photo — no cropping */}
          <img src={couplePhoto} alt="Funmilayo and Babatunde" className="hero-img" />
          {/* Names overlay at the top of the image */}
          <div className="hero-names-overlay">
            <h1 className="names">
              <span className="name-display">{COUPLE.bride}</span>
              <span className="amp-lg">&amp;</span>
              <span className="name-display">{COUPLE.groom}</span>
            </h1>
          </div>
        </section>

        {/* ── Officiating Ministers (immediately after image) ── */}
        <div className="ministers-panel">
          <p className="ministers-label">Officiating Ministers</p>
          <ul className="minister-list">
            {MINISTERS.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="card-body">

        {/* ── Ceremony ──────────────────────────────────────── */}
        <section className="programme">
          <h2 className="section-title">Wedding Order of Service</h2>
          <p className="section-sub">The ceremony Program</p>

          <ol className="order-list">
            {CEREMONY.map((item, i) => (
              <li key={i} className="order-item" ref={registerCeremony}>
                <span className="order-number">{String(i + 1).padStart(2, '0')}</span>
                <div className="order-content">
                  <p className="order-title">{item.title}</p>
                  {item.note && <p className="order-note">{item.note}</p>}
                  {item.hymnKey && <HymnAccordion hymnKey={item.hymnKey} />}
                </div>
              </li>
            ))}
          </ol>

        </section>

        <hr className="divider" />

        {/* ── Reception ─────────────────────────────────────── */}
        <section className="programme">
          <h2 className="section-title">Reception</h2>
          <p className="section-sub">Let the celebration begin</p>

          <ol className="order-list">
            {RECEPTION.map((item, i) => (
              <li key={i} className="order-item" ref={registerReception}>
                <span className="order-number">{String(i + 1).padStart(2, '0')}</span>
                <div className="order-content">
                  <p className="order-title">{item.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        </div>{/* end card-body */}

        {/* ── Site-wide footer ─────────────────────────────── */}
        <footer className="site-footer">
          <div className="footer-divider" aria-hidden="true">
            <span className="footer-heart">♥</span>
          </div>
          <p className="footer-copy">© 2026 · All rights reserved</p>
          <p className="footer-credit">
            Designed &amp; Developed by{' '}
            <a
              href="https://portfolio-oladunni-kehinde.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Scoth_Tech
            </a>
          </p>
        </footer>

      </main>
    </div>
  )
}
