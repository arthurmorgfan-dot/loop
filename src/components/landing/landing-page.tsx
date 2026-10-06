import { translations, localePath, type Locale } from "@/i18n/locale";
import { LanguageSwitch } from "@/i18n/language-switch";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import styles from "./landing.module.css";

const researchUrl = "https://ontdekbouw.nl/projecten/loop#experiment-001";
function DemoLink({
  className = "",
  children,
  locale,
}: {
  locale: Locale;
  className?: string;
  children?: React.ReactNode;
}) {
  const t = translations(locale);
  return (
    <Link
      href={localePath(locale, "/demo")}
      className={`button primary ${className}`}
    >
      {children ?? t("view_the_demo")}
      <Icon name="arrow" />
    </Link>
  );
}

export function LandingPage({ locale = "nl" }: { locale?: Locale }) {
  const t = translations(locale);
  const needs = [
    t("energy"),
    t("protein"),
    t("fats"),
    t("vitamins"),
    t("minerals"),
    t("fibre"),
  ];
  const foods = [
    t("oats"),
    t("whole_grains"),
    t("lentils"),
    t("potatoes"),
    t("vegetables_fruit"),
    t("nuts"),
    t("rice"),
    t("fortified_soy_drink"),
  ];
  const steps = [
    {
      title: t("view_your_crate"),
      text: t("your_weekly_basics_all_in_one_place"),
    },
    {
      title: t("make_a_change"),
      text: t("keep_choose_less_or_try_a_demo_alternative"),
    },
    {
      title: t("choose_delivery_or_pickup"),
      text: t("try_a_time_slot_and_a_fictional_loop_point"),
    },
    {
      title: t("done"),
      text: t("confirm_your_demo_week_then_get_on_with_your_day"),
    },
  ];

  return (
    <div className={styles.landing} id="top">
      <a className="skip-link" href="#landing-main">
        {t("skip_to_content")}{" "}
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            href={localePath(locale)}
            className={`wordmark ${styles.wordmark}`}
            aria-label={t("back_to_the_start")}
          >
            loop<span className="logo-dot">.</span>
          </Link>
          <nav className={styles.nav} aria-label={t("main_navigation")}>
            <a href="#het-idee">{t("the_idea")}</a>
            <a href="#de-krat">{t("the_crate")}</a>
            <a href="#onderzoek">{t("research")}</a>
          </nav>
          <div className={styles.headerControls}>
            <LanguageSwitch locale={locale} path="/" />
            <DemoLink locale={locale} className={styles.headerCta}>
              <span className={styles.fullDemoLabel}>{t("view_the_demo")}</span>
              <span className={styles.shortDemoLabel}>Demo</span>
            </DemoLink>
          </div>
        </div>
      </header>
      <main id="landing-main" tabIndex={-1}>
        <section
          className={`${styles.hero} ${styles.container}`}
          aria-labelledby="landing-title"
        >
          <div className={styles.heroCopy}>
            <p className={`eyebrow ${styles.kicker}`}>
              {t("good_basics_more_room_to_live")}{" "}
            </p>
            <h1 id="landing-title">
              {t("what_if_good_food_was_simply_taken_care_of")}
            </h1>
            <p className={styles.lead}>
              {t(
                "a_weekly_foundation_of_everyday_foods_built_around_nourishment",
              )}{" "}
            </p>
            <div className={styles.heroActions}>
              <DemoLink locale={locale} />
              <a className={`text-button ${styles.howLink}`} href="#het-idee">
                {t("how_it_works")} <Icon name="arrow" />
              </a>
            </div>
            <p className={styles.small}>
              {t("in_development_explore_the_idea_in_the_demo")}{" "}
            </p>
          </div>
          <figure className={styles.heroFigure}>
            <Image
              src="/images/loop-food-composition.webp"
              alt={t(
                "concept_image_of_a_green_loop_crate_with_oats_bread_lentils_po",
              )}
              width={1536}
              height={1024}
              sizes="(max-width: 767px) 100vw, (max-width: 1440px) 55vw, 760px"
              preload
              className={styles.heroImage}
            />
            <figcaption>
              {t(
                "a_picture_of_the_idea_the_contents_are_still_being_researched",
              )}{" "}
            </figcaption>
          </figure>
        </section>

        <section
          id="het-idee"
          className={`${styles.question} ${styles.container}`}
          aria-labelledby="question-title"
        >
          <div>
            <p className={`eyebrow ${styles.kicker}`}>{t("01_the_question")}</p>
            <h2 id="question-title">{t("what_do_we_actually_need")}</h2>
          </div>
          <div className={styles.questionCopy}>
            <p className={styles.body}>
              {t(
                "we_started_with_what_your_body_needs_energy_building_blocks_th",
              )}{" "}
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
              {t(
                "our_question_can_everyday_predominantly_plant_based_foods_toge",
              )}{" "}
            </p>
          </div>
        </section>

        <section className={styles.system} aria-labelledby="system-title">
          <div className={styles.container}>
            <div className={styles.systemHeading}>
              <p className={`eyebrow ${styles.kicker}`}>
                {t("02_what_they_can_do_together")}{" "}
              </p>
              <h2 id="system-title">
                <span>{t("not_one_superfood")}</span>
                <br />
                {t("a_system")}{" "}
              </h2>
              <p className={styles.body}>
                {t("different_foods_bring_different_things")}{" "}
                <br className={styles.desktopBreak} />{" "}
                {t("what_matters_is_what_they_provide_together")}{" "}
              </p>
            </div>
            <figure className={styles.foodStudy}>
              <Image
                src="/illustrations/ingredient-study.svg"
                alt={t(
                  "illustration_of_everyday_staples_bread_oats_lentils_potato_veg",
                )}
                width={920}
                height={360}
                sizes="(max-width: 767px) 100vw, 1000px"
              />
              <ul
                className={styles.foodNames}
                aria-label={t("examples_of_foods_we_are_researching")}
              >
                {foods.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
              <figcaption>
                {t(
                  "a_combination_we_are_researching_not_yet_a_validated_meal_plan",
                )}{" "}
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
              alt={t("the_loop_concept_crate_in_the_demo_s_illustration_style")}
              width={620}
              height={410}
              sizes="(max-width: 767px) 100vw, 580px"
            />
            <figcaption>{t("concept_crate_example_contents")}</figcaption>
          </figure>
          <div className={styles.crateCopy}>
            <p className={`eyebrow ${styles.kicker}`}>
              {t("03_a_week_at_a_time")}{" "}
            </p>
            <h2 id="weekly-title">
              {t("your_basics")} <br />
              {t("every_week")}{" "}
            </h2>
            <p className={styles.body}>
              {t(
                "we_are_working_on_a_small_recurring_crate_a_foundation_for_you",
              )}{" "}
            </p>
            <p className={styles.body}>
              {t(
                "what_else_you_eat_is_up_to_you_the_idea_is_for_loop_to_handle",
              )}{" "}
            </p>
            <div className={styles.returnLine}>
              <Icon name="return" />
              <p>
                {t("the_idea_a_full_crate_arrives")} <br />
                {t("an_empty_one_returns_another_round")}{" "}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.appSection} aria-labelledby="app-title">
          <div className={`${styles.container} ${styles.appInner}`}>
            <div className={styles.appCopy}>
              <p className={`eyebrow ${styles.kicker}`}>
                {t("04_you_stay_in_charge")}{" "}
              </p>
              <h2 id="app-title">{t("as_little_fuss_as_possible")}</h2>
              <p className={styles.body}>
                {t(
                  "try_how_a_week_with_loop_could_feel_the_app_uses_example_produ",
                )}{" "}
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
              <DemoLink locale={locale} />
              <p className={styles.small}>
                {t("demo_v0_1_nothing_is_ordered_or_delivered")}{" "}
              </p>
            </div>
            <figure className={styles.appFigure}>
              <Link
                href={localePath(locale, "/demo")}
                className={styles.appScreenshotLink}
                aria-label={t("open_the_working_loop_demo")}
              >
                <Image
                  src={
                    locale === "en"
                      ? "/images/demo-v01-en.webp"
                      : "/images/demo-v01.webp"
                  }
                  alt={t(
                    "actual_demo_v0_1_screenshot_good_morning_this_week_the_loop_cr",
                  )}
                  width={780}
                  height={1688}
                  sizes="(max-width: 767px) 320px, 360px"
                  className={styles.appScreenshot}
                />
              </Link>
              <figcaption>
                {t("the_existing_app_real_interface_demo_data")}{" "}
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
              {t("05_from_idea_to_everyday_life")}{" "}
            </p>
            <h2 id="research-title">{t("we_are_still_testing_this")}</h2>
            <p className={styles.body}>
              {t(
                "a_good_idea_is_not_yet_a_proven_system_on_bouw_we_are_research",
              )}{" "}
            </p>
            <a
              href={researchUrl}
              className={`text-button ${styles.researchLink}`}
            >
              {t("follow_the_research_on_bouw")} <Icon name="arrow" />
            </a>
          </div>
          <div className={styles.researchDetail}>
            <ul className={styles.researchQuestions}>
              <li>{t("what_belongs_in_the_foundation")}</li>
              <li>{t("what_does_it_really_cost")}</li>
              <li>{t("do_people_enjoy_eating_it")}</li>
              <li>{t("what_changes_in_the_kitchen")}</li>
              <li>{t("does_it_work_in_everyday_life")}</li>
            </ul>
            <p className={styles.evidenceNote}>
              {t(
                "fully_plant_based_eating_needs_deliberate_attention_to_nutrien",
              )}{" "}
            </p>
            <p className={styles.evidenceNote}>
              {t(
                "loop_is_in_development_there_are_no_active_deliveries_or_loop",
              )}{" "}
            </p>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.container}>
            <p className="eyebrow">{t("the_idea_is_simple")}</p>
            <h2 id="closing-title">
              {t("the_basics_are_handled")} <br />
              <span>{t("the_day_is_yours")}</span>
            </h2>
            <DemoLink locale={locale} className={styles.closingCta} />
            <p className={styles.closingBrand} aria-label="loop.">
              loop<span>.</span>
            </p>
          </div>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.container}`}>
        <p>{t("an_idea_in_development_a_demo_to_try_it")}</p>
        <nav aria-label={t("footer_navigation")}>
          <a href={researchUrl}>
            {t("research_on_bouw")} <Icon name="arrow" />
          </a>
          <Link href={localePath(locale, "/demo")}>
            {t("try_the_demo")} <Icon name="arrow" />
          </Link>
          <a href="#top">
            {t("back_to_top")} <Icon name="arrow" />
          </a>
        </nav>
        <p className={styles.copyright}>
          loop. <span>{t("the_basics_are_handled_the_day_is_yours")}</span>
        </p>
      </footer>
    </div>
  );
}
