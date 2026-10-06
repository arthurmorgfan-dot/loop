import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import styles from "./landing.module.css";

const researchUrl = "https://ontdekbouw.nl/projecten/loop#experiment-001";
const needs = [
  "Energie",
  "Eiwitten",
  "Vetten",
  "Vitaminen",
  "Mineralen",
  "Vezels",
];
const foods = [
  "Havermout",
  "Volkoren granen",
  "Linzen",
  "Aardappelen",
  "Groente & fruit",
  "Noten",
  "Rijst",
  "Verrijkte sojadrink",
];
const steps = [
  {
    title: "Bekijk je krat.",
    text: "Je basis voor de week, in één overzicht.",
  },
  { title: "Pas iets aan.", text: "Houden, minder of een andere demo-keuze." },
  {
    title: "Kies bezorgen of ophalen.",
    text: "Probeer een tijdvak en een fictief LOOP Point.",
  },
  { title: "Klaar.", text: "Bevestig je demo-week. En ga verder met je dag." },
];

function DemoLink({
  className = "",
  children = "Bekijk de demo",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href="/demo" className={`button primary ${className}`}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}

export function LandingPage() {
  return (
    <div className={styles.landing} id="top">
      <a className="skip-link" href="#landing-main">
        Naar de inhoud
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            href="/"
            className={`wordmark ${styles.wordmark}`}
            aria-label="loop. — home"
          >
            loop<span className="logo-dot">.</span>
          </Link>
          <nav className={styles.nav} aria-label="Hoofdnavigatie">
            <a href="#het-idee">Het idee</a>
            <a href="#de-krat">De krat</a>
            <a href="#onderzoek">Onderzoek</a>
          </nav>
          <DemoLink className={styles.headerCta} />
        </div>
      </header>
      <main id="landing-main" tabIndex={-1}>
        <section
          className={`${styles.hero} ${styles.container}`}
          aria-labelledby="landing-title"
        >
          <div className={styles.heroCopy}>
            <p className={`eyebrow ${styles.kicker}`}>
              EEN GOEDE BASIS. MEER RUIMTE OM TE LEVEN.
            </p>
            <h1 id="landing-title">Wat als goed eten gewoon geregeld was?</h1>
            <p className={styles.lead}>
              Een wekelijkse basis van gewone producten. Met voeding,
              betaalbaarheid en minder gedoe als uitgangspunt.
            </p>
            <div className={styles.heroActions}>
              <DemoLink />
              <a className={`text-button ${styles.howLink}`} href="#het-idee">
                Hoe het werkt <Icon name="arrow" />
              </a>
            </div>
            <p className={styles.small}>
              In ontwikkeling. Ontdek het idee in de demo.
            </p>
          </div>
          <figure className={styles.heroFigure}>
            <Image
              src="/images/loop-food-composition.webp"
              alt="Verbeelding van een groene loop. krat met havermout, brood, linzen, aardappelen, groente, fruit en noten"
              width={1536}
              height={1024}
              sizes="(max-width: 767px) 100vw, (max-width: 1440px) 55vw, 760px"
              preload
              className={styles.heroImage}
            />
            <figcaption>
              Verbeelding van het concept. De inhoud wordt nog onderzocht.
            </figcaption>
          </figure>
        </section>

        <section
          id="het-idee"
          className={`${styles.question} ${styles.container}`}
          aria-labelledby="question-title"
        >
          <div>
            <p className={`eyebrow ${styles.kicker}`}>01 / DE VRAAG</p>
            <h2 id="question-title">Wat heeft een mens eigenlijk nodig?</h2>
          </div>
          <div className={styles.questionCopy}>
            <p className={styles.body}>
              We begonnen bij wat je lijf nodig heeft. Energie. Bouwstoffen. De
              dingen die je iedere dag verder helpen.
            </p>
            <ul className={styles.needs}>
              {needs.map((need) => (
                <li key={need}>
                  <span className={styles.needDot} aria-hidden="true" />
                  {need}
                </li>
              ))}
            </ul>
            <p className={styles.body}>
              Onze vraag: kunnen gewone, overwegend plantaardige producten samen
              een goede dagelijkse basis vormen, zonder afhankelijk te zijn van
              dierlijke producten?
            </p>
          </div>
        </section>

        <section className={styles.system} aria-labelledby="system-title">
          <div className={styles.container}>
            <div className={styles.systemHeading}>
              <p className={`eyebrow ${styles.kicker}`}>
                02 / WAT ZE SAMEN KUNNEN
              </p>
              <h2 id="system-title">
                <span>Niet één superfood.</span>
                <br />
                Een systeem.
              </h2>
              <p className={styles.body}>
                Verschillende producten dragen verschillende dingen bij.
                <br className={styles.desktopBreak} /> Het gaat erom wat ze
                samen leveren.
              </p>
            </div>
            <figure className={styles.foodStudy}>
              <Image
                src="/illustrations/ingredient-study.svg"
                alt="Illustratie van gewone basisproducten: brood, havermout, linzen, aardappel, groente, fruit, noten en een drankkarton"
                width={920}
                height={360}
                sizes="(max-width: 767px) 100vw, 1000px"
              />
              <ul
                className={styles.foodNames}
                aria-label="Voorbeelden van producten die we onderzoeken"
              >
                {foods.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
              <figcaption>
                Een combinatie die we onderzoeken. Nog geen gevalideerd
                voedingsplan.
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="de-krat"
          className={`${styles.crateSection} ${styles.container}`}
          aria-labelledby="weekly-title"
        >
          <figure className={styles.crateFigure}>
            <Image
              src="/illustrations/loop-crate.svg"
              alt="De LOOP conceptkrat in de illustratiestijl van de demo"
              width={620}
              height={410}
              sizes="(max-width: 767px) 100vw, 580px"
            />
            <figcaption>Conceptkrat · Voorbeeldinhoud</figcaption>
          </figure>
          <div className={styles.crateCopy}>
            <p className={`eyebrow ${styles.kicker}`}>
              03 / DE WEEK ALS UITGANGSPUNT
            </p>
            <h2 id="weekly-title">
              Je basis.
              <br />
              Iedere week.
            </h2>
            <p className={styles.body}>
              We werken aan een klein, terugkerend krat. Een basis voor je week,
              met ruimte voor je eigen keuken.
            </p>
            <p className={styles.body}>
              Wat je daarnaast eet, bepaal je zelf. loop verzorgt straks de
              basis. Jij houdt de vrijheid.
            </p>
            <div className={styles.returnLine}>
              <Icon name="return" />
              <p>
                Het idee: een volle krat heen.
                <br />
                Een lege krat terug. Een nieuwe ronde.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.appSection} aria-labelledby="app-title">
          <div className={`${styles.container} ${styles.appInner}`}>
            <div className={styles.appCopy}>
              <p className={`eyebrow ${styles.kicker}`}>
                04 / JIJ BLIJFT IN CONTROLE
              </p>
              <h2 id="app-title">Zo weinig mogelijk gedoe.</h2>
              <p className={styles.body}>
                Probeer hoe een week met loop zou kunnen voelen. De app werkt
                met voorbeeldproducten en fictieve locaties.
              </p>
              <ol className={styles.steps}>
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <DemoLink />
              <p className={styles.small}>
                Demo v0.1 · Er wordt niets besteld of bezorgd.
              </p>
            </div>
            <figure className={styles.appFigure}>
              <Link
                href="/demo"
                className={styles.appScreenshotLink}
                aria-label="Open de werkende LOOP demo"
              >
                <Image
                  src="/images/demo-v01.webp"
                  alt="Echte screenshot van Demo v0.1: Goedemorgen, deze week, de LOOP krat en de mobiele navigatie"
                  width={780}
                  height={1688}
                  sizes="(max-width: 767px) 320px, 360px"
                  className={styles.appScreenshot}
                />
              </Link>
              <figcaption>
                De bestaande app. Echte interface, demo-gegevens.
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="onderzoek"
          className={`${styles.research} ${styles.container}`}
          aria-labelledby="research-title"
        >
          <div className={styles.researchIntro}>
            <p className={`eyebrow ${styles.kicker}`}>
              05 / VAN IDEE NAAR PRAKTIJK
            </p>
            <h2 id="research-title">We zijn dit nog aan het testen.</h2>
            <p className={styles.body}>
              Een mooi idee is nog geen bewezen systeem. Op BOUW onderzoeken we
              het voedselmodel, de kosten en de praktijk.
            </p>
            <a
              href={researchUrl}
              className={`text-button ${styles.researchLink}`}
            >
              Volg het onderzoek op BOUW <Icon name="arrow" />
            </a>
          </div>
          <div className={styles.researchDetail}>
            <ul className={styles.researchQuestions}>
              <li>Wat hoort er in de basis?</li>
              <li>Wat kost het echt?</li>
              <li>Wordt het met plezier gegeten?</li>
              <li>Wat verandert er in de keuken?</li>
              <li>Werkt het ook in het dagelijks leven?</li>
            </ul>
            <p className={styles.evidenceNote}>
              Volledig plantaardig eten vraagt bewuste aandacht voor onder
              andere vitamine B12 en, afhankelijk van de situatie, vitamine D.
              Het huidige krat is niet als volledig voedingspatroon gevalideerd.
            </p>
            <p className={styles.evidenceNote}>
              loop is in ontwikkeling. Er zijn nog geen actieve bezorgingen of
              LOOP Points. BOUW is de plek voor het onderzoek; loop is de plek
              voor de toekomstige ervaring.
            </p>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.container}>
            <p className="eyebrow">DE GEDACHTE IS EENVOUDIG.</p>
            <h2 id="closing-title">
              De basis is geregeld.
              <br />
              <span>De dag is van jou.</span>
            </h2>
            <DemoLink className={styles.closingCta} />
            <p className={styles.closingBrand} aria-label="loop.">
              loop<span>.</span>
            </p>
          </div>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.container}`}>
        <p>Een idee in ontwikkeling. Een demo om het te ervaren.</p>
        <nav aria-label="Footernavigatie">
          <a href={researchUrl}>
            Onderzoek op BOUW <Icon name="arrow" />
          </a>
          <Link href="/demo">
            Probeer de demo <Icon name="arrow" />
          </Link>
          <a href="#top">
            Terug naar boven <Icon name="arrow" />
          </a>
        </nav>
        <p className={styles.copyright}>
          loop. <span>De basis is geregeld. De dag is van jou.</span>
        </p>
      </footer>
    </div>
  );
}
